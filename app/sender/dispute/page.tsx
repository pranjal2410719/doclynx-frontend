"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Dispute } from "@/types";
import { Card, StatusBadge, Alert } from "@/components/ui";
import Link from "next/link";

export default function DisputePage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Dispute[]>("/dispute")
      .then(setDisputes)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="px-12 py-10 border-b border-slate-200 relative overflow-hidden bg-white">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">
          <span>Date: {new Date().toISOString().split('T')[0]}</span>
          <span>Ledger: DISPUTE-LOG</span>
          <span>Region: NA-GLOBAL</span>
        </div>
        <h2 className="text-[3.5rem] font-medium leading-[1.1] tracking-tight">
          Dispute<br />Management
        </h2>
      </header>

      {/* Table Section */}
      <section className="flex-grow flex flex-col">
        <div className="grid grid-cols-[1.5fr_1.5fr_1fr_100px] px-12 py-6 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
          <div>Dispute ID</div>
          <div>Reason</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        <div className="flex-grow divide-y divide-slate-100">
          {loading ? (
            <div className="px-12 py-20 text-center text-slate-400 italic">Scanning archive...</div>
          ) : disputes.length === 0 ? (
            <div className="px-12 py-20 text-center text-slate-400 italic">No active disputes in ledger.</div>
          ) : (
            disputes.map((d) => (
              <div key={d.id} className="grid grid-cols-[1.5fr_1.5fr_1fr_100px] px-12 py-8 items-center text-sm font-medium hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-mono text-xs text-slate-900">{d.id.slice(0, 16)}</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Shipment: {d.shipmentId.slice(0, 8)}</div>
                </div>
                <div className="italic text-slate-600 line-clamp-1 pr-8">"{d.reason}"</div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] border tracking-wider uppercase ${d.status === "OPEN" ? "bg-rose-600 text-white border-rose-600" : "border-slate-200 text-slate-400"
                    }`}>
                    {d.status}
                  </span>
                </div>
                <div className="text-right">
                  <Link href={`/sender/shipment/${d.shipmentId}`} className="text-xs font-bold underline decoration-2 underline-offset-4 hover:opacity-60">
                    Review
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white px-12 py-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Log: PRTCL-DISP-09</span>
          <span>End of Dispute Archive</span>
        </footer>
      </section>
    </div>
  );
}
