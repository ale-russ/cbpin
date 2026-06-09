import { useState } from 'react';
import { reportSections, ReportSection } from '../../../data/reportData';
import { Search, Compass, Shield, Award, ChevronRight, TrendingUp, Zap, HelpCircle } from 'lucide-react';

export default function StrategyDoc() {
  const [activeTab, setActiveTab] = useState<string>("executive-summary");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSections = reportSections.filter(sect => 
    sect.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sect.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sect.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSection = reportSections.find(s => s.id === activeTab) || reportSections[0];

  // Specific Executive Deliverables mapping
  const deliverables = [
    { id: "path-100k", title: "ARR Path: $100,000", desc: "Acquire ~170 SME subscribers in Uganda in Year 1 via PSFU and UMA channels." },
    { id: "path-1m", title: "ARR Path: $1M", desc: "Convert Prime Contractors seeking sub-contractors to meet 40% local content rules across East Africa." },
    { id: "path-10m", title: "ARR Path: $10M", desc: "Integrate with surety bond underwriters and financial institutions utilizing our trade ledger data." },
    { id: "success-score", title: "Success Likelihood: 82%", desc: "High rating due to immediate oil exploration (EACOP) dynamics and lack of regional competitor integration." },
    { id: "failure-reasons", title: "Critical Failures to Avoid", desc: "SME subscription churn during off-bidding seasons and government firewall blockades." },
    { id: "local-partnerships", title: "Strategic Local Partners", desc: "UMA, KeNHA, Ministry of Energy (TZ), REG (Rwanda), PAU (Uganda)." }
  ];

  return (
    <div id="strategy-doc" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar navigation and search */}
      <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[calc(100vh-220px)] overflow-y-auto">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search strategy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        </div>

        <nav className="space-y-1.5 flex-1">
          <span className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Chapters</span>
          {filteredSections.map((sect) => (
            <button
              key={sect.id}
              onClick={() => setActiveTab(sect.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-between ${
                activeTab === sect.id
                  ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-400'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <span className="truncate pr-2">{sect.title}</span>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
            </button>
          ))}
          {filteredSections.length === 0 && (
            <p className="text-slate-500 text-xs px-2 py-4">No strategic units match your search keyword.</p>
          )}
        </nav>

        {/* Operational Highlights panel */}
        <div className="mt-4 pt-4 border-t border-slate-800/60">
          <h4 className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-emerald-500" /> Execution Anchors
          </h4>
          <div className="space-y-2">
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-[10px] text-slate-400 block font-medium">Primary Launch Vector</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-0.5">Albertine Graben, Hoima Core</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/40">
              <span className="text-[10px] text-slate-400 block font-medium">Legislative Lever</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-0.5">PPDA National Content Sec-4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main strategy text & visualizations */}
      <div className="lg:col-span-3 space-y-6 flex flex-col h-[calc(100vh-220px)] overflow-y-auto pr-2">
        
        {/* Visual Highlights Dashboard */}
        <div className="bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-800/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 blur-3xl rounded-full"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-900/30 border border-emerald-800/30 text-[10px] text-emerald-400 font-medium mb-3">
                <Shield className="h-3 w-3" /> EA-cpin strategic thesis
              </div>
              <h2 className="text-xl font-bold text-slate-100 tracking-tight">{selectedSection.title}</h2>
              <p className="text-slate-400 text-sm mt-1">{selectedSection.summary}</p>
            </div>
            
            {selectedSection.metrics && (
              <div className="grid grid-cols-2 gap-3 min-w-[260px]">
                {selectedSection.metrics.map((met, i) => (
                  <div key={i} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-medium block uppercase tracking-wider">{met.label}</span>
                    <span className="text-base font-bold text-slate-100 block mt-0.5 flex items-center gap-1.5">
                      {met.value}
                      {met.trend === 'up' && <span className="text-xs text-emerald-400">↑</span>}
                      {met.trend === 'down' && <span className="text-xs text-amber-500">↓</span>}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Visualizations matching the tab type */}
        {selectedSection.visualType === 'bar' && selectedSection.charData && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> East African Market Opportunity Segment Scale (USD Billions)
            </h3>
            <div className="space-y-4">
              {selectedSection.charData.map((d, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{d.name} Procurement Segment</span>
                    <div className="space-x-3">
                      <span className="text-emerald-400">Total Scale: ${d.value}B</span>
                      <span className="text-slate-500">Growth Rate: {d.secondary}% CAGR</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800 flex">
                    <div 
                      className="bg-emerald-500 h-full rounded-l-full transition-all duration-500"
                      style={{ width: `${(d.value / 35) * 100}%` }}
                    />
                    <div 
                      className="bg-emerald-300/40 h-full rounded-r-full transition-all duration-500"
                      style={{ width: `${(d.secondary / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/40">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span> Segment Size ($B)
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 bg-emerald-300/40 rounded-sm"></span> Sector Growth Rate (%)
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection.visualType === 'gantt' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-emerald-400" /> 24-Month Execution Gantt & Milestone Track
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-800">
                <span className="col-span-2">Execution Phase</span>
                <span>Months 1-4</span>
                <span>Months 5-8</span>
                <span>Months 9-16</span>
                <span>Months 17-24</span>
              </div>
              <div className="grid grid-cols-6 text-xs py-2 items-center border-b border-slate-800/40">
                <div className="col-span-2 font-medium text-slate-300">Phase 1: Uganda Oil & Gas Launch</div>
                <div className="col-span-2 bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded border border-emerald-500/30 font-semibold text-center">Albertine Graben, PSFU</div>
                <div className="col-span-2 text-slate-600 text-center">-</div>
              </div>
              <div className="grid grid-cols-6 text-xs py-2 items-center border-b border-slate-800/40">
                <div className="col-span-2 font-medium text-slate-300">Phase 2: Regional Interlock</div>
                <div className="text-slate-600 text-center">-</div>
                <div className="col-span-2 bg-emerald-400/20 text-emerald-300 text-[10px] px-2 py-1 rounded border border-emerald-400/30 font-semibold text-center">Kenya PPIP, Tanzania NeST</div>
                <div className="text-slate-600 text-center">-</div>
              </div>
              <div className="grid grid-cols-6 text-xs py-2 items-center">
                <div className="col-span-2 font-medium text-slate-300">Phase 3: DFI & Sovereign Expansion</div>
                <div className="col-span-3 text-slate-600 text-center">-</div>
                <div className="bg-emerald-300/20 text-emerald-200 text-[10px] px-2 py-1 rounded border border-emerald-300/30 font-semibold text-center">DRC Mines, WFP</div>
              </div>
            </div>
          </div>
        )}

        {/* Central formatted reading output */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 prose prose-invert max-w-none text-slate-300">
          <div className="whitespace-pre-line text-sm leading-relaxed space-y-4">
            {selectedSection.content}
          </div>
        </div>

        {/* 18 Specific Deliverables quick panels */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-450" /> Strategic Executive Outputs Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {deliverables.map((del, i) => (
              <div key={i} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block">{del.title}</span>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{del.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
