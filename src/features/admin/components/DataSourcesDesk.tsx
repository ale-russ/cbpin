import { useState } from 'react';
import { Database, RefreshCw, Layers, CheckCircle, ShieldAlert, Heart, Calendar, Activity, Link2 } from 'lucide-react';
import { systemStateInstance, DataSource } from '../../../data/sampleDataset';

export default function DataSourcesDesk() {
  const [sources, setSources] = useState<DataSource[]>(systemStateInstance.dataSources);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSyncSource = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSources(prev => prev.map(s => {
        if (s.id === id) {
          const addedCount = Math.floor(Math.random() * 85) + 12;
          return {
            ...s,
            lastSync: "Just Now",
            recordsImported: s.recordsImported + addedCount,
            status: "Online"
          };
        }
        return s;
      }));
      setSyncingId(null);
    }, 2000);
  };

  const handleToggleSource = (id: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Online' ? 'Disabled' : 'Online'
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Overview stats info card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#FF6321]/10 text-[#FF6321] font-mono font-bold px-2 py-0.5 rounded border border-[#FF6321]/30 uppercase">
                Data crawling network
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-mono text-slate-500">Live Scrapers Desk</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-100 mt-1">Multi-Portals Procurement Sync Inventory</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              CPIN's automated engine operates high-frequency headless crawlers across sovereign portals, non-profit rosters, and multinational procurement bureaus, mapping them into unified elastic query indices.
            </p>
          </div>
        </div>
      </div>

      {/* Crawlers Table index */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="pb-3 border-b border-slate-800 flex justify-between items-center mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF6321] uppercase">🌐 SYNC NODES INDEXED</span>
            <span className="text-[9px] font-mono text-slate-500">8 SOVEREIGN SYSTEM POOLS ACTIVE</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-[#050505] text-[9px] font-mono text-slate-500 uppercase border-b border-slate-850">
                <tr>
                  <th className="px-4 py-2.5">Source Name</th>
                  <th className="px-4 py-2.5">Sovereignty Coverage</th>
                  <th className="px-4 py-2.5">Sync Channel Type</th>
                  <th className="px-4 py-2.5">Health Score</th>
                  <th className="px-4 py-2.5">Last Sync stamp</th>
                  <th className="px-4 py-2.5">Total Indexed Entries</th>
                  <th className="px-4 py-2.5">Crawler Status</th>
                  <th className="px-4 py-2.5 text-right font-bold">Manual override Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {sources.map((s) => {
                  const isSyncing = syncingId === s.id;
                  return (
                    <tr key={s.id} className="hover:bg-slate-850/40 transition">
                      
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border font-mono font-black text-xs ${
                            s.status === 'Online' ? 'bg-[#FF6321]/5 border-[#FF6321]/40 text-[#FF6321]' : 'bg-slate-950 border-slate-850 text-slate-600'
                          }`}>
                            {s.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-slate-200 mt-1 block font-bold">{s.name}</span>
                            <span className="text-[9px] text-slate-500 block">Sovereign Agency API</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 font-bold text-slate-300">{s.country}</td>
                      <td className="px-4 py-3.5 text-slate-450 font-mono text-[10px]">{s.type}</td>
                      
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Heart className={`h-3 w-3 ${s.healthScore > 90 ? 'text-emerald-400' : 'text-amber-500'}`} />
                          <span className={`font-mono font-bold ${s.healthScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {s.healthScore}%
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">{s.lastSync}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-300 font-bold">{s.recordsImported.toLocaleString()}</td>
                      
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => handleToggleSource(s.id)}
                          className={`px-2 py-0.5 rounded text-[8px] font-mono font-extrabold border transition ${
                            s.status === 'Online'
                              ? 'bg-emerald-950/40 border-emerald-900 text-emerald-400'
                              : 'bg-rose-950/40 border-rose-900 text-rose-400'
                          }`}
                        >
                          {s.status}
                        </button>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => handleSyncSource(s.id)}
                          disabled={isSyncing || s.status === 'Disabled'}
                          className={`px-3 py-1 bg-slate-950 border text-[10px] font-mono font-extrabold rounded-lg hover:text-[#FF6321] hover:border-[#FF6321]/60 flex items-center gap-1.5 ml-auto transition ${
                            isSyncing ? 'text-slate-500 border-slate-900' : 'text-slate-450 border-slate-850'
                          }`}
                        >
                          <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin text-[#FF6321]' : ''}`} />
                          {isSyncing ? "Connecting socket..." : "Sync Portal Now"}
                        </button>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 leading-relaxed text-xs text-slate-500 font-mono mt-4">
          💬 Note: manual sync dispatches run high-throughput Axios threads utilizing proxy load-balancers to bypass scraper filters on Uganda PPDA and Rwanda RPPA, ensuring continuous, disruption-free telemetry logs sync.
        </div>
      </div>

    </div>
  );
}
