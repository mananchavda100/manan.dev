'use client';

export default function Themelight() {
  return (
    <div className="w-full sm:w-60 h-full relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] sm:hover:scale-105 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md z-10 will-change-transform select-none min-h-[140px]">
      
      {/* HUD TOP STATUS INDICATOR BADGE */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider font-bold text-white uppercase select-none transition-all duration-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 duration-1000" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500 transition-colors duration-300" />
        </span>
        <span className="text-zinc-200 text-[8px] tracking-tight transition-colors duration-300 group-hover:text-blue-400">
          Featured Intro
        </span>
      </div>

      {/* GOOGLE DRIVE EMBED STREAM */}
      <iframe
        src="https://drive.google.com/file/d/1Ih0OyrdLalfXrwal7H18YW6TpHZzhIwY/preview"
        title="Manan Intro Video"
        className="w-full h-full border-0 bg-zinc-950 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

    </div>
  );
}
