import { Landmark } from "lucide-react";
import React, { Dispatch } from "react";

interface BillingHistoryProps {
  billingHistory: {
    id: string;
    date: string;
    amount: string;
    status: string;
    description: string;
    method: string;
  }[];
  selectedBillingHistoryItem?: {
    id: string;
    date: string;
    amount: string;
    status: string;
    description: string;
    method: string;
  };
  setSelectedBillingHistoryItem: (item: any) => void;
}

export const BillingHistory = ({
  billingHistory,
  selectedBillingHistoryItem,
  setSelectedBillingHistoryItem,
}: BillingHistoryProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Billing History (col-span-8) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">
              Invoice Log History
            </span>
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
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-850/50 transition">
                      <td className="px-4 py-3 font-mono text-slate-100 font-bold">
                        {inv.id}
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono">
                        {inv.date}
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-bold font-mono">
                        {inv.amount}
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono">
                        {inv.method}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-950/50 border border-emerald-900 text-emerald-400 font-bold">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedBillingHistoryItem(inv)}
                          className="px-2.5 py-1 bg-slate-950 text-slate-400 border border-slate-800 rounded text-[9px] font-mono hover:text-[#FF6321] hover:border-[#FF6321]/50">
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
            ● Secure transactions processed via PCI-DSS Compliant escrow
            corridors
          </p>
        </div>

        {/* Saved Credit Cards (col-span-4) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-4">
              Vetted Payment Methods
            </span>

            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-[#FF9E00] block uppercase font-bold">
                    EAST SAFARICOM M-PESA Mapped
                  </span>
                  <strong className="text-xs text-slate-100">
                    Sarah Alubas Line
                  </strong>
                </div>
                <Landmark className="h-4 w-4 text-[#FF9E00]" />
              </div>
              <div className="flex justify-between items-baseline pt-4">
                <span className="text-xs font-mono text-slate-400 font-bold">
                  KE-MPESA // +254 756 •••• 321
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">
                  PRIMARY
                </span>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-dashed border-slate-800 p-3.5 rounded-xl text-center cursor-pointer hover:border-[#FF6321]/50 mt-3 group transition">
              <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                + LINK ADDITIONAL MOBILE MONEY CARD
              </span>
            </div>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase mt-4 block leading-normal">
            * Direct integration with MTN Mobile Money Uganda, Airtel Money East
            Africa, and global Mastercard lines.
          </span>
        </div>
      </div>
      {/* BILLING HISTORY DETAILS DRAWER IN-SITE OVERLAY */}
      {selectedBillingHistoryItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-md w-full overflow-hidden font-mono shadow-[0_0_25px_rgba(255,99,33,0.3)] animate-fade-in">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-[#FF6321] font-bold block uppercase tracking-widest">
                  CPIN OFFICIAL SETTLEMENT RECORD
                </span>
                <h3 className="text-xs font-black uppercase text-slate-150 mt-1">
                  Invoice: {selectedBillingHistoryItem.id}
                </h3>
              </div>
              <Landmark className="h-5 w-5 text-[#FF6321]" />
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3 text-[11px] pb-3 border-b border-slate-900">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">
                    Execution Date:
                  </span>
                  <span className="text-slate-200 mt-0.5 block font-bold">
                    {selectedBillingHistoryItem.date}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">
                    Payment Method:
                  </span>
                  <span className="text-slate-200 mt-0.5 block font-bold text-[10.5px] truncate">
                    {selectedBillingHistoryItem.method}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">
                    Transaction Class:
                  </span>
                  <span className="text-slate-200">
                    {selectedBillingHistoryItem.description}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">
                    License Seat Allotment:
                  </span>
                  <span className="text-slate-200">
                    5 Operator Seats Included
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">
                    Subtotal Base Amount:
                  </span>
                  <span className="text-slate-200">
                    {selectedBillingHistoryItem.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">
                    Local EAC VAT / Tax index:
                  </span>
                  <span className="text-slate-550">
                    Exempt (Cross-border node)
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-850 pt-2 font-bold text-emerald-400">
                  <span className="uppercase text-slate-400">
                    Settled Total (USD):
                  </span>
                  <span>{selectedBillingHistoryItem.amount}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg text-[10.5px] leading-relaxed text-slate-400 space-y-1">
                <span className="text-[#00FF00] font-bold text-[10px] block uppercase">
                  🛡️ SECURITY COMPLIANCE STAMP
                </span>
                <p>
                  Transacted under Uganda-EAC Multilateral Trade settlement hash
                  code:{" "}
                  <strong className="text-slate-300">
                    CPIN-TXN-{Date.now().toString().slice(6)}
                  </strong>
                  . Securely audited via PCI-DSS client certificates.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const content = `CPIN TRANSACTION RECORD\n=================================\nInvoice ID: ${selectedBillingHistoryItem.id}\nDate: ${selectedBillingHistoryItem.date}\nAmount Transacted: ${selectedBillingHistoryItem.amount}\nSettlement: ${selectedBillingHistoryItem.description}\nMethod: ${selectedBillingHistoryItem.method}\nSecure Hash: CPIN-TXN-${Date.now().toString().slice(6)}\nStatus: Settled (100% Paid)\n=================================`;
                  const blob = new Blob([content], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `Invoice_${selectedBillingHistoryItem.id}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setSelectedBillingHistoryItem(null);
                }}
                className="flex-1 py-1.5 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold rounded-lg text-xs transition uppercase">
                Download PDF Receipt
              </button>
              <button
                type="button"
                onClick={() => setSelectedBillingHistoryItem(null)}
                className="py-1.5 px-4 bg-slate-900 text-slate-400 border border-slate-800 hover:text-white rounded-lg text-xs">
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
