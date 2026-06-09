import { Opportunity, BuyerProfile, SupplierProfile, ForecastItem, GraphNode, GraphLink } from '../shared/types';

export const mockOpportunities: Opportunity[] = [
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
    
    // CPIN V2 Upgraded Fields
    winProbability: 74,
    competitionScore: 82, // Moderate-low competition density
    riskScore: 28, // Secure government funding with oil revenues
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
    
    // CPIN V2 Upgraded Fields
    winProbability: 58,
    competitionScore: 45, // High competition from regional distributors
    riskScore: 12, // Ultra-low risk (UN funded)
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
    
    // CPIN V2 Upgraded Fields
    winProbability: 38,
    competitionScore: 20, // Extremely tight market (few certified fabricators)
    riskScore: 50, // High execution risk, delay penalties of $45k/day
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
  },
  {
    id: "KE-MOH-2026-104",
    title: "National Connected Digital Health Information System (DHIS-3)",
    buyer: "Ministry of Health, Government of Kenya",
    buyerType: "Government",
    country: "Kenya",
    sector: "Digital Health & Tech",
    budgetUSD: 18700000,
    publishDate: "2026-05-10",
    deadline: "2026-07-05",
    description: "Design, deployment, cloud hosting, and multi-county interoperability implementation of Kenya's universal connected health registry. Scaled to cover over 4,500 primary health clinics.",
    experienceRequiredYears: 7,
    requiredDocuments: [
      "KRA Tax Clearance Certificate",
      "NCA Tech Category 1 License",
      "Certified Data Protection compliance credentials",
      "Letters of reference of similar digital healthcare architectures"
    ],
    localContentRequirementPercent: 30,
    contactEmail: "ict.proc@health.go.ke",
    
    // CPIN V2 Upgraded Fields
    winProbability: 62,
    competitionScore: 60,
    riskScore: 35,
    complexityScore: 78,
    supplierMatchScore: 85,
    recommendedAction: "Review Further",
    estCompetitorsCount: 6,
    estWinningBidRangeUSD: { min: 16900000, max: 17800000 },
    likelyIncumbentVendors: ["Safaricom Business S.A.", "Sybrin Kenya System Integrators"],
    aiStrengths: [
      "You possess pre-certified integrations for 3 out of 5 core medical databases specified.",
      "High evaluation weighting (40% of standard score) for regional implementation history.",
    ],
    aiRisks: [
      "Payment schedules are denominated in non-hedged Kenya Shillings (KES), creating currency risk.",
      "Strict data protection regulatory hurdles under Kenya's ODPC guidelines."
    ],
    missingRequirements: [
      "ODPC Certified Data Processor accreditation certificate."
    ],
    recommendedStrategy: "Align with a local telecom giant (e.g., Safaricom) for local hosting compliance while positioning your team for the software registry implementation."
  },
  {
    id: "NGO-WFP-TZ-0899",
    title: "Cross-Border Agri-Logistics and Bulk Maize Meal Supply Network",
    buyer: "World Food Programme (WFP) Tanzania & South Sudan",
    buyerType: "NGO",
    country: "Tanzania",
    sector: "Agriculture & Relief Deliveries",
    budgetUSD: 5200000,
    publishDate: "2026-05-25",
    deadline: "2026-06-25",
    description: "Establishment of active cross-border logistical lines and procurement of 45,000 metric tons of export-grade maize meal from Tanzanian farmers to feeding programs in South Sudan and Eastern DRC.",
    experienceRequiredYears: 4,
    requiredDocuments: [
      "UNGM Registration",
      "Tanzania Bureau of Standards (TBS) Food Safety Certificate",
      "Cross-border shipping clearance licenses",
      "Fleet capacity proof (Min 30 heavy-haul trucks)"
    ],
    localContentRequirementPercent: 70,
    contactEmail: "dar.procurement@wfp.org",
    
    // CPIN V2 Upgraded Fields
    winProbability: 81,
    competitionScore: 70,
    riskScore: 15,
    complexityScore: 50,
    supplierMatchScore: 94,
    recommendedAction: "Pursue Immediately",
    estCompetitorsCount: 5,
    estWinningBidRangeUSD: { min: 4850000, max: 5050000 },
    likelyIncumbentVendors: ["Cargill East Africa", "Bakhresa Group Tanzania"],
    aiStrengths: [
      "High local agricultural content requirement (70%) perfectly suits your regional co-operative agreements.",
      "You hold active Tanzanian border cargo lanes clearances."
    ],
    aiRisks: [
      "High fuel margin fluctuations could corrode profit margins if commodity contracts are fixed-price."
    ],
    missingRequirements: [],
    recommendedStrategy: "Lock in transport contracts early to bypass peak seasonality price spikes, and submit a high-quality technical bid stressing your pre-cleared logistics routes."
  },
  {
    id: "RW-REG-2026-44",
    title: "Smart Metering System Rollout - Kigali Metropolitan Grid Phase III",
    buyer: "Energy Utility Corporation Limited (EUCL) Rwanda",
    buyerType: "Government",
    country: "Rwanda",
    sector: "Energy & Utilities",
    budgetUSD: 12100005,
    publishDate: "2026-06-02",
    deadline: "2026-08-01",
    description: "Supply and execution of advanced AMI smart meter infrastructures. Installation of metadata nodes, telecom collection hubs, and back-end commercial billing modules integration with RURA oversight.",
    experienceRequiredYears: 6,
    requiredDocuments: [
      "Rwanda Revenue Authority (RRA) Tax Clearance",
      "REG Registered Supplier License",
      "Telecom operator certifications (smart system integrations)",
      "Financial bid security from verified commercial bank"
    ],
    localContentRequirementPercent: 25,
    contactEmail: "procurement@eucl.reg.rw",
    
    // CPIN V2 Upgraded Fields
    winProbability: 66,
    competitionScore: 55,
    riskScore: 22,
    complexityScore: 72,
    supplierMatchScore: 81,
    recommendedAction: "Form Consortium",
    estCompetitorsCount: 7,
    estWinningBidRangeUSD: { min: 11200000, max: 11800000 },
    likelyIncumbentVendors: ["EDF Energy Rwanda Corp", "Hexing Electrical East Africa"],
    aiStrengths: [
      "Highly professional digital procurement process governed by Rwanda e-Umucyo (zero corruption premium requirement).",
      "Excellent local commercial credit availability."
    ],
    aiRisks: [
      "Strict service level agreements (SLAs) with immediate severe financial penalties for downtime."
    ],
    missingRequirements: [
      "Certified REG Network Installer license (Category-B)"
    ],
    recommendedStrategy: "Partner with a certified Kigali-based electrical engineering firm (Kigali Power Grid Partners) to fulfill the on-site metadata node cabling andREG requirements."
  }
];

