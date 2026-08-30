'use client';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function Themelight() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); 
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── CRITICAL AUTO-PLAY ENGINE ───
  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked or interrupted by browser environment parameters:", err);
          setIsPlaying(false);
        });
    }
  }, [mounted]);

  const videoSrc = '/Manan.webm'; 
  const posterSrc = '/'; 

  // ─── MASTER INTERACTIVE CLICK SYSTEM ───
  const handleCardClick = () => {
    if (!videoRef.current) return;

    // Reset timestamp to the absolute beginning
    videoRef.current.currentTime = 0;
    
    // First interaction un-mutes audio track smoothly
    if (!hasInteracted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setHasInteracted(true);
    }

    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn(err));
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Standalone button handlers (Type annotations completely removed to fix compile error)
  const togglePlayButton = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn(err));
    }
  };

  const toggleMuteButton = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) setHasInteracted(true); 
  };

  if (!mounted) {
    /* Fixed skeletal loader to inherit dynamic parameters fluidly */
    return <div className="w-full sm:w-60 h-full min-h-[140px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm shrink-0" />;
  }

  return (
    <div 
      onClick={handleCardClick}
      /* REPLACED h-56 sm:h-52 WITH h-full AND FIXED DESKTOP WIDTH TO MATCH GRID SPACES PERFECTLY */
      className="w-full sm:w-60 h-full relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] sm:hover:scale-105 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md z-10 will-change-transform select-none cursor-pointer min-h-[140px]"
    >
      
      {/* HUD TOP STATUS INDICATOR BADGE */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider font-bold text-white uppercase select-none transition-all duration-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 duration-1000 ${isPlaying ? 'block' : 'hidden'}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-blue-500' : 'bg-zinc-500'} transition-colors duration-300`} />
        </span>
        <span className="text-zinc-200 text-[8px] tracking-tight transition-colors duration-300 group-hover:text-blue-400">
          Featured Intro
        </span>
      </div>

      {/* MAIN VIDEO CANVAS */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted={isMuted}
        loop 
        playsInline
        preload="auto"
        className="w-full h-full object-cover bg-zinc-950 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* Subtle Bottom Linear Gradient for Control Buttons Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* HOVER RESTART ACTION BANNER */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
        <div className="w-9 h-9 rounded-full bg-white/95 dark:bg-zinc-900/95 shadow-md flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/40 transform scale-90 group-hover:scale-100 transition-all duration-300">
          <RotateCcw size={13} className="text-blue-600 dark:text-blue-400 stroke-[2.5]" />
        </div>
        <span className="text-[8px] font-mono font-bold text-white uppercase tracking-widest mt-2 bg-zinc-900/80 px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
          Click To Restart
        </span>
      </div>

      {/* CONTROL INTERACTION LAYER STRIP */}
      <div className="absolute bottom-2.5 right-2.5 flex gap-1.5 z-30 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={togglePlayButton}
          className="p-1.5 rounded-md bg-zinc-900/90 text-white backdrop-blur-xs border border-white/10 hover:bg-black transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={10} className="stroke-[2.5]" /> : <Play size={10} className="fill-white stroke-[2.5]" />}
        </button>

        <button
          type="button"
          onClick={toggleMuteButton}
          className="p-1.5 rounded-md bg-zinc-900/90 text-white backdrop-blur-xs border border-white/10 hover:bg-black transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={10} className="stroke-[2.5]" /> : <Volume2 size={10} className="text-blue-400 stroke-[2.5]" />}
        </button>
      </div>

    </div>
  );
}
