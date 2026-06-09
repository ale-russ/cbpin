import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth.store';
import { mockBuyers } from '../../data/mockOpportunities';
import { Landmark, ArrowUpRight, MapPin, BarChart3, ShieldAlert, Award } from 'lucide-react';

export default function OrganizationsPage() {
  const navigate = useNavigate();
  const activeRole = useAuthStore((s) => s.activeRole);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const filteredBuyers = useMemo(() => {
    return mockBuyers.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCountry = selectedCountry === 'All' || b.country === selectedCountry;
      return matchSearch && matchCountry;
    });
  }, [searchTerm, selectedCountry]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner layout */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">EAC INSTITUTIONS DIRECTORY</span>
          <h1 className="text-xl font-bold text-slate-100">Sovereign & Corporate Organizations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Official procuring authorities, NGOs, and enterprise buyers in cross-border partnerships.
          </p>
        </div>
      </div>

      {/* Filter and control systems */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-950 border border-slate-850 p-4 rounded-xl">
        <input 
          type="text"
          placeholder="Filter organizations by name, type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none"
        />
        
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-slate-900 border border-slate-800 focus:border-[#FF6321] rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none cursor-pointer"
        >
          <option value="All">All Territories</option>
          <option value="Uganda">Uganda</option>
          <option value="Kenya">Kenya</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Rwanda">Rwanda</option>
        </select>
      </div>

      {/* Render matching organisations list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredBuyers.map((b) => (
          <div
            key={b.id}
            onClick={() => navigate(`/organizations/${b.id}`)}
            className="bg-slate-900 border border-slate-850 hover:border-[#FF6321]/50 p-5 rounded-xl flex flex-col justify-between h-[180px] cursor-pointer hover:shadow-lg transition group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6321]/5 rounded-bl-full pointer-events-none origin-top-right group-hover:scale-110 transition"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono text-slate-500 font-bold block">{b.id} // {b.type}</span>
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-white mt-1 line-clamp-1">{b.name}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-450 mt-1 font-mono">
                  <MapPin className="h-3 w-3 text-[#FF6321]" />
                  {b.country}
                </span>
              </div>

              <div className="bg-slate-950 px-2 py-1 border border-slate-850 rounded text-center font-mono">
                <span className="text-[8px] text-slate-500 block">TRUST</span>
                <span className="text-xs font-bold text-emerald-400">{b.trustScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-850 text-[10px] font-mono text-slate-400 mt-2">
              <div>
                <span className="text-slate-500 block uppercase text-[8px]">ANNUAL VALUE</span>
                <strong className="text-slate-200">${(b.annualVolumeUSD / 1000000).toFixed(1)}M USD</strong>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[8px]">TYPICAL SIZE</span>
                <strong className="text-slate-200">${(b.avgContractValueUSD / 1000000).toFixed(1)}M USD</strong>
              </div>
            </div>
            
            <div className="flex justify-end mt-2">
              <span className="text-[#FF6321] text-[10px] font-mono font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition duration-150">
                INSPECT DOSSIER <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
        
        {filteredBuyers.length === 0 && (
          <div className="col-span-2 text-center py-16 bg-slate-950/40 rounded-xl border border-slate-850 border-dashed text-slate-500 font-mono text-xs">
            No matching organizations listed under selected query.
          </div>
        )}
      </div>

    </div>
  );
}