export const mockBuyers: BuyerProfile[] = [
  {
    id: "UNRA",
    name: "Uganda National Roads Authority (UNRA)",
    type: "Government Agency",
    country: "Uganda",
    annualVolumeUSD: 1240000000,
    avgContractValueUSD: 15400000,
    preferredSupplierComplexity: "High",
    frequentWinners: ["China Communications Construction", "Sogea Satom", "Mugerwa Civil Ltd"],
    contractAwardHistory: [
      { year: 2023, val: 980000000, count: 64 },
      { year: 2024, val: 1120000000, count: 72 },
      { year: 2025, val: 1240000000, count: 85 }
    ],
    seasonalityPeak: "Q3 (July - September)",
    regionalPresence: ["Kampala", "Mbarara", "Gulu", "Fort Portal", "Hoima"],
    trustScore: 88
  },
  {
    id: "UNHCR_UG",
    name: "UNHCR Refugee Support Agency",
    type: "United Nations (UN)",
    country: "Uganda & Regional",
    annualVolumeUSD: 450000000,
    avgContractValueUSD: 2800000,
    preferredSupplierComplexity: "Medium",
    frequentWinners: ["Bboxx", "Arua Logistics Co Ltd", "Kampala Solar Tech"],
    contractAwardHistory: [
      { year: 2023, val: 380000000, count: 120 },
      { year: 2024, val: 410000000, count: 142 },
      { year: 2025, val: 450000000, count: 155 }
    ],
    seasonalityPeak: "Q4 (October - December)",
    regionalPresence: ["Kampala", "Arua", "Kasese", "Yumbe"],
    trustScore: 96
  },
  {
    id: "TOTAL_EN",
    name: "TotalEnergies EP Uganda",
    type: "Private Oil Corporation",
    country: "Uganda & Tanzania",
    annualVolumeUSD: 2400000000,
    avgContractValueUSD: 48000000,
    preferredSupplierComplexity: "High",
    frequentWinners: ["Sinopec", "Fabrication Systems Ltd", "Bollore Logistics"],
    contractAwardHistory: [
      { year: 2023, val: 1600000000, count: 42 },
      { year: 2024, val: 2100000000, count: 50 },
      { year: 2025, val: 2400000000, count: 58 }
    ],
    seasonalityPeak: "Continuous",
    regionalPresence: ["Hoima", "Buliisa", "Kampala", "Tanga"],
    trustScore: 92
  },
  {
    id: "REG_RW",
    name: "Energy Utility Corporation Ltd (EUCL)",
    type: "State Utility Corporation",
    country: "Rwanda",
    annualVolumeUSD: 310000000,
    avgContractValueUSD: 8400000,
    preferredSupplierComplexity: "Medium",
    frequentWinners: ["Hexing Electrical", "REG Power Builders", "Kigali Smart Systems Solutions"],
    contractAwardHistory: [
      { year: 2023, val: 240000000, count: 31 },
      { year: 2024, val: 280000000, count: 38 },
      { year: 2025, val: 310000000, count: 44 }
    ],
    seasonalityPeak: "Q2 (April - June)",
    regionalPresence: ["Kigali", "Gisenyi", "Butare"],
    trustScore: 94
  }
];

