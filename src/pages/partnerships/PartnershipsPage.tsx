import ConsortiumEngine from '../../features/consortiums/components/ConsortiumEngine';
import { Users, Globe, Shield } from 'lucide-react';

export default function PartnershipsPage() {
  return (
    <div className="space-y-6">
      
      {/* Page header block */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN MULTI-FIRM CO-OP</span>
          <h1 className="text-xl font-bold text-slate-100">Partnership Consortium Builder</h1>
          <p className="text-xs text-slate-400 mt-1">
            Form qualified joint-ventures with vetted local engineering and logistics providers to bypass domestic content penalties.
          </p>
        </div>
      </div>

      {/* Main Consortium form engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
        <ConsortiumEngine />
      </div>

    </div>
  );
}
