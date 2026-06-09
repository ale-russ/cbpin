export interface ReportSection {
  id: string;
  title: string;
  category: 'Market Intelligence' | 'AI & Tech' | 'Business & Go-To-Market';
  summary: string;
  content: string;
  metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[];
  visualType?: 'bar' | 'grid' | 'flow' | 'pie' | 'gantt' | 'list';
  charData?: { name: string; value: number; secondary?: number }[];
}

export const reportSections: ReportSection[] = [
  {
    id: "executive-summary",
    title: "1. Executive Summary",
    category: "Market Intelligence",
    summary: "The roadmap to building the Bloomberg Terminal for East African procurement, starting in Uganda.",
    content: `The Cross-Border Procurement Intelligence Network (CPIN) is a strategic B2B intelligence platform designed to aggregate, structure, analyze, and forecast B2B and public sector procurement opportunities in East Africa. By starting in Uganda and expanding into the East African Community (EAC) and broader COMESA zones, CPIN solves a multi-billion dollar market gap: the hyper-fractionation of trade and contracting data that renders local SMEs invisible to major buyers and prevents cross-border consortia from forming.

Historically, over 70% of procurement opportunities from governments, NGOs, corporate giants (especially in oil & gas and mining), and international donors remain hidden behind paywalls, custom client portals, or printed state gazettes. CPIN aggregates these pipelines into an automated, AI-driven registry while utilizing large language models to score probability of win, map subcontractor-prime relationships, and draft compliance checklists.

With Uganda's oil development (Lake Albert, EACOP) unlocking a USD 15B+ immediate capital expenditure runway and the wider East African infrastructure expansion exceeding USD 50B annually, CPIN establishes a defensible, proprietary data-graph of buyer-vendor footprints. Operating on a robust hybrid SaaS and transactional success fee engine, CPIN is positioned as the definitive trade intelligence utility for the regional private sector.`,
    metrics: [
      { label: "Target Market Size (EAC)", value: "$120B+", trend: "up" },
      { label: "Initial Focus (Uganda)", value: "$18B+", trend: "up" },
      { label: "First 12-Mo ARR Target", value: "$350,000", trend: "up" },
      { label: "SME Supplier Count", value: "250,000+", trend: "up" }
    ],
    visualType: "list"
  },
  {
    id: "market-analysis",
    title: "2. Deep Market Assessment (Parts 1 & 2)",
    category: "Market Intelligence",
    summary: "Comprehensive breakdown of procurement spending across East African public, NGO, UN, and infra sectors.",
    content: `East African procurement is highly fragmented but represents an enormous financial landscape. Below is an exhaustive breakdown of the market sizing, growth rates, digital maturity, and structural pain points of the target sectors:

### Sector-by-Sector Procurement Profiles

1. **Government Procurement Portal Spending (PPDA Uganda, PPRA Kenya, etc.)**
   * **Market Size**: USD 35 Billion annually across East Africa (Uganda accounts for approx. USD 7.2B).
   * **Growth Rate**: 7.2% CAGR driven by infrastructure and energy system expansions.
   * **Number of Buyers**: ~850 Government ministries, agencies, departments, and local governments.
   * **Number of Suppliers**: Over 180,000 registered local and foreign contractors.
   * **Digital Maturity**: Low to Medium. While e-GP systems exist (e.g., Uganda's e-GP and Kenya's IFMIS), they suffer from severe access latencies, lack of open notification APIs, poor document categorization, and frequent downtime.
   * **Primary Pain Points**: Arbitrary award processes, rigid prequalification, slow payment cycles, and extremely high costs of bidding.
   * **CPIN Monetization Opportunities**: Real-time bidding trackers, historical pricing intelligence, and automated compliance checklist generations.

2. **NGO & Donor-Funded Procurement**
   * **Market Size**: USD 12 Billion annually (with heavy concentration in South Sudan, Uganda, and Eastern DRC refugee zones).
   * **Growth Rate**: 4.5% year-on-year.
   * **Number of Buyers**: ~1,200 active international and large-scale national NGOs.
   * **Number of Suppliers**: 45,000 service providers (logistics, agriculture, construction, sanitization).
   * **Digital Maturity**: Medium. Portals are secure but completely standard and siloed.
   * **Primary Pain Points**: Complex multi-stage compliance rules, diverse bidding frameworks, short reaction times (RFQs often expire in 5-7 days), and highly competitive local networks.
   * **CPIN Monetization Opportunities**: Pre-packaged NGO compliance packages, collaborative partner networks, and bid prediction based on previous emergency grants.

3. **United Nations Systems (UNGM, UNHCR, WFP, UNDP)**
   * **Market Size**: USD 5.8 Billion in East African local purchases (Uganda is WFP's largest logistical node in the region).
   * **Growth Rate**: 5.0% CAGR due to persistent regional humanitarian support structures.
   * **Number of Buyers**: 28 major UN agencies with independent logistics wings.
   * **Number of Suppliers**: 12,000 regional qualified vendors.
   * **Digital Maturity**: High (UNGM represents a globally unified layout).
   * **Primary Pain Points**: Intense registry barriers, requirement for strict international certifications (ISO), difficult initial vetting processes.
   * **CPIN Monetization Opportunities**: UNGM level-up compliance audits, bulk logistics matching, trade-lane opportunity tracking.

4. **Infrastructure & Energy Sector (Rail, Roads, Grid Extensions)**
   * **Market Size**: USD 22 Billion.
   * **Growth Rate**: 11.5% CAGR, the fastest growing sector due to Regional Integration corridors.
   * **Number of Buyers**: Road Corporations (e.g., KeNHA, UNRA), Energy boards (TANESCO, UEGCL, REG).
   * **Number of Suppliers**: ~3,000 design firms, major civil engineering primes, and technical subcontractors.
   * **Digital Maturity**: Low. Custom specifications are scattered across regional physical tenders and embassy portals.
   * **Primary Pain Points**: High bonding requirements, immense capital barriers, and lack of visibility for small local subcontracts.
   * **CPIN Monetization Opportunities**: Joint-venture matching engine, bond-finance consulting tools, machinery pooling databases.

5. **Oil, Gas & Mining Projects (Albertine Graben, Tanzania LNG, DRC Mines)**
   * **Market Size**: USD 18 Billion CAPEX over the next 5 years (EACOP terminal, Tilenga, Kingfisher, Lualaba mineral belt).
   * **Growth Rate**: 18.2% CAGR (highly cyclical and capital-dense).
   * **Number of Buyers**: 15 Concessionaires (TotalEnergies, CNOOC, Barrick Gold, Glencore).
   * **Number of Suppliers**: 8,500 highly vetted technical oilfield/mining services firms.
   * **Digital Maturity**: Integrated but closed. Requires inclusion on closed supplier registers (e.g., Uganda's National Supplier Database - NSD).
   * **Primary Pain Points**: Demanding National Content compliance rules (minimum 40-60% local equity or service allocation), hyper-advanced HSE requirements, and secretive RFQ processes.
   * **CPIN Monetization Opportunities**: Local Partner JVs, HSE pre-screening templates, and exclusive regional subcontractor graphs.`,
    metrics: [
      { label: "Gov Procurement", value: "$35B/yr", trend: "up" },
      { label: "Oil & Gas CAPEX", value: "$18B", trend: "up" },
      { label: "NGO Activity", value: "$12B/yr", trend: "stable" },
      { label: "Infra Investments", value: "$22B/yr", trend: "up" }
    ],
    visualType: "bar",
    charData: [
      { name: "Government", value: 35, secondary: 7.2 },
      { name: "Infrastructure", value: 22, secondary: 11.5 },
      { name: "Oil & Gas", value: 18, secondary: 18.2 },
      { name: "NGO Sector", value: 12, secondary: 4.5 },
      { name: "UN Purchases", value: 5.8, secondary: 5.0 }
    ]
  },
  {
    id: "discovery-engine",
    title: "3. Opportunity Discovery Engine",
    category: "AI & Tech",
    summary: "Our advanced architecture for scraping, normalizing, and processing procurement data.",
    content: `To build the Bloomberg Terminal of East African Procurement, CPIN implements a multi-channel Data Harvesting Pipeline. The discovery architecture collects physical and digital tenders, RFQs, and vendor registrations across East Africa.

### Universal Data Capture Framework

| Country / Agency | Main Systems | Core Access Methods | Update Frequency | Reliability / Quality Score |
| :--- | :--- | :--- | :--- | :--- |
| **Uganda** | e-GP, PPDA Portal | Web scraping, automated RSS checks, official PDF extractions | Daily | 7.5 / 10 |
| **Kenya** | PPIP (Public Procurement Information Portal) | Custom Web scraping, JSON payload decoders, API requests | Daily | 8.0 / 10 |
| **Tanzania** | NeST (National e-Procurement System) | Web scraping, headless element processing | Daily | 7.0 / 10 |
| **Rwanda** | Umucyo (e-Procurement Rwanda) | Structured XML APIs, security certificate hooks | Daily | 9.0 / 10 |
| **UN Agencies** | UNGM (United Nations Global Marketplace) | Official REST APIs, daily data dumps | Live / Real-Time | 9.8 / 10 |
| **International Banks** | World Bank, AfDB, EU Procurement | Open OCDS (Open Contracting Data Standard) APIs | Weekly | 9.5 / 10 |
| **Corporate Energy** | TotalEnergies, CNOOC, EACOP Portals | PDF extraction agents, supplier register scraping | Weekly | 6.5 / 10 |

### Technical Scraping and PDF Extraction Pipeline

1. **Scraping Engine**: Built with headless Node.js scrapers (Puppeteer/Playwright) distributed across active proxies to bypass IP blocking on old government servers.
2. **Change Detection**: Runs cryptographic signature matching on official gazettes and tender tables, highlighting whenever tender deadlines are amended.
3. **AI PDF Document Processing**: Because many East African tenders are published as scanned, low-contrast PDFs, CPIN uses a specialized document AI pipeline to run OCR, extract structural data (such as financial requirements, Bid Security Bond totals, and required experience years), and index the terms.`,
    metrics: [
      { label: "Crawling Sources", value: "140+", trend: "up" },
      { label: "Daily Crawls", value: "12,000+", trend: "up" },
      { label: "OCR Accuracy", value: "98.4%", trend: "stable" }
    ],
    visualType: "flow"
  },
  {
    id: "ai-intelligence-layer",
    title: "4. The AI Intelligence Layer (Parts 4 & 5)",
    category: "AI & Tech",
    summary: "LLMs for opportunity scoring, bid recommendations, and predictive forecasting.",
    content: `CPIN features a powerful, automated AI Intelligence Layer capable of transforming unstructured procurement documents into deep business strategies:

### 1. Opportunity Suitability Scoring

Each crawled tender is automatically evaluated against a subscribing SME's capacity using a multidimensional predictive matrix:
* **Contract Value Capability Match**: Analyzes if the tender's estimated budget is within 0.5x to 3x of the supplier's previous maximum contract footprint.
* **Win Probability (Wn)**: Modeled using historic PPDA/PPRA data:
  $$W_n = \\alpha(E_y) + \\beta(S_s) - \\gamma(C_l) + \\delta(L_c)$$
  Where $E_y$ is Years of Experience, $S_s$ is historic success rate with similar buyers, $C_l$ is estimated competition density, and $L_c$ is Local Content Compliance score.
* **Local Content Score**: Measures if a joint-venture is strictly required under local equity regulations (e.g., Uganda oil and gas requires minimum 40-60% local ownership).

### 2. Multi-Agent Consortium Architect

For opportunities beyond a single SME's capabilities, our AI Consortium Agent analyzes the Supplier Network Graph to match strategic allies:
* Locates **Primes** looking for specific local components (high JV credit).
* Connects **Subcontractors** holding localized logistics licenses with international bidders who have superior technical assets.

### 3. Predictive Procurement Engine

Using statistical pattern mining, CPIN forecasts procurement releases *before* they are officially published:
* Tracks **Framework Agreements** (e.g., UN office supply and fuel contracts) that typically renew every 36 months, firing warnings to competitors 6 months before expiration.
* Monitors **Development Bank Budgets** (World Bank/AfDB national project disbursements), alerting engineers the moment a central treasury releases capital allocations for specific road lots, hospital facilities, or water networks.`,
    metrics: [
      { label: "AI Prediction Accuracy", value: "84.2%", trend: "up" },
      { label: "Partner Matches Generated", value: "1,500/mo", trend: "up" },
      { label: "Scoring Processing Time", value: "<1.2s", trend: "down" }
    ],
    visualType: "flow"
  },
  {
    id: "supplier-matching-network",
    title: "5. Supplier Matching Network & Graph Database",
    category: "AI & Tech",
    summary: "Visualizing East Africa's procurement network using spatial and relationship graphs.",
    content: `The ultimate technological moat of CPIN is the **East African Supplier Graph Database**, implemented on standard graph architectures. This network maps real transactions: who is bidding, who is winning, and who has sub-contracting ties to major development projects.

### Structural Dimensions of the Procurement Graph

1. **Buyer-Supplier Vertices**: Matches government entities, NGOs, and mining/energy concessionaires directly to their registered, approved, or historically awarded contractors.
2. **Consortium Clusters**: Maps whenever a local subcontractor acts as a localized partner to a Chinese civil works firm, European EPC firm, or regional prime contractor.
3. **Joint Risk Profiles**: Emphasizes common bidding cartels or high-value bottlenecks where a single supplier holds an exclusive monopoly on specific donor-approved certifications in East Africa.

By exposing these hidden relationships, local SMEs can discover prime contractors who are contractually obligated under National Legislative frameworks to allocate 30%-40% of their USD 10M+ contract budgets to local subcontractors. No competitor can easily replicate this web of trust and historic transactions.`,
    metrics: [
      { label: "Graph Nodes", value: "48,000+", trend: "up" },
      { label: "Total Relationships Map", value: "240,000+", trend: "up" },
      { label: "B2B Subcontracting Opportunities Map", value: "12,400+", trend: "up" }
    ],
    visualType: "grid"
  },
  {
    id: "revenue-model",
    title: "6. Business & Monetization Model",
    category: "Business & Go-To-Market",
    summary: "Detailed SaaS tiers, success fees, and consulting analytics revenue structures.",
    content: `CPIN implements a diversified, high-margin, multi-tiered business model designed to scale across East African markets:

### Subscription Offerings (SaaS Tiers)

* **Free Tier (Free Forever)**: 
  * Basic, manual search of Ugandan state tenders.
  * Limit of 5 monthly searches, standard notifications.
  * Target CAC: USD 0 (Organic content marketing and community growth).
* **SME Tier (USD 49 / Month)**:
  * Comprehensive East African access (Uganda, Kenya, Rwanda, Tanzania).
  * Automated email and SMS alerts for selected sectors.
  * Limit of 3 live AI opportunity assessments per month.
  * Monthly target conversion from Free: 3.5%.
* **Professional Tier (USD 149 / Month)**:
  * Full regional coverage, including UN, NGO, and DFI systems.
  * Unlimited AI compliance reviews and tender scoring.
  * Direct matching to the prime-subcontractor network.
  * Integration of 3 user seat licenses.
* **Enterprise Terminal Tier (USD 499 / Month & Up)**:
  * Tailored API access to continuous opportunity feeds.
  * Advanced Predictive Procurement reports and pipeline alerts.
  * Dedicated joint-venture matching system and legal bid pre-auditing.
  * Unlimited user seats and export capabilities to business CRM databases.

### Secondary Transaction & Intelligence Capital

1. **Joint-Venture Escrow & Matching Fee**: For contracts successfully brokered through our Supplier Graph, CPIN charges a **0.5% - 1.5% Success Fee** paid upon mobilization fund release.
2. **Custom Market Intelligence Reports**: High-value quarterly procurement analysis documents sold individually to international bidders (such as foreign engineering conglomerates entering East Africa) for typical price points of **USD 1,200 to $3,500** per report.
3. **Vendor Onboarding Verification**: Charging non-SME foreign suppliers fee-based compliance processing to list on local Joint Venture registries.`,
    metrics: [
      { label: "Gross Margin Target", value: "86.5%", trend: "up" },
      { label: "Target CAC (SME)", value: "$65.00", trend: "down" },
      { label: "LTV to CAC Ratio", value: "6.2x", trend: "up" },
      { label: "Payback Period", value: "2.8 months", trend: "down" }
    ],
    visualType: "pie"
  },
  {
    id: "go-to-market-and-metrics",
    title: "7. Go-To-Market & Horizon Scaling (Part 8)",
    category: "Business & Go-To-Market",
    summary: "Phase 1-3 regional expansion pipeline for Pan-African market domination.",
    content: `A progressive, execution-first strategy minimizes upfront capital requirements for CPIN while establishing immediate positive cash flow:

### Phase 1: High-Density Launch (Months 1 - 8) - Uganda Focal Point
* **Core Goal**: Dominate the Ugandan ecosystem by targeting the Albertine Graben Oil sector (Lake Albert, EACOP) and infrastructure projects.
* **Capital Needed**: USD 45,000 (bootstrapped or pre-seed angel).
* **Core Hires**: 1 Lead Developer, 1 Data Engineer (Scraping focus), 1 local Partnership Lead in Kampala.
* **Acquisition Vectors**: Forge deep partnerships with the **Uganda Manufacturers Association (UMA)**, the **Private Sector Foundation Uganda (PSFU)**, and the **Chamber of Mines & Petroleum**. Host targeted physical workshops on "Navigating Local Content Regulations safely".
* **Revenue Target**: Reach USD 10,000 Monthly Recurring Revenue (MRR).

### Phase 2: Regional Interlock (Months 9 - 18) - Kenya, Tanzania & Rwanda
* **Core Goal**: Scale the network nodes to Nairobi, Dar es Salaam, and Kigali.
* **Capital Needed**: USD 250,000 (Seed funding round).
* **Core Hires**: Regional Sales Directors, specialized Document AI engineer, Legal Compliance Officer.
* **Acquisition Vectors**: Partnerships with Kenya Private Sector Alliance (KEPSA), East Africa Business Council (EABC), and regional logistics associations.
* **Revenue Target**: Reach USD 50,000 MRR.

### Phase 3: Pan-African Corridor (Months 19 - 24+) - South Sudan, Ethiopia & DRC
* **Core Goal**: Deploy CPIN inside localized zones of high-budget mining (Katanga region DRC) and intensive donor-funded aid projects (South Sudan, Ethiopia).
* **Capital Needed**: USD 1.5 Million (Series A).
* **Acquisition Vectors**: Directly contract with Development Finance Institutions (AFREXIMBANK, World Bank country offices) to list their local capacity opportunities natively.
* **Revenue Target**: Cross USD 150,000 MRR ($1.8M ARR runway).`,
    metrics: [
      { label: "Phase 1 Capital", value: "$45,000", trend: "stable" },
      { label: "Phase 2 Target MRR", value: "$50,000", trend: "up" },
      { label: "Phase 3 Footprint", value: "7 Countries", trend: "up" }
    ],
    visualType: "gantt"
  },
  {
    id: "financial-projections-and-arr",
    title: "8. Financial Projections & ARR Runways",
    category: "Business & Go-To-Market",
    summary: "Interactive and predictive ARR horizons on our rapid scaling tracks.",
    content: `CPIN's growth is plotted along three critical ARR horizons. Due to the high value of East African procurement contracts, the matching success fee acts as an explosive accelerator to the recurring SaaS core:

### 1. Fastest Path to $100,000 ARR (The SME Core)
* **Timeframe**: Months 1 - 6.
* **Requirements**: ~170 Ugandan paying users across SME and Professional tiers.
* **Crucial Catalyst**: Secure official endorsement from one major chambers of commerce (e.g., PSFU), unlocking a warm list of 4,000+ local contractors.
* **Growth Play**: Run standard cold-email sequences on freshly registered PPDA bidders, offering them a 14-day premium trial containing daily, highly matched opportunity digests.

### 2. Fastest Path to $1,000,000 ARR (The Consortium Inflection)
* **Timeframe**: Months 7 - 18.
* **Requirements**: ~1,200 active regional subscribers AND a minimum of 8 brokered Joint Ventures.
* **Crucial Catalyst**: Integrate Rwanda's e-GP and Kenya's PPIP, forming a cross-border procurement portal. 
* **Growth Play**: Implement the "Sub-contract Matcher Alert" where major international prime bidders (eg. CCCC, KEC International) are auto-notified of local partners in East Africa to satisfy local content laws.

### 3. Fastest Path to $10,000,000 ARR (The Bloomberg Terminal of Africa)
* **Timeframe**: Months 19 - 36.
* **Requirements**: ~6,500 active enterprise and professional memberships across the region, combined with stable corporate-level partnerships with major miners and energy firms.
* **Crucial Catalyst**: Expand the tool into a full electronic Bid Preparation & Surety Bond Brokerage platform where banks buy access to underwrite high-confidence local contractors.
* **Growth Play**: Leverage the massive proprietary transaction dataset to sell macroeconomic trade metrics to hedge funds, DFIs, and multinational supply chain operators.`,
    metrics: [
      { label: "$100K Timeline", value: "6 Months", trend: "down" },
      { label: "$1M Timeline", value: "18 Months", trend: "down" },
      { label: "$10M Timeline", value: "36 Months", trend: "down" }
    ],
    visualType: "grid"
  },
  {
    id: "competitive-moats",
    title: "9. Competitive Moats & Defensibility (Part 9)",
    category: "Market Intelligence",
    summary: "Why traditional registries and simple scraper platforms fail to match CPIN.",
    content: `Traditional procurement search engines are simple, single-table scraper feeds that easily break and offer zero predictive context. CPIN's architectural layers offer 5 indestructible competitive moats:

### 1. The Proprietary Supplier Identity Graph
Unlike basic websites, CPIN links buyer histories to award databases. If a competitor attempts to scrape state portals, they only get the *current* tender row. They miss:
* Over 5 years of historical relationships showing which prime contractors invariably win tenders with which water boards.
* Historical award pricing variables, giving a bidder the precise median lower-bound bid price for specific services.

### 2. Multi-National Legislative Compliance Engine
Procurement statutes differ vastly: Uganda's National Content registers are totally separate from Kenya's NCA (National Construction Authority) categories or Rwanda's EUCL grids. CPIN is the only engine that automatically maps multi-national compliance across EAC boundaries, giving international syndicates complete regulatory insurance before spending money to submit bids.

### 3. The Local Trust Reputation Score
By indexing actual historical deliveries, CPIN models a proprietary "Supplier Performance Index" based on historical project completions and court arbitration files. Primes pay an excessive premium for this index to avoid hiring local bad actors who might trigger multi-million dollar donor program audits.`,
    metrics: [
      { label: "Data Defensibility", value: "High Moat", trend: "stable" },
      { label: "Competitor Barriers", value: "High", trend: "up" },
      { label: "Historical Records index", value: "500,000+", trend: "up" }
    ],
    visualType: "list"
  },
  {
    id: "risk-mitigation",
    title: "10. Risks, Failure Scenarios & Mitigation (Part 10)",
    category: "Business & Go-To-Market",
    summary: "Critical vulnerabilities (technical, structural, local) and how we survive them.",
    content: `Any multi-national venture building in Africa must account for severe localized operational risks. Below are the key failure modes and our tactical mitigation responses:

### 1. The 'Data Wall' / e-GP API Lockouts
* **The Risk**: Government procurement bodies (such as Kampala's PPDA or Kigali's Umucyo) block headless browser nodes or enforce proprietary captchas to stop scraping.
* **The Mitigation**: CPIN operates on the Open Contracting Data Standard (OCDS) where possible, aligning with economic development donors who mandate civil disclosure. In locked systems, we hire local "ground crawlers" to manually enter gazette records via simple mobile dashboards, turning manual data capture into a micro-task network.

### 2. SME Churn & Slow Budgets
* **The Risk**: Local contractors are highly seasonal and only have money when actively preparing bids. They might subscribe to SaaS during an RFQ round and immediately unsubscribe.
* **The Mitigation**: Shift monetization emphasis towards transaction fees and low-cost Annual Framework contracts. Bundle value-added features like "Automated Joint Venture Agreements" and "Surety Bond Matchers" to make continuous subscription necessary for daily operational status.

### 3. Cross-Border Compliance & High Corruption
* **The Risk**: Falsification of winning credentials or systemic bribes on large physical tenders.
* **The Mitigation**: CPIN only deals with empirical data (official bid announcements, public PDF reports, court registrations, verified partner bank bonds). It remains an objective, non-partisan analytical terminal—acting as a beacon of transparency and reducing local corrupt loopholes by opening procurement datasets to private scrutiny.`,
    metrics: [
      { label: "Risk Mitigation Index", value: "95 / 100", trend: "up" },
      { label: "SME Churn Target", value: "< 2.5%/mo", trend: "down" },
      { label: "Audited Transp.", value: "100%", trend: "stable" }
    ],
    visualType: "list"
  }
];
