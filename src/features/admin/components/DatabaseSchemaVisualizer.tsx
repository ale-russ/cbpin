import { useState } from 'react';
import { Database, Table, Key, Link, Code, HelpCircle } from 'lucide-react';

interface SchemaTable {
  name: string;
  description: string;
  fields: { name: string; type: string; isPk?: boolean; isFk?: boolean; refTable?: string; desc: string }[];
  sql: string;
}

export default function DatabaseSchemaVisualizer() {
  const [selectedTable, setSelectedTable] = useState<string>("users");
  const [showSql, setShowSql] = useState<boolean>(false);

  const schemas: Record<string, SchemaTable> = {
    users: {
      name: "users",
      description: "Stores subscriber credentials, access keys, and base tenant profile bindings.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Global unique identifier for user." },
        { name: "email", type: "VARCHAR(255)", desc: "Verified business email address." },
        { name: "password_hash", type: "VARCHAR(512)", desc: "Argon2id cryptographic hash string." },
        { name: "full_name", type: "VARCHAR(128)", desc: "User legal first & last string." },
        { name: "company_id", type: "UUID (Foreign Key)", isFk: true, refTable: "companies", desc: "Maps user to their registered business profile." },
        { name: "role_id", type: "VARCHAR(64)", isFk: true, refTable: "roles", desc: "Assigned access role in SaaS matrix." },
        { name: "remember_token", type: "VARCHAR(256)", desc: "Secure hash token for long-lived sessions." },
        { name: "created_at", type: "TIMESTAMP WITH TIME ZONE", desc: "Auto-generated record initiation stamp." }
      ],
      sql: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(512) NOT NULL,
  full_name VARCHAR(128) NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  role_id VARCHAR(64) REFERENCES roles(id),
  remember_token VARCHAR(256),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    companies: {
      name: "companies",
      description: "Business tenant entities with industrial categories, sizing metrics, and regional registries.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Global unique company identifier." },
        { name: "company_name", type: "VARCHAR(255)", desc: "Legally incorporated trade name of target." },
        { name: "industry", type: "VARCHAR(128)", desc: "Primary sector specialization (e.g., Oil, Agri)." },
        { name: "country", type: "VARCHAR(64)", desc: "Headquarters registry territory." },
        { name: "annual_revenue_range", type: "VARCHAR(64)", desc: "Sizing bucket for subscription mapping." },
        { name: "employee_count", type: "INTEGER", desc: "Operational headcount metric." },
        { name: "subscription_id", type: "UUID (Foreign Key)", isFk: true, refTable: "subscriptions", desc: "Active recurring license package." },
        { name: "certifications", type: "TEXT[]", desc: "Array of ISO or regional national credentials." }
      ],
      sql: `CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(128) NOT NULL,
  country VARCHAR(64) NOT NULL,
  annual_revenue_range VARCHAR(64),
  employee_count INTEGER,
  subscription_id UUID REFERENCES subscriptions(id),
  certifications TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    subscriptions: {
      name: "subscriptions",
      description: "SaaS licensing status, credit usages, payment mappings, and gateways.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Direct subscription primary key identifier." },
        { name: "plan", type: "VARCHAR(64)", desc: "Tier identifier (Free, SME, Pro, Enterprise)." },
        { name: "status", type: "VARCHAR(32)", desc: "Stripe/Mobil Money: ACTIVE, UNPAID, CANCELLED." },
        { name: "renewal_date", type: "TIMESTAMP", desc: "Next invoice batch execution schedule." },
        { name: "stripe_customer_id", type: "VARCHAR(128)", desc: "Unified payment gateway link profile." },
        { name: "ai_checks_used", type: "INTEGER", desc: "Monthly credit tracking tracker." },
        { name: "api_requests_limit", type: "INTEGER", desc: "Rate limiting parameters of tenant tier." }
      ],
      sql: `CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
  renewal_date TIMESTAMP NOT NULL,
  stripe_customer_id VARCHAR(128),
  ai_checks_used INTEGER DEFAULT 0,
  api_requests_limit INTEGER DEFAULT 50,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    roles: {
      name: "roles",
      description: "Authority groups (Guest, SME, Pro, Enterprise, Admin).",
      fields: [
        { name: "id", type: "VARCHAR(64) (Primary Key)", isPk: true, desc: "Unique text identifier of role." },
        { name: "name", type: "VARCHAR(64)", desc: "Readable role label." },
        { name: "description", type: "TEXT", desc: "High level intent statement." }
      ],
      sql: `CREATE TABLE roles (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL,
  description TEXT
);`
    },
    permissions: {
      name: "permissions",
      description: "Granular access checks attached to role maps.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Unique permission block." },
        { name: "role_id", type: "VARCHAR(64) (Foreign Key)", isFk: true, refTable: "roles", desc: "Subject role mapping." },
        { name: "capability", type: "VARCHAR(128)", desc: "Capability name (e.g. view_forecasts, invite_team)." },
        { name: "is_allowed", type: "BOOLEAN", desc: "True or false control switch." }
      ],
      sql: `CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
  capability VARCHAR(128) NOT NULL,
  is_allowed BOOLEAN NOT NULL DEFAULT FALSE
);`
    },
    opportunities: {
      name: "opportunities",
      description: "Aggregated regional tenders processed with AI suitability indicators.",
      fields: [
        { name: "id", type: "VARCHAR(64) (Primary Key)", isPk: true, desc: "Unique crawler ID (e.g. UG-PPDA-2026-0012)." },
        { name: "title", type: "VARCHAR(512)", desc: "Tender/RFP headline description." },
        { name: "buyer_id", type: "UUID (Foreign Key)", isFk: true, refTable: "buyers", desc: "Issuing agency vertex." },
        { name: "country", type: "VARCHAR(64)", desc: "Geographic boundary of works." },
        { name: "sector", type: "VARCHAR(128)", desc: "Standard industry sector classification." },
        { name: "budget_usd", type: "NUMERIC(15,2)", desc: "Approved budget allocation evaluated in USD." },
        { name: "publish_date", type: "DATE", desc: "Date compiled." },
        { name: "deadline", type: "DATE", desc: "Submissions lock epoch." },
        { name: "win_probability", type: "INTEGER", desc: "Calculated composite probability index (0-100)." },
        { name: "ai_evaluation_checks", type: "JSONB", desc: "Missing requirements lists and strengths checks." }
      ],
      sql: `CREATE TABLE opportunities (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  buyer_id UUID REFERENCES buyers(id),
  country VARCHAR(64) NOT NULL,
  sector VARCHAR(128) NOT NULL,
  budget_usd NUMERIC(15,2) NOT NULL,
  publish_date DATE NOT NULL,
  deadline DATE NOT NULL,
  win_probability INT CHECK (win_probability BETWEEN 0 AND 100),
  ai_evaluation_checks JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    buyers: {
      name: "buyers",
      description: "State bodies, NGOs, Concessionaires publishing tenders.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Unique buyer entry." },
        { name: "name", type: "VARCHAR(255)", desc: "Unified agency moniker." },
        { name: "country", type: "VARCHAR(64)", desc: "Territory center." },
        { name: "trust_score", type: "INTEGER", desc: "Evaluated payment delay score (0-100)." },
        { name: "annual_volume_usd", type: "NUMERIC(18,2)", desc: "Calculated annual trade balance map." }
      ],
      sql: `CREATE TABLE buyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(64) NOT NULL,
  trust_score INT CHECK (trust_score BETWEEN 0 AND 100),
  annual_volume_usd NUMERIC(18,2)
);`
    },
    suppliers: {
      name: "suppliers",
      description: "East African subcontractors and corporate prime bidders.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Unique supplier identity node." },
        { name: "name", type: "VARCHAR(255)", desc: "Business trading standard name." },
        { name: "win_rate_percent", type: "INTEGER", desc: "Evaluated historical bid win ratios." },
        { name: "risk_score", type: "INTEGER", desc: "Supplier performance rating scale index." },
        { name: "countries_served", type: "TEXT[]", desc: "Regional coverage registry array." }
      ],
      sql: `CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  win_rate_percent INT CHECK (win_rate_percent BETWEEN 0 AND 100),
  risk_score INT,
  countries_served TEXT[] NOT NULL
);`
    },
    saved_searches: {
      name: "saved_searches",
      description: "User search parameters mapped for automated push notifications.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Saved search uuid key." },
        { name: "user_id", type: "UUID (Foreign Key)", isFk: true, refTable: "users", desc: "Subscribing user." },
        { name: "search_title", type: "VARCHAR(128)", desc: "Custom named label." },
        { name: "query_string", type: "VARCHAR(256)", desc: "Elasticsearch input query." },
        { name: "filters_applied", type: "JSONB", desc: "Faceted attributes applied payload." },
        { name: "alert_frequency", type: "VARCHAR(32)", desc: "Instant, Daily, Weekly, Never." }
      ],
      sql: `CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  search_title VARCHAR(128) NOT NULL,
  query_string VARCHAR(256),
  filters_applied JSONB,
  alert_frequency VARCHAR(32) DEFAULT 'Daily',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    alerts: {
      name: "alerts",
      description: "Dynamic alert messages matching saved criteria.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Unique alert index." },
        { name: "user_id", type: "UUID (Foreign Key)", isFk: true, refTable: "users", desc: "Aimed subject subscriber." },
        { name: "title", type: "VARCHAR(255)", desc: "Alert core title line." },
        { name: "severity", type: "VARCHAR(32)", desc: "Safe Info, Warnings, Critical alerts." },
        { name: "is_read", type: "BOOLEAN", desc: "Is seen toggle." }
      ],
      sql: `CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  severity VARCHAR(32) DEFAULT 'Info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    notifications: {
      name: "notifications",
      description: "Logs of SMS / Email dispatches tracking deliverability.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Direct identifier key." },
        { name: "alert_id", type: "UUID (Foreign Key)", isFk: true, refTable: "alerts", desc: "Parent alert link." },
        { name: "channel", type: "VARCHAR(32)", desc: "SMS, EMAIL, WA, PUSH." },
        { name: "status", type: "VARCHAR(32)", desc: "PENDING, SENT, FAIL_BOUNCED." },
        { name: "sent_at", type: "TIMESTAMP", desc: "Delivery instant stamp." }
      ],
      sql: `CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES alerts(id) ON DELETE CASCADE,
  channel VARCHAR(32) NOT NULL,
  status VARCHAR(32) DEFAULT 'PENDING',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    },
    activity_logs: {
      name: "activity_logs",
      description: "Secured audit stream tracing operator behaviors on nodes.",
      fields: [
        { name: "id", type: "UUID (Primary Key)", isPk: true, desc: "Unique log key." },
        { name: "user_id", type: "UUID (Foreign Key)", isFk: true, refTable: "users", desc: "Operating subscriber." },
        { name: "action", type: "VARCHAR(256)", desc: "Brief description of behavior." },
        { name: "ip_address", type: "VARCHAR(45)", desc: "Resolved IPv4/IPv6 client agent." },
        { name: "resolved_region", type: "VARCHAR(128)", desc: "Evaluated IP geo location." }
      ],
      sql: `CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(256) NOT NULL,
  ip_address VARCHAR(45),
  resolved_region VARCHAR(128),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
    }
  };

  const selectedData = schemas[selectedTable];

  return (
    <div className="space-y-6">
      
      {/* Visual Title */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-sky-950 text-sky-400 font-mono font-bold px-2 py-0.5 rounded border border-sky-900 uppercase">
                Enterprise Data Architecture
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-mono text-slate-400">PostgreSQL Schema Map</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-1">Cross-Border Procurement Database Relational Graph</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              CPIN's operational database utilizes a robust, third-normal-form (3NF) relational layout configured with strict foreign key constraints, cascading logs, and optimized GIN indices for rapid multi-faceted Elasticsearch ingestion queries.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COMPILER DECK: TABLES SELECTOR (col-span-4) */}
        <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[600px]">
          <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF6321] uppercase">🗄️ SCHEMA ENTITIES</span>
            <span className="text-[9px] font-mono text-slate-500">12 CORE SCHEMAS</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 mt-4 pr-1">
            {Object.keys(schemas).map((key) => {
              const active = selectedTable === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTable(key)}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition ${
                    active 
                      ? 'bg-[#FF6321]/10 border-[#FF6321] text-[#FF6321]' 
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-3.5 w-3.5" />
                    <span>dbo.{key}</span>
                  </div>
                  {active && <span className="text-[9px] animate-pulse">● SECURED</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT ANALYTICS BOARD: SCHEMA DRAW CARD (col-span-8) */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-[600px] overflow-y-auto custom-scroll">
          
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase">dbo.{selectedData.name} DB METEDATA SCHEMA</span>
              <h3 className="text-base font-bold text-slate-100">{selectedData.name} Entity Map</h3>
            </div>
            
            <button
              onClick={() => setShowSql(!showSql)}
              className="px-3.5 py-1.5 bg-slate-950 text-[10px] font-mono font-bold text-[#FF6321] border border-slate-800 rounded-lg hover:border-[#FF6321]/50 flex items-center gap-1.5 transition"
            >
              {showSql ? <Table className="h-3.5 w-3.5" /> : <Code className="h-3.5 w-3.5" />}
              {showSql ? "View Attribute Diagram" : "View SQL DDL Code"}
            </button>
          </div>

          <p className="text-xs text-slate-400 my-4 bg-slate-950/40 p-3 rounded border border-slate-850">
            💬 <span className="font-bold text-slate-300">Description:</span> {selectedData.description}
          </p>

          <div className="flex-1">
            {showSql ? (
              <div className="h-full bg-slate-950 border border-slate-850 rounded-lg p-4 font-mono text-xs overflow-auto leading-relaxed relative">
                <span className="absolute top-2 right-2 text-[9px] bg-slate-900 text-slate-500 px-2 py-0.5 border border-slate-800 rounded">
                  POSTGRESQL 15
                </span>
                <pre className="text-sky-300 whitespace-pre"><code className="text-sky-300">{selectedData.sql}</code></pre>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1">
                  STRUCTURE ATTRIBUTE DICTIONARY
                </span>
                
                <div className="border border-slate-850 bg-slate-950 rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-[10px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-850">
                      <tr>
                        <th className="px-4 py-2.5">Attribute Name</th>
                        <th className="px-4 py-2.5">Data Type</th>
                        <th className="px-4 py-2.5">Key Status</th>
                        <th className="px-4 py-2.5">Description Constraints</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {selectedData.fields.map((field) => (
                        <tr key={field.name} className="hover:bg-slate-900/40 transition">
                          <td className="px-4 py-2.5 font-mono text-slate-100 font-semibold">{field.name}</td>
                          <td className="px-4 py-2.5 font-mono text-slate-400">{field.type}</td>
                          <td className="px-4 py-2.5">
                            {field.isPk ? (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-amber-950/50 border border-amber-900 text-amber-400 font-bold flex items-center gap-1 w-max">
                                <Key className="h-2 w-2" /> PK
                              </span>
                            ) : field.isFk ? (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-violet-950/50 border border-violet-900 text-violet-400 font-bold flex items-center gap-1 w-max">
                                <Link className="h-2 w-2" /> FK ➔ {field.refTable}
                              </span>
                            ) : (
                              <span className="text-slate-600 font-mono text-[10px]">-</span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-slate-400 leading-normal">{field.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* DB Sync indicator */}
                <div className="p-3 bg-[#140d08] border border-[#302010] rounded-lg mt-4 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping"></div>
                    <span className="text-[#FF6321] font-bold">DATABASE CONSTRAINT METRIC STATUS</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">REPLICA IN SYNC (2 ms latency)</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
