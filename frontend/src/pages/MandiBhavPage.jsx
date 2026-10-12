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
  Wheat, 
  LayoutGrid, 
  Table as TableIcon, 
  ShieldCheck, 
  Share2, 
  Check, 
  Info, 
  X,
  ArrowRight
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
  const [sortBy, setSortBy] = useState('modal_desc');
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

  // Handle Category Filter & Sorting
  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (activeCategory !== 'all') {
      const catObj = CROP_CATEGORIES.find(c => c.id === activeCategory);
      if (catObj && catObj.crops) {
        result = result.filter(item => {
          return catObj.crops.some(cName => item.commodity.includes(cName));
        });
      }
    }

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
    const gainers = [...records].filter(r => r.trend === 'up').slice(0, 5);
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
    const slipText = `🌾 *फसलमित्र मंडी भाव पर्ची* 🌾\nफसल: ${currentCommodityName}\nमंडी: ${calcRecord?.mandi}\nमॉडल भाव: ₹${currentModalRate}/क्विंटल\nकुल पैदावार: ${quintals} क्विंटल\nअनुमानित कुल आमदनी: ₹${totalRevenue.toLocaleString('en-IN')}\nशुद्ध बचत: ₹${netProfit.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(slipText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fm-mandi-container">
      {/* 1. HERO BANNER */}
      <div className="fm-mandi-hero">
        <div className="fm-mandi-hero-content">
          <div className="fm-mandi-hero-pill">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
            <Sparkles size={14} color="#FDE047" />
            <span>{isHi ? 'लाइव कृषि मंडी बाज़ार दरें (Agmarknet Real APMC)' : 'Live Agmarknet Agricultural Market Rates'}</span>
          </div>

          <h1>
            {isHi ? '📊 आज के ताज़ा मंडी भाव एवं किसान आमदनी' : '📊 Today\'s Live Mandi Bhav & Revenue'}
          </h1>
          <p>
            {isHi 
              ? 'प्रमुख मंडियों के न्यूनतम, मॉडल व अधिकतम भाव देखें, सरकारी MSP से तुलना करें और फसल बेचने पर अपना सही मुनाफा पहले ही जानें।' 
              : 'Track real-time modal prices, compare against official MSP support prices, and calculate exact farmer sales and net profit.'}
          </p>

          <div className="fm-mandi-hero-badges">
            <div className="fm-mandi-hero-tag">
              <Calendar size={14} color="#FDE047" />
              <span>{isHi ? 'अंतिम अपडेट: आज 12 अक्टूबर 2026' : 'Updated: 12 Oct 2026'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <IndianRupee size={14} color="#86EFAC" />
              <span>{isHi ? 'इकाई: ₹ प्रति क्विंटल' : 'Unit: ₹ per Quintal'}</span>
            </div>
            <div className="fm-mandi-hero-tag">
              <ShieldCheck size={14} color="#6EE7B7" />
              <span>{isHi ? '36+ सक्रिय मंडियां' : '36+ Active APMCs'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MARKET TICKER BAR */}
      {marketStats.gainers.length > 0 && (
        <div className="fm-mandi-ticker">
          <div className="fm-mandi-ticker-title">
            <span style={{ backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success-text)', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>
              {isHi ? '🔥 आज की तेजी' : 'Top Gainers'}
            </span>
          </div>

          <div className="fm-mandi-ticker-list">
            {marketStats.gainers.map((g, idx) => (
              <div 
                key={idx} 
                onClick={() => setCalcRecord(g)}
                className="fm-mandi-ticker-item"
              >
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{g.commodity.split(' ')[0]}</span>
                <span style={{ fontWeight: 800, color: 'var(--primary-forest)' }}>₹{g.modal_price}</span>
                <span style={{ color: '#1B5E20', fontWeight: 800, display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                  <TrendingUp size={12} style={{ marginRight: 2 }} />
                  {g.change_pct}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'none', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }} className="d-md-flex">
            <span>{isHi ? 'औसत मॉडल:' : 'Avg Modal:'}</span>
            <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>₹{marketStats.avg}/क्विंटल</strong>
          </div>
        </div>
      )}

      {/* 3. KISAN AMUDANI & PROFIT CALCULATOR */}
      <div className="fm-mandi-calc">
        <div className="fm-mandi-calc-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, marginBottom: 6 }}>
              <Calculator size={13} color="#B45309" />
              <span>{isHi ? 'किसान आय एवं मुनाफा कैलकुलेटर (Profit Simulator)' : 'Farmer Profit & Revenue Simulator'}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHi ? 'अपनी उपज की कुल बिक्री व शुद्ध बचत जानें' : 'Calculate Produce Value & Net Margin'}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {isHi 
                ? `चयनित फसल: ${currentCommodityName} | मंडी: ${calcRecord ? calcRecord.mandi : 'वाराणसी राजातालाब'} | दर: ₹${currentModalRate}/क्विंटल`
                : `Selected: ${currentCommodityName} @ ₹${currentModalRate}/Quintal`}
            </div>
          </div>

          <div>
            <button
              onClick={handleCopySlip}
              className="fm-btn fm-btn-outline"
              style={{ padding: '8px 16px', fontSize: '0.82rem', gap: 6 }}
            >
              {copiedLink ? <Check size={14} color="#1B5E20" /> : <Share2 size={14} />}
              <span>{copiedLink ? (isHi ? 'पर्ची कॉपी हो गई!' : 'Slip Copied!') : (isHi ? 'पर्ची साझा करें' : 'Share Slip')}</span>
            </button>
          </div>
        </div>

        <div className="fm-mandi-calc-grid">
          {/* Left Inputs */}
          <div className="fm-mandi-calc-input-box">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {isHi ? 'कुल पैदावार (क्विंटल में):' : 'Total Produce (Quintals):'}
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-forest)', backgroundColor: 'var(--bg-surface-sage)', padding: '2px 8px', borderRadius: 6 }}>
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
                style={{ width: '100%', accentColor: 'var(--primary-forest)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                <span>5 Qtl</span>
                <span>100 Qtl</span>
                <span>200 Qtl</span>
                <span>300 Qtl</span>
              </div>
            </div>

            <div style={{ paddingTop: 10, borderTop: '1px solid #F0DFCA' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer', marginBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={includeCost}
                  onChange={(e) => setIncludeCost(e.target.checked)}
                  style={{ accentColor: 'var(--primary-forest)' }}
                />
                <span>{isHi ? 'लागत घटाकर शुद्ध मुनाफा देखें (Deduct Cost)' : 'Calculate Net Profit (Less Cost)'}</span>
              </label>

              {includeCost && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                      {isHi ? 'अनुमानित लागत प्रति क्विंटल (₹):' : 'Cost per Quintal (₹):'}
                    </span>
                    <input 
                      type="number"
                      min="0"
                      max="10000"
                      value={costPerQuintal}
                      onChange={(e) => setCostPerQuintal(Number(e.target.value) || 0)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-card)', fontSize: '0.9rem', fontWeight: 700 }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', paddingTop: 16 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{isHi ? 'कुल लागत:' : 'Total Cost:'}</span>
                    <strong style={{ color: '#C62828', fontSize: '0.95rem' }}>- ₹{totalCost.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Output Cards */}
          <div className="fm-mandi-calc-cards">
            {/* Gross Sale Card */}
            <div className="fm-mandi-result-card">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isHi ? 'कुल बिक्री मूल्य (Gross Sale)' : 'Gross Sale Amount'}
                </span>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--text-main)', marginTop: 8 }}>
                  ₹ {totalRevenue.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {quintals} क्विंटल × ₹{currentModalRate}/क्विंटल
                </div>
              </div>

              {mspRate && (
                <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'सरकारी MSP:' : 'Govt MSP:'} ₹{mspRate}</span>
                  <span style={{ 
                    fontWeight: 800, 
                    padding: '2px 8px', 
                    borderRadius: 6,
                    backgroundColor: mspDifference >= 0 ? '#E8F5E9' : '#FFEBEE',
                    color: mspDifference >= 0 ? '#1B5E20' : '#C62828'
                  }}>
                    {mspDifference >= 0 ? `+ ₹${mspDifference.toLocaleString('en-IN')} MSP से ऊपर` : `- ₹${Math.abs(mspDifference).toLocaleString('en-IN')} MSP से कम`}
                  </span>
                </div>
              )}
            </div>

            {/* Net Profit Card */}
            <div className="fm-mandi-result-card-profit">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4EDDA', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={13} color="#FDE047" />
                  {isHi ? 'शुद्ध किसान बचत (Net Profit)' : 'Farmer Net Profit'}
                </span>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                  ₹ {netProfit.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#D4EDDA', marginTop: 4 }}>
                  {includeCost ? (isHi ? 'लागत घटाने के बाद शुद्ध बचत' : 'After deducting estimated costs') : (isHi ? 'लागत नहीं काटी गई' : 'Gross figure')}
                </div>
              </div>

              <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <span style={{ color: '#D4EDDA' }}>{isHi ? 'शुद्ध मार्जिन:' : 'Margin:'}</span>
                <strong style={{ color: '#FDE047', fontSize: '0.9rem' }}>
                  {totalRevenue > 0 ? `${Math.round((netProfit / totalRevenue) * 100)}% बचत` : '0%'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CROP CATEGORY QUICK PILLS */}
      <div className="fm-mandi-cats">
        {CROP_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`fm-mandi-cat-btn ${isActive ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{isHi ? cat.label_hi : cat.label_en}</span>
            </button>
          );
        })}
      </div>

      {/* 5. LOCATION & SEARCH FILTER TOOLBAR */}
      <div className="fm-mandi-filters">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={18} color="var(--primary-forest)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHi ? 'स्थान व फ़िल्टर नियंत्रण (Filter Mandis)' : 'Filter Mandis & Commodities'}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* View Mode Toggle */}
            <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface-sage)', padding: 3, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--primary-forest)' : 'var(--text-muted)',
                  padding: '4px 10px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-subtle)' : 'none'
                }}
              >
                <LayoutGrid size={14} />
                <span>{isHi ? 'कार्ड' : 'Cards'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  border: 'none',
                  background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'table' ? 'var(--primary-forest)' : 'var(--text-muted)',
                  padding: '4px 10px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  boxShadow: viewMode === 'table' ? 'var(--shadow-subtle)' : 'none'
                }}
              >
                <TableIcon size={14} />
                <span>{isHi ? 'तालिका' : 'Table'}</span>
              </button>
            </div>

            {(selectedState || selectedDistrict || selectedCommodity || searchKeyword || activeCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#C62828',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} />
                <span>{isHi ? 'फ़िल्टर हटाएं' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="fm-mandi-filters-grid">
          {/* State */}
          <div className="fm-mandi-field">
            <label>{isHi ? '1. राज्य (State)' : '1. State'}</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
            >
              <option value="">{isHi ? 'सभी राज्य (All States)' : 'All States'}</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="fm-mandi-field">
            <label>{isHi ? '2. जिला / शहर (District)' : '2. District / City'}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">{isHi ? 'सभी जिले (All Districts)' : 'All Districts'}</option>
              {districts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          {/* Commodity */}
          <div className="fm-mandi-field">
            <label>{isHi ? '3. फसल (Crop)' : '3. Commodity'}</label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              <option value="">{isHi ? 'सभी फसलें (All Crops)' : 'All Crops'}</option>
              {commodities.map((cmd) => (
                <option key={cmd} value={cmd}>{cmd}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="fm-mandi-field">
            <label>{isHi ? '4. मंडी / फसल खोजें (Search)' : '4. Search Mandi / Crop'}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={isHi ? "जैसे: राजातालाब, गेहूँ..." : "Search e.g. Wheat, Indore..."}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMandiRates()}
                style={{ paddingLeft: 34, width: '100%' }}
              />
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
            </div>
          </div>
        </div>

        {/* Sort Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: 10, fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{isHi ? 'क्रमबद्ध करें (Sort):' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid var(--border-card)', fontWeight: 700, fontSize: '0.8rem' }}
            >
              <option value="modal_desc">{isHi ? 'मॉडल भाव: अधिक से कम' : 'Price: High to Low'}</option>
              <option value="modal_asc">{isHi ? 'मॉडल भाव: कम से अधिक' : 'Price: Low to High'}</option>
              <option value="gain_desc">{isHi ? 'सर्वाधिक तेजी (+%)' : 'Highest Gainers (%)'}</option>
              <option value="name_asc">{isHi ? 'फसल नाम (A to Z)' : 'Crop Name (A-Z)'}</option>
            </select>
          </div>

          <div style={{ color: 'var(--text-muted)' }}>
            {isHi ? 'उपलब्ध परिणाम: ' : 'Results: '}
            <strong style={{ color: 'var(--primary-forest)' }}>{filteredRecords.length} मंडियां</strong>
          </div>
        </div>
      </div>

      {/* 6. MAIN CONTENT (CARDS OR TABLE) */}
      <div>
        {loading ? (
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 60, textAlign: 'center' }}>
            <RefreshCw size={36} color="var(--primary-forest)" className="animate-spin" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontWeight: 700, color: 'var(--text-main)' }}>
              {isHi ? 'ताज़ा मंडी भाव लोड किए जा रहे हैं...' : 'Loading latest mandi rates...'}
            </p>
          </div>
        ) : error ? (
          <div style={{ backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 20, padding: 30, textAlign: 'center', color: '#C62828' }}>
            <h4 style={{ fontWeight: 800, marginBottom: 6 }}>{isHi ? 'डेटा लोड करने में समस्या आई' : 'Failed to Load Data'}</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>
            <button 
              onClick={fetchMandiRates} 
              className="fm-btn fm-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              {isHi ? 'पुनः लोड करें (Retry)' : 'Retry'}
            </button>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 20, padding: 60, textAlign: 'center' }}>
            <Store size={44} color="var(--text-muted)" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <h4 style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: 4 }}>
              {isHi ? 'कोई मंडी भाव नहीं मिला' : 'No Mandi Bhav Found'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              {isHi 
                ? 'कृपया अपने चुने गए फ़िल्टर बदलें या अन्य राज्य/फसल का चयन करें।' 
                : 'Try resetting the filters or selecting another state or commodity category.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="fm-btn fm-btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              {isHi ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID CARDS VIEW */
          <div className="fm-mandi-cards-grid">
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
                  className={`fm-mandi-card ${isSelected ? 'active' : ''}`}
                >
                  <div>
                    {/* Header */}
                    <div className="fm-mandi-card-header">
                      <div>
                        <span className="fm-mandi-badge-loc">
                          {item.district}
                        </span>
                        <h4 className="fm-mandi-title">
                          {item.mandi}
                        </h4>
                        <div className="fm-mandi-sub">
                          <MapPin size={12} color="var(--primary-forest)" />
                          <span>{item.state}</span>
                        </div>
                      </div>

                      {/* Trend */}
                      <div className={`fm-mandi-trend-pill ${
                        item.trend === 'up' ? 'fm-mandi-trend-up' : item.trend === 'down' ? 'fm-mandi-trend-down' : 'fm-mandi-trend-stable'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp size={12} /> : item.trend === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}
                        <span>{item.change_pct}</span>
                      </div>
                    </div>

                    {/* Commodity Box */}
                    <div className="fm-mandi-commodity-box">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="fm-mandi-commodity-name">
                          <Wheat size={16} color="var(--primary-forest)" />
                          <span>{item.commodity}</span>
                        </div>
                        {isAboveMsp && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: '#D1E7DD', color: '#0F5132', padding: '2px 6px', borderRadius: 4 }}>
                            MSP +
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        <span>{isHi ? 'किस्म: ' : 'Variety: '}</span>
                        <strong style={{ color: 'var(--text-body)' }}>{item.variety}</strong>
                      </div>
                    </div>

                    {/* Rates 3-Col */}
                    <div className="fm-mandi-rates-3col">
                      <div className="fm-mandi-rate-col">
                        <label>{isHi ? 'न्यूनतम' : 'Min'}</label>
                        <span>₹{item.min_price}</span>
                      </div>

                      <div className="fm-mandi-rate-col fm-mandi-rate-modal">
                        <label>{isHi ? 'मॉडल भाव' : 'Modal'}</label>
                        <span>₹{item.modal_price}</span>
                      </div>

                      <div className="fm-mandi-rate-col">
                        <label>{isHi ? 'अधिकतम' : 'Max'}</label>
                        <span>₹{item.max_price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="fm-mandi-card-actions">
                    <button
                      onClick={() => setDetailModalItem(item)}
                      style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                    >
                      <Info size={13} />
                      <span>{isHi ? 'विवरण' : 'Details'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setCalcRecord(item);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="fm-btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        backgroundColor: isSelected ? 'var(--primary-forest)' : 'var(--bg-surface-sage)',
                        color: isSelected ? '#FFFFFF' : 'var(--primary-forest)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 8
                      }}
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
          /* TABULAR SPREADSHEET VIEW */
          <div className="fm-mandi-table-wrap">
            <div style={{ overflowX: 'auto' }}>
              <table className="fm-mandi-table">
                <thead>
                  <tr>
                    <th>{isHi ? 'फसल व किस्म' : 'Commodity'}</th>
                    <th>{isHi ? 'मंडी एवं जिला' : 'Mandi & District'}</th>
                    <th>{isHi ? 'राज्य' : 'State'}</th>
                    <th style={{ textAlign: 'right' }}>{isHi ? 'न्यूनतम (₹)' : 'Min (₹)'}</th>
                    <th style={{ textAlign: 'right' }}>{isHi ? 'मॉडल भाव (₹)' : 'Modal Rate (₹)'}</th>
                    <th style={{ textAlign: 'right' }}>{isHi ? 'अधिकतम (₹)' : 'Max (₹)'}</th>
                    <th style={{ textAlign: 'center' }}>{isHi ? 'ट्रेंड' : 'Trend'}</th>
                    <th style={{ textAlign: 'center' }}>{isHi ? 'एक्शन' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((item, idx) => {
                    const isSelected = calcRecord && calcRecord.mandi === item.mandi && calcRecord.commodity === item.commodity;
                    return (
                      <tr 
                        key={idx}
                        style={{ backgroundColor: isSelected ? 'var(--bg-surface-sage)' : 'transparent' }}
                      >
                        <td>
                          <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{item.commodity}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.variety}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.mandi}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.district}</div>
                        </td>
                        <td>{item.state.split(' ')[0]}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.min_price}</td>
                        <td style={{ textAlign: 'right' }}>
                          <strong style={{ color: 'var(--primary-forest)', fontSize: '1.05rem', fontWeight: 900 }}>₹{item.modal_price}</strong>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>/क्विंटल</span>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{item.max_price}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`fm-mandi-trend-pill ${
                            item.trend === 'up' ? 'fm-mandi-trend-up' : item.trend === 'down' ? 'fm-mandi-trend-down' : 'fm-mandi-trend-stable'
                          }`}>
                            {item.change_pct}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => {
                              setCalcRecord(item);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className="fm-btn fm-btn-outline"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
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

      {/* 7. DETAIL MODAL POPUP */}
      {detailModalItem && (
        <div className="fm-modal-backdrop" onClick={() => setDetailModalItem(null)}>
          <div className="fm-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setDetailModalItem(null)}
              style={{ position: 'absolute', right: 16, top: 16, border: 'none', background: 'var(--bg-surface-sage)', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'var(--bg-surface-sage)', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Store size={22} />
              </div>
              <div>
                <span className="fm-mandi-badge-loc">
                  {detailModalItem.district} • {detailModalItem.state}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {detailModalItem.mandi}
                </h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-page)', borderRadius: 14, padding: 14, border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'फसल व किस्म:' : 'Crop & Variety:'}</span>
                <strong>{detailModalItem.commodity} ({detailModalItem.variety})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'नीलामी का समय:' : 'Auction Timings:'}</span>
                <strong>सुबह 08:00 AM से दोपहर 02:00 PM</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'मानक नमी (Moisture):' : 'Std Moisture:'}</span>
                <strong>&lt; 12% (FAQ Grade)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'आज का मॉडल भाव:' : 'Today\'s Modal:'}</span>
                <strong style={{ color: 'var(--primary-forest)', fontSize: '1.05rem' }}>₹{detailModalItem.modal_price} / क्विंटल</strong>
              </div>
            </div>

            <div style={{ padding: 10, backgroundColor: '#FFFBEB', borderRadius: 10, border: '1px solid #FDE68A', fontSize: '0.78rem', color: '#92400E', display: 'flex', gap: 8 }}>
              <Info size={16} color="#B45309" style={{ shrink: 0, marginTop: 2 }} />
              <span>
                {isHi 
                  ? 'किसान भाई अपनी फसल लाने से पहले सुखाकर और साफ करके लाएं, जिससे अधिकतम मॉडल भाव प्राप्त हो सके।' 
                  : 'Farmers are advised to bring properly cleaned and dried produce with moisture under 12% to secure maximum rates.'}
              </span>
            </div>

            <button
              onClick={() => {
                setCalcRecord(detailModalItem);
                setDetailModalItem(null);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="fm-btn fm-btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
            >
              {isHi ? 'इस भाव पर आमदनी कैलकुलेट करें' : 'Calculate Profit for this Mandi'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
