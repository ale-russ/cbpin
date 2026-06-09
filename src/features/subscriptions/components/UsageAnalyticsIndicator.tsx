import React from "react";

interface UsageAnalyticsIndicatorProps {
  usageStats: {
    searchesPerformed: number;
    searchesLimit: number;
    aiUnitsUsed: number;
    aiUnitsLimit: number;
    alertsConfigured: number;
    alertsLimit: number;
  };
}

export const UsageAnalyticsIndicator = ({
  usageStats,
}: UsageAnalyticsIndicatorProps) => {
  return (
    <div>
      <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-3 block font-bold">
        Monthly Usage Quotas (EAC Portal Analytics)
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className="bg-slate-900 border border-slate-800 p-2 lg:p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 block">
              SaaS Search Queries executed
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-slate-200">
                {usageStats.searchesPerformed}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                /{" "}
                {usageStats.searchesLimit === 999999
                  ? "Unlimited"
                  : usageStats.searchesLimit}
              </span>
            </div>
          </div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#1a1a1a"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#FF6321"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  22 *
                  (1 -
                    Math.min(
                      1,
                      usageStats.searchesPerformed / usageStats.searchesLimit,
                    ))
                }
              />
            </svg>
            <span className="absolute text-[8px] font-mono text-slate-400">
              {Math.round(
                (usageStats.searchesPerformed / usageStats.searchesLimit) * 100,
              ) || 0}
              %
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 block">
              AI Suitability reviews
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-slate-200">
                {usageStats.aiUnitsUsed}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                /{" "}
                {usageStats.aiUnitsLimit === 999999
                  ? "Unlimited"
                  : usageStats.aiUnitsLimit}
              </span>
            </div>
          </div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#1a1a1a"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#FF9E00"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  22 *
                  (1 -
                    Math.min(
                      1,
                      usageStats.aiUnitsUsed / usageStats.aiUnitsLimit,
                    ))
                }
              />
            </svg>
            <span className="absolute text-[8px] font-mono text-slate-400">
              {usageStats.aiUnitsLimit === 999999
                ? "Inf"
                : `${Math.round((usageStats.aiUnitsUsed / usageStats.aiUnitsLimit) * 100)}%`}
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 block">
              Configured search alerts
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-slate-200">
                {usageStats.alertsConfigured}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                /{" "}
                {usageStats.alertsLimit === 999999
                  ? "Unlimited"
                  : usageStats.alertsLimit}
              </span>
            </div>
          </div>
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#1a1a1a"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#00FF00"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  22 *
                  (1 -
                    Math.min(
                      1,
                      usageStats.alertsConfigured / usageStats.alertsLimit,
                    ))
                }
              />
            </svg>
            <span className="absolute text-[8px] font-mono text-slate-400">
              {usageStats.alertsLimit === 999999
                ? "Inf"
                : `${Math.round((usageStats.alertsConfigured / usageStats.alertsLimit) * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
