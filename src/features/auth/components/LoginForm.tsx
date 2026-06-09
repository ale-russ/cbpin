import { useState, FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (data: { email: string; fullName?: string; companyName?: string }) => void;
  onNavigate: (page: 'Register' | 'ForgotPassword') => void;
  onAutoBypass: () => void;
  triggerMsg: (text: string, isError?: boolean) => void;
}

export default function LoginForm({ onSuccess, onNavigate, onAutoBypass, triggerMsg }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerMsg("✖ EMAIL AND PASSWORD ARGUMENTS REQUIRED FOR TOKEN INITIALIZATION", true);
      return;
    }
    if (password.length < 5) {
      triggerMsg("✖ CRYPTOGRAPHIC MINIMUM PASSWORD DEPTH AND SPECIFICATION VIOLATION", true);
      return;
    }

    onSuccess({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1 text-xs">
        <label className="text-slate-500 font-mono block">BUSINESS MAIL ADDRESS</label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sarah.alubas@mugerwa.com"
            className="w-full bg-slate-950 border border-slate-850 pl-10 pr-4 py-2 rounded-lg text-xs leading-normal font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
          />
        </div>
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <label className="text-slate-500 font-mono">CRYPTOGRAPHIC PASSCODE</label>
          <button 
            type="button" 
            onClick={() => onNavigate('ForgotPassword')} 
            className="text-[10px] font-mono text-[#FF9E00] hover:underline hover:text-amber-400 cursor-pointer"
          >
            Key Forgot?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-slate-950 border border-slate-850 pl-10 pr-10 py-2 rounded-lg text-xs leading-normal font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs pt-1">
        <label className="flex items-center gap-1.5 font-mono cursor-pointer text-slate-400 select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="rounded border-slate-800 bg-slate-950 accent-[#FF6321] text-black"
          />
          Remember Locker
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#FF6321] text-black font-extrabold text-xs rounded-xl hover:bg-[#ff7b42] flex items-center justify-center gap-1.5 transition text-center uppercase tracking-wider cursor-pointer"
      >
        Execute Vault Sign In
      </button>

      <div className="relative my-4 text-center">
        <hr className="border-slate-850" />
        <span className="absolute top-[-9px] left-1/2 transform -translate-x-1/2 px-3 bg-slate-900 text-[9px] font-mono text-slate-500 uppercase">
          or escrow login
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <button
          type="button"
          onClick={onAutoBypass}
          className="py-1.5 bg-slate-950 border border-slate-850 text-slate-400 rounded-lg flex items-center justify-center gap-1.5 hover:text-slate-200 transition font-mono text-[10px] cursor-pointer hover:border-slate-800"
        >
          🌐 Google ID
        </button>
        <button
          type="button"
          onClick={onAutoBypass}
          className="py-1.5 bg-slate-950 border border-slate-850 text-slate-400 rounded-lg flex items-center justify-center gap-1.5 hover:text-slate-200 transition font-mono text-[10px] cursor-pointer hover:border-slate-800"
        >
          Ⓜ Microsoft ID
        </button>
      </div>

      <div className="text-center pt-3 text-xs">
        <span className="text-slate-500">Unconfigured Firm?</span>{" "}
        <button 
          type="button" 
          onClick={() => onNavigate('Register')} 
          className="font-mono text-[#FF6321] hover:underline cursor-pointer"
        >
          Create Company Roster ➜
        </button>
      </div>
    </form>
  );
}
