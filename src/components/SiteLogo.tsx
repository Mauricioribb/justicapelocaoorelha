type SiteLogoProps = {
  variant?: "default" | "compact";
  className?: string;
};

export function SiteLogo({ variant = "default", className = "" }: SiteLogoProps) {
  const isCompact = variant === "compact";

  return (
    <div className={`text-center ${className}`}>
      <p
        className={`font-bold leading-none tracking-tight text-white ${
          isCompact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
        }`}
      >
        TARIFA <span className="text-[#6EE7B7]">ZERO</span> JA
      </p>
      <p
        className={`mt-1 font-semibold uppercase tracking-[0.25em] text-[#6EE7B7]/90 ${
          isCompact ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
        }`}
      >
        #Busão0800
      </p>
    </div>
  );
}
