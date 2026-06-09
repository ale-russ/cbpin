import { useState } from "react";
import {
  User,
  Building,
  ShieldCheck,
  Mail,
  MapPin,
  Award,
  Calendar,
  BarChart2,
  CheckSquare,
  Layers,
  Clock,
  Activity,
  Edit2,
} from "lucide-react";
import { systemStateInstance } from "../../../data/sampleDataset";

interface EnterpriseProfileProps {
  currentRole: string;
  savedOpportunities: string[]; // List of opportunity IDs saved
  onUnsaveOpportunity: (id: string) => void;
  onNavigateToView: (view: string, targetItem?: any) => void;
}

export default function EnterpriseProfile({
  currentRole,
  savedOpportunities,
  onUnsaveOpportunity,
  onNavigateToView,
}: EnterpriseProfileProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("Sarah Alubas");
  const [companyName, setCompanyName] = useState<string>(
    "Mugerwa Engineering & Logistics Ltd",
  );
  const [industry, setIndustry] = useState<string>(
    "Infrastructure & Transport",
  );
  const [country, setCountry] = useState<string>("Uganda");
  const [experience, setExperience] = useState<number>(12);
  const [revenueRange, setRevenueRange] = useState<string>("$10M - $25M USD");
  const [employeeCount, setEmployeeCount] = useState<number>(245);
  const [interests, setInterests] = useState<string[]>([
    "Cross-Border Heavy Trucking",
    "Oil & Gas Roadbeds",
    "Sovereign Logistics Corridor Grants",
  ]);
  const [interestsInput, setInterestsInput] = useState<string>("");
  const [certifications, setCertifications] = useState<string[]>([
    "PPDA Category A Certified Contractor (Uganda)",
    "National Supplier Database (NSD) Active - PAU",
    "ISO 9001:2015 Quality Management Standards",
    "ISO 45001 Health & Safety Standards",
  ]);
  const [newCertInput, setNewCertInput] = useState<string>("");

  // Calculate profile completion percentage based on checklist fill
  const profileCompletionPercent =
    (fullName ? 10 : 0) +
    (companyName ? 10 : 0) +
    (industry ? 10 : 0) +
    (country ? 10 : 0) +
    (experience > 0 ? 10 : 0) +
    (revenueRange ? 10 : 0) +
    (employeeCount > 0 ? 10 : 0) +
    (interests.length > 0 ? 15 : 0) +
    (certifications.length > 0 ? 15 : 0);

  const savedOppsDetails = systemStateInstance.opportunities.filter((o) =>
    savedOpportunities.includes(o.id),
  );

  const handleUpdateProfile = (e: any) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (interestsInput.trim() && !interests.includes(interestsInput.trim())) {
      setInterests([...interests, interestsInput.trim()]);
      setInterestsInput("");
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleAddCert = () => {
    if (newCertInput.trim() && !certifications.includes(newCertInput.trim())) {
      setCertifications([...certifications, newCertInput.trim()]);
      setNewCertInput("");
    }
  };

  const handleRemoveCert = (item: string) => {
    setCertifications(certifications.filter((c) => c !== item));
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Title Grid */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {/* Pulsating Glowing Profile Avatar Shield */}
            <div className="relative">
              <div className="w-16 h-16 bg-[#FF6321]/20 border-2 border-[#FF6321] rounded-full flex items-center justify-center font-black text-2xl text-[#FF6321] shadow-[0_0_15px_rgba(255,99,33,0.3)] animate-pulse-slow">
                SA
              </div>
              <span
                className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full"
                title="SaaS Sync Online"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#FF6321]/15 text-[#FF6321] font-mono font-bold px-2 py-0.5 rounded border border-[#FF6321]/30 uppercase">
                  {currentRole} Seat Active
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-mono text-slate-500">
                  MUGERWA-LOGISTICS TENANT
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mt-1">
                {fullName}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {companyName} // Lead Procurement Officer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-950 px-5 py-2 border border-slate-850 rounded-xl text-center">
              <span className="text-[9px] text-slate-500 block uppercase font-mono font-bold">
                Profile completion
              </span>
              <strong className="text-lg font-bold text-[#00FF00] font-mono">
                {profileCompletionPercent}%
              </strong>
              <div className="w-24 bg-slate-850 h-1 rounded-full overflow-hidden mt-1 mx-auto">
                <div
                  className="bg-[#00FF00] h-full"
                  style={{ width: `${profileCompletionPercent}%` }}></div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-350 hover:text-[#FF6321] hover:border-[#FF6321]/50 flex items-center gap-1.5 transition mt-auto">
              <Edit2 className="h-3.5 w-3.5" />
              {isEditing
                ? "Close Credentials Drawer"
                : "Edit Operational Profile"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* LEFT WORKSPACE: OPERATIONS FORM OR PREVIEW (col-span-8) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF6321] block tracking-widest border-b border-slate-800 pb-2">
                ✏ EDIT CORPORATE IDENTITY BLOCK
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    FULL OPERATOR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321]"
                  />
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    COMPANY INCORPORATION NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    PRIMARY SECTOR
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321] font-mono">
                    <option value="Infrastructure & Transport">
                      Infrastructure & Transport
                    </option>
                    <option value="Energy & Utilities">
                      Energy & Utilities
                    </option>
                    <option value="Digital Health & Tech">
                      Digital Health & Tech
                    </option>
                    <option value="Oil & Gas Services">
                      Oil & Gas Services
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    REGISTRY COUNTRY
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321] font-mono">
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                  </select>
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    YEARS IN SECTOR (MINIMUMS)
                  </label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(+e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    ANNUAL REVENUE RANGE
                  </label>
                  <input
                    type="text"
                    value={revenueRange}
                    onChange={(e) => setRevenueRange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321]"
                  />
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-500 font-mono">
                    ACTIVE EMPLOYEE headcount
                  </label>
                  <input
                    type="number"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(+e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs focus:outline-none focus:border-[#FF6321]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-850 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-400 border border-slate-850 rounded-lg">
                  Cancel Change Actions
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6321] text-black font-extrabold rounded-lg hover:bg-[#ff7b42]">
                  Save Corporate Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 ">
              {/* Profile details block */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-3">
                  Corporate Footprint credentials
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                    <span className="text-[9px] text-slate-500 font-mono uppercase block">
                      Sovereign Origin
                    </span>
                    <strong className="text-xs text-slate-200 mt-1 block flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-red-400" /> {country}
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                    <span className="text-[9px] text-slate-500 font-mono uppercase block">
                      Sector Expertise
                    </span>
                    <strong className="text-xs text-slate-200 mt-1 block truncate">
                      {industry}
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                    <span className="text-[9px] text-slate-500 font-mono uppercase block">
                      Industry Standing
                    </span>
                    <strong className="text-xs text-slate-200 mt-1 block font-mono">
                      {experience} Years Track
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850">
                    <span className="text-[9px] text-slate-500 font-mono uppercase block">
                      Revenue Sizing
                    </span>
                    <strong className="text-xs text-[#00FF00] mt-1 block font-mono">
                      {revenueRange}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Interests & Categories tag cloud */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-2">
                  Procurement Interests & Categories
                </span>
                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850/80 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <span
                        key={item}
                        className="bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5">
                        {item}
                        <button
                          onClick={() => handleRemoveInterest(item)}
                          className="hover:text-[#FF6321] text-slate-500 font-black text-xs">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      value={interestsInput}
                      onChange={(e) => setInterestsInput(e.target.value)}
                      placeholder="Add interest tag (e.g. smart metering)"
                      className="flex-1 bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#FF6321]"
                    />
                    <button
                      onClick={handleAddInterest}
                      className="px-3 py-1.5 bg-slate-950 text-slate-300 border border-slate-800 hover:text-[#FF6321] hover:border-[#FF6321]/50 rounded-lg font-mono text-xs">
                      + Tag
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Opportunities Table */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                    Saved Opportunity Bookmarks ({savedOppsDetails.length})
                  </span>
                  {savedOppsDetails.length > 0 && (
                    <button
                      onClick={() => onNavigateToView("Opportunities")}
                      className="text-[9px] font-mono text-[#FF6321] hover:underline">
                      Search Additional Tenders ➜
                    </button>
                  )}
                </div>

                {savedOppsDetails.length === 0 ? (
                  <div className="p-8 bg-slate-950/20 border-2 border-dashed border-slate-850 rounded-xl text-center space-y-2">
                    <CheckSquare className="h-8 w-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">
                      No opportunities bookmarked yet.
                    </p>
                    <button
                      onClick={() => onNavigateToView("Opportunities")}
                      className="text-xs font-mono text-[#FF6321] bg-[#FF6321]/15 px-3.5 py-1.5 rounded-lg border border-[#FF6321]/30 hover:bg-[#FF6321]/25 transition">
                      Open Tender Discovery Engine
                    </button>
                  </div>
                ) : (
                  <div className="border border-slate-850 bg-slate-950 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left text-slate-300">
                      <thead className="bg-slate-900 text-[9px] font-mono text-slate-500 uppercase border-b border-slate-850">
                        <tr>
                          <th className="px-4 py-2.5">Tender ID</th>
                          <th className="px-4 py-2.5">Title</th>
                          <th className="px-4 py-2.5">Sovereignty</th>
                          <th className="px-4 py-2.5">Value (USD)</th>
                          <th className="px-4 py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850">
                        {savedOppsDetails.map((opp) => (
                          <tr
                            key={opp.id}
                            className="hover:bg-slate-900/40 transition">
                            <td className="px-4 py-3 font-mono text-slate-100 font-bold">
                              {opp.id}
                            </td>
                            <td className="px-4 py-3 max-w-xs truncate text-slate-300 font-medium">
                              {opp.title}
                            </td>
                            <td className="px-4 py-3 text-slate-450 font-mono text-[11px]">
                              {opp.country}
                            </td>
                            <td className="px-4 py-3 text-[#00FF00] font-mono font-bold">
                              ${(opp.budgetUSD / 1000000).toFixed(2)}M
                            </td>
                            <td className="px-4 py-3 text-right space-x-1.5">
                              <button
                                onClick={() =>
                                  onNavigateToView("Opportunities", opp)
                                }
                                className="px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800 rounded font-mono text-[9px] hover:text-[#FF6321] hover:border-[#FF6321]/40">
                                Review
                              </button>
                              <button
                                onClick={() => onUnsaveOpportunity(opp.id)}
                                className="px-2 py-0.5 bg-rose-950/20 text-rose-400 border border-rose-900/40 rounded font-mono text-[9px] hover:bg-rose-950/50">
                                Unsave
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT WORKSPACE: STATS & BUSINESS CERTIFICATIONS (col-span-4) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-6 flex flex-col justify-between h-full min-h-[500px]">
          <div className="space-y-6">
            {/* Certifications and Vettings */}
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-3">
                Industry Certifications Verified
              </span>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-3 bg-slate-950 border border-slate-850 rounded-lg flex justify-between items-start text-xs font-mono">
                    <div className="flex gap-2 items-start">
                      <Award className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 leading-tight">
                        {cert}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveCert(cert)}
                      className="text-slate-500 hover:text-red-400 text-sm font-bold pl-1">
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex lg:flex-col gap-2 text-xs mt-3">
                <input
                  type="text"
                  value={newCertInput}
                  onChange={(e) => setNewCertInput(e.target.value)}
                  placeholder="Upload verification cert (e.g. ISO 9001)"
                  className="flex-1 bg-slate-950 border border-slate-850 px-3 py-2 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#FF6321]"
                />
                <button
                  onClick={handleAddCert}
                  className="p-3 bg-slate-950 text-slate-300 border border-slate-800 hover:text-[#FF6321] hover:border-[#FF6321]/50 rounded-lg font-mono text-xs cursor-pointer">
                  + Add
                </button>
              </div>
            </div>

            {/* Account Metadata parameters */}
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-3">
                Tenant Portal Information
              </span>
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-850 space-y-3 font-mono text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Ring:</span>{" "}
                  <span className="text-[#00FF00]">ONLINE // EAC PORTAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Node Location:</span>{" "}
                  <span className="text-slate-200">Kampala Central</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verification Hash:</span>{" "}
                  <span className="text-sky-400">CPIN-240-EAFRICA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Licensing Plan:</span>{" "}
                  <span className="text-amber-500">{currentRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered seats:</span>{" "}
                  <span className="text-slate-200">3 of 5 seats used</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[10px] text-slate-500 font-mono leading-relaxed mt-auto">
            ⚡ CPIN verified contractors are pre-screened under standard OECD
            Anti-bribery guidelines and legal registration directives.
          </div>
        </div>
      </div>
    </div>
  );
}
