"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const receiverLinks = [
  { href: "/receiver/dashboard", label: "My Shipments" },
];

export default function ReceiverLayout({ children }: { children: React.ReactNode }) {
  const { user, isReady, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isReady && (!user || user.role !== "RECEIVER")) {
      router.push("/login");
    }
  }, [user, isReady, router]);

  if (!isReady || !user || user.role !== "RECEIVER") {
    return <div className="flex min-h-screen items-center justify-center">Loading Receiver Console...</div>;
  }

  return (
    <div className="flex min-h-screen justify-center p-0 md:p-12 bg-white font-sans text-slate-900">
      <div className="flex w-full max-w-[1400px] md:border md:border-slate-200 bg-white md:shadow-sm overflow-hidden flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-10 border-b border-slate-200">
            <img src="/image-removebg-preview.png" alt="DocLynx Logo" className="w-12 h-12 object-contain mb-6" />
            <h1 className="text-[2.5rem] font-medium leading-[1.1] tracking-tight mb-2">
              Receiver<br />Hub
            </h1>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inbound Check</div>
            <div className="text-[10px] text-slate-400 italic">verification portal v1.0</div>
          </div>
          
          <nav className="flex-grow">
            <ul className="list-none">
              {receiverLinks.map((link) => (
                <li key={link.href} className="border-b border-slate-200">
                  <Link
                    href={link.href}
                    className={`block px-8 py-6 text-lg transition-colors ${
                      pathname === link.href 
                      ? "text-black font-bold bg-slate-50" 
                      : "text-slate-500 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-8 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Corporate Receiver</span>
            <span className="text-xl font-bold text-slate-900 block">{user.name}</span>
            <button 
              onClick={logout} 
              className="mt-4 text-xs font-bold text-slate-900 underline decoration-2 underline-offset-4 hover:opacity-60 transition"
            >
              Sign Out [X]
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col min-w-0 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
