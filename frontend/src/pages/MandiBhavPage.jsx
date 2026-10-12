import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  Building2,
  Wheat
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MandiBhavPage() {
  const { lang } = useAuth();
  const isHi = lang === 'hi';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  
  // Filters
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Revenue Calculator Modal / State
  const [calcRecord, setCalcRecord] = useState(null);
  const [quintals, setQuintals] = useState(25);

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
        
        // Auto select first record for calculator if none selected
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

  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedCommodity('');
    setSearchKeyword('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMandiRates();
  };

  // Calculator computations
  const currentRate = calcRecord ? calcRecord.modal_price : 2460;
  const calculatedRevenue = (quintals || 0) * currentRate;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Store size={280} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium mb-3 backdrop-blur-sm">
            <Sparkles size={16} className="text-amber-300" />
            <span>{isHi ? 'लाइव कृषि मंडी भाव (Agmarknet Real Data)' : 'Live Agricultural Mandi Rates'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {isHi ? '📊 आज के ताज़ा मंडी भाव' : '📊 Today\'s Live Mandi Bhav'}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isHi 
              ? 'अपने राज्य, जिले और स्थानीय मंडी के अनुसार मुख्य फसलों के न्यूनतम, अधिकतम व मॉडल भाव देखें तथा अपनी उपज की सही आमदनी जानें।' 
              : 'Track realtime minimum, maximum, and modal agricultural prices across states, districts, and local APMC mandis.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-emerald-200">
            <span className="flex items-center gap-1 bg-emerald-900/40 px-3 py-1 rounded-lg border border-emerald-600/30">
              <Calendar size={14} />
              {isHi ? 'दिनांक: 12 अक्टूबर 2026' : 'Date: 12 Oct 2026'}
            </span>
            <span className="flex items-center gap-1 bg-emerald-900/40 px-3 py-1 rounded-lg border border-emerald-600/30">
              <IndianRupee size={14} />
              {isHi ? 'दर: ₹ प्रति क्विंटल' : 'Unit: ₹ per Quintal'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Filter size={18} className="text-emerald-600" />
            {isHi ? 'स्थान व फसल चयन (Location & Crop Filter)' : 'Select Location & Crop'}
          </h2>
          {(selectedState || selectedDistrict || selectedCommodity || searchKeyword) && (
            <button
              onClick={handleResetFilters}
              className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <RefreshCw size={14} />
              {isHi ? 'सभी फ़िल्टर हटाएं' : 'Reset All'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* State Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              {isHi ? '1. राज्य चुनें (Select State)' : '1. State'}
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict(''); // reset district on state change
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium transition"
            >
              <option value="">{isHi ? 'सभी राज्य (All States)' : 'All States'}</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              {isHi ? '2. जिला / शहर चुनें (Select District)' : '2. District / City'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium transition"
            >
              <option value="">{isHi ? 'सभी जिले (All Districts)' : 'All Districts'}</option>
              {districts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          {/* Commodity Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              {isHi ? '3. फसल चुनें (Select Crop)' : '3. Commodity / Crop'}
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium transition"
            >
              <option value="">{isHi ? 'सभी फसलें (All Crops)' : 'All Crops'}</option>
              {commodities.map((cmd) => (
                <option key={cmd} value={cmd}>{cmd}</option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              {isHi ? '4. मंडी / शहर खोजें (Search)' : '4. Search Mandi'}
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={isHi ? "जैसे: राजातालाब, इंदौर, गेहूँ..." : "e.g. Varanasi, Wheat..."}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            </form>
          </div>
        </div>
      </div>

      {/* 3. Interactive Kisan Amdani Calculator */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              <Calculator size={14} />
              <span>{isHi ? 'किसान आमदनी कैलकुलेटर' : 'Farmer Revenue Estimator'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isHi ? 'फसल की कुल संभावित बिक्री राशि जानें' : 'Estimate Total Produce Sale Value'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {isHi 
                ? `चयनित भाव: ${calcRecord ? `${calcRecord.commodity} (${calcRecord.mandi}) @ ₹${calcRecord.modal_price}/क्विंटल` : 'गेहूँ @ ₹2,460/क्विंटल'}`
                : `Selected Rate: ${calcRecord ? `${calcRecord.commodity} @ ₹${calcRecord.modal_price}/Qtl` : '₹2,460/Qtl'}`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                {isHi ? 'कुल पैदावार (क्विंटल में):' : 'Total Produce (Quintals):'}
              </label>
              <input 
                type="number"
                min="1"
                max="5000"
                value={quintals}
                onChange={(e) => setQuintals(Number(e.target.value) || 0)}
                className="w-32 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800 text-base focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <div className="text-xs font-medium text-slate-500">
                {isHi ? 'कुल अनुमानित आमदनी:' : 'Estimated Gross Revenue:'}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 flex items-center">
                <span>₹ {calculatedRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mandi Rates Data Cards / List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-800">
              {isHi ? 'उपलब्ध मंडियां एवं ताज़ा भाव' : 'Available Mandis & Live Rates'}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {records.length} {isHi ? 'परिणाम' : 'records'}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <RefreshCw size={36} className="animate-spin text-emerald-600 mx-auto mb-3" />
            <p className="text-slate-600 font-medium text-sm">
              {isHi ? 'मंडी के ताज़ा भाव लोड हो रहे हैं...' : 'Loading latest mandi rates...'}
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-6 text-center text-red-700">
            <p className="font-semibold">{error}</p>
            <button 
              onClick={fetchMandiRates} 
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
            >
              {isHi ? 'पुनः प्रयास करें' : 'Retry'}
            </button>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Store size={44} className="mx-auto text-slate-300 mb-3" />
            <h4 className="font-bold text-slate-700 text-base mb-1">
              {isHi ? 'कोई मंडी भाव नहीं मिला' : 'No Mandi Bhav Found'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {isHi 
                ? 'कृपया अपने चुने गए राज्य या जिले के फ़िल्टर बदलें या अन्य फसल खोजें।' 
                : 'Try clearing some filters or searching for another crop/district.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              {isHi ? 'सभी फ़िल्टर साफ़ करें' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {records.map((item, idx) => {
              const isSelected = calcRecord && calcRecord.mandi === item.mandi && calcRecord.commodity === item.commodity;
              return (
                <div 
                  key={`${item.mandi}-${item.commodity}-${idx}`}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-md ${
                    isSelected 
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    {/* Header: Mandi & Location */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 mb-1">
                          {item.district}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
                          {item.mandi}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-emerald-600" />
                          {item.state}
                        </p>
                      </div>

                      {/* Trend Badge */}
                      <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
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

                    {/* Commodity & Variety */}
                    <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/80 mb-4">
                      <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <Wheat size={14} className="text-emerald-600" />
                        <span>{item.commodity}</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        <span className="font-medium text-slate-500">{isHi ? 'किस्म: ' : 'Variety: '}</span>
                        {item.variety}
                      </div>
                    </div>

                    {/* Rates Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 text-center mb-4 border border-slate-100">
                      <div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {isHi ? 'न्यूनतम' : 'Min'}
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          ₹{item.min_price}
                        </div>
                      </div>

                      <div className="border-x border-slate-200">
                        <div className="text-[11px] text-emerald-800 font-bold">
                          {isHi ? 'मॉडल भाव' : 'Modal'}
                        </div>
                        <div className="text-base font-extrabold text-emerald-700">
                          ₹{item.modal_price}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {isHi ? 'अधिकतम' : 'Max'}
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          ₹{item.max_price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {isHi ? 'अपडेट: ' : 'Updated: '}{item.arrival_date}
                    </span>
                    <button
                      onClick={() => setCalcRecord(item)}
                      className={`font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition ${
                        isSelected 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Calculator size={13} />
                      <span>{isHi ? 'कैलकुलेट करें' : 'Calculate'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
