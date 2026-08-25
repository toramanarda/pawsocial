export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-colors transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer";

  const variants = {
    primary: "bg-coral text-white hover:bg-coral-dark shadow-button",
    secondary: "bg-surface text-ink hover:bg-line/50 border border-line",
    outline: "bg-transparent border border-coral text-coral hover:bg-coral/10",
    ghost: "bg-transparent text-muted hover:text-ink hover:bg-surface",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-[12px]",
    md: "px-5 py-2 text-[14px]",
    lg: "px-6 py-3 text-[15px] w-full",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}