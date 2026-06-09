import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockSuppliers } from '../../data/mockOpportunities';
import { ArrowLeft, Award, Briefcase, MapPin, ShieldCheck, Globe, ShieldAlert, BarChart3, Users } from 'lucide-react';

export default function SupplierDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const supplier = useMemo(() => {
    return mockSuppliers.find((s) => s.id === id);
  }, [id]);

  const [activeTab, setActiveTab] = useState<'overview' | 'expertise' | 'geography' | 'compliance'>('overview');

  if (!supplier) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="text-center space-y-3">
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto" />
          <h2 className="text-base font-bold text-slate-100 font-mono">Supplier Node Unresolved</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            The supplier ID "{id}" is invalid or is not listed in active partner directories.
          </p>
          <button 
            onClick={() => navigate('/suppliers')}
            className="px-4 py-2 bg-slate-950 border border-slate-800 text-[#FF6321] text-xs font-mono rounded-lg hover:bg-slate-900 transition"
          >
            ← Back to Suppliers Index
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
            onClick={() => navigate('/suppliers')}
            className="p-2 cursor-pointer bg-slate-950 border border-slate-800 hover:text-[#FF6321] transition rounded-lg text-slate-400"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-[#FF6321]">
              <span>{supplier.id}</span>
              <span className="text-slate-650">•</span>
              <span>{supplier.competitivePosition}</span>
            </div>
            <h1 className="text-base font-bold text-slate-100 mt-0.5">{supplier.name}</h1>
          </div>
        </div>

        <div className="bg-slate-950 px-4 py-1.5 border border-slate-850 rounded-lg text-center font-mono">
          <span className="text-[9px] text-[#FF6321] block uppercase font-bold">REPUTATION RATING</span>
          <span className="text-sm font-extrabold text-emerald-400">{100 - supplier.supplierRiskScore} / 100 Safe</span>
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
            <span className="font-bold">1. Corporate Registry</span>
            <span className="text-[9px] text-slate-500">Revenue & win rates stats</span>
          </button>

          <button
            onClick={() => setActiveTab('expertise')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'expertise' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">2. Technical Specialties</span>
            <span className="text-[9px] text-slate-500">ISO classifications listed</span>
          </button>

          <button
            onClick={() => setActiveTab('geography')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'geography' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">3. Geographical Span</span>
            <span className="text-[9px] text-slate-500">Licensed sovereign hubs</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`w-full text-left p-2.5 text-xs rounded-lg font-mono flex flex-col transition cursor-pointer ${
              activeTab === 'compliance' ? 'bg-[#111] text-[#FF6321] border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold">4. Trust Verification</span>
            <span className="text-[9px] text-slate-500">JV Escrow pre-approvals</span>
          </button>
        </div>

        {/* Right Side: Tab View Panels */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Corporate Registry Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">CONTRACTS SECURED</span>
                  <p className="text-2xl font-black text-slate-100 font-mono mt-1">{supplier.contractsWon}</p>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1">Sovereign prime contractor receipts.</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">GROSS VAL USD</span>
                  <p className="text-xl font-bold font-mono mt-1 text-slate-100">${(supplier.totalContractValueUSD / 1000000).toFixed(1)}M USD</p>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1">Verified pre-tax contract allocations.</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono theme-glow block uppercase">SUBCONTRACT WIN RATE</span>
                  <p className="text-xl font-bold font-mono mt-1 text-emerald-450">{supplier.winRatePercent}%</p>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1">Bid-to-award conversion ratio.</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2 text-xs font-mono">
                <span className="text-[9px] block text-slate-500 font-bold uppercase">POSITIONING CLASSIFICATION</span>
                <p className="text-slate-300 font-sans leading-relaxed">
                  The company operates as a key <strong>{supplier.competitivePosition}</strong> within their territorial sectors, showcasing a <strong>{supplier.growthTrend}</strong> growth trend under active tax audits.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIALTIES */}
          {activeTab === 'expertise' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Technical Capability & Specialties</h3>

              <div className="space-y-2">
                {supplier.sectorExpertise.map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-850 text-xs text-slate-200 font-mono">
                    <span className="text-[#FF6321]">✔</span>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GEOGRAPHICAL SPAN */}
          {activeTab === 'geography' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Sovereign Licensing Span</h3>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supplier.countriesServed.map((country, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-between font-mono text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#FF6321]" />
                        {country}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase">Licensed Hub</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TRUST VERIFICATION */}
          {activeTab === 'compliance' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wide border-b border-slate-850 pb-2 text-slate-400">Trust & Risk Auditing Guidelines</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="text-[9px] text-slate-500 block uppercase font-mono mb-1">COMPLIANCE RISK COEFFICIENT</span>
                  <strong className="text-[#FF6321] text-base font-mono">{supplier.supplierRiskScore}% Risk Rating</strong>
                  <p className="text-[10.5px] text-slate-500 leading-snug mt-1.5">
                    Pre-evaluated against non-performance lists across East African registries.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
                  <span className="text-[9px] text-slate-500 block uppercase font-mono mb-1">ASSOCIATED PARTNER NETWORK</span>
                  <strong className="text-slate-100 text-sm font-mono">{supplier.partnershipNetworkCount} Registered Nodes</strong>
                  <p className="text-[10.5px] text-slate-500 leading-snug mt-1.5">
                    Allows for rapid subcontracting and consortium integrations.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-900 p-4 rounded-xl flex gap-3 text-xs leading-normal text-indigo-300 font-mono">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                <p>
                  This partner has a verified joint-venture compliance clearing certificate. Under corporate governance policies, they are qualified to receive instant escrow invitations matching major procurement tenders.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