export const mockSuppliers: SupplierProfile[] = [
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
    growthTrend: "Upward",
    competitivePosition: "Strong Contender"
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
    growthTrend: "Upward",
    competitivePosition: "Market Leader"
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
    growthTrend: "Stable",
    competitivePosition: "Niche Specialist"
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
    growthTrend: "Stable",
    competitivePosition: "Emerging Player"
  }
];

export const mockForecasts: ForecastItem[] = [
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

export const mockGraphNodes: GraphNode[] = [
  // Buyers
  { id: "UNRA_node", label: "UNRA Highway", type: "Buyer", country: "Uganda", valUSD: 1240000000, description: "Ugandan State Road Procurement Authority", complianceRating: "AA+" },
  { id: "TOTAL_node", label: "TotalEnergies S.A.", type: "Buyer", country: "International", valUSD: 2400000000, description: "Lead Petroleum Operator for Albertine EACOP project", complianceRating: "AAA (Global Guidelines)" },
  { id: "UNHCR_node", label: "UNHCR East Africa", type: "NGO", country: "International", valUSD: 450000000, description: "United Nations Refugee Agency procurement headquarters", complianceRating: "AAA" },
  { id: "EUCL_node", label: "REG EUCL", type: "Buyer", country: "Rwanda", valUSD: 310000000, description: "Rwanda national electrical utility manager", complianceRating: "AA" },
  
  // Primes
  { id: "CRBC_node", label: "China Road S.A.", type: "Prime Contractor", country: "International", description: "Grade-1 multinational civil engineering prime builder", complianceRating: "A" },
  { id: "BOLLORE_node", label: "Bollore Core", type: "Prime Contractor", country: "International", description: "Global supply chain & border clearance prime vendor", complianceRating: "AA" },
  
  // Local suppliers / Subcontractors
  { id: "MUGERWA_node", label: "Mugerwa Ltd", type: "Subcontractor", country: "Uganda", description: "Regional excavation & heavy logistics subcontractor", complianceRating: "AA" },
  { id: "KAMPALA_SOLAR_node", label: "Kampala Solar Tech", type: "Subcontractor", country: "Uganda", description: "Smart solar PV assembly specialist SME", complianceRating: "AA" },
  { id: "KIGALI_ELECT_node", label: "Kigali Power Partners", type: "Subcontractor", country: "Rwanda", description: "Rwandan metropolitan AMI meters installation cooperative", complianceRating: "A+" },
  
  // Projects
  { id: "EACOP_PROJECT_node", label: "EACOP Pipeline Hoima", type: "Project", country: "Uganda", description: "Cabling and piping corridor worth $3.5 Billion", complianceRating: "High Audit" }
];

export const mockGraphLinks: GraphLink[] = [
  { source: "UNRA_node", target: "CRBC_node", type: "Awarded Contract", weight: 95 },
  { source: "TOTAL_node", target: "BOLLORE_node", type: "Awarded Contract", weight: 90 },
  { source: "CRBC_node", target: "MUGERWA_node", type: "Subcontract Relationship", weight: 81 },
  { source: "BOLLORE_node", target: "MUGERWA_node", type: "Subcontract Relationship", weight: 75 },
  
  { source: "UNHCR_node", target: "KAMPALA_SOLAR_node", type: "Vendor Registration", weight: 88 },
  { source: "EUCL_node", target: "KIGALI_ELECT_node", type: "Historical Supply", weight: 84 },
  { source: "TOTAL_node", target: "EACOP_PROJECT_node", type: "Funding Relationship", weight: 100 },
  { source: "MUGERWA_node", target: "EACOP_PROJECT_node", type: "Joint Venture", weight: 70 }
];
