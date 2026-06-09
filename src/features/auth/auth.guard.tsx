import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth.hooks';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#FF6321] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Cryptographic Integrity verification & decrypting Session Token...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect details of location to state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
