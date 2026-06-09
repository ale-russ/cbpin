import { useNavigate } from 'react-router-dom';
import SaaSAuthentication from '../../features/auth/components/SaaSAuthentication';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleAuthenticated = (userData: any) => {
    // Falls back to direct login redirection on bypass triggers
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <span className="text-[10px] font-mono text-[#FF6321] font-bold tracking-widest uppercase">
            CROSS-BORDER PROCUREMENT PROTOCOL (CPIN)
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1 uppercase">RESET PRIVILEGES MASTER HASH</h2>
        </div>
        <SaaSAuthentication 
          initialAuthPage="ForgotPassword" 
          onAuthenticated={handleAuthenticated} 
        />
        <div className="text-center text-[10px] font-mono text-slate-600 uppercase">
          SECURED VIA SHA-384 SHIELDING HASH LOCKS
        </div>
      </div>
    </div>
  );
}
