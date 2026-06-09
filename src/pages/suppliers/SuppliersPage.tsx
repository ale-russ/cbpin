import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth.store';
import { mockSuppliers } from '../../data/mockOpportunities';
import { Award, Briefcase, TrendingUp, Search, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

export default function SuppliersPage() {
  const navigate = useNavigate();
  const activeRole = useAuthStore((s) => s.activeRole);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("All");

  const filteredSuppliers = useMemo(() => {
    return mockSuppliers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.sectorExpertise.some(se => se.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesExpertise = selectedExpertise === 'All' || s.sectorExpertise.includes(selectedExpertise);
      return matchesSearch && matchesExpertise;
    });
  }, [searchQuery, selectedExpertise]);

  const uniqueExpertises = [
    "All",
    "Solar Microgrids Installation",
    "Sovereign PPDA Compliance Consultancy",
    "Heavy Equipment Supply Chain Logistics",
    "Bridges Civil Engineering Design",
    "Disastrous Flood Preparedness Training",
    "Refuelling Station Civil Works",
    "Dry Bulk Cargo Logistics Management"
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header block */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN QUALIFIED PARTNERS DIRECTORY</span>
          <h1 className="text-xl font-bold text-slate-100">Supplier Network Registry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified local subcontractors, prime agencies, and logistical providers with pre-audited ISO compliance.
          </p>
        </div>
      </div>

      {/* Search and Industry Specialty Filters row */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-950 border border-slate-850 p-4 rounded-xl">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialties, expertise or company names..."
            className="w-full text-xs py-2 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
        </div>

        <select
          value={selectedExpertise}
          onChange={(e) => setSelectedExpertise(e.target.value)}
          className="bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none cursor-pointer"
        >
          {uniqueExpertises.map((exp) => (
            <option key={exp} value={exp}>{exp === 'All' ? 'All Verified Specialties' : exp}</option>
          ))}
        </select>
      </div>

      {/* Directory matching grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/suppliers/${s.id}`)}
            className="bg-slate-900 border border-slate-850 hover:border-[#FF6321]/50 p-5 rounded-xl flex flex-col justify-between h-[190px] cursor-pointer hover:shadow-lg transition group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6321]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition"></div>

            <div className="space-y-1.5 flex-grow">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <span className="text-slate-500 font-bold uppercase">{s.id} // {s.competitivePosition}</span>
                <span className={`px-1.5 py-0.5 rounded font-bold text-[8px] uppercase ${
                  s.growthTrend === 'Upward' ? 'text-emerald-400 bg-emerald-950/20' : 'text-slate-400 bg-slate-950'
                }`}>
                  {s.growthTrend}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-white line-clamp-1">{s.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-1">{s.sectorExpertise[0]}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-slate-850 text-[10px] font-mono text-slate-400 mt-2">
              <div>
                <span className="text-slate-500 block uppercase text-[8px]">CONTRACTS</span>
                <strong className="text-slate-200">{s.contractsWon} WON</strong>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[8px]">WIN RATE</span>
                <strong className="text-emerald-400">{s.winRatePercent}%</strong>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[8px]">GROSS REVENUE</span>
                <strong className="text-slate-200">${(s.totalContractValueUSD / 1000000).toFixed(1)}M</strong>
              </div>
            </div>

            <div className="flex justify-end mt-1 pt-1.5 border-t border-slate-850/50">
              <span className="text-[#FF6321] text-[10px] font-mono font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition duration-150">
                INSPECT COMPLIANCE CARD <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}

        {filteredSuppliers.length === 0 && (
          <div className="col-span-3 text-center py-16 bg-slate-950/40 rounded-xl border border-slate-850 border-dashed text-slate-500 font-mono text-xs">
            No registered partners found matching selected parameters.
          </div>
        )}
      </div>

    </div>
  );
}
