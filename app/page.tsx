"use client";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Lenis from "lenis";

export default function LandingPage() {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // Wait for global Lenis to initialize
    const checkLenis = setInterval(() => {
      const lenis = (window as any).lenis;
      if (lenis) {
        clearInterval(checkLenis);
        lenisRef.current = lenis;

        const handleScroll = ({ scroll, direction }: { scroll: number; direction: number }) => {
          if (scroll > 100 && direction === 1) {
            setIsVisible(false);
          } else if (direction === -1) {
            setIsVisible(true);
          }
          setShowScrollTop(scroll > 500);
        };

        lenis.on('scroll', handleScroll);
      }
    }, 100);

    return () => {
      clearInterval(checkLenis);
      (window as any).lenis?.off('scroll');
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0);
  };

  useEffect(() => {
    if (isReady && user) {
      switch (user.role) {
        case "SENDER": router.push("/sender/dashboard"); break;
        case "COURIER": router.push("/courier/dashboard"); break;
        case "RECEIVER": router.push("/receiver/dashboard"); break;
      }
    }
  }, [user, isReady, router]);

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-[#EAEBEB] text-[#1D1D1D] selection:bg-black selection:text-white font-sans overflow-x-hidden">
      {/* 1. Global Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-16 py-4 flex justify-between items-center bg-[#EAEBEB]/80 backdrop-blur-sm border-b border-black/5 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center gap-2 lg:gap-3">
          <img src="/image-removebg-preview.png" alt="DocLynx Logo" className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
          <span className="text-sm lg:text-lg font-light tracking-tighter uppercase text-black">DocLynx</span>
        </div>
        <div className="flex gap-2 lg:gap-4">
          <Link href="/login" className="px-3 lg:px-4 py-1.5 rounded-full border border-black/20 text-black text-[9px] lg:text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all bg-white/50">
            Portal Access
          </Link>
          <Link href="/register" className="hidden sm:block px-4 py-1.5 rounded-full border border-black/20 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all bg-white/50">
            Register Index
          </Link>
        </div>
      </nav>

      {/* 0. Brand Intro Hero */}
      <section className="min-h-screen flex flex-col justify-end px-6 lg:px-16 pt-32 pb-24 lg:pb-32 bg-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F8DACD]/30 -skew-x-12 translate-x-32 hidden lg:block" />

        {/* Huge Background Logo */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 lg:translate-x-1/4 opacity-[0.03] pointer-events-none select-none">
          <img src="/image-removebg-preview.png" alt="" className="w-[20rem] lg:w-[80rem] object-contain rotate-12" />
        </div>

        <div className="max-w-[1400px] relative z-10">
          <div className="mb-16 lg:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase text-[#D0554A] mb-4 lg:mb-6 block">
              ESTABLISHED // 2026_NETWORK
            </span>
            <h1 className="text-[12vw] font-light leading-[0.85] tracking-tighter text-black uppercase mb-6 lg:mb-8">
              DocLynx<span className="text-[#D0554A]">.</span>
            </h1>
            <p className="text-xl lg:text-4xl font-light tracking-tight text-black max-w-3xl leading-snug">
              A verification-first delivery infrastructure designed for high-trust transactions where traditional systems fail.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between items-start lg:items-baseline border-t border-black/10 pt-10 lg:pt-12 animate-in fade-in duration-1000 delay-500 w-full max-w-[1400px]">
            <div className="flex flex-col gap-1 lg:gap-2">
              <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Mission</span>
              <span className="text-xs lg:text-sm font-medium uppercase italic">"Eliminating fraud through double-ended verification."</span>
            </div>
            <div className="flex flex-col gap-1 lg:gap-2">
              <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Network ID</span>
              <span className="text-xs lg:text-sm font-mono uppercase">DLX_INTERNAL_PROTOCOL_V4</span>
            </div>
            <div className="lg:ml-auto pt-4 lg:pt-0">
              <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="flex items-center gap-4 group">
                <span className="text-xs font-bold uppercase tracking-widest">Audit Protocol</span>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  ↓
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Narrative Section: The Problem - Trust Reliance */}

      {/* 3. The Protocol Sequence */}
      <section className="min-h-screen bg-black text-white py-16 lg:py-32 px-6 lg:px-16 flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between lg:items-baseline mb-12 lg:mb-32 border-b border-white/10 pb-8 lg:pb-16 gap-4">
          <h2 className="text-[12vw] lg:text-[5rem] font-light tracking-tight leading-none uppercase">
            The Protocol
          </h2>
          <span className="text-[#D0554A] font-mono text-[10px] lg:text-sm tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">SYSTEM_VERSION_2026.4</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-y-32 lg:gap-x-16">
          <StepCard number="01" title="Create Manifest" desc="Sender uploads package details and verification requirements into the tamper-proof ledger." />
          <StepCard number="02" title="Lock Liquidity" desc="Corporate funds are locked in a secure escrow system, awaiting validation clearance." />
          <StepCard number="03" title="Pickup Audit" desc="Delivery agent verifies the package with high-fidelity image capture and time-stamped metadata." />
          <StepCard number="04" title="Transit Pulse" desc="Live tracking and autonomous system logging maintain the integrity of the delivery stream." />
          <StepCard number="05" title="Receiver Scrutiny" desc="The recipient confirms delivery via secure OTP or QR-based image validation." />
          <StepCard number="06" title="Settlement" desc="Funds are released the moment the double-ended verification pulse is finalized." />
        </div>
      </section>

      {/* 4. Value Grid */}
      <section className="py-32 lg:py-64 bg-white border-t border-black/10">
        <div className="px-6 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-32 max-w-[1400px] mx-auto">
          <div className="bg-[#F4C9BA] p-10 lg:p-24 relative flex flex-col justify-between overflow-hidden group min-h-[400px]">
            <span className="text-[12rem] lg:text-[20rem] font-black text-black/5 absolute -bottom-12 -right-12 select-none group-hover:scale-110 transition-transform duration-1000">01</span>
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D0554A] mb-6 block">VALUE_PROP_A</span>
              <h3 className="text-[12vw] lg:text-6xl font-light mb-8 lg:mb-12 leading-none uppercase">Trustless <br />Transaction Layer.</h3>
              <p className="text-sm lg:text-lg font-light leading-relaxed max-w-sm">Every delivery is backed by immutable evidence logs, reducing disputes by 94% across the network.</p>
            </div>
            <div className="relative z-10 pt-10 mt-auto flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-black flex items-center justify-center">→</div>
              <span className="text-[10px] font-bold uppercase">View Case Study</span>
            </div>
          </div>

          <div className="bg-[#2F5C4F] p-10 lg:p-24 text-white relative flex flex-col justify-between overflow-hidden group min-h-[400px]">
            <span className="text-[12rem] lg:text-[20rem] font-black text-white/5 absolute -bottom-12 -right-12 select-none group-hover:scale-110 transition-transform duration-1000">02</span>
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D0554A] mb-6 block">VALUE_PROP_B</span>
              <h3 className="text-[12vw] lg:text-6xl font-light mb-8 lg:mb-12 leading-none uppercase">Conditional <br />Settlement Engine.</h3>
              <p className="text-sm lg:text-lg font-light leading-relaxed max-w-sm italic opacity-80 underline decoration-white/20 underline-offset-8">"If it's not verified, it's not paid."</p>
            </div>
            <div className="relative z-10 pt-10 mt-auto flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white flex items-center justify-center">→</div>
              <span className="text-[10px] font-bold uppercase">Protocol Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer / CTA */}
      <footer className="bg-[#EAEBEB] p-8 lg:p-16 border-t border-black overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-16 lg:gap-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-0">
            <h2 className="text-[12.5vw] lg:text-[10rem] font-light leading-none tracking-tighter uppercase whitespace-nowrap">DOCLYNX_</h2>
            <div className="pb-4 lg:pb-8 space-y-4">
              <Link href="/register" className="block text-2xl lg:text-4xl font-light hover:text-[#D0554A] transition-colors uppercase">Start induction →</Link>
              <Link href="/login" className="block text-2xl lg:text-4xl font-light hover:text-[#D0554A] transition-colors uppercase">Hub Access →</Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-16 border-t border-black/10 pt-16 text-[10px] font-bold uppercase tracking-widest text-black/50">
            <div>
              <p className="mb-4 text-black">Target Sectors</p>
              <ul className="space-y-2 list-none">
                <li>High-Value Commerce</li>
                <li>Legal Manifests</li>
                <li>Pharmaceutical Supply</li>
                <li>Sensitive Documentation</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-black">Platform</p>
              <ul className="space-y-2 list-none underline decoration-black/10 underline-offset-4">
                <li><Link href="/legal/terms">Terms of Use</Link></li>
                <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                <li><Link href="/register">Network Index</Link></li>
                <li><Link href="/login">Secure Portal</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2 text-right self-end">
              <p>© 2026 DocLynx. All rights reserved.</p>
              <p className="mt-2 text-[8px] opacity-60">IF IT'S NOT VERIFIED, IT'S NOT DELIVERED.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-black/20 text-black shadow-xl flex items-center justify-center z-50 transition-all duration-500 hover:scale-110 active:scale-95 hover:bg-black hover:text-white hover:border-black ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
      >
        <span className="text-sm font-bold">↑</span>
      </button>
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="group border-l border-white/20 pl-8 hover:border-[#D0554A] transition-colors">
      <span className="text-[#D0554A] font-black text-xl mb-4 block group-hover:translate-x-4 transition-transform">{number}</span>
      <h3 className="text-4xl font-light mb-6 transition-colors group-hover:text-[#D0554A]">{title}</h3>
      <p className="text-sm font-light text-white/50 leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}
