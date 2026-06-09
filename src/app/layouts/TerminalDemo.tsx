import { useState } from 'react';
import CommandCenter from '../../features/search/components/CommandCenter';
import OpportunityNavigator from '../../features/opportunities/components/OpportunityNavigator';
import ForecastCenter from '../../features/forecasts/components/ForecastCenter';
import BuyerProfiles from '../../features/buyers/components/BuyerProfiles';
import SupplierNetwork from '../../features/suppliers/components/SupplierNetwork';
import ConsortiumEngine from '../../features/consortiums/components/ConsortiumEngine';
import ProcurementGraph from '../../features/procurement-graph/components/ProcurementGraph';
import ProcurementMap from '../../features/procurement-graph/components/ProcurementMap';
import AICopilot from '../../features/copilot/components/AICopilot';
import StrategyDoc from '../../features/admin/components/StrategyDoc';
import DatabaseSchemaVisualizer from '../../features/admin/components/DatabaseSchemaVisualizer';
import EnterpriseProfile from '../../features/users/components/EnterpriseProfile';
import SubscriptionDesk from '../../features/subscriptions/components/SubscriptionDesk';
import TeamManagement from '../../features/teams/components/TeamManagement';
import DataSourcesDesk from '../../features/admin/components/DataSourcesDesk';
import AdminConsole from '../../features/admin/components/AdminConsole';

import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  Landmark, 
  Users, 
  Handshake, 
  Network, 
  Map, 
  Bot, 
  Compass, 
  Menu, 
  X,
  Lock,
  User,
  CreditCard,
  UserCheck,
  Database,
  RefreshCw,
  Sliders,
  CheckCircle,
  FolderTree
} from 'lucide-react';
import { Opportunity } from '../../shared/types';

interface TerminalDemoProps {
  activeRole: 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator';
  authUser: any;
  savedOpportunities: string[];
  onToggleSaveOpportunity: (id: string) => void;
  onRoleChange: (newRole: any) => void;
}

