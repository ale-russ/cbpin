import { useState, useEffect } from 'react';

export type UserRole = 'Guest' | 'SME User' | 'Professional User' | 'Enterprise User' | 'Administrator';

export interface User {
  id: string;
  fullName: string;
  email: string;
  country: string;
  companyName: string;
  industry: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  activeRole: UserRole;
  savedOpportunities: string[];
}

type Listener = (state: AuthState) => void;
const listeners = new Set<Listener>();

let state: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  activeRole: (localStorage.getItem('cpin_active_role') as UserRole) || 'SME User',
  savedOpportunities: JSON.parse(localStorage.getItem('cpin_saved_opps') || '[]'),
};

const notify = () => {
  listeners.forEach((listener) => listener(state));
};

export const authStore = {
  getState: () => state,
  
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  
  setState: (next: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => {
    const nextState = typeof next === 'function' ? next(state) : next;
    state = { ...state, ...nextState };
    notify();
  },
  
  login: (user: User) => {
    localStorage.setItem('cpin_session', JSON.stringify(user));
    localStorage.setItem('cpin_token', 'mock-pci-dss-custom-token-ea-2026');
    authStore.setState({ isAuthenticated: true, user, loading: false });
  },
  
  logout: () => {
    localStorage.removeItem('cpin_session');
    localStorage.removeItem('cpin_token');
    authStore.setState({ isAuthenticated: false, user: null, loading: false });
  },
  
  restoreSession: () => {
    const sessionStr = localStorage.getItem('cpin_session');
    const token = localStorage.getItem('cpin_token');
    if (sessionStr && token) {
      try {
        const user = JSON.parse(sessionStr);
        authStore.setState({ isAuthenticated: true, user, loading: false });
        return;
      } catch (e) {
        // Safe fallback
      }
    }
    authStore.setState({ isAuthenticated: false, user: null, loading: false });
  },

  setActiveRole: (role: UserRole) => {
    localStorage.setItem('cpin_active_role', role);
    authStore.setState({ activeRole: role });
  },

  toggleSaveOpportunity: (oppId: string) => {
    const current = state.savedOpportunities;
    const next = current.includes(oppId)
      ? current.filter(id => id !== oppId)
      : [...current, oppId];
    localStorage.setItem('cpin_saved_opps', JSON.stringify(next));
    authStore.setState({ savedOpportunities: next });
  }
};

// Hook usage matching Zustand
export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const [slice, setSlice] = useState(() => selector(state));

  useEffect(() => {
    const unsubscribe = authStore.subscribe((newState) => {
      setSlice(selector(newState));
    });
    return unsubscribe;
  }, [selector]);

  return slice;
}
