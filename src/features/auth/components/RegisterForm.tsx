import { useState, FormEvent } from 'react';
import { User, Building, Phone } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: (data: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    industry: string;
    password?: string;
  }) => void;
  onNavigate: (page: 'Login') => void;
  triggerMsg: (text: string, isError?: boolean) => void;
}

export default function RegisterForm({ onSuccess, onNavigate, triggerMsg }: RegisterFormProps) {
  const [fullName, setFullName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("Uganda");
  const [industry, setIndustry] = useState<string>("Infrastructure & Transport");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !companyName || !email || !password) {
      triggerMsg("✖ OUTSTANDING DIRECTIVE FIELDS CANNOT BE LEFT VACANT", true);
      return;
    }

    onSuccess({
      fullName,
      companyName,
      email,
      phone,
      country,
      industry,
      password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Operator Legal Name</label>
          <div className="relative">
            <User className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-600" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Sarah Alubas"
              className="w-full bg-slate-950 border border-slate-850 pl-8 pr-3 py-1.5 rounded-lg text-xs leading-normal focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
            />
          </div>
        </div>
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Company Name</label>
          <div className="relative">
            <Building className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-600" />
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Mugerwa Logistics"
              className="w-full bg-slate-950 border border-slate-850 pl-8 pr-3 py-1.5 rounded-lg text-xs leading-normal focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Corporate Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sarah@mugerwa.com"
            className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-xs leading-normal font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
          />
        </div>
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Phone contact</label>
          <div className="relative">
            <Phone className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-600" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+256 756 321"
              className="w-full bg-slate-950 border border-slate-850 pl-8 pr-3 py-1.5 rounded-lg text-xs leading-normal font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 px-2 py-1.5 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
          >
            <option value="Uganda">Uganda</option>
            <option value="Kenya">Kenya</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Rwanda">Rwanda</option>
          </select>
        </div>
        <div className="space-y-1 text-xs">
          <label className="text-slate-500 font-mono uppercase block">Industrial Sector</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 px-2 py-1.5 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
          >
            <option value="Infrastructure & Transport">Infrastructure</option>
            <option value="Energy & Utilities">Energy</option>
            <option value="Digital Health & Tech">ICT Systems</option>
            <option value="Oil & Gas Services">Oil & Gas</option>
          </select>
        </div>
      </div>

      <div className="space-y-1 text-xs">
        <label className="text-slate-500 font-mono block">SET VAULT PASSCODE</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 5 crypt-chars"
          className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-xs leading-normal font-mono focus:outline-none focus:border-[#FF6321] transition duration-150 ease-in-out hover:border-slate-800"
        />
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-2 text-[10px] font-mono text-slate-400 leading-relaxed cursor-pointer select-none">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-800 bg-slate-950 accent-[#FF6321]" />
          Acknowledge compliance parameters, sovereign data rules, and OECD Trade Directives.
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#FF6321] text-black font-extrabold text-xs rounded-xl hover:bg-[#ff7b42] transition text-center uppercase tracking-wider mt-2 cursor-pointer"
      >
        Dispatch Authorization Token
      </button>

      <div className="text-center pt-3 text-xs">
        <span className="text-slate-500">Already registered?</span>{" "}
        <button 
          type="button" 
          onClick={() => onNavigate('Login')} 
          className="font-mono text-[#FF6321] hover:underline cursor-pointer"
        >
          Sign In Vault ➜
        </button>
      </div>
    </form>
  );
}
