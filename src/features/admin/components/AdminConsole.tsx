import { useState } from 'react';
import { Terminal, Shield, RefreshCw, Layers, CheckSquare, Trash2, Heart, Database, AlertCircle, Sparkles } from 'lucide-react';
import { systemStateInstance, AuditLogItem } from '../../../data/sampleDataset';

interface AdminConsoleProps {
  currentRole: string;
  onRoleChange: (newRole: 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator') => void;
}

export default function AdminConsole({ currentRole, onRoleChange }: AdminConsoleProps) {
  const [logs, setLogs] = useState<AuditLogItem[]>(systemStateInstance.auditLogs);
  const [users, setUsers] = useState([
    { id: "U-201", name: "Sarah Alubas", email: "sarah.alubas@mugerwa.com", tenant: "Mugerwa Eng Ltd", role: "SME User", status: "Active" },
    { id: "U-202", name: "Johnstone Kiprop", email: "john@eldoretlogistics.co.ke", tenant: "Eldoret Logistics", role: "Professional User", status: "Active" },
    { id: "U-203", name: "Therese Umuraza", email: "t.umuraza@kigalitrade.rw", tenant: "Kigali Agri trade", role: "Enterprise User", status: "Active" },
    { id: "U-204", name: "Marcus Baker", email: "marcus@unops-supply.org", tenant: "UNOPS Eastern Hub", role: "Guest", status: "Active" }
  ]);
  const [isReindexing, setIsReindexing] = useState<boolean>(false);
  const [isFlushingCache, setIsFlushingCache] = useState<boolean>(false);
  const [cacheProgress, setCacheProgress] = useState<number>(0);
  const [indexProgress, setIndexProgress] = useState<number>(0);

  const handleReindex = () => {
    setIsReindexing(true);
    setIndexProgress(0);
    // Simulating progress index increments
    const interval = setInterval(() => {
      setIndexProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReindexing(false);
          // Add log item
          const newLog: AuditLogItem = {
            id: `LOG-${Date.now()}`,
            timestamp: "Just Now",
            user: "SYSTEM DEAMON",
            role: "Daemon Sync",
            action: "Flushed and rebuilt Elaticsearch indices on 182,500 record vertices.",
            status: "SUCCESS",
            ipAddress: "127.0.0.1",
            region: "Interal Cache"
          };
          setLogs(prevLogs => [newLog, ...prevLogs]);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const handleFlushCache = () => {
    setIsFlushingCache(true);
    setCacheProgress(0);
    const interval = setInterval(() => {
      setCacheProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsFlushingCache(false);
          const newLog: AuditLogItem = {
            id: `LOG-${Date.now()}`,
            timestamp: "Just Now",
            user: "SYSTEM DEAMON",
            role: "Redis Master",
            action: "Flushed Redis Cache memory blocks. Freed 4.2 GB buffers.",
            status: "SUCCESS",
            ipAddress: "127.0.0.1",
            region: "Core Memory Engine"
          };
          setLogs(prev => [newLog, ...prev]);
          return 100;
        }
        return p + 25;
      });
    }, 300);
  };

  const handleUserRoleChange = (userId: string, newRole: any) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    }));
    // If the changed user is Sarah, keep in sync with active app role
    if (userId === 'U-201') {
      onRoleChange(newRole);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Stats overview row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 block font-mono">SAAS RECURRING REVENUE</span>
          <span className="text-xl font-bold font-mono text-emerald-400 block mt-1">
            $124,500 <span className="text-[10px] text-slate-500">ARR</span>
          </span>
          <span className="text-[9px] text-[#00FF00] block mt-1 font-mono">📈 +18% Quarter growth rate</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 block font-mono">ELASTICSEARCH INDEX SIZE</span>
          <span className="text-xl font-bold font-mono text-slate-100 block mt-1">
            182,500 <span className="text-[10px] text-slate-500">records</span>
          </span>
          <span className="text-[9px] text-slate-500 block mt-1 font-mono">Average latency 12 milliseconds</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 block font-mono">CLUSTER CPU INSTANCE</span>
          <span className="text-xl font-bold font-mono text-[#FF9E00] block mt-1">
            2.8% <span className="text-[10px] text-slate-500">utilization</span>
          </span>
          <span className="text-[9px] text-slate-400 block mt-1 font-mono">VCPU count: 32 hyper-threaded nodes</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 block font-mono">NETWORK SECURITY STATE</span>
          <span className="text-xl font-bold font-mono text-sky-400 block mt-1">
            WAF Active
          </span>
          <span className="text-[9px] text-emerald-400 block mt-1 font-mono">Secure Shield: Zero breach incidents</span>
        </div>

      </div>

      {/* ADMIN CONTROLS OVERRIDE PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* User Account Registry Overrides (col-span-8) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[500px]">
          <div>
            <div className="pb-3 border-b border-slate-800 flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF6321] uppercase">🛡️ SAAS SEATS OVERRIDE MANAGER</span>
              <span className="text-[9px] font-mono text-slate-500">TENANT SEATS METRIC CONTROL</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#050505] text-[9px] font-mono text-slate-500 uppercase border-b border-slate-850">
                  <tr>
                    <th className="px-4 py-2.5">User Identity</th>
                    <th className="px-4 py-2.5">Registered Tenant Address</th>
                    <th className="px-4 py-2.5">Seat Plan Authority</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5 text-right font-bold">Actions override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-850/40 transition">
                      <td className="px-4 py-3">
                        <span className="text-slate-100 font-bold block">{user.name}</span>
                        <span className="text-[10px] text-slate-450 font-mono">{user.email}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-350">{user.tenant}</td>
                      <td className="px-4 py-3 font-mono text-[11px]">
                        <select
                          value={user.role}
                          onChange={(e) => handleUserRoleChange(user.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-slate-300 font-bold font-mono focus:outline-none"
                        >
                          <option value="Guest">Guest / Free</option>
                          <option value="SME User">SME User</option>
                          <option value="Professional User">Professional User</option>
                          <option value="Enterprise User">Enterprise User</option>
                          <option value="Administrator">Administrator</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px]">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${
                          user.status === 'Active' 
                            ? 'bg-emerald-950/50 border border-emerald-900 text-emerald-400'
                            : 'bg-rose-950/50 border border-rose-900 text-rose-400 animate-pulse'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-2.5 py-1 border text-[9px] font-mono font-bold rounded-lg transition ${
                            user.status === 'Active'
                              ? 'bg-rose-950/20 border-rose-900/40 text-rose-400 hover:bg-rose-950/40'
                              : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/40'
                          }`}
                        >
                          {user.status === 'Active' ? "Suspend Operator" : "Approve seat"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[10px] text-slate-500 font-mono leading-normal">
            🔔 Note: Altering "Sarah Alubas" updates the primary simulated session role instantly. Use this to simulate Guest or SME user lock indicators.
          </div>
        </div>

        {/* System Re-indexing commands (col-span-4) */}
        <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[500px]">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">
              RE-INDEX & CACHE COMMANDS
            </span>

            {/* Elasticsearch reindexing widget */}
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3.5 mb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <strong className="text-xs text-slate-200">Elasticsearch 8 Indices</strong>
                  <p className="text-[9px] text-slate-500 font-mono">182.5K Document nodes</p>
                </div>
                <Database className="h-4 w-4 text-[#FF6321]" />
              </div>

              {isReindexing ? (
                <div className="space-y-1 mt-2 font-mono">
                  <div className="flex justify-between text-[10px] text-[#FF6321]">
                    <span>Compiling query maps...</span>
                    <span>{indexProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#FF6321] h-full" style={{ width: `${indexProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleReindex}
                  className="w-full py-1.5 bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-350 rounded-lg hover:text-[#FF6321] hover:border-[#FF6321]/50 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Re-index Clusters
                </button>
              )}
            </div>

            {/* Redis Cache flushing widget */}
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3.5">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <strong className="text-xs text-slate-200">In-Memory Redis Cache</strong>
                  <p className="text-[9px] text-slate-500 font-mono">Active Memory: 4.2 GB</p>
                </div>
                <Layers className="h-4 w-4 text-sky-400" />
              </div>

              {isFlushingCache ? (
                <div className="space-y-1 mt-2 font-mono">
                  <div className="flex justify-between text-[10px] text-sky-400">
                    <span>Expunging buffer blocks...</span>
                    <span>{cacheProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full" style={{ width: `${cacheProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleFlushCache}
                  className="w-full py-1.5 bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-350 rounded-lg hover:text-sky-450 hover:border-sky-400/50 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Flush Cache Memory
                </button>
              )}
            </div>
          </div>

          <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 text-[#9e7bff] font-mono leading-relaxed text-[10px] rounded-lg">
            ⚡ AUTOMATION: Docker container node clusters are preconfigured with AutoScaler triggers, scaling out new replicas if index querying times exceed 45ms.
          </div>
        </div>

      </div>

      {/* SYSTEM SECURE EVENT LOGS (col-span-12) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
        <div className="pb-3 border-b border-slate-800 flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#00FF00]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#00FF00] uppercase">
              REAL-TIME SECURE SYSTEM MONITOR LOGGER
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">
            ● Streaming active sockets...
          </span>
        </div>

        <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl font-mono text-xs overflow-y-auto h-48 custom-scroll text-slate-300 leading-6">
          {logs.map((log) => (
            <div key={log.id} className="border-b border-slate-900/60 pb-1 flex justify-between flex-wrap gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">[{log.timestamp}]</span>{" "}
                <span className="text-sky-400 font-bold">{log.user}</span>{" "}
                <span className="text-slate-400 font-mono italic">({log.role})</span>{" "}
                <span className="text-slate-300">{log.action}</span>
              </div>
              <div className="text-right">
                <span className={`px-1 rounded text-[8px] font-bold mr-2 ${
                  log.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-amber-950 text-amber-500 border border-amber-900'
                }`}>{log.status}</span>
                <span className="text-slate-500 text-[10px]">{log.ipAddress} ({log.region})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
