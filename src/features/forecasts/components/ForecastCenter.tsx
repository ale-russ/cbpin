import { useState, useMemo } from 'react';
import { mockForecasts } from '../../../data/mockOpportunities';
import { ForecastItem } from '../../../shared/types';
import { Calendar, TrendingUp, Sparkles, Layers, DollarSign, Activity, ChevronRight, CheckCircle2, Bookmark } from 'lucide-react';

export default function ForecastCenter() {
  const [activeTimeline, setActiveTimeline] = useState<'All' | 'Next 30 Days' | 'Next 90 Days' | 'Next 180 Days' | 'Next 12 Months'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredForecasts = useMemo(() => {
    return mockForecasts.filter(f => {
      const matchTimeline = activeTimeline === 'All' || f.predictedTimeline === activeTimeline;
      const matchType = selectedType === 'All' || f.type === selectedType;
      return matchTimeline && matchType;
    });
  }, [activeTimeline, selectedType]);

  // Aggregate stats
  const totalValueUSD = filteredForecasts.reduce((sum, curr) => sum + curr.valueUSD, 0);
  const highestMatch = Math.max(...filteredForecasts.map(f => f.probabilityMatch), 0);

  return (
    <div className="space-y-6">
      
      {/* Top forecasting header block */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <span className="text-xs text-[#FF9E00] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1 animate-pulse">
            <Sparkles className="h-3.5 w-3.5 text-[#FF9E00]" /> PREDICTIVE FORESIGHT TERMINAL
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Regional Procurement Forecasting Center</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Leveraging historical procurement cycles and regional East African Community (EAC) public expenditure bulletins to pre-map multi-million dollar donor programs and government frameworks up to 12 months before they hit portal listings.
          </p>
        </div>
        
        {/* Dynamic score summary blocks */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-850">
            <span className="text-[9px] text-slate-500 block uppercase font-mono">Predicted Inflow Value</span>
            <span className="text-sm font-bold text-slate-100 font-mono">${(totalValueUSD / 1000000).toFixed(1)}M USD</span>
          </div>
          <div className="bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-850">
            <span className="text-[9px] text-slate-500 block uppercase font-mono">Max Forecast Accuracy</span>
            <span className="text-sm font-bold text-[#00FF00] font-mono">{highestMatch || 0}% Signal</span>
          </div>
        </div>
      </div>

      {/* TIMELINE TAB CONTROLLERS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 border border-slate-850 rounded-lg">
          {(['All', 'Next 30 Days', 'Next 90 Days', 'Next 180 Days', 'Next 12 Months'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTimeline(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTimeline === t
                  ? 'bg-[#FF6321] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === 'All' ? 'All Horizon Views' : t}
            </button>
          ))}
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-950 text-slate-350 border border-slate-800 px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#FF6321]"
          >
            <option value="All">All Categories</option>
            <option value="Upcoming Tender">Upcoming Tenders</option>
            <option value="Framework Renewal">Framework Agreements</option>
            <option value="Infrastructure Project">Infrastructure Rollouts</option>
            <option value="Government Budget Release">Budget Releases</option>
            <option value="Donor Program Launch">Donor Launches</option>
          </select>
        </div>
      </div>

      {/* FORECAST TIMELINE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: LISTING */}
        <div className="xl:col-span-2 space-y-3">
          <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block font-bold mb-1">Expected Pipeline Pipeline Releases</label>
          {filteredForecasts.map((fc) => (
            <div 
              key={fc.id}
              className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-700 transition"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-amber-950/45 border border-amber-900/40 text-amber-500 font-bold uppercase select-none">{fc.type}</span>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">RELEASE: {fc.predictedTimeline}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-150">{fc.title}</h3>
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-450 font-mono">
                  <span>Buyer: <strong className="text-slate-300">{fc.buyer}</strong> ({fc.buyerType})</span>
                  <span>Sector: <strong className="text-slate-300">{fc.sector}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-950">
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 block font-mono">PREDICTED BUDGET</span>
                  <span className="text-sm font-bold text-slate-100 font-mono">${(fc.valueUSD / 1000000).toFixed(1)}M</span>
                </div>
                
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 block font-mono">PROBABILITY</span>
                  <span className={`text-sm font-bold font-mono ${fc.probabilityMatch >= 80 ? 'text-[#00FF00]' : 'text-amber-400'}`}>
                    {fc.probabilityMatch}%
                  </span>
                </div>

                <button className="p-2 hover:bg-slate-950 rounded-lg border border-slate-800/80 hover:border-[#FF6321] transition">
                  <Bookmark className="h-3.5 w-3.5 text-slate-500 hover:text-[#FF6321]" />
                </button>
              </div>
            </div>
          ))}

          {filteredForecasts.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center text-slate-500">
              No upcoming forecasts matched current filters in the designated horizon.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REPEAT CYCLES SUMMARY */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl block h-fit space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2.5 border-b border-slate-850">
            Predictive Model Methodology
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <div className="bg-slate-950 p-2 rounded border border-slate-850 h-fit text-[#FF9E00]">
                📈
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Cycle Extraction</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  Automatically correlates historical framework end dates to map expected 3-year RFP renewal timelines.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-slate-950 p-2 rounded border border-slate-850 h-fit text-[#00FF00]">
                🏛
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Government Budgets Scoped</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  Interprets East African national financial appropriation drafts to identify sector specific water/road infrastructure allocation peaks before official procurement starts.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-slate-950 p-2 rounded border border-slate-850 h-fit text-sky-400">
                🌐
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Donor Pipelines Connected</h4>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  WFP, UNHCR, and African Development Bank strategic multi-year funding frameworks extracted to project localized refugee camp logistics demands.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-850">
            <p className="text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-950 p-3 rounded border border-slate-850/80">
              ⚡ MODEL CONFIDENCE SCORE: <strong className="text-[#00FF00]">A- GRADE</strong>
              <br />
              Evaluated on 420+ historical matching tender parameters.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
