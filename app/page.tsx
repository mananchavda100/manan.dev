'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sun, Moon, Code2, Terminal, Database, GitBranch, Cpu,
  Home, Briefcase, User, ArrowUpRight, MapPin, FileText, 
  Globe, Workflow, Milestone, HandshakeIcon, Layers, BrainCircuit, Search, Fingerprint, UsersRoundIcon, Mail, Phone, Activity, ShieldCheck, Binary, ShieldAlert, Code, Command, Timer, Book,
  BookIcon,
  BookImageIcon,
  BookImage,
  Blocks,
} from 'lucide-react';
import Themelight from './module/Themelight';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  // ─── 1. ALL HOOK AND ELEMENT REFS ───
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const buildsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null); 

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const badgeStreamRef = useRef<HTMLDivElement>(null);
  
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [systemTime, setSystemTime] = useState(''); 
  const lastScrollY = useRef(0);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // ─── NAV ITEMS DATA DEFINITION ───
  const navItems = [
    { id: 'home', label: 'SYS_INIT', ref: headerRef, icon: <Home size={11} /> },
    { id: 'about', label: 'BIO_NODE', ref: bioSectionRef, icon: <User size={11} /> },
    { id: 'work', label: 'LOG_WORK', ref: previousRef, icon: <Briefcase size={11} /> },
    { id: 'projects', label: 'SRC_BUILDS', ref: buildsRef, icon: <Code size={11} /> },
    { id: 'skills', label: 'CAP_ARCH', ref: skillsRef, icon: <Terminal size={11} /> },
    { id: 'contact', label: 'TLM_LINK', ref: contactRef, icon: <Mail size={11} /> }
  ];

  // ─── HANDLERS ───
  const handleScrollToSection = (elementRef: React.RefObject<HTMLElement | null>) => {
    if (elementRef && elementRef.current) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elementRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

 
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  }, [resolvedTheme, mounted]);

  const isDark = resolvedTheme === 'dark';


  // ─── 3. REAL-TIME SYSTEM TELEMETRY CLOCK EFFECT ───
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setSystemTime(`${formattedTime} IST`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // ─── 4. MATRIX / CYBER BG GRID PARTICLES BACKGROUND ───
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 24), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(22, 163, 74, 0.08)';
      ctx.strokeStyle = isDark ? 'rgba(34, 197, 94, 0.03)' : 'rgba(22, 163, 74, 0.02)';

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted, isDark]);

  // ─── 5. MASTER GSAP & AUTO-INTERSECTION TRACKING ENGINE ───
  useEffect(() => {
    if (!mounted) return;
    
    const ctx = gsap.context(() => {
      // UX Entrance Sequence
      const headerTl = gsap.timeline();
      headerTl.fromTo(headerRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      headerTl.fromTo(['.hdr-name', '.hdr-tags', '.hdr-badge', '.hdr-meta', '.hdr-btn'], { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.08 }, '-=0.35');

      if (videoWrapperRef.current) {
        gsap.fromTo(videoWrapperRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 });
      }

      // Scroll Handling & Real-time Content Intersections
      const sections = [
        { id: 'home', ref: headerRef },
        { id: 'about', ref: bioSectionRef },
        { id: 'work', ref: previousRef },
        { id: 'projects', ref: buildsRef },
        { id: 'skills', ref: skillsRef },
        { id: 'contact', ref: contactRef }
      ];

      sections.forEach((sec) => {
  if (sec.ref.current) {
    const isBuilds = sec.id === 'projects';
    const isSkills = sec.id === 'skills';
    
    gsap.fromTo(sec.ref.current,
      { opacity: 0.1, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        onStart: () => {
          if (isBuilds) {
            gsap.fromTo('.tl-card-build', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', overwrite: 'auto' });
          }
          if (isSkills) {
            gsap.fromTo('.skill-badge-item', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.01, ease: 'power1.out', overwrite: 'auto' });
          }
        },
        scrollTrigger: {
          trigger: sec.ref.current,
          start: 'top center+=120',  
          end: 'bottom center',    
          toggleActions: 'play reverse play reverse',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveTab(sec.id);
            }
          }
        }
      }
    );
  }
});

      // Work Node Visual Connectors
      if (previousRef.current) {
        gsap.fromTo('.tl-bridge-line',
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: previousRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            }
          }
        );
      }
    
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // ─── 6. NAVIGATION AUTO-HIDE ON SCROLL EFFECT ───
  useEffect(() => {
    const handleScrollVisibility = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // Hide on down scroll
      } else {
        setIsVisible(true);  // Reveal on up scroll
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // if (!mounted) return null;

  const [activeEnv, setActiveEnv] = useState<'Intro' | 'dev' | 'prod'>('Intro');
  const connectionSpeed = activeEnv === 'prod' ? '12ms' : '44ms';

  
  // Telemetry: Auto-detect active section during viewport scrolling (Synced with GSAP triggers)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px', // Perfectly maps around the GSAP layout threshold shift
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    ['home', 'about', 'work'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // const [activeIdx, setActiveIdx] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Smoothly scrolls mobile viewports to the preview block when an item is selected
  const handleItemSelect = (idx: number) => {
    setActiveIdx(idx);
    
    // Check if the screen layout is single-column (mobile/tablet)
    if (window.innerWidth < 768 && viewerRef.current) {
      setTimeout(() => {
        viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };


useEffect(() => {
  setMounted(true);
  
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return () => clearTimeout(timer);
}, []);

const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your communication logic here
    setTimeout(() => setIsSubmitting(false), 1500);
  };


  const experiences = [
    { company: 'Freelancer Self-Employed', role: 'Full-Stack Engineer', loc: 'Ahmedabad', period: '2023 - Present' },
    { company: 'Qualitude Infotech', role: 'Full-Stack PHP Engineer', loc: 'Ahmedabad', period: '2021 - 2023' },
    { company: 'Sky9 IT Craft', role: 'Web Developer Intern', loc: 'Rajkot', period: '2021' }
  ];

  const projects = [
  {
    id: "sys.01",
    title: "Microservices E-Commerce Platform",
    desc: "Architected a high-throughput Turborepo monorepo with 5 decoupled services, featuring a hybrid PostgreSQL/MongoDB layer and sub-100ms state updates via BetterAuth and Zustand.",
    tags: ['Next.js', 'Turborepo', 'TypeScript', 'Expressjs','Prisma ORM','BetterAuth','JWT', 'PostgreSQL', 'MongoDB', 'Zustand'],
    imgSrc: "https://plus.unsplash.com/premium_photo-1728395867333-7bf97cb82699?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE5fHxtaWNyb3NlcnZpY2VzJTIwYXBwfGVufDB8fDB8fHww"
  },
  {
    id: "sys.02",
    title: "Team Manager Ecosystem with Secure APIs",
    desc: "Architected a type-safe Next.js API infrastructure framework, enforcing strict RESTful verification principles for secure role-based access team administration.",
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    imgSrc: "https://images.unsplash.com/photo-1686061594183-8c864f508b00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  },
  {
    id: "sys.03",
     title: "Multi-Tenant School Manager",
    desc: "Production-grade SaaS platform engineering modular shared database access isolation schemas to partition core structural institutional records securely.",
    tags: ['Laravel', 'React.js', 'MySQL'],
    imgSrc: "https://images.unsplash.com/photo-1762340275855-ae8f4c2c144e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    
  },
  {
    id: "sys.04",
    title: "Full-Stack Enterprise Job Portal Platform",
    desc: "Developed a full-stack job portal platform featuring a unique real-time notification engine, enabling instant status updates for candidates directly from company changes.",
    tags: ['PHP 8', 'SQL', 'JavaScript'],
    imgSrc: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHVzZXIlMjBpbnRlcmZhY2V8ZW58MHx8MHx8fDA%3D"
   
  },
];

  const skillItems = [
  // Programming Languages
  { name: 'PHP', cat: 'language', icon: Code2 },
  { name: 'Python', cat: 'language', icon: Code2 },
  { name: 'C++', cat: 'language', icon: Code2 },
  { name: 'JavaScript', cat: 'language', icon: Code2 },
  { name: 'SQL', cat: 'language', icon: Code2 },
  { name: 'TypeScript', cat: 'language', icon: Code2 },

  // Frameworks & Libraries
  { name: 'Node.js', cat: 'runtime', icon: Terminal },
  { name: 'Express.js', cat: 'framework', icon: Terminal },
  { name: 'Laravel', cat: 'framework', icon: Terminal },
  { name: 'Next.js', cat: 'framework', icon: Terminal },
  { name: 'React.js', cat: 'library', icon: Terminal },
  { name: 'shadcn/ui', cat: 'ui_library', icon: Terminal },
  { name: 'Bootstrap', cat: 'ui_library', icon: Terminal },
  { name: 'Tailwind CSS', cat: 'ui_library', icon: Terminal },
  { name: 'GSAP', cat: 'library', icon: Terminal },
  { name: 'HTML5 / CSS3', cat: 'frontend', icon: Terminal },

  // Databases & Data Management
  { name: 'MySQL', cat: 'database', icon: Database },
  { name: 'PostgreSQL', cat: 'database', icon: Database },
  { name: 'Prisma ORM', cat: 'data_layer', icon: Database },
  { name: 'RDBMS', cat: 'database', icon: Database },
  { name: 'Database Design', cat: 'database', icon: Database },

  // Workflow & Architecture
  { name: 'Turborepo', cat: 'tooling', icon: GitBranch },
  { name: 'Monorepo Architecture', cat: 'architecture', icon: Terminal },
  { name: 'Git / GitHub', cat: 'vcs', icon: GitBranch },
  { name: 'RESTful APIs', cat: 'architecture', icon: Terminal },
  { name: 'JWT', cat: 'security', icon: Terminal },
  { name: 'AJAX', cat: 'workflow', icon: Terminal },
  { name: 'SDLC', cat: 'architecture', icon: Terminal },
  { name: 'SOLID Principles', cat: 'architecture', icon: Terminal },

  // AI & ML Workflow
  { name: 'LLMs', cat: 'ai_ml', icon: Cpu },
  { name: 'RAG', cat: 'ai_ml', icon: Cpu },
  { name: 'Vector DBs', cat: 'ai_ml', icon: Database },
  // { name: 'LangChain', cat: 'ai_ml', icon: Cpu },
];


  const systemStatus = "NOMINAL";

  const marqueeKeywords = ["Full-Stack", "AI Deployment", "SaaS Architecture", "Database Design", "API Engineering", "UI/UX Tuning"];
  
if (!mounted) return null;


  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16 overflow-x-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800 antialiased tracking-tight">



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




{/* ─── HEADER ─── */}
<header className="w-full max-w-3xl mx-auto mt-10 mb-6 overflow-hidden select-none border border-[var(--card-border)]/80 rounded-xl bg-[var(--background)] font-mono text-xs antialiased relative shadow-2xs group/panel transition-all duration-500 hover:border-green-500/20 hover:shadow-[0_4px_20px_rgba(34,197,94,0.02)]">
  
  {/* ─── TECHNICAL TELEMETRY CONTROL STRIP (TOP BAR) ─── */}
  <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[var(--card-border)]/60 text-[10px] text-[var(--text-muted)] tracking-wide font-medium bg-gradient-to-r from-[var(--background)] to-[var(--text-dim)]/[0.02] transition-colors duration-300 group-hover/panel:border-green-500/30">
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <Terminal size={12} className="text-green-600 dark:text-green-500 shrink-0" />
        <span className="text-[var(--text-main)] font-semibold tracking-tight truncate">{activeEnv}</span>
      </div>
      <span className="text-[var(--card-border)]/60 font-light select-none hidden xs:inline">|</span>
      <span className="hidden xs:flex items-center gap-1.5 font-bold text-green-600 dark:text-green-400 text-[9px] tracking-widest shrink-0">
        {/* Smooth enterprise runtime heartbeat indicator */}
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40 duration-1000" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
        </span>
        <span>{systemStatus}</span>
      </span>
    </div>
    
    {/* Discrete Technical Metric Log Pin */}
    <div className="text-[9px] tabular-nums tracking-widest text-[var(--text-dim)] font-semibold hidden sm:block shrink-0 transition-all duration-300 group-hover/panel:text-green-600/60 dark:group-hover/panel:text-green-400/50 group-hover/panel:tracking-[0.14em]">
      {`SYS_CYCLE_STABLE // `}{systemTime}
    </div>
    <div className="text-[9px] tabular-nums tracking-wider text-[var(--text-dim)] font-semibold sm:hidden shrink-0">
      {systemTime}
    </div>
  </div>

  {/* ─── MAIN ASYMMETRIC CORE HARDWARE ROW ─── */}
  <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between p-4 sm:p-5 gap-4 bg-transparent relative">
    
    {/* LEFT COMPARTMENT: IDENTITY & DOMAIN MATRIX MAP */}
    <div className="flex flex-col gap-2.5 justify-center min-w-0 flex-1 w-full">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <h1 className="text-[var(--text-main)] font-sans font-extrabold text-lg sm:text-xl tracking-tight leading-none transition-colors duration-300">
          Manan Chavda
        </h1>
        <span className="text-[var(--text-muted)] font-sans text-xs font-semibold tracking-tight opacity-80 pt-0.5 sm:pt-0">
          ~ મનન ચાવડા
        </span>
      </div>
      
      {/* Executive Clean Technical Competence Row */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-2.5 sm:gap-x-3 w-full text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium font-sans tracking-wide overflow-hidden select-none">
  
        {/* Tag Node 01 */}
        <div className="flex items-center gap-1 group/tag min-w-0 shrink-0">
          <span className="text-[8px] font-mono font-bold text-[var(--text-dim)] opacity-50 transition-all duration-200 ease-out tracking-tighter shrink-0 group-hover/tag:text-green-600 dark:group-hover/tag:text-green-500 group-hover/tag:opacity-100">
            01
          </span>
          <span className="text-[8px] font-mono font-bold text-[var(--text-dim)] opacity-50 tracking-tighter shrink-0">
            {`//`}
          </span>
          <span className="hover:text-[var(--text-main)] transition-colors duration-200 ease-out cursor-default tracking-tight truncate whitespace-nowrap">
            Full-Stack Dev
          </span>
        </div>
        
        {/* Fine Sub-pixel Vertical Divider Pipe */}
        <span className="h-2.5 w-[1px] bg-[var(--card-border)] opacity-60 shrink-0 select-none" aria-hidden="true" />
        
        {/* Tag Node 02 */}
        <div className="flex items-center gap-1 group/tag min-w-0 shrink-0">
          <span className="text-[8px] font-mono font-bold text-[var(--text-dim)] opacity-50 transition-all duration-200 ease-out tracking-tighter shrink-0 group-hover/tag:text-green-600 dark:group-hover/tag:text-green-500 group-hover/tag:opacity-100">
            02
          </span>
          <span className="text-[8px] font-mono font-bold text-[var(--text-dim)] opacity-50 tracking-tighter shrink-0">
            {`//`}
          </span>
          <span className="hover:text-[var(--text-main)] transition-colors duration-200 ease-out cursor-default tracking-tight truncate whitespace-nowrap">
            Monorepos & Microservices
          </span>
        </div>
        
        <span className="h-2.5 w-[1px] bg-[var(--card-border)] opacity-60 shrink-0 select-none" aria-hidden="true" />

      </div>

    </div>

    {/* RIGHT COMPARTMENT: REGISTRY MATRIX TRACKS & INTERACTIVE CALL ANCHOR */}
    <div className="grid grid-cols-2 lg:flex lg:items-center justify-between lg:justify-end gap-4 sm:gap-6 border-t lg:border-t-0 border-[var(--card-border)]/60 pt-3 lg:pt-0 w-full lg:w-auto shrink-0 font-mono text-[10px] group-hover/panel:border-green-500/20 transition-colors duration-300">
      
      {/* Hidden layout element sync pipeline */}
      <div className="h-6 w-[1px] bg-[var(--card-border)] opacity-60 select-none pointer-events-none hidden lg:block" />
      
      {/* Tabular Item Cluster: Geolocation Frame */}
      <div className="flex flex-col gap-0.5 select-none min-w-0">
        <span className="text-[7px] font-bold text-[var(--text-dim)] tracking-widest uppercase opacity-60">LOC_REF</span>
        <div className="flex items-center gap-1 font-semibold text-[var(--text-muted)] truncate">
          <MapPin size={10} className="text-[var(--text-dim)] opacity-70 shrink-0 transition-colors group-hover/panel:text-green-500" />
          <span className="tracking-tight truncate">Rajkot, Blr, IN</span>
        </div>
      </div>

      {/* Vertical Split Rail Divider Line */}
      <div className="h-6 w-[1px] bg-[var(--card-border)] opacity-60 select-none pointer-events-none hidden lg:block" />

      {/* Action Trigger Block: Minimal Corporate Execution Link */}
      <div className="flex flex-col gap-0.5 min-w-0 items-end lg:items-start">
        <span className="text-[7px] font-bold text-[var(--text-dim)] tracking-widest uppercase opacity-60 tracking-wider">DOC_TUNNEL</span>
        
        <a
          href="https://drive.google.com/file/d/1TxM08OSjW_i_AeyTFcT0YflAVZZwa099/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group/cv flex items-center justify-between gap-1.5 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-[var(--text-muted)] bg-[var(--background)] border border-[var(--card-border)]/80 hover:border-green-500/30 hover:bg-green-500/[0.03] rounded transition-all duration-300 ease-out cursor-pointer max-w-full hover:shadow-[0_2px_8px_rgba(34,197,94,0.06)]"
        >
          <span className="truncate">fetch_cv.pdf</span>
          <ArrowUpRight size={11} className="text-[var(--text-dim)] group-hover/cv:text-green-500 transform group-hover/cv:translate-x-0.5 group-hover/cv:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 stroke-[2.5]" />
        </a>
      </div>

    </div>

  </div>
</header>


{/* ─── BIO SEGMENT INCORPORATING "CURRENT" ─── */}
<section 
  ref={bioSectionRef} 
  className="w-full max-w-3xl mx-auto mt-9 mb-1 font-mono tracking-wide text-xs will-change-transform select-none antialiased clear-both"
>
  {/* ─── PHASE 01: TELEMETRY RUNTIME BADGE BAR ─── */}
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 select-none">
    <div className="inline-flex items-center gap-2 bg-green-500/[0.04] dark:bg-green-950/30 border border-green-500/20 dark:border-green-900/30 px-3 py-1 rounded-md text-zinc-800 dark:text-zinc-200 shadow-2xs">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 duration-1000" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 dark:bg-green-400" />
      </span>
      <span className="text-[9px] font-bold tracking-wider uppercase text-green-600 dark:text-green-400">
        stream_status // open_to_work_and_relocate
      </span>
    </div>
    
    <div className="hidden sm:flex items-center gap-1.5 text-[8px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
      <ShieldAlert size={10} className="text-zinc-400 dark:text-zinc-500" /> auth_level::operator_guest
    </div>
  </div>

  {/* ─── PHASE 02: HARDWARE MODULE FRAME ─── */}
  <div className="w-full border border-[var(--card-border)]/80 rounded-xl bg-[var(--background)] p-5 relative overflow-hidden flex flex-col-reverse sm:flex-row sm:items-stretch gap-6 group/bio">
    
    {/* Ambient Edge Boundary Gradients */}
    <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[var(--background)] to-transparent z-20 pointer-events-none opacity-30" />
    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[var(--background)] to-transparent z-20 pointer-events-none opacity-30" />

    {/* Narrative Text Column Compartment */}
    <div ref={textContainerRef} className="flex-1 space-y-4 font-sans select-text overflow-hidden relative z-10 flex flex-col justify-between h-full group/text-panel">
      <div>
        {/* DYNAMIC ARCHITECTURAL THESIS DOCUMENTATION HEADER */}
        <div className="flex items-center justify-between border-b border-green-500/20 dark:border-green-400/10 pb-3 mb-5 font-mono select-none pointer-events-none w-full transition-all duration-300 group-hover/bio:border-green-500/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <Book size={12} className="text-green-600 dark:text-green-400 opacity-90 shrink-0 transition-transform duration-300 group-hover/bio:scale-105" />
            <h3 className="text-[10px] font-bold tracking-[0.12em] text-green-600/80 dark:text-green-400/80 uppercase truncate transition-all duration-300 group-hover/bio:text-green-600 dark:group-hover/bio:text-green-400 group-hover/bio:tracking-[0.14em]">
              core.architectural.thesis
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-green-600 dark:text-green-400 bg-green-500/[0.03] dark:bg-green-950/20 px-2 py-0.5 rounded border border-green-500/20 dark:border-green-400/20 tracking-wide select-none transition-all duration-300 group-hover/bio:border-green-500/40 group-hover/bio:bg-green-500/[0.06] group-hover/bio:shadow-[0_0_8px_rgba(34,197,94,0.08)]">
            <Terminal size={9} className="text-green-600/60 dark:text-green-400/60" />
            <span className="tabular-nums">rev_02.bin</span>
          </div>
        </div>

        {/* Narrative Paragraph */}
        <p className="text-[13px] sm:text-[14px] leading-relaxed text-[var(--text-muted)] tracking-normal font-sans antialiased transition-colors duration-300">
          Engineering high-scale{' '}
          <span className="inline-flex items-center gap-1 rounded bg-green-500/[0.04] dark:bg-green-950/20 px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-tight text-green-700 dark:text-green-300 select-all border border-green-500/10 dark:border-green-400/10 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/[0.08] dark:hover:bg-green-950/40 hover:border-green-500/30 hover:shadow-[0_2px_6px_rgba(34,197,94,0.06)] hover:-translate-y-[0.5px]">
            <Code size={11} className="text-green-600 dark:text-green-400 opacity-90 shrink-0" /> Next.js
          </span>{' '}
          and runtimes like{' '}
          <span className="inline-flex items-center rounded bg-green-500/[0.04] dark:bg-green-950/20 px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-tight text-green-700 dark:text-green-300 select-all border border-green-500/10 dark:border-green-400/10 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/[0.08] dark:hover:bg-green-950/40 hover:border-green-500/30 hover:shadow-[0_2px_6px_rgba(34,197,94,0.06)] hover:-translate-y-[0.5px]">
            Node.js / Express
          </span>{' '}
          and{' '}
          <span className="inline-flex items-center rounded bg-green-500/[0.04] dark:bg-green-950/20 px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-tight text-green-700 dark:text-green-300 select-all border border-green-500/10 dark:border-green-400/10 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/[0.08] dark:hover:bg-green-950/40 hover:border-green-500/30 hover:shadow-[0_2px_6px_rgba(34,197,94,0.06)] hover:-translate-y-[0.5px]">
            Laravel
          </span>{' '}
          within high-throughput{' '}
          <span className="font-mono text-[12px] font-medium tracking-tight text-[var(--text-main)] underline decoration-green-600/30 dark:decoration-green-400/30 underline-offset-[3px] decoration-1 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 hover:decoration-green-500 dark:hover:decoration-green-400">
            Turborepo monorepos
          </span>{' '}
          and secure RBAC architectures, seamlessly bridging robust microservice backends with modern{' '}
          <span className="font-medium text-[var(--text-main)] underline decoration-green-600/30 dark:decoration-green-400/30 underline-offset-[3px] decoration-1 transition-all duration-200 hover:text-green-600 dark:hover:text-green-400 hover:decoration-green-500 dark:hover:decoration-green-400">
            shadcn/ui component interfaces
          </span>
          .
        </p>
      </div>

      {/* Highlight Quote Sub-Card Log Block */}
      <div className="relative mb-2 py-3 pl-4 pr-3.5 rounded-xl border border-green-500/10 dark:border-green-400/10 bg-green-500/[0.01] dark:bg-green-950/[0.03] antialiased select-none w-full mt-6 sm:mt-auto overflow-hidden transition-all duration-300 group-hover/bio:border-green-500/20 group-hover/bio:bg-green-500/[0.02] dark:group-hover/bio:bg-green-950/[0.06]">
        
        {/* Structural Accent Indicator Line */}
        <span 
          className="absolute left-0 top-3 bottom-3 w-[2px] bg-green-600 dark:bg-green-500 rounded-r transition-all duration-300 ease-out group-hover/bio:top-1 group-hover/bio:bottom-1 group-hover/bio:w-[3px] group-hover/bio:shadow-[0_0_6px_rgba(34,197,94,0.4)]" 
          aria-hidden="true" 
        />
        
        <div className="space-y-1.5 pl-2 font-mono text-[10px] text-[var(--text-dim)]">
          <div className="flex items-center gap-1.5 text-green-700/80 dark:text-green-400/80 font-bold transition-colors duration-300 group-hover/bio:text-green-600 dark:group-hover/bio:text-green-400">
            <Cpu size={10} className="text-green-600 dark:text-green-400" /> 
            <span>sys.capabilities_map // verified</span>
          </div>
          <p className="leading-relaxed text-[var(--text-muted)] transition-colors duration-300 group-hover/bio:text-[var(--text-main)]">
            <span className="text-green-600/40 dark:text-green-400/30 font-black">&gt;</span> core_stack: [Turborepo, Monorepo, Node/Express, Next.js, shadcn/ui, PostgreSQL, MongoDB] <br />
            <span className="text-green-600/40 dark:text-green-400/30 font-black">&gt;</span> focus_areas: [Decoupled microservices, RBAC isolation, canvas render buffers, telemetry metrics parsing]
          </p>
        </div>
      </div>
    </div>

    {/* Floating Video Context Card Container */}
    <div 
      ref={videoWrapperRef} 
      className="w-full sm:w-[240px] sm:max-w-[240px] relative z-20 group/viewer flex flex-col shrink-0 select-none"
    >
      {/* Borderless, High-Fidelity Video Display Field */}
      <div className="p-0 bg-transparent relative flex flex-col items-stretch justify-center w-full h-full min-h-[160px] sm:min-h-0 overflow-visible transition-all duration-300 ease-out">
        
        {/* Primary Media Asset Layer with Premium Structural Drop Shadow */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative z-10 transition-all duration-300 ease-out group-hover/viewer:scale-[1.015] group-hover/viewer:filter group-hover/viewer:drop-shadow-[0_8px_24px_rgba(34,197,94,0.12)]">
          <Themelight />
        </div>

      </div>
    </div>

  </div>

  {/* ─── PHASE 03: INFINITE TEXT PIPELINE RUNWAY ─── */}
  <div 
    ref={marqueeRef} 
    className="mt-7 sm:mb-14 relative w-full overflow-hidden border-y border-[var(--card-border)]/60 py-2.5 bg-[var(--background)] select-none will-change-transform group/marquee cursor-default"
    style={{ '--marquee-speed': '30s' } as React.CSSProperties}
  >
    {/* Contrast Ambient Masking Blurs */}
    <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
    <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

    {/* Infinite CSS Keyframe Animation Track Runway */}
    <div className="flex w-max items-center gap-8 animate-[marquee_var(--marquee-speed)_linear_infinite] transition-[animation-duration] duration-500 ease-out group-hover/marquee:[--marquee-speed:65s]">
      {[...Array(2)].map((_, loopIdx) => (
        <div key={loopIdx} className="flex items-center gap-8 shrink-0">
          {(typeof marqueeKeywords !== 'undefined' ? marqueeKeywords : ['Next.js', 'Turborepo', 'Monorepos', 'Node/Express', 'shadcn/ui', 'Laravel', 'RBAC Isolation']).map((text, textIdx) => (
            <div key={textIdx} className="flex items-center gap-3">
              <Milestone size={10} className="text-green-500 dark:text-green-400 opacity-80" />
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-wider text-[var(--text-muted)] uppercase">
                {text}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>

    {/* Global Keyframe Animation Matrix Injection */}
    <style jsx global>{`
      @keyframes marquee {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
    `}</style>
  </div>
</section>



      {/* ─── SKILLS ENGINEERING MATRIX MODULE ─── */}
<section 
  ref={skillsRef} 
  className="w-full max-w-3xl mx-auto mt-10 mb-16 sm:mb-24 font-mono tracking-wide text-xs will-change-transform select-none antialiased clear-both"
>
  
  {/* ─── DYNAMIC CAPABILITIES MATRIX HEADER (IDE Status Bar Alignment) ─── */}
  <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)]/60 pb-3 mb-6 sm:mb-8 select-none group/hdr w-full transition-all duration-300">
    <div className="flex items-center gap-2.5 min-w-0">
      <Workflow size={14} className="text-[var(--brand-primary)] animate-pulse shrink-0" />
      <h2 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[var(--text-dim)] uppercase font-mono truncate transition-all duration-300 group-hover/hdr:tracking-[0.22em]">
        env.config // <span className="text-[var(--text-main)] font-extrabold">capabilities_matrix</span>
      </h2>
    </div>
    
    <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-wider text-[var(--text-dim)] bg-transparent px-2.5 py-1 rounded-md border border-[var(--card-border)]/60 shadow-2xs select-none transition-all duration-300 group-hover/hdr:border-[var(--brand-primary)]/30 group-hover/hdr:bg-[var(--brand-primary)]/[0.04]">
      <span className="flex items-center gap-1.5 opacity-80">
        <Layers size={10} className="text-[var(--text-dim)]" /> runtime_deps
      </span>
      <span className="text-[var(--brand-primary)] font-extrabold px-1 bg-[var(--background)] rounded border border-[var(--card-border)]/80 tabular-nums transition-colors duration-300 group-hover/hdr:border-[var(--brand-primary)]/20">
        {skillItems?.length || 0}
      </span>
    </div>
  </div>

  <div className="relative border border-[var(--card-border)]/80 rounded-xl overflow-visible bg-[var(--background)] shadow-2xs group/panel transition-all duration-500 hover:border-green-500/20 hover:shadow-[0_4px_20px_rgba(34,197,94,0.02)]">
    
    {/* Internal Divider Borders Synced with Header Row Color Logic */}
    <div className="grid grid-cols-2 sm:grid-cols-4 relative z-10 divide-x divide-y divide-[var(--card-border)]/40 -mt-[1px] -ml-[1px] transition-colors duration-300 group-hover/panel:divide-green-500/10">
      {skillItems?.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div 
            key={idx}
            className="group/stack flex items-center gap-3 p-4 bg-transparent transition-all duration-300 ease-out cursor-crosshair relative overflow-hidden rounded-xs hover:z-20 hover:scale-[1.015] hover:bg-[var(--text-dim)]/[0.015]"
          >
            {/* Structural Accent Bar: Micro Edge Line Transition (Fires Green to Match Header Focus State) */}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-green-500/80 shadow-[0_0_12px_rgba(34,197,94,0.4)] group-hover/stack:w-full transition-all duration-300 ease-out" />
            
            {/* Matrix Coordinate Tracker Tag - Shifting to Green on Cell Hover */}
            <span className="absolute top-1.5 right-1.5 text-[7px] font-bold font-mono text-[var(--text-dim)] opacity-50 tracking-tight transition-colors duration-200 group-hover/stack:text-green-600 dark:group-hover/stack:text-green-500">
              [0x{idx.toString(16).toUpperCase()}]
            </span>

            {/* Micro Icon Frame with Formal Geometry Shift */}
            <div className="text-[var(--text-dim)] opacity-75 transition-all duration-300 ease-out group-hover/stack:-translate-y-[0.5px] shrink-0 group-hover/stack:text-green-600 dark:group-hover/stack:text-green-500">
              <IconComponent size={13} strokeWidth={2.5} />
            </div>
            
            {/* Text Container Metadata Layout */}
            <div className="flex flex-col min-w-0 leading-tight font-sans">
              <span className="text-[var(--text-main)] font-bold text-[11px] sm:text-xs tracking-tight truncate transition-colors duration-200 group-hover/stack:text-green-600 dark:group-hover/stack:text-green-500">
                {item.name}
              </span>
              <span className="text-[8px] text-[var(--text-muted)] font-mono font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                <Binary size={8} className="text-[var(--text-dim)] opacity-40 transition-colors duration-200 group-hover/stack:text-green-600/50 dark:group-hover/stack:text-green-500/40" /> 
                {item.cat}
              </span>
            </div>

          </div>
        );
      })}
    </div>
  </div>

</section>

{/* ─── PREVIOUS TIMELINE HISTORY MODULE ─── */}
     
<section 
      id="home"
      ref={previousRef} 
      className="font-mono tracking-wide text-xs will-change-transform mb-16 sm:mb-24 w-full max-w-3xl mx-auto select-none antialiased"
    >
      {/* ─── TECHNICAL BAR SECTION HEADER ─── */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)]/60 pb-3 mb-8 sm:mb-10 select-none group/hdr w-full transition-all duration-300">
  <div className="flex items-center gap-2.5 min-w-0">
    <Milestone size={14} className="text-green-600 dark:text-green-500 animate-pulse shrink-0" />
    <h2 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[var(--text-dim)] uppercase font-mono truncate transition-all duration-300 group-hover/hdr:tracking-[0.22em]">
      trace_route // <span className="text-[var(--text-main)] font-extrabold">work_journey</span>
    </h2>
  </div>

  <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-wider text-[var(--text-dim)] bg-transparent px-2.5 py-1 rounded-md border border-[var(--card-border)]/60 shadow-2xs select-none transition-all duration-300 group-hover/hdr:border-green-500/30 group-hover/hdr:bg-green-500/[0.04]">
    <span className="flex items-center gap-1.5 opacity-80">
      <GitBranch size={10} className="text-[var(--text-dim)]" /> node_nodes
    </span>
    <span className="text-green-600 dark:text-green-400 font-extrabold px-1 bg-[var(--background)] rounded border border-[var(--card-border)]/80 tabular-nums transition-colors duration-300 group-hover/hdr:border-green-500/20">
      0{experiences.length}
    </span>
  </div>
</div>


      {/* Timeline Module Container */}
      <div className="relative w-full px-1 sm:px-0">
        
        {/* Fine Background Track Rail */}
        <div className="absolute hidden sm:block top-[33px] left-0 right-0 h-[1px] bg-gradient-to-r from-zinc-200 via-zinc-200 to-transparent dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent -z-20" />

        {/* Flex-Driven Dynamic Proportional Row Matrix */}
        <div className="flex flex-col sm:flex-row gap-y-10 sm:gap-x-8 w-full justify-between items-stretch relative">
          {experiences.map((item, idx) => (
            <div 
              key={idx} 
              className={`group/node flex flex-row sm:flex-col gap-5 sm:gap-0 relative min-w-0 shrink-0 cursor-crosshair ${item.span || 'flex-1'}`}
            >
              {/* Timeline Visual Track Engine */}
              <div className="flex flex-row items-start sm:w-full relative select-none">
                
                {/* ─── CONNECTING MAIN HORIZONTAL TRACK LINE ─── */}
                <div className="absolute hidden sm:block top-[33px] left-1 w-[calc(100%-4px)] h-[1px] overflow-hidden pointer-events-none -z-10">
                  <div className={`tl-bridge-line origin-left w-full h-full bg-zinc-200 dark:bg-zinc-800 group-hover/node:bg-emerald-500/30 dark:group-hover/node:bg-emerald-400/20 transition-colors duration-300 ${
                    idx === experiences.length - 1 ? 'bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent' : ''
                  }`} />
                </div>

                {/* Main Milestone Indicator Anchor Pin */}
                <div className="flex flex-col items-center sm:items-start z-10 shrink-0">
                  <div className="tl-indicator origin-top h-8 w-[1px] sm:h-9 bg-zinc-300 dark:bg-zinc-700 group-hover/node:bg-emerald-600 dark:group-hover/node:bg-emerald-500 group-hover/node:scale-y-105 transition-all duration-300" />
                  <div className="h-2 w-2 rounded-full border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-950 -mt-1 sm:ml-[-3.5px] group-hover/node:bg-emerald-600 dark:group-hover/node:bg-emerald-500 group-hover/node:border-emerald-600 dark:group-hover/node:border-emerald-500 transition-all duration-300 scale-100 group-hover/node:scale-120 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>

                {/* Intermediate Fine Vertical Metric Ticks */}
                <div className={`hidden sm:flex absolute top-1 left-2 w-[calc(100%-12px)] h-8 items-start justify-evenly pointer-events-none opacity-40 dark:opacity-20 ${
                  idx === experiences.length - 1 ? '[mask-image:linear-gradient(to_right,white_20%,transparent)]' : ''
                }`}>
                  {[...Array(idx === experiences.length - 1 ? 5 : 7)].map((_, tickIdx) => (
                    <div 
                      key={tickIdx} 
                      className="h-1.5 w-[1px] bg-zinc-400 dark:bg-zinc-600 self-start transition-all duration-300 group-hover/node:bg-emerald-500/50 dark:group-hover/node:bg-emerald-400/50" 
                    />
                  ))}
                </div>
              </div>

              {/* Typographic Meta Content */}
              <div className="flex-1 flex flex-col justify-start sm:mt-5 transition-all duration-300 transform group-hover/node:-translate-y-0.5">
                
                {/* Period Timestamp Frame */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800/80 tabular-nums uppercase tracking-wider scale-95 origin-left group-hover/node:text-emerald-600 dark:group-hover/node:text-emerald-400 group-hover/node:border-emerald-500/30 transition-all duration-300">
                    {item.period}
                  </span>
                </div>
                
                {/* Company Signature Title */}
                <a
                  href={item.href || "#"}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                  className="text-zinc-800 dark:text-zinc-100 font-bold text-xs sm:text-[13px] tracking-tight mb-1 flex items-center justify-between sm:justify-start gap-1.5 group-hover/node:text-emerald-600 dark:group-hover/node:text-emerald-400 transition-colors duration-200 w-full font-mono"
                >
                  <span className="whitespace-normal leading-snug">
                    {item.company}
                  </span>
                  <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover/node:opacity-100 group-hover/node:translate-x-0 group-hover/node:translate-y-0 transition-all duration-300 text-emerald-500 shrink-0 stroke-[2.5]" />
                </a>

                {/* Role Details and Location Block */}
                <div className="flex flex-col gap-1 mt-0.5 font-sans">
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-[12px] font-medium leading-relaxed tracking-normal">
                    {item.role}
                  </p>
                  
                  {/* Lowercase micro system tracking network parameters */}
                  <div className="flex items-center gap-3 mt-1 text-[8px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider font-mono uppercase">
                    <span className="flex items-center gap-1 group-hover/node:text-zinc-500 dark:group-hover/node:text-zinc-300 transition-colors duration-300">
                      <GitBranch size={9} className="text-zinc-400 group-hover/node:text-emerald-500 transition-colors duration-300" /> loc://{item.loc}
                    </span>
                    <span className="text-zinc-200 dark:text-zinc-800">|</span>
                    <span className="flex items-center gap-1 text-zinc-400/80">
                      <ShieldCheck size={10} className="text-emerald-500/70 animate-pulse" /> status_verified
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>


<section id="work" ref={buildsRef} className="w-full max-w-3xl mx-auto mb-16 sm:mb-24 font-mono tracking-wide text-xs will-change-transform select-none antialiased px-4 sm:px-0 scroll-mt-24">
        
        {/* ─── DYNAMIC PRODUCTION BUILDS HEADER ─── */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--card-border)]/60 pb-3 mb-5 sm:mb-6 select-none group/hdr w-full transition-all duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <Code size={14} className="text-green-600 dark:text-green-500 animate-pulse shrink-0" />
            <h2 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[var(--text-dim)] uppercase font-mono truncate transition-all duration-300 group-hover/hdr:tracking-[0.22em]">
              sys.log // <span className="text-[var(--text-main)] font-extrabold">production_builds</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-wider text-[var(--text-dim)] bg-transparent px-2.5 py-1 rounded-md border border-[var(--card-border)]/60 shadow-2xs select-none transition-all duration-300 group-hover/hdr:border-green-500/30 group-hover/hdr:bg-green-500/[0.04]">
            <span className="flex items-center gap-1.5 opacity-90"><Activity size={10} className="text-[var(--text-dim)]" /> idx_stream</span>
            <span className="text-green-600 dark:text-green-400 font-extrabold px-1 bg-[var(--background)] rounded border border-[var(--card-border)]/80 tabular-nums transition-colors duration-300 group-hover/hdr:border-green-500/20">
              {projects.length}
            </span>
          </div>
        </div>

        {/* 🖥️ THE SYSTEM OVERVIEW CHASSIS CARD */}
        <div className="w-full border border-[var(--card-border)]/80 rounded-xl bg-[var(--background)] shadow-2xs overflow-hidden max-w-full transition-all duration-500">
          
          {/* Console Top Control Ribbon Toggles */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--card-border)]/60 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 dark:bg-red-500/20 border border-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 dark:bg-amber-500/20 border border-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 dark:bg-green-500/20 border border-transparent" />
            </div>
            <div className="flex items-center gap-3 text-[9px] font-bold text-[var(--text-dim)] tracking-[0.15em] font-mono uppercase">
              <span className="flex items-center gap-1"><Cpu size={10} className="text-[var(--text-dim)] opacity-70" /> matrix_v2.01</span>
              <span className="text-[var(--card-border)]/60 hidden sm:inline">|</span>
              <span className="text-green-600 dark:text-green-400 font-extrabold animate-pulse hidden sm:inline">pipeline::active</span>
            </div>
          </div>

          {/* Main Interactive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]/60 items-stretch h-auto md:h-[440px]">
            
            {/* LEFT ZONE: INDEX COLUMN (Scrollable Container) */}
            {/* UX UI Upgrades: Max height bounded, custom modern thin track scrollbar configuration */}
          <div 
        className="col-span-1 md:col-span-6 flex flex-col divide-y divide-[var(--card-border)]/60 opacity-95 h-full bg-transparent order-1 overflow-y-auto overflow-x-hidden max-h-[380px] md:max-h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
    {/* localized style block to force-kill global scrollbar definitions on hover */}
    <style dangerouslySetInnerHTML={{__html: `
      .col-span-1::-webkit-scrollbar,
      .col-span-1::-webkit-scrollbar-thumb,
      .col-span-1::-webkit-scrollbar-track,
      .col-span-1:hover::-webkit-scrollbar,
      .col-span-1:hover::-webkit-scrollbar-thumb,
      .col-span-1:hover::-webkit-scrollbar-track {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
    `}} />

    {projects.map((project, idx) => {
      const isSelected = activeIdx === idx;
      return (
        <div 
          key={project.id || idx}
          ref={isSelected ? activeItemRef : null}
          onMouseEnter={() => window.innerWidth >= 768 && setActiveIdx(idx)}
          onClick={() => setActiveIdx(idx)}
          className={`group/item p-4 flex flex-col gap-2 transition-all duration-300 relative cursor-crosshair tap-highlight-transparent shrink-0 ${
            isSelected 
              ? 'bg-green-500/[0.02] dark:bg-green-950/[0.03]' 
              : 'hover:md:bg-[var(--background)] opacity-85 hover:md:opacity-100'
          }`}
        >
          {/* Active Left Indicator Accent Line */}
          <span className={`absolute left-0 top-0 bottom-0 w-0 bg-green-500 dark:bg-green-400 transition-all duration-300 ease-out ${
            isSelected ? 'w-[3px] shadow-[0_0_12px_rgba(34,197,94,0.5)]' : 'group-hover/item:w-[1.5px]'
          }`} />
          
          {/* Item Telemetry Header */}
          <div className="flex items-center justify-between gap-3 font-mono">
            <span className={`text-[9px] font-bold tracking-wider uppercase transition-colors duration-200 ${
              isSelected ? 'text-green-600 dark:text-green-400' : 'text-[var(--text-dim)]'
            }`}>
              {idx + 1} . {project.id}
            </span>
            <ArrowUpRight size={12} className={`text-[var(--text-dim)] transition-all duration-300 stroke-[2.5] ${
              isSelected ? 'text-green-500 dark:text-green-400 translate-x-0.5 -translate-y-0.5 opacity-100' : 'opacity-40 group-hover/item:text-green-500 group-hover/item:opacity-100'
            }`} />
          </div>

          {/* Descriptive Info Text */}
          <div className="space-y-0.5 font-sans">
            <h3 className={`text-xs sm:text-[12px] tracking-tight font-mono transition-colors ${
              isSelected ? 'text-[var(--text-main)] font-bold' : 'text-[var(--text-muted)] font-medium'
            }`}>
              {project.title}
            </h3>
            <p className="text-[var(--text-muted)] opacity-80 text-[10.5px] font-mono leading-relaxed tracking-normal line-clamp-2">
              {project.desc}
            </p>
          </div>

          {/* Micro Badge Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.tags?.map((tag, tIdx) => (
              <span key={tIdx} className={`text-[8px] font-bold tracking-wider text-[var(--text-muted)] bg-[var(--background)] px-1.5 py-0.5 rounded border font-mono uppercase shadow-3xs transition-all duration-300 ${
                isSelected ? 'border-green-500/20 text-green-700 dark:text-green-300 bg-green-500/[0.02]' : 'border-[var(--card-border)]/80'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          {/* 📱 PERFECT MOBILE INLINE PREVIEW MESH */}
          <div 
            className={`block md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isSelected ? 'opacity-100 mt-2' : 'opacity-0 h-0 pointer-events-none'
            }`} 
            style={{ maxHeight: isSelected ? '260px' : '0px' }}
          >
            {project.imgSrc && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--card-border)]/80 bg-[var(--background)] shadow-3xs">
                <img 
                  src={project.imgSrc} 
                  alt={project.title} 
                  className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.9] dark:contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
                
                <div className="absolute bottom-2 right-2 tabular-nums font-bold text-[8px] tracking-wider text-green-600 dark:text-green-400 bg-[var(--background)]/90 backdrop-blur-xs px-1.5 py-0.5 rounded border border-green-500/20">
                  io.src::[0{idx}]
                </div>
              </div>
            )}
          </div>

        </div>
      );
    })}
  </div>


                      {/* 🖥️ DESKTOP SIDE BAR PANEL VIEW */}
          
            <div className="hidden md:flex md:col-span-6 border-l border-[var(--card-border)]/60 order-2 sticky top-0 h-full max-h-[440px] overflow-hidden bg-transparent">
              
              <div 
                className="w-full flex flex-col justify-between items-stretch p-5 overflow-y-auto overflow-x-hidden h-full select-none"
                style={{
                  scrollbarWidth: 'none',          /* Native Firefox hidden parameter */
                  msOverflowStyle: 'none',         /* Native Internet Explorer / Edge hidden parameter */
                  paddingRight: '40px',            /* Pushes all WebKit/Chrome/Windows hover mechanics out of bounds */
                  marginRight: '-40px'             /* Cancels layout shifting to preserve your grid dimensions */
                }}
              >
                
                {/* Aspect-Locked Continuous Display Frame */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--card-border)]/80 bg-[var(--background)] shadow-3xs h-full max-w-full group/viewer shrink-0">
                  {projects[activeIdx]?.imgSrc && (
                    <img 
                      key={activeIdx}
                      src={projects[activeIdx].imgSrc} 
                      alt={projects[activeIdx].title} 
                      className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out scale-100 group-hover/viewer:scale-[1.015] filter dark:brightness-[0.85] dark:contrast-[1.05]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 opacity-100 pointer-events-none" />
                </div>

                {/* Live Vector Diagnostic Log Footer */}
                <div className="relative z-10 mt-4 flex items-center justify-between border-t border-dashed border-[var(--card-border)]/60 pt-3 font-mono text-[9px] text-[var(--text-dim)] shrink-0">
                  <span className="relative flex items-center gap-1.5 pl-3.5 font-bold tracking-tight text-[var(--text-muted)]">
                    <span className="absolute left-0 top-1/2 flex h-1.5 w-1.5 -translate-y-1/2 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 dark:bg-green-400 opacity-40" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                    </span>
                    io.render_buffer // active
                  </span>
                  
                  <span className="bg-[var(--background)] px-1.5 py-0.5 rounded border border-[var(--card-border)]/80 font-bold tracking-wider text-green-600 dark:text-green-400 tabular-nums transition-all duration-300">
                    target_hex::[0{typeof activeIdx !== 'undefined' ? activeIdx : 'X'}]
                  </span>
                </div>

              </div>
            </div> {/* End of DESKTOP SIDE BAR PANEL VIEW */}

          </div> {/* End of Main Interactive Grid Layout */}
        </div> {/* End of THE SYSTEM OVERVIEW CHASSIS CARD */}
      </section>

      {/* End of MAIN PORTFOLIO BODY GRID */}



      {/* ─── OVERVIEW / ABOUT ME MASTER SECTOR ─── */}
<section 
  ref={bioSectionRef} 
  className="w-full max-w-3xl mx-auto mb-16 sm:mb-24 font-mono tracking-wide text-xs will-change-transform select-none antialiased px-4 sm:px-0 scroll-mt-24"
>
  {/* ─── HEADER BAR ─── */}
  <div id="About" className="flex items-center justify-between gap-3 border-b border-green-500/20 dark:border-green-400/10 pb-3 mb-6 sm:mb-8 select-none group/hdr w-full transition-all duration-300">
    <div className="flex items-center gap-2.5 min-w-0">
      <User size={14} className="text-green-600 dark:text-green-500 shrink-0" />
      <h2 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[var(--text-dim)] uppercase font-mono truncate transition-all duration-300 group-hover/hdr:tracking-[0.22em]">
        core.bin // <span className="text-[var(--text-main)] font-extrabold">biography_matrix</span>
      </h2>
    </div>
    
    <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-wider text-[var(--text-dim)] bg-transparent px-2.5 py-1 rounded-md border border-green-500/20 dark:border-green-400/20 shadow-2xs select-none transition-all duration-300 group-hover/hdr:border-green-500/30 group-hover/hdr:bg-green-500/[0.04]">
      <span className="flex items-center gap-1.5 opacity-90">
        <Activity size={10} className="text-[var(--text-dim)]" /> thread_state
      </span>
      <span className="text-green-600 dark:text-green-400 font-extrabold px-1 bg-[var(--background)] rounded border border-green-500/20 dark:border-green-400/30 tabular-nums transition-colors duration-300 group-hover/hdr:border-green-500/20">
        EXEC_OK
      </span>
    </div>
  </div>

  {/* ─── SINGLE COLUMN ARCHITECTURE ─── */}
  <div className="flex flex-col space-y-6 w-full">
    
    {/* HERO TYPOGRAPHY */}
    <div className="space-y-4">
      <h3 className="text-[var(--text-main)] font-bold text-base sm:text-lg tracking-tight leading-snug font-sans">
        I’m Manan, a full-stack systems and product engineer focused on building high-throughput monorepo architectures, decoupled microservices, and sub-16ms UI reflow engines.
      </h3>

      <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed">
        I engineer distributed full-stack systems with Turborepo, Next.js, and Node/Express backends—focusing on deterministic build speeds, robust type safety, and real-time telemetry.
      </p>
    </div>

    {/* 2x2 FEATURE MATRIX GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      <div className="p-3.5 rounded-xl border border-[var(--card-border)]/80 bg-[var(--background)] transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_4px_20px_rgba(34,197,94,0.03)] group">
        <div className="flex items-center gap-2 mb-1.5 text-green-600 dark:text-green-400 font-bold text-[10px]">
          <Workflow size={12} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span>MICROSERVICES & MONOREPOS</span>
        </div>
        <p className="text-[10.5px] text-[var(--text-muted)] leading-normal">
          Optimized cross-package Turborepo build loops with rigid RBAC isolation and clean module decoupling.
        </p>
      </div>

      <div className="p-3.5 rounded-xl border border-[var(--card-border)]/80 bg-[var(--background)] transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_4px_20px_rgba(34,197,94,0.03)] group">
        <div className="flex items-center gap-2 mb-1.5 text-green-600 dark:text-green-400 font-bold text-[10px]">
          <Cpu size={12} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span>FLUID UI REFLOW</span>
        </div>
        <p className="text-[10.5px] text-[var(--text-muted)] leading-normal">
          Sub-16ms render performance leveraging Zustand state sync, Tailwind CSS, and shadcn/ui primitives.
        </p>
      </div>
    </div>

    {/* SYSTEM DIAGNOSTICS CARD */}
    <div className="relative p-4 rounded-xl border border-[var(--card-border)]/80 bg-[var(--background)] opacity-95 overflow-hidden group/quote transition-all duration-300 hover:border-green-500/30">
      {/* Structural Left Accent Line */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500/40 dark:bg-green-400/30 transition-all duration-300 group-hover/quote:bg-green-500 group-hover/quote:shadow-[0_0_12px_rgba(34,197,94,0.4)]" />

      <div className="space-y-2 font-mono text-[10px]">
        <div className="flex items-center justify-between text-[var(--text-muted)] font-bold">
          <div className="flex items-center gap-1.5">
            <Terminal size={11} className="text-green-600 dark:text-green-400" />
            <span>sys.capabilities_map // active_runtime</span>
          </div>
          <span className="text-[8px] text-green-600/60 dark:text-green-400/60 font-bold tracking-widest uppercase">
            VERIFIED
          </span>
        </div>

        <p className="leading-relaxed text-[var(--text-dim)] transition-colors duration-300 group-hover/quote:text-[var(--text-main)]">
          <span className="text-green-600/70 dark:text-green-400/70 font-bold">&gt; core_stack:</span> [TypeScript, Turborepo, Node/Express, Next.js, shadcn/ui, PostgreSQL, MongoDB, Prisma, Zustand] <br />
          <span className="text-green-600/70 dark:text-green-400/70 font-bold">&gt; focus_areas:</span> [Monorepo build loops, decoupled microservices, BetterAuth RBAC, vector indexing, telemetry metrics]
        </p>
      </div>
    </div>

  </div>
</section>

{/* ─── INDEX 05 // CONTACT HANDSHAKE ENDPOINT ─── */}

 <section ref={contactRef} className="w-full max-w-4xl mx-auto mb-16 antialiased px-4 sm:px-6 scroll-mt-24 selection:bg-emerald-500/10 select-none text-neutral-800 dark:text-neutral-200" >
      {/* ─── PORTFOLIO INTERACTION HEADER ─── */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-8 w-full transition-all duration-300 group/hdr">
        <div className="flex items-center gap-2.5 min-w-0">
          <Globe size={14} className="text-emerald-500 animate-pulse shrink-0" />
          <h2 className="text-xs font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase font-mono truncate">
            sys.node <span className="text-neutral-900 dark:text-neutral-100 font-extrabold mx-1">/</span> contact_gateway
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-medium tracking-wider bg-neutral-50 dark:bg-neutral-900/50 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 shadow-xs">
          <span className="relative flex items-center gap-2 pl-4 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest font-mono text-emerald-600 dark:text-emerald-400">
            <span className="absolute left-0 top-1/2 flex h-1.5 w-1.5 -translate-y-1/2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 dark:bg-emerald-500 opacity-40 duration-1000" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            READY_FOR_INITIATIVES
          </span>
        </div>
      </div>

      {/* ─── MAIN BRAND & CONNECTOR HUB ─── */}
      <div className="space-y-6 w-full">
        {/* Full-Bleed Edge-to-Edge Typography Display Panel */}
        <div className="w-full relative p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 overflow-hidden shadow-xs transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700/80">
          {/* Micro Window Ribbon */}
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-100 dark:border-neutral-900 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-[rubyPulse_1.5s_infinite_ease-in-out]" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] animate-[amberPulse_1.5s_infinite_ease-in-out_200ms]" />
              <div className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping duration-1000" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-[greenPulse_1.5s_infinite_ease-in-out_400ms]" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-bold font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.15em]">
              <Terminal size={10} className="text-neutral-400 dark:text-neutral-600 opacity-80" />
              <span>identity::manan_chavda</span>
            </div>
          </div>

          {/* Blueprint Grid Container stretching 100% Left-to-Right */}
<div className="w-full relative bg-neutral-50/60 dark:bg-neutral-900/10 rounded-xl border border-neutral-100 dark:border-neutral-900 p-2 sm:p-4 overflow-hidden flex items-center justify-center min-h-[90px] sm:min-h-[140px]">
  {/* Structural Blueprint Grid Mesh */}
  <div className="absolute inset-0 pointer-events-none opacity-90 dark:opacity-40 mix-blend-normal">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: '12px 12px',
        color: 'rgba(0, 0, 0, 0.05)',
      }}
    />
  </div>
  <div className="absolute inset-0 pointer-events-none hidden dark:block">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: '12px 12px',
        color: 'rgba(255, 255, 255, 0.03)',
      }}
    />
  </div>

  {/* MANAN: Grey-Silver SVG Display Path */}
<svg 
  viewBox="0 0 252 40" 
  className="w-full h-auto relative z-10 text-neutral-400 dark:text-neutral-500 fill-current stroke-neutral-400 dark:stroke-neutral-500 stroke-[0.4px] transition-all duration-300 ease-out hover:text-neutral-700 dark:hover:text-neutral-200 hover:stroke-neutral-700 dark:hover:stroke-neutral-200 hover:stroke-[1.1px] hover:scale-[1.015] hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.08)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]" 
  preserveAspectRatio="none" 
  aria-label="MANAN" 
  role="img"
>
  <g fill="currentColor">
    {/* First M */}
    <path d="M0,0 h8 v8 h8 v8 h8 v-8 h8 v-8 h8 v40 h-8 v-24 h-8 v16 h-8 v-16 h-8 v24 h-8 z" />
    {/* First A */}
    <path d="M52,0 h44 v40 h-8 v-16 h-28 v16 h-8 z M60,12 h28 v8 h-28 z" />
    {/* First N */}
    <path d="M104,0 h8 v40 h-8 z M112,8 h8 v12 h-8 z M120,16 h8 v12 h-8 z M128,24 h12 v16 h-12 z M140,0 h8 v40 h-8 z" />
    {/* Second A */}
    <path d="M156,0 h44 v40 h-8 v-16 h-28 v16 h-8 z M164,12 h28 v8 h-28 z" />
    {/* Second N (Completed) */}
    <path d="M208,0 h8 v40 h-8 z M216,8 h8 v12 h-8 z M224,16 h8 v12 h-8 z M232,24 h12 v16 h-12 z M244,0 h8 v40 h-8 z" />
  </g>
</svg>
</div>
        </div>

       

        {/* Directory Links Grid Mesh */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-1">
          {[
            { label: "Curriculum Vitae", actionText: "Download Resume", icon: Binary, href: "https://drive.google.com/file/d/1TxM08OSjW_i_AeyTFcT0YflAVZZwa099/view?usp=sharing", id: "cv" },
            { label: "Electronic Mail", actionText: "mananchavda100@gmail.com", icon: ShieldCheck, href: "mailto:mananchavda100@gmail.com", id: "mail", copyable: true },
            { label: "Direct Communications", actionText: "+91 7574858088", icon: Workflow, href: "tel:+917574858088", id: "phone", copyable: true }
          ].map((link, lIdx) => {
            const LinkIcon = link.icon;
            return (
              <a key={lIdx} href={link.href} target={link.href.startsWith('http') ? "_blank" : undefined} rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex flex-col justify-between p-5 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950/20 transition-all duration-300 ease-out min-w-0 shadow-xs relative overflow-hidden cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 hover:scale-[1.01] group/link" >
                <span className="absolute bottom-0 left-0 h-[1.5px] bg-neutral-950 dark:bg-neutral-50 transition-all duration-300 w-0 group-hover/link:w-full" />
                <div className="flex items-center justify-between gap-3 w-full mb-5">
                  <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-[0.12em] font-sans block truncate uppercase">
                    {link.label}
                  </span>
                  <i className="ri-links-line   text-neutral-400 dark:text-neutral-500 opacity-60 group-hover/link:opacity-100 transition-all duration-200" />
                </div>
                <div className="flex items-center justify-between gap-2 w-full mt-auto">
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium font-sans text-[13px] tracking-wide transition-colors duration-200 truncate">
                    {link.actionText}
                  </span>
                  <i className="ri-arrow-right-up-line text-neutral-400 dark:text-neutral-500 opacity-40 transition-all duration-200 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100 shrink-0" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ─── COLORFUL TECHIE SYSTEM DIAGNOSTIC FOOTER ─── */}
      <footer className="w-full border-t border-dashed border-neutral-200 dark:border-neutral-800/80 pt-6 mt-16 font-mono text-[10px] relative z-10 tracking-wide space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Cpu size={12} className="shrink-0" />
            <span className="font-bold tracking-wider uppercase text-[9px]">Engine::NextJS</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Blocks size={12} className="shrink-0" />
            <span className="font-bold tracking-wider uppercase text-[9px]">Business::strategy</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
            <Database size={12} className="shrink-0" />
            <span className="font-bold tracking-wider uppercase text-[9px]">Stack::Fullstack</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Activity size={12} className="shrink-0 animate-pulse" />
            <span className="font-bold tracking-wider uppercase text-[9px]">Ping::SLA_&lt;_24h</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2 text-neutral-400 dark:text-neutral-500 text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-2">
            <Code2 size={13} className="text-neutral-500 dark:text-neutral-400" />
            <span className="font-bold tracking-widest text-neutral-700 dark:text-neutral-300 uppercase">
              Manan Chavda <span className="text-neutral-400 font-light font-sans">© 2026</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-medium tracking-normal text-right">
            <span className="text-neutral-300 dark:text-neutral-800 hidden sm:inline">// env_compiled_success</span>
            <span className="text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest border border-neutral-200/40 dark:border-neutral-800">
              v2.4.0-stable
            </span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes rubyPulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes amberPulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes greenPulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.15); opacity: 1; } }
      `}</style>
    </section>


    </main>
  );
}

// Subcomponent carrying un-altered frame proportions alongside the 'Previous' translation physics
function ProjectCard(props) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (window.innerWidth > 640) {
        gsap.fromTo(cardRef.current,
          { scale: 0.98, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top bottom-=40',
              end: 'top center+=100',
              scrub: true,
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    // Mouse hover activates image zoom inside its unchangeable box frame parameters
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

      className="flex gap-4 sm:gap-6 items-start py-6 px-2 border-b border-dashed border-zinc-100 dark:border-zinc-900/30 last:border-0 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/20 cursor-pointer group/build transition-all duration-300"
    >
      {/* Retained unaltered thumbnail dimensions: w-16/h-16 (mobile), w-20/h-20 (desktop) */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative shadow-sm">
        <img 
          ref={imgRef}
          src={props.imgSrc} 
          alt={props.title} 
          className="w-full h-full object-cover will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Content wrapper with side translate animation inherited from previous modules */}
      <div className="flex-1 min-w-0 group-hover/build:translate-x-1 transition-transform duration-200">
        <div className="flex justify-between items-baseline gap-4 mb-1 font-mono">
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight uppercase underline underline-offset-4 decoration-zinc-100 dark:decoration-zinc-900 group-hover/build:text-sky-500 dark:group-hover/build:text-sky-400 transition-colors">
            {props.title}
          </h3>
          <span className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0 font-bold uppercase">
            {props.date}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed mb-3 first-letter:uppercase normal-case">
          {props.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 font-mono">
          {props.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded bg-zinc-50/40 dark:bg-zinc-900/30 tracking-tight uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
