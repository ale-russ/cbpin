import { useState, FormEvent } from 'react';

interface ResetPasswordFormProps {
  onSuccess: (newPassword: string) => void;
  triggerMsg: (text: string, isError?: boolean) => void;
}

export default function ResetPasswordForm({ onSuccess, triggerMsg }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 5) {
      triggerMsg("✖ RE-INITIATION TOKEN MUST EXCEED MINIMUM SIZE SCHEMES", true);
      return;
    }
    onSuccess(newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <span className="text-[10px] font-mono text-[#FF9E00] block uppercase font-bold">
        ⚠️ RESTORATION HASH PARSED SUCCESSFULLY // CONFIGURE NEW MASTER TOKEN
      </span>

      <div className="space-y-1 text-xs">
        <label className="text-slate-500 font-mono block">NEW EXPANSION PASSCODE</label>
        <input
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="minimum index limit >= 5"
          className="w-full bg-slate-950 border border-slate-850 px-3 py-2 rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#FF6321] text-black font-extrabold text-xs rounded-xl hover:bg-[#ff7b42] transition uppercase font-mono cursor-pointer"
      >
        Seal Renewed Access Passcode
      </button>
    </form>
  );
}
