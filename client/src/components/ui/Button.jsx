export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 font-semibold transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-foreground 
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#181818] hover:opacity-80 text-white"
          } ${className}`}
    >
      {children}
    </button>
  );
}
