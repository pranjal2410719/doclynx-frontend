import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]",
        className,
      )}
      {...props}
    />
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const variants = {
    primary: "bg-slate-900 !text-white hover:bg-slate-700 disabled:bg-slate-300",
    secondary: "bg-amber-400 text-slate-900 hover:bg-amber-300 disabled:bg-amber-200",
    ghost: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400",
    danger: "bg-rose-600 text-white hover:bg-rose-500 disabled:bg-rose-300",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function Alert({
  tone = "default",
  children,
  className,
}: {
  tone?: "default" | "error" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  const tones = {
    default: "border-slate-200 bg-slate-50 text-slate-700",
    error: "border-rose-200 bg-rose-50 text-rose-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return <div className={cn("rounded-2xl border px-4 py-3 text-sm", tones[tone], className)}>{children}</div>;
}

export function StatusBadge({ value }: { value: string }) {
  const colors: Record<string, string> = {
    CREATED: "bg-slate-100 text-slate-800",
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-purple-100 text-purple-800",
    VERIFIED: "bg-emerald-100 text-emerald-800",
    DISPUTED: "bg-rose-100 text-rose-800",
    LOCKED: "bg-amber-100 text-amber-800",
    RELEASED: "bg-emerald-100 text-emerald-800",
    PICKUP: "bg-indigo-100 text-indigo-800",
    DELIVERY: "bg-cyan-100 text-cyan-800",
  };

  return (
    <span className={cn(
      "rounded-full px-2.5 py-0.5 text-xs font-bold uppercase",
      colors[value] || "bg-slate-100 text-slate-800"
    )}>
      {value}
    </span>
  );
}
