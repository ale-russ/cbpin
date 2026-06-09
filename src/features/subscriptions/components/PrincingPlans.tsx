import { Check } from "lucide-react";
import React from "react";

interface PricingPlansProps {
  currentRole: string;
  plans: {
    role: string;
    id: string;
    name: string;
    desc: string;
    price: string;
    frequency: string;
    features: string[];
    usage: string;
  }[];
  handleOpenUpgrade: (planId: string) => void;
}

export const PrincingPlans = ({
  currentRole,
  plans,
  handleOpenUpgrade,
}: PricingPlansProps) => {
  return (
    <div>
      <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-3 block font-bold">
        PROPOSED ENTERPRISE PACKAGES
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentRole === plan.role;
          return (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all h-[440px] relative ${
                isCurrent
                  ? "bg-[#FF6321]/5 border-[#FF6321] scale-102 shadow-[0_0_20px_rgba(255,99,33,0.15)]"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700/80"
              }`}>
              {isCurrent && (
                <span className="absolute top-3 right-3 text-[8px] font-mono font-black tracking-widest bg-[#FF6321] text-black px-2 py-0.5 rounded">
                  CURRENT SEAT
                </span>
              )}

              <div>
                <h4 className="font-extrabold text-[#fafafa] text-sm uppercase font-mono">
                  {plan.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-snug">
                  {plan.desc}
                </p>

                <div className="my-5">
                  <span className="text-3xl font-black text-white font-mono">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px] lowercase">
                    {" "}
                    / {plan.frequency}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {plan.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-start text-[11px] text-slate-350">
                      <Check className="h-3.5 w-3.5 text-[#FF6321] flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 uppercase block mb-3">
                  {plan.usage}
                </span>
                <button
                  onClick={() => handleOpenUpgrade(plan.id)}
                  disabled={isCurrent || currentRole === "Administrator"}
                  className={`w-full py-2 rounded-lg font-semibold text-xs text-center transition cursor-pointer ${
                    isCurrent
                      ? "bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed"
                      : currentRole === "Administrator"
                        ? "bg-[#FF6321]/20 border border-[#FF6321]/40 text-[#FF6321] cursor-not-allowed"
                        : "bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold shadow-[0_0_10px_rgba(255,99,33,0.2)]"
                  }`}>
                  {isCurrent
                    ? "Active Selection"
                    : currentRole === "Administrator"
                      ? "Super Admin Access"
                      : "Upgrade Licensing"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
