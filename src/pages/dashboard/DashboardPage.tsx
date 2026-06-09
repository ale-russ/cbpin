import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth.store';
import CommandCenter from '../../features/search/components/CommandCenter';

export default function DashboardPage() {
  const navigate = useNavigate();
  const activeRole = useAuthStore((s) => s.activeRole);

  const handleNavigateToView = (view: string, targetItem?: any) => {
    if (view === 'Opportunities' && targetItem) {
      navigate(`/opportunities/${targetItem.id}`);
    } else if (view === 'Opportunities') {
      navigate('/opportunities');
    } else if (view === 'AI Copilot') {
      navigate('/intelligence?tab=copilot');
    } else if (view === 'Forecasts') {
      navigate('/opportunities?tab=forecasts');
    } else if (view === 'Buyers') {
      navigate('/organizations');
    } else if (view === 'Suppliers') {
      navigate('/suppliers');
    } else if (view === 'Consortiums') {
      navigate('/partnerships');
    } else if (view === 'Procurement Graph' || view === 'Maps') {
      navigate('/intelligence?tab=graph');
    } else if (view === 'Database Schema' || view === 'Sources Inventory' || view === 'Admin Panel') {
      navigate('/settings?tab=admin');
    } else if (view === 'SaaS Profile') {
      navigate('/settings?tab=profile');
    } else if (view === 'Subscription Bench') {
      navigate('/settings?tab=subscription');
    } else if (view === 'Team Workspace') {
      navigate('/settings?tab=team');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold block">SECURE OPERATOR DESK</span>
          <h1 className="text-lg font-bold text-slate-100">Analytical Dashboard</h1>
        </div>
        <div className="text-right text-xs font-mono text-slate-450">
          Seat Level: <strong className="text-[#FF6321] uppercase">{activeRole}</strong>
        </div>
      </div>
      <CommandCenter onNavigateToView={handleNavigateToView} />
    </div>
  );
}
