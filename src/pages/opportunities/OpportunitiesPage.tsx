import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, authStore } from "../../store/auth/auth.store";
import { mockOpportunities } from "../../data/mockOpportunities";
import { performElasticSearch } from "../../data/sampleDataset";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  DollarSign,
  Calendar,
  Sliders,
  Eye,
} from "lucide-react";
import { Opportunity } from "../../shared/types";

export default function OpportunitiesPage() {
  const navigate = useNavigate();
  const activeRole = useAuthStore((s) => s.activeRole);
  const savedOpportunities = useAuthStore((s) => s.savedOpportunities);
  const toggleSaveOpportunity = authStore.toggleSaveOpportunity;

  // Search filter states
  const [queryString, setQueryString] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [valueBracket, setValueBracket] = useState<string>("All");

  // Filter and execute query
  const searchResults = useMemo(() => {
    const filters: any = {};
    if (selectedCountry !== "All") filters.country = selectedCountry;
    if (selectedSector !== "All") filters.sector = selectedSector;

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
    return response.results.map((r: any) => r.item) as Opportunity[];
  }, [queryString, selectedCountry, selectedSector, valueBracket]);

  const uniqueCountries = [
    "All",
    "Uganda",
    "Kenya",
    "Tanzania",
    "Rwanda",
    "South Sudan",
    "DRC",
  ];
  const uniqueSectors = [
    "All",
    "Infrastructure & Transport",
    "Energy & Utilities",
    "Digital Health & Tech",
    "Refugee Programs & Energy",
    "Oil & Gas Services",
    "Agriculture & Relief Deliveries",
  ];

  const valueBrackets = ["All", "Under $1M", "$1M - $5M", "Above $5M"];

  return (
    <div className="space-y-6">
      {/* Top action header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">
            ELASTIC DECI-INDEX ENGINE
          </span>
          <h1 className="text-xl font-bold text-slate-100">
            Procurement Opportunities
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cross-border index querying across East Africa. Select a
            tender to open intelligence dossiers.
          </p>
        </div>
      </div>

      {/* Grid Layout containing SEARCH/FILTERS on top, and RESULTS lists below */}
      <div className="grid grid-cols-1 gap-y-6">
        {/* Left side column: Filter control board */}
        <div className="lg:col-span-1 bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-5 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-900 text-xs text-slate-200 font-mono font-bold uppercase">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF6321]" />
            <span>Search Parameters</span>
          </div>
          {/* Search filter text */}
          <div className="space-y-1 text-xs">
            <label className="text-slate-500 font-mono font-bold block uppercase scale-90 origin-left">
              HEADLESS QUERIES
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-600" />
              <input
                type="text"
                value={queryString}
                onChange={(e) => setQueryString(e.target.value)}
                placeholder="Search solar, roads, unhcr etc."
                className="w-full bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#FF6321]"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-3">
            {/* Country list */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-mono font-bold block uppercase scale-90 origin-left">
                Sovereign Domain
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none cursor-pointer">
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Sovereign (EAC)" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sector selection */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-mono font-bold block uppercase scale-90 origin-left">
                Indicate Industry Sector
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none cursor-pointer">
                {uniqueSectors.map((s) => (
                  <option key={s} value={s}>
                    {s === "All"
                      ? "All Industrial Sectors"
                      : s.replace(" & ", " and ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Limit Bracket filter */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-500 font-mono font-bold block uppercase scale-90 origin-left">
                Sovereign Val USD
              </label>
              <select
                value={valueBracket}
                onChange={(e) => setValueBracket(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none cursor-pointer">
                {valueBrackets.map((vb) => (
                  <option key={vb} value={vb}>
                    {vb === "All" ? "All Valuations" : vb}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[10px] bg-slate-900 border border-slate-850 p-3 rounded-lg font-mono text-slate-400 space-y-1">
            <span className="font-bold text-[#FF6321] uppercase">
              Elastic Search Context
            </span>
            <p className="leading-snug scale-95 origin-left">
              Engine matched <strong>{searchResults.length}</strong> active
              pipelines under seat authority profile.
            </p>
          </div>
        </div>

        {/* Right side column: Main scroll list of opportunities */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
            <span>SHOWING {searchResults.length} TENDER INDICES MATCHED</span>
            <span>PCI-DSS AUDITED CRYPTO CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((opt, idx) => {
              const isGuestAndLocked = activeRole === "Guest" && idx >= 3;
              const isSaved = savedOpportunities.includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (!isGuestAndLocked) {
                      navigate(`/opportunities/${opt.id}`);
                    }
                  }}
                  className={`bg-slate-900 border rounded-xl p-4 flex flex-col justify-between h-[180px] shadow-sm relative overflow-hidden transition group ${
                    isGuestAndLocked
                      ? "opacity-40 border-slate-950 bg-slate-950/10 cursor-not-allowed select-none blur-sm"
                      : "border-slate-800 hover:border-[#FF6321]/50 cursor-pointer hover:shadow-lg"
                  }`}>
                  {isGuestAndLocked && (
                    <div className="absolute inset-0 bg-slate-950/70 flex flex-col justify-center items-center font-mono z-10 text-center p-4">
                      <span className="font-bold text-[#FF6321]">
                        🔐 SEAT INDEX LOCKED
                      </span>
                      <p className="text-[10px] text-slate-500 scale-90 mt-1">
                        Upgrade account plan to inspect full index
                      </p>
                    </div>
                  )}

                  {/* Header row */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                        {opt.id}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00]"></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                          opt.recommendedAction === "Pursue Immediately"
                            ? "text-emerald-400 bg-emerald-950/25 border border-emerald-900/30"
                            : opt.recommendedAction === "Form Consortium"
                              ? "text-amber-400 bg-amber-950/25 border border-amber-900/30"
                              : "text-slate-400 bg-slate-900 border border-slate-850"
                        }`}>
                        {opt.recommendedAction === "Pursue Immediately"
                          ? "🎯 PURSUE"
                          : opt.recommendedAction === "Form Consortium"
                            ? "🤝 CONSORT"
                            : opt.recommendedAction === "Review Further"
                              ? "🔍 REVIEW"
                              : "❌ AVOID"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveOpportunity(opt.id);
                        }}
                        className={`text-sm cursor-pointer p-1 transition ${
                          isSaved
                            ? "text-amber-500 hover:text-slate-400"
                            : "text-slate-600 hover:text-[#FF6321]"
                        }`}
                        title={
                          isSaved
                            ? "Saved to Bookmark Ledger"
                            : "Add to Bookmarks"
                        }>
                        ★
                      </button>
                    </div>
                  </div>

                  {/* Body row */}
                  <div className="space-y-1.5 mt-2 flex-grow">
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-white line-clamp-1">
                      {opt.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  {/* Footer details row */}
                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-850 text-[10px] font-mono text-slate-400 mt-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#FF6321]" />
                        {opt.country}
                      </span>
                      <span className="text-slate-600">|</span>
                      <span>{(opt.sector || "").replace(" & ", " / ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-100 font-black">
                      <span className="text-emerald-400">
                        ${(opt.budgetUSD / 1000000).toFixed(2)}M
                      </span>
                      <span className="text-slate-650 font-normal">USD</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {searchResults.length === 0 && (
              <div className="col-span-2 text-center py-16 bg-slate-950/50 rounded-2xl border border-slate-850 border-dashed text-slate-500 font-mono text-xs">
                No matching tenders found under these parameters. Try removing
                search limits.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
