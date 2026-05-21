import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className = "", isDark = false }: LogoProps) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <div className="flex items-baseline font-bold tracking-tight">
        <span style={{ color: isDark ? '#FFFFFF' : '#98C93C' }} className="text-3xl md:text-4xl">tumblë</span>
        <span style={{ color: '#F8B810' }} className="text-3xl md:text-4xl">dry</span>
      </div>
      <span className={`text-[0.6rem] md:text-xs font-bold tracking-[0.2em] mt-1 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        LAUNDRY <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>|</span> DRY CLEAN
      </span>
    </div>
  );
}
