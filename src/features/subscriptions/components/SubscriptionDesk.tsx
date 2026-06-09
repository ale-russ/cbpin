import { useState } from 'react';
import { CreditCard, ShieldCheck, Zap, Download, RefreshCw, Layers, Calendar, Check, Landmark, Terminal, Clock, Activity } from 'lucide-react';

interface SubscriptionDeskProps {
  currentRole: 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator';
  onUpgradeCompleted: (newRole: 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator') => void;
  onNavigateToView?: (view: string) => void;
}

export default function SubscriptionDesk({ currentRole, onUpgradeCompleted, onNavigateToView }: SubscriptionDeskProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNo, setCardNo] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [selectedBillingHistoryItem, setSelectedBillingHistoryItem] = useState<any | null>(null);

  const plans = [
    {
      id: "Free",
      name: "Guest / Free",
      price: "0",
      role: "Guest",
      desc: "Perfect for testing basic search indices and public gazettes.",
      frequency: "forever",
      features: [
        "View limited opportunities (Uganda Roads, UNHCR cookstoves)",
        "Basic keyword matching checks",
        "Community help forums",
        "Average 2-second search latency",
      ],
      usage: "Standard indexing speed"
    },
    {
      id: "SME",
      name: "SME User Tier",
      price: "49",
      role: "SME User",
      desc: "Designed for small contracting firms looking to secure early contracts.",
      frequency: "month",
      features: [
        "Unrestricted search over 500 Opportunities",
        "Save bookmark opportunities & draft listings",
        "Set custom email alerts dispatches",
        "Elasticsearch Typo tolerance",
        "3 dynamic AI checklists reviews per month",
      ],
      usage: "API Limits: 100 queries / day"
    },
    {
      id: "Professional",
      name: "Professional Core",
      price: "149",
      role: "Professional User",
      desc: "For growing operators hunting international contracts & joint ventures.",
      frequency: "month",
      features: [
        "Full regional forecasts access",
        "Unlocks premium Opportunity Match Scores",
        "View historical Buyer Intelligence reviews",
        "Review comprehensive Competitor analytics",
        "Configurable custom SMS alerts system"
      ],
      usage: "API Limits: 2,500 queries / day"
    },
    {
      id: "Enterprise",
      name: "Enterprise Terminal",
      price: "499",
      role: "Enterprise User",
      desc: "Bloomberg-grade operational desk for multi-national conglomerates.",
      frequency: "month",
      features: [
        "Strategic Partner Consortium recommendation matching",
        "Unlimited AI checklist calculations",
        "Access Interactive Regional Trade Maps",
        "Interactive Procurement Graph Relationship Map",
        "Full team member workspaces",
        "Direct JSON data export & CRM syncing dispatches"
      ],
      usage: "API Limits: Unlimited queries"
    }
  ];

  const billingHistory = [
    { id: "INV-2026-0044", date: "2026-05-01", amount: "$149.00", status: "Paid", description: "Professional Core Subscription (Monthly)", method: "Visa Code ending 4242" },
    { id: "INV-2026-0032", date: "2026-04-01", amount: "$149.00", status: "Paid", description: "Professional Core Subscription (Monthly)", method: "Visa Code ending 4242" },
    { id: "INV-2026-0019", date: "2026-03-01", amount: "$149.00", status: "Paid", description: "Professional Core Subscription (Monthly)", method: "Visa Code ending 4242" }
  ];

  const usageStats = {
    searchesPerformed: 145,
    searchesLimit: currentRole === 'Guest' ? 5 : currentRole === 'SME User' ? 100 : currentRole === 'Professional User' ? 2500 : 999999,
    aiUnitsUsed: 22,
    aiUnitsLimit: currentRole === 'Guest' ? 0 : currentRole === 'SME User' ? 3 : currentRole === 'Professional User' ? 15 : 999999,
    alertsConfigured: 3,
    alertsLimit: currentRole === 'Guest' ? 1 : currentRole === 'SME User' ? 5 : currentRole === 'Professional User' ? 15 : 999999
  };

  const currentPlanName = currentRole === 'Guest' ? 'Guest / Free' : currentRole === 'SME User' ? 'SME User' : currentRole === 'Professional User' ? 'Professional Core' : currentRole === 'Enterprise User' ? 'Enterprise Terminal' : 'Administrator Supreme';

  const handleOpenUpgrade = (planId: string) => {
    // If Admin, bypass
    if (currentRole === 'Administrator') return;
    setSelectedPlan(planId);
    setCardNo("4242 4242 4242 4242");
    setCardHolder("Sarah Alubas - CPIN Procurement");
    setCvv("385");
    setExpiry("12/28");
    setPaymentSuccess(false);
  };

