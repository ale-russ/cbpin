import { useState, FormEvent } from 'react';

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
  onNavigate: (page: 'Login') => void;
  triggerMsg: (text: string, isError?: boolean) => void;
}

export default function ForgotPasswordForm({ onSuccess, onNavigate, triggerMsg }: ForgotPasswordFormProps) {
  const [resetEmail, setResetEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      triggerMsg("✖ REGISTERED INBOX ADDRESS IS COMPULSORY", true);
      return;
    }
    onSuccess(resetEmail);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <span className="text-[10px] font-mono text-slate-500 block leading-relaxed">
        Provide the corporate email associated with your portal record. CPIN's master router will dispatch a custom asymmetric security hash token allowing password reissue.
      </span>

      <div className="space-y-1 text-xs">
        <label className="text-slate-500 font-mono block">REGISTERED ORGANIZATIONAL INBOX</label>
        <input
          type="email"
          required
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="e.g. sarah.alubas@mugerwa.com"
          className="w-full bg-slate-950 border border-slate-850 px-3 py-2 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#FF6321] text-black font-extrabold text-xs rounded-xl hover:bg-[#ff7b42] transition uppercase font-mono cursor-pointer"
      >
        Dispatch Key Restoration Hash
      </button>

      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={() => onNavigate('Login')} 
          className="font-mono text-xs text-slate-400 hover:text-white cursor-pointer"
        >
          🔙 Return to Sign In Vault
        </button>
      </div>
    </form>
  );
}
