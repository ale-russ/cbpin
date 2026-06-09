import { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  Mail,
  CheckCircle,
  Activity,
  Calendar,
  Lock,
} from "lucide-react";
import { systemStateInstance, TeamMember } from "../../../data/sampleDataset";

export default function TeamManagement() {
  const [team, setTeam] = useState<TeamMember[]>(
    systemStateInstance.teamMembers,
  );
  const [inviteName, setInviteName] = useState<string>("");
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<
    | "Guest"
    | "SME User"
    | "Professional User"
    | "Enterprise User"
    | "Administrator"
  >("Professional User");

  const [notification, setNotification] = useState<string | null>(null);

  // Dynamic interactive operational variables (Point 5 PM Checklist)
  const [allocatedSeatsCount, setAllocatedSeatsCount] = useState<number>(10);
  const [sessionLogs, setSessionLogs] = useState([
    {
      id: "SESS-1",
      device: "Security Shell Chrome, Mac OS X",
      location: "Kampala, Uganda",
      ip: "197.239.4.12",
      pingTime: "Connected 4m ago",
    },
    {
      id: "SESS-2",
      device: "Mobile App Mobilizer, Android",
      location: "Nairobi, Kenya",
      ip: "105.12.89.41",
      pingTime: "Connected 2h ago",
    },
    {
      id: "SESS-3",
      device: "Consortium Secure Terminal Linux",
      location: "Dar es Salaam, Tanzania",
      ip: "41.220.10.8",
      pingTime: "Connected 1d ago",
    },
  ]);

  const handleRevokeSession = (sessionId: string, deviceName: string) => {
    setSessionLogs(sessionLogs.filter((s) => s.id !== sessionId));

    // Commit to audit logs
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Current Supervisor",
      role: "Enterprise Operator",
      action: `Revoked secure active node session: ${deviceName}`,
      status: "WARN",
      ipAddress: "197.239.4.12",
      region: "Kampala, Uganda",
    });

    setNotification(
      `🚨 SECURITY KEY DISPATCH REFUSED: SESSION TERMINATED FOR ${deviceName}`,
    );
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInvite = (e: any) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newMember: TeamMember = {
      id: `TEAM-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      addedAt: new Date().toISOString().split("T")[0],
    };

    setTeam([...team, newMember]);
    setInviteName("");
    setInviteEmail("");

    // Add custom audit log
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Current Supervisor",
      role: "Enterprise Operator",
      action: `Invited new team member: ${inviteName} (${inviteRole})`,
      status: "SUCCESS",
      ipAddress: "197.239.4.12",
      region: "Kampala, Uganda",
    });

    setNotification(`✔ INVITATION SENT SUCCESSFULLY TO ${inviteEmail}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemove = (id: string, name: string) => {
    setTeam(team.filter((t) => t.id !== id));

    // Log deletion action
    systemStateInstance.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: "Just Now",
      user: "Current Supervisor",
      role: "Enterprise Operator",
      action: `Removed team member: ${name}`,
      status: "WARN",
      ipAddress: "197.239.4.12",
      region: "Kampala, Uganda",
    });
  };

  const handleRoleToggle = (id: string, newRole: any) => {
    setTeam(
      team.map((t) => {
        if (t.id === id) {
          return { ...t, role: newRole };
        }
        return t;
      }),
    );
  };

  // Matrix of role capabilities
  const permissionsMatrix = [
    {
      cap: "View Limited Tenders",
      guest: true,
      sme: true,
      pro: true,
      ent: true,
      admin: true,
    },
    {
      cap: "Search full 500+ Indices",
      guest: false,
      sme: true,
      pro: true,
      ent: true,
      admin: true,
    },
    {
      cap: "Receive SMS/Email Alerts",
      guest: false,
      sme: true,
      pro: true,
      ent: true,
      admin: true,
    },
    {
      cap: "Inspect Opportunity Match Scores",
      guest: false,
      sme: false,
      pro: true,
      ent: true,
      admin: true,
    },
    {
      cap: "Access Regional Predictive Forecasts",
      guest: false,
      sme: false,
      pro: true,
      ent: true,
      admin: true,
    },
    {
      cap: "Geospatial Spatial Transit Maps",
      guest: false,
      sme: false,
      pro: false,
      ent: true,
      admin: true,
    },
    {
      cap: "B2B Subcontractor Graph Relations",
      guest: false,
      sme: false,
      pro: false,
      ent: true,
      admin: true,
    },
    {
      cap: "System Audit Logs Override",
      guest: false,
      sme: false,
      pro: false,
      guestAllowed: false,
      admin: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {notification && (
        <div className="bg-emerald-950 border border-emerald-400 p-4 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-400">
          <span>{notification}</span>
          <span className="text-slate-500 text-[10px]">
            VERIFIED GATEWAY APPROVED
          </span>
        </div>
      )}

      {/* Title block */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-violet-950 text-violet-400 font-mono font-bold px-2 py-0.5 rounded border border-violet-900 uppercase">
                Secure Team Workspace
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-mono text-slate-500">
                Corporate Seat Administrator
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-1">
              Multi-Seat Team Management Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Invite teammates, assign granular role weights, check verification
              status, and audit active operations in real-time. Enterprise seats
              allow up to 5 concurrent operator logs.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* LEFT WORKSPACE: ACTIVE OPERATOR ROSTER (col-span-8) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[550px]">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">
              ACTIVE SEAT SUBSCRIBERS
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-[9px] font-mono text-slate-500 uppercase border-b border-slate-850">
                  <tr>
                    <th className="px-4 py-2.5">Teammate</th>
                    <th className="px-4 py-2.5">Email Registry</th>
                    <th className="px-4 py-2.5">Role Level</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5">Added Date</th>
                    <th className="px-4 py-2.5 text-right font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {team.map((mem) => (
                    <tr
                      key={mem.id}
                      className="hover:bg-slate-850/40 transition">
                      <td className="px-4 py-3 font-semibold text-slate-200">
                        {mem.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                        {mem.email}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={mem.role}
                          onChange={(e) =>
                            handleRoleToggle(mem.id, e.target.value as any)
                          }
                          className="bg-slate-950 border border-slate-850 rounded px-2 py-1 text-[11px] text-[#FF6321] font-mono font-bold focus:outline-none">
                          <option value="Guest">Guest</option>
                          <option value="SME User">SME User</option>
                          <option value="Professional User">
                            Professional User
                          </option>
                          <option value="Enterprise User">
                            Enterprise User
                          </option>
                          <option value="Administrator">Administrator</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold ${
                            mem.status === "Active"
                              ? "bg-emerald-950/50 border border-emerald-900 text-emerald-400"
                              : "bg-amber-950/50 border border-amber-900 text-amber-500 animate-pulse"
                          }`}>
                          {mem.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-[10px]">
                        {mem.addedAt}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemove(mem.id, mem.name)}
                          className="text-slate-500 hover:text-red-400 transition p-1 rounded hover:bg-slate-950"
                          title="Revoke and Delete Access">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DYNAMIC ACTIVE SESSION MONITORS (Point 5 PM checklist) */}
          <div className="mt-6 bg-slate-950/80 p-4 rounded-xl border border-slate-850 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-900 select-none">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase">
                ● Concurrently Logged Devices Directory Audit
              </span>
              <span className="text-[9px] text-[#00FF00] font-bold animate-pulse">
                GATEWAY SHELL SHIELD SYNCED
              </span>
            </div>

            {sessionLogs.length === 0 ? (
              <p className="text-slate-500 text-center py-2 text-[11px]">
                No active concurrent keys mapped. Strict isolated state secure.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sessionLogs.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-2.5 bg-slate-900 rounded border border-slate-500 flex flex-col justify-between hover:border-amber-900/30 transition">
                    <div>
                      <div className="flex justify-between items-start text-[9.5px]">
                        <strong
                          className="text-slate-200 truncate pr-2"
                          title={sess.device}>
                          {sess.device}
                        </strong>
                        <span className="text-slate-500 shrink-0 text-[9px]">
                          {sess.pingTime}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-slate-450 block mt-1">
                        {sess.location}
                      </span>
                      <code className="text-[9.5px] text-[#FF6321] block mt-1">
                        {sess.ip}
                      </code>
                    </div>
                    <button
                      onClick={() => handleRevokeSession(sess.id, sess.device)}
                      className="mt-3 w-full py-1 text-[9.5px] font-bold bg-[#ff4a4a]/10 hover:bg-[#ff4a4a] text-[#ff4a4a] hover:text-black border border-[#ff4a4a]/20 rounded transition uppercase text-center cursor-pointer">
                      Revoke Agent Node
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT WORKSPACE: DISPATCH ACCESS KEY / INVITE FORM (col-span-4) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Invite form */}
          <form
            onSubmit={handleInvite}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold border-b border-slate-800 pb-2">
              ✉ DISPATCH TOKEN INVITATION
            </span>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-500 font-mono uppercase">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Operator complete first & last"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#FF6321]"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-500 font-mono uppercase">
                Master Business Email
              </label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="verified partner organization domain"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#FF6321]"
              />
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-500 font-mono uppercase block">
                Authority Level
              </label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-[#FF6321] font-mono font-bold focus:outline-none">
                <option value="Guest">Guest</option>
                <option value="SME User">SME User (Tenders only)</option>
                <option value="Professional User">
                  Professional User (+Forecasts)
                </option>
                <option value="Enterprise User">
                  Enterprise User (+Map & Graphs)
                </option>
                <option value="Administrator">
                  Administrator (Terminal Admin)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#FF6321] text-black font-extrabold text-xs rounded-lg hover:bg-[#ff7b42] flex items-center justify-center gap-1.5 transition text-center uppercase">
              <UserPlus className="h-3.5 w-3.5" /> Invite New Seat Profile
            </button>
          </form>

          {/* DYNAMIC INTERACTIVE MULTI-SEAT FEE CALCULATOR (Point 5 PM Checklist) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3">
            <span className="text-[10px] text-[#FF6321] uppercase tracking-widest block font-bold border-b border-slate-800 pb-1.5">
              📊 SEATS VOLUME CONFIGURATOR
            </span>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-150">
                <span>Total Workspace Seats:</span>
                <span className="text-emerald-400">
                  {allocatedSeatsCount} Seats
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={allocatedSeatsCount}
                onChange={(e) =>
                  setAllocatedSeatsCount(parseInt(e.target.value))
                }
                className="w-full accent-[#FF6321] cursor-pointer mt-1 bg-slate-950 h-1.5 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] text-slate-550 pt-0.5">
                <span>Base (5 Seats)</span>
                <span>Max Capacity (50 Seats)</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[10.5px] leading-relaxed text-slate-400 space-y-1">
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Base Tier Provision:</span>
                <span>Included ($0.00)</span>
              </div>
              <div className="flex justify-between">
                <span>Triumph Seats Added:</span>
                <span>{allocatedSeatsCount - 5} × $20/mo</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 pt-1 mt-1 font-bold text-[#FF6321]">
                <span>Workspace Incremental cost:</span>
                <span>${(allocatedSeatsCount - 5) * 20}.00/mo</span>
              </div>
            </div>
          </div>

          {/* Mini Permissions Matrix table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-3">
              ROLE RE-DEPLOYMENT MATRIX
            </span>
            <div className="space-y-2.5">
              {permissionsMatrix.slice(0, 5).map((pm, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-[11px] border-b border-slate-850/60 pb-1.5">
                  <span className="text-slate-400 font-mono leading-tight">
                    {pm.cap}
                  </span>
                  <div className="flex gap-1">
                    <span
                      className={`px-1 py-0.5 rounded text-[8px] font-mono ${pm.sme ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/40" : "bg-slate-950 text-slate-600"}`}>
                      SME
                    </span>
                    <span
                      className={`px-1 py-0.5 rounded text-[8px] font-mono ${pm.pro ? "bg-amber-950/30 text-amber-500 border border-amber-900/40" : "bg-slate-950 text-slate-600"}`}>
                      PRO
                    </span>
                    <span
                      className={`px-1 py-0.5 rounded text-[8px] font-mono ${pm.ent ? "bg-violet-950/30 text-violet-400 border border-violet-900/40" : "bg-slate-950 text-slate-600"}`}>
                      ENT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
