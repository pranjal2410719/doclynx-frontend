"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Card, Button, Input, Field, Alert } from "@/components/ui";

export function ReceiverActions({ shipmentId, confirmed }: { shipmentId: string; confirmed: boolean }) {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await api<{ code: string }>("/otp/send", {
        method: "POST",
        body: { shipmentId },
      });
      setOtpSent(true);
      setMessage(`OTP sent! (Note: Demo code is ${res.code})`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await api("/otp/verify", {
        method: "POST",
        body: { shipmentId, code: otpCode },
      });
      setMessage("Verification successful!");
      window.location.reload();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="p-6 bg-black text-white border border-black flex flex-col items-center justify-center text-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Node_Verified</span>
        <p className="text-[9px] font-medium opacity-60 uppercase tracking-tighter">"You have already confirmed this delivery."</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2 border-b border-black/5 pb-3">
         <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A]">004</span>
         <h3 className="text-sm lg:text-base font-black uppercase tracking-widest">Receipt Audit</h3>
      </div>

      <div className="space-y-6">
        {!otpSent ? (
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full h-16 lg:h-20 bg-black text-white flex items-center justify-between px-6 lg:px-8 group hover:opacity-90 transition-all disabled:opacity-30"
          >
            <span className="text-xs lg:text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              {loading ? "Requesting_Code..." : "Initialize OTP Protocol [→]"}
            </span>
          </button>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Entry Code</label>
              <input
                placeholder="000000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                className="w-full bg-slate-50 border border-black text-3xl lg:text-4xl font-light tracking-[0.5em] p-4 lg:p-6 text-center outline-none focus:bg-white transition-all shadow-inner"
              />
            </div>
            
            <button
              onClick={verifyOtp}
              disabled={otpCode.length < 6 || loading}
              className="w-full h-16 lg:h-20 bg-black text-white flex items-center justify-between px-6 lg:px-8 group hover:opacity-90 transition-all disabled:opacity-30"
            >
              <span className="text-xs lg:text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                {loading ? "Verifying_Entry..." : "Finalize Receipt Audit [→]"}
              </span>
            </button>
            
            <button 
              onClick={sendOtp} 
              className="text-[9px] font-black text-slate-400 uppercase tracking-widest underline decoration-1 underline-offset-4 hover:text-black transition-all text-center w-full block"
            >
              Re-Issue Protocol Code
            </button>
          </div>
        )}

        {message && (
          <div className="p-4 bg-[#F8DACD]/30 border-l-2 border-[#D0554A]">
            <p className="text-[10px] font-bold text-[#D0554A] uppercase tracking-widest mb-1">System Pulse:</p>
            <p className="text-[10px] font-medium text-slate-600 leading-relaxed italic lowercase">"{message.toLowerCase()}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
