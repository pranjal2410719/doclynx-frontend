"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Card, Button, Input, Field, Alert } from "@/components/ui";

export function SenderActions({ shipmentId, status, paymentStatus, onRefresh }: { shipmentId: string; status: string; paymentStatus?: string; onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const runVerification = async () => {
    setLoading(true);
    try {
      const res = await api<{ passed: boolean }>(`/verification/run/${shipmentId}`, { method: "POST" });
      if (res.passed) setMessage("Proof check PASSED. You can now release escrow.");
      else setMessage("Proof check FAILED. Check pickup and delivery images.");
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const releasePayment = async () => {
    setLoading(true);
    try {
      await api("/payment/release", {
        method: "POST",
        body: { shipmentId },
      });
      setMessage("Payment released to courier!");
      onRefresh();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2 border-b border-black/5 pb-3">
         <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A]">002</span>
         <h3 className="text-sm lg:text-base font-black uppercase tracking-widest">Escrow Control</h3>
      </div>

      <div className="space-y-4">
        <button
          onClick={runVerification}
          disabled={loading || status === "VERIFIED"}
          className="w-full h-16 lg:h-20 bg-slate-100 border border-black/10 text-black flex items-center justify-between px-6 group hover:bg-slate-200 transition-all disabled:opacity-50"
        >
          <span className="text-xs lg:text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
             {loading ? "Validating_Nodes..." : "Run Multi-Proof Audit [→]"}
          </span>
        </button>

        <button
          onClick={releasePayment}
          disabled={loading || status !== "VERIFIED" || paymentStatus === "RELEASED"}
          className="w-full h-16 lg:h-20 bg-black text-white flex items-center justify-between px-6 group hover:opacity-90 transition-all disabled:opacity-30"
        >
          <span className="text-xs lg:text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            {loading ? "Releasing_Contract..." : "Finalize & Release Funds [→]"}
          </span>
        </button>

        {message && (
          <div className="p-4 bg-[#F8DACD]/30 border-l-2 border-[#D0554A]">
            <p className="text-[10px] font-bold text-[#D0554A] uppercase tracking-widest mb-1">System Pulse:</p>
            <p className="text-[10px] font-medium text-slate-600 leading-relaxed">{message}</p>
          </div>
        )}
        
        {status !== "VERIFIED" && (
          <p className="text-[9px] font-black text-slate-400 text-center uppercase tracking-tighter opacity-50">
            [Awaiting_Verification_Confirm_To_Proceed]
          </p>
        )}
      </div>
    </div>
  );
}
