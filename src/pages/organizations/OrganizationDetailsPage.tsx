import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockBuyers } from '../../data/mockOpportunities';
import { ArrowLeft, MapPin, BarChart3, Award, ShieldAlert, DollarSign, Calendar, HelpCircle, CheckCircle } from 'lucide-react';

export default function OrganizationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const buyer = useMemo(() => {
    return mockBuyers.find((b) => b.id === id);
  }, [id]);

  const [activeTab, setActiveTab] = useState<'overview' | 'awards' | 'incumbents' | 'risk'>('overview');

  if (!buyer) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="text-center space-y-3">
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto" />
          <h2 className="text-base font-bold text-slate-100 font-mono">Organization Node Unresolved</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            The target procuring authority ID "{id}" is invalid or you lack operational clearing index seats.
          </p>
          <button 
            onClick={() => navigate('/organizations')}
            className="px-4 py-2 bg-slate-950 border border-slate-800 text-[#FF6321] text-xs font-mono rounded-lg hover:bg-slate-900 transition"
          >
            ← Back to Organizations Index
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Details Header Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/organizations')}
            className="p-2 cursor-pointer bg-slate-950 border border-slate-800 hover:text-[#FF6321] transition rounded-lg text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-[#FF6321]">
              <span>{buyer.id}</span>
              <span className="text-slate-650">•</span>
              <span>{buyer.type} Profiles</span>
            </div>
            <h1 className="text-base font-bold text-slate-100 mt-0.5">{buyer.name}</h1>
          </div>
        </div>

        <div className="bg-slate-950 px-4 py-1.5 border border-slate-850 rounded-lg text-center font-mono">
          <span className="text-[9px] text-[#FF6321] block uppercase font-bold">Trust Rating Index</span>
          <span className="text-base font-extrabold text-emerald-400">{buyer.trustScore} / 100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Context Menu Tab Selectors */}
        <div className="lg:col-span-1 bg-slate-950 border border-slate-850 p-3 rounded-xl space-y-1.5 h-fit">
          <span className="text-[10px] text-slate-500 font-mono font-bold block pb-1.5 uppercase tracking-wide px-2">LOCAL CONTROLS</span>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">1. Overview Dossier</span>
            <span className="text-[9px] text-slate-500">Tender sizing & metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('awards')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'awards' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">2. Awards History</span>
            <span className="text-[9px] text-slate-500">Allocation trends chart</span>
          </button>

          <button
            onClick={() => setActiveTab('incumbents')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'incumbents' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">3. Incumbent Winners</span>
            <span className="text-[9px] text-slate-500">Vendor market shares</span>
          </button>

          <button
            onClick={() => setActiveTab('risk')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'risk' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">4. Trust & Risk Indexes</span>
            <span className="text-[9px] text-slate-500">National Content Quotas</span>
          </button>
        </div>

        {/* Right Side: Tab View Panels */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="bg-slate-940 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Institutional Dossier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono text-slate-500">ANNUAL PROCUREMENT VOLUME</span>
                  <p className="text-2xl font-black text-emerald-450 font-mono mt-1">${(buyer.annualVolumeUSD / 1000000).toFixed(1)}M USD</p>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1">Sum of all registered contract award listings.</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono text-slate-500">AVERAGE CONTRACT VALUE</span>
                  <p className="text-xl font-bold font-mono mt-1 text-slate-100">${(buyer.avgContractValueUSD / 1000000).toFixed(1)}M USD</p>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1">Average sizing of individual project releases.</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg space-y-2 text-xs">
                <span className="text-slate-500 font-mono text-[9px] block">CATASTRAL DESCRIPTION & SUMMARY</span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  The {buyer.name} represents a major procurement corridor within <strong>{buyer.country}</strong>. Under statutory frameworks, they serve as high-density allocators of municipal infrastructural programs and civil engineering contracts.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: AWARDS HISTORY */}
          {activeTab === 'awards' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Budgetary Award History Trajectory</h3>
              
              {/* Yearly Chart layout */}
              <div className="space-y-5">
                {buyer.contractAwardHistory.map((item) => {
                  const maxVal = Math.max(...buyer.contractAwardHistory.map(h => h.val));
                  const percentage = (item.val / maxVal) * 100;
                  return (
                    <div key={item.year} className="space-y-1.5 font-mono">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">{item.year} Financial fiscal Cycle</span>
                        <span className="text-white font-bold">${(item.val / 1000000).toFixed(1)}M USD ({item.count} Tender awards)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-3 border border-slate-850 rounded-full overflow-hidden">
                        <div className="bg-[#FF6321] h-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[9.5px] font-mono text-slate-500 italic">
                * Transmitted directly from central treasury and public financial bulletins verified through blockchain node tracking.
              </div>
            </div>
          )}

          {/* TAB 3: INCUMBENTS */}
          {activeTab === 'incumbents' && (
            <div className="bg-slate-900 border border-[#302010] p-6 rounded-xl space-y-6 relative overflow-hidden">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Mapped Incumbents & Preferred Contractors</h3>

              <div className="space-y-3">
                {buyer.frequentWinners.map((winner, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950 border border-slate-850">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="w-6 h-6 bg-[#FF6321]/15 border border-[#FF6321] rounded-full flex items-center justify-center font-bold text-[#FF6321] text-[9.5px]">
                        🏆
                      </span>
                      <div>
                        <strong className="text-slate-200 font-bold">{winner}</strong>
                        <span className="text-[9px] text-slate-500 block">Class-1 Sovereign Contractor</span>
                      </div>
                    </div>
                    <span className="text-[9.5px] font-mono text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded">
                      Prime partner
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-lg text-xs leading-relaxed text-slate-450">
                💡 <strong>Strategy Hint:</strong> Teaming up or forming consortiums with these historical prime awardees decreases sovereign risk and unblocks high-probability subcontract entries.
              </div>
            </div>
          )}

          {/* TAB 4: RISK & TRUST */}
          {activeTab === 'risk' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Sovereign Compliance Risk Profile</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
                  <span className="text-slate-500 uppercase text-[9px] font-mono block">SUBCONTRACT COMPLEXITY FILTER</span>
                  <span className="px-2 py-0.5 bg-purple-950/40 border border-purple-800 text-purple-400 font-mono text-[9px] font-bold rounded inline-block uppercase">
                    {buyer.preferredSupplierComplexity} Sizing Requirement
                  </span>
                  <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                    Indicates typical regulatory compliance hurdles required to bid.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1.5 text-xs font-mono">
                  <span className="text-slate-500 uppercase text-[9px] block">CORRIDOR PRESENCE</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {buyer.regionalPresence?.map((p_country) => (
                      <span key={p_country} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9.5px] text-slate-300">
                        🌍 {p_country}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-500 block pt-1">Active registered tax certificates.</span>
                </div>
              </div>
              
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex gap-3 text-xs leading-relaxed text-slate-400 font-sans">
                <ShieldAlert className="h-4 w-4 text-[#FF9E00] flex-shrink-0 mt-0.5" />
                <p>
                  Sovereign trust score evaluates institutional payments stability. A trust rating of <strong>{buyer.trustScore}</strong> makes this procuring entity a highly robust contractor with minimal risk of budget cancellations.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
