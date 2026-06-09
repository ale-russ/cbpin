import { useState, useMemo } from 'react';
import { mockGraphNodes, mockGraphLinks } from '../../../data/mockOpportunities';
import { GraphNode, GraphLink } from '../../../shared/types';
import { Search, ZoomIn, ZoomOut, RotateCcw, Filter, BadgeInfo, Layers, PlusCircle, Globe, Link2 } from 'lucide-react';

export default function ProcurementGraph() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("MUGERWA_node");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeRelations, setActiveRelations] = useState<string[]>([
    'Awarded Contract', 'Joint Venture', 'Vendor Registration', 'Historical Supply', 'Funding Relationship', 'Subcontract Relationship'
  ]);
  const [selectedType, setSelectedType] = useState<string>("All");
  
  // Interactive zoom level
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filtering nodes and links
  const filteredLinks = useMemo(() => {
    return mockGraphLinks.filter(l => activeRelations.includes(l.type));
  }, [activeRelations]);

  const activeTypes = useMemo(() => {
    const types = new Set(mockGraphNodes.map(n => n.type));
    return Array.from(types);
  }, []);

  const filteredNodes = useMemo(() => {
    return mockGraphNodes.filter(n => {
      const matchType = selectedType === "All" || n.type === selectedType;
      const matchSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  // Handle relationship filter toggle
  const handleToggleRelation = (rel: string) => {
    if (activeRelations.includes(rel)) {
      setActiveRelations(activeRelations.filter(r => r !== rel));
    } else {
      setActiveRelations([...activeRelations, rel]);
    }
  };

  // Node visual alignment map coordinates
  const nodePositions: { [id: string]: { x: number; y: number } } = {
    "UNRA_node": { x: 150, y: 100 },
    "TOTAL_node": { x: 450, y: 80 },
    "UNHCR_node": { x: 300, y: 220 },
    "EUCL_node": { x: 600, y: 150 },
    "CRBC_node": { x: 100, y: 260 },
    "BOLLORE_node": { x: 550, y: 260 },
    "MUGERWA_node": { x: 220, y: 380 },
    "KAMPALA_SOLAR_node": { x: 400, y: 380 },
    "KIGALI_ELECT_node": { x: 620, y: 380 },
    "EACOP_PROJECT_node": { x: 350, y: 120 }
  };

  // Clicked node profile detail helper
  const activeNodeInfo = useMemo(() => {
    return mockGraphNodes.find(n => n.id === selectedNodeId);
  }, [selectedNodeId]);

  // Outward relationships list for selected node
  const activeNodeConnections = useMemo(() => {
    return mockGraphLinks.filter(l => l.source === selectedNodeId || l.target === selectedNodeId);
  }, [selectedNodeId]);

  // Color mapper based on Node type
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Buyer': return 'fill-emerald-400 stroke-emerald-500';
      case 'Supplier': return 'fill-[#FF6321] stroke-[#ff7b42]';
      case 'Prime Contractor': return 'fill-amber-400 stroke-amber-500';
      case 'Subcontractor': return 'fill-sky-400 stroke-sky-500';
      case 'Project': return 'fill-[#FF9E00] stroke-[#FFA600]';
      case 'NGO': return 'fill-violet-400 stroke-violet-500';
      case 'Donor': return 'fill-pink-400 stroke-pink-500';
      default: return 'fill-teal-400 stroke-teal-500';
    }
  };

  const getNodeTypeNameSymbol = (type: string) => {
    switch (type) {
      case 'Buyer': return '🏛';
      case 'Supplier': return '🏭';
      case 'Prime Contractor': return '💎';
      case 'Subcontractor': return '🔧';
      case 'Project': return '🚧';
      case 'NGO': return '🇺🇳';
      default: return '🔗';
    }
  };

  const handleZoom = (factor: 'in' | 'out' | 'reset') => {
    if (factor === 'in') setZoomScale(prev => Math.min(prev + 0.15, 2.5));
    else if (factor === 'out') setZoomScale(prev => Math.max(prev - 0.15, 0.5));
    else {
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: CONTROLLER & RELATIONSHIP OPTIONS (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-5 h-[650px] overflow-y-auto">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350 pb-2.5 border-b border-slate-850">Relationship Trace</h3>
          
          {/* Node search input */}
          <div className="mt-3 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="w-full text-xs py-1.5 pl-7 pr-3 bg-slate-950 border border-slate-800 rounded text-slate-350 focus:outline-none focus:border-[#FF6321]"
            />
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>

        {/* Node Category Filters */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block font-bold mb-2">Node Type Grouping</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-950 border border-slate-850 rounded text-slate-300 focus:outline-none"
          >
            <option value="All">All Types</option>
            {activeTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Link relationship type checkboxes */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#FF6321] block font-bold mb-3">Active Covenants Trails</label>
          <div className="space-y-2 text-xs">
            {([
              'Awarded Contract', 'Joint Venture', 'Vendor Registration', 'Historical Supply', 'Funding Relationship', 'Subcontract Relationship'
            ]).map((relName) => {
              const isChecked = activeRelations.includes(relName);
              return (
                <div 
                  key={relName} 
                  onClick={() => handleToggleRelation(relName)}
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-950 text-slate-400 select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="h-3.5 w-3.5 bg-slate-950 border-slate-800 text-[#FF6321]"
                  />
                  <span>{relName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 mt-auto space-y-1.5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Type Legend</span>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Buyer</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FF6321]"></span> Supplier</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Prime</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Subcontractor</div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: INTERACTIVE VISUAL CANVAS GRID (xl:col-span-6) */}
      <div className="xl:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[650px] relative overflow-hidden">
        
        {/* Tool bar overlays */}
        <div className="absolute top-4 left-4 z-10 flex gap-1 bg-slate-950/90 border border-slate-800 p-1.5 rounded-lg shadow-md">
          <button 
            onClick={() => handleZoom('in')}
            title="Zoom In"
            className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleZoom('reset')}
            title="Reset Coordinates"
            className="p-1.5 hover:bg-slate-900 rounded text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute top-4 right-4 z-10 text-[10px] bg-[#1a130a] border border-[#302010] text-[#FF9E00] px-2.5 py-1 rounded-full font-mono font-bold animate-pulse uppercase select-none">
          🔍 Click Node to Inspect Connections
        </div>

        {/* THE SVG GRAPH STAGE */}
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-850 relative overflow-hidden select-none cursor-grab">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 740 460">
            <defs>
              <marker id="bidirection-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#302010" />
              </marker>
            </defs>

            {/* Transform Group applying Zoom/Pan */}
            <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomScale})`} style={{ transformOrigin: 'center' }} className="transition-transform duration-300">
              
              {/* RENDER RELATION LINKS */}
              {filteredLinks.map((link, idx) => {
                const sPos = nodePositions[link.source];
                const tPos = nodePositions[link.target];
                if (!sPos || !tPos) return null;
                
                // Check if selected node is endpoints of this link to highlight path
                const isLinked = selectedNodeId === link.source || selectedNodeId === link.target;

                return (
                  <g key={idx}>
                    <line
                      x1={sPos.x}
                      y1={sPos.y}
                      x2={tPos.x}
                      y2={tPos.y}
                      className={`stroke-2 transition-all ${
                        isLinked 
                          ? 'stroke-[#FF6321]/80 stroke-[3px]' 
                          : 'stroke-slate-800'
                      }`}
                      markerEnd="url(#bidirection-arrow)"
                    />
                    {/* Tiny floating text showing relationship type midway */}
                    {isLinked && (
                      <text
                        x={(sPos.x + tPos.x) / 2}
                        y={(sPos.y + tPos.y) / 2 - 4}
                        textAnchor="middle"
                        className="fill-slate-400 text-[8px] font-mono select-none"
                      >
                        {link.type}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* RENDER NETWORK NODES */}
              {mockGraphNodes.map((n) => {
                const pos = nodePositions[n.id];
                if (!pos) return null;

                const isSelected = selectedNodeId === n.id;
                const isFilteredOut = filteredNodes.length > 0 && !filteredNodes.some(fn => fn.id === n.id);

                return (
                  <g 
                    key={n.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className={`cursor-pointer transition-all duration-300 ${isFilteredOut ? 'opacity-25' : 'opacity-100'}`}
                    onClick={() => setSelectedNodeId(n.id)}
                  >
                    <circle
                      r={isSelected ? 16 : 11}
                      className={`${getNodeColor(n.type)} transition-all ${
                        isSelected 
                          ? 'stroke-slate-200 stroke-2 shadow-[0_0_15px_#FF6321]' 
                          : 'stroke-slate-900 stroke-1'
                      }`}
                    />
                    
                    {/* Overlay symbol icons directly onto circles */}
                    <text
                      y={3}
                      textAnchor="middle"
                      className="text-[9px] font-bold select-none cursor-pointer fill-black pointer-events-none"
                    >
                      {getNodeTypeNameSymbol(n.type)}
                    </text>

                    {/* Left node label */}
                    <text
                      y={isSelected ? -22 : -16}
                      textAnchor="middle"
                      className="fill-slate-300 text-[9px] font-semibold font-sans pointer-events-none tracking-tight select-none"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}

            </g>
          </svg>
        </div>

        <div className="pt-2 text-slate-500 text-[10px] font-mono flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/40">
          <span>Scale Level: <strong>{(zoomScale * 100).toFixed(0)}%</strong></span>
          <span>Mapping active state subcontracts & tender allocations with PAU validation guidelines.</span>
        </div>
      </div>

      {/* RIGHT COLUMN: DETAIL NODE INSPECTOR PANEL (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-[650px] overflow-y-auto">
        
        {activeNodeInfo ? (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-850">
                <span className="text-[9px] text-[#FF6321] font-mono block font-bold leading-none tracking-widest uppercase mb-1">{activeNodeInfo.type} Inspector</span>
                <h3 className="text-sm font-bold text-slate-100">{activeNodeInfo.label}</h3>
                <span className="text-[10px] text-slate-500 font-mono block mt-1">Country Base: <strong>{activeNodeInfo.country}</strong></span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block font-mono">Operations Footprint Description</span>
                <p className="text-slate-400 mt-1.5 leading-relaxed text-[11px]">{activeNodeInfo.description}</p>
              </div>

              {activeNodeInfo.valUSD && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850/60 text-xs">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block font-mono">EST. ACTIVE VALUE RISK</span>
                  <span className="text-base font-bold font-mono text-slate-100 block mt-0.5">${activeNodeInfo.valUSD.toLocaleString()} USD</span>
                </div>
              )}

              {activeNodeInfo.complianceRating && (
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-emerald-950/10 border border-emerald-900/30 text-xs mt-2">
                  <span className="font-semibold text-emerald-400 font-mono">CPIN Compliance Rating</span>
                  <span className="font-bold font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded text-[10px]">{activeNodeInfo.complianceRating} GRADE</span>
                </div>
              )}

              {/* Node Relationships Trails */}
              <div className="space-y-2 mt-4">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider font-mono">Active Link Channels</span>
                <div className="space-y-1.5">
                  {activeNodeConnections.map((l, idx) => {
                    const isOutward = l.source === selectedNodeId;
                    const connectedNode = isOutward ? l.target : l.source;
                    const cleanConnectedName = mockGraphNodes.find(n => n.id === connectedNode)?.label || connectedNode;
                    return (
                      <div key={idx} className="p-2 bg-slate-950 border border-slate-850/60 rounded text-[10px] text-slate-400 flex justify-between items-center">
                        <span className="truncate max-w-[130px] font-semibold">🔗 {cleanConnectedName}</span>
                        <span className="text-[#FF6321] font-bold font-mono text-[9px] uppercase">{l.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 text-center text-slate-500 p-2.5 rounded border border-slate-850 mt-4">
              <span className="text-[8px] font-mono tracking-widest text-slate-600 block uppercase">SECURE SYNC CHANNELS ACTIVE</span>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-20 text-xs flex-1">Select a node circle in the graph network to inspect paths.</p>
        )}

      </div>

    </div>
  );
}
