import { User } from '../../store/auth/auth.store';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  restoreSession: () => void;
}
