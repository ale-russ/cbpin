import { useState } from 'react';
import { mockBuyers } from '../../../data/mockOpportunities';
import { BuyerProfile } from '../../../shared/types';
import { Landmark, TrendingUp, ShieldCheck, PieChart, MapPin, Award, Calendar, DollarSign, Activity } from 'lucide-react';

export default function BuyerProfiles() {
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerProfile>(mockBuyers[0]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* LEFT PANEL: BUYERS LIST INDEX (xl:col-span-4) */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col h-[650px]">
        <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">Authority Index</h3>
          <span className="text-[9px] font-mono text-slate-500">4 ENTITIES EVALUATED</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
          {mockBuyers.map((b) => {
            const isSelected = b.id === selectedBuyer.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBuyer(b)}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition flex justify-between items-center ${
                  isSelected
                    ? 'bg-slate-950 border-[#FF6321]/80 shadow-[0_0_10px_rgba(255,99,33,0.1)]'
                    : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950/80 hover:border-slate-850'
                }`}
              >
                <div>
                  <h4 className={`font-bold transition ${isSelected ? 'text-white' : 'text-slate-300'}`}>{b.name}</h4>
                  <p className="text-[10px] text-slate-500 font-mono uppercase mt-1">{b.country} // {b.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 block uppercase font-mono">EST. VAL</span>
                  <span className="text-xs font-bold font-mono text-slate-300">${(b.annualVolumeUSD / 1000000000).toFixed(1)}B</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[10px] text-slate-500 leading-normal font-mono">
          📌 Procurement ratings evaluate payment speed, dispute resolutions, and local SME compliance.
        </div>
      </div>

      {/* RIGHT PANEL: BUYER INTELLIGENCE GRAPH & DATA (xl:col-span-8) */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-[650px] overflow-y-auto custom-scroll">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[9px] text-[#FF6321] font-bold">BUYER INTELLIGENCE SCORE</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400 font-mono uppercase">{selectedBuyer.id} PROFILE</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-100 mt-1">{selectedBuyer.name}</h2>
          </div>

          <div className="bg-slate-950 px-4 py-2 border border-slate-850 rounded-lg text-center font-mono">
            <span className="text-[9px] text-slate-500 block uppercase font-bold">Trust Rating Index</span>
            <span className="text-lg font-bold text-emerald-400">{selectedBuyer.trustScore} / 100</span>
          </div>
        </div>

        {/* CORE STAT MODULE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
            <span className="text-[10px] text-slate-500 block font-mono">ANNUAL PROCUREMENT VOLUME</span>
            <span className="text-xl font-bold font-mono text-slate-100 block mt-1">
              ${(selectedBuyer.annualVolumeUSD / 1000000).toFixed(1)}M USD
            </span>
            <span className="text-[9px] text-slate-500 block">Total budgetary allocation</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
            <span className="text-[10px] text-slate-500 block font-mono">AVERAGE CONTRACT VALUE</span>
            <span className="text-xl font-bold font-mono text-slate-100 block mt-1">
              ${(selectedBuyer.avgContractValueUSD / 1000000).toFixed(1)}M USD
            </span>
            <span className="text-[9px] text-slate-500 block">Typical contract sizing scale</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
            <span className="text-[10px] text-slate-500 block font-mono">SEASONALITY PURCHASING PEAK</span>
            <span className="text-xs font-bold text-[#FF9E00] block mt-1 uppercase">
              {selectedBuyer.seasonalityPeak}
            </span>
            <span className="text-[9px] text-slate-500 block mt-1">Months with maximum RFP releases</span>
          </div>
        </div>

        {/* HISTORY MINI-CHART & SUPPLIER ALIGNMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* History Chart representation */}
          <div className="border border-slate-850 p-4 rounded-lg bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-3">Yearly Budgetary Allocation Trajectory</span>
              <div className="space-y-4">
                {selectedBuyer.contractAwardHistory.map((item) => {
                  const maxVal = Math.max(...selectedBuyer.contractAwardHistory.map(h => h.val));
                  const percentage = (item.val / maxVal) * 100;
                  return (
                    <div key={item.year} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400 font-bold">{item.year} Fiscal Year</span>
                        <span className="text-slate-100 font-bold">${(item.val / 1000000).toFixed(1)}M USD ({item.count} Awards)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#FF6321] h-full transition-all" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[9px] text-slate-500 font-mono mt-3">
              * Source: Certified Public Financial Management bulletins (2023-2025).
            </p>
          </div>

          {/* Supplier Alignments & Preferred partner matches */}
          <div className="border border-slate-850 p-4 rounded-lg bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono mb-3">HISTORICAL MAJOR RECIPIENTS</span>
              <div className="space-y-2 mt-2">
                {selectedBuyer.frequentWinners.map((winner, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center p-2.5 rounded bg-slate-900/60 border border-slate-850/40 text-xs">
                    <span className="w-5 h-5 bg-[#FF6321] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center">
                      🏆
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-300">{winner}</h4>
                      <p className="text-[9px] text-slate-500">Tier-1 Incumbent Mapped</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/40 border border-slate-850 rounded">
              <span className="text-[10px] text-slate-400 font-bold block uppercase font-mono">Preferred Supplier Sizing Complexity</span>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Generally favors <strong className="text-[#FF6321] uppercase">{selectedBuyer.preferredSupplierComplexity} Complexity</strong> tier-1 contractors. JVs are highly recommended to establish compliance.
              </p>
            </div>
          </div>

        </div>

        {/* REGIONAL FOOTPRINT COVERAGE */}
        <div className="mt-6 border border-slate-850 p-4 rounded-lg bg-slate-950/40">
          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider font-mono">Regional Presence Territories</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedBuyer.regionalPresence.map((loc, idx) => (
              <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-350 px-2.5 py-1 rounded text-xs flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-400 animate-pulse" /> {loc} Hub
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
