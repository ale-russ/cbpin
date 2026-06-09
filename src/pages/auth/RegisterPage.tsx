import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth.hooks';
import SaaSAuthentication from '../../features/auth/components/SaaSAuthentication';

export default function RegisterPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleAuthenticated = (userData: any) => {
    login({
      id: "usr-" + Date.now().toString().slice(8),
      fullName: userData.fullName,
      email: userData.email,
      country: userData.country,
      companyName: userData.companyName,
      industry: userData.industry
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <span className="text-[10px] font-mono text-[#FF6321] font-bold tracking-widest uppercase">
            CROSS-BORDER PROCUREMENT PROTOCOL (CPIN)
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1 uppercase">ESTABLISH PROCURING INSTANCE</h2>
        </div>
        <SaaSAuthentication 
          initialAuthPage="Register" 
          onAuthenticated={handleAuthenticated} 
        />
        <div className="text-center text-[10px] font-mono text-slate-600 uppercase">
          SECURED VIA SHA-384 SHIELDING HASH LOCKS
        </div>
      </div>
    </div>
  );
}
