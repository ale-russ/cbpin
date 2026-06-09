export interface Opportunity {
  id: string;
  title: string;
  buyer: string;
  buyerType: 'Government' | 'NGO' | 'Corporate' | 'UN' | 'DFI' | 'Infrastructure' | 'Energy';
  country: 'Uganda' | 'Kenya' | 'Tanzania' | 'Rwanda' | 'South Sudan' | 'Ethiopia' | 'DRC';
  sector: string;
  budgetUSD: number;
  publishDate: string;
  deadline: string;
  description: string;
  experienceRequiredYears: number;
  requiredDocuments: string[];
  localContentRequirementPercent: number;
  contactEmail: string;
  
  // CPIN V2 Upgraded Decision Intelligence Attributes
  winProbability: number;
  competitionScore: number; // 0-100 (high competition = low score or high density)
  riskScore: number; // 0-100
  complexityScore: number; // 0-100
  supplierMatchScore: number; // 0-100
  recommendedAction: 'Pursue Immediately' | 'Review Further' | 'Form Consortium' | 'Avoid';
  
  // Bid metrics
  estCompetitorsCount: number;
  estWinningBidRangeUSD: {
    min: number;
    max: number;
  };
  likelyIncumbentVendors: string[];
  
  // AI report highlights
  aiStrengths: string[];
  aiRisks: string[];
  missingRequirements: string[];
  recommendedStrategy: string;
}

export interface BuyerProfile {
  id: string;
  name: string;
  type: string;
  country: string;
  annualVolumeUSD: number;
  avgContractValueUSD: number;
  preferredSupplierComplexity: 'High' | 'Medium' | 'Low';
  frequentWinners: string[];
  contractAwardHistory: { year: number; val: number; count: number }[];
  seasonalityPeak: string;
  regionalPresence: string[];
  trustScore: number;
}

export interface SupplierProfile {
  id: string;
  name: string;
  contractsWon: number;
  totalContractValueUSD: number;
  winRatePercent: number;
  sectorExpertise: string[];
  countriesServed: string[];
  partnershipNetworkCount: number;
  supplierRiskScore: number; // 0-100 (lower is safer)
  growthTrend: 'Upward' | 'Stable' | 'Critical';
  competitivePosition: 'Market Leader' | 'Strong Contender' | 'Emerging Player' | 'Niche Specialist';
}

export interface ForecastItem {
  id: string;
  title: string;
  type: 'Upcoming Tender' | 'Framework Renewal' | 'Infrastructure Project' | 'Government Budget Release' | 'Donor Program Launch';
  sector: string;
  buyer: string;
  buyerType: string;
  valueUSD: number;
  predictedTimeline: 'Next 30 Days' | 'Next 90 Days' | 'Next 180 Days' | 'Next 12 Months';
  probabilityMatch: number; // 0-100
  strategicSignificance: 'High' | 'Medium' | 'Low';
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'Buyer' | 'Supplier' | 'Project' | 'NGO' | 'Donor' | 'Prime Contractor' | 'Subcontractor' | 'Joint Venture';
  country: string;
  valUSD?: number;
  description: string;
  complianceRating?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'Awarded Contract' | 'Joint Venture' | 'Vendor Registration' | 'Historical Supply' | 'Funding Relationship' | 'Subcontract Relationship';
  weight: number;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  data?: any; // Structured objects to show rich outputs
}
