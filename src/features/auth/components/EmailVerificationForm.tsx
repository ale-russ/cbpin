import { useState, FormEvent } from 'react';

interface EmailVerificationFormProps {
  onSuccess: (verifyCode: string) => void;
  triggerMsg: (text: string, isError?: boolean) => void;
}

export default function EmailVerificationForm({ onSuccess, triggerMsg }: EmailVerificationFormProps) {
  const [verifyCode, setVerifyCode] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!verifyCode) {
      triggerMsg("✖ VERIFICATION PIN MATRIX CHECKS WERE EMPTY", true);
      return;
    }
    onSuccess(verifyCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <span className="text-[10px] font-mono text-slate-500 block leading-relaxed">
        A 6-digit verification code token was dispatched to your address. Please supply the numeric block below to seal security escrow.
      </span>

      <div className="space-y-1 text-xs">
        <label className="text-slate-500 font-mono block">PORTAL REGISTRY CODE (6-DIGITS)</label>
        <input
          type="text"
          required
          maxLength={6}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          placeholder="e.g. 524 810"
          className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-lg text-center text-sm font-bold tracking-widest font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#FF6321] text-black font-extrabold text-xs rounded-xl hover:bg-[#ff7b42] transition uppercase font-mono cursor-pointer"
      >
        Validate Activation Escrow
      </button>

      <div className="flex justify-between text-xs font-mono">
        <span className="text-slate-500">Wait: 2:00 mins</span>
        <button 
          type="button" 
          onClick={() => triggerMsg("✔ DUPLICATE TOKEN DISPATCHED!")} 
          className="text-slate-400 hover:text-white cursor-pointer"
        >
          Resend token list
        </button>
      </div>
    </form>
  );
}
