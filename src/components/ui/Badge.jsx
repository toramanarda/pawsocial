export default function Badge({
  children,
  variant = "category",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors";

  const variants = {
    category: "bg-surface text-ink border border-line",
    coral: "bg-coral/10 text-coral",
    green: "bg-green-50 text-green-700 border border-green-200",
    muted: "bg-surface text-muted",
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.category} ${className}`}>
      {children}
    </span>
  );
}