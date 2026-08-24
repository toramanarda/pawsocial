export default function Avatar({ initials = "BS", color = "teal", size = "md", className = "" }) {
  const colorStyles = {
    teal: "bg-gradient-to-br from-[#8fc1bc] to-[#315f69]",
    peach: "bg-gradient-to-br from-[#e9a889] to-[#ae5e47]",
    violet: "bg-gradient-to-br from-[#a797da] to-[#584789]",
  };

  const sizeStyles = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-[38px] h-[38px] text-xs",
    lg: "w-[72px] h-[72px] text-base",
  };

  return (
    <div
      className={`grid place-items-center rounded-full text-white font-bold shrink-0 ${colorStyles[color] || colorStyles.teal} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {initials}
    </div>
  );
}