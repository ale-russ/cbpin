import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AICopilot from '../../features/copilot/components/AICopilot';
import ProcurementGraph from '../../features/procurement-graph/components/ProcurementGraph';
import ProcurementMap from '../../features/procurement-graph/components/ProcurementMap';
import { Bot, Network, Map, Landmark } from 'lucide-react';

export default function IntelligencePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'copilot';

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

  return (
    <div className="space-y-6">
      
      {/* Page Header block */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN COGNITIVE ORBIT</span>
          <h1 className="text-xl font-bold text-slate-100">Market Intelligence Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Predictive AI copilots, sovereign supply network mapping, and geographical tender locations trackers.
          </p>
        </div>
      </div>

      {/* Switch selectors */}
      <div className="flex gap-1 bg-slate-950 border border-slate-850 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => handleTabChange('copilot')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-lg flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'copilot' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="h-4 w-4" />
          <span>1. ENTERPRISE COPILOT</span>
        </button>

        <button
          onClick={() => handleTabChange('graph')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-lg flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'graph' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="h-4 w-4" />
          <span>2. RELATIONSHIP NETWORK</span>
        </button>

        <button
          onClick={() => handleTabChange('map')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-lg flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'map' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="h-4 w-4" />
          <span>3. TERRITORIAL MATRIX MAPS</span>
        </button>
      </div>

      {/* Render Active Tab widget */}
      <div className="space-y-4">
        {activeTab === 'copilot' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
            <AICopilot />
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
            <ProcurementGraph />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
            <ProcurementMap />
          </div>
        )}
      </div>

    </div>
  );
}
