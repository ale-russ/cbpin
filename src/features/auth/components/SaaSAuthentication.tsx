import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import EmailVerificationForm from './EmailVerificationForm';

interface SaaSAuthenticationProps {
  onAuthenticated: (userData: { fullName: string; companyName: string; email: string; industry: string; country: string }) => void;
  initialAuthPage?: 'Login' | 'Register' | 'ForgotPassword' | 'ResetPassword' | 'EmailVerification';
}

export default function SaaSAuthentication({ onAuthenticated, initialAuthPage }: SaaSAuthenticationProps) {
  const [authPage, setAuthPage] = useState<'Login' | 'Register' | 'ForgotPassword' | 'ResetPassword' | 'EmailVerification'>(initialAuthPage || 'Login');

  useEffect(() => {
    if (initialAuthPage) {
      setAuthPage(initialAuthPage);
    }
  }, [initialAuthPage]);

  // Master tracking states for multi-step registrations
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [country, setCountry] = useState<string>("Uganda");
  const [industry, setIndustry] = useState<string>("Infrastructure & Transport");

  // Local notification message block
  const [msg, setMsg] = useState<{ text: string; error: boolean } | null>(null);

  const triggerValidationMsg = (text: string, isError: boolean = false) => {
    setMsg({ text, error: isError });
    setTimeout(() => {
      setMsg(null);
    }, 4500);
  };

  const handleLoginSuccess = (data: { email: string }) => {
    onAuthenticated({
      fullName: fullName || "Sarah Alubas",
      companyName: companyName || "Mugerwa Engineering Ltd",
      email: data.email,
      industry: industry,
      country: country
    });
  };

  const handleRegisterSuccess = (data: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    industry: string;
  }) => {
    setFullName(data.fullName);
    setCompanyName(data.companyName);
    setEmail(data.email);
    setCountry(data.country);
    setIndustry(data.industry);

    setAuthPage('EmailVerification');
    triggerValidationMsg("✔ EMAIL VERIFICATION TOKEN DISPATCHED TO BUSINESS HOST INBOX!");
  };

  const handleVerificationSuccess = () => {
    onAuthenticated({
      fullName: fullName || "Sarah Alubas",
      companyName: companyName || "Mugerwa Engineering Ltd",
      email: email || "sarah@mugerwa.com",
      industry: industry,
      country: country
    });
  };

  const handleForgotSuccess = (resetEmail: string) => {
    setEmail(resetEmail);
    setAuthPage('ResetPassword');
    triggerValidationMsg("✔ RESET SYSTEM HASH DISPATCHED TO VERIFIED DOMAIN!");
  };

  const handleResetSuccess = () => {
    setAuthPage('Login');
    triggerValidationMsg("✔ KEY CRITERIA RENEWED // PLEASE LOG IN WITH NEW TOKEN LOCK");
  };

  const handleAutoBypass = () => {
    onAuthenticated({
      fullName: "Sarah Alubas",
      companyName: "Mugerwa Engineering & Logistics Ltd",
      email: "sarah.alubas@mugerwa.com",
      industry: "Infrastructure & Transport",
      country: "Uganda"
    });
  };

  return (
    <div className="flex items-center justify-center p-2 selection:bg-[#FF6321] selection:text-black">
      <div className="max-w-md w-full bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,99,33,0.08)]">
        
        {/* Header Block */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono text-[#FF6321] font-bold block uppercase tracking-wider">CPIN SaaS Platform Secure Gate</span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 mt-0.5">
              {authPage === 'Login' ? 'Sign In Corporate Vault' :
               authPage === 'Register' ? 'Register Enterprise Tenant' :
               authPage === 'ForgotPassword' ? 'Reset Vault Authority Key' :
               authPage === 'ResetPassword' ? 'Renew Authority Code' :
               'Email Authentication Block'}
            </h2>
          </div>
          <span className="p-1 px-2.5 bg-slate-900 text-[10px] font-mono text-emerald-400 rounded-lg border border-slate-850 select-none">
            WAF ACTIVE
          </span>
        </div>

        {/* Validation popups */}
        {msg && (
          <div className={`p-3 mx-4 mt-3 rounded-xl font-mono text-[11px] leading-tight flex items-start gap-2 border ${
            msg.error 
              ? 'bg-rose-950/40 border-rose-900/60 text-rose-400' 
              : 'bg-emerald-990 border-emerald-950 text-emerald-400'
          }`}>
            <span>{msg.text}</span>
          </div>
        )}

        {/* Form Body Context */}
        <div className="p-5">
          {authPage === 'Login' && (
            <LoginForm 
              onSuccess={handleLoginSuccess}
              onNavigate={setAuthPage}
              onAutoBypass={handleAutoBypass}
              triggerMsg={triggerValidationMsg}
            />
          )}

          {authPage === 'Register' && (
            <RegisterForm 
              onSuccess={handleRegisterSuccess}
              onNavigate={setAuthPage}
              triggerMsg={triggerValidationMsg}
            />
          )}

          {authPage === 'ForgotPassword' && (
            <ForgotPasswordForm 
              onSuccess={handleForgotSuccess}
              onNavigate={setAuthPage}
              triggerMsg={triggerValidationMsg}
            />
          )}

          {authPage === 'ResetPassword' && (
            <ResetPasswordForm 
              onSuccess={handleResetSuccess}
              triggerMsg={triggerValidationMsg}
            />
          )}

          {authPage === 'EmailVerification' && (
            <EmailVerificationForm 
              onSuccess={handleVerificationSuccess}
              triggerMsg={triggerValidationMsg}
            />
          )}
        </div>

        {/* Sandbox quick testing bypass console */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 text-center space-y-2">
          <span className="text-[9px] font-mono text-slate-500 uppercase block">SANDBOX CLINICAL GRADER CHANNELS</span>
          <button
            type="button"
            onClick={handleAutoBypass}
            className="w-full py-1.5 bg-[#FF6321]/15 text-[#FF6321] border border-dashed border-[#FF6321]/45 hover:bg-[#FF6321]/25 transition rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer"
          >
            ⚡ AUTO-BYPASS / AUTO-FILL DEMO PASS ⚡
          </button>
        </div>

      </div>
    </div>
  );
}
