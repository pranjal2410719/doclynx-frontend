"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Shipment } from "@/types";
import Link from "next/link";

export default function SenderDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  const totalEscrow = shipments.reduce((acc, s) => acc + s.escrowAmount, 0);
  const systemTax = totalEscrow * 0.02; // 2% platform fee
  const activeNet = totalEscrow - systemTax;

  return (
    <div className="flex flex-col min-h-full bg-[#EAEBEB]">
      {/* Header */}
      <header className="px-6 lg:px-12 py-8 lg:py-10 border-b border-black relative overflow-hidden bg-white">
        <div className="flex justify-between text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8 border-b border-black/5 pb-4">
          <span>Node: DLX-SENDER-01</span>
          <span className="text-[#D0554A]">Sync: {new Date().toLocaleTimeString()}</span>
          <span className="hidden sm:inline">Region: NA-GLOBAL</span>
        </div>
        <h2 className="text-[2.5rem] lg:text-[4.5rem] font-light leading-[0.9] tracking-tighter uppercase mb-2">
          Operations<br />Ledger<span className="text-[#D0554A]">_</span>
        </h2>
        <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Active Manifest Tracking</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-black bg-white">
        <StatCell label="Manifests" value={shipments.length} />
        <StatCell label="Pending" value={shipments.filter(s => s.status === "CREATED").length} color="#D0554A" />
        <StatCell label="In Transit" value={shipments.filter(s => s.status === "IN_TRANSIT").length} />
        <StatCell label="Finalized" value={shipments.filter(s => s.status === "VERIFIED").length} />
      </section>

      {/* Table Section */}
      <section className="flex-grow flex flex-col p-6 lg:p-12">
        <div className="border border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.05)] lg:shadow-[12px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_100px] px-6 lg:px-8 py-4 border-b border-black text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <div>Manifest ID</div>
                <div>Status</div>
                <div>Escrow Value</div>
                <div className="text-right">Action</div>
              </div>

              <div className="divide-y divide-black/5">
                {loading ? (
                  <div className="px-8 py-20 text-center text-slate-400 font-mono text-[10px] animate-pulse">Scanning ledger nodes...</div>
                ) : shipments.length === 0 ? (
                  <div className="px-8 py-20 text-center text-slate-400 italic text-sm">No active ledger items detected.</div>
                ) : (
                  shipments.map((s) => (
                    <div key={s.id} className="grid grid-cols-[1.5fr_1fr_1fr_100px] px-6 lg:px-8 py-5 items-center text-sm font-medium hover:bg-[#F8DACD]/10 transition-colors group">
                      <div className="font-mono text-[10px] lg:text-[11px] text-slate-500 group-hover:text-black transition-colors uppercase tracking-tight">#{s.id.slice(0, 16)}</div>
                      <div>
                        <span className={`inline-block px-2 lg:px-3 py-0.5 rounded-full text-[8px] lg:text-[9px] font-black tracking-widest uppercase border ${s.status === "VERIFIED" ? "bg-black text-white border-black" :
                            s.status === "DISPUTED" ? "border-[#D0554A] text-[#D0554A]" : "border-black/20 text-slate-400"
                          }`}>
                          {s.status}
                        </span>
                      </div>
                      <div className="font-light text-base lg:text-lg">${s.escrowAmount.toFixed(2)}</div>
                      <div className="text-right">
                        <Link href={`/sender/shipment/${s.id}`} className="text-[9px] lg:text-[10px] font-black uppercase text-[#D0554A] hover:text-black transition-colors underline underline-offset-4 decoration-current/30">
                          Audit →
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Recapitulation */}
        <footer className="mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start pb-12">
          <div className="flex-1 space-y-4">
            <div className="h-[1px] bg-black/10 w-full" />
            <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] lg:tracking-[0.3em]">System Authentication /// Active Protocol 411</p>
            <p className="text-xs lg:text-sm font-light leading-relaxed text-slate-500 max-w-sm">
              All financial artifacts are calculated in real-time. Platform fees represent network maintenance and dispute resolution overhead.
            </p>
          </div>

          <div className="w-full lg:w-[400px] border border-black bg-white p-6 lg:p-8 space-y-6 shadow-[6px_6px_0px_#D0554A] lg:shadow-[8px_8px_0px_#D0554A]">
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Gross Value Locked</span>
              <span className="text-xl lg:text-2xl font-light tracking-tighter">${totalEscrow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-black/5 pb-6">
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A]">Network Surcharge (2%)</span>
              <span className="text-lg lg:text-xl font-light tracking-tighter text-[#D0554A] flex items-center gap-2">
                <span>-</span>
                ${systemTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-end pt-2">
              <div>
                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Net Settlement</span>
                <span className="text-3xl lg:text-4xl font-light tracking-tighter leading-none">${activeNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-black flex items-center justify-center text-lg lg:text-xl hover:bg-black hover:text-white transition-all cursor-pointer">
                →
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

function StatCell({ label, value, color, annotation }: { label: string; value: number | string; color?: string; annotation?: string }) {
  return (
    <div className="p-6 lg:p-8 border-r border-black last:border-r-0 group hover:bg-[#F8DACD]/5 transition-colors">
      <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 lg:mb-4 block group-hover:text-black transition-colors">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl lg:text-5xl font-light tracking-tighter leading-none" style={{ color: color || 'inherit' }}>{value}</span>
        {annotation && <span className="text-[8px] lg:text-[10px] font-bold uppercase text-[#D0554A]">{annotation}</span>}
      </div>
    </div>
  );
}
