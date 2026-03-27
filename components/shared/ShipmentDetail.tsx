"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Shipment, Proof, UserRole } from "@/types";
import { Card, Button, Alert, StatusBadge } from "@/components/ui";
import Image from "next/image";

type ShipmentDetailProps = {
  shipmentId: string;
  role: UserRole;
  children?: React.ReactNode;
  hideHeader?: boolean;
};

export function ShipmentDetail({ shipmentId, role, children, hideHeader }: ShipmentDetailProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetails = async () => {
    try {
      const [s, p] = await Promise.all([
        api<Shipment>(`/shipment/${shipmentId}`),
        api<Proof[]>(`/proof/${shipmentId}`),
      ]);
      setShipment(s);
      setProofs(p);
    } catch (err: any) {
      setError(err.message || "Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [shipmentId]);

  if (loading) return <div className="py-20 text-center">Loading details...</div>;
  if (error) return <Alert tone="error">{error}</Alert>;
  if (!shipment) return <Alert>Shipment not found.</Alert>;

  return (
    <div className="flex flex-col gap-6 lg:gap-8 flex-1">
      {/* 1. Header Area */}
      {!hideHeader && (
        <div className="flex flex-col gap-4 shrink-0 px-1 border-b border-black/5 pb-6">
          <div className="flex items-center gap-3">
             <span className={`text-[8px] lg:text-[10px] font-black border px-2.5 py-1 uppercase tracking-widest ${
                shipment.status === "VERIFIED" ? "bg-black text-white border-black" : "bg-white text-slate-400 border-black/10"
              }`}>
                {shipment.status}
              </span>
            <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {shipment.id.slice(0, 16).toUpperCase()}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-light tracking-tighter text-black uppercase">Audit Manifest<span className="text-[#D0554A]">_</span></h1>
        </div>
      )}

      {/* 2. Timeline Tracker (Desktop: Horizontal, Mobile: Vertical inside a card) */}
      <div className="bg-white border border-black shadow-[8px_8px_0px_rgba(0,0,0,0.05)] lg:shadow-[12px_12px_0px_rgba(0,0,0,0.05)] p-6 lg:p-10 w-full shrink-0">
        <div className="flex justify-between items-center mb-8 lg:mb-10">
          <h2 className="text-lg lg:text-xl font-bold tracking-tight uppercase">Protocol Timeline</h2>
          <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Last Sync: <span className="text-black">{new Date().toLocaleDateString()}</span>
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block relative w-full pb-8">
          <div className="absolute top-5 left-[5%] right-[5%] h-[1px] bg-black/10 z-0" />
          <div
            className="absolute top-5 left-[5%] h-[1px] bg-black z-0 transition-all duration-700"
            style={{ width: `${getProgressPercentage(shipment.status)}%` }}
          />
          <div className="grid grid-cols-5 relative z-10">
            <TimelineStep label="Manifest" active={true} />
            <TimelineStep label="Transit" active={["IN_TRANSIT", "DELIVERED", "VERIFIED"].includes(shipment.status)} />
            <TimelineStep label="Arrival" active={["DELIVERED", "VERIFIED"].includes(shipment.status)} />
            <TimelineStep label="Receipt" active={shipment.receiverConfirmed} />
            <TimelineStep label="Finality" active={shipment.status === "VERIFIED"} />
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-6">
           <MobileTimelineStep label="Manifest Created" active={true} desc="Initial ledger entry recorded." />
           <MobileTimelineStep label="In Transit" active={["IN_TRANSIT", "DELIVERED", "VERIFIED"].includes(shipment.status)} desc="Shipment is moving through the network." />
           <MobileTimelineStep label="Delivery Hub" active={["DELIVERED", "VERIFIED"].includes(shipment.status)} desc="Arrival at destination node." />
           <MobileTimelineStep label="Recipient Confirmed" active={shipment.receiverConfirmed} desc="Verification pulse received." />
           <MobileTimelineStep label="Funds Released" active={shipment.status === "VERIFIED"} desc="Smart-contract finalized." />
        </div>
      </div>

      {/* 3. Details & Gallery Grid */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1">
        {/* Left Side: Escrow Card & Info */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6 lg:gap-8 shrink-0">
          <div className="bg-white border border-black shadow-[8px_8px_0px_rgba(0,0,0,0.05)] p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-black/5 pb-4">
               <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A]">001</span>
               <h3 className="text-sm lg:text-base font-black uppercase tracking-widest">Escrow Assets</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-black/10 p-5 lg:p-6">
                <p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Net Contract Value</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl lg:text-3xl font-light tracking-tighter text-black">${shipment.escrowAmount.toFixed(2)}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">USD</span>
                </div>
              </div>

              <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Sender Node</span>
                    <span className="font-mono text-[9px] lg:text-[10px] text-black bg-slate-100 px-2 py-0.5 uppercase tracking-tighter">{shipment.senderId.slice(0, 12)}...</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-black/5 pb-2">
                    <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Receiver Node</span>
                    <span className="font-mono text-[9px] lg:text-[10px] text-black bg-slate-100 px-2 py-0.5 uppercase tracking-tighter">{shipment.receiverId.slice(0, 12)}...</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Proof Gallery */}
        <div className="flex-1 flex flex-col bg-white border border-black shadow-[8px_8px_0px_#D0554A] lg:shadow-[12px_12px_0px_#D0554A] overflow-hidden">
          <div className="p-6 lg:p-10 border-b border-black/5 flex justify-between items-center bg-white shrink-0">
            <div>
              <h2 className="text-lg lg:text-xl font-bold tracking-tight uppercase mb-1">Audit Documentation</h2>
              <p className="text-[10px] lg:text-xs font-medium text-slate-400 italic">"Verified cryptographic signatures and image captures."</p>
            </div>
            <span className="text-[8px] font-black text-slate-300 uppercase hidden sm:block">Proofs: {proofs.length}</span>
          </div>

          <div className="p-6 lg:p-10 flex-1 bg-white">
            {proofs.length === 0 ? (
              <div className="w-full h-full min-h-[200px] lg:min-h-[300px] border border-black/10 border-dashed rounded-none flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white border border-black/10 rounded-full flex items-center justify-center mb-4 text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z"></path></svg>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-1">No Evidence Tracked</h3>
                <p className="text-[10px] text-slate-400 text-center max-w-xs uppercase">Audit trail currently empty.</p>
              </div>
            ) : (
              <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2">
                {proofs.map((p) => (
                  <div key={p.id} className="group relative border border-black overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                    <img
                      src={`http://localhost:5000/${p.filePath}`}
                      alt={`${p.type} proof`}
                      className="h-40 lg:h-48 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="p-4 border-t border-black bg-white">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">{p.type}</span>
                        <span className="text-[9px] font-bold text-slate-400">{new Date(p.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="font-mono text-[9px] text-slate-400 truncate bg-slate-50 p-2 border border-black/5">HASH: {p.hash}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {children && (
            <div className="p-6 lg:p-10 border-t border-black bg-slate-50/30">
              <div className="max-w-sm ml-auto">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function TimelineStep({ label, active, timestamp }: { label: string; active: boolean; timestamp?: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ring-8 ring-white shadow-sm z-10 transition-all duration-500 ${active
        ? "bg-black text-white"
        : "bg-white border-[1px] border-black/10 text-slate-300"
        }`}>
        {active ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
        )}
      </div>
      <h4 className={`text-[10px] font-black uppercase tracking-widest leading-tight mb-1.5 whitespace-pre-line ${active ? "text-black" : "text-slate-300"}`}>
        {label.replace(" ", "\n")}
      </h4>
      {timestamp && active && (
        <span className="text-[9px] font-bold text-slate-400 uppercase">{timestamp}</span>
      )}
    </div>
  );
}

function MobileTimelineStep({ label, active, desc }: { label: string; active: boolean; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
          active ? "bg-black text-white" : "bg-white border border-black/10 text-slate-200"
        }`}>
          {active && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>}
        </div>
        <div className="flex-1 w-[1px] bg-black/10 my-1" />
      </div>
      <div className="pb-6">
        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${active ? "text-black" : "text-slate-300"}`}>{label}</h4>
        <p className="text-[10px] text-slate-400 font-medium italic lowercase">"{desc}"</p>
      </div>
    </div>
  );
}

function getProgressPercentage(status: string) {
  switch (status) {
    case "CREATED": return 0;
    case "IN_TRANSIT": return 40;
    case "DELIVERED": return 75;
    case "VERIFIED": return 90;
    default: return 0;
  }
}
