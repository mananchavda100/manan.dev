'use client';
import { useRef, useState, useEffect } from 'react';

export default function Themelight() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Automatically force playback on mount and handle strict browser policies
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.warn("Autoplay blocked, showing play trigger:", error);
          setIsPlaying(false);
        });
    }
  }, []);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Playback failed:", err));
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Restart failed:", err));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  // Explicitly target the repository subpath for GitHub Pages deployment
  const basePath = process.env.NODE_ENV === 'production' ? '/manan.dev' : '';
  const videoSource = `${basePath}/Manan.mp4`;

  return (
    <div className="w-full sm:w-60 h-full relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.03] sm:hover:scale-105 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md z-10 will-change-transform select-none min-h-[140px] flex flex-col">
      
      {/* HUD TOP STATUS INDICATOR BADGE */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider font-bold text-white uppercase select-none transition-all duration-300 pointer-events-none">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 duration-1000" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500 transition-colors duration-300" />
        </span>
        <span className="text-zinc-200 text-[8px] tracking-tight transition-colors duration-300 group-hover:text-blue-400">
          Featured Intro
        </span>
      </div>

      {/* HTML5 VIDEO PLAYER CONTAINER */}
      <div className="relative w-full h-[260px] sm:h-full flex-1 overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* INTERACTIVE CONTROLS OVERLAY (RESTART / PLAY) */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-none z-20">
          
          {/* Play / Pause Fallback Button if Autoplay fails */}
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="pointer-events-auto bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transition-all duration-300 shadow-2xl transform hover:scale-110 flex items-center justify-center animate-bounce"
              title="Play Video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          {/* Standard Hover Restart Button */}
          <button
            onClick={handleRestart}
            className="pointer-events-auto bg-white/80 hover:bg-white text-zinc-900 dark:bg-black/60 dark:hover:bg-black/80 dark:text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-md shadow-xl transform hover:scale-110 flex items-center justify-center"
            title="Restart Video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* MUTE / UNMUTE BUTTON */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-zinc-900 dark:bg-black/60 dark:hover:bg-black/80 dark:text-white px-2.5 py-1 rounded-md text-[10px] font-medium transition-all backdrop-blur-md shadow-md flex items-center gap-1.5 z-20 border border-zinc-200/50 dark:border-transparent opacity-80 group-hover:opacity-100"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>Muted</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.900a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span>Sound On</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
} 
