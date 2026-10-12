import React, { useState, useEffect, useMemo } from 'react';
import { 
  Store, 
  MapPin, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calculator, 
  IndianRupee, 
  Sparkles, 
  RefreshCw, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Building2,
  Wheat,
  LayoutGrid,
  Table as TableIcon,
  ShieldCheck,
  ArrowUpDown,
  Share2,
  Check,
  ChevronDown,
  Info,
  BadgeAlert,
  Clock,
  Printer,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Government Minimum Support Price (MSP 2026) for comparison
const MSP_BENCHMARKS = {
  'गेहूँ': 2425,
  'धान': 2300,
  'सरसों': 5650,
  'चना': 5440,
  'सोयाबीन': 4600,
  'मक्का': 2090,
  'कपास': 7122,
  'बाजरा': 2500
};

// Crop Categories
const CROP_CATEGORIES = [
  { id: 'all', label_hi: 'सभी फसलें', label_en: 'All Crops', icon: '🌟' },
  { id: 'grains', label_hi: 'अनाज (Grains)', label_en: 'Grains', icon: '🌾', crops: ['गेहूँ', 'धान', 'मक्का', 'बाजरा'] },
  { id: 'pulses', label_hi: 'दलहन (Pulses)', label_en: 'Pulses', icon: '🌰', crops: ['चना'] },
  { id: 'oilseeds', label_hi: 'तिलहन (Oilseeds)', label_en: 'Oilseeds', icon: '🌻', crops: ['सरसों', 'सोयाबीन'] },
  { id: 'vegetables', label_hi: 'सब्जियां (Veg)', label_en: 'Vegetables', icon: '🥔', crops: ['आलू', 'प्याज', 'टमाटर', 'लहसुन'] },
  { id: 'cash', label_hi: 'नकदी / मसाले (Cash)', label_en: 'Cash / Spices', icon: '🌿', crops: ['कपास', 'जीरा'] }
];

export default function MandiBhavPage() {
  const { lang } = useAuth();
  const isHi = lang === 'hi';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  
  // Filter States
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('modal_desc'); // modal_desc, modal_asc, gain_desc, name_asc
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Calculator State
  const [calcRecord, setCalcRecord] = useState(null);
  const [quintals, setQuintals] = useState(30);
  const [costPerQuintal, setCostPerQuintal] = useState(1200);
  const [includeCost, setIncludeCost] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Detail Modal State
  const [detailModalItem, setDetailModalItem] = useState(null);

  // Fetch Mandi Rates from Django API
  const fetchMandiRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedState) params.append('state', selectedState);
      if (selectedDistrict) params.append('district', selectedDistrict);
      if (selectedCommodity) params.append('commodity', selectedCommodity);
      if (searchKeyword) params.append('search', searchKeyword);

      const response = await fetch(`/api/mandi-rates/?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setRecords(data.records || []);
        setStates(data.states || []);
        setDistricts(data.districts || []);
        setCommodities(data.commodities || []);
        
        // Default selected item for calculator
        if (!calcRecord && data.records && data.records.length > 0) {
          setCalcRecord(data.records[0]);
        }
      } else {
        throw new Error(data.error || 'Failed to load mandi data');
      }
    } catch (err) {
      console.error("Mandi fetch error:", err);
      setError(err.message || 'मंडी डेटा लोड करने में त्रुटि आई');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandiRates();
  }, [selectedState, selectedDistrict, selectedCommodity]);

  // Handle Category Filter
  const filteredRecords = useMemo(() => {
    let result = [...records];

    // Filter by category
    if (activeCategory !== 'all') {
      const catObj = CROP_CATEGORIES.find(c => c.id === activeCategory);
      if (catObj && catObj.crops) {
        result = result.filter(item => {
          return catObj.crops.some(cName => item.commodity.includes(cName));
        });
      }
    }

    // Sort result
    if (sortBy === 'modal_desc') {
      result.sort((a, b) => b.modal_price - a.modal_price);
    } else if (sortBy === 'modal_asc') {
      result.sort((a, b) => a.modal_price - b.modal_price);
    } else if (sortBy === 'gain_desc') {
      result.sort((a, b) => {
        const valA = parseFloat(a.change_pct) || 0;
        const valB = parseFloat(b.change_pct) || 0;
        return valB - valA;
      });
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.commodity.localeCompare(b.commodity));
    }

    return result;
  }, [records, activeCategory, sortBy]);

  // Market stats calculation
  const marketStats = useMemo(() => {
    if (!records.length) return { avg: 0, highest: null, gainers: [] };
    const avg = Math.round(records.reduce((acc, r) => acc + r.modal_price, 0) / records.length);
    const highest = [...records].sort((a, b) => b.modal_price - a.modal_price)[0];
    const gainers = [...records].filter(r => r.trend === 'up').slice(0, 4);
    return { avg, highest, gainers };
  }, [records]);

  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedCommodity('');
    setActiveCategory('all');
    setSearchKeyword('');
    setSortBy('modal_desc');
  };

  // Calculator computations
  const currentModalRate = calcRecord ? calcRecord.modal_price : 2460;
  const currentCommodityName = calcRecord ? calcRecord.commodity : 'गेहूँ (Wheat)';
  const totalRevenue = (quintals || 0) * currentModalRate;
  const totalCost = includeCost ? (quintals || 0) * (costPerQuintal || 0) : 0;
  const netProfit = totalRevenue - totalCost;

  // Find matching MSP
  const mspRate = useMemo(() => {
    if (!calcRecord) return null;
    for (const [cropKey, rate] of Object.entries(MSP_BENCHMARKS)) {
      if (calcRecord.commodity.includes(cropKey)) return rate;
    }
    return null;
  }, [calcRecord]);

  const mspTotal = mspRate ? (quintals || 0) * mspRate : null;
  const mspDifference = mspTotal ? totalRevenue - mspTotal : null;

  const handleCopySlip = () => {
    const slipText = `🌾 *फसलमित्र मंडी भाव पर्ची* 🌾\nफसल: ${currentCommodityName}\nमंडी: ${calcRecord?.mandi}\nमॉडल भाव: ₹${currentModalRate}/क्विंटल\nकुल पैदावार: ${quintals} क्विंटल\nअनुमानित कुल आमदनी: ₹${totalRevenue.toLocaleString('en-IN')}\nशुद्ध मुनाफा: ₹${netProfit.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(slipText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto px-1 sm:px-4">
      {/* 1. HERO HEADER WITH LIVE MARKET PULSE */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#123826] via-[#1B4332] to-[#2D5A43] text-white shadow-xl border border-emerald-900/40 p-6 sm:p-8">
        {/* Background decorative circles */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none">
          <Store size={220} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-semibold mb-3 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles size={15} className="text-amber-300" />
            <span>{isHi ? 'लाइव कृषि मंडी बाज़ार दरें (Agmarknet Real APMC)' : 'Live Agmarknet Agricultural Market Rates'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
            {isHi ? '📊 आज के ताज़ा मंडी भाव एवं आमदनी' : '📊 Today\'s Live Mandi Bhav & Revenue'}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isHi 
              ? 'प्रमुख मंडियों के न्यूनतम, मॉडल व अधिकतम भाव देखें, सरकारी MSP से तुलना करें और फसल बेचने पर अपना सही मुनाफा पहले ही जानें।' 
              : 'Track real-time modal prices, compare against official MSP support prices, and calculate exact farmer sales and net profit.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-emerald-100 font-medium">
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <Calendar size={14} className="text-amber-300" />
              {isHi ? 'अंतिम अपडेट: 12 अक्टूबर 2026' : 'Updated: 12 Oct 2026'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <IndianRupee size={14} className="text-emerald-300" />
              {isHi ? 'इकाई: ₹ प्रति क्विंटल' : 'Unit: ₹ per Quintal'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <ShieldCheck size={14} className="text-teal-300" />
              {isHi ? '36+ सक्रिय मंडियां' : '36+ Active APMCs'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MARKET TICKER BAR (तेजी/मंदी की ताज़ा खबरें) */}
      {marketStats.gainers.length > 0 && (
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 shrink-0">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase tracking-wider text-[11px]">
              {isHi ? '🔥 आज की तेजी' : 'Top Gainers'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {marketStats.gainers.map((g, idx) => (
              <div 
                key={idx} 
                onClick={() => setCalcRecord(g)}
                className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 cursor-pointer transition text-xs"
              >
                <span className="font-bold text-slate-800">{g.commodity.split(' ')[0]}</span>
                <span className="font-extrabold text-emerald-700">₹{g.modal_price}</span>
                <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                  <TrendingUp size={12} className="mr-0.5" />
                  {g.change_pct}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 shrink-0 border-l pl-3">
            <span>{isHi ? 'औसत मॉडल भाव:' : 'Avg Modal:'}</span>
            <span className="font-extrabold text-slate-800">₹{marketStats.avg}/क्विंटल</span>
          </div>
        </div>
      )}

      {/* 3. SUPERCHARGED KISAN AMUDANI & PROFIT CALCULATOR */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-emerald-50/60 border border-amber-200/90 rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs font-extrabold mb-2">
              <Calculator size={14} className="text-amber-700" />
              <span>{isHi ? 'किसान आय एवं मुनाफा कैलकुलेटर (Farmer Revenue Simulator)' : 'Farmer Profit & Revenue Simulator'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {isHi ? 'अपनी उपज की कुल बिक्री व शुद्ध बचत जानें' : 'Calculate Produce Value & Net Margin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isHi 
                ? `चयनित फसल: ${currentCommodityName} | मंडी: ${calcRecord ? calcRecord.mandi : 'वाराणसी राजातालाब'} | दर: ₹${currentModalRate}/क्विंटल`
                : `Selected: ${currentCommodityName} @ ₹${currentModalRate}/Quintal`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySlip}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              <span>{copiedLink ? (isHi ? 'पर्ची कॉपी हो गई!' : 'Slip Copied!') : (isHi ? 'पर्ची साझा करें' : 'Share Slip')}</span>
            </button>
          </div>
        </div>

        {/* Calculator Inputs & Outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 bg-white/80 p-5 rounded-2xl border border-amber-200/70 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isHi ? 'कुल पैदावार (क्विंटल में):' : 'Total Produce (Quintals):'}
                </label>
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {quintals} {isHi ? 'क्विंटल' : 'Qtl'}
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="300"
                step="1"
                value={quintals}
                onChange={(e) => setQuintals(Number(e.target.value) || 0)}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 Qtl</span>
                <span>100 Qtl</span>
                <span>200 Qtl</span>
                <span>300 Qtl</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={includeCost}
                    onChange={(e) => setIncludeCost(e.target.checked)}
                    className="accent-emerald-600 rounded"
                  />
                  <span>{isHi ? 'लागत घटाकर शुद्ध मुनाफा देखें (Deduct Cost)' : 'Calculate Net Profit (Less Cost)'}</span>
                </label>
              </div>

              {includeCost && (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-500">{isHi ? 'अनुमानित लागत प्रति क्विंटल (₹):' : 'Cost per Quintal (₹):'}</span>
                    <input 
                      type="number"
                      min="0"
                      max="10000"
                      value={costPerQuintal}
                      onChange={(e) => setCostPerQuintal(Number(e.target.value) || 0)}
                      className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="text-right pt-4">
                    <span className="text-[11px] text-slate-400 block">{isHi ? 'कुल लागत:' : 'Total Cost:'}</span>
                    <span className="text-xs font-bold text-rose-700">- ₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Output Cards (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gross Revenue Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {isHi ? 'कुल बिक्री मूल्य (Gross Sale)' : 'Gross Sale Amount'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  ₹ {totalRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {quintals} क्विंटल × ₹{currentModalRate}/क्विंटल
                </p>
              </div>

              {mspRate && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{isHi ? 'सरकारी MSP दर:' : 'Govt MSP:'} ₹{mspRate}</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md ${
                    mspDifference >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {mspDifference >= 0 ? `+ ₹${mspDifference.toLocaleString('en-IN')} MSP से ऊपर` : `- ₹${Math.abs(mspDifference).toLocaleString('en-IN')} MSP से कम`}
                  </span>
                </div>
              )}
            </div>

            {/* Net Profit Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-100 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-300" />
                  {isHi ? 'शुद्ध किसान बचत (Net Profit)' : 'Farmer Net Profit'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2">
                  ₹ {netProfit.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-emerald-100/80 mt-1">
                  {includeCost ? (isHi ? 'लागत काटने के बाद शुद्ध बचत' : 'After deducting estimated cultivation costs') : (isHi ? 'लागत नहीं जोड़ी गई' : 'Gross figure without cost deduction')}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-500/40 flex items-center justify-between text-xs text-emerald-100">
                <span>{isHi ? 'शुद्ध मार्जिन:' : 'Margin:'}</span>
                <span className="font-extrabold text-amber-200">
                  {totalRevenue > 0 ? `${Math.round((netProfit / totalRevenue) * 100)}% बचत` : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CROP CATEGORY QUICK PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CROP_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-800/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{isHi ? cat.label_hi : cat.label_en}</span>
            </button>
          );
        })}
      </div>

      {/* 5. LOCATION & SEARCH FILTER TOOLBAR */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-emerald-700" />
            <h3 className="text-base font-extrabold text-slate-800">
              {isHi ? 'स्थान व फ़िल्टर नियंत्रण (Filter Mandis)' : 'Filter Mandis & Commodities'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid size={15} />
                <span className="hidden sm:inline">{isHi ? 'कार्ड' : 'Cards'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === 'table' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Table View"
              >
                <TableIcon size={15} />
                <span className="hidden sm:inline">{isHi ? 'तालिका' : 'Table'}</span>
              </button>
            </div>

            {(selectedState || selectedDistrict || selectedCommodity || searchKeyword || activeCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition"
              >
                <RefreshCw size={13} />
                <span>{isHi ? 'फ़िल्टर हटाएं' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* State Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {isHi ? '1. राज्य (State)' : '1. State'}
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{isHi ? 'सभी राज्य (All States)' : 'All States'}</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {isHi ? '2. जिला / शहर (District)' : '2. District / City'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{isHi ? 'सभी जिले (All Districts)' : 'All Districts'}</option>
              {districts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          {/* Commodity Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {isHi ? '3. फसल (Crop)' : '3. Commodity / Crop'}
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{isHi ? 'सभी फसलें (All Crops)' : 'All Crops'}</option>
              {commodities.map((cmd) => (
                <option key={cmd} value={cmd}>{cmd}</option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {isHi ? '4. मंडी / फसल खोजें (Search)' : '4. Search Mandi / Crop'}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={isHi ? "राजातालाब, गेहूँ, इंदौर..." : "Search e.g. Wheat, Indore..."}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMandiRates()}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              />
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Sort & Quick Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">{isHi ? 'क्रमबद्ध करें (Sort):' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-bold focus:ring-1 focus:ring-emerald-500"
            >
              <option value="modal_desc">{isHi ? 'मॉडल भाव: अधिक से कम' : 'Price: High to Low'}</option>
              <option value="modal_asc">{isHi ? 'मॉडल भाव: कम से अधिक' : 'Price: Low to High'}</option>
              <option value="gain_desc">{isHi ? 'सर्वाधिक तेजी (+%)' : 'Highest Gainers (%)'}</option>
              <option value="name_asc">{isHi ? 'फसल नाम (A to Z)' : 'Crop Name (A-Z)'}</option>
            </select>
          </div>

          <div className="text-slate-500 font-medium">
            {isHi ? 'कुल परिणाम: ' : 'Total Results: '}
            <span className="font-extrabold text-emerald-800">{filteredRecords.length} मंडियां</span>
          </div>
        </div>
      </div>

      {/* 6. MAIN CONTENT (GRID CARDS OR TABLE) */}
      <div>
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
            <RefreshCw size={40} className="animate-spin text-emerald-700 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-base">
              {isHi ? 'ताज़ा मंडी भाव लोड किए जा रहे हैं...' : 'Loading latest mandi rates...'}
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-3xl border border-red-200 p-8 text-center text-red-700">
            <BadgeAlert size={40} className="mx-auto mb-2 text-red-500" />
            <h4 className="font-bold text-lg mb-1">{isHi ? 'डेटा लोड करने में समस्या आई' : 'Failed to Load Data'}</h4>
            <p className="text-sm max-w-md mx-auto mb-4">{error}</p>
            <button 
              onClick={fetchMandiRates} 
              className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-md transition"
            >
              {isHi ? 'पुनः लोड करें (Retry)' : 'Retry'}
            </button>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center text-slate-500 shadow-sm">
            <Store size={48} className="mx-auto text-slate-300 mb-3" />
            <h4 className="font-extrabold text-slate-800 text-lg mb-1">
              {isHi ? 'कोई मंडी भाव नहीं मिला' : 'No Mandi Bhav Found'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5">
              {isHi 
                ? 'कृपया अपने चुने गए फ़िल्टर बदलें या अन्य राज्य/फसल का चयन करें।' 
                : 'Try resetting the filters or selecting another state or commodity category.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition shadow-md"
            >
              {isHi ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID CARDS VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecords.map((item, idx) => {
              const isSelected = calcRecord && calcRecord.mandi === item.mandi && calcRecord.commodity === item.commodity;
              
              // Check MSP for this item
              let itemMsp = null;
              for (const [key, val] of Object.entries(MSP_BENCHMARKS)) {
                if (item.commodity.includes(key)) itemMsp = val;
              }
              const isAboveMsp = itemMsp && item.modal_price >= itemMsp;

              return (
                <div 
                  key={`${item.mandi}-${item.commodity}-${idx}`}
                  className={`bg-white rounded-3xl border transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-lg ${
                    isSelected 
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md' 
                      : 'border-slate-200/90 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    {/* Header: Location & Trend */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-100 text-slate-700 mb-1">
                          {item.district}
                        </span>
                        <h4 className="font-black text-slate-900 text-base leading-snug">
                          {item.mandi}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-emerald-700" />
                          {item.state}
                        </p>
                      </div>

                      {/* Trend Pill */}
                      <div className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 shrink-0 ${
                        item.trend === 'up' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : item.trend === 'down'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp size={13} /> : item.trend === 'down' ? <TrendingDown size={13} /> : <Minus size={13} />}
                        <span>{item.change_pct}</span>
                      </div>
                    </div>

                    {/* Commodity Box */}
                    <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-100/90 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                          <Wheat size={16} className="text-emerald-700" />
                          <span>{item.commodity}</span>
                        </div>
                        {isAboveMsp && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-300">
                            MSP +
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        <span className="font-semibold text-slate-400">{isHi ? 'किस्म: ' : 'Variety: '}</span>
                        {item.variety}
                      </div>
                    </div>

                    {/* Price Range Box */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50/90 rounded-2xl p-3 text-center mb-4 border border-slate-100">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {isHi ? 'न्यूनतम' : 'Min'}
                        </div>
                        <div className="text-sm font-bold text-slate-700 mt-0.5">
                          ₹{item.min_price}
                        </div>
                      </div>

                      <div className="border-x border-slate-200">
                        <div className="text-[10px] uppercase font-black text-emerald-800">
                          {isHi ? 'मॉडल भाव' : 'Modal'}
                        </div>
                        <div className="text-lg font-black text-emerald-700 mt-0.5">
                          ₹{item.modal_price}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          {isHi ? 'अधिकतम' : 'Max'}
                        </div>
                        <div className="text-sm font-bold text-slate-700 mt-0.5">
                          ₹{item.max_price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setDetailModalItem(item)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <Info size={13} />
                      <span>{isHi ? 'विवरण' : 'Details'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setCalcRecord(item);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className={`font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition ${
                        isSelected 
                          ? 'bg-emerald-700 text-white shadow-sm' 
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <Calculator size={13} />
                      <span>{isSelected ? (isHi ? 'चयनित' : 'Active') : (isHi ? 'मुनाफा निकालें' : 'Calculate')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABULAR / SPREADSHEET VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[11px]">
                    <th className="p-3.5 pl-5">{isHi ? 'फसल व किस्म' : 'Commodity'}</th>
                    <th className="p-3.5">{isHi ? 'मंडी एवं जिला' : 'Mandi & District'}</th>
                    <th className="p-3.5">{isHi ? 'राज्य' : 'State'}</th>
                    <th className="p-3.5 text-right">{isHi ? 'न्यूनतम (₹)' : 'Min (₹)'}</th>
                    <th className="p-3.5 text-right">{isHi ? 'मॉडल भाव (₹)' : 'Modal Rate (₹)'}</th>
                    <th className="p-3.5 text-right">{isHi ? 'अधिकतम (₹)' : 'Max (₹)'}</th>
                    <th className="p-3.5 text-center">{isHi ? 'ट्रेंड' : 'Trend'}</th>
                    <th className="p-3.5 pr-5 text-center">{isHi ? 'एक्शन' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((item, idx) => {
                    const isSelected = calcRecord && calcRecord.mandi === item.mandi && calcRecord.commodity === item.commodity;
                    return (
                      <tr 
                        key={idx}
                        className={`hover:bg-emerald-50/40 transition ${isSelected ? 'bg-emerald-50/70 font-semibold' : ''}`}
                      >
                        <td className="p-3.5 pl-5">
                          <div className="font-extrabold text-slate-900">{item.commodity}</div>
                          <div className="text-[11px] text-slate-500">{item.variety}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-800">{item.mandi}</div>
                          <div className="text-[11px] text-slate-500">{item.district}</div>
                        </td>
                        <td className="p-3.5 text-slate-600">{item.state.split(' ')[0]}</td>
                        <td className="p-3.5 text-right font-medium text-slate-600">₹{item.min_price}</td>
                        <td className="p-3.5 text-right">
                          <span className="font-black text-emerald-800 text-base">₹{item.modal_price}</span>
                          <span className="text-[10px] text-slate-400 block">/Qtl</span>
                        </td>
                        <td className="p-3.5 text-right font-medium text-slate-600">₹{item.max_price}</td>
                        <td className="p-3.5 text-center">
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold text-[11px] ${
                            item.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : item.trend === 'down' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.trend === 'up' ? <TrendingUp size={11} /> : item.trend === 'down' ? <TrendingDown size={11} /> : null}
                            {item.change_pct}
                          </span>
                        </td>
                        <td className="p-3.5 pr-5 text-center">
                          <button
                            onClick={() => {
                              setCalcRecord(item);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 hover:bg-emerald-200 text-xs font-bold transition"
                          >
                            {isHi ? 'कैलकुलेट' : 'Calc'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 7. MANDI DETAIL MODAL */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-4">
            <button
              onClick={() => setDetailModalItem(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Store size={26} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {detailModalItem.district} • {detailModalItem.state}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {detailModalItem.mandi}
                </h3>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{isHi ? 'फसल व किस्म:' : 'Crop & Variety:'}</span>
                <span className="font-bold text-slate-800">{detailModalItem.commodity} ({detailModalItem.variety})</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{isHi ? 'नीलामी का समय:' : 'Auction Timings:'}</span>
                <span className="font-bold text-slate-800">सुबह 08:00 AM से दोपहर 02:00 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{isHi ? 'मानक नमी (Moisture):' : 'Std Moisture:'}</span>
                <span className="font-bold text-slate-800">&lt; 12% (FAQ Grade)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{isHi ? 'आज का मॉडल भाव:' : 'Today\'s Modal Rate:'}</span>
                <span className="font-black text-emerald-700 text-base">₹{detailModalItem.modal_price} / क्विंटल</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Info size={16} className="shrink-0 mt-0.5 text-amber-700" />
              <span>
                {isHi 
                  ? 'किसान भाई अपनी फसल लाने से पहले सुखाकर और साफ करके लाएं, जिससे अधिकतम मॉडल भाव प्राप्त हो सके।' 
                  : 'Farmers are advised to bring properly cleaned and dried produce with moisture under 12% to secure maximum rates.'}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setCalcRecord(detailModalItem);
                  setDetailModalItem(null);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                {isHi ? 'इस भाव पर आमदनी कैलकुलेट करें' : 'Calculate Profit for this Mandi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
