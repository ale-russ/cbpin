import ForecastCenter from '../../features/forecasts/components/ForecastCenter';
import { Calendar, FileBarChart, ShieldCheck } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header Block */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN PIPELINING MODULE</span>
          <h1 className="text-xl font-bold text-slate-100">Predictive Forecasting & Reports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Machine learning estimations of upcoming ministerial tenders, renewal budgets, and donor program releases.
          </p>
        </div>
      </div>

      {/* Forecast center panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
        <ForecastCenter />
      </div>

    </div>
  );
}
