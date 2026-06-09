import {
  mockOpportunities,
  mockForecasts,
  mockSuppliers,
} from "../../../data/mockOpportunities";
import { Opportunity } from "../../../shared/types";
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Target,
  Layers,
  Users,
  Activity,
  Briefcase,
} from "lucide-react";

interface CommandCenterProps {
  onNavigateToView: (view: string, targetItem?: any) => void;
}

export default function CommandCenter({
  onNavigateToView,
}: CommandCenterProps) {
  // Aggregate statistics
  const activeOpportunitiesCount = mockOpportunities.length;
  const highProbabilityCount = mockOpportunities.filter(
    (o) => o.winProbability >= 70,
  ).length;
  const predictedCount = mockForecasts.filter(
    (f) =>
      f.predictedTimeline === "Next 30 Days" ||
      f.predictedTimeline === "Next 90 Days",
  ).length;
  const totalPipelineUSD =
    mockOpportunities.reduce((acc, curr) => acc + curr.budgetUSD, 0) +
    mockForecasts.reduce((acc, curr) => acc + curr.valueUSD, 0);
  const avgWinProbability = Math.round(
    mockOpportunities.reduce((acc, curr) => acc + curr.winProbability, 0) /
      activeOpportunitiesCount,
  );
  const potentialConsortiumMatches = mockSuppliers.length * 3;

  // Forecast score is composite of matches and high probabilities
  const procurementForecastScore = 84; // 0-100 index
  const supplierReputationScore = 95; // 0-100 corporate index

  return (
    <div className="space-y-6">
      {/* Visual welcome announcement banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <span className="text-xs text-[#FF6321] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full"></span>{" "}
            COMMAND CENTER ACTIVE
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Welcome to CPIN Enterprise v2.4
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Bloomberg-grade procurement analytics for East African contracts.
            The system has pre-evaluated active tenders against your technical
            compliance footprint, historical margins, and available co-operative
            sub-contractors.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigateToView("AI Copilot")}
            className="px-4 py-2 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-semibold rounded-lg text-xs transition duration-150 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,99,33,0.2)]">
            <Zap className="h-3.5 w-3.5 fill-black" /> Run Strategic Copilot
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div>
        <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-3 block font-bold">
          Procurement Command Metrics (SaaS & Joint-Ventures)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1 */}
          <div
            onClick={() => onNavigateToView("Opportunities")}
            className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl cursor-pointer hover:border-[#FF6321]/30 hover:bg-slate-900/60 transition group relative">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Active Tenders Evaluated
              </span>
              <div className="p-1 bg-[#1a130a] rounded border border-[#302010]">
                <Layers className="h-3.5 w-3.5 text-[#FF6321]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-bold font-mono text-slate-100">
                {activeOpportunitiesCount}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Tenders
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
              Inspect score cards <ArrowUpRight className="h-3 w-3" />
            </p>
          </div>

          {/* Tile 2 */}
          <div
            onClick={() => onNavigateToView("Opportunities")}
            className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl cursor-pointer hover:border-[#FF6321]/30 hover:bg-slate-900/60 transition group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                High Win Probability
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-950/50 border border-emerald-900 text-emerald-400 font-bold">
                EXCELLENT MATCHES
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-bold font-mono text-emerald-400">
                {highProbabilityCount}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Ready (&gt;70%)
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
              Access immediate pursuits <ArrowUpRight className="h-3 w-3" />
            </p>
          </div>

          {/* Tile 3 */}
          <div
            onClick={() => onNavigateToView("Forecasts")}
            className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl cursor-pointer hover:border-[#FF6321]/30 hover:bg-slate-900/60 transition group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Predicted Pipeline (90d)
              </span>
              <div className="p-1 bg-[#1a130a] rounded border border-[#302010]">
                <Activity className="h-3.5 w-3.5 text-[#FF9E00]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-bold font-mono text-slate-100">
                {predictedCount}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Tenders Expected
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
              Open forecast desk <ArrowUpRight className="h-3 w-3" />
            </p>
          </div>

          {/* Tile 4 */}
          <div className="bg-slate-900 border border-[#2a1a0f] p-4 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FF6321]/5 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Aggregate Project Worth
              </span>
              <div className="p-1 bg-slate-950/80 rounded border border-slate-800">
                <Briefcase className="h-3.5 w-3.5 text-[#00FF00]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold font-mono text-[#00FF00]">
                ${(totalPipelineUSD / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-tighter">
                USD PIPELINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">
              Combining Active + Upcoming Tenders
            </p>
          </div>
        </div>
      </div>

      {/* SECOND METRIC ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 5 */}
        <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Avg Win Probability
            </span>
            <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">
              {avgWinProbability}%
            </span>
            <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
              Adjusted by technical capabilities
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-mono font-bold text-xs bg-slate-950 text-emerald-400 shadow-[inset_0_0_8px_rgba(0,255,0,0.1)]">
            {avgWinProbability}%
          </div>
        </div>

        {/* Metric 6 */}
        <div
          onClick={() => onNavigateToView("Consortiums")}
          className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-[#FF6321]/30 hover:bg-slate-900/60 transition group">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Consortium Matches Available
            </span>
            <span className="text-2xl font-bold font-mono text-[#FF9E00] mt-1 block">
              {potentialConsortiumMatches}
            </span>
            <span className="text-[9px] text-slate-500 font-mono block mt-0.5 group-hover:text-amber-400 transition-colors">
              Click to analyze JVs ➜
            </span>
          </div>
          <div className="p-3 bg-[#111] rounded-lg border border-[#222]">
            <Users className="h-6 w-6 text-[#FF9E00]" />
          </div>
        </div>

        {/* Metric 7 */}
        <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Procurement Forecast Score
            </span>
            <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">
              {procurementForecastScore}
              <span className="text-xs text-slate-500">/100</span>
            </span>
            <span className="text-[9px] text-[#00FF00] font-mono block mt-0.5 uppercase tracking-tighter">
              ★★★★★ STRONG DEMAND OUTLOOK
            </span>
          </div>
          <div className="p-2 bg-slate-950 rounded border border-slate-800">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
        </div>

        {/* Metric 8 */}
        <div
          onClick={() => onNavigateToView("Suppliers")}
          className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-[#FF6321]/30 hover:bg-slate-900/60 transition group">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
              Your Corporate Reputation
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              {supplierReputationScore}
              <span className="text-xs text-slate-500">/100</span>
            </span>
            <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
              Top Tier-2 Subcontractor ranking
            </span>
          </div>
          <div className="p-2.5 bg-emerald-950/20 rounded border border-emerald-900 animate-pulse">
            <ShieldCheck className="h-5 w-5 text-[#00FF00]" />
          </div>
        </div>
      </div>

      {/* STRATEGIC IMMEDIATE ACTION PLAN */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left span 2: Top Opportunity Decision Grid */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-[#FF6321]" /> Top Strategic
                Decision Grid (UG / KE / TZ)
              </h3>
              <span className="text-[9px] font-mono text-slate-500">
                ALIGNED BY MAXIMUM SCORE
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {mockOpportunities.slice(0, 3).map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => onNavigateToView("Opportunities", opt)}
                  className="bg-slate-950 hover:bg-slate-950/100 p-4 rounded-lg border border-slate-850 hover:border-slate-700 cursor-pointer transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-[#FF6321] font-bold">
                        {opt.id}
                      </span>
                      <span className="h-1 w-1 bg-slate-750 rounded-full"></span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {opt.buyer}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-250 line-clamp-1">
                      {opt.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Value:{" "}
                      <strong className="text-slate-350 font-mono">
                        ${(opt.budgetUSD / 1000000).toFixed(2)}M
                      </strong>{" "}
                      | Sector: {opt.sector}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-900">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">
                        Win Match
                      </span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        {opt.winProbability}%
                      </span>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">
                        Est Competitors
                      </span>
                      <span className="text-xs font-mono text-slate-300 font-semibold">
                        {opt.estCompetitorsCount} Firms
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        opt.recommendedAction === "Pursue Immediately"
                          ? "bg-emerald-950/60 border border-emerald-900 text-emerald-400"
                          : opt.recommendedAction === "Form Consortium"
                            ? "bg-[#302010] border border-[#ff9e00]/20 text-[#FF9E00]"
                            : "bg-slate-900 border border-slate-800 text-slate-400"
                      }`}>
                      {opt.recommendedAction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-900/60 flex justify-between items-center text-xs">
            <span className="text-slate-500">
              Evaluating over 14 national cross-border gateways.
            </span>
            <button
              onClick={() => onNavigateToView("Opportunities")}
              className="text-[#FF6321] hover:text-[#ff7b42] font-semibold text-xs transition duration-150">
              Access All Scored Opportunities ➜
            </button>
          </div>
        </div>

        {/* Right span 1: Operational Warning & Threat Center */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 pb-3 border-b border-slate-800">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Risk & Regulatory Pitfalls
              </h3>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-slate-950 border-l-2 border-red-500 rounded">
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase">
                  MISSING ASME CREDENTIALS
                </span>
                <p className="text-slate-400 text-[11px] mt-1 leading-normal">
                  TotalEnergies Pipeline Spooling RFP requires specialized
                  Class-IX structural welds. Your profile currently lacks this,
                  creating high failure probability if bid single-handedly.
                </p>
                <button
                  onClick={() => onNavigateToView("Consortiums")}
                  className="text-[10px] text-[#FF6321] font-semibold mt-2 block hover:underline">
                  View certified local JVs to bridge this ➜
                </button>
              </div>

              <div className="p-3 bg-slate-950 border-l-2 border-[#FF9E00] rounded">
                <span className="text-[10px] font-mono text-[#FF9E00] font-bold uppercase">
                  KENYAL SHILLING (KES) VOLATILITY
                </span>
                <p className="text-slate-400 text-[11px] mt-1 leading-normal">
                  The Ministry of Health Digital Interoperability System is
                  fixed CNY/KES. Project estimates show up to 12% forex risk
                  over 18-month deployment.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded border border-slate-850 text-[10px] text-slate-500 font-mono text-center">
            LAST COMPLIANCE ENGINE RE-SCAN: <strong>RUNNING PERFECTLY</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
