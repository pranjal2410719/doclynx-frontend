"use client";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#EAEBEB] p-8 lg:p-24 selection:bg-black selection:text-white font-sans">
      <div className="max-w-4xl mx-auto border border-black/10 bg-white p-12 lg:p-24 shadow-2xl">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#D0554A] mb-12 block hover:translate-x-2 transition-transform">← Return to Network</Link>
        <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-4 block">DOCLYNX_LEGAL // MANIFEST_01</span>
        <h1 className="text-6xl font-light tracking-tighter mb-16 uppercase">Terms of Use</h1>
        
        <div className="space-y-12 text-lg font-light leading-relaxed text-[#1D1D1D]/70">
          <section>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight mb-4">Mandatory Verification Protocols</h2>
            <p>By using DocLynx, users agree that all deliveries are subject to mandatory verification protocols. Payment release is conditional upon successful completion of verification steps defined during order creation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight mb-4">Infrastructure Provider Role</h2>
            <p>DocLynx acts as a neutral infrastructure provider and does not guarantee delivery outcomes but ensures verifiable transaction records. All interactions within the network are logged as cryptographical artifacts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight mb-4">Intellectual Property</h2>
            <p>© 2026 DocLynx. All rights reserved. All content, features, and functionality of this platform, including but not limited to design, systems, workflows, verification mechanisms, and software, are the exclusive property of DocLynx.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
