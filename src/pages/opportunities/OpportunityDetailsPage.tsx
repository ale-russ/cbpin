import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore, authStore } from '../../store/auth/auth.store';
import { mockOpportunities } from '../../data/mockOpportunities';
import { 
  ArrowLeft, MapPin, Building, Calendar, DollarSign, Award, 
  CheckCircle2, AlertTriangle, HelpCircle, Shield, FileText, Bot, 
  Workflow, Sliders, Play, Settings, Download, Globe, Star
} from 'lucide-react';
import { motion } from 'motion/react';

export default function OpportunityDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activeRole = useAuthStore((s) => s.activeRole);
  const savedOpportunities = useAuthStore((s) => s.savedOpportunities);
  const toggleSaveOpportunity = authStore.toggleSaveOpportunity;

  const activeOpt = useMemo(() => {
    return mockOpportunities.find((o) => o.id === id);
  }, [id]);

  // Local switch tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'requirements' | 'intelligence' | 'activity'>('overview');

  // Simulator controls
  const [userBidDiscount, setUserBidDiscount] = useState<number>(-2.5);
  const [userLocalContent, setUserLocalContent] = useState<boolean>(true);
  const [userCarbonEfficiency, setUserCarbonEfficiency] = useState<boolean>(true);
  const [userSmeRecruited, setUserSmeRecruited] = useState<boolean>(false);

  // Escrow booking modal demo simulation state
  const [showPayPerLeadModal, setShowPayPerLeadModal] = useState<boolean>(false);
  const [showAdvisoryBookingModal, setShowAdvisoryBookingModal] = useState<boolean>(false);
  const [isAdvisoryBooked, setIsAdvisoryBooked] = useState<boolean>(false);
  const [isEscrowRunning, setIsEscrowRunning] = useState<boolean>(false);

  // Custom Dossier Generation Config
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [dossierTemplate, setDossierTemplate] = useState<string>("Standard Strategic Overview");
  const [successBadgeMsg, setSuccessBadgeMsg] = useState<string | null>(null);

  if (!activeOpt) {
    return (
      <div className="min-h-[480px] flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-10 w-10 text-rose-500 mx-auto animate-bounce" />
          <h2 className="text-xl font-bold text-slate-100 font-mono">Opp Node Out of Sync</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            The opportunity ID "{id}" was not resolved in our indexed databases. It could be due to permission level constraints.
          </p>
          <button 
            onClick={() => navigate('/opportunities')}
            className="px-4 py-2 bg-slate-950 border border-slate-800 hover:text-[#FF6321] text-slate-300 text-xs font-mono rounded"
          >
            ← Back to Index Explorer
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedOpportunities.includes(activeOpt.id);

  // Calculate simulated win probability
  const simulatedWinChance = useMemo(() => {
    let prob = activeOpt.winProbability;
    
    // Premium tuning additions ----------------------
    const discountImp = -1.2 * userBidDiscount; // Giving a discount increases probability
    prob += discountImp;

    if (userLocalContent) prob += 4.5;
    if (userCarbonEfficiency) prob += 2.0;
    if (userSmeRecruited) prob += 5.0;

    return Math.min(Math.max(Math.round(prob), 5), 98);
  }, [activeOpt, userBidDiscount, userLocalContent, userCarbonEfficiency, userSmeRecruited]);

  const getBannerColor = (action: string) => {
    switch (action) {
      case 'Pursue Immediately': return 'bg-emerald-950/40 border-emerald-500/60 text-emerald-400';
      case 'Form Consortium': return 'bg-amber-950/40 border-amber-500/60 text-amber-400';
      case 'Review Further': return 'bg-slate-950/60 border-slate-800 text-slate-350';
      default: return 'bg-rose-950/40 border-rose-500/60 text-rose-400';
    }
  };

  const tabsList = [
    { id: 'overview' as const, label: 'Overview', desc: 'Financial Indexes & Score' },
    { id: 'documents' as const, label: 'Documents', desc: 'Required certifications & bonds' },
    { id: 'requirements' as const, label: 'Requirements', desc: 'Subcontracting alignment' },
    { id: 'intelligence' as const, label: 'Intelligence', desc: 'AI SWOT analysis & rivals' },
    { id: 'activity' as const, label: 'Activity', desc: 'Bid simulations & partner escrow' }
  ];

  const triggerDownloadDossier = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSuccessBadgeMsg(`Generated Strategic Dossier: "${dossierTemplate}" for tender ID: ${activeOpt.id}`);
      
      const fileContent = `
================================================================================
CPIN PRE-BID DECISION SUITE // ENHANCED STRATEGIC INTELLIGENCE INTERFACE
TENDER ID: ${activeOpt.id} // SECURED BLOCKCHAIN VALUE AUDITED
GENERATED: ${new Date().toISOString()}
================================================================================

PROJECT HEADLINES:
- Title: ${activeOpt.title}
- Procurer: ${activeOpt.buyer} [${activeOpt.buyerType} Agency]
- Territorial Focus: ${activeOpt.country.toUpperCase()}
- Primary Sector: ${activeOpt.sector}
- Macro Budget Target: $${activeOpt.budgetUSD.toLocaleString()} USD
- Recommended Action Pathway: ${activeOpt.recommendedAction}

Decision Index Evaluations:
- Base Win Probability: ${activeOpt.winProbability}%
- Tuned Simulated win Chance: ${simulatedWinChance}%
- Capability Match Score: ${activeOpt.supplierMatchScore}%
- Complexity Rating index: ${activeOpt.complexityScore}%
- Sovereign Supply Risk Assessment: ${activeOpt.riskScore}%

SUGGESTED ALIGNMENT ROADMAP:
- Recommended Strategy Strategy: ${activeOpt.recommendedStrategy}
- Estimated Competitor Density count: ~${activeOpt.estCompetitorsCount} Active rivals
- Suggested Joint-Venture Setup:
  Fulfill local content policy gaps by partnering with local certified subcontractors within ${activeOpt.country}.
  
- Required certificates compliance:
  ${activeOpt.requiredDocuments.join(', ')}

================================================================================
CPIN CONFIDENTIAL COGNITIVE INTEL // AUDITED SECURE ARCHIVE
================================================================================
`;
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `CPIN_Intel_Report_${activeOpt.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setSuccessBadgeMsg(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header details toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/opportunities')}
            className="p-2 cursor-pointer bg-slate-950 border border-slate-800 hover:text-[#FF6321] transition rounded-lg text-slate-400"
            title="Back to Opportunities Explorer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#FF6321] font-bold uppercase">{activeOpt.id} TENDER DOSSIER</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-400" /> {activeOpt.country}
              </span>
            </div>
            <h1 className="text-base font-bold text-slate-100 mt-0.5 line-clamp-1">{activeOpt.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:self-center self-end">
          <button
            onClick={() => toggleSaveOpportunity(activeOpt.id)}
            className={`px-3 py-1.5 border rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isSaved 
                ? 'bg-amber-950/20 border-amber-800 text-amber-500' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-[#FF6321]'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
            {isSaved ? 'SAVED TO LEDGER' : 'SAVE TO LEDGER'}
          </button>

          <div className={`px-4 py-1.5 text-center rounded-lg border text-xs font-bold leading-tight uppercase tracking-wide min-w-[150px] ${getBannerColor(activeOpt.recommendedAction)}`}>
            {activeOpt.recommendedAction === 'Pursue Immediately' ? '🎯 PURSUE IMMEDIATELY' :
             activeOpt.recommendedAction === 'Form Consortium' ? '🤝 FORM CONSORTIUM' :
             activeOpt.recommendedAction === 'Review Further' ? '🔍 REVIEW FURTHER' : 'Avoid'}
          </div>
        </div>
      </div>

      {successBadgeMsg && (
        <div className="p-3.5 bg-emerald-950/30 border border-emerald-900 rounded-xl text-xs font-mono text-emerald-400 leading-snug">
          ✔ {successBadgeMsg}
        </div>
      )}

      {/* Grid structure: Left navigation tabs, Right active context panels */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Context tab switcher board */}
        <div className="lg:col-span-1 bg-slate-950 border border-slate-850 p-3 h-fit rounded-xl space-y-2">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block px-1.5 py-1">ENTITY CONTROL PANELS</span>
          
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {tabsList.map((t) => {
              const isCurrent = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full text-left p-2.5 rounded-lg flex flex-col transition cursor-pointer min-w-[130px] ${
                    isCurrent 
                      ? 'bg-[#111] border border-slate-800 text-[#FF6321] font-bold shadow-sm' 
                      : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs">{t.label}</span>
                  <span className={`text-[9px] font-mono leading-tight ${isCurrent ? 'text-slate-400' : 'text-slate-500'}`}>{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Tab Content body */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Core stat gauges summary */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
                
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">WIN PROBABILITY</span>
                  <div className="my-1.5 flex flex-col">
                    <span className="text-2xl font-black text-emerald-400 font-mono">{activeOpt.winProbability}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-emerald-400 h-full" style={{ width: `${activeOpt.winProbability}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">Base bid footprint index</span>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">SME MATCHING</span>
                  <div className="my-1.5 flex flex-col">
                    <span className="text-2xl font-bold font-mono text-slate-100">{activeOpt.supplierMatchScore}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-indigo-500 h-full" style={{ width: `${activeOpt.supplierMatchScore}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">Technical index sync</span>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">COMPETITION SLOTS</span>
                  <div className="my-1.5 flex flex-col">
                    <span className="text-2xl font-bold font-mono text-amber-400">{activeOpt.competitionScore}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-amber-400 h-full" style={{ width: `${activeOpt.competitionScore}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">Reverse rivalry rating</span>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">COMPLEXITY EXP</span>
                  <div className="my-1.5 flex flex-col">
                    <span className="text-2xl font-bold font-mono text-purple-400">{activeOpt.complexityScore}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                     <div className="bg-purple-500 h-full" style={{ width: `${activeOpt.complexityScore}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">Regulatory hurdle coefficient</span>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">SOVEREIGN RISK</span>
                  <div className="my-1.5 flex flex-col">
                    <span className={`text-2xl font-bold font-mono ${activeOpt.riskScore > 40 ? 'text-red-400' : 'text-emerald-400'}`}>{activeOpt.riskScore}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className={`h-full ${activeOpt.riskScore > 40 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${activeOpt.riskScore}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">Corridor logistical risk</span>
                </div>

              </div>

              {/* General Tender dossier briefs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wide border-b border-slate-850 pb-2">
                    <Building className="h-4 w-4 text-[#FF6321]" />
                    <span>Procurement Overview</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                    <p>{activeOpt.description}</p>
                    <div className="text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono text-slate-400">
                      🏢 <strong>Procuring Entity:</strong> {activeOpt.buyer} ({activeOpt.buyerType})<br />
                      📅 <strong>Release Date:</strong> {activeOpt.publishDate} // ⏳ <strong>Submission Deadline:</strong> {activeOpt.deadline}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 h-fit">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wide border-b border-slate-850 pb-2">
                    <DollarSign className="h-4 w-4 text-[#FF6321]" />
                    <span>Valuation parameters</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono">MACRO VALUE CODE</span>
                      <p className="text-2xl font-black text-emerald-400 font-mono">${activeOpt.budgetUSD.toLocaleString()} USD</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono">EST WINNING BID MATRIX (90-98%)</span>
                      <p className="text-sm font-bold text-slate-100 font-mono">
                        ${activeOpt.estWinningBidRangeUSD?.min?.toLocaleString()} - ${(activeOpt.estWinningBidRangeUSD?.max / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono">LOCAL CONTENT INTEGRITY TARGET</span>
                      <p className="text-xs font-bold font-mono text-slate-300">{activeOpt.localContentRequirementPercent}% Domestic Value</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
              <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase font-mono">Compliance Documentation Desk</h3>
                  <span className="text-[10.5px] text-slate-500 block">Sovereign PPDA/PPRA regulatory certificate checkpoints</span>
                </div>
                <Shield className="h-5 w-5 text-[#FF6321] animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-xs text-slate-400 font-semibold block uppercase font-mono text-emerald-400">🛡 Required Certs</span>
                  <div className="flex flex-col gap-2">
                    {activeOpt.requiredDocuments?.map((doc, idx) => (
                      <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-xs text-slate-300 flex items-center gap-2 font-mono">
                        <span className="text-emerald-400">✔</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs text-slate-400 font-semibold block uppercase font-mono text-rose-400">🚨 Gap assessment</span>
                  {activeOpt.missingRequirements?.length > 0 ? (
                    <div className="bg-rose-950/20 border border-rose-900 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block font-mono">⚠️ Out of Compliance Alignment</span>
                      <p className="text-xs text-slate-300 leading-normal">
                        Your corporate profile currently lacks the following required regional tender prerequisites:
                      </p>
                      <ul className="text-xs text-red-400 space-y-1 font-mono list-disc list-inside">
                        {activeOpt.missingRequirements.map((d, index) => (
                          <li key={index}>{d}</li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-slate-450 leading-relaxed italic">
                        Tip: You are strongly advised to secure subcontractors holding these certificates under a joint-venture consortium framework.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-950/20 border border-emerald-950 p-4 rounded-xl flex gap-3 text-xs text-emerald-400 leading-relaxed font-mono">
                      <span>✔</span>
                      <span>Perfect compliance match! All credential checklists align with your pre-loaded ISO profile.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REQUIREMENTS TAB */}
          {activeTab === 'requirements' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
              <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase font-mono">Subcontracting & Technical Requirements</h3>
                  <span className="text-[10.5px] text-slate-500 block">Experience criteria and matching local operators</span>
                </div>
                <Workflow className="h-5 w-5 text-indigo-400" />
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col md:flex-row justify-between gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 uppercase text-[9px] block">MINIMUM HISTORIC PERFORMANCE DEPTH</span>
                    <strong className="text-white text-sm">{activeOpt.experienceRequiredYears} Years</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[9px] block">LOCAL DOMESTIC VALUE QUOTA</span>
                    <strong className="text-white text-sm">{activeOpt.localContentRequirementPercent}% Local sourcing</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[9px] block">LICENSED AGENT CONTACT POINT</span>
                    <strong className="text-slate-300 text-xs block mt-0.5">{activeOpt.contactEmail}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs text-slate-300 font-bold uppercase font-mono">JV Escrow Partnership Strategy</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Under standard cross-border bidding covenants, foreign prime contractors can circumvent typical 15% technical discount penalties on local content rules by routing sub-contracts through our validated escrow frameworks.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our platform syncs directly with private B2B chambers of commerce in <strong>{activeOpt.country}</strong> to find vetted contractors with identical ISO classifications.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* INTELLIGENCE TAB */}
          {activeTab === 'intelligence' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
              <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase font-mono">Gemini AI SWOT Intelligence Docket</h3>
                  <span className="text-[10.5px] text-slate-500 block">Deductive algorithmic assessments of competition density</span>
                </div>
                <Bot className="h-5 w-5 text-purple-400 animate-pulse" />
              </div>

              {/* Competitive insights row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-850 space-y-1 font-mono">
                  <span className="text-[9px] text-[#FF6321] font-bold block">COMPETING DENSITY</span>
                  <span className="text-lg font-bold text-slate-100 italic">~{activeOpt.estCompetitorsCount ?? 0} Active Rivals</span>
                  <p className="text-[9.5px] text-slate-400 mt-1 leading-snug">Identified in sovereign pipeline trackers</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-850 space-y-1 font-mono">
                  <span className="text-[9px] text-[#FF6321] font-bold block">LIKELY INCUMBENT STATE</span>
                  <span className="text-xs font-bold text-slate-100 block truncate mt-1 text-[#FF6321]">{activeOpt.likelyIncumbentVendors?.[0] || 'None Mapped'}</span>
                  <p className="text-[9.5px] text-slate-400 mt-1 leading-snug">Historical contract receipts tracking</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-850 space-y-1 font-mono">
                  <span className="text-[9px] text-[#FF6321] font-bold block">SOVEREIGN AUDITING RISK LEVEL</span>
                  <span className="text-lg font-bold text-slate-100">{activeOpt.riskScore > 50 ? '🚨 HIGH WATCH' : '✔ SYSTEM STABLE'}</span>
                  <p className="text-[9.5px] text-slate-400 mt-1 leading-snug">Custom border clearance wait lists</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono flex items-center gap-1">✔ SWOT Key Strengths</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeOpt.aiStrengths?.map((s, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-normal">
                        <span className="text-emerald-400 mt-0.5">✔</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-rose-450 uppercase font-mono flex items-center gap-1">✖ SWOT Threat Exposures</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeOpt.aiRisks?.map((r, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-normal">
                        <span className="text-rose-400 mt-0.5">✖</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Strategy guidance row */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-2 text-xs">
                <span className="text-[#00ff00] font-mono text-[9px] block uppercase font-bold tracking-widest">TACTICAL BID RECOMMENDATION PATHWAY</span>
                <p className="text-slate-300 leading-relaxed">{activeOpt.recommendedStrategy}</p>
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              
              {/* Interactive Bid Solver */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-5">
                <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 uppercase font-mono">Tender Price Simulator & Compliance Optimization</h3>
                    <p className="text-[10px] text-slate-500">Tune discount values and check impact on Win Probability</p>
                  </div>
                  <Sliders className="h-4.5 w-4.5 text-[#FF6321]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left side parameters sliders */}
                  <div className="space-y-4 text-xs font-mono">
                    <div className="space-y-1.5Packed">
                      <div className="flex justify-between">
                        <span className="text-slate-400 block">PROPOSED DISCOUNT INTENSITY:</span>
                        <strong className="text-emerald-400">{userBidDiscount}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min="-15" 
                        max="15" 
                        step="0.5" 
                        value={userBidDiscount} 
                        onChange={(e) => setUserBidDiscount(parseFloat(e.target.value))}
                        className="w-full accent-[#FF6321] cursor-pointer"
                      />
                      <span className="text-[9.5px] text-slate-500 block">Relative to base tender estimate of ${activeOpt.budgetUSD.toLocaleString()}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-slate-400 block uppercase text-[10px]">Strategic Compliance Boosts</span>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={userLocalContent}
                            onChange={(e) => setUserLocalContent(e.target.checked)}
                            className="rounded accent-[#FF6321]"
                          />
                          <span>Sovereign local content partnership checklist (+4.5%)</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={userCarbonEfficiency}
                            onChange={(e) => setUserCarbonEfficiency(e.target.checked)}
                            className="rounded accent-[#FF6321]"
                          />
                          <span>Verified low carbon supply logistics (+2.0%)</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={userSmeRecruited}
                            onChange={(e) => setUserSmeRecruited(e.target.checked)}
                            className="rounded accent-[#FF6321]"
                          />
                          <span>Certified regional SME subcontracts recruited (+5.0%)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right side simulation visual metrics gauge */}
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between font-mono">
                    <div>
                      <span className="text-[9.5px] text-slate-400 block border-b border-slate-900 pb-1 uppercase tracking-wide">COMPOSITE LIVE METRICS PANEL</span>
                      <div className="mt-3 space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">SIMULATED OFFER PRICE:</span>
                          <strong className="text-white">${(activeOpt.budgetUSD * (1 + userBidDiscount / 100)).toLocaleString(undefined, {maximumFractionDigits: 0})} USD</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-550">PREDICTED COMPLIANCE MARGIN:</span>
                          <strong className="text-indigo-400">AA+ Standard</strong>
                        </div>
                        <div className="flex justify-between border-t border-slate-900 pt-2 text-xs">
                          <span className="text-slate-400">WIN CHANCE INDEX:</span>
                          <strong className="text-emerald-400 text-sm">
                            {simulatedWinChance}% 
                            <span className="text-[10px] scale-90 ml-1">
                              ({simulatedWinChance > activeOpt.winProbability ? '▲' : '▼'}{Math.abs(simulatedWinChance - activeOpt.winProbability)}%)
                            </span>
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-slate-905 h-2 rounded-full overflow-hidden mt-3 bg-slate-900/40">
                      <div className="bg-[#00FF00] h-full" style={{ width: `${simulatedWinChance}%` }}></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* JV Escrow dispatch triggers and Reports Generation console */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Reports Exporter configuration panel */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-100 uppercase font-mono">Cognitive pre-bid dossier generator</h3>
                    <p className="text-[10.5px] text-slate-400 leading-normal">
                      Export full sovereign evaluation, SWOT matrixes, bid regressions, and required draft memory checks directly into local storage.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="space-y-1.5">
                      <span className="text-slate-550 block text-[9.5px] uppercase">DOSSIER LAYOUT CONFIG:</span>
                      <select 
                        value={dossierTemplate} 
                        onChange={(e) => setDossierTemplate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded w-full cursor-pointer focus:outline-none focus:border-[#FF6321]"
                      >
                        <option value="Standard Strategic Overview">Standard Strategic Overview Report</option>
                        <option value="Deep SWOT Competitor Index">Deep SWOT Competitor Index Report</option>
                        <option value="Sovereign Regulatory Auditing Checkbook">Sovereign Regulatory Auditing Guidelines</option>
                      </select>
                    </div>

                    <button 
                      onClick={triggerDownloadDossier}
                      disabled={isSynthesizing}
                      className="w-full py-2.5 cursor-pointer bg-slate-950 hover:bg-[#FF6321] hover:text-black hover:border-transparent text-slate-300 font-extrabold text-xs rounded-lg transition uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-800 shadow-sm"
                    >
                      {isSynthesizing ? (
                        <>
                          <Settings className="h-4 w-4 animate-spin" />
                          <span>SYNTHESIZING SECURED PARSER...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>GENERATE INTEL DOSSIER PDF/TXT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Partners Escrow Setup dispatcher */}
                <div className="bg-slate-900 border border-[#402d18] p-5 rounded-2xl flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9E00]/5 rounded-bl-full pointer-events-none"></div>
                  
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF9E00] block">⚡ PARTNERSHIPS INSTANT MATCHMAKER</span>
                    <h3 className="text-xs font-bold text-slate-100 uppercase font-mono">B2B Escrow Partner Procurement</h3>
                    <p className="text-[10.5px] text-slate-400 leading-normal">
                      Initiate automated dispatch scanning to identify licensed subcontractors inside <strong>{activeOpt.country}</strong> matching the required tender certs.
                    </p>
                  </div>

                  {isEscrowRunning ? (
                    <div className="bg-[#402d18]/25 p-3.5 border border-[#FF9E00]/40 rounded-xl space-y-2 font-mono text-[10.5px] leading-relaxed text-slate-300">
                      <span className="text-emerald-400 font-bold block">✔ AUTOMATED ESCROW DISPATCH RUNNING</span>
                      <p>
                        Scanning <strong>14 licensed operators</strong> in {activeOpt.country} matching checklist requirements. Matches will request secure NDAs within 24 hours.
                      </p>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-[9px] text-slate-400 mt-1">
                        CPIN Node ID: <strong>JV-ESCROW-{Date.now().toString().slice(6)}</strong>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEscrowRunning(true)}
                      className="w-full py-2.5 cursor-pointer bg-[#FF9E00] hover:bg-[#ffb233] text-black font-extrabold text-xs rounded-lg transition uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(255,158,0,0.25)]"
                    >
                      <Globe className="h-4 w-4 text-black" />
                      <span>FIND SECURED JV SUBCONTRACTORS NOW</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