export default function TerminalDemo({ 
  activeRole, 
  authUser, 
  savedOpportunities, 
  onToggleSaveOpportunity, 
  onRoleChange 
}: TerminalDemoProps) {
  const [activeView, setActiveView] = useState<string>("Dashboard");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Checks if a specific tab is locked for the current workspace group
  const isTabLocked = (tabName: string): boolean => {
    if (activeRole === 'Administrator') return false; // Full Admin can inspect everything
    
    switch (tabName) {
      case "Forecasts":
        return activeRole === 'Guest' || activeRole === 'SME User'; // Locked for SME and Guest
      case "Buyers":
      case "Suppliers":
        return activeRole === 'Guest'; // Locked for Guest
      case "Consortiums":
      case "Procurement Graph":
      case "Maps":
      case "AI Copilot":
        return activeRole === 'Guest' || activeRole === 'SME User' || activeRole === 'Professional User'; // Locked for Guest, SME, Pro
      case "Team Workspace":
        return activeRole === 'Guest' || activeRole === 'SME User' || activeRole === 'Professional User'; // Locked for SME/Pro/Guest
      case "Sources Inventory":
        return activeRole === 'Guest' || activeRole === 'SME User'; // Locked for low seats
      case "Admin Panel":
        return true; // Locked for absolutely everyone except Admin (who returned early anyway)
      default:
        return false; // Dashboard, Opportunities, Schema, Profile, Subscription desk are never strictly locked
    }
  };

  // Navigator drill-downs handler
  const handleNavigateToView = (view: string, targetItem?: any) => {
    setActiveView(view);
    if (view === 'Opportunities' && targetItem) {
      setSelectedOpportunity(targetItem as Opportunity);
    }
  };

  const navItems = [
    // Category: CORE WORKSPACE
    { name: "Dashboard", icon: LayoutDashboard, category: "WORKSPACE DECISIONS", doc: "Aggregated strategic summaries" },
    { name: "Opportunities", icon: Target, category: "WORKSPACE DECISIONS", doc: "Faceted Elasticsearch tender engine" },
    { name: "Forecasts", icon: Activity, category: "WORKSPACE DECISIONS", doc: "Predictive pipeline forecasts indices" },
    
    // Category: SYSTEM DIRECTORIES
    { name: "Buyers", icon: Landmark, category: "REGIONAL DATABASES", doc: "Sovereign procurement bodies roster" },
    { name: "Suppliers", icon: Users, category: "REGIONAL DATABASES", doc: "East African contractor profiles" },
    
    // Category: INTELLIGENCE DECK
    { name: "Consortiums", icon: Handshake, category: "INTELLIGENCE GRAPHS", doc: "Subcontracting & partnership matchmaking" },
    { name: "Procurement Graph", icon: Network, category: "INTELLIGENCE GRAPHS", doc: "Bidder alignment network paths" },
    { name: "Maps", icon: Map, category: "INTELLIGENCE GRAPHS", doc: "Geospatial freight corridor tracks" },
    { name: "AI Copilot", icon: Bot, category: "AI COGNITIVE DESK", doc: "Gemini compliance auditor desk" },
    
    // Category: SaaS PREFERENCES
    { name: "SaaS Profile", icon: User, category: "ACCOUNT SETTINGS", doc: "Verify ISO credentials & certificates" },
    { name: "Subscription Bench", icon: CreditCard, category: "ACCOUNT SETTINGS", doc: "Upgrade seats & review ledger history" },
    { name: "Team Workspace", icon: UserCheck, category: "ACCOUNT SETTINGS", doc: "Seat sharing permissions toggling" },
    { name: "Database Schema", icon: FolderTree, category: "SYSTEM METRICS", doc: "PostgreSQL ER entity relationship index" },
    { name: "Sources Inventory", icon: Database, category: "SYSTEM METRICS", doc: "Live headless crawler status index" },
    { name: "Admin Panel", icon: Sliders, category: "SYSTEM METRICS", doc: "System logs & index cluster re-indexer" },
  ];

  // Render Premium feature lock screen panel overlay
  const renderPremiumLockScreen = (viewName: string) => {
    const requiredTier = 
      viewName === "Admin Panel" ? "Administrator" :
      ["Consortiums", "Procurement Graph", "Maps", "AI Copilot", "Team Workspace"].includes(viewName) ? "Enterprise Terminal Plan" :
      ["Forecasts", "Sources Inventory"].includes(viewName) ? "Professional Core Plan" : "SME User Plan";

    return (
      <div className="bg-slate-900 border-2 border-[#302010] rounded-xl p-8 max-w-2xl mx-auto my-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6321]/5 rounded-bl-full border-b border-l border-[#302010]"></div>
        
        <div className="w-16 h-16 bg-[#FF6321]/15 border-2 border-[#FF6321] rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(255,99,33,0.2)] animate-pulse-slow">
          <Lock className="h-7 w-7 text-[#FF6321]" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">AUTHORIZATION ACCESS RESTRICTION</span>
          <h3 className="text-xl font-bold text-slate-100 uppercase font-sans tracking-wide">
            {viewName} is a Premium Intelligence Tool
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Your current assigned licensing seat <strong className="text-[#FF6321] uppercase">({activeRole})</strong> has limited compliance authorizations. Unlock the <strong className="text-[#FF6321] uppercase">[{requiredTier}]</strong> to unblur these relational graphs, indices data sheets, and AI predictive modules.
          </p>
        </div>

        <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl max-w-md mx-auto text-[11px] font-mono text-slate-400 text-left space-y-2">
          <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> High-probability consortium mapping unlocks.</div>
          <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Access unmasked competitor bid values.</div>
          <div className="flex gap-2 items-center text-emerald-400"><CheckCircle className="h-3.5 w-3.5" /> Synchronize Unlimited team nodes.</div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setActiveView("Subscription Bench")}
            className="px-5 py-2.5 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold text-xs rounded-lg shadow-[0_0_15px_rgba(255,99,33,0.3)] uppercase transition"
          >
            Upgrade licensing Desk NOW
          </button>
          
          <button
            onClick={() => setActiveView("Dashboard")}
            className="px-4 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 text-xs rounded-lg hover:text-white transition"
          >
            🔙 Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // If the tab is locked, force display the Upgrade module
    if (isTabLocked(activeView)) {
      return renderPremiumLockScreen(activeView);
    }

    switch (activeView) {
      case "Dashboard":
        return <CommandCenter onNavigateToView={handleNavigateToView} />;
      case "Opportunities":
        // Overwrite standard list using our dynamic 500-opportunities Elasticsearch model
        return <OpportunityNavigator initialTargetOpportunity={selectedOpportunity} />;
      case "Forecasts":
        return <ForecastCenter />;
      case "Buyers":
        return <BuyerProfiles />;
      case "Suppliers":
        return <SupplierNetwork />;
      case "Consortiums":
        return <ConsortiumEngine />;
      case "Procurement Graph":
        return <ProcurementGraph />;
      case "Maps":
        return <ProcurementMap />;
      case "AI Copilot":
        return <AICopilot />;
      case "Database Schema":
        return <DatabaseSchemaVisualizer />;
      case "SaaS Profile":
        return (
          <EnterpriseProfile 
            currentRole={activeRole}
            savedOpportunities={savedOpportunities}
            onUnsaveOpportunity={(oppId) => onToggleSaveOpportunity(oppId)}
            onNavigateToView={handleNavigateToView}
          />
        );
      case "Subscription Bench":
        return (
          <SubscriptionDesk 
            currentRole={activeRole} 
            onUpgradeCompleted={(newRole) => onRoleChange(newRole)} 
            onNavigateToView={handleNavigateToView}
          />
        );
      case "Team Workspace":
        return <TeamManagement />;
      case "Sources Inventory":
        return <DataSourcesDesk />;
      case "Admin Panel":
        return <AdminConsole currentRole={activeRole} onRoleChange={(newRole) => onRoleChange(newRole)} />;
      default:
        return <CommandCenter onNavigateToView={handleNavigateToView} />;
    }
  };

  // Group nav items by category block
  const categories = ["WORKSPACE DECISIONS", "REGIONAL DATABASES", "INTELLIGENCE GRAPHS", "AI COGNITIVE DESK", "ACCOUNT SETTINGS", "SYSTEM METRICS"];

  return (
    <div className="flex h-[calc(100vh-190px)] min-h-[640px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
      
      {/* SIDE NAVIGATION PANEL */}
      <aside 
        className={`bg-slate-950 border-r border-slate-800/60 p-3 h-full flex flex-col justify-between transition-all duration-300 ${
          sidebarCollapsed ? 'w-[68px]' : 'w-[245px]'
        }`}
      >
        <div className="space-y-4 overflow-y-auto custom-scroll pr-1">
          
          {/* Collapse switch controller */}
          <div className="flex justify-between items-center px-1.5 py-1 border-b border-slate-850 pb-3">
            {!sidebarCollapsed && (
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF6321] uppercase animate-pulse">
                ⚡ NAV CONSOLE
              </span>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-slate-900 rounded text-slate-500 hover:text-slate-250 transition ml-auto cursor-pointer"
              title={sidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation group arrays parsed by Category */}
          <nav className="space-y-4">
            {categories.map((cat) => {
              const items = navItems.filter(i => i.category === cat);
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  {!sidebarCollapsed && (
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest px-2 block font-bold">
                      {cat}
                    </span>
                  )}
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeView === item.name;
                    const isLocked = isTabLocked(item.name);
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setActiveView(item.name);
                          if (item.name !== 'Opportunities') setSelectedOpportunity(null);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF6321]/15 text-[#FF6321] border-l-2 border-[#FF6321]'
                            : 'text-slate-450 hover:bg-slate-900/60 hover:text-slate-200'
                        }`}
                        title={item.doc}
                      >
                        <div className="flex items-center gap-2 max-w-[80%] truncate">
                          <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-[#FF6321]' : 'text-slate-500'}`} />
                          {!sidebarCollapsed && <span className="truncate text-left text-[11px]">{item.name}</span>}
                        </div>
                        
                        {!sidebarCollapsed && isLocked && (
                          <Lock className="h-3 w-3 text-slate-650" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer info block */}
        {!sidebarCollapsed && (
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-850/60 text-center space-y-1 mt-auto">
            <span className="text-[9px] text-[#00FF00] font-mono block font-bold tracking-tighter">● SYSTEM SECURE</span>
            <span className="text-[8px] text-slate-500 font-mono block select-none">PORT: 3000 CORE GATE</span>
          </div>
        )}

      </aside>

      {/* ACTIVE SCREEN WORKSPACE */}
      <main className="flex-1 h-full p-6 overflow-y-auto custom-scroll bg-[#050505]">
        
        {/* Render selected component */}
        {renderContent()}

      </main>

    </div>
  );
}
