import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EnterpriseProfile from '../../features/users/components/EnterpriseProfile';
import TeamManagement from '../../features/teams/components/TeamManagement';
import SubscriptionDesk from '../../features/subscriptions/components/SubscriptionDesk';
import AdminConsole from '../../features/admin/components/AdminConsole';
import { useAuthStore, authStore } from '../../store/auth/auth.store';
import { User, ClipboardList, CreditCard, Shield, Settings } from 'lucide-react';

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'profile';
  const activeRole = useAuthStore((s) => s.activeRole);
  const savedOpportunities = useAuthStore((s) => s.savedOpportunities);

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: User, desc: 'Corporate details & ISO status' },
    { id: 'team', label: 'Team Workspace', icon: ClipboardList, desc: 'Secure staff seats & clearances' },
    { id: 'subscription', label: 'Subscription Bench', icon: CreditCard, desc: 'Enterprise SaaS tiering' },
    { id: 'admin', label: 'Admin Console', icon: Shield, desc: 'System db schema & index audits' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header banner */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN INFRASTRUCTURE OPERATIONS</span>
          <h1 className="text-xl font-bold text-slate-100 mt-0.5">Control Panel & Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure firm-wide ISO credentials, invite collaborative partners, manage subscription tokens, or inspect database nodes.
          </p>
        </div>
      </div>

      {/* Grid: Left tabs, Right settings context */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left menu side-rail */}
        <div className="lg:col-span-1 bg-slate-950 border border-slate-850 p-3 rounded-xl space-y-1.5 h-fit">
          <span className="text-[10px] text-slate-500 font-mono font-bold block px-2 pb-1.5 border-b border-slate-900 uppercase">OPERATOR PREFERENCES</span>
          
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pt-1">
            {tabs.map((t) => {
              const isCurrent = activeTab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex flex-col transition cursor-pointer min-w-[140px] ${
                    isCurrent 
                      ? 'bg-[#111] border border-slate-800 text-[#FF6321] font-semibold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 pl-5">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right content view area */}
        <div className="lg:col-span-3">
          
          {activeTab === 'profile' && (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <EnterpriseProfile 
                currentRole={activeRole} 
                savedOpportunities={savedOpportunities} 
                onUnsaveOpportunity={(id) => authStore.toggleSaveOpportunity(id)} 
                onNavigateToView={(view, targetItem) => {
                  if (view === 'Opportunities' && targetItem) {
                    navigate(`/opportunities/${targetItem.id}`);
                  } else if (view === 'Opportunities') {
                    navigate('/opportunities');
                  } else {
                    navigate('/dashboard');
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <TeamManagement />
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <SubscriptionDesk 
                currentRole={activeRole} 
                onUpgradeCompleted={(newRole) => authStore.setActiveRole(newRole)} 
                onNavigateToView={(view) => {
                  if (view === 'Opportunities') {
                    navigate('/opportunities');
                  } else {
                    navigate('/dashboard');
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              {activeRole === 'Administrator' ? (
                <AdminConsole 
                  currentRole={activeRole} 
                  onRoleChange={(newRole) => authStore.setActiveRole(newRole)} 
                />
              ) : (
                <div className="min-h-[250px] flex flex-col items-center justify-center p-6 text-center space-y-3 font-mono text-xs">
                  <Shield className="h-10 w-10 text-rose-500 animate-bounce" />
                  <strong className="text-red-500 uppercase tracking-widest block">🔒 OPERATION DISALLOWED (ADMIN ONLY)</strong>
                  <p className="text-slate-400 max-w-sm">
                    In order to audit database schemas or inspect source API registries, select the <strong>Administrator</strong> seat level from the top bar.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
