"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card, Button, Input, Textarea, Alert } from "@/components/ui";
import { Shipment } from "@/types";
import Link from "next/link";

export default function CreateShipmentPage() {
  const router = useRouter();
  const [receiverId, setReceiverId] = useState("");
  const [courierId, setCourierId] = useState("");
  const [description, setDescription] = useState("");
  const [escrowAmount, setEscrowAmount] = useState("100.00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const shipment = await api<Shipment>("/shipment/create", {
        method: "POST",
        body: {
          receiverId,
          courierId: courierId || undefined,
          description,
          escrowAmount: parseFloat(escrowAmount),
        },
      });
      router.push(`/sender/shipment/${shipment.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#EAEBEB]">
      {/* Navigation */}
      <div className="px-6 lg:px-12 py-6">
        <Link
          href="/sender/dashboard"
          className="group flex items-center gap-2 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#D0554A] hover:text-black transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Return to Hub
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 lg:px-12 py-8 lg:py-10 border-b border-black relative overflow-hidden bg-white">
        <div className="flex justify-between text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8 border-b border-black/5 pb-4">
          <span>Node: DLX-SENDER-01</span>
          <span className="text-[#D0554A] hidden sm:inline">Protocol: INITIALIZE_MANIFEST</span>
          <span>Region: NA-GLOBAL</span>
        </div>
        <h2 className="text-[2.5rem] lg:text-[4.5rem] font-light leading-[0.9] tracking-tighter uppercase">
          New <br />Shipment<span className="text-[#D0554A]">_</span>
        </h2>
      </header>

      {/* Form Area */}
      <section className="p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white border border-black p-6 lg:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] lg:shadow-[12px_12px_0px_rgba(0,0,0,0.05)]">
            {error && <Alert tone="error" className="mb-8">{error}</Alert>}

            <form onSubmit={handleSubmit} className="space-y-10 lg:space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient ID (Required)</label>
                  <Input
                    required
                    className="border-b border-black/20 rounded-none focus:border-[#D0554A] transition-colors p-0 text-lg lg:text-xl font-light h-10 lg:h-12 bg-transparent border-t-0 border-l-0 border-r-0"
                    placeholder="ID-000-000"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Courier ID (Node Assigned)</label>
                  <Input
                    className="border-b border-black/20 rounded-none focus:border-[#D0554A] transition-colors p-0 text-lg lg:text-xl font-light h-10 lg:h-12 bg-transparent border-t-0 border-l-0 border-r-0"
                    placeholder="DLX-COU-XXX"
                    value={courierId}
                    onChange={(e) => setCourierId(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Escrow Value (USD)</label>
                <div className="relative">
                  <span className="absolute left-0 top-1 text-2xl lg:text-4xl font-light text-slate-300">$</span>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    className="pl-6 lg:pl-8 border-b border-black/20 rounded-none focus:border-[#D0554A] transition-colors p-0 text-4xl lg:text-6xl font-light h-16 lg:h-20 bg-transparent border-t-0 border-l-0 border-r-0 tracking-tighter"
                    value={escrowAmount}
                    onChange={(e) => setEscrowAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400">Content Declaration</label>
                <Textarea
                  required
                  placeholder="Itemize shipment contents for audit..."
                  className="w-full border border-black/10 rounded-none focus:border-black min-h-[120px] lg:min-h-[150px] p-4 lg:p-6 text-base lg:text-lg font-light leading-relaxed outline-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-20 lg:h-24 bg-black text-white flex items-center justify-between px-8 lg:px-12 group hover:opacity-90 transition-all disabled:opacity-50"
              >
                <span className="text-xl lg:text-2xl font-light uppercase tracking-tight">
                  {loading ? "INITIALIZING..." : "EXECUTE PROTOCOL"}
                </span>
                <span className="text-3xl lg:text-4xl group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </form>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-6 lg:space-y-8">
            <div className="border border-black p-6 lg:p-8 bg-white/50 backdrop-blur-sm">
              <span className="text-[9px] lg:text-[10px] font-black text-[#D0554A] uppercase block mb-3 lg:mb-4">Verification Check</span>
              <p className="text-xs lg:text-sm font-light leading-relaxed text-slate-600">
                Shipment will be locked in the DocLynx network until double-ended proof-of-delivery is verified by the recipient node.
              </p>
            </div>
            <div className="border border-black p-6 lg:p-8 bg-black text-white">
              <span className="text-[9px] lg:text-[10px] font-black uppercase text-slate-500 block mb-3 lg:mb-4">Security Protocol 004</span>
              <p className="text-xs lg:text-sm font-light leading-relaxed opacity-80">
                Unauthorized manifest tampering results in permanent node exclusion. All metadata is time-stamped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="px-6 lg:px-12 py-6 lg:py-8 border-t border-black bg-white flex flex-col sm:flex-row justify-between items-center text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest gap-4">
        <span>Protocol: INITIAL_INGEST_V4</span>
        <span className="text-black">Internal DocLynx Network Only</span>
      </footer>
    </div>
  );
}
