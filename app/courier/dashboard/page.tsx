"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Shipment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function CourierDashboard() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Shipment[]>("/shipment/list")
      .then((res) => setShipments(res.filter(s => s.courierId === user?.id)))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="flex flex-col min-h-full bg-[#EAEBEB]">
      {/* Header Area */}
      <div className="px-6 lg:px-12 py-8 lg:py-10 border-b border-black bg-white relative">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <span className="bg-black text-white text-[8px] lg:text-[10px] font-black px-2 lg:px-3 py-1 uppercase tracking-widest leading-none">
            DRIVE_MODE: ON
          </span>
          <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            LOG_REF: {new Date().getTime().toString(16).toUpperCase()}
          </span>
        </div>
        <h1 className="text-[2.5rem] lg:text-[4.5rem] font-light leading-[0.9] tracking-tighter text-black uppercase">
          Courier<br />Operations<span className="text-[#D0554A]">_</span>
        </h1>
      </div>

      {/* Metadata Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 border-b border-black bg-white/50">
        <div className="px-6 lg:px-10 py-6 lg:py-8">
          <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Node Identifier</span>
          <span className="text-sm lg:text-base font-bold text-black border-b border-black/20 pb-0.5">DLX-DRIVER-{user?.id?.slice(-4) || "AUTH"}</span>
        </div>
        <div className="px-6 lg:px-10 py-6 lg:py-8">
          <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Platform Protocol</span>
          <span className="text-sm lg:text-base font-bold text-black border-b border-black/20 pb-0.5">ESTRADA_V1.9.4</span>
        </div>
        <div className="px-6 lg:px-10 py-6 lg:py-8">
          <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Service Region</span>
          <span className="text-sm lg:text-base font-bold text-black border-b border-black/20 pb-0.5">METRO_CORE</span>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
        {/* Left: Stats Grid */}
        <div className="w-full lg:w-[350px] flex flex-col shrink-0 bg-white lg:bg-transparent">
          <div className="grid grid-cols-2 lg:grid-cols-1 divide-x lg:divide-x-0 lg:divide-y divide-black/10">
            <div className="p-6 lg:p-10 hover:bg-[#F8DACD]/5 transition cursor-default group">
              <div className="flex justify-between items-start mb-4 lg:mb-6">
                <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Active duties</span>
                <span className="hidden sm:inline-block text-[8px] font-black text-[#D0554A] opacity-30 tracking-tighter">[LOGGED]</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl lg:text-6xl font-light text-black tracking-tighter leading-none">
                  {shipments.filter(s => s.status === "IN_TRANSIT").length}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic pt-2">Units</span>
              </div>
            </div>

            <div className="p-6 lg:p-10 hover:bg-[#F8DACD]/5 transition cursor-default group">
              <div className="flex justify-between items-start mb-4 lg:mb-6">
                <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</span>
                <span className="hidden sm:inline-block text-[8px] font-black text-[#D0554A] opacity-30 tracking-tighter">[ARCHIVE]</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl lg:text-6xl font-light text-black tracking-tighter leading-none">
                  {shipments.filter(s => s.status === "VERIFIED").length}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic pt-2">Tasks</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex p-10 flex-grow bg-white/30 italic text-[9px] text-slate-400 font-mono flex-col justify-end gap-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>TERMINAL_CONNECTED</span>
            </div>
            <div>// GRID_READY_FOR_DEPLOYMENT</div>
          </div>
        </div>

        {/* Right: Detailed Ledger */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-6 lg:px-10 py-6 lg:py-10 border-b border-black/5 flex justify-between items-center bg-white shrink-0">
            <div>
              <h2 className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Assigned Manifests</h2>
              <p className="text-xs lg:text-sm font-medium text-slate-500 italic">"Autonomous protocol for end-to-end audit."</p>
            </div>
            <div className="text-[8px] font-black text-slate-300 uppercase hidden sm:block">Total Items: {shipments.length}</div>
          </div>

          <div className="flex-1 overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-black/10 bg-slate-50/50">
                  <th className="px-6 lg:px-10 py-5 text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Manifest Reference</th>
                  <th className="px-6 lg:px-10 py-5 text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">State</th>
                  <th className="px-6 lg:px-10 py-5 text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center font-mono text-[10px] text-slate-400 animate-pulse uppercase tracking-widest">
                      Processing_Ledger_Nodes...
                    </td>
                  </tr>
                ) : shipments.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center font-mono text-[10px] text-slate-300 uppercase tracking-widest">
                      Zero_Manifests_Detected
                    </td>
                  </tr>
                ) : (
                  shipments.map((s) => (
                    <tr key={s.id} className="group hover:bg-[#F8DACD]/5 transition-colors">
                      <td className="px-6 lg:px-10 py-6 font-mono text-[10px] text-slate-500 group-hover:text-black transition-colors uppercase">
                        #{s.id.slice(0, 16)}
                      </td>
                      <td className="px-6 lg:px-10 py-6 text-center">
                        <span className={`text-[8px] lg:text-[9px] font-black border px-2.5 py-1 uppercase tracking-widest ${
                          s.status === "IN_TRANSIT" ? "bg-black text-white border-black" : 
                          s.status === "CREATED" ? "bg-[#D0554A] text-white border-[#D0554A]" : "bg-white text-slate-400 border-black/10"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 lg:px-10 py-6 text-right">
                        <Link 
                          href={`/courier/shipment/${s.id}`}
                          className="text-[9px] lg:text-[10px] font-black text-[#D0554A] hover:text-black underline underline-offset-4 decoration-current/30 transition-all"
                        >
                          Execute Audit [→]
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
