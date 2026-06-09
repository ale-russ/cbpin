import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './features/auth/auth.provider';
import { AppRouter } from './app/router/AppRouter';
import { ShieldAlert, Cpu, Network, Server } from 'lucide-react';

export default function App() {
  const [initStage, setInitStage] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [logText, setLogText] = useState<string>("INITIALIZING CPIN CORE PORTAL DIRECTIVE...");

  useEffect(() => {
    // Increase progress smoothly over 1.4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(100);
      setLogText("CPIN MULTI-PORTAL SYNC SECURED. GRANTING COMPLIANCE ACCESS.");
      const transitionTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 400);
      return () => clearTimeout(transitionTimer);
    } else if (progress > 75) {
      setLogText("CONSTRUCTING COMPLIANCE ORBITS & RELATIONAL NETWORK...");
      setInitStage(3);
    } else if (progress > 45) {
      setLogText("ESTABLISHING SECURE CRYPTO-MUTEX PROTOCOLS...");
      setInitStage(2);
    } else if (progress > 15) {
      setLogText("SYNCHRONIZING EAST-AFRICA PROCUREMENTS & TENDER DATABASES...");
      setInitStage(1);
    }
  }, [progress]);

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="portal-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-6 text-slate-100 font-mono select-none"
          >
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6321]/5 rounded-full blur-[80px]" />
            <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-emerald-500/2 rounded-full blur-[60px]" />

            <div className="max-w-md w-full space-y-8 text-center relative">
              
              {/* Outer glowing shield header */}
              <div className="flex justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="w-20 h-20 border border-dashed border-[#FF6321]/40 rounded-full flex items-center justify-center"
                  />
                  <div className="absolute inset-2 border border-slate-800 rounded-full flex items-center justify-center bg-slate-950/85 shadow-[0_0_20px_rgba(255,99,33,0.1)]">
                    <Cpu className="h-6 w-6 text-[#FF6321] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Title & Stats */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#FF6321] tracking-widest uppercase block animate-pulse">
                  System Boot Sequence Active
                </span>
                <h1 className="text-lg font-black tracking-widest uppercase text-slate-100">
                  CPIN SECURE EDGE
                </h1>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">
                  CROSS-BORDER PROCUREMENT INTELLIGENCE SYSTEM // v2.4.0
                </p>
              </div>

              {/* High tech logs */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-left space-y-2 max-w-sm mx-auto shadow-inner">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Server className="h-3 w-3 text-[#FF6321]" />
                  <span className="text-slate-600">STAGE 01:</span>
                  <span className={initStage >= 1 ? "text-emerald-400" : "text-slate-600"}>
                    {initStage >= 1 ? "✔ INTERFACE SYNCED" : "⌛ PENDING"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Network className="h-3 w-3 text-[#FF6321]" />
                  <span className="text-slate-600">STAGE 02:</span>
                  <span className={initStage >= 2 ? "text-emerald-400" : "text-slate-600"}>
                    {initStage >= 2 ? "✔ MEMORY ENGAGED" : "⌛ PENDING"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <ShieldAlert className="h-3 w-3 text-[#FF6321]" />
                  <span className="text-slate-600">STAGE 03:</span>
                  <span className={initStage >= 3 ? "text-emerald-400" : "text-slate-600"}>
                    {initStage >= 3 ? "✔ SECURITY ORBIT READY" : "⌛ PENDING"}
                  </span>
                </div>
                
                <div className="border-t border-slate-900 pt-2 mt-2">
                  <p className="text-[10px] font-mono leading-tight text-slate-400 min-h-8">
                    <span className="text-[#FF6321]">{">"}</span> {logText}
                  </p>
                </div>
              </div>

              {/* Progress counter */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-slate-500 max-w-sm mx-auto font-mono">
                  <span>SECURE GATEWAY DECIDEC</span>
                  <span className="font-bold text-[#FF6321]">{Math.min(progress, 100)}%</span>
                </div>
                
                {/* Horizontal Bar */}
                <div className="h-1 bg-slate-950 rounded-full overflow-hidden max-w-sm mx-auto border border-slate-900">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF6321] to-amber-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <AppRouter key="app-navigation-router" />
        )}
      </AnimatePresence>
    </AuthProvider>
  );
}
