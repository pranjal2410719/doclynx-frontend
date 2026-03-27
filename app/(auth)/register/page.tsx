"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("SENDER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password, role });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#EAEBEB] font-sans text-[#1D1D1D] overflow-x-hidden">
      {/* Left Pane (Same as Login for branding consistency) */}
      <div className="flex-1 bg-gradient-to-b from-[#F8DACD] to-[#EAEBEB] p-6 lg:p-16 flex flex-col border-b lg:border-r border-black relative max-w-full lg:max-w-[50%]">
        <div className="flex justify-between items-start mb-12 lg:mb-32">
          <img src="/image-removebg-preview.png" alt="DocLynx Logo" className="w-16 lg:w-24 h-16 lg:h-24 object-contain" />
          <Link href="/" className="bg-[#DCE0E3] hover:bg-[#D0D5D9] px-4 py-2 rounded-full text-[10px] lg:text-sm transition-colors">
            Back to site <span className="text-[0.6em] align-top ml-0.5">3</span>
          </Link>
        </div>

        <h1 className="text-4xl lg:text-[4rem] font-light leading-[1.1] tracking-tight mb-6 lg:mb-8">
          Welcome to our<br />business portal.
        </h1>
        <div className="text-sm lg:text-lg font-normal mb-8 text-[#1D1D1D]">
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).replace(',', ',')}
        </div>

        <div className="h-[1px] bg-black w-full mb-8"></div>

        <div className="hidden lg:flex bg-[#F4C9BA] p-6 mt-auto justify-between items-end">
          <div>
            <span className="text-[#D0554A] text-xs font-medium">000</span>
            <h3 className="text-2xl font-light mt-2 text-[#1D1D1D]">Registration</h3>
            <p className="text-sm text-[#1D1D1D] mt-2 opacity-80 max-w-[80%]">Self-service portal for corporate citizen induction.</p>
          </div>
          <div className="text-2xl font-light">→</div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-[1.2] bg-[#EAEBEB] p-6 lg:p-24 flex flex-col justify-center relative min-h-[600px]">
        <div className="absolute top-6 lg:top-16 right-6 lg:right-24">
          <Link href="/login" className="bg-white border border-black/10 hover:bg-[#F8DACD] text-black px-6 py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all shadow-sm">
            Already have access
          </Link>
        </div>

        <div className="w-full max-w-[520px]">
          <h2 className="text-4xl lg:text-[3.5rem] font-light mb-12 lg:mb-16 tracking-tight">
            Register <span className="text-[0.4em] align-top">13</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[#D0554A] text-[10px] font-bold">001</span>
                <label className="text-lg lg:text-xl font-light tracking-tight">Full Name</label>
              </div>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-black text-xl lg:text-2xl font-light py-2 outline-none focus:border-b-2 transition-all placeholder:text-[#A0A0A0]"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[#D0554A] text-[10px] font-bold">002</span>
                <label className="text-lg lg:text-xl font-light tracking-tight">Corporate Email</label>
              </div>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-black text-xl lg:text-2xl font-light py-2 outline-none focus:border-b-2 transition-all placeholder:text-[#A0A0A0]"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[#D0554A] text-[10px] font-bold">003</span>
                <label className="text-xl font-light">Password</label>
              </div>
              <input
                type="password"
                required
                className="w-full bg-transparent border-b border-black text-2xl font-light py-2 outline-none focus:border-b-2 transition-all placeholder:text-[#A0A0A0]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[#D0554A] text-[10px] font-bold">004</span>
                <label className="text-xl font-light">System Role</label>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {(['SENDER', 'COURIER', 'RECEIVER'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${role === r ? 'bg-black text-white' : 'bg-[#DCE0E3] text-black hover:bg-[#D0D5D9]'
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm italic">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#282A2D] hover:bg-black text-white p-8 group flex justify-between items-center transition-all disabled:opacity-50"
            >
              <div className="text-left">
                <span className="text-[#8A8B8C] text-[10px] block mb-2 uppercase">005</span>
                <span className="text-3xl font-light tracking-tight">{loading ? "Registering..." : "Submit Request"}</span>
              </div>
              <span className="text-3xl font-light transition-transform group-hover:translate-x-2">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
