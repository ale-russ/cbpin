import { useState, useMemo } from 'react';
import { MapPin, Globe, Sparkles, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MapProject {
  id: string;
  name: string;
  country: 'Uganda' | 'Kenya' | 'Tanzania' | 'Rwanda' | 'South Sudan';
  type: 'Road Works' | 'Energy Grid' | 'Refugee Logistics' | 'Oil & Gas Pipeline' | 'Hotspot Heatmap';
  valueUSD: number;
  lat: number;   // localized SVG projection x
  lng: number;   // localized SVG projection y
  status: string;
}

export default function ProcurementMap() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'Road Works', 'Energy Grid', 'Refugee Logistics', 'Oil & Gas Pipeline', 'Hotspot Heatmap'
  ]);
  const [hoveredProject, setHoveredProject] = useState<MapProject | null>(null);

  const projects: MapProject[] = [
    { id: "MAP-01", name: "Albertine Graben Oil Feeder Roads", country: "Uganda", type: "Road Works", valueUSD: 14500000, lat: 210, lng: 180, status: "RFP Scored" },
    { id: "MAP-02", name: "EACOP Pipeline Hoima Section Coating", country: "Uganda", type: "Oil & Gas Pipeline", valueUSD: 8550000, lat: 240, lng: 200, status: "Critical" },
    { id: "MAP-03", name: "Kyangwali Camp Offgrid Solar PV Installation", country: "Uganda", type: "Energy Grid", valueUSD: 3600000, lat: 200, lng: 220, status: "SME Approved" },
    
    { id: "MAP-04", name: "National Digital Connected Interoperability Tech", country: "Kenya", type: "Refugee Logistics", valueUSD: 18700000, lat: 450, lng: 190, status: "Strategic Match" },
    { id: "MAP-05", name: "Mombasa Port Corridor Transit Highway Phase II", country: "Kenya", type: "Road Works", valueUSD: 34000000, lat: 500, lng: 260, status: "Pre-alert" },
    
    { id: "MAP-06", name: "WFP Bulk Maize Milling Logistical Lines", country: "Tanzania", type: "Refugee Logistics", valueUSD: 5200000, lat: 380, lng: 320, status: "Excellent Win Chance" },
    { id: "MAP-07", name: "Mwanza-Bukoba Pipeline Supply Interconnect", country: "Tanzania", type: "Oil & Gas Pipeline", valueUSD: 12500000, lat: 310, lng: 290, status: "Expected" },
    
    { id: "MAP-08", name: "Kigali AMI Smart Electrical Billing Rollout", country: "Rwanda", type: "Energy Grid", valueUSD: 12100005, lat: 180, lng: 300, status: "Form JV" },
    { id: "MAP-09", name: "Juba-Nimule Highway Re-pavement Work", country: "South Sudan", type: "Road Works", valueUSD: 27000000, lat: 150, lng: 80, status: "High Risk Tender" },

    // Core high value hotspot bubbles
    { id: "MAP-H1", name: "Albertine Energy Basin Hotspot", country: "Uganda", type: "Hotspot Heatmap", valueUSD: 350000000, lat: 225, lng: 190, status: "Extremely Dense" },
    { id: "MAP-H2", name: "Kigali Smart Metropolitan Grid Zone", country: "Rwanda", type: "Hotspot Heatmap", valueUSD: 110000000, lat: 180, lng: 300, status: "Dense" },
    { id: "MAP-H3", name: "Nairobi Digital Tech Incubation Hub", country: "Kenya", type: "Hotspot Heatmap", valueUSD: 180000000, lat: 460, lng: 210, status: "Dense" }
  ];

  // Filters projects based on state and layer checkbox array selection
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCountry = selectedCountry === "All" || p.country === selectedCountry;
      const matchLayer = activeLayers.includes(p.type);
      return matchCountry && matchLayer;
    });
  }, [selectedCountry, activeLayers]);

  const handleToggleLayer = (layer: string) => {
    if (activeLayers.includes(layer)) {
      setActiveLayers(activeLayers.filter(l => l !== layer));
    } else {
      setActiveLayers([...activeLayers, layer]);
    }
  };

  const getLayerColor = (type: string) => {
    switch (type) {
      case 'Road Works': return 'bg-amber-500 border-amber-400';
      case 'Energy Grid': return 'bg-yellow-400 border-yellow-300';
      case 'Refugee Logistics': return 'bg-violet-400 border-violet-300';
      case 'Oil & Gas Pipeline': return 'bg-[#FF6321] border-[#ff7b42]';
      case 'Hotspot Heatmap': return 'bg-[#00FF00] border-[#55FF55]';
      default: return 'bg-slate-400 border-slate-300';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: FILTERS & STATISTICS (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-[650px] overflow-y-auto">
        <div className="space-y-5">
          <div className="pb-3 border-b border-slate-850">
            <span className="text-[9px] text-[#FF9E00] font-bold font-mono tracking-widest block uppercase mb-1">Geospatial Intelligence</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350">EAC Territory Map</h3>
          </div>

          {/* Selector block */}
          <div>
            <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block font-bold mb-2">Regional Scope Filter</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full text-xs py-1.5 px-2.5 bg-slate-1000 border border-slate-850 rounded text-slate-300 focus:outline-none"
            >
              <option value="All">All Sovereign States</option>
              <option value="Uganda">Uganda Hub</option>
              <option value="Kenya">Kenya Hub</option>
              <option value="Tanzania">Tanzania Hub</option>
              <option value="Rwanda">Rwanda Hub</option>
              <option value="South Sudan">South Sudan</option>
            </select>
          </div>

          {/* Active layer filters */}
          <div>
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#FF6321] block font-bold mb-3">Map Layer Channels</label>
            <div className="space-y-2 text-xs">
              {['Road Works', 'Energy Grid', 'Refugee Logistics', 'Oil & Gas Pipeline', 'Hotspot Heatmap'].map((l) => {
                const checked = activeLayers.includes(l);
                return (
                  <div 
                    key={l}
                    onClick={() => handleToggleLayer(l)}
                    className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded hover:bg-slate-950 text-slate-400 select-none"
                  >
                    <input 
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="h-3.5 w-3.5 text-[#FF6321] bg-slate-950 border-slate-800"
                    />
                    <span>{l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Project Total value indicator */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 mt-4">
          <span className="text-[9px] text-slate-500 font-mono block uppercase font-bold">TOTAL ACTIVE REGIONAL VALUE</span>
          <span className="text-sm font-bold font-mono text-slate-100 block mt-1">
            ${(filteredProjects.reduce((sum, curr) => sum + curr.valueUSD, 0) / 1000000).toFixed(1)}M USD
          </span>
          <span className="text-[9.5px] text-slate-500 block mt-0.5">Aggregated in displayed view</span>
        </div>
      </div>

      {/* RIGHT COLUMN: MAP GRID CANVAS STAGE (xl:col-span-9) */}
      <div className="xl:col-span-9 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[650px] relative overflow-hidden select-none">
        
        {/* Dynamic overlay detail banner of hovered dot */}
        <div className="absolute top-5 left-5 z-10 bg-slate-950/95 border border-slate-800/80 p-3 rounded-xl max-w-sm shadow-xl flex items-start gap-2.5">
          <Globe className="h-4 w-4 text-[#FF6321] mt-0.5 animate-spin duration-300" />
          <div>
            {hoveredProject ? (
              <div>
                <span className="text-[9px] text-slate-500 font-mono block font-bold">{hoveredProject.id} : {hoveredProject.type}</span>
                <h4 className="text-xs font-bold text-slate-200 mt-1">{hoveredProject.name}</h4>
                <div className="flex gap-4 mt-2.5 font-mono text-[10px] text-slate-400 border-t border-slate-900 pt-1.5">
                  <span>Value: <strong className="text-emerald-400">${(hoveredProject.valueUSD / 1000000).toFixed(2)}M</strong></span>
                  <span>Region: <strong className="text-slate-350">{hoveredProject.country}</strong></span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[9.5px] text-slate-500 font-mono block uppercase font-bold">Interactive EAC Radar</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Hover or click over any coordinate on the vector map to inspect project parameters.</p>
              </div>
            )}
          </div>
        </div>

        {/* VECTOR SVG MAP CANVAS CONTROLLER */}
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-850 relative overflow-hidden flex items-center justify-center">
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 650 480" xmlns="http://www.w3.org/2000/svg">
            
            {/* AMBIENT BACKGROUND LANDMASS GUIDES */}
            <g className="opacity-15 stroke-slate-800 stroke-[1.5px] fill-slate-900">
              {/* Fake outline representations for East Africa Borders */}
              {/* Uganda Border block */}
              <polygon points="140,160 260,150 280,240 180,250" />
              {/* Kenya Border block */}
              <polygon points="260,150 480,140 520,280 280,240" />
              {/* Tanzania Border block */}
              <polygon points="180,250 280,240 520,280 430,420 250,380" />
              {/* Rwanda Border block */}
              <polygon points="160,280 180,250 190,300" />
              {/* South Sudan Border block */}
              <polygon points="110,60 240,60 260,150 140,160" />
            </g>

            {/* LAKE VICTORIA OUTLINE (Aesthetic signature) */}
            <ellipse cx="255" cy="245" rx="28" ry="18" className="fill-blue-900/40 stroke-blue-700/50 stroke-1" />
            <text x="255" y="248" textAnchor="middle" className="fill-blue-400 text-[8px] font-mono select-none">L. Victoria</text>

            {/* Sovereign State Labels Overlay */}
            <g className="fill-slate-500 text-[10px] font-bold font-mono tracking-widest leading-none pointer-events-none select-none opacity-40">
              <text x="180" y="200" textAnchor="middle">UGANDA</text>
              <text x="380" y="210" textAnchor="middle">KENYA</text>
              <text x="340" y="340" textAnchor="middle">TANZANIA</text>
              <text x="150" y="320" textAnchor="middle">RWANDA</text>
              <text x="170" y="110" textAnchor="middle">S. SUDAN</text>
            </g>

            {/* RENDER GEOGRAPHIC INTELLIGENCE POINTS */}
            {filteredProjects.map((p) => {
              const isHeatmap = p.type === 'Hotspot Heatmap';
              return (
                <g key={p.id}
                   className="cursor-pointer group"
                   onMouseEnter={() => setHoveredProject(p)}
                   onMouseLeave={() => setHoveredProject(null)}
                >
                  {isHeatmap ? (
                    // Large pulsing glow Heatmap footprint
                    <g>
                      <circle cx={p.lat} cy={p.lng} r="35" className="fill-[#00ff00]/10 stroke-[#00ff55]/10 stroke-1 animate-pulse" />
                      <circle cx={p.lat} cy={p.lng} r="10" className="fill-[#00aa00]/10" />
                      <circle cx={p.lat} cy={p.lng} r="2" className="fill-[#00ff00] shadow-sm animate-ping" />
                    </g>
                  ) : (
                    // Standard tender location coordinate point
                    <g>
                      {/* Ambient target rings */}
                      <circle cx={p.lat} cy={p.lng} r="10" className="fill-transparent stroke-slate-700/10 group-hover:stroke-[#FF6321]/30 group-hover:scale-125 transition-transform" />
                      <circle cx={p.lat} cy={p.lng} r="5" className="fill-slate-950 stroke-slate-800" />
                      {/* Central core dot colored by layer */}
                      <circle cx={p.lat} cy={p.lng} r="3" className={`transition-all ${p.type === 'Road Works' ? 'fill-amber-400' : p.type === 'Energy Grid' ? 'fill-yellow-300' : p.type === 'Refugee Logistics' ? 'fill-violet-400' : 'fill-[#FF6321]'}`} />
                    </g>
                  )}
                </g>
              );
            })}

          </svg>
        </div>

        <div className="pt-2 text-slate-500 text-[10px] font-mono flex justify-between items-center bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/40">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500" /> Sovereign Hub coordinates verified</span>
          <span>Aggregating spatial mapping feed for road, pipeline, grid, and NGO refugee camps.</span>
        </div>
      </div>

    </div>
  );
}
