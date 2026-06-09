import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Trash2, ArrowRight } from 'lucide-react';
import { mockOpportunities, mockSuppliers } from '../../../data/mockOpportunities';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: "Enterprise Intelligence Copilot loaded successfully.\n\nAsk me about upcoming regional opportunities, technical capability matches, joint venture partners, or competitor heatmaps. Select a benchmark query below to run immediate strategic tests:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Suggestions mentioned in the user prompt
  const suggestions = [
    { label: "🎯 Best opportunities this month", query: "What are my best opportunities this month?" },
    { label: "🛣 Who should I partner with for UNRA road projects?", query: "Who should I partner with for UNRA road projects?" },
    { label: "☀️ Which agencies recruit solar / energy equipment?", query: "Which agencies/NGOs buy solar and energy equipment?" },
    { label: "📊 Predict opportunities for civil engineering firms", query: "Predict opportunities for civil engineering firms for winter 2026." }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendQuery = (textQuery: string) => {
    if (!textQuery.trim()) return;

    const userMsg: Message = {
      id: `m-u-${Date.now()}`,
      sender: 'user',
      text: textQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");

    // Simulate AI thinking and return highly contextualized answers based on our actual datasets
    setTimeout(() => {
      let responseText = "";
      const queryLower = textQuery.toLowerCase();

      if (queryLower.includes('best') || queryLower.includes('opportunities this month')) {
        responseText = `Based on your profile, I have filtered the **top 2 high-matching active opportunities** featuring over **70% Win Probabilities** for immediate pursuit:

| Opportunity ID | Buyer | Budget | Match % | recommended Action |
| :--- | :--- | :--- | :---: | :--- |
| **UG-PPDA-2026-0012** | UNRA Uganda | $14.5M | **92%** | **Pursue Immediately** |
| **NGO-WFP-TZ-0899** | WFP Tanzania | $5.2M | **94%** | **Pursue Immediately** |

**Strategic Directive:** These projects possess secured cash allocations from the World Bank and Tanzanian agricultural reserve funds respectively. Local content thresholds align directly with your regional subcontractors base.`;
      } 
      else if (queryLower.includes('partner') || queryLower.includes('unra')) {
        responseText = `To bid on the **UNRA Core Feeder Roads ($14.5M)** tender, you must satisfy the **40% Local Content requirement**. 

Here are your recommended joint-venture partners to maximize win rates:

1. ⚙️ **Mugerwa Engineering & Logistics Ltd** (95% Trust Score)
   - *Role:* Heavy trucking & site excavation base within 65km of the structural camps.
2. 🔨 **Buliisa Community Excavators Group** (85% Trust Score)
   - *Role:* Delivers 100% locally hired labor footprint to satisfy local statutory mandates immediately.

**Recommended Action:** Form a Joint-Venture (JV) with both. Your blended capability capability index raises your **Win Probability from 45% to 74%**.`;
      } 
      else if (queryLower.includes('solar') || queryLower.includes('energy') || queryLower.includes('ngo')) {
        responseText = `Here are the active, high-probability agencies procuring solar, off-grid micro-grids, and biomass systems:

* **UNHCR Refugee Support Agency (Uganda)**
  - *Active Tender ID:* UN-UNHCR-0089 (Supply & distribution of Cookstoves & biomass briquettes worth **$3.6M**).
  - *SME Match Score:* **78%**
  - *Historical Award Winners:* Kampala Solar Tech.

* **REG Energy Utility Corporation (Rwanda)**
  - *Active Tender ID:* RW-REG-2026-44 (Smart Grid Metering rollouts in Kigali worth **$12.1M**).
  - *SME Match Score:* **81%**

**Strategy Tip:** For UNHCR tenders, register immediately at **UN Global Marketplace (UNGM) Level 2** compliance standard to prevent early administrative disqualification.`;
      } 
      else if (queryLower.includes('predict') || queryLower.includes('civil engineering') || queryLower.includes('forecast')) {
        responseText = `Our chronological predictive forecast model identifies **3 major civil works projects** releasing in the next 90 days:

1. **Uganda Secondary Road networks Program**
   - *Expected:* Next 30 Days (Expected Window)
   - *Budget:* **$34,000,000 USD**
   - *Buyer:* Ministry of Works Uganda
   - *Win Suitability:* **High (92%)**

2. **Tanzania Smart Railway Systems Infrastructure (Phase 3)**
   - *Expected:* Next 90 Days
   - *Budget:* **$42,000,000 USD**
   - *Buyer:* Tanzania Railways Corp (TRC)
   - *Win Suitability:* **Medium (61%)**

**Action Item:** Initialize pre-qualification steps or secure heavy fleet capacity options beforehand to mitigate seasonal cost spikes.`;
      } 
      else {
        responseText = `I have scanned our East Africa CPIN database for terms related to *"_${textQuery}_"*.

For targeted results:
- Type **"best opportunities"** to pull the high-probability scored tender list.
- Type **"UNRA projects"** to see consortium partners & joint-venture templates.
- Type **"solar energy"** to look at active NGO purchases.
- Type **"predict upcoming"** to view our 90-day predictive pipeline forecasts.`;
      }

      const assistantMsg: Message = {
        id: `m-a-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "init-1",
        sender: "assistant",
        text: "Enterprise Intelligence Copilot loaded successfully. Ask me another question about cross-border procurement pipelines.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[720px]">
      
      {/* LEFT CHAT AREA (xl:col-span-8) */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between overflow-hidden h-full">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#FF6321] animate-bounce" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">Procurement Copilot Engine</h3>
              <p className="text-[9.5px] text-slate-500 font-mono">CPIN MODEL v4.0 ACTIVE</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={clearChat}
            className="p-1.5 hover:bg-slate-900 text-slate-500 hover:text-red-400 rounded transition"
            title="Clear Chat Logs"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Message feed container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll bg-slate-950/20">
          {messages.map((m) => {
            const isAsst = m.sender === 'assistant';
            return (
              <div 
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isAsst ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`p-2 rounded-lg h-fit border ${
                  isAsst ? 'bg-slate-950 border-slate-850' : 'bg-[#FF6321]/15 border-[#FF6321]/30'
                }`}>
                  {isAsst ? <Bot className="h-4 w-4 text-[#FF6321]" /> : <User className="h-4 w-4 text-[#FF9E00]" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    isAsst 
                      ? 'bg-slate-900/90 border-slate-850 text-slate-200' 
                      : 'bg-[#FF6321] text-black font-semibold border-transparent shadow-[0_4px_12px_rgba(255,99,33,0.1)]'
                  }`}>
                    {/* Render helper handles line breaks & bold labels */}
                    {m.text.split('\n').map((line, lidX) => {
                      if (line.startsWith('|')) {
                        // Render simple table-like layout
                        return (
                          <div key={lidX} className="font-mono text-[10px] py-0.5 border-b border-slate-800/40 text-slate-350">
                            {line}
                          </div>
                        );
                      }
                      
                      // Highlight sections wrapped with double asterisks
                      const parts = line.split('**');
                      return (
                        <p key={lidX} className="mt-1 leading-normal">
                          {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} className={isAsst ? 'text-white font-extrabold' : 'font-black text-black'}>{p}</strong> : p)}
                        </p>
                      );
                    })}
                  </div>
                  <span className={`text-[8.5px] font-mono text-slate-500 block ${isAsst ? 'text-left' : 'text-right'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={chatBottomRef} />
        </div>

        {/* Input query box */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(inputVal);
          }}
          className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Query details like 'Show best opportunities' or 'Who to partner with UNRA'..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-250 placeholder-slate-600 focus:outline-none focus:border-[#FF6321]"
          />
          <button 
            type="submit"
            className="px-4 bg-[#FF6321] hover:bg-[#ff7b42] text-black font-extrabold rounded-lg text-xs transition duration-150 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,99,33,0.15)]"
          >
            <span>Send</span> <Send className="h-3 w-3 fill-black" />
          </button>
        </form>

      </div>

      {/* RIGHT BENCHMARK SUGGESTIONS ASIDE (xl:col-span-4) */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="pb-2.5 border-b border-slate-850">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-250 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#FF9E00]" /> Query Benchmarks
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">SIMULATE COMPLEX INQUIRIES IMMEDIATELY</p>
          </div>

          <div className="space-y-2.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(s.query)}
                className="w-full text-left p-3 rounded-lg bg-slate-950 border border-slate-850 hover:border-[#FF6321]/40 hover:bg-slate-950/100 text-[11px] text-slate-400 hover:text-slate-200 font-semibold transition group flex justify-between items-center gap-2"
              >
                <span>{s.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-[#FF6321] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-850/60 rounded text-[10.5px] text-slate-500 leading-normal font-mono">
          🚨 **COGNITIVE SAFETY ADVISORY:** Core model routes answers dynamically using simulated semantic intelligence indices matched with the regional entity relational trust graph (EAC).
        </div>
      </div>

    </div>
  );
}
