import { Landmark, CreditCard, RefreshCw } from "lucide-react";
import React from "react";

interface SelectedPlanModalProps {
  selectedPlan: string | null;
  plans: {
    id: string;
    name: string;
    price: string;
  }[];
  setSelectedPlan: (planId: string | null) => void;
  cardNo: string;
  setCardNo: (cardNo: string) => void;
  expiry: string;
  setExpiry: (expiry: string) => void;
  cvv: string;
  setCvv: (cvv: string) => void;
  cardHolder: string;
  setCardHolder: (name: string) => void;
  paymentProcessing: boolean;
  handleCheckoutSubmit: (e: React.FormEvent) => void;
}

export const SelectedPlanModal = (props: SelectedPlanModalProps) => {
  const {
    selectedPlan,
    plans,
    setSelectedPlan,
    cardNo,
    setCardNo,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    cardHolder,
    setCardHolder,
    paymentProcessing,
    handleCheckoutSubmit,
  } = props;

  return (
    <div>
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 selection:bg-[#FF6321] selection:text-black">
          <form
            onSubmit={handleCheckoutSubmit}
            className="bg-slate-900 border-2 border-[#FF6321] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_25px_rgba(255,99,33,0.3)] animate-pulse-slow">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-[#FF6321] font-bold block">
                  SECURE ESCROW CHECKOUT DESK
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  License: {plans.find((p) => p.id === selectedPlan)?.name}
                </h3>
              </div>
              <Landmark className="h-5 w-5 text-[#FF6321]" />
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <span className="text-slate-500 block">
                  Plan billing Summary:
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                  <span>SaaS Yearly Contract rate:</span>
                  <span className="font-bold text-white">
                    ${plans.find((p) => p.id === selectedPlan)?.price} / month
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono text-slate-500 block">
                  CARD NUMBER (PCI DISPATCH COMPLIANT)
                </label>
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
                  <label className="text-[10px] uppercase font-mono text-slate-500 block">
                    EXPIRATION
                  </label>
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
                  <label className="text-[10px] uppercase font-mono text-slate-500 block">
                    CVV CODES
                  </label>
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
                <label className="text-[10px] uppercase font-mono text-slate-500 block">
                  CARDHOLDER NAME
                </label>
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
                🚨 WARNING: Entering mock card credentials overrides client
                roles instantly without executing real bank fees. This is a
                sandbox utility channel.
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2 bg-slate-900 border border-slate-800 text-slate-400 font-semibold rounded-lg text-xs hover:text-white transition">
                Close Checkout
              </button>
              <button
                type="submit"
                disabled={paymentProcessing}
                className="flex-1 py-2 bg-[#FF6321] text-black font-extrabold rounded-lg text-xs hover:bg-[#ff7b42] flex items-center justify-center gap-1.5 transition uppercase">
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
};
