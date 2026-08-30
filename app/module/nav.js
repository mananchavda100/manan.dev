<nav
  className={`fixed z-50 font-mono select-none transition-all duration-300 ease-out
    /* 📱 MOBILE ARCHITECTURE: Bottom Docked Native Chassis with Safe Area Compensation */
    bottom-0 left-0 right-0 w-full rounded-t-xl sm:rounded-t-none border-t border-[var(--card-border)]/80 bg-[var(--background)]/80 backdrop-blur-lg px-4 pt-2.5 pb-[calc(10.5px+env(safe-area-inset-bottom,16px))] shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.5)]
    
    /* 💻 DESKTOP ARCHITECTURE: Floats comfortably at the top center */
    sm:bottom-auto sm:top-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-max sm:max-w-[calc(100vw-2rem)] sm:rounded-xl sm:border sm:px-2.5 sm:py-1.5 sm:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] sm:dark:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.45)]
    
    /* Toggle Visibility animation states */
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:-translate-y-4 pointer-events-none'}
  `}
>
  {/* Inner Elements Container Frame */}
  <div className="relative group/dock flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-max bg-transparent">
    
    {/* ⚡ TECHNICAL TELEMETRY LASER LINES (Now active on mobile top border and desktop edges) */}
    <span className="absolute -top-[10.5px] sm:-top-px left-0 sm:left-6 right-0 sm:right-6 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover/dock:via-green-500/40" />
    <span className="hidden sm:block absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent pointer-events-none" />
    
    {/* Telemetry Status Ring Anchor */}
    <div 
      onClick={() => {
        setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} 
      className="relative flex items-center justify-center w-5 h-5 rounded-md bg-[var(--background)] border border-[var(--card-border)] text-[10px] font-black text-[var(--text-main)] tracking-tighter cursor-pointer transition-all duration-300 hover:border-green-500/40 group/brand shrink-0 active:scale-90 shadow-3xs"
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <svg 
          xmlns="http://w3.org" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-full h-full text-[var(--text-main)] group-hover/brand:text-green-400 transition-colors duration-300"
        >
          <g className="origin-[5px_18px] animate-[pulse_1.8s_ease-in-out_infinite_alternate]">
            <circle cx="8" cy="6" r="2.5" className="fill-[var(--text-main)] group-hover/brand:fill-green-400" />
            <path d="M4 18c0-4 2-6 4-6" />
            <path d="M8 12l4 2l3-1" className="origin-[8px_12px] animate-[bounce_0.35s_infinite_alternate]" />
            <path d="M8 12l5 3l4-1.5" className="origin-[8px_12px] animate-[bounce_0.45s_infinite_alternate_100ms]" />
          </g>
          <path d="M12 17l6-2" strokeWidth="3" className="stroke-green-500/80" />
        </svg>
      </div>

      <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-20 duration-1000" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
      </span>
    </div>

    {/* Vertical Separator */}
    <div className="h-4 w-px bg-gradient-to-b from-transparent via-[var(--card-border)]/60 to-transparent mx-0.5 sm:mx-1 pointer-events-none shrink-0" />

    {/* Dynamic Interactive Tabs Wrapper */}
    <div className="flex items-center gap-1 relative min-w-0 flex-1 sm:flex-initial overflow-x-auto no-scrollbar scroll-smooth justify-center sm:justify-start">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              handleScrollToSection(item.ref);
            }}
            className={`relative flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1 rounded-lg text-[10px] font-bold tracking-tight transition-all duration-300 cursor-pointer outline-none group/btn overflow-hidden shrink-0 transform active:scale-95
              ${isActive 
                ? 'text-green-500 dark:text-green-400 bg-green-500/[0.05] dark:bg-green-400/[0.04] border border-green-500/15 dark:border-green-400/10 shadow-[0_2px_8px_-4px_rgba(34,197,94,0.1)]' 
                : 'text-[var(--text-muted)] border border-transparent hover:text-[var(--text-main)] hover:bg-[var(--text-muted)]/5'
              }
            `}
          >
            <span className={`transition-all duration-200 shrink-0 ${isActive ? 'scale-105 text-green-500 dark:text-green-400 drop-shadow-[0_0_3px_rgba(34,197,94,0.2)]' : 'text-[var(--text-dim)] group-hover/btn:text-[var(--text-main)]'}`}>
              {item.icon}
            </span>
            
            <span className="uppercase text-[9px] tracking-wide relative z-10 hidden sm:inline-block transition-colors duration-200">
              {item.label}
            </span>
            
            {isActive && (
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-90" />
            )}
          </button>
        );
      })}
    </div>

    {/* Vertical Separator */}
    <div className="h-4 w-px bg-gradient-to-b from-transparent via-[var(--card-border)]/60 to-transparent mx-0.5 sm:mx-1 pointer-events-none shrink-0" />
    
    {/* Runtime Core Theme Controller Module */}
    <button 
      onClick={() => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        }
        if (typeof setLocalTheme === 'function') {
          setLocalTheme(nextTheme);
        }
      }}
      className="flex items-center gap-1.5 px-2 py-2 sm:py-1 rounded-lg border border-transparent hover:border-[var(--card-border)]/30 text-[var(--text-muted)] hover:text-green-400 dark:hover:text-green-400 hover:bg-[var(--text-muted)]/5 transition-all duration-200 cursor-pointer outline-none group/theme shrink-0 active:scale-95" 
      aria-label="Toggle runtime theme"
    >
      <div className="relative w-3 h-3 flex items-center justify-center transition-transform duration-300 group-hover/theme:rotate-45 shrink-0">
        {!mounted ? (
          <div className="w-2.5 h-2.5 rounded-full border border-dashed border-[var(--text-dim)] animate-spin" />
        ) : (typeof localTheme !== 'undefined' ? localTheme === 'dark' : resolvedTheme === 'dark' || (typeof window !== 'undefined' && document.documentElement.classList.contains('dark'))) ? (
          <Sun size={11} className="stroke-[2.5]" />
        ) : (
          <Moon size={11} className="stroke-[2.5]" />
        )}
      </div>
      
      <span className="text-[7.5px] font-mono font-bold text-[var(--text-dim)] transition-colors duration-200 group-hover/theme:text-green-400 hidden xs:inline-block">
        {!mounted ? '--' : (typeof localTheme !== 'undefined' ? localTheme === 'dark' : resolvedTheme === 'dark' || (typeof window !== 'undefined' && document.documentElement.classList.contains('dark'))) ? '01' : '00'}
      </span>
    </button>

  </div>
</nav>