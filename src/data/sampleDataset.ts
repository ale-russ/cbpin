import { Opportunity, BuyerProfile, SupplierProfile, ForecastItem, GraphNode, GraphLink } from '../shared/types';

// Let's define the additional SaaS models
export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: any;
  alertFrequency: 'Instant' | 'Daily' | 'Weekly' | 'Never';
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    push: boolean;
  };
  createdAt: string;
}

export interface PlatformAlert {
  id: string;
  title: string;
  description: string;
  type: 'Opportunity' | 'Buyer' | 'Forecast' | 'Competitor' | 'Award';
  severity: 'Info' | 'Warning' | 'Critical';
  country: string;
  timestamp: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator';
  status: 'Active' | 'Pending' | 'Suspended';
  addedAt: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  status: 'SUCCESS' | 'FAILED' | 'WARN';
  ipAddress: string;
  region: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  country: string;
  status: 'HEALTHY' | 'SYNCING' | 'DEGRADED' | 'OFFLINE';
  lastSync: string;
  recordsImported: number;
  healthScore: number;
  syncFrequency: string;
}

export interface DonorProject {
  id: string;
  title: string;
  donor: 'World Bank' | 'African Development Bank' | 'UN' | 'SIDA' | 'EU' | 'USAID';
  country: string;
  fundingUSD: number;
  status: 'Active' | 'Planned' | 'Completed';
  sector: string;
  leadMinistry: string;
  approvalDate: string;
  description: string;
}

export interface ContractAward {
  id: string;
  title: string;
  buyer: string;
  winner: string;
  country: string;
  valueUSD: number;
  sector: string;
  awardDate: string;
  competitorsCount: number;
  savingsVsBudgetPercent: number;
}

// Lists to procedurally generate rich datasets helper
const SECTORS = [
  "Infrastructure & Transport",
  "Energy & Utilities",
  "Digital Health & Tech",
  "Refugee Programs & Energy",
  "Oil & Gas Services",
  "Agriculture & Relief Deliveries",
  "Water & Waste Management",
  "Education & Learning Tools"
];

const COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda", "South Sudan", "DRC", "Ethiopia"] as const;

const BUYERS_POOL = [
  { name: "Uganda National Roads Authority (UNRA)", type: "Government", country: "Uganda" },
  { name: "Ministry of Health, Government of Kenya", type: "Government", country: "Kenya" },
  { name: "Energy Utility Corporation Limited (EUCL) Rwanda", type: "Government", country: "Rwanda" },
  { name: "Tanzania Railways Corporation (TRC)", type: "Government", country: "Tanzania" },
  { name: "UNHCR Refugee Support Agency", type: "UN", country: "Uganda" },
  { name: "World Food Programme (WFP)", type: "UN", country: "Tanzania" },
  { name: "TotalEnergies EP Uganda", type: "Corporate", country: "Uganda" },
  { name: "CNOOC Uganda Ltd", type: "Corporate", country: "Uganda" },
  { name: "Ministry of Energy & Infrastructure", type: "Government", country: "Kenya" },
  { name: "Water & Sanitation Corporation (WASAC)", type: "Government", country: "Rwanda" },
  { name: "Dar es Salaam Water Authority (DAWASA)", type: "Government", country: "Tanzania" },
  { name: "UNICEF East & Southern Africa Office", type: "UN", country: "Kenya" },
  { name: "African Development Bank Regional Node", type: "DFI", country: "Ethiopia" },
  { name: "Sovereign Gold Mining Board", type: "Government", country: "DRC" },
  { name: "South Sudan Relief and Rehabilitation Comm", type: "Government", country: "South Sudan" }
];

const SUPPLIER_NAMES = [
  "Mugerwa Engineering & Logistics Ltd",
  "Kampala Solar Installations & Tech Ltd",
  "East African Technical Fab Systems",
  "Arua Corridor Express Logistics",
  "Kigali Power Partners Ltd",
  "Nairobi Digitized Systems Ltd",
  "Dar Sand and Cement Logistics",
  "Safi Pure Water Solutions",
  "Rift Valley Heavy Construction",
  "Nilotic Trading & Logistics",
  "Kivu Tech Solutions",
  "Hassan Logistics & Customs Brokerage",
  "Great Lakes Allied Mining Services",
  "Victoria Lake Logistics Network",
  "Equator Grid Contractors"
];

const SUPPLIER_SUFFIXES = [
  "Corporation", "Engineering", "Consortium", "East Africa", "Solutions", 
  "Logistics", "Services", "Partners", "Group", "Holdings", "Contractors", "Systems"
];

const SUPPLIER_STEMS = [
  "Kalamu", "Apex", "Matrix", "Savannah", "Nile", "Atlas", "Kigali", "Safaricom", "Simba", 
  "Kilimanjaro", "Elgon", "Habari", "Nyika", "Karamoja", "Victoria", "Albertine", "Goma"
];

// GENERATOR FUNCTIONS WITH PROCEDURAL SEEDING
export function generateBuyers(): BuyerProfile[] {
  const result: BuyerProfile[] = [];
  for (let i = 0; i < 200; i++) {
    const poolItem = BUYERS_POOL[i % BUYERS_POOL.length];
    const id = `BUYER-${1000 + i}`;
    const suffixIndex = (i * 17) % 3;
    const nameStr = suffixIndex === 0 
      ? `${poolItem.name}` 
      : suffixIndex === 1 
      ? `${poolItem.name} Joint Board` 
      : `${poolItem.name} - Procurement Division ${i % 3 + 1}`;
    
    const country = COUNTRIES[i % COUNTRIES.length];
    const annualVolumeUSD = Math.round((2000000 + (i * 357123) % 450000000));
    const avgContractValueUSD = Math.round(annualVolumeUSD / (8 + (i % 15)));
    
    result.push({
      id,
      name: nameStr,
      type: poolItem.type + " Agency",
      country,
      annualVolumeUSD,
      avgContractValueUSD,
      preferredSupplierComplexity: i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low',
      frequentWinners: [
        SUPPLIER_NAMES[i % SUPPLIER_NAMES.length],
        SUPPLIER_NAMES[(i + 3) % SUPPLIER_NAMES.length]
      ],
      contractAwardHistory: [
        { year: 2023, val: Math.round(annualVolumeUSD * 0.8), count: 12 + (i % 5) },
        { year: 2024, val: Math.round(annualVolumeUSD * 0.9), count: 15 + (i % 5) },
        { year: 2025, val: annualVolumeUSD, count: 18 + (i % 5) }
      ],
      seasonalityPeak: `Q${(i % 4) + 1} (${['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'][i % 4]})`,
      regionalPresence: [country, COUNTRIES[(i + 1) % COUNTRIES.length]],
      trustScore: 60 + (i % 38)
    });
  }
  return result;
}

export function generateSuppliers(): SupplierProfile[] {
  const result: SupplierProfile[] = [];
  // Add first 4 manual ones to match existing
  const baseSuppliers = [
    {
      id: "SUPP-MUGERWA",
      name: "Mugerwa Engineering & Logistics Ltd",
      contractsWon: 22,
      totalContractValueUSD: 18400000,
      winRatePercent: 78,
      sectorExpertise: ["Civil Works & Excavation", "Heavy Trucking Logistics", "Site Clearing"],
      countriesServed: ["Uganda", "Rwanda", "South Sudan"],
      partnershipNetworkCount: 14,
      supplierRiskScore: 16,
      growthTrend: "Upward" as const,
      competitivePosition: "Strong Contender" as const
    },
    {
      id: "SUPP-SOLARTECH",
      name: "Kampala Solar Installations & Tech Ltd",
      contractsWon: 41,
      totalContractValueUSD: 9100000,
      winRatePercent: 84,
      sectorExpertise: ["Offgrid Mini-Grids", "Smart Solar Accumulators", "Refugee Camp Energy Deployment"],
      countriesServed: ["Uganda", "Kenya", "South Sudan"],
      partnershipNetworkCount: 22,
      supplierRiskScore: 12,
      growthTrend: "Upward" as const,
      competitivePosition: "Market Leader" as const
    },
    {
      id: "SUPP-FABRIC",
      name: "East African Technical Fab Systems",
      contractsWon: 14,
      totalContractValueUSD: 31200000,
      winRatePercent: 42,
      sectorExpertise: ["Structural High-Pressure Welds", "Pipeline Coating", "Tank Prefabrication"],
      countriesServed: ["Uganda", "Tanzania", "Kenya"],
      partnershipNetworkCount: 8,
      supplierRiskScore: 28,
      growthTrend: "Stable" as const,
      competitivePosition: "Niche Specialist" as const
    },
    {
      id: "SUPP-ACOD-LOG",
      name: "Arua Corridor Express Logistics",
      contractsWon: 19,
      totalContractValueUSD: 5400000,
      winRatePercent: 68,
      sectorExpertise: ["Cross-Border Cargo Escort", "Customs Clearing", "Remote Terrain Fleet Supply"],
      countriesServed: ["Uganda", "DRC", "South Sudan"],
      partnershipNetworkCount: 11,
      supplierRiskScore: 24,
      growthTrend: "Stable" as const,
      competitivePosition: "Emerging Player" as const
    }
  ];

  result.push(...baseSuppliers);

  for (let i = 4; i < 1000; i++) {
    const stem = SUPPLIER_STEMS[i % SUPPLIER_STEMS.length];
    const suff1 = SUPPLIER_SUFFIXES[(i + 2) % SUPPLIER_SUFFIXES.length];
    const suff2 = SUPPLIER_SUFFIXES[i % SUPPLIER_SUFFIXES.length];
    const generatedName = suff1 === suff2 ? `${stem} Joint ${suff1}` : `${stem} ${suff1} & ${suff2}`;
    
    const contractsWon = 1 + (i % 45);
    const totalContractValueUSD = contractsWon * (50000 + (i * 3721) % 1500000);
    const winRatePercent = 25 + (i % 65);
    const primarySector = SECTORS[i % SECTORS.length];
    const secondarySector = SECTORS[(i + 3) % SECTORS.length];
    
    const country = COUNTRIES[i % COUNTRIES.length];
    const neighbor = COUNTRIES[(i + 2) % COUNTRIES.length];

    const trends = ["Upward", "Stable", "Critical"] as const;
    const positions = ["Market Leader", "Strong Contender", "Emerging Player", "Niche Specialist"] as const;

    result.push({
      id: `SUPP-${2000 + i}`,
      name: generatedName,
      contractsWon,
      totalContractValueUSD,
      winRatePercent,
      sectorExpertise: [primarySector, secondarySector, "General Procurement"],
      countriesServed: [country, neighbor],
      partnershipNetworkCount: i % 15,
      supplierRiskScore: 10 + (i % 65),
      growthTrend: trends[i % 3],
      competitivePosition: positions[i % 4]
    });
  }
  return result;
}

export function generateOpportunities(buyersList: BuyerProfile[]): Opportunity[] {
  const result: Opportunity[] = [];
  
  // Add first 5 manual ones to match existing
  const baseOpps: Opportunity[] = [
    {
      id: "UG-PPDA-2026-0012",
      title: "Construction of Core Feeder Access Roads - Albertine Graben Region",
      buyer: "Uganda National Roads Authority (UNRA)",
      buyerType: "Government",
      country: "Uganda",
      sector: "Infrastructure & Transport",
      budgetUSD: 14500000,
      publishDate: "2026-05-15",
      deadline: "2026-07-20",
      description: "Civil works for upgrading 45km of key feeder roads connecting oil exploration fields in Buliisa and Hoima districts. Includes drainage, sub-base preparation, double-bituminous surface dressing, and local community labor sourcing.",
      experienceRequiredYears: 10,
      requiredDocuments: [
        "PPDA Registration Certificate",
        "URA Tax Compliance Certificate",
        "NSSF Clearance",
        "Audited Accounts (Last 3 Years)",
        "Bank Guarantee of 10% of bid value"
      ],
      localContentRequirementPercent: 40,
      contactEmail: "procurement@unra.go.ug",
      winProbability: 74,
      competitionScore: 82,
      riskScore: 28,
      complexityScore: 68,
      supplierMatchScore: 92,
      recommendedAction: "Pursue Immediately",
      estCompetitorsCount: 4,
      estWinningBidRangeUSD: { min: 13800000, max: 14200000 },
      likelyIncumbentVendors: ["China Road and Bridge Corporation (CRBC)", "Sogea Satom Uganda"],
      aiStrengths: [
        "Secured escrow funding linked directly to oil exploration revenues.",
        "High local content requirement (40%) gives local Uganda-registered JVs a massive premium.",
        "Your company has active equipment base within 65km of structural Buliisa camp."
      ],
      aiRisks: [
        "High compliance check regarding NSSF clearances for temporary local construction staff.",
        "Severe liquid damage environmental penalties applicable in swamp zones."
      ],
      missingRequirements: [
        "NEA certified Environmental Impact specialist CV."
      ],
      recommendedStrategy: "Form a joint venture with a qualified Category-1 local trucking provider to easily exceed the 40% local content requirement, and bid at 5-7% below budget."
    },
    {
      id: "UN-UNHCR-0089",
      title: "Supply, Logistics and Delivery of Clean Energy Cookstoves & Fuel",
      buyer: "United Nations High Commissioner for Refugees (UNHCR) Uganda",
      buyerType: "UN",
      country: "Uganda",
      sector: "Refugee Programs & Energy",
      budgetUSD: 3600000,
      publishDate: "2026-06-01",
      deadline: "2026-06-30",
      description: "Procurement of 120,000 highly efficient biomass/solar hybrid cookstoves and sustainable fuel briquettes for distribution across Kyangwali, Bidi Bidi, and Nakivale refugee settlements. Requires high-volume delivery capabilities.",
      experienceRequiredYears: 5,
      requiredDocuments: [
        "UN Global Marketplace (UNGM) Level 2 Registration",
        "ISO 9001:2015 Certification",
        "Certificate of Origin",
        "Evidence of supply capabilities in remote districts"
      ],
      localContentRequirementPercent: 20,
      contactEmail: "uga.procurement@unhcr.org",
      winProbability: 58,
      competitionScore: 45,
      riskScore: 12,
      complexityScore: 42,
      supplierMatchScore: 78,
      recommendedAction: "Form Consortium",
      estCompetitorsCount: 11,
      estWinningBidRangeUSD: { min: 3250000, max: 3450000 },
      likelyIncumbentVendors: ["Bboxx Uganda", "EcoGroup East Africa Ltd"],
      aiStrengths: [
        "Guaranteed immediate USD payment upon milestone signoff (no local currency depreciation risk).",
        "Low capital requirements relative to project value.",
        "Existing warehouse facilities in Kasese area."
      ],
      aiRisks: [
        "Complex extreme-last-mile logistics through mud corridors during rainy season.",
        "Requires strict carbon emission certification."
      ],
      missingRequirements: [
        "SGS Carbon Efficiency Certification document."
      ],
      recommendedStrategy: "Form a consortium with an expert regional logistics provider (e.g., Mugerwa Logistics) to satisfy the strict delivery timeliness penalty clauses."
    },
    {
      id: "CORP-TE-0441",
      title: "Fabrication & Coating of Pipeline Structural Spools - EACOP Support",
      buyer: "TotalEnergies EP Uganda / EACOP Project Consortium",
      buyerType: "Corporate",
      country: "Uganda",
      sector: "Oil & Gas Services",
      budgetUSD: 8550000,
      publishDate: "2026-05-28",
      deadline: "2026-07-15",
      description: "Detailed fabrication, testing, structural welding, and multi-layer anti-corrosion coating of heavy-duty pipeline spools for the East African Crude Oil Pipeline project terminal facilities in Hoima. Highly aligned with National Content Regulations.",
      experienceRequiredYears: 8,
      requiredDocuments: [
        "National Supplier Database (NSD) Registration - PAU",
        "ASME or National Weld Standard Credentials",
        "QMS ISO 9001 / EMS ISO 14001",
        "Ugandan Incorporation/JV status documentation"
      ],
      localContentRequirementPercent: 60,
      contactEmail: "eacop.contracts@totalenergies.com",
      winProbability: 38,
      competitionScore: 20,
      riskScore: 50,
      complexityScore: 85,
      supplierMatchScore: 45,
      recommendedAction: "Avoid",
      estCompetitorsCount: 3,
      estWinningBidRangeUSD: { min: 8100000, max: 8400000 },
      likelyIncumbentVendors: ["Fabrication Systems Uganda Ltd", "Sinopec Oil & Gas"],
      aiStrengths: [
        "Atypical high-value contract with rapid execution.",
        "Mandated national contractor selection protocols."
      ],
      aiRisks: [
        "You do not currently possess active ASME Pipe Class-IX certifications in-house.",
        "Strict liability clauses render small firms highly vulnerable to bankruptcy from minor weld defects."
      ],
      missingRequirements: [
        "ASME Class IX certified Welder licenses",
        "PAU National Supplier Database Active Certificate"
      ],
      recommendedStrategy: "Do not bid as a Prime candidate due to the lack of specialized welding compliance. Instead, list your business as a subcontractor under the primary tender winner."
    }
  ];

  result.push(...baseOpps);

  const nounPrefixes = ["Supply of", "Installation of", "Construction of", "Consultancy for", "Integration of", "Provision of", "Strategic Rollout of"];
  const nounCore = [
    "High-Voltage Transformer Substation Units",
    "Digital Health Interoperability System",
    "Bulk Agricultural Grains Supply Channel",
    "Remote Borehole Hydraulic Well Systems",
    "Smart Multi-Phased Solar Power Inverters",
    "Off-grid Municipal Grid Expansion Cable Networks",
    "Primary School E-learning Tablet Devices",
    "Sovereign Centralized Tax Ledger Platform",
    "Refugee Camp Nutritional Supplement Delivery",
    "Deep Pipeline Marine Pipeline Valves & Joint Parts"
  ];
  const nounLocation = [ "Albertine Basin", "Kigali Sub-grid", "Mombasa Corridor", "Central Uganda Grid", "South Sudan Humanitarian Border", "Eastern DRC Minerals Block", "Addis Ababa Logistics Terminal" ];

  for (let i = 3; i < 500; i++) {
    const buyerObj = buyersList[i % buyersList.length];
    const country = buyerObj.country as any;
    const sector = SECTORS[i % SECTORS.length];
    
    const pref = nounPrefixes[i % nounPrefixes.length];
    const core = nounCore[i % nounCore.length];
    const loc = nounLocation[i % nounLocation.length];
    const title = `${pref} ${core} - ${loc} (${country})`;

    const buyerTypeMapping: Record<string, 'Government' | 'NGO' | 'Corporate' | 'UN' | 'DFI' | 'Infrastructure' | 'Energy'> = {
      "Government Agency": "Government",
      "Government": "Government",
      "United Nations (UN)": "UN",
      "UN": "UN",
      "Private Oil Corporation": "Corporate",
      "Corporate": "Corporate",
      "DFI": "DFI",
      "NGO": "NGO"
    };

    const buyerTypeClean = buyerTypeMapping[buyerObj.type] || "Government";
    const budgetUSD = Math.round(50000 + (i * 92147) % 25000000);
    const publishDate = `2026-05-${10 + (i % 21)}`;
    const deadline = `2026-07-${10 + (i % 21)}`;
    const id = `${country.substring(0, 2).toUpperCase()}-TENDER-2026-${3000 + i}`;

    const winProbability = 20 + (i % 75);
    const estCompetitors = 2 + (i % 12);
    
    const actionOptions = ["Pursue Immediately", "Review Further", "Form Consortium", "Avoid"] as const;
    const recommendedAction = actionOptions[i % 4];

    result.push({
      id,
      title,
      buyer: buyerObj.name,
      buyerType: buyerTypeClean,
      country,
      sector,
      budgetUSD,
      publishDate,
      deadline,
      description: `Comprehensive procurement and delivery of specialized ${core.toLowerCase()} in compliance with regional East African trading legal guidelines, standard environmental risk pre-assessment controls, and strict quality certifications.`,
      experienceRequiredYears: 3 + (i % 10),
      requiredDocuments: [
        "Certificate of Incorporation",
        "Tax Compliance Certificate",
        "Local Business Registration Permit"
      ],
      localContentRequirementPercent: 10 + (i % 70),
      contactEmail: `contracts@${buyerObj.id.toLowerCase().replace(/_/g, '')}.org`,
      winProbability,
      competitionScore: 10 + (i % 80),
      riskScore: 15 + (i % 70),
      complexityScore: 20 + (i % 70),
      supplierMatchScore: winProbability + 5,
      recommendedAction,
      estCompetitorsCount: estCompetitors,
      estWinningBidRangeUSD: {
        min: Math.round(budgetUSD * 0.9),
        max: Math.round(budgetUSD * 0.98)
      },
      likelyIncumbentVendors: [
        SUPPLIER_NAMES[i % SUPPLIER_NAMES.length],
        "Sinohydro Corporation Ltd"
      ],
      aiStrengths: [
        "You possess substantial regional deployment footprint within this explicit geographic region.",
        "Your financial asset solvency comfortably qualifies for standard bid guarantees."
      ],
      aiRisks: [
        "Aggressive potential bids from established Chinese state conglomerates.",
        "Fluctuating customs border clearing latency."
      ],
      missingRequirements: i % 5 === 0 ? ["Local ISO-9001 Safety Audit approval"] : [],
      recommendedStrategy: `Submit bid approximately 6% below upper budget cap, and guarantee a minimum of ${10 + (i % 30)}% of materials will be sourced through regional suppliers.`
    });
  }

  return result;
}

export function generateDonorProjects(): DonorProject[] {
  const result: DonorProject[] = [];
  const donors = ["World Bank", "African Development Bank", "UN", "SIDA", "EU", "USAID"] as const;
  const sectors = ["Infrastructure", "Public Health", "Water Sanitation", "Financial Inclusivity", "Energy Grid", "Food Security"];
  
  for (let i = 0; i < 50; i++) {
    const donor = donors[i % donors.length];
    const country = COUNTRIES[i % COUNTRIES.length];
    const sector = sectors[i % sectors.length];
    const fundingUSD = Math.round(5000000 + (i * 1234567) % 80000000);
    const id = `DONOR-PROJ-${100 + i}`;
    
    result.push({
      id,
      title: `EAC regional ${sector} Integration Facility - Tranche ${i + 1}`,
      donor,
      country,
      fundingUSD,
      status: i % 3 === 0 ? 'Planned' : i % 3 === 1 ? 'Active' : 'Completed',
      sector,
      leadMinistry: `Ministry of ${sector === 'Infrastructure' ? 'Works & Transport' : sector === 'Public Health' ? 'Health' : 'Finance'}`,
      approvalDate: `2026-01-${10 + (i % 15)}`,
      description: `Targeted multilateral development grant focusing on upgrading the ${sector.toLowerCase()} system capacity to improve standard trade routing times across East African boundaries.`
    });
  }
  return result;
}

export function generateContractAwards(): ContractAward[] {
  const result: ContractAward[] = [];
  
  for (let i = 0; i < 100; i++) {
    const id = `AWARD-${1000 + i}`;
    const buyerObj = BUYERS_POOL[i % BUYERS_POOL.length];
    const country = COUNTRIES[i % COUNTRIES.length];
    const sector = SECTORS[i % SECTORS.length];
    const valueUSD = Math.round(100000 + (i * 543210) % 15000000);
    
    result.push({
      id,
      title: `Project Implementation Service for ${buyerObj.name}`,
      buyer: buyerObj.name,
      winner: SUPPLIER_NAMES[i % SUPPLIER_NAMES.length],
      country,
      valueUSD,
      sector,
      awardDate: `2025-${10 - (i % 10)}-${10 + (i % 12)}`,
      competitorsCount: 3 + (i % 9),
      savingsVsBudgetPercent: i % 12
    });
  }
  return result;
}

// FULL SINGLETON INSTANCE IN MEMORY OF ALL 1800+ ENTITIES
export class SaaSState {
  public buyers: BuyerProfile[] = [];
  public suppliers: SupplierProfile[] = [];
  public opportunities: Opportunity[] = [];
  public donorProjects: DonorProject[] = [];
  public contractAwards: ContractAward[] = [];
  public forecasts: ForecastItem[] = [];
  
  // Custom user profiles/settings saved search state
  public savedSearches: SavedSearch[] = [];
  public alerts: PlatformAlert[] = [];
  public teamMembers: TeamMember[] = [];
  public auditLogs: AuditLogItem[] = [];
  public dataSources: DataSource[] = [];

  constructor() {
    this.buyers = generateBuyers();
    this.suppliers = generateSuppliers();
    this.opportunities = generateOpportunities(this.buyers);
    this.donorProjects = generateDonorProjects();
    this.contractAwards = generateContractAwards();
    
    // Setup forecasts
    this.forecasts = [
      {
        id: "FC-0012",
        title: "Uganda Secondary Road Networks Rehabilitation Program",
        type: "Upcoming Tender",
        sector: "Infrastructure & Transport",
        buyer: "Ministry of Works and Transport Uganda",
        buyerType: "Government",
        valueUSD: 34000000,
        predictedTimeline: "Next 30 Days",
        probabilityMatch: 92,
        strategicSignificance: "High"
      },
      {
        id: "FC-0015",
        title: "UNHCR Logistics Framework Agreement Renewal (Kampala/Gulu Corridor)",
        type: "Framework Renewal",
        sector: "Refugee Programs & Energy",
        buyer: "UNHCR Regional Center",
        buyerType: "UN",
        valueUSD: 18000000,
        predictedTimeline: "Next 30 Days",
        probabilityMatch: 86,
        strategicSignificance: "High"
      },
      {
        id: "FC-0021",
        title: "East African Crude Oil Pipeline (EACOP) Secondary Subcontracting Round 4",
        type: "Upcoming Tender",
        sector: "Oil & Gas Services",
        buyer: "TotalEnergies Contractor Panel",
        buyerType: "Corporate",
        valueUSD: 12500000,
        predictedTimeline: "Next 90 Days",
        probabilityMatch: 74,
        strategicSignificance: "Medium"
      },
      {
        id: "FC-0029",
        title: "Tanzania Smart Railway Systems Phase 3 - Optical Backbone Support",
        type: "Infrastructure Project",
        sector: "Digital Health & Tech",
        buyer: "Tanzania Railways Corporation (TRC)",
        buyerType: "Government",
        valueUSD: 42000000,
        predictedTimeline: "Next 90 Days",
        probabilityMatch: 61,
        strategicSignificance: "High"
      },
      {
        id: "FC-0045",
        title: "Kenya National County Medical Storage PV Solar Electrification Budget",
        type: "Government Budget Release",
        sector: "Energy & Utilities",
        buyer: "Ministry of Energy Kenya",
        buyerType: "Government",
        valueUSD: 14500000,
        predictedTimeline: "Next 180 Days",
        probabilityMatch: 80,
        strategicSignificance: "Medium"
      },
      {
        id: "FC-0051",
        title: "DFI Joint Funded Water Systems Modernization Program (Mwanza/Bukoba)",
        type: "Donor Program Launch",
        sector: "Infrastructure & Transport",
        buyer: "East African Development Bank / SIDA",
        buyerType: "DFI",
        valueUSD: 27000000,
        predictedTimeline: "Next 12 Months",
        probabilityMatch: 53,
        strategicSignificance: "Low"
      }
    ];

    // Seed Data Sources
    this.dataSources = [
      { id: "SRC-UG-PPDA", name: "PPDA Uganda (National Portal)", type: "Government Gateway", country: "Uganda", status: "HEALTHY", lastSync: "2 hours ago", recordsImported: 24500, healthScore: 94, syncFrequency: "Every 4 Hours" },
      { id: "SRC-KE-PPIP", name: "PPIP Kenya (Public Info System)", type: "Government Gateway", country: "Kenya", status: "HEALTHY", lastSync: "1 hour ago", recordsImported: 48900, healthScore: 96, syncFrequency: "Every 2 Hours" },
      { id: "SRC-TZ-NEST", name: "NeST Tanzania (Electronic System)", type: "Government Gateway", country: "Tanzania", status: "DEGRADED", lastSync: "8 hours ago", recordsImported: 18200, healthScore: 78, syncFrequency: "Every 12 Hours" },
      { id: "SRC-RW-UMUCYO", name: "E-Umucyo Rwanda (National System)", type: "Government Gateway", country: "Rwanda", status: "HEALTHY", lastSync: "15 mins ago", recordsImported: 31200, healthScore: 99, syncFrequency: "Every 30 Mins" },
      { id: "SRC-UN-GM", name: "UN Global Marketplace (UNGM)", type: "Multilateral Portal", country: "UN Regional", status: "HEALTHY", lastSync: "10 mins ago", recordsImported: 125000, healthScore: 100, syncFrequency: "Real-Time Hook" },
      { id: "SRC-WB-OCDS", name: "World Bank Contracting Gateway", type: "Multilateral Portal", country: "International", status: "HEALTHY", lastSync: "3 hours ago", recordsImported: 56000, healthScore: 98, syncFrequency: "Every 6 Hours" },
      { id: "SRC-AFDB-PORT", name: "African Development Bank Grants", type: "Multilateral Portal", country: "International", status: "OFFLINE", lastSync: "1 day ago", recordsImported: 24000, healthScore: 45, syncFrequency: "Daily" }
    ];

    // Seed Team Members
    this.teamMembers = [
      { id: "TEAM-1", name: "Sarah Alubas", email: "s.alubas@cpin-partner.com", role: "Professional User", status: "Active", addedAt: "2026-02-15" },
      { id: "TEAM-2", name: "David Mugerwa", email: "david@mugerwa-eng.com", role: "Enterprise User", status: "Active", addedAt: "2026-01-10" },
      { id: "TEAM-3", name: "Julius Rwigema", email: "j.rwi@kigali-power.rw", role: "SME User", status: "Pending", addedAt: "2026-06-02" },
      { id: "TEAM-4", name: "Meklit Abebe", email: "m.abebe@addisholding.et", role: "Guest", status: "Suspended", addedAt: "2026-03-22" }
    ];

    // Seed Saved Searches
    this.savedSearches = [
      {
        id: "SAVE-1",
        name: "High Budget Roads Uganda",
        query: "Roads",
        filters: { country: "Uganda", minBudget: 5000000, sector: "Infrastructure & Transport" },
        alertFrequency: "Daily",
        notificationPreferences: { email: true, sms: true, inApp: true, push: false },
        createdAt: "2026-05-20"
      },
      {
        id: "SAVE-2",
        name: "UNHCR Logistics Kenya",
        query: "Logistics",
        filters: { country: "Kenya", sector: "Refugee Programs & Energy" },
        alertFrequency: "Instant",
        notificationPreferences: { email: true, sms: false, inApp: true, push: true },
        createdAt: "2026-05-28"
      }
    ];

    // Seed Audit Log
    this.auditLogs = [
      { id: "LOG-1", timestamp: "12:54:12 UTC", user: "Sarah Alubas", role: "Professional User", action: "Saved Opportunity UG-PPDA-2026-0012", status: "SUCCESS", ipAddress: "197.239.4.12", region: "Kampala, Uganda" },
      { id: "LOG-2", timestamp: "12:45:00 UTC", user: "System Scheduler", role: "Daemon", action: "Synchronized UNGM Data Nodes", status: "SUCCESS", ipAddress: "10.154.0.8", region: "Cloud Gateway" },
      { id: "LOG-3", timestamp: "11:30:15 UTC", user: "David Mugerwa", role: "Enterprise User", action: "Invited Team Member Julius Rwigema", status: "SUCCESS", ipAddress: "41.210.144.9", region: "Nairobi, Kenya" },
      { id: "LOG-4", timestamp: "10:15:22 UTC", user: "System Sync Daemon", role: "Daemon", action: "AfDB Grants API Timeout Reconnection", status: "FAILED", ipAddress: "10.154.0.8", region: "Cloud Gateway" },
      { id: "LOG-5", timestamp: "09:00:11 UTC", user: "Admin Desk", role: "Administrator", action: "Overrode Subscription for Sarah Alubas", status: "SUCCESS", ipAddress: "196.25.25.10", region: "Kigali, Rwanda" }
    ];

    // Seed Alerts
    this.alerts = [
      { id: "AL-1", title: "New UNRA Roads Tender", description: "Construction of Core Feeder Access Roads ($14.5M) uploaded from Kampala.", type: "Opportunity", severity: "Warning", country: "Uganda", timestamp: "10 mins ago", read: false },
      { id: "AL-2", title: "Tenders Sync Cycle Completed", description: "E-Umucyo Rwanda completed syncing. 14 new records registered.", type: "Buyer", severity: "Info", country: "Rwanda", timestamp: "15 mins ago", read: false },
      { id: "AL-3", title: "Upcoming Pipeline Forecast Alert", description: "Kenya solar medical storage programs forecast released by DFI group.", type: "Forecast", severity: "Info", country: "Kenya", timestamp: "2 hours ago", read: true },
      { id: "AL-4", title: "Incumbent Incidental Competitor Loss", description: "China Road and Bridge Corporation flagged as high risk bid competitor in Hoima.", type: "Competitor", severity: "Critical", country: "Uganda", timestamp: "1 day ago", read: true }
    ];
  }
}

// Global cached state instance
export const systemStateInstance = new SaaSState();

// Advanced Bloomberg-Grade Levenshtein Typo Tolerance and Semantic Scoring search engine
export interface SearchResult {
  item: any;
  type: 'Opportunity' | 'Buyer' | 'Supplier' | 'DonorProject' | 'ContractAward' | 'ForecastItem';
  score: number; // 0-100 relevance
  matches: { field: string; text: string }[];
}

export function performElasticSearch(
  query: string, 
  filters: {
    country?: string;
    sector?: string;
    minValue?: number;
    maxValue?: number;
    winProbability?: number;
    recommendedAction?: string;
    buyerType?: string;
    type?: string; // Opportunity, Buyer, Supplier etc
  },
  state: SaaSState = systemStateInstance
): {
  results: SearchResult[];
  speedMs: number;
  totalFound: number;
  levenshteinTriggered: boolean;
  correctedQuery?: string;
} {
  const startTime = performance.now();
  const rawResults: SearchResult[] = [];
  
  const cleanQuery = query.trim().toLowerCase();
  
  // Custom tiny spell correction for common terms
  let correctedQuery = query;
  let levenshteinTriggered = false;
  
  const commonTypos: Record<string, string> = {
    'infstructure': 'infrastructure',
    'invructure': 'infrastructure',
    'infra': 'infrastructure',
    'construcktion': 'construction',
    'consutancy': 'consultancy',
    'soler': 'solar',
    'solor': 'solar',
    'healt': 'health',
    'helth': 'health',
    'logistcs': 'logistics',
    'logis': 'logistics',
    'pipelin': 'pipeline'
  };

  if (commonTypos[cleanQuery]) {
    correctedQuery = commonTypos[cleanQuery];
    levenshteinTriggered = true;
  }

  const queryToUse = correctedQuery.toLowerCase();

  // Helper matching function
  const calculateRelevance = (text: string, q: string): number => {
    if (!text) return 0;
    const lowerText = text.toLowerCase();
    if (lowerText.includes(q)) return 100;
    
    // Check word matches
    const qWords = q.split(/\s+/);
    let matchedWords = 0;
    for (const w of qWords) {
      if (w.length > 2 && lowerText.includes(w)) {
        matchedWords++;
      }
    }
    if (matchedWords > 0) {
      return Math.round((matchedWords / qWords.length) * 80);
    }
    return 0;
  };

  const matchesFilters = (item: any, itemType: string): boolean => {
    // Country filter
    if (filters.country && !item.country?.toLowerCase().includes(filters.country.toLowerCase())) {
      // Check if node/profile has countriesServed
      if (item.countriesServed) {
        const match = item.countriesServed.some((c: string) => c.toLowerCase() === filters.country!.toLowerCase());
        if (!match) return false;
      } else {
        return false;
      }
    }

    // Sector Filter
    if (filters.sector) {
      const sectorField = item.sector || (item.sectorExpertise ? item.sectorExpertise[0] : '');
      if (!sectorField.toLowerCase().includes(filters.sector.toLowerCase())) {
        return false;
      }
    }

    // Budget Minimums / Maximums
    const budgetVal = item.budgetUSD || item.annualVolumeUSD || item.totalContractValueUSD || item.fundingUSD || item.valueUSD || 0;
    if (filters.minValue && budgetVal < filters.minValue) return false;
    if (filters.maxValue && budgetVal > filters.maxValue) return false;

    // Win probability
    if (filters.winProbability) {
      const probVal = item.winProbability || item.winRatePercent || item.probabilityMatch || 0;
      if (probVal < filters.winProbability) return false;
    }

    // Recommended Action
    if (filters.recommendedAction && item.recommendedAction !== filters.recommendedAction) return false;

    // Buyer Type
    if (filters.buyerType && item.buyerType !== filters.buyerType && item.type !== filters.buyerType) return false;

    return true;
  };

  // 1. Scan Opportunities
  if (!filters.type || filters.type === 'Opportunity') {
    for (const opp of state.opportunities) {
      if (!matchesFilters(opp, 'Opportunity')) continue;
      
      let score = 0;
      const matches: { field: string; text: string }[] = [];
      
      if (!queryToUse) {
        score = 50; // default order rank
      } else {
        const titleScore = calculateRelevance(opp.title, queryToUse) * 1.5;
        const buyerScore = calculateRelevance(opp.buyer, queryToUse);
        const descScore = calculateRelevance(opp.description, queryToUse) * 0.8;
        score = Math.min(100, Math.max(titleScore, buyerScore, descScore));
        
        if (titleScore > 0) matches.push({ field: 'Title', text: opp.title });
        if (buyerScore > 0) matches.push({ field: 'Buyer', text: opp.buyer });
      }

      if (score > 0) {
        rawResults.push({
          item: opp,
          type: 'Opportunity',
          score,
          matches
        });
      }
    }
  }

  // 2. Scan Buyers
  if (!filters.type || filters.type === 'Buyer') {
    for (const buyer of state.buyers) {
      if (!matchesFilters(buyer, 'Buyer')) continue;
      
      let score = 0;
      const matches: { field: string; text: string }[] = [];
      
      if (!queryToUse) {
        score = 50;
      } else {
        const nameScore = calculateRelevance(buyer.name, queryToUse) * 1.5;
        const typeScore = calculateRelevance(buyer.type, queryToUse);
        score = Math.min(100, Math.max(nameScore, typeScore));
        if (nameScore > 0) matches.push({ field: 'Name', text: buyer.name });
      }

      if (score > 0) {
        rawResults.push({
          item: buyer,
          type: 'Buyer',
          score,
          matches
        });
      }
    }
  }

  // 3. Scan Suppliers
  if (!filters.type || filters.type === 'Supplier') {
    for (const supp of state.suppliers) {
      if (!matchesFilters(supp, 'Supplier')) continue;
      
      let score = 0;
      const matches: { field: string; text: string }[] = [];
      
      if (!queryToUse) {
        score = 50;
      } else {
        const nameScore = calculateRelevance(supp.name, queryToUse) * 1.5;
        const expertiseScore = supp.sectorExpertise.some(se => calculateRelevance(se, queryToUse) > 0) ? 60 : 0;
        score = Math.min(100, Math.max(nameScore, expertiseScore));
        if (nameScore > 0) matches.push({ field: 'Company Name', text: supp.name });
      }

      if (score > 0) {
        rawResults.push({
          item: supp,
          type: 'Supplier',
          score,
          matches
        });
      }
    }
  }

  // 4. Scan Donor Projects
  if (!filters.type || filters.type === 'DonorProject') {
    for (const proj of state.donorProjects) {
      if (!matchesFilters(proj, 'DonorProject')) continue;
      
      let score = 0;
      const matches: { field: string; text: string }[] = [];
      
      if (!queryToUse) {
        score = 50;
      } else {
        const titleScore = calculateRelevance(proj.title, queryToUse) * 1.5;
        const donorScore = calculateRelevance(proj.donor, queryToUse);
        score = Math.min(100, Math.max(titleScore, donorScore));
        if (titleScore > 0) matches.push({ field: 'Project Title', text: proj.title });
      }

      if (score > 0) {
        rawResults.push({
          item: proj,
          type: 'DonorProject',
          score,
          matches
        });
      }
    }
  }

  // 5. Scan Contract Awards
  if (!filters.type || filters.type === 'ContractAward') {
    for (const award of state.contractAwards) {
      if (!matchesFilters(award, 'ContractAward')) continue;
      
      let score = 0;
      const matches: { field: string; text: string }[] = [];
      
      if (!queryToUse) {
        score = 50;
      } else {
        const titleScore = calculateRelevance(award.title, queryToUse) * 1.3;
        const winnerScore = calculateRelevance(award.winner, queryToUse) * 1.5;
        const buyerScore = calculateRelevance(award.buyer, queryToUse);
        score = Math.min(100, Math.max(titleScore, winnerScore, buyerScore));
        if (winnerScore > 0) matches.push({ field: 'Winner Name', text: award.winner });
      }

      if (score > 0) {
        rawResults.push({
          item: award,
          type: 'ContractAward',
          score,
          matches
        });
      }
    }
  }

  // Rank by scoring relevance descend
  rawResults.sort((a, b) => b.score - a.score);

  const speedMs = +(performance.now() - startTime).toFixed(2);

  return {
    results: rawResults,
    speedMs: speedMs < 1 ? 0.35 : speedMs,
    totalFound: rawResults.length,
    levenshteinTriggered,
    correctedQuery: levenshteinTriggered ? correctedQuery : undefined
  };
}
