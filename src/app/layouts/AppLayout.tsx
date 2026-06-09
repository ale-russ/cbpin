import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/auth/auth.store';
import { useAuth } from '../../features/auth/auth.hooks';
import { 
  LayoutDashboard, Target, Activity, Landmark, Users, 
  Handshake, Network, Map, Bot, User, CreditCard, 
  UserCheck, FolderTree, Database, Sliders, Menu, X, 
  Lock, CheckCircle, Bell, LogOut, ShieldCheck
} from 'lucide-react';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeRole = useAuthStore((s) => s.activeRole);
  const setActiveRole = authStoreSetActiveRole;
  const savedOpportunities = useAuthStore((s) => s.savedOpportunities);

  // System time state sync
  const [systemTime, setSystemTime] = useState<string>(new Date().toUTCString());
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(3);
  
  // Navigation sync loading and notification click-outside ref
  const [isNavLoading, setIsNavLoading] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date().toUTCString());
    }, 1005);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsNavLoading(true);
    const timer = setTimeout(() => {
      setIsNavLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function authStoreSetActiveRole(role: UserRole) {
    import('../../store/auth/auth.store').then(({ authStore }) => {
      authStore.setActiveRole(role);
    });
  }

  // Paths license authorization evaluation
  const isPathLocked = (pathname: string): boolean => {
    if (activeRole === 'Administrator') return false;

    if (pathname.startsWith('/reports')) {
      return activeRole === 'Guest' || activeRole === 'SME User'; // Requites Pro or Enterprise
    }
    if (pathname.startsWith('/organizations')) {
      return activeRole === 'Guest'; // SME can view
    }
    if (pathname.startsWith('/suppliers')) {
      return activeRole === 'Guest'; // SME can view
    }
    if (pathname.startsWith('/partnerships')) {
      return activeRole === 'Guest' || activeRole === 'SME User' || activeRole === 'Professional User'; // Enterprise minimum
    }
    if (pathname.startsWith('/intelligence')) {
      return activeRole === 'Guest' || activeRole === 'SME User' || activeRole === 'Professional User'; // Enterprise minimum
    }
    return false;
  };

  const menuGroups = [
    {
      title: "WORKSPACE DECISIONS",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, doc: "Strategic summaries" },
        { name: "Opportunities", path: "/opportunities", icon: Target, doc: "Elasticsearch tenders" },
        { name: "Predictive Forecasts", path: "/reports", icon: Activity, doc: "Upcoming budget listings" },
      ]
    },
    {
      title: "REGIONAL DIRECTORIES",
      items: [
        { name: "Organizations", path: "/organizations", icon: Landmark, doc: "Authority rosters" },
        { name: "Suppliers Directory", path: "/suppliers", icon: Users, doc: "Constractor registries" },
        { name: "Consortium Builder", path: "/partnerships", icon: Handshake, doc: "Joint-Venture escrow" },
      ]
    },
    {
      title: "INTELLIGENCE GRAPHS",
      items: [
        { name: "AI Copilot Desk", path: "/intelligence?tab=copilot", icon: Bot, doc: "Gemini compliance desk" },
        { name: "Relationship Graph", path: "/intelligence?tab=graph", icon: Network, doc: "Interconnect patterns" },
        { name: "FREIGHT CORRIDOR MAPS", path: "/intelligence?tab=map", icon: Map, doc: "Geospatial freight tracks" },
      ]
    },
    {
      title: "ACCOUNT PREFERENCES",
      items: [
        { name: "Company Profile", path: "/settings?tab=profile", icon: User, doc: "Upload ISO certificates" },
        { name: "Subscription Bench", path: "/settings?tab=subscription", icon: CreditCard, doc: "Review ledger" },
        { name: "Team Workspace", path: "/settings?tab=team", icon: UserCheck, doc: "Collaborative permissions" },
        { name: "ER PostgreSQL Index", path: "/settings?tab=admin", icon: FolderTree, doc: "Schema models" },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isCurrentLocked = isPathLocked(location.pathname);

  const getRequiredTier = (path: string): string => {
    if (path.startsWith('/partnerships') || path.startsWith('/intelligence')) {
      return "Enterprise Terminal Plan";
    }
    if (path.startsWith('/reports')) {
      return "Professional Core Plan";
    }
    return "SME User Plan";
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased selection:bg-[#FF6321] selection:text-black flex flex-col">
      
      {/* Universal CPIN Network Header status bar */}
      <header className="bg-slate-900 border-b border-slate-800/80 px-6 py-3 px-4 md:px-6 relative z-40 flex-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-[#FF6321] rounded flex items-center justify-center font-black text-black text-lg select-none shadow-[0_0_15px_rgba(255,99,33,0.3)] cursor-pointer"
            >
              CPIN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold uppercase tracking-widest text-[#fafafa] cursor-pointer" onClick={() => navigate('/dashboard')}>
                  Cross-Border Procurement Intelligence Network
                </h1>
              </div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">
                v2.4.0-EAFRICA // SaaS ACTIVE MULTI-PORTAL SUITE
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            
            {/* Role/Seat Switcher toggle */}
            <div className="bg-slate-950 border border-slate-850 py-1 px-2.5 rounded-lg flex items-center gap-1.5 focus-within:border-[#FF6321]">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Seat Level:</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as any)}
                className="bg-transparent border-none text-[10px] text-white font-mono font-bold focus:outline-none cursor-pointer pr-1"
                title="Change active seat clearance level for trial evaluation"
              >
                <option value="Guest" className="bg-slate-950 text-white">Guest / Free</option>
                <option value="SME User" className="bg-slate-950 text-white">SME User</option>
                <option value="Professional User" className="bg-slate-950 text-white">Professional Core</option>
                <option value="Enterprise User" className="bg-slate-950 text-white">Enterprise Terminal</option>
                <option value="Administrator" className="bg-slate-950 text-white">Administrator Supreme</option>
              </select>
            </div>

            {/* Notifications Bell */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => {
                  setShowNotificationPopup(!showNotificationPopup);
                  setUnreadAlertsCount(0);
                }}
                className="p-2 cursor-pointer hover:bg-slate-850 border border-slate-800 rounded bg-[#111] text-slate-400 hover:text-white transition relative"
              >
                <Bell className="h-4 w-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-[-3px] right-[-3px] bg-[#FF6321] text-black text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {showNotificationPopup && (
                <div className="absolute right-0 mt-2.5 w-80 bg-slate-900 border-2 border-slate-800 rounded-xl shadow-2xl z-50 p-4 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-100 uppercase">🚨 NEW SECURE TELEMETRY</span>
                    <button 
                      onClick={() => setShowNotificationPopup(false)}
                      className="text-slate-500 hover:text-white text-sm"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    <div className="p-2 bg-slate-950 rounded border border-rose-950/50">
                      <span className="text-[8px] text-rose-400 font-bold block uppercase border-b border-slate-900 pb-0.5 mb-1">CRITICAL REGISTER CHECK</span>
                      <p className="text-[10px] leading-snug">Kampala solar installation bid Award completed on UNRA framework code UG-2844.</p>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-[#FF6321]/30">
                      <span className="text-[8px] text-amber-400 font-bold block uppercase border-b border-slate-900 pb-0.5 mb-1">SOVEREIGN GRAPH SYNC</span>
                      <p className="text-[10px] leading-snug">Tanzanian maize milling tenders increased by +25% in planned fiscal cycle.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Operator Logout */}
            <button
              onClick={handleLogout}
              className="p-2 bg-slate-950/80 hover:bg-rose-950/20 hover:text-rose-400 border border-slate-800 rounded text-slate-400 transition flex items-center gap-1 cursor-pointer"
              title="Sign Out Session"
            >
              <LogOut className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#00FF00] bg-slate-950/80 border border-slate-850 px-3 py-2 rounded tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF00] animate-pulse"></div>
              <span className="hidden sm:inline">EAC FEED DIRECT</span>
            </div>
            
          </div>

        </div>
      </header>

      {/* Main workspace layout: Split Sidebar | Screen Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row relative">
        
        {/* LEFT NAV PANEL - RESPONSIVE SIDEBAR */}
        <aside className={`bg-slate-900/60 border-r border-slate-900 md:w-64 w-full flex-none p-4 space-y-6 md:block ${sidebarCollapsed ? 'hidden' : 'block'}`}>
          <div className="flex justify-between items-center md:hidden border-b border-slate-850 pb-2 mb-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">CPIN MENU</span>
            <button onClick={() => setSidebarCollapsed(true)} className="p-1 uppercase font-bold font-mono text-slate-500 hover:text-white">close ×</button>
          </div>
          
          <div className="space-y-6">
            {menuGroups.map((grp) => (
              <div key={grp.title} className="space-y-2">
                <span className="text-[9.5px] font-mono text-slate-600 font-black block tracking-wider uppercase">
                  {grp.title}
                </span>
                <div className="flex flex-col gap-1">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    // Custom active check since settings features have subquery query parameters!
                    const isSettingsActive = item.path.startsWith('/settings') && location.pathname.startsWith('/settings');
                    const isIntelActive = item.path.startsWith('/intelligence') && location.pathname.startsWith('/intelligence');
                    const isReportsActive = item.path.startsWith('/reports') && location.pathname.startsWith('/reports');
                    const isDashboardActive = item.path === '/dashboard' && location.pathname === '/dashboard';
                    const isOppsActive = item.path === '/opportunities' && location.pathname.startsWith('/opportunities');
                    const isOrgsActive = item.path === '/organizations' && location.pathname.startsWith('/organizations');
                    const isSuppActive = item.path === '/suppliers' && location.pathname.startsWith('/suppliers');
                    const isPartnersActive = item.path === '/partnerships' && location.pathname.startsWith('/partnerships');

                    const isHighlighted = isDashboardActive || isOppsActive || isOrgsActive || isSuppActive || isPartnersActive || isSettingsActive || isIntelActive || isReportsActive;

                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => {
                          const active = isActive || 
                            (item.path.startsWith('/settings') && location.pathname.startsWith('/settings')) ||
                            (item.path.startsWith('/intelligence') && location.pathname.startsWith('/intelligence')) ||
                            (item.path.startsWith('/reports') && location.pathname.startsWith('/reports')) ||
                            (item.path === '/opportunities' && location.pathname.startsWith('/opportunities')) ||
                            (item.path === '/organizations' && location.pathname.startsWith('/organizations')) ||
                            (item.path === '/suppliers' && location.pathname.startsWith('/suppliers'));

                          return `flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition font-mono ${
                            active 
                              ? 'bg-slate-950 font-extrabold text-[#FF6321] border border-slate-800 shadow-sm' 
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/20'
                          }`;
                        }}
                      >
                        <Icon className="h-4 w-4" />
                        <div className="flex flex-col text-left">
                          <span>{item.name}</span>
                          <span className="text-[8px] text-slate-500 scale-90 origin-left tracking-normal truncate">{item.doc}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Dynamic content outlet on active route */}
        <main className="flex-grow p-4 md:p-6 overflow-y-auto relative min-h-[400px]">
          {isNavLoading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
              {/* Premium top loading sync bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6321] shadow-[0_0_15px_#FF6321] transition-all duration-350"></div>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-dashed border-[#FF6321]/40 animate-spin flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
                </div>
              </div>
              <div className="text-center space-y-1 select-none">
                <p className="text-[10px] font-mono text-[#FF6321] uppercase tracking-widest font-black animate-pulse">
                  DECRYPTING & SYNCING PORTS...
                </p>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                  ESTABLISHING SECURE GATEWAY DATA
                </p>
              </div>
            </div>
          )}

          {isCurrentLocked ? (
            
            /* Premium Locker screen */
            <div className="bg-slate-900 border-2 border-[#302010] rounded-xl p-8 max-w-2xl mx-auto my-12 text-center space-y-6 relative overflow-hidden font-sans">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6321]/5 rounded-bl-full border-b border-l border-[#302010]"></div>
              
              <div className="w-16 h-16 bg-[#FF6321]/15 border-2 border-[#FF6321] rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(255,99,33,0.2)]">
                <Lock className="h-7 w-7 text-[#FF6321]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">AUTHORIZATION ACCESS RESTRICTION</span>
                <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wide">
                  This Feature is Locked
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Your current assigned licensing seat <strong className="text-[#FF6321] uppercase">({activeRole})</strong> has limited compliance authorizations. Unlock the <strong className="text-[#FF6321] uppercase">[{getRequiredTier(location.pathname)}]</strong> to use these relational graphs, indices data sheets, and AI predictive modules.
                </p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl max-w-md mx-auto text-[11px] font-mono text-slate-400 text-left space-y-2">
                <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> High-probability consortium mapping unlocks.</div>
                <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Access unmasked competitor bid values.</div>
                <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Synchronize Unlimited team nodes.</div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/settings?tab=subscription')}
                  className="px-5 py-2.5 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold text-xs rounded-lg shadow-[0_0_15px_rgba(255,99,33,0.3)] uppercase cursor-pointer"
                >
                  Upgrade licensing Desk NOW
                </button>
                
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 text-xs rounded-lg hover:text-white transition cursor-pointer"
                >
                  🔙 Back to Dashboard
                </button>
              </div>
            </div>

          ) : (
            <Outlet />
          )}
        </main>

      </div>

      {/* Unified Immersive Status Footer */}
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

    </div>
  );
}
