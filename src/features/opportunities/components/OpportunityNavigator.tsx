import { useState, useEffect, useMemo } from 'react';
import { systemStateInstance, performElasticSearch } from '../../../data/sampleDataset';
import { Opportunity } from '../../../shared/types';
import { 
  MapPin, DollarSign, Calendar, Eye, ShieldAlert, BadgeInfo, CheckCircle, 
  Scale, Users, TrendingUp, AlertTriangle, ShieldCheck, Search, SlidersHorizontal, 
  Bookmark, Bell, Sparkles, HelpCircle, Laptop, Landmark, Clock, Check, Trash
} from 'lucide-react';

interface OpportunityNavigatorProps {
  initialTargetOpportunity?: Opportunity | null;
  activeRole?: string;
  savedOpportunities?: string[];
  onToggleSaveOpportunity?: (id: string) => void;
}

export default function OpportunityNavigator({ 
  initialTargetOpportunity, 
  activeRole = "SME User", // default fallbacks
  savedOpportunities = [],
  onToggleSaveOpportunity = () => {}
}: OpportunityNavigatorProps) {
  
  // Search state query controls
  const [queryString, setQueryString] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [valueBracket, setValueBracket] = useState<string>("All");
  const [probThreshold, setProbThreshold] = useState<string>("All");

  // Advanced Boolean Query state controls
  const [showBooleanBuilder, setShowBooleanBuilder] = useState<boolean>(false);
  const [boolAnd, setBoolAnd] = useState<string>("");
  const [boolOr, setBoolOr] = useState<string>("");
  const [boolNot, setBoolNot] = useState<string>("");

  // Interactive Bidding Regression & Estimator controls (Palantir/Bloomberg Style)
  const [userBidDiscount, setUserBidDiscount] = useState<number>(-5); // % change vs budget
  const [userLocalContent, setUserLocalContent] = useState<number>(40); // Local content %
  const [userCarbonEfficiency, setUserCarbonEfficiency] = useState<boolean>(true);
  const [userSmeRecruited, setUserSmeRecruited] = useState<boolean>(false);

  // Custom Dossier PDF/Text Template Exporter configuration states
  const [isSynthesizingDossier, setIsSynthesizingDossier] = useState<boolean>(false);
  const [dossierTemplate, setDossierTemplate] = useState<string>("Standard Overview Dossier");
  const [dossierSections, setDossierSections] = useState({
    pricingRegression: true,
    capabilityMetrics: true,
    riskHeatmap: true,
    historicalWinners: true,
  });

  // Pay-per-lead Premium and Advisory lock overlays
  const [showPayPerLeadModal, setShowPayPerLeadModal] = useState<boolean>(false);
  const [showAdvisoryBookingModal, setShowAdvisoryBookingModal] = useState<boolean>(false);
  const [isAdvisoryBooked, setIsAdvisoryBooked] = useState<boolean>(false);

  // Search execution metrics outputs
  const [speedMs, setSpeedMs] = useState<number>(0.35);
  const [totalFound, setTotalFound] = useState<number>(0);
  const [typoTriggered, setTypoTriggered] = useState<boolean>(false);
  const [correctedQuery, setCorrectedQuery] = useState<string>("");

  // Results cache state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeOpt, setActiveOpt] = useState<Opportunity | null>(null);

  // Saved searches lists state
  const [savedQueries, setSavedQueries] = useState<any[]>([
    { id: "S-1", name: "Roadbeds Construction", query: "roadbeds", country: "All", sector: "Infrastructure & Transport" },
    { id: "S-2", name: "USAID Maize Relief Tanzania", query: "maize", country: "Tanzania", sector: "Agriculture & Relief Deliveries" }
  ]);
  const [isSavingSearch, setIsSavingSearch] = useState<boolean>(false);
  const [customSearchName, setCustomSearchName] = useState<string>("");
  const [alertFrequency, setAlertFrequency] = useState<string>("Daily");
  const [newSearchAlertMsg, setNewSearchAlertMsg] = useState<string | null>(null);

  // Suggestions row
  const suggestions = ["Kenyas roadbed infrastructure", "Humanitarian maize mills", "Kampala heavy transport", "unicef water storage"];

  // Run initial query on boot
  useEffect(() => {
    executeQueries();
  }, [queryString, selectedCountry, selectedSector, valueBracket, probThreshold]);

  // Handle drill down selection synchronization
  useEffect(() => {
    if (initialTargetOpportunity) {
      setActiveOpt(initialTargetOpportunity);
    }
  }, [initialTargetOpportunity]);

  const executeQueries = () => {
    const filters: any = {};
    if (selectedCountry !== "All") filters.country = selectedCountry;
    if (selectedSector !== "All") filters.sector = selectedSector;
    
    // Evaluate value bracket filter
    if (valueBracket !== "All") {
      if (valueBracket === "Under $1M") filters.maxBudget = 1000000;
      else if (valueBracket === "$1M - $5M") {
        filters.minBudget = 1000000;
        filters.maxBudget = 5000000;
      } else {
        filters.minBudget = 5000000;
      }
    }

    const response = performElasticSearch(queryString, filters);
    setSpeedMs(response.speedMs);
    setTotalFound(response.totalFound);
    setTypoTriggered(response.levenshteinTriggered);
    setCorrectedQuery(response.correctedQuery || "");

    // Unpack search results
    const parsed = response.results.map((r: any) => r.item);
    setSearchResults(parsed);

    if (parsed.length > 0) {
      // Keep matching selection or fallback to first
      if (!activeOpt || !parsed.some(o => o.id === activeOpt.id)) {
        setActiveOpt(parsed[0]);
      }
    } else {
      setActiveOpt(null);
    }
  };

  // Saved Searches Creation
  const handleSaveSearch = (e: any) => {
    e.preventDefault();
    if (!customSearchName.trim()) return;

    const newQuery = {
      id: `S-${Date.now()}`,
      name: customSearchName,
      query: queryString,
      country: selectedCountry,
      sector: selectedSector
    };

    setSavedQueries([...savedQueries, newQuery]);
    setCustomSearchName("");
    setIsSavingSearch(false);

    // Logs the save search activity audit
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Sarah Alubas",
      role: activeRole,
      action: `Created saved search criteria: "${customSearchName}" with ${alertFrequency} alerts frequency`,
      status: "SUCCESS",
      ipAddress: "197.239.4.12",
      region: "Uganda Territory"
    });

    setNewSearchAlertMsg(`✔ SEARCH CRITERIA CONGIGURED & "${alertFrequency.toUpperCase()}" PUSH ALERTS ENABLED`);
    setTimeout(() => setNewSearchAlertMsg(null), 3500);
  };

  const handleApplySavedQuery = (sq: any) => {
    setQueryString(sq.query);
    setSelectedCountry(sq.country);
    setSelectedSector(sq.sector);
  };

  const handleRemoveSavedQuery = (id: string) => {
    setSavedQueries(savedQueries.filter(q => q.id !== id));
  };

  // Advanced boolean expression parsing and injection
  const handleApplyBoolean = () => {
    let q = "";
    if (boolAnd.trim()) q += `+"${boolAnd.trim()}" `;
    if (boolOr.trim()) {
      const splitOr = boolOr.split(',').map(s => `"${s.trim()}"`).join(' | ');
      q += `(${splitOr}) `;
    }
    if (boolNot.trim()) q += `-"${boolNot.trim()}"`;
    
    setQueryString(q.trim());
    setShowBooleanBuilder(false);
  };

  // Real-time calculated regression probability (Bloomberg/Palantir Style)
  const simulatedWinChance = useMemo(() => {
    if (!activeOpt) return 0;
    let prob = activeOpt.winProbability;
    
    // Bid discount impacts (optimum is -5% to -15%)
    if (userBidDiscount > -5) {
      prob -= (5 - Math.abs(userBidDiscount)) * 2.5; 
    } else if (userBidDiscount <= -5 && userBidDiscount >= -15) {
      prob += Math.abs(userBidDiscount + 5) * 1.2;
    } else {
      prob -= Math.abs(userBidDiscount + 15) * 1.4;
    }

    // Local content impact
    if (userLocalContent > 30) {
      prob += (userLocalContent - 30) * 0.3;
    } else {
      prob -= (30 - userLocalContent) * 0.5;
    }

    // Carbon ESG standard compliance impact
    if (userCarbonEfficiency) prob += 6;
    else prob -= 5;

    // SME partner recruited multiplier
    if (userSmeRecruited) prob += 11;

    return Math.min(Math.max(Math.round(prob), 5), 98);
  }, [activeOpt, userBidDiscount, userLocalContent, userCarbonEfficiency, userSmeRecruited]);

  const [generationProgress, setGenerationProgress] = useState<number | null>(null);

  const handleSynthesizeDossier = () => {
    if (!activeOpt) return;
    setIsSynthesizingDossier(true);
    setGenerationProgress(10);
    
    // Animate sleek intelligence compilation process
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            triggerDossierDownload();
          }, 300);
          return null;
        }
        return prev + 30;
      });
    }, 300);
  };

  const triggerDossierDownload = () => {
    if (!activeOpt) return;
    const calculatedPrice = activeOpt.budgetUSD * (1 + userBidDiscount / 100);
    
    const dossierText = `
========================================================================
 CROSS-BORDER PROCUREMENT INTELLIGENCE NETWORK (CPIN) ENTERPRISE
     STRATEGIC BRIEFING & PREDICTIVE DECISION OUTLOOK REPORT
========================================================================
Report Class: ${dossierTemplate.toUpperCase()}
Generated on: ${new Date().toLocaleString()} UTC
Operational Role: ${activeRole}
Territory Focus: ${activeOpt.country.toUpperCase()}
Sector: ${activeOpt.sector}

I. METRIC ANALYSIS SUMMARY
------------------------------------------------------------------------
Opportunity Target ID: ${activeOpt.id}
Tender Name: ${activeOpt.title}
Procuring Agency: ${activeOpt.buyer}
Primary Location: ${activeOpt.location}

Macro Budget Base Line: $${activeOpt.budgetUSD.toLocaleString()} USD
Tactical Recommended pursuit: ${activeOpt.recommendedAction}
Original Base Win Probability: ${activeOpt.winProbability}%
Original SME Capability Match: ${activeOpt.supplierMatchScore}%

II. SIMULATED REGRESSION INDEX OUTLOOK (Palantir Sandbox Model v4.1)
------------------------------------------------------------------------
User Sandbox Settings Applied:
- Selected Bid Pricing Target: $${calculatedPrice.toLocaleString()} USD (${userBidDiscount}% variance vs budget)
- Corporate Local Content Share: ${userLocalContent}% Joint Venture split ratio
- Green carbon emission index: ${userCarbonEfficiency ? 'YES (Verified)' : 'NO (Deficit)'}
- Local SME certification integration: ${userSmeRecruited ? 'YES (Aligned)' : 'NO (Unsecured)'}

👉 PREDICTIVE REFORMULATED WIN PROBABILITY: ${simulatedWinChance}%
👉 RECOMMENDED STANDING: ${
      simulatedWinChance > 75 ? 'Highly Competitive (Optimal Target Nodes)' :
      simulatedWinChance > 55 ? 'Viable Option (Consortium Advised)' :
      'Severe Strategy Risks (Limit bidding capital exposure)'
    }

III. CRITICAL ECO-SYSTEM RISK MATRIX SCREENING
------------------------------------------------------------------------
1. Sovereign Customs Clearances Wait times: ${activeOpt.riskScore > 55 ? '🚨 HIGH HAZARD' : '✔ NORMAL'}
2. Regional Land Transport Logistics Flow: ${activeOpt.riskScore > 35 ? '⚠️ MODERATE DELAY RISK' : '✔ NORMAL'}
3. Local Content Policy Compliance gaps: ${userLocalContent < 40 ? '⚠️ SHORTFALL WARNING (Min 40% demanded)' : '✔ FULLY COMPLIANT'}
4. Compliance Prerequisite Certificates needed: ${activeOpt.requiredDocuments.join(', ')}

IV. EXECUTABLE STRATEGIC DECISION PLAYBOOK DIRECTIVES
------------------------------------------------------------------------
1. Recommended Action Pathway: ${activeOpt.recommendedStrategy}
2. Subcontracting Joint Venture checklist: Make sure to recruit a qualified regional partner with local content coverage.
3. Pricing advice: Bid around $${Math.round(calculatedPrice).toLocaleString()} to balance profit margin with bid award chance.

------------------------------------------------------------------------
  CONFIDENTIAL - ACCESS SECURED UNDER CPIN ENTERPRISE LICENSE
  SLA Tracking Code: SLA-UA-9932-EAC-2026. Audit record committed.
========================================================================
    `;

    const blob = new Blob([dossierText.trim()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CPIN_Strategic_Dossier_${activeOpt.id}_${Date.now()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSynthesizingDossier(false);

    // Audit Log Entry
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Sarah Alubas",
      role: activeRole,
      action: `Synthesized & downloaded Custom Intelligence Dossier for Tender: "${activeOpt.id}" using template: "${dossierTemplate}"`,
      status: "SUCCESS",
      ipAddress: "197.239.4.12",
      region: "Uganda Territory"
    });
  };

  // Real-time complete CSV file exporter based on standard JS Blobs
  const downloadCSVResults = () => {
    if (searchResults.length === 0) return;
    const headers = ["ID", "Tender Title", "Procurement Agency", "Location Territory", "Sector Specialty", "Budget USD", "Win Probability Chance %", "Publish Date", "Submission Deadline"];
    const rows = searchResults.map(opt => [
      opt.id,
      `"${opt.title.replace(/"/g, '""')}"`,
      `"${opt.buyer.replace(/"/g, '""')}"`,
      opt.country,
      opt.sector,
      opt.budgetUSD,
      opt.winProbability,
      opt.publishDate,
      opt.deadline
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CPIN_Search_Results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Dynamic Enterprise Audit Log registration
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Sarah Alubas",
      role: activeRole,
      action: `Exported active search metrics result sheet to local CSV format containing ${searchResults.length} entries matching: "${queryString || 'All Entries'}"`,
      status: "SUCCESS",
      ipAddress: "197.239.4.12",
      region: "Uganda Territory"
    });
  };

  // Color helper based on recommended action
  const getBannerColor = (action: string) => {
    switch (action) {
      case 'Pursue Immediately': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Form Consortium': return 'bg-amber-500/10 border-amber-500/30 text-[#FF9E00]';
      case 'Review Further': return 'bg-sky-500/10 border-sky-500/30 text-sky-400';
      default: return 'bg-red-500/10 border-red-500/30 text-red-400';
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-200">
      
      {/* Alert badge popup on new alerts */}
      {newSearchAlertMsg && (
        <div className="bg-[#140d08] border border-[#ff6321] text-[#ff6321] p-3 text-xs font-mono rounded-lg flex justify-between items-center text-[11px] animate-bounce">
          <span>{newSearchAlertMsg}</span>
          <span className="text-slate-500 text-[10px]">Active</span>
        </div>
      )}

      {/* Main elastic query center row */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        
        {/* Search Input bar */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
            <input
              type="text"
              value={queryString}
              onChange={(e) => setQueryString(e.target.value)}
              placeholder="Search tenders, keywords, agencies, scopes... (e.g. roadbed, solar, maize)"
              className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-2.5 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-[#FF6321] placeholder-slate-650"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBooleanBuilder(!showBooleanBuilder)}
              className={`px-3 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                showBooleanBuilder 
                  ? 'bg-[#FF6321]/10 text-[#FF6321] border-[#FF6321]' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Toggle Advanced Boolean Logic Builder"
            >
              <SlidersHorizontal className="h-4 w-4" /> Boolean Builder
            </button>
            <button
              onClick={downloadCSVResults}
              disabled={searchResults.length === 0}
              className="px-3 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 disabled:opacity-40 disabled:hover:text-slate-500 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Download results to excel spreadsheet"
            >
              <Laptop className="h-4 w-4" /> Export CSV ({searchResults.length})
            </button>
            <button
              onClick={() => setIsSavingSearch(true)}
              className="px-4 py-2.5 bg-slate-950 text-slate-400 hover:text-[#FF6321] border border-slate-800 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <Bookmark className="h-4 w-4" /> Save Query
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Boolean Search Builder (Point 6 PM checklist) */}
        {showBooleanBuilder && (
          <div className="bg-slate-950 p-4 rounded-lg border border-[#FF6321]/30 my-2 space-y-3 font-mono text-xs text-slate-350">
            <div className="flex justify-between items-center pb-2 border-b border-slate-900">
              <span className="font-extrabold text-[#FF6321] tracking-widest text-[10px]">BOOLEAN ELASTIC QUERY CONSTRUCTOR</span>
              <span className="text-[10px] text-slate-550">Syntax parser will build: +[AND] |([OR1] | [OR2]) -[NOT]</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">Must Include (AND +)</label>
                <input
                  type="text"
                  value={boolAnd}
                  onChange={(e) => setBoolAnd(e.target.value)}
                  placeholder="e.g. roadbed"
                  className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs focus:outline-none focus:border-[#FF6321]"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">Any of (OR | comma list)</label>
                <input
                  type="text"
                  value={boolOr}
                  onChange={(e) => setBoolOr(e.target.value)}
                  placeholder="e.g. gravel, tarmac, asphalt"
                  className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs focus:outline-none focus:border-[#FF6321]"
                />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">Must Exclude (NOT -)</label>
                <input
                  type="text"
                  value={boolNot}
                  onChange={(e) => setBoolNot(e.target.value)}
                  placeholder="e.g. private"
                  className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs focus:outline-none focus:border-[#FF6321]"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-900">
              <div className="text-[10px] text-slate-400">
                Composite Expression Preview: <strong className="text-emerald-400">
                  {boolAnd ? `+"${boolAnd}" ` : ''}
                  {boolOr ? `(${boolOr.split(',').map(s => `"${s.trim()}"`).join(' | ')}) ` : ''}
                  {boolNot ? `-"${boolNot}"` : ''}
                  {!boolAnd && !boolOr && !boolNot ? 'Empty Expression' : ''}
                </strong>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setBoolAnd(""); setBoolOr(""); setBoolNot(""); }}
                  className="px-2.5 py-1 text-[10px] border border-slate-800 hover:text-rose-450 transition text-slate-500 rounded"
                >
                  Clear Builder
                </button>
                <button
                  onClick={handleApplyBoolean}
                  className="px-3 py-1 text-[10px] bg-[#FF6321] text-black font-extrabold rounded hover:bg-[#ff7b42] transition"
                >
                  Compile & Apply Query Structure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions under bar */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500 select-none">
          <span>SUGGESTED FILTERS:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQueryString(s)}
              className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-slate-405 border border-slate-850 rounded text-[9px] hover:text-[#FF6321] transition"
            >
              "{s}"
            </button>
          ))}
        </div>

        {/* Typo Tolerance Indicator */}
        {typoTriggered && (
          <div className="p-2.5 bg-amber-950/20 border border-amber-900/40 text-amber-500 font-mono text-[10px] rounded flex gap-2 items-center">
            <SlidersHorizontal className="h-3.5 w-3.5 animate-pulse" />
            <span>
              ℹ Typo Auto-corrected query to: <strong className="text-amber-400">"{correctedQuery}"</strong> (Levenshtein Distance applied).
            </span>
          </div>
        )}

        {/* Analytics stats row */}
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-850/60 pt-2">
          <span>ELASTICSEARCH SHIELD CLUSTER SYNCHRONIZED</span>
          <span>FOUND {totalFound} RECORD NODES IN {speedMs} ms</span>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: OPPORTUNITIES LIST INDEX (xl:col-span-4) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          
          {/* Recent & Saved searches list in workspace */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 max-h-[180px] overflow-y-auto custom-scroll">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
              📚 Saved Searches History
            </span>
            <div className="space-y-1.5">
              {savedQueries.map((q) => (
                <div key={q.id} className="flex justify-between items-center text-xs p-2 bg-slate-950 rounded border border-slate-850">
                  <button
                    onClick={() => handleApplySavedQuery(q)}
                    className="text-slate-300 font-mono text-[11px] font-bold hover:text-[#FF6321] text-left truncate flex-1"
                  >
                    {q.name}
                  </button>
                  <button 
                    onClick={() => handleRemoveSavedQuery(q.id)}
                    className="text-slate-600 hover:text-rose-400 pl-2 font-black text-xs"
                    title="Delete Saved Query"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col h-[520px]">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6321]">INDEXED POOL</h3>
              <span className="text-[9px] font-mono text-slate-500 uppercase">{searchResults.length} UNLOCKED RESULTS</span>
            </div>

            {/* Faceted Filters Selector */}
            <div className="space-y-2 my-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[9px] text-slate-505 block mb-1 uppercase font-mono">Sovereignty</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full text-xs py-1 px-2 bg-slate-950 border border-slate-800 rounded font-mono text-slate-350 focus:outline-none focus:border-[#FF6321]"
                  >
                    <option value="All">All Territories</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="S. Sudan">South Sudan</option>
                    <option value="DRC">DRC</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-slate-550 block mb-1 uppercase font-mono">Industrial Sector</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full text-xs py-1 px-2 bg-slate-950 border border-slate-800 rounded font-mono text-slate-350 focus:outline-none focus:border-[#FF6321]"
                  >
                    <option value="All">All Sectors</option>
                    <option value="Infrastructure & Transport">Infrastructure</option>
                    <option value="Energy & Utilities">Energy</option>
                    <option value="Digital Health & Tech">ICT Services</option>
                    <option value="Refugee Programs & Energy">Refugees</option>
                    <option value="Oil & Gas Services">Oil & Gas</option>
                    <option value="Agriculture & Relief Deliveries">Agri Relief</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Opportunity list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scroll">
              {searchResults.map((opt, idx) => {
                const isActive = activeOpt?.id === opt.id;
                
                // GUEST USER ROLE RESTRICTION: Only view first 3 unlocked, other blurry lock overlay
                const isGuestAndLocked = activeRole === 'Guest' && idx >= 3;

                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      if (!isGuestAndLocked) setActiveOpt(opt);
                    }}
                    className={`p-3 rounded-lg border text-xs relative overflow-hidden transition flex flex-col justify-between ${
                      isGuestAndLocked 
                        ? 'opacity-40 border-slate-900 bg-slate-950/10 cursor-not-allowed select-none blur-sm' 
                        : isActive
                        ? 'bg-slate-950 border-[#FF6321]/85 shadow-[0_0_12px_rgba(255,99,33,0.12)] cursor-pointer'
                        : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 hover:border-slate-800 cursor-pointer'
                    }`}
                  >
                    {isGuestAndLocked ? (
                      <div className="absolute inset-0 bg-slate-950/60 flex flex-col justify-center items-center font-mono z-10 text-center p-3 text-[9px]">
                        <span className="font-bold text-[#FF6321]">🔐 GUEST INDEX OVERFLOW LOCKED</span>
                        <p className="text-slate-500 scale-90">SaaS Upgrade Needed</p>
                      </div>
                    ) : null}

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-mono text-slate-500 font-bold">{opt.id}</span>
                      <span className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                        opt.recommendedAction === 'Pursue Immediately' ? 'text-emerald-400 bg-emerald-950/20' :
                        opt.recommendedAction === 'Form Consortium' ? 'text-amber-400 bg-amber-950/20' :
                        'text-slate-400 bg-slate-900/60'
                      }`}>
                        {opt.recommendedAction}
                      </span>
                    </div>
                    <h4 className={`font-semibold mt-2 line-clamp-1 ${isActive ? 'text-white' : 'text-slate-355'}`}>{opt.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{opt.description}</p>
                    
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-900/60 text-[10px] text-slate-450 font-mono">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#FF6321]" /> {opt.country}</span>
                      <span className="font-bold text-slate-200">${(opt.budgetUSD / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                );
              })}

              {searchResults.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  No matching micro-indexes found.
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* RIGHT COLUMN: DECISION INTELLIGENCE PANEL (xl:col-span-8) */}
        <div className="xl:col-span-8">
          
          {activeOpt ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-[716px] overflow-y-auto custom-scroll">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-850">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[10px] text-slate-500 uppercase">INDEX DIRECT DATA</span>
                    <span className="text-slate-700">|</span>
                    <span className="text-[#FF6321] font-mono font-bold uppercase">{activeOpt.id} PROFILE</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-100 mt-1">{activeOpt.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Scanned Agency: <strong>{activeOpt.buyer}</strong> ({activeOpt.buyerType})</p>
                </div>

                <div className="flex gap-2 items-center">
                  
                  {/* Bookmarks Toggle with App reactive callback */}
                  <button
                    onClick={() => onToggleSaveOpportunity(activeOpt.id)}
                    className={`p-2 rounded-lg border text-xs font-mono font-bold flex items-center transition cursor-pointer ${
                      savedOpportunities.includes(activeOpt.id)
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>

                  <div className={`px-4 py-2 text-center rounded-lg border text-xs font-bold leading-tight uppercase tracking-wide min-w-[150px] ${getBannerColor(activeOpt.recommendedAction)}`}>
                    {activeOpt.recommendedAction === 'Pursue Immediately' ? '🎯 PURSUE IMMEDIATELY' :
                     activeOpt.recommendedAction === 'Form Consortium' ? '🤝 FORM CONSORTIUM' :
                     activeOpt.recommendedAction === 'Review Further' ? '🔍 REVIEW FURTHER' :
                     '⚠️ AVOID / SUB-CONTRACT'}
                  </div>

                </div>
              </div>

              {/* TACTICAL SCORECARD MODULE */}
              <div className="mt-5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-slate-500 mb-2.5 block font-bold">Predictive Match Ratings (Computed on Node Graphs)</label>
                
                {/* ROLE RESTRICTION FOR SME GAUGE */}
                {activeRole === 'SME User' || activeRole === 'Guest' ? (
                  <div className="bg-slate-950 p-4 border border-dashed border-amber-900/40 rounded-xl mb-4 text-center space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 block uppercase">⚠️ PROFESSIONAL ANALYTICS KEY MANDATE LOCKED</span>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto">
                      ML Win Probabilities, Complexity calculations, and Incumbency alignment matrices are reserved for Professional tier operators.
                    </p>
                    <button
                      onClick={() => onToggleSaveOpportunity("Subscription Bench")} // redirects mock upgrade index
                      className="text-[10px] font-mono text-[#FF6321] hover:underline"
                    >
                      Verify Core Plan Upgrade ➜
                    </button>
                  </div>
                ) : null}

                <div className={`grid grid-cols-2 sm:grid-cols-5 gap-3 ${
                  activeRole === 'SME User' || activeRole === 'Guest' ? 'opacity-30 pointer-events-none filter blur-xs selection:bg-none' : ''
                }`}>
                  
                  {/* Win Chance */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center">
                    <span className="text-[9px] text-[#00FF00] font-bold block uppercase tracking-wider">Win Probability</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono my-1">{activeOpt.winProbability}%</span>
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#00FF00] h-full" style={{ width: `${activeOpt.winProbability}%` }}></div>
                    </div>
                  </div>

                  {/* SME Capability Match */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center">
                    <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Capability Match</span>
                    <span className="text-2xl font-bold font-mono my-1 text-slate-100">{activeOpt.supplierMatchScore}%</span>
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: `${activeOpt.supplierMatchScore}%` }}></div>
                    </div>
                  </div>

                  {/* Competition Level */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center">
                    <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Competition Score</span>
                    <span className="text-2xl font-bold font-mono my-1 text-[#FF9E00]">{activeOpt.competitionScore}%</span>
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#FF9E00] h-full" style={{ width: `${activeOpt.competitionScore}%` }}></div>
                    </div>
                  </div>

                  {/* Complexity Index */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center">
                    <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Complexity Index</span>
                    <span className="text-2xl font-bold font-mono my-1 text-slate-350">{activeOpt.complexityScore}%</span>
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <div className="bg-slate-700 h-full" style={{ width: `${activeOpt.complexityScore}%` }}></div>
                    </div>
                  </div>

                  {/* Risk Index */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center col-span-2 sm:col-span-1">
                    <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider">Risk Level</span>
                    <span className={`text-2xl font-bold font-mono my-1 ${activeOpt.riskScore > 40 ? 'text-red-400' : 'text-emerald-400'}`}>{activeOpt.riskScore}%</span>
                    <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${activeOpt.riskScore > 40 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${activeOpt.riskScore}%` }}></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* DYNAMIC PALANTIR/BLOOMBERG-STYLE BIDDING SIMULATOR & RISK MATRIX SUITE */}
              <div className="mt-6 border-2 border-[#FF6321]/20 p-5 rounded-xl bg-slate-950 space-y-6">
                
                {/* Score Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-900">
                  <div>
                    <span className="text-[9px] text-[#FF6321] font-bold block uppercase tracking-widest font-mono">Simulators Sandbox v4.1</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-150">Regression & Pricing Estimator</h3>
                  </div>
                  <Sparkles className="h-5 w-5 text-[#FF6321] animate-pulse" />
                </div>

                {/* Main Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 font-bold uppercase">Pricing Variance vs Budget</span>
                        <span className={`font-semibold ${userBidDiscount < -15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {userBidDiscount}% ({userBidDiscount === 0 ? 'BudgetValue' : `${userBidDiscount > 0 ? '+' : ''}${userBidDiscount}%`})
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="-30"
                        max="0"
                        step="1"
                        value={userBidDiscount}
                        onChange={(e) => setUserBidDiscount(parseInt(e.target.value))}
                        className="w-full accent-[#FF6321] bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                        <span>-30% Min Profit</span>
                        <span>0% High Margin</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 font-bold uppercase">Joint-Venture Local Content Offset</span>
                        <span className="text-[#9e7bff] font-semibold">{userLocalContent}% Share</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={userLocalContent}
                        onChange={(e) => setUserLocalContent(parseInt(e.target.value))}
                        className="w-full accent-indigo-505 bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                        <span>0% Off-shore Only</span>
                        <span>100% Native EAC</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-900/40 p-4 rounded-lg border border-slate-900">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider mb-1">EAC Alignment Directives</span>
                    
                    <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
                      <input 
                        type="checkbox"
                        checked={userCarbonEfficiency}
                        onChange={(e) => setUserCarbonEfficiency(e.target.checked)}
                        className="mt-0.5 rounded accent-[#FF6321] h-3.5 w-3.5"
                      />
                      <span className="text-[11px] text-slate-350 leading-tight">
                        Satisfies Sovereign ESG & Carbon compliance requirements (+6% probability check)
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
                      <input 
                        type="checkbox"
                        checked={userSmeRecruited}
                        onChange={(e) => setUserSmeRecruited(e.target.checked)}
                        className="mt-0.5 rounded accent-[#FF6321] h-3.5 w-3.5"
                      />
                      <span className="text-[11px] text-slate-350 leading-tight">
                        Recruits licensed SME as core subcontractor/consortium teammate (+11% boost)
                      </span>
                    </label>
                  </div>

                </div>

                {/* LIVE CALCULATION RE-REGRESSION BAR */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-[#FF6321]/30 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#00FF00] font-bold tracking-widest block uppercase">SIMULATED FORECAST SCORECARD</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-400 text-xs">Simulated Cost:</span>
                      <strong className="text-slate-100 text-sm">
                        ${(activeOpt.budgetUSD * (1 + userBidDiscount / 100)).toLocaleString(undefined, {maximumFractionDigits: 0})} USD
                      </strong>
                    </div>
                    <div className="text-[10px]">
                      Recommended Standing: {' '}
                      <span className={`font-semibold uppercase ${
                        simulatedWinChance > 75 ? 'text-emerald-400' :
                        simulatedWinChance > 55 ? 'text-yellow-405' :
                        'text-rose-455'
                      }`}>
                        {simulatedWinChance > 75 ? 'Target Gold Node' :
                         simulatedWinChance > 55 ? 'Tender Normal Pursuit' :
                         'Hazardous Margin (High Default Chance)'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center gap-3 text-center min-w-[200px] justify-center shadow-inner">
                    <div>
                      <span className="text-[9px] text-[#00FF00] font-bold block uppercase">Predictive Win Chance</span>
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="text-3xl font-black text-emerald-400 tracking-tighter">{simulatedWinChance}%</span>
                        <span className="text-[10px] text-slate-500">
                          ({simulatedWinChance > activeOpt.winProbability ? '▲' : '▼'}{Math.abs(simulatedWinChance - activeOpt.winProbability)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOVEREIGN RISK THREAT HEATMAP HIGHLIGHTS (Point 3 PM checklist) */}
                <div className="mt-4 bg-slate-900/20 p-3.5 rounded-lg border border-slate-900 font-mono text-xs">
                  <span className="text-[10px] text-slate-550 uppercase tracking-widest block font-bold mb-3">Multilateral Risk Matrix Analysis (Real-time Scans)</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    
                    <div className="bg-slate-950 p-2 rounded border border-slate-855 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Political/Social Friction</span>
                      <span className={`text-[11px] font-bold block mt-1.5 ${activeOpt.riskScore > 60 ? 'text-red-400': 'text-emerald-400'}`}>
                        {activeOpt.riskScore > 60 ? 'CRITICAL RISK' : 'STABLE NODE (0.32)'}
                      </span>
                      <div className="w-full bg-slate-900 h-1 rounded overflow-hidden mt-1 mx-auto max-w-[80px]">
                        <div className={`h-full ${activeOpt.riskScore > 60 ? 'bg-red-500': 'bg-emerald-500'}`} style={{width: `${activeOpt.riskScore > 60 ? 80 : 30}%`}}></div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2 rounded border border-slate-855 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Customs Congestion Delay</span>
                      <span className={`text-[11px] font-bold block mt-1.5 ${activeOpt.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {activeOpt.riskScore > 40 ? 'Moderate (7.2d Clears)' : 'Express Check (1.5d)'}
                      </span>
                      <div className="w-full bg-slate-900 h-1 rounded overflow-hidden mt-1 mx-auto max-w-[80px]">
                        <div className={`h-full ${activeOpt.riskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width: `${activeOpt.riskScore > 40 ? 60 : 20}%`}}></div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2 rounded border border-slate-855 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">ESG Standards Penalty Risk</span>
                      <span className={`text-[11px] font-bold block mt-1.5 ${userCarbonEfficiency ? 'text-emerald-400' : 'text-red-400'}`}>
                        {userCarbonEfficiency ? 'Zero Surcharge' : 'High Surcharge (2.5%)'}
                      </span>
                      <div className="w-full bg-slate-900 h-1 rounded overflow-hidden mt-1 mx-auto max-w-[80px]">
                        <div className={`h-full ${userCarbonEfficiency ? 'bg-emerald-500' : 'bg-red-500'}`} style={{width: `${userCarbonEfficiency ? 15 : 75}%`}}></div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2 rounded border border-slate-855 text-center">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">Local Content Compliance</span>
                      <span className={`text-[11px] font-bold block mt-1.5 ${userLocalContent < 40 ? 'text-[#FF6321]' : 'text-emerald-400'}`}>
                        {userLocalContent < 40 ? 'Non-Compliant Deficit' : 'Passes EAC Guidelines'}
                      </span>
                      <div className="w-full bg-[#1c1c1c] h-1 rounded overflow-hidden mt-1 mx-auto max-w-[80px]">
                        <div className={`h-full ${userLocalContent < 40 ? 'bg-[#FF6321]' : 'bg-emerald-505'}`} style={{width: `${userLocalContent < 40 ? 80 : 35}%`}}></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* CUSTOM ADVISORY MATCHMAKING COMMISSION PROMPT (Point 2 PM checklist) */}
                <div className="border border-[#FF6321]/20 p-3.5 rounded-lg bg-[#FF6321]/5 text-xs text-slate-300 font-mono space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-[#FF6321] font-bold block uppercase tracking-wider">CPIN ESCROW ADVISORY GATEWAY DISPATCH</span>
                      <h4 className="font-bold text-slate-150 uppercase">Form a Joint-Venture / Subcontract Consortium</h4>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">2.5% Escrow commission</span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-slate-400">
                    Fulfill local content policy gaps by partnering with qualified local suppliers instantly. Our escrow dispatch algorithm secures local certified partners within {activeOpt.country} matching all bid prerequisite standards.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        setShowAdvisoryBookingModal(true);
                        setIsAdvisoryBooked(false);
                      }}
                      className="px-3 py-1 bg-[#FF6321] text-black font-extrabold text-[10px] rounded hover:bg-[#ff7b42] transition"
                    >
                      Book Consolidated Partner Matchmaking
                    </button>
                    <button 
                      onClick={() => setShowPayPerLeadModal(true)} 
                      className="px-3 py-1 bg-slate-900 border border-slate-850 hover:text-white text-slate-405 text-[10px] rounded transition"
                    >
                      Inspect Premium Intelligence Lead Sheet
                    </button>
                  </div>
                </div>

                {/* CUSTOM INTELLIGENCE DOSSIER REPORT CONSTRUCTOR SECTION (Point 7 PM Checklist) */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 text-xs text-slate-300 space-y-3.5 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Custom Portfolio Dossier Exporter</span>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Reports Synthesizer v9</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-slate-500">Operational Synthesis Class</label>
                      <select 
                        value={dossierTemplate}
                        onChange={(e) => setDossierTemplate(e.target.value)}
                        className="w-full text-xs py-1.5 px-2 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-[#FF6321] text-slate-205"
                      >
                        <option value="Standard Overview Dossier">Standard Overview Dossier</option>
                        <option value="SME Feasibility & Content Analysis">SME Feasibility & Content Analysis</option>
                        <option value="Joint-Venture Consortium Placement Brief">Joint-Venture Consortium Placement Brief</option>
                        <option value="Palantir Risk Matrix Breakdown Grid">Palantir Risk Matrix Breakdown Grid</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-slate-500">Inclusion Parameters Section</label>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <label className="flex items-center gap-1.5 text-slate-450 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={dossierSections.pricingRegression}
                            onChange={(e) => setDossierSections({ ...dossierSections, pricingRegression: e.target.checked })}
                            className="accent-[#FF6321]"
                          />
                          <span>Pricing Slider Matrix</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-slate-450 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={dossierSections.capabilityMetrics}
                            onChange={(e) => setDossierSections({ ...dossierSections, capabilityMetrics: e.target.checked })}
                            className="accent-[#FF6321]"
                          />
                          <span>Capability Ratings</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-slate-450 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={dossierSections.riskHeatmap}
                            onChange={(e) => setDossierSections({ ...dossierSections, riskHeatmap: e.target.checked })}
                            className="accent-[#FF6321]"
                          />
                          <span>Sovereign Heatmap Grid</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-slate-450 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={dossierSections.historicalWinners}
                            onChange={(e) => setDossierSections({ ...dossierSections, historicalWinners: e.target.checked })}
                            className="accent-[#FF6321]"
                          />
                          <span>Winners Incumbent</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {generationProgress !== null ? (
                    <div className="pt-2 space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[#FF6321] font-bold animate-pulse">Fusing Strategic Multi-lateral Records...</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                        <div className="bg-[#FF6321] h-full" style={{ width: `${generationProgress}%` }}></div>
                      </div>
                    </div>
                  ) : null}

                  <button
                    onClick={handleSynthesizeDossier}
                    disabled={isSynthesizingDossier}
                    className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-slate-150 font-bold border border-slate-800 text-[10.5px] rounded hover:text-emerald-400 transition cursor-pointer flex items-center justify-center gap-2 uppercase"
                  >
                    <span>⚡ Compile, Certify & Exporter Strategic Dossier (.txt)</span>
                  </button>
                </div>

              </div>

              {/* INVESTMENT REPORT OUTLOOK */}
              <div className="mt-6 border border-slate-850 p-4 rounded-lg bg-slate-950/80">
                <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-[#FF6321]" /> Strategic Investment Report
                  </h3>
                  <span className="text-[9px] font-mono text-slate-500">DENOMINATED IN USD Equivalent</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 py-2 border-b border-slate-900/40">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">ESTIMATED BID RANGE</span>
                    <p className="text-base font-bold text-slate-205 mt-0.5 font-mono">
                      {activeOpt.estWinningBidRangeUSD?.min !== undefined ? `$${activeOpt.estWinningBidRangeUSD.min.toLocaleString()}` : 'N/A'} - {activeOpt.estWinningBidRangeUSD?.max !== undefined ? `$${(activeOpt.estWinningBidRangeUSD.max / 1000000).toFixed(2)}M` : 'N/A'}
                    </p>
                    <span className="text-[9px] text-slate-500 block">Recommended bidding threshold target</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">COMPETING DENSITY</span>
                    <p className="text-base font-bold text-slate-200 mt-0.5 font-mono font-bold">
                      ~ {activeOpt.estCompetitorsCount ?? 0} Incumbents
                    </p>
                    <span className="text-[9px] text-slate-500 block">Identified in country pipelines</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">LIKELY INCUMBENT</span>
                    <p className="text-xs font-bold text-[#FF6321] mt-1 truncate">
                      {activeOpt.likelyIncumbentVendors?.[0] || 'None Mapped'}
                    </p>
                    <span className="text-[9px] text-slate-500 block">Historical award receipts mapping</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#FF6321] block tracking-wider uppercase font-mono">Recommended Pursuit Strategy</span>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{activeOpt.recommendedStrategy}</p>
                  </div>
                </div>
              </div>

              {/* DUAL PROS & CONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                
                <div className="bg-emerald-950/5 border border-emerald-900/20 p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-3 uppercase tracking-wider font-mono">
                      <CheckCircle className="h-4 w-4" /> Recommended Strengths
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {activeOpt.aiStrengths?.map((s, idx) => (
                        <li key={idx} className="flex gap-2 items-start leading-normal">
                          <span className="text-emerald-400 mt-0.5">✔</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-red-950/5 border border-red-900/20 p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-3 uppercase tracking-wider font-mono">
                      <AlertTriangle className="h-4 w-4" /> Risk Exposures & Gaps
                    </h4>
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

              </div>

              {/* STATUTORY STANDARDS & COMPLIANCE */}
              <div className="mt-6 border border-slate-850 p-4 rounded-lg bg-slate-950/40">
                <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-2.5 font-mono">Sovereign Compliance Gap Checks</span>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1">
                    <span className="text-xs text-slate-400 font-semibold block">Primary Prerequisite Certificates</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activeOpt.requiredDocuments?.map((doc, idx) => (
                        <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[10.5px] font-mono">
                          🛡 {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(activeOpt.missingRequirements?.length ?? 0) > 0 && (
                    <div className="bg-[#4a1c12]/20 border border-red-900/40 p-3 rounded-lg max-w-sm">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block font-mono">⚠️ Out of Alignment</span>
                      <p className="text-[11px] text-slate-400 leading-normal mt-1">
                        Lack matching: <strong className="text-red-400">{activeOpt.missingRequirements?.join(', ')}</strong>. Secure a subcontractor holds these before bidding.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500 font-mono h-[716px] flex flex-col justify-center">
              No opportunity selected. Click an indexed card on the left panel index.
            </div>
          )}

        </div>

      </div>

      {/* SAVE SEARCH / ALERTS MODAL POPUP */}
      {isSavingSearch && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSaveSearch}
            className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_25px_rgba(255,99,33,0.3)] font-mono animate-pulse-slow"
          >
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-[#FF6321] font-bold block">SAVED SEARCH & ALERTS CREATION</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-150">Configure Push Webhook</h3>
              </div>
              <Bell className="h-5 w-5 text-[#FF6321]" />
            </div>

            <div className="p-5 space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-550 block">CUSTOM SAVED SEARCH LABEL</label>
                <input
                  type="text"
                  required
                  value={customSearchName}
                  onChange={(e) => setCustomSearchName(e.target.value)}
                  placeholder="e.g. Tanzania Grain Pipeline"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs leading-normal text-slate-205 focus:outline-none focus:border-[#FF6321]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-550 block select-all">DISPATCH ALERT FREQUENCY</label>
                <select
                  value={alertFrequency}
                  onChange={(e) => setAlertFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#FF6321]"
                >
                  <option value="Instant">Instant (SMS & Email direct)</option>
                  <option value="Daily">Daily Bulletins</option>
                  <option value="Weekly">Weekly Digest</option>
                  <option value="Never">No alerts (Save only)</option>
                </select>
              </div>

              <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg text-[10px] text-[#9e7bff] leading-relaxed">
                ⚡ Active parameters: Query: "{queryString || 'All'}" // Sovereign: "{selectedCountry}" // Sector: "{selectedSector}".
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setIsSavingSearch(false)}
                className="flex-1 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 font-bold rounded-lg text-xs hover:text-white"
              >
                Close Drawer
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 bg-[#FF6321] text-black font-extrabold rounded-lg text-xs hover:bg-[#ff7b42]"
              >
                Seal Saved Alert Query
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DYNAMIC MONETIZATION SYSTEM: PREMIUM PAY-PER-LEAD MODAL (Point 2.2 PM Checklist) */}
      {showPayPerLeadModal && activeOpt && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_35px_rgba(255,99,33,0.4)] font-mono animate-fade-in">
            
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-[#FF6321] font-bold block uppercase tracking-widest leading-none">PRIME DIRECT LEAD INTEGRATION LOCK</span>
                <h3 className="text-xs font-black uppercase text-slate-100 mt-1">Lead Node Purchase Gateway</h3>
              </div>
              <DollarSign className="h-5 w-5 text-[#FF6321] animate-bounce" />
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">Target Lead Asset</span>
                <p className="font-extrabold text-slate-150 text-xs truncate uppercase">{activeOpt.title}</p>
                <div className="flex justify-between text-[10px] text-slate-450 pt-1 border-t border-slate-900 mt-1.5">
                  <span>Territory: <strong className="text-slate-300">{activeOpt.country}</strong></span>
                  <span>Budget value: <strong className="text-emerald-400">${activeOpt.budgetUSD.toLocaleString()}</strong></span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-slate-500 block">Select Premium Licensing Class</label>
                <div className="space-y-1.5">
                  <label className="p-2.5 bg-slate-950 border border-slate-850 hover:border-[#FF6321]/60 rounded-lg flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="leadPackage" defaultChecked className="accent-[#FF6321]" />
                      <div>
                        <span className="font-bold text-slate-200 text-xs block">Single Lead Node Document Unlock</span>
                        <span className="text-[10px] text-slate-500">Unlocks direct procurement officer phone & NCNDA pipeline</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-400 text-sm">$19.00</span>
                  </label>

                  <label className="p-2.5 bg-slate-950 border border-slate-850 hover:border-[#FF6321]/60 rounded-lg flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="leadPackage" className="accent-[#FF6321]" />
                      <div>
                        <span className="font-bold text-slate-200 text-xs block">Full Sector Monthly Feed Access</span>
                        <span className="text-[10px] text-slate-500">Auto-injects all matching regional tenders straight to ERP</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#FF6321] text-sm">$149.00/mo</span>
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer select-none py-1.5 border-t border-slate-900">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-[#FF6321]" />
                <span className="text-[10.5px] text-slate-450 leading-relaxed">
                  I agree to standard EAC regional non-circumvention terms (NCNDA-v21) and certify payment authorize charge.
                </span>
              </label>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setShowPayPerLeadModal(false)}
                className="flex-1 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 font-bold rounded-lg text-xs hover:text-white"
              >
                Close Gateway
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPayPerLeadModal(false);
                  
                  // Audit success log
                  systemStateInstance.auditLogs.unshift({
                    id: `LOG-${Date.now()}`,
                    timestamp: "Just Now",
                    user: "Sarah Alubas",
                    role: activeRole,
                    action: `Purchased advanced lead sheet access lock for tender: "${activeOpt.id}" ($19.00 Charge settled)`,
                    status: "SUCCESS",
                    ipAddress: "197.239.4.12",
                    region: "Uganda Territory"
                  });

                  setNewSearchAlertMsg(`✔ TRANSACTION SETTLED: PRIME ACCESS UNLOCKED CODENAME: ${activeOpt.id}`);
                  setTimeout(() => setNewSearchAlertMsg(null), 4000);
                }}
                className="flex-1 py-1.5 bg-emerald-500 text-black font-extrabold rounded-lg text-xs hover:bg-emerald-400"
              >
                Authorize Direct Charge Node
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DYNAMIC ESCROW COMMISSION & JOINT VENTURE BOOKING MODAL (Point 2.1 & Point 3 PM Checklist) */}
      {showAdvisoryBookingModal && activeOpt && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_35px_rgba(99,102,241,0.4)] font-mono animate-fade-in">
            
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-[#9e7bff] font-bold block uppercase tracking-widest leading-none">CPIN TRUSTED TRUSTEE NETWORK</span>
                <h3 className="text-xs font-black uppercase text-slate-150 mt-1">Sovereign Joint-Venture Escrow</h3>
              </div>
              <ShieldCheck className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300">
              
              {!isAdvisoryBooked ? (
                <>
                  <div className="bg-indigo-950/20 border border-indigo-900/40 p-3.5 rounded-lg space-y-2 text-[11px]">
                    <span className="text-[#9e7bff] block font-bold uppercase tracking-wider text-[10px]">Escrow Transaction Valuation Calculator:</span>
                    <div className="flex justify-between border-b border-indigo-950/60 pb-1">
                      <span className="text-slate-450">Base Consortium Value Goal:</span>
                      <strong className="text-slate-200 font-bold">${activeOpt.budgetUSD.toLocaleString()} USD</strong>
                    </div>
                    <div className="flex justify-between text-indigo-300">
                      <span>CPIN Facilitation Escrow Commission (2.5% fee):</span>
                      <strong className="font-extrabold text-[#00FF00]">${(activeOpt.budgetUSD * 0.025).toLocaleString(undefined, {maximumFractionDigits: 0})} USD</strong>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal pt-1-f font-serif italic">
                      * Facilitation Escrow fee is only legally due and payable upon success of consortium bid award. No advance cost.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold text-slate-505 block">Technical Subcontract Deliverable Scope</label>
                    <textarea 
                      required
                      placeholder="Specify deliverables matching localized content standards (e.g., Gravel trucking mobilization, local health licensing, civil concrete supply...)"
                      rows={3}
                      className="w-full text-xs px-2.5 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-205"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[9px] uppercase font-bold text-slate-505 block mb-1">Target JV Share percentage</label>
                      <select className="w-full text-xs py-1.5 px-2 bg-slate-950 border border-slate-850 rounded focus:outline-none focus:border-indigo-500 text-slate-250 font-bold">
                        <option value="15%">15% JV Target Allocation</option>
                        <option value="30%">30% Recommended Core</option>
                        <option value="49%">49% Max Subcontract Cap</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold text-slate-550 block mb-1">Pre-Check Compliance level</label>
                      <select className="w-full text-xs py-1.5 px-2 bg-slate-950 border border-slate-850 rounded focus:outline-none focus:border-indigo-500 text-slate-250">
                        <option value="Strict">Strict (High ESG only)</option>
                        <option value="Standard">Standard Compliance</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950 text-slate-500 border border-slate-900 rounded text-[9.5px] leading-snug">
                    🔒 Facilitation checks trigger deep scanning of 4,000+ localized supplier registries within <strong>{activeOpt.country}</strong> territory. Selected matches will holding audited liquid reserves and active certifications.
                  </div>
                </>
              ) : (
                <div className="text-center py-6 space-y-4 font-mono animate-fade-in text-xs">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-[#00FF00]">
                    ✔
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-xs">Joint-Venture Escrow Sealed & Dispatched</h4>
                    <p className="text-slate-450 text-[11px] mt-2 leading-relaxed max-w-sm mx-auto">
                      FACILITATION MATCH RUNNING: Secure dispatch signals have been dispatched to <strong>14 licensed operators</strong> in {activeOpt.country} matching checklist requirements. Matches will request secure NDAs within 24 hours.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded text-[10px] text-slate-500 leading-normal">
                    Assigned CPIN Escrow Facilitation Node ID: <strong className="text-slate-300">JV-{Date.now().toString().slice(6)}</strong> // Valuation: ${activeOpt.budgetUSD.toLocaleString()} // Fee provisioned: 2.5%
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2 font-mono">
              <button
                type="button"
                onClick={() => setShowAdvisoryBookingModal(false)}
                className="flex-1 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 font-bold rounded-lg text-xs hover:text-white"
              >
                Close Desks
              </button>
              {!isAdvisoryBooked && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAdvisoryBooked(true);

                    // Audit action
                    systemStateInstance.auditLogs.unshift({
                      id: `LOG-${Date.now()}`,
                      timestamp: "Just Now",
                      user: "Sarah Alubas",
                      role: activeRole,
                      action: `Submitted Joint-Venture Escrow partner setup for tender node "${activeOpt.id}" (Simulated Match search running)`,
                      status: "SUCCESS",
                      ipAddress: "197.239.4.12",
                      region: "Uganda Territory"
                    });
                  }}
                  className="flex-1 py-1.5 bg-indigo-600 text-white font-extrabold rounded-lg text-xs hover:bg-indigo-500"
                >
                  Initiate Match Search Node
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
