import { useEffect, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { authStore, useAuthStore } from '../../store/auth/auth.store';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    authStore.restoreSession();
  }, []);

  const login = authStore.login;
  const logout = authStore.logout;
  const restoreSession = authStore.restoreSession;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
