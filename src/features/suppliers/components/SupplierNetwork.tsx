import { useState } from 'react';
import { mockSuppliers } from '../../../data/mockOpportunities';
import { SupplierProfile } from '../../../shared/types';
import { Award, Briefcase, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, Globe, Search } from 'lucide-react';

export default function SupplierNetwork() {
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierProfile>(mockSuppliers[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSuppliers = mockSuppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sectorExpertise.some(se => se.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: INDEX & SEARCH (xl:col-span-4) */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col h-[650px]">
        <div className="pb-3 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">Supplier Reputation Directory</h3>
          <p className="text-[10px] text-slate-500">QUALIFIED LOCAL CONTRACTORS</p>
        </div>

        {/* Local Search input */}
        <div className="my-3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialties or names..."
            className="w-full text-xs py-2 pl-8 pr-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#FF6321]"
          />
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
        </div>

        {/* Directory List Container */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scroll">
          {filteredSuppliers.map((s) => {
            const isSelected = selectedSupplier.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSupplier(s)}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-slate-950 border-[#FF6321]/80 shadow-[0_0_10px_rgba(255,99,33,0.1)]'
                    : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 hover:border-slate-850'
                }`}
              >
                <div className="flex justify-between items-start text-[9px] font-mono">
                  <span className="text-slate-500 font-bold">{s.id}</span>
                  <span className={`px-1 rounded-sm font-semibold uppercase ${
                    s.growthTrend === 'Upward' ? 'text-emerald-400 bg-emerald-950/30' : 'text-slate-400 bg-slate-900'
                  }`}>{s.growthTrend}</span>
                </div>
                <div>
                  <h4 className={`font-bold transition ${isSelected ? 'text-white' : 'text-slate-300'}`}>{s.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{s.sectorExpertise[0]}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-900/60 mt-1">
                  <span>Rates: <strong className="text-emerald-400">{s.winRatePercent}% Win</strong></span>
                  <span>Value: <strong className="text-slate-300">${(s.totalContractValueUSD / 1000000).toFixed(1)}M</strong></span>
                </div>
              </div>
            );
          })}
          {filteredSuppliers.length === 0 && (
            <p className="text-slate-500 text-center py-10 text-xs">No registered subcontractors found.</p>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: SUPPLIER PROFILE METRIC SUITE (xl:col-span-8) */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-[650px] overflow-y-auto custom-scroll">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-[9px] text-[#FF6321] font-bold">QUALIFIED EAC PARTNER NODE</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400 font-mono uppercase">{selectedSupplier.competitivePosition}</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-100 mt-1">{selectedSupplier.name}</h2>
          </div>

          <div className="bg-slate-950 px-4 py-2 border border-slate-850 rounded-lg text-center font-mono">
            <span className="text-[9px] text-slate-500 block uppercase font-bold">Compliance Risk Index</span>
            <span className={`text-lg font-bold ${selectedSupplier.supplierRiskScore < 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {selectedSupplier.supplierRiskScore}% (Safe)
            </span>
          </div>
        </div>

        {/* HIGH VALUE STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 text-center">
            <span className="text-[10px] text-slate-500 block font-mono uppercase">Contracts Won</span>
            <span className="text-2xl font-bold font-mono text-slate-100 block mt-1">{selectedSupplier.contractsWon}</span>
            <span className="text-[9px] text-slate-500 mt-1 block">Completed projects</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 text-center">
            <span className="text-[10px] text-slate-500 block font-mono uppercase">Total Gross Value</span>
            <span className="text-2xl font-bold font-mono text-slate-100 block mt-1">
              ${(selectedSupplier.totalContractValueUSD / 1000000).toFixed(1)}M USD
            </span>
            <span className="text-[9px] text-slate-500 mt-1 block">Verified project revenues</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 text-center">
            <span className="text-[10px] text-slate-500 block font-mono uppercase">Win Rate Percent</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1">{selectedSupplier.winRatePercent}%</span>
            <span className="text-[9px] text-slate-400 mt-1 block font-semibold uppercase">EXCELLENT BID RATINGS</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-emerald-900 text-center">
            <span className="text-[10px] text-emerald-400 block font-mono uppercase">Partners Network</span>
            <span className="text-2xl font-bold font-mono text-emerald-300 block mt-1">{selectedSupplier.partnershipNetworkCount} Nodes</span>
            <span className="text-[9px] text-slate-500 mt-1 block">Active sub-JV alignments</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* List of Expertises */}
          <div className="border border-slate-850 p-4 rounded-lg bg-slate-950/80">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-3">Core Technical Capability Strengths</span>
            <div className="space-y-2">
              {selectedSupplier.sectorExpertise.map((exp, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-850 text-xs text-slate-350 font-medium">
                  <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full"></span>
                  {exp}
                </div>
              ))}
            </div>
          </div>

          {/* Geographical Scope */}
          <div className="border border-slate-850 p-4 rounded-lg bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-3">Geographic Service Range</span>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.countriesServed.map((cnt, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded text-xs flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-blue-400 animate-pulse" /> {cnt} Active Area
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-slate-900/40 border border-slate-850 rounded text-xs leading-relaxed text-slate-400">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider font-mono">Bidding Synergies</span>
              This contractor holds registered licenses and clearances (tax compliance, local registry licenses) within listed nations served, enabling rapid local entity JV formation.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