  const handleCheckoutSubmit = (e: any) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      const matchedPlan = plans.find(p => p.id === selectedPlan);
      if (matchedPlan) {
        onUpgradeCompleted(matchedPlan.role as any);
      }
      setTimeout(() => {
        setSelectedPlan(null);
        setPaymentSuccess(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Alert bar if user upgraded */}
      {paymentSuccess && (
        <div className="bg-emerald-900 border-2 border-[#00FF00] p-4 rounded-xl flex items-center justify-between text-xs font-mono animate-bounce shadow-[0_0_15px_#00FF00]">
          <span className="text-[#00FF00] font-black uppercase">✔ PAYMENT CLEAR // LICENSING GRANTED // ROLE RE-CONFIGURED INSTANTLY</span>
          <span className="text-slate-300">Synchronized (1ms)</span>
        </div>
      )}

      {/* Main SaaS billing detail row */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-950 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-900 uppercase">
                SaaS Subscription Desk
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-xs font-mono text-slate-500">Terminal Control</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Upgrade Licensing & Billing</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Select an operational seat package tailored to your structural footprint. All accounts default to KES/UGX multi-currency pricing but balances are denominated in floating USD equivalents to guarantee inflation hedges.
            </p>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl max-w-xs flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FF6321]/10 border border-[#FF6321]/40 rounded-full flex items-center justify-center font-bold text-lg text-[#FF6321]">
              ₦
            </div>
            <div>
              <span className="text-[9px] text-slate-500 block uppercase font-mono">Current Active Seat</span>
              <strong className="text-sm text-[#FF6321] font-extrabold block">{currentPlanName}</strong>
              <span className="text-[8px] text-emerald-400 font-mono block">Status: Active / Safe sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Analytics indicators */}
      <div>
        <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-3 block font-bold">Monthly Usage Quotas (EAC Portal Analytics)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block">SaaS Search Queries executed</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold font-mono text-slate-200">{usageStats.searchesPerformed}</span>
                <span className="text-slate-500 text-xs font-mono">/ {usageStats.searchesLimit === 999999 ? 'Unlimited' : usageStats.searchesLimit}</span>
              </div>
            </div>
            <div className="w-14 h-14 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#1a1a1a" strokeWidth="4" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#FF6321" strokeWidth="4" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 22} 
                        strokeDashoffset={2 * Math.PI * 22 * (1 - Math.min(1, usageStats.searchesPerformed / usageStats.searchesLimit))} />
              </svg>
              <span className="absolute text-[8px] font-mono text-slate-400">
                {Math.round((usageStats.searchesPerformed / usageStats.searchesLimit) * 100) || 0}%
              </span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block">AI Suitability reviews</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold font-mono text-slate-200">{usageStats.aiUnitsUsed}</span>
                <span className="text-slate-500 text-xs font-mono">/ {usageStats.aiUnitsLimit === 999999 ? 'Unlimited' : usageStats.aiUnitsLimit}</span>
              </div>
            </div>
            <div className="w-14 h-14 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#1a1a1a" strokeWidth="4" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#FF9E00" strokeWidth="4" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 22} 
                        strokeDashoffset={2 * Math.PI * 22 * (1 - Math.min(1, usageStats.aiUnitsUsed / usageStats.aiUnitsLimit))} />
              </svg>
              <span className="absolute text-[8px] font-mono text-slate-400">
                {usageStats.aiUnitsLimit === 999999 ? 'Inf' : `${Math.round((usageStats.aiUnitsUsed / usageStats.aiUnitsLimit) * 100)}%`}
              </span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block">Configured search alerts</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold font-mono text-slate-200">{usageStats.alertsConfigured}</span>
                <span className="text-slate-500 text-xs font-mono">/ {usageStats.alertsLimit === 999999 ? 'Unlimited' : usageStats.alertsLimit}</span>
              </div>
            </div>
            <div className="w-14 h-14 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#1a1a1a" strokeWidth="4" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#00FF00" strokeWidth="4" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 22} 
                        strokeDashoffset={2 * Math.PI * 22 * (1 - Math.min(1, usageStats.alertsConfigured / usageStats.alertsLimit))} />
              </svg>
              <span className="absolute text-[8px] font-mono text-slate-400">
                {usageStats.alertsLimit === 999999 ? 'Inf' : `${Math.round((usageStats.alertsConfigured / usageStats.alertsLimit) * 100)}%`}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* PRICING PLANS COMPILER GRID */}
      <div>
        <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-3 block font-bold">PROPOSED ENTERPRISE PACKAGES</label>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrent = currentRole === plan.role;
            return (
              <div 
                key={plan.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all h-[440px] relative ${
                  isCurrent 
                    ? 'bg-[#FF6321]/5 border-[#FF6321] scale-102 shadow-[0_0_20px_rgba(255,99,33,0.15)]' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700/80'
                }`}
              >
                {isCurrent && (
                  <span className="absolute top-3 right-3 text-[8px] font-mono font-black tracking-widest bg-[#FF6321] text-black px-2 py-0.5 rounded">
                    CURRENT SEAT
                  </span>
                )}
                
                <div>
                  <h4 className="font-extrabold text-[#fafafa] text-sm uppercase font-mono">{plan.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-snug">{plan.desc}</p>
                  
                  <div className="my-5">
                    <span className="text-3xl font-black text-white font-mono">${plan.price}</span>
                    <span className="text-slate-500 font-mono text-[10px] lowercase"> / {plan.frequency}</span>
                  </div>

                  <div className="space-y-2.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex gap-2 items-start text-[11px] text-slate-350">
                        <Check className="h-3.5 w-3.5 text-[#FF6321] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-3">{plan.usage}</span>
                  <button
                    onClick={() => handleOpenUpgrade(plan.id)}
                    disabled={isCurrent || currentRole === 'Administrator'}
                    className={`w-full py-2 rounded-lg font-semibold text-xs text-center transition ${
                      isCurrent 
                        ? 'bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed'
                        : currentRole === 'Administrator'
                        ? 'bg-[#FF6321]/20 border border-[#FF6321]/40 text-[#FF6321] cursor-not-allowed'
                        : 'bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold shadow-[0_0_10px_rgba(255,99,33,0.2)]'
                    }`}
                  >
                    {isCurrent ? "Active Selection" : currentRole === 'Administrator' ? "Super Admin Access" : "Upgrade Licensing"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BILLING HISTORY DESK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        
        {/* Billing History (col-span-8) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">Invoice Log History</span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950/80 text-[10px] font-mono text-slate-500 uppercase border-b border-slate-850">
                  <tr>
                    <th className="px-4 py-2.5">Invoice ID</th>
                    <th className="px-4 py-2.5">Execution Date</th>
                    <th className="px-4 py-2.5">Amount Transacted</th>
                    <th className="px-4 py-2.5">Payment Method</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {billingHistory.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-850/50 transition">
                      <td className="px-4 py-3 font-mono text-slate-100 font-bold">{inv.id}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono">{inv.date}</td>
                      <td className="px-4 py-3 text-slate-200 font-bold font-mono">{inv.amount}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono">{inv.method}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-950/50 border border-emerald-900 text-emerald-400 font-bold">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedBillingHistoryItem(inv)}
                          className="px-2.5 py-1 bg-slate-950 text-slate-400 border border-slate-800 rounded text-[9px] font-mono hover:text-[#FF6321] hover:border-[#FF6321]/50"
                        >
                          Invoice Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[9px] text-[#00FF00] font-mono mt-3 uppercase">
            ● Secure transactions processed via PCI-DSS Compliant escrow corridors
          </p>
        </div>

        {/* Saved Credit Cards (col-span-4) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">Vetted Payment Methods</span>
            
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-[#FF9E00] block uppercase font-bold">EAST SAFARICOM M-PESA Mapped</span>
                  <strong className="text-xs text-slate-100">Sarah Alubas Line</strong>
                </div>
                <Landmark className="h-4 w-4 text-[#FF9E00]" />
              </div>
              <div className="flex justify-between items-baseline pt-4">
                <span className="text-xs font-mono text-slate-400 font-bold">KE-MPESA // +254 756 •••• 321</span>
                <span className="text-[9px] text-emerald-400 font-mono">PRIMARY</span>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-dashed border-slate-800 p-3.5 rounded-xl text-center cursor-pointer hover:border-[#FF6321]/50 mt-3 group transition">
              <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                + LINK ADDITIONAL MOBILE MONEY CARD
              </span>
            </div>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase mt-4 block leading-normal">
            * Direct integration with MTN Mobile Money Uganda, Airtel Money East Africa, and global Mastercard lines.
          </span>
        </div>

      </div>

      {/* BILLING HISTORY DETAILS DRAWER IN-SITE OVERLAY */}
      {selectedBillingHistoryItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-md w-full overflow-hidden font-mono shadow-[0_0_25px_rgba(255,99,33,0.3)] animate-fade-in">
            
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-[#FF6321] font-bold block uppercase tracking-widest">CPIN OFFICIAL SETTLEMENT RECORD</span>
                <h3 className="text-xs font-black uppercase text-slate-150 mt-1">Invoice: {selectedBillingHistoryItem.id}</h3>
              </div>
              <Landmark className="h-5 w-5 text-[#FF6321]" />
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3 text-[11px] pb-3 border-b border-slate-900">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">Execution Date:</span>
                  <span className="text-slate-200 mt-0.5 block font-bold">{selectedBillingHistoryItem.date}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">Payment Method:</span>
                  <span className="text-slate-200 mt-0.5 block font-bold text-[10.5px] truncate">{selectedBillingHistoryItem.method}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">Transaction Class:</span>
                  <span className="text-slate-200">{selectedBillingHistoryItem.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">License Seat Allotment:</span>
                  <span className="text-slate-200">5 Operator Seats Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">Subtotal Base Amount:</span>
                  <span className="text-slate-200">{selectedBillingHistoryItem.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">Local EAC VAT / Tax index:</span>
                  <span className="text-slate-550">Exempt (Cross-border node)</span>
                </div>
                <div className="flex justify-between border-t border-slate-850 pt-2 font-bold text-emerald-400">
                  <span className="uppercase text-slate-400">Settled Total (USD):</span>
                  <span>{selectedBillingHistoryItem.amount}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg text-[10.5px] leading-relaxed text-slate-400 space-y-1">
                <span className="text-[#00FF00] font-bold text-[10px] block uppercase">🛡️ SECURITY COMPLIANCE STAMP</span>
                <p>
                  Transacted under Uganda-EAC Multilateral Trade settlement hash code: <strong className="text-slate-300">CPIN-TXN-{Date.now().toString().slice(6)}</strong>. Securely audited via PCI-DSS client certificates.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button 
                type="button"
                onClick={() => {
                  const content = `CPIN TRANSACTION RECORD\n=================================\nInvoice ID: ${selectedBillingHistoryItem.id}\nDate: ${selectedBillingHistoryItem.date}\nAmount Transacted: ${selectedBillingHistoryItem.amount}\nSettlement: ${selectedBillingHistoryItem.description}\nMethod: ${selectedBillingHistoryItem.method}\nSecure Hash: CPIN-TXN-${Date.now().toString().slice(6)}\nStatus: Settled (100% Paid)\n=================================`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Invoice_${selectedBillingHistoryItem.id}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setSelectedBillingHistoryItem(null);
                }}
                className="flex-1 py-1.5 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold rounded-lg text-xs transition uppercase"
              >
                Download PDF Receipt
              </button>
              <button 
                type="button"
                onClick={() => setSelectedBillingHistoryItem(null)}
                className="py-1.5 px-4 bg-slate-900 text-slate-400 border border-slate-800 hover:text-white rounded-lg text-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT PAYMENT GATEWAY MODAL DOCK */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 selection:bg-[#FF6321] selection:text-black">
          <form 
            onSubmit={handleCheckoutSubmit}
            className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_25px_rgba(255,99,33,0.3)] animate-pulse-slow"
          >
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-[#FF6321] font-bold block">SECURE ESCROW CHECKOUT DESK</span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  License: {plans.find(p => p.id === selectedPlan)?.name}
                </h3>
              </div>
              <Landmark className="h-5 w-5 text-[#FF6321]" />
            </div>

            <div className="p-6 space-y-4">
              
              <div className="space-y-1.5 text-xs font-mono">
                <span className="text-slate-500 block">Plan billing Summary:</span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                  <span>SaaS Yearly Contract rate:</span>
                  <span className="font-bold text-white">${plans.find(p => p.id === selectedPlan)?.price} / month</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono text-slate-500 block">CARD NUMBER (PCI DISPATCH COMPLIANT)</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-[#FF6321]" />
                  <input
                    type="text"
                    required
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#FF6321] font-mono"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 block">EXPIRATION</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#FF6321] font-mono"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 block">CVV CODES</label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#FF6321] font-mono"
                    placeholder="3-digit CVV"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono text-slate-500 block">CARDHOLDER NAME</label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-[#FF6321] font-mono"
                  placeholder="Insert holding company / operator"
                />
              </div>

              <div className="p-3 bg-rose-950/20 border border-rose-900/50 rounded-lg text-[10px] text-rose-400 font-mono leading-relaxed">
                🚨 WARNING: Entering mock card credentials overrides client roles instantly without executing real bank fees. This is a sandbox utility channel.
              </div>

            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2 bg-slate-900 border border-slate-800 text-slate-400 font-semibold rounded-lg text-xs hover:text-white transition"
              >
                Close Checkout
              </button>
              <button
                type="submit"
                disabled={paymentProcessing}
                className="flex-1 py-2 bg-[#FF6321] text-black font-extrabold rounded-lg text-xs hover:bg-[#ff7b42] flex items-center justify-center gap-1.5 transition uppercase"
              >
                {paymentProcessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Clearing escrow...
                  </>
                ) : (
                  "Execute Upgraded Seat"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
