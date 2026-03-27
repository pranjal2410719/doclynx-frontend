"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Card, Button, Input, Field, Alert } from "@/components/ui";

export function CourierActions({ shipmentId, shipmentStatus }: { shipmentId: string; shipmentStatus: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"PICKUP" | "DELIVERY">(shipmentStatus === "CREATED" ? "PICKUP" : "DELIVERY");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("shipment_id", shipmentId);
    formData.append("type", type);
    formData.append("image", file);

    try {
      await api("/proof/upload", {
        method: "POST",
        body: formData,
      });
      setMessage("Proof uploaded successfully! Refreshing...");
      window.location.reload();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (shipmentStatus === "DELIVERED" || shipmentStatus === "VERIFIED") {
    return (
      <div className="p-6 bg-black text-white border border-black flex flex-col items-center justify-center text-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Protocol_Complete</span>
        <p className="text-[9px] font-medium opacity-60 uppercase tracking-tighter">"Your part in this delivery is complete."</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2 border-b border-black/5 pb-3">
         <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A]">003</span>
         <h3 className="text-sm lg:text-base font-black uppercase tracking-widest">Courier Ingest</h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Phase</label>
          <div className="relative">
            <select
              className="w-full bg-white border border-black/10 rounded-none text-[10px] lg:text-xs font-bold uppercase p-4 lg:p-5 outline-none focus:border-black transition appearance-none cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="PICKUP">Pickup_Protocol</option>
              <option value="DELIVERY">Delivery_Protocol</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">▼</div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest">Evidence Payload</label>
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full border border-black/10 border-dashed p-6 lg:p-8 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-slate-50 transition-colors">
               <span className="text-[10px] font-black text-slate-300 uppercase mb-1">
                 {file ? file.name : "Select_File_For_Audit"}
               </span>
               {!file && <span className="text-[8px] font-bold text-slate-200 uppercase">[DRAG_OR_TAP]</span>}
            </div>
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full h-16 lg:h-20 bg-black text-white flex items-center justify-between px-6 lg:px-8 group hover:opacity-90 transition-all disabled:opacity-30"
        >
          <span className="text-xs lg:text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
             {loading ? "Archiving..." : `Commit ${type} Evidence [→]`}
          </span>
        </button>

        {message && (
          <div className="p-4 bg-[#F8DACD]/30 border-l-2 border-[#D0554A]">
            <p className="text-[10px] font-bold text-[#D0554A] uppercase tracking-widest mb-1">Audit Pulse:</p>
            <p className="text-[10px] font-medium text-slate-600 leading-relaxed italic lowercase">"{message.toLowerCase()}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
