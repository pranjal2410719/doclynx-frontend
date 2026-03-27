"use client";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#EAEBEB] p-8 lg:p-24 selection:bg-black selection:text-white font-sans">
      <div className="max-w-4xl mx-auto border border-black/10 bg-white p-12 lg:p-24 shadow-2xl">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#D0554A] mb-12 block hover:translate-x-2 transition-transform">← Return to Network</Link>
        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-4 block">DOCLYNX_LEGAL // MANIFEST_02</span>
        <h1 className="text-6xl font-light tracking-tighter mb-16 uppercase">Privacy Policy</h1>
        
        <div className="space-y-12 text-lg font-light leading-relaxed text-[#1D1D1D]/70">
          <section>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight mb-4">Verification Processing</h2>
            <p>DocLynx collects and processes data including images, location metadata, timestamps, and user authentication inputs solely for delivery verification and fraud prevention purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight mb-4">Data Security</h2>
            <p>All verification artifacts are securely stored and used only within the scope of delivery validation and dispute resolution. No data is shared with third-party logistics marketplaces beyond the core verification stream.</p>
          </section>

          <section className="pt-16 border-t border-black/5 text-[10px] font-bold uppercase tracking-widest text-[#D0554A]">
            002 // DATA_INTEGRITY_PROTOCOLS_ACTIVE
          </section>
        </div>
      </div>
    </div>
  );
}
