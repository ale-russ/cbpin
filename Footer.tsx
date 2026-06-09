import react, {useState, useEffect} from "react"

export default function Footer( )  {
  const [systemTime, setSystemTime] = useState<string>(new Date().toUTCString());

    useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date().toUTCString());
    }, 1005);
    return () => clearInterval(interval);
  }, []);
  return(
    <footer className="border-t border-slate-800/80 bg-slate-900 py-4 px-6 text-[10px] font-mono text-slate-500 relative z-30 flex-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span>SYNC STATUS: <span className="text-[#00FF00] font-semibold">ONLINE</span></span>
            <span className="text-slate-805">|</span>
            <span>SYSTEM TIME: <span className="text-[#FF6321] font-bold">{systemTime}</span></span>
            <span className="text-slate-805">|</span>
            <span className="text-slate-400">Uganda, Kenya, Tanzania, Rwanda, South Sudan, DRC procurement networks linked.</span>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="hover:text-[#FF6321] cursor-pointer transition-colors uppercase tracking-wider text-[9px] font-bold">WAF Protected</span>
            <span className="text-slate-805">|</span>
            <span className="hover:text-[#FF6321] cursor-pointer transition-colors uppercase tracking-wider text-[9px] font-bold">OECD compliance rules</span>
            <span className="text-slate-805">|</span>
            <span className="text-slate-400">© 2026 CPIN INTEL NETWORK</span>
          </div>
        </div>
      </footer>
  )
}