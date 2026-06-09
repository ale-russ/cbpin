import { useState } from 'react';
import { mockOpportunities } from '../../../data/mockOpportunities';
import { Opportunity } from '../../../shared/types';
import { Sparkles, Users, UserPlus, ShieldCheck, CheckCircle2, Award, ClipboardList, Info, HelpCircle } from 'lucide-react';

interface PartnerRecommendation {
  role: 'Engineering Partner' | 'Logistics Partner' | 'Construction/Local Partner' | 'Financial Underwriter' | 'Digital/ICT Partner';
  companyName: string;
  capabilityMatch: number; // 0-100
  trustScore: number; // 0-100
  geographicCoverage: string;
  previousProjectExperience: string;
  reasonForRec: string;
}

export default function ConsortiumEngine() {
  const [activeOpt, setActiveOpt] = useState<Opportunity>(mockOpportunities[0]);
  const [createdConsortium, setCreatedConsortium] = useState<boolean>(false);
  const [biddingTeam, setBiddingTeam] = useState<string[]>([]);

  // Derived recommendation generator based on sector
  const getPartnerRecommendations = (opt: Opportunity): PartnerRecommendation[] => {
    if (opt.sector.includes('Infrastructure') || opt.sector.includes('Oil')) {
      return [
        {
          role: 'Engineering Partner',
          companyName: 'East African Technical Fab Systems',
          capabilityMatch: 95,
          trustScore: 92,
          geographicCoverage: 'Uganda, Kenya, Tanzania',
          previousProjectExperience: 'EACOP pressure pipeline welding layout',
          reasonForRec: 'Holds active PAU National Supplier Database (NSD) license and ASME certifications.'
        },
        {
          role: 'Logistics Partner',
          companyName: 'Mugerwa Engineering & Logistics Ltd',
          capabilityMatch: 88,
          trustScore: 95,
          geographicCoverage: 'Uganda, Rwanda, South Sudan',
          previousProjectExperience: 'Karuma Hydroelectric heavy-haul equipment deliveries',
          reasonForRec: 'Owns 35+ specialized heavy-haul hydraulic multi-axle trailers.'
        },
        {
          role: 'Construction/Local Partner',
          companyName: 'Buliisa Community Excavators Group',
          capabilityMatch: 80,
          trustScore: 85,
          geographicCoverage: 'Uganda (Albertine)',
          previousProjectExperience: 'Albertine Graben seismic camp preparation logistics',
          reasonForRec: 'Satisfies 40% local content requirement with 100% locally hired labor footprint.'
        }
      ];
    } else if (opt.sector.includes('Energy') || opt.sector.includes('Refugee')) {
      return [
        {
          role: 'Engineering Partner',
          companyName: 'Kampala Solar Installations & Tech Ltd',
          capabilityMatch: 98,
          trustScore: 96,
          geographicCoverage: 'Uganda, Kenya, South Sudan',
          previousProjectExperience: 'UNHCR Kyangwali 500kW Solar Hybrid Micro-grid deployment',
          reasonForRec: 'Pre-certified contractor status for refugee programs with certified clean-energy metrics.'
        },
        {
          role: 'Logistics Partner',
          companyName: 'Arua Corridor Express Logistics',
          capabilityMatch: 92,
          trustScore: 89,
          geographicCoverage: 'Uganda, DRC, South Sudan',
          previousProjectExperience: 'WFP refugee support food transport runs to Bidi Bidi and Juba',
          reasonForRec: 'Pre-cleared border transit corridors with immediate customs facilitation licenses.'
        },
        {
          role: 'Financial Underwriter',
          companyName: 'Stanbic Bank Uganda (Surety Panel)',
          capabilityMatch: 100,
          trustScore: 98,
          geographicCoverage: 'EAC region wide',
          previousProjectExperience: 'Issued bid guarantees for 12 major public structural tenders',
          reasonForRec: 'Approved tier-1 guarantee issuing house accepted immediately by UNHCR / African Development Bank.'
        }
      ];
    } else {
      return [
        {
          role: 'Digital/ICT Partner',
          companyName: 'Sybrin Kenya System Integrators',
          capabilityMatch: 96,
          trustScore: 94,
          geographicCoverage: 'Kenya, Uganda, Rwanda',
          previousProjectExperience: 'Universal Health Registry Cloud interoperability for Kiambu county',
          reasonForRec: 'Specialists in FHIR medical database connectors with pre-configured health structures.'
        },
        {
          role: 'Financial Underwriter',
          companyName: 'NCBA Group Kenya S.A.',
          capabilityMatch: 95,
          trustScore: 95,
          geographicCoverage: 'EAC region wide',
          previousProjectExperience: 'Underwrote Safaricom governmental digitization tenders',
          reasonForRec: 'Rapid bid bond issuance within 24 hours backed by substantial local collateral reserves.'
        }
      ];
    }
  };

  const recommendations = getPartnerRecommendations(activeOpt);

  const handleTogglePartner = (company: string) => {
    if (biddingTeam.includes(company)) {
      setBiddingTeam(biddingTeam.filter(c => c !== company));
    } else {
      setBiddingTeam([...biddingTeam, company]);
    }
  };

  const handleFinalizeConsortium = () => {
    setCreatedConsortium(true);
    setTimeout(() => {
      setCreatedConsortium(false);
      setBiddingTeam([]);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Consortium Intro banner */}
      <div className="bg-gradient-to-r from-violet-950/40 via-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <span className="text-xs text-violet-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1 animate-pulse">
            ⚡ CPIN PARTNERSHIP ENGINE
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Consortium & Joint Venture Recommendation Engine</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Increase your win-probability to 85%+ by coupling your local operational base with pre-evaluated engineering, logistics, and financial contractors representing perfect compliance indicators.
          </p>
        </div>
      </div>

      {/* CHOOSE OPPORTUNITY SUBSECTION */}
      <div>
        <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block font-bold mb-3">1. Select Destination Opportunity To Optimize</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockOpportunities.slice(0, 3).map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                setActiveOpt(opt);
                setBiddingTeam([]);
              }}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                activeOpt.id === opt.id
                  ? 'bg-slate-950 border-violet-500/80 shadow-[0_0_12px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/20'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-900/60'
              }`}
            >
              <span className="font-mono text-[9px] text-slate-500 font-bold block">{opt.id}</span>
              <h4 className="font-bold text-slate-200 mt-1.5 text-xs truncate">{opt.title}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{opt.buyer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED PARTNERS PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        
        {/* Left span 2: Partner selection list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block font-bold">2. Pre-Scored Complementary Matches</label>
            <span className="text-[9px] font-mono text-violet-400">COMBINED COMPLIANCE SCORE: AA LEVEL</span>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec) => {
              const isSelected = biddingTeam.includes(rec.companyName);
              return (
                <div 
                  key={rec.companyName}
                  onClick={() => handleTogglePartner(rec.companyName)}
                  className={`bg-slate-900 border p-4 rounded-xl cursor-pointer transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                    isSelected 
                      ? 'border-violet-500 bg-slate-950 shadow-[inset_0_0_8px_rgba(139,92,246,0.05)]' 
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-violet-950/40 border border-violet-900/30 text-violet-300 font-bold uppercase select-none">{rec.role}</span>
                      <span className="text-[10px] text-slate-500 font-bold font-mono">COVERAGE: {rec.geographicCoverage}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-150">{rec.companyName}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">Recommended because: {rec.reasonForRec}</p>
                    
                    <p className="text-[10px] text-slate-500">
                      Previous Experience: <strong className="text-slate-350">{rec.previousProjectExperience}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-950">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block font-mono">CAPABILITY</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">{rec.capabilityMatch}% Match</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block font-mono">TRUST SCORE</span>
                      <span className="text-xs font-bold font-mono text-slate-200">{rec.trustScore}/100</span>
                    </div>

                    <div className={`p-1.5 rounded-full border transition ${
                      isSelected ? 'bg-violet-500 text-black border-violet-400' : 'bg-slate-950 border-slate-850 text-slate-600'
                    }`}>
                      <UserPlus className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right span 1: Consortium Builder sidebar panel */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl h-fit flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2.5 border-b border-slate-850 flex items-center gap-1">
              <ClipboardList className="h-4 w-4 text-violet-400" /> Joint-Venture Coordinator
            </h3>

            {biddingTeam.length === 0 ? (
              <div className="text-center py-10 text-slate-500 space-y-2">
                <Users className="h-8 w-8 text-slate-600 mx-auto" />
                <p className="text-[11px] leading-relaxed">
                  Select complementary partner candidates on the list to draft your joint bidding consortium.
                </p>
              </div>
            ) : (
              <div className="space-y-4 my-4">
                <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider">Active Consortium Candidates</span>
                <div className="space-y-2">
                  {biddingTeam.map((company) => (
                    <div key={company} className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-850 text-xs">
                      <span className="text-slate-300 font-bold truncate">{company}</span>
                      <button 
                        onClick={() => handleTogglePartner(company)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-violet-955/10 border border-violet-900/30 rounded text-[11px] text-slate-400 leading-normal">
                  💡 This consortium satisfies <strong className="text-slate-200">100% of both the local and technical compliance conditions</strong> needed to safely execute the selected contract.
                </div>

                <button
                  onClick={handleFinalizeConsortium}
                  className="w-full bg-violet-500 hover:bg-violet-400 font-bold text-black py-2.5 rounded text-xs transition duration-150 shadow-[0_0_15px_rgba(139,92,246,0.2)] mt-2"
                >
                  Create Bidding Consortium
                </button>
                <p className="text-[8px] text-slate-500 text-center font-mono uppercase tracking-widest mt-1">Saves layout template in profile</p>
              </div>
            )}
          </div>

          {/* Toast-style successful consortium creation overlay */}
          {createdConsortium && (
            <div className="mt-4 p-4 bg-emerald-950/60 border border-emerald-900 rounded-lg text-xs leading-normal space-y-2 animate-bounce">
              <div className="flex gap-1.5 items-center text-emerald-400 font-bold text-[11px] uppercase">
                <CheckCircle2 className="h-4 w-4" /> CONSORTIUM STABILITY VERIFIED
              </div>
              <p className="text-slate-350 text-[10px]">
                Joint-Venture legal covenants generated based on World Bank and Ugandan PPDA guidelines. Tender bid guarantee files sent to underwriter.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
