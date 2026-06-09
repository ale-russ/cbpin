import React from "react";

interface TerminalControlProps {
  currentPlanName?: string;
}

export const TerminalControl = ({ currentPlanName }: TerminalControlProps) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-amber-950 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-900 uppercase">
              SaaS Subscription Desk
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-xs font-mono text-slate-500">
              Terminal Control
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            Upgrade Licensing & Billing
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Select an operational seat package tailored to your structural
            footprint. All accounts default to KES/UGX multi-currency pricing
            but balances are denominated in floating USD equivalents to
            guarantee inflation hedges.
          </p>
        </div>

        <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl max-w-xs flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FF6321]/10 border border-[#FF6321]/40 rounded-full flex items-center justify-center font-bold text-lg text-[#FF6321]">
            ₦
          </div>
          <div>
            <span className="text-[9px] text-slate-500 block uppercase font-mono">
              Current Active Seat
            </span>
            <strong className="text-sm text-[#FF6321] font-extrabold block">
              {currentPlanName}
            </strong>
            <span className="text-[8px] text-emerald-400 font-mono block">
              Status: Active / Safe sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
