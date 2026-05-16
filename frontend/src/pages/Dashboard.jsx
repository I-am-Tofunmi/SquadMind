import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShieldAlert, Bell, Settings, LogOut, HelpCircle,
  Sparkles, Award, AlertTriangle, ArrowRight, Search, User, Banknote,
  FileText, Users, Calendar, Loader2, X, TrendingUp, CheckCircle2, 
  Info, Download, RefreshCw, Zap, Link, Shield, Package, Store,
  TrendingDown, Building2, Truck, RotateCcw, Star, ChevronRight
} from 'lucide-react';
import { getDashboard, getToken } from '../services/api';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Inventory data ──
const inventoryItems = [
  { id: 1, name: 'Indomie Noodles (Carton)', sku: 'INV-001', stock: 12, minStock: 20, unit: 'cartons', price: 4800, sold: 145, trend: 'fast', restockAmount: 50, vendor: 'Dufil Prima Foods', lastRestocked: '3 days ago' },
  { id: 2, name: 'Groundnut Oil (5L)', sku: 'INV-002', stock: 3, minStock: 15, unit: 'kegs', price: 12500, sold: 89, trend: 'fast', restockAmount: 30, vendor: 'Grand Cereals', lastRestocked: '1 week ago' },
  { id: 3, name: 'Peak Milk (48-pack)', sku: 'INV-003', stock: 28, minStock: 10, unit: 'packs', price: 18000, sold: 67, trend: 'normal', restockAmount: 20, vendor: 'FrieslandCampina', lastRestocked: '2 days ago' },
  { id: 4, name: 'Semovita (10kg)', sku: 'INV-004', stock: 5, minStock: 20, unit: 'bags', price: 8500, sold: 112, trend: 'fast', restockAmount: 40, vendor: 'Honeywell Flour', lastRestocked: '5 days ago' },
  { id: 5, name: 'Dangote Sugar (50kg)', sku: 'INV-005', stock: 22, minStock: 10, unit: 'bags', price: 47000, sold: 34, trend: 'slow', restockAmount: 10, vendor: 'Dangote Sugar', lastRestocked: '1 day ago' },
  { id: 6, name: 'Tomato Paste (Carton)', sku: 'INV-006', stock: 0, minStock: 15, unit: 'cartons', price: 9600, sold: 98, trend: 'fast', restockAmount: 25, vendor: 'Chi Limited', lastRestocked: '2 weeks ago' },
];

// ── Multi-bank transactions ──
const multiBankTransactions = [
  { id: 'SQ-2026-44821', bank: 'GTBank', type: 'Credit', amount: 85000, from: 'Chinedu Stores', time: '10:24 AM', status: 'success', channel: 'Transfer', flagged: false },
  { id: 'SQ-2026-44820', bank: 'Access Bank', type: 'Debit', amount: 47500, from: 'Honeywell Flour', time: '09:15 AM', status: 'success', channel: 'POS', flagged: false },
  { id: 'SQ-2026-44819', bank: 'OPay', type: 'Credit', amount: 12500, from: 'Unknown Sender', time: '08:44 AM', status: 'flagged', channel: 'Transfer', flagged: true },
  { id: 'SQ-2026-44818', bank: 'Moniepoint', type: 'Credit', amount: 34000, from: 'Ngozi Enterprises', time: '08:01 AM', status: 'success', channel: 'POS', flagged: false },
  { id: 'SQ-2026-44817', bank: 'GTBank', type: 'Debit', amount: 120000, from: 'Dufil Prima Foods', time: 'Yesterday', status: 'success', channel: 'Transfer', flagged: false },
  { id: 'SQ-2026-44816', bank: 'Squad VA', type: 'Credit', amount: 28500, from: 'Adebayo Stores', time: 'Yesterday', status: 'success', channel: 'Virtual Account', flagged: false },
];

// ── Vendor data ──
const vendors = [
  { id: 1, name: 'Dufil Prima Foods', category: 'Noodles & Pasta', rating: 4.8, deliveryDays: 2, minOrder: '₦50,000', status: 'connected', badge: '⭐ Top Supplier', discount: '5% off orders > ₦200k', items: 12 },
  { id: 2, name: 'Honeywell Flour Mills', category: 'Flour & Semovita', rating: 4.6, deliveryDays: 3, minOrder: '₦80,000', status: 'connected', badge: '✅ Verified', discount: 'Net 30 payment terms', items: 8 },
  { id: 3, name: 'Grand Cereals', category: 'Oils & Grains', rating: 4.5, deliveryDays: 2, minOrder: '₦60,000', status: 'recommended', badge: '🔥 New', discount: '3% first order discount', items: 15 },
  { id: 4, name: 'Chi Limited', category: 'Tomato & Condiments', rating: 4.7, deliveryDays: 1, minOrder: '₦40,000', status: 'recommended', badge: '⚡ Fast Delivery', discount: 'Free delivery on ₦150k+', items: 20 },
];

function Dashboard() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [chartPeriod, setChartPeriod] = useState(30);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [showHourly, setShowHourly] = useState(false);
  const [lastSynced, setLastSynced] = useState('2 mins ago');
  const [syncing, setSyncing] = useState(false);
  const [restockingId, setRestockingId] = useState(null);
  const [restockedIds, setRestockedIds] = useState(new Set());
  const [connectingVendor, setConnectingVendor] = useState(null);
  const [connectedVendors, setConnectedVendors] = useState(new Set(['Dufil Prima Foods', 'Honeywell Flour Mills']));
  const [selectedBank, setSelectedBank] = useState('All');
  const [trustScoreImpact, setTrustScoreImpact] = useState(null);

  const navigate = useNavigate();
  const onLogout = () => { localStorage.removeItem('token'); navigate('/login'); };
  const onNavigate = (path) => navigate(`/${path}`);

  useEffect(() => {
    const token = getToken();
    if (!token) { navigate('/login'); return; }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      const data = response?.data || response;
      setDashboardData(data && typeof data === 'object' ? data : {});
    } catch (err) {
      setError('Failed to load — showing demo data');
      setDashboardData({});
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1500));
    setSyncing(false);
    setLastSynced('just now');
    await fetchDashboard();
  };

  // ── THE KILLER MOMENT: restock triggers TrustScore update ──
  const handleRestock = async (item) => {
    setRestockingId(item.id);
    await new Promise(r => setTimeout(r, 2000));
    setRestockingId(null);
    setRestockedIds(prev => new Set([...prev, item.id]));
    // Show TrustScore impact notification
    setTrustScoreImpact({ item: item.name, points: '+2' });
    setTimeout(() => setTrustScoreImpact(null), 4000);
  };

  const handleConnectVendor = async (vendor) => {
    setConnectingVendor(vendor.name);
    await new Promise(r => setTimeout(r, 1800));
    setConnectingVendor(null);
    setConnectedVendors(prev => new Set([...prev, vendor.name]));
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₦0.00';
    return `₦${Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
  };

  const safeString = (val, fallback) => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    return fallback;
  };

  const exportCSV = () => {
    const data = revenueTrend.length > 0 ? revenueTrend : [
      { date: 'May 13', revenue: 140000, transactions: 40 },
      { date: 'May 12', revenue: 143000, transactions: 41 },
    ];
    const rows = [['Date', 'Revenue (NGN)', 'Transactions'], ...data.map(p => [p.date, p.revenue, p.transactions])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `squadmind-revenue-${chartPeriod}d.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const metrics = dashboardData?.metrics || [];
  const totalRevenue = Number(metrics[0]?.raw_value || 342500);
  const totalTransactions = Number(metrics[1]?.raw_value || 84);
  const avgTransactionValue = Number(metrics[2]?.raw_value || 3368);
  const uniqueCustomers = Number(metrics[3]?.raw_value || 342);
  const revenueChange = Number(metrics[0]?.change_percent || 12);
  const bestSalesDay = safeString(dashboardData?.best_sales_day, 'Friday');
  const healthScore = Number(dashboardData?.health_score?.score || 78);
  const healthLabel = safeString(dashboardData?.health_score?.label, 'Stable');
  const healthBreakdown = dashboardData?.health_score?.breakdown || { revenue_growth: 82, fraud_safety: 91, transaction_volume: 65 };
  const healthAiSummary = safeString(dashboardData?.health_score?.ai_summary, 'Your business scores 78/100 — Good financial health.');
  const businessName = localStorage.getItem('businessName') || safeString(dashboardData?.business_name, 'Lekan Stores');
  const aiInsightEnglish = safeString(dashboardData?.ai_insight, 'Your business is performing well with consistent revenue growth.');
  const aiInsightPidgin = safeString(dashboardData?.ai_insight_pidgin, 'Your business dey do well! Revenue don go up 🚀');
  const fraudFlagged = Number(dashboardData?.fraud_summary?.flagged_count || 0);
  const fraudAmount = Number(dashboardData?.fraud_summary?.flagged_amount || 12500);
  const returningRate = Number(dashboardData?.returning_customer_rate || 67.4);
  const revenueTrend = dashboardData?.revenue_trend || [];

  const topCustomers = Array.isArray(dashboardData?.top_customers)
    ? dashboardData.top_customers.map(c => ({
        id: safeString(c.customer_name, 'CU').substring(0, 2).toUpperCase(),
        name: safeString(c.customer_name, 'Customer'),
        amount: Number(c.total_spend || 0),
        transactions: Number(c.transaction_count || 0),
      }))
    : [
        { id: 'AS', name: 'Adebayo Stores', amount: 450000, transactions: 23 },
        { id: 'NE', name: 'Ngozi Enterprises', amount: 320000, transactions: 18 },
        { id: 'ET', name: 'Emeka Trading Co', amount: 280000, transactions: 15 },
        { id: 'CS', name: 'Chinedu Stores', amount: 220000, transactions: 12 },
        { id: 'BL', name: 'Bright Logistics', amount: 180000, transactions: 9 },
      ];

  const lowStockItems = inventoryItems.filter(i => i.stock <= i.minStock);
  const outOfStockItems = inventoryItems.filter(i => i.stock === 0);

  const filteredTransactions = selectedBank === 'All'
    ? multiBankTransactions
    : multiBankTransactions.filter(t => t.bank === selectedBank);

  const getChartData = () => {
    if (revenueTrend.length > 0) return revenueTrend.slice(-chartPeriod);
    if (chartPeriod === 7) {
      return [
        { date: 'Mon', revenue: 180000, transactions: 55 },
        { date: 'Tue', revenue: 120000, transactions: 38 },
        { date: 'Wed', revenue: 210000, transactions: 64 },
        { date: 'Thu', revenue: 95000, transactions: 29 },
        { date: 'Fri', revenue: 310000, transactions: 94 },
        { date: 'Sat', revenue: 250000, transactions: 76 },
        { date: 'Sun', revenue: 140000, transactions: 43 },
      ];
    }
    if (chartPeriod === 30) {
      return Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, revenue: 80000 + (i * 8000), transactions: 40 + i }));
    }
    return Array.from({ length: 90 }, (_, i) => ({
      date: `Day ${i + 1}`,
      revenue: i % 6 === 0 ? 350000 : i % 6 === 1 ? 120000 : i % 6 === 2 ? 300000 : i % 6 === 3 ? 80000 : i % 6 === 4 ? 280000 : 100000,
      transactions: 30 + Math.floor(i * 0.5),
    }));
  };

  const renderChart = () => {
    const filtered = getChartData();
    const min = 0; const range = 400000;
    const coords = filtered.map((p, i) => ({
      x: (i / Math.max(filtered.length - 1, 1)) * 1000,
      y: 280 - ((p.revenue - min) / range) * 240,
      ...p,
    }));
    const points = coords.map(c => `${c.x},${c.y}`).join(' ');
    const areaPoints = `0,280 ${points} 1000,280`;
    const labels = chartPeriod === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : chartPeriod === 30 ? ['W1', 'W2', 'W3', 'W4'] : ['Jan', 'Feb', 'Mar'];

    return (
      <div className="relative h-[240px] w-full">
        {hoveredPoint && (
          <div className="absolute bg-[#001f3f] text-white text-xs font-bold px-3 py-2 rounded-xl pointer-events-none shadow-xl z-10 whitespace-nowrap"
            style={{ left: `${(hoveredPoint.x / 1000) * 100}%`, top: '8px', transform: 'translateX(-50%)' }}>
            <p className="text-slate-300 text-[10px]">{hoveredPoint.date}</p>
            <p className="text-[#E8762E]">{formatCurrency(hoveredPoint.revenue)}</p>
            <p className="text-slate-300">{hoveredPoint.transactions} txns</p>
          </div>
        )}
        <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />
          <polyline points={points} fill="none" stroke="#E8762E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points={areaPoints} fill="url(#grad2)" opacity="0.15" />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8762E" />
              <stop offset="100%" stopColor="#E8762E" stopOpacity="0" />
            </linearGradient>
          </defs>
          {coords.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="18" fill="transparent" style={{ cursor: 'crosshair' }}
              onMouseEnter={() => setHoveredPoint(c)} onMouseLeave={() => setHoveredPoint(null)} />
          ))}
          {hoveredPoint && <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="5" fill="#E8762E" stroke="white" strokeWidth="2" />}
        </svg>
        <div className="absolute bottom-0 w-full flex justify-between px-2">
          {labels.map(d => <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#E8762E] animate-spin" />
          <p className="text-slate-500 font-medium">Syncing with Squad API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden">

      {/* ── MODALS ── */}
      <Modal isOpen={showHourly} onClose={() => setShowHourly(false)} title="Hourly Sales Breakdown">
        <div className="space-y-4">
          <p className="text-xs text-slate-400 font-medium">Average transactions by hour — sourced from Squad payment data</p>
          <div className="flex items-end gap-1 h-32 pt-4">
            {[2,1,1,0,0,1,3,8,12,15,18,14,10,13,16,19,22,18,14,10,7,5,4,3].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full rounded-t-sm ${val >= 18 ? 'bg-[#E8762E]' : val >= 10 ? 'bg-[#E8762E]/60' : 'bg-slate-200'}`}
                  style={{ height: `${(val / 22) * 100}%`, minHeight: val > 0 ? '4px' : '0' }}></div>
                {i % 6 === 0 && <span className="text-[8px] text-slate-400">{i}h</span>}
              </div>
            ))}
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-xs font-bold text-[#E8762E] mb-1">⚡ Peak hours: 4PM – 6PM</p>
            <p className="text-xs text-slate-500 leading-relaxed">Schedule promotions between 3PM–4PM to maximize conversion.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{ l: 'Peak', v: '4PM–6PM' }, { l: 'Avg/hr', v: `${Math.round(totalTransactions / 24)} txns` }, { l: 'Quiet', v: '12AM–5AM' }].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{item.l}</p>
                <p className="text-sm font-bold text-slate-900">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'revenue'} onClose={() => setActiveModal(null)} title="Revenue Breakdown">
        <div className="space-y-6">
          <div className="p-4 bg-[#001f3f] rounded-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8762E]/20 flex items-center justify-center">
              <Link className="w-4 h-4 text-[#E8762E]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data Source</p>
              <p className="text-xs font-bold text-white">Squad Payment API — {(1247).toLocaleString()} transactions analyzed</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Revenue</p><p className="text-xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p></div>
            <div className="bg-blue-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Growth</p><p className="text-xl font-bold text-slate-900">+{revenueChange}%</p></div>
            <div className="bg-purple-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Avg Transaction</p><p className="text-xl font-bold text-slate-900">{formatCurrency(avgTransactionValue)}</p></div>
            <div className="bg-orange-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-[#E8762E] uppercase tracking-wider mb-1">Best Day</p><p className="text-xl font-bold text-slate-900">{bestSalesDay}</p></div>
          </div>
          <button onClick={exportCSV} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Download className="w-4 h-4" /> Export as CSV
          </button>
          <button onClick={() => { setActiveModal(null); onNavigate('cashflow'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer">
            View Full Cash Flow Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'transactions'} onClose={() => setActiveModal(null)} title="Transaction Details">
        <div className="space-y-6">
          <div className="p-4 bg-[#001f3f] rounded-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8762E]/20 flex items-center justify-center"><Zap className="w-4 h-4 text-[#E8762E]" /></div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Squad API</p><p className="text-xs font-bold text-white">Real-time transaction monitoring active</p></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-4 text-center"><p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Total</p><p className="text-2xl font-bold text-slate-900">{totalTransactions}</p></div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center"><p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Success</p><p className="text-2xl font-bold text-slate-900">{Math.round(totalTransactions * 0.9)}</p></div>
            <div className="bg-red-50 rounded-2xl p-4 text-center"><p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Failed</p><p className="text-2xl font-bold text-slate-900">{Math.round(totalTransactions * 0.1)}</p></div>
          </div>
          <button onClick={() => { setActiveModal(null); onNavigate('frauddetection'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer">
            View Fraud Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'health'} onClose={() => setActiveModal(null)} title="Health Score Breakdown">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-orange-100 flex items-center justify-center relative">
              <div className="absolute inset-0 border-8 border-[#E8762E] border-b-transparent border-l-transparent rounded-full rotate-45"></div>
              <div className="text-center z-10"><span className="text-3xl font-bold text-slate-900">{healthScore}</span><span className="text-sm text-slate-400">/100</span></div>
            </div>
          </div>
          <p className="text-sm text-slate-500 text-center font-medium">{healthAiSummary}</p>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">Score Components — Squad Data Signals</h4>
            {[
              { label: 'Revenue Growth', score: healthBreakdown.revenue_growth, color: 'bg-emerald-500', icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, source: 'Squad transaction history' },
              { label: 'Fraud Safety', score: healthBreakdown.fraud_safety, color: 'bg-blue-500', icon: <ShieldAlert className="w-4 h-4 text-blue-500" />, source: 'Squad fraud detection engine' },
              { label: 'Transaction Volume', score: healthBreakdown.transaction_volume, color: 'bg-[#E8762E]', icon: <FileText className="w-4 h-4 text-[#E8762E]" />, source: 'Squad payment API' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">{item.icon}<span className="text-sm font-medium text-slate-700">{item.label}</span></div>
                  <span className="text-sm font-bold text-slate-900">{item.score}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400">Source: {item.source}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { setActiveModal(null); onNavigate('trustscore'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer">
            View Full TrustScore Report <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'customers'} onClose={() => setActiveModal(null)} title="All Revenue Drivers">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 rounded-2xl p-3 text-center"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Customers</p><p className="text-xl font-bold text-slate-900">{uniqueCustomers}</p></div>
            <div className="bg-slate-50 rounded-2xl p-3 text-center"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Returning Rate</p><p className="text-xl font-bold text-slate-900">{returningRate}%</p></div>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#001f3f] flex items-center justify-center text-white font-bold text-xs">{i + 1}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                    <p className="text-[10px] text-slate-400">{customer.transactions} transactions via Squad</p>
                    <p className="text-[10px] text-purple-500 font-bold">CLV: {formatCurrency(customer.amount * 1.5)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(customer.amount)}</p>
                  <div className="flex items-center gap-1 justify-end mt-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /><span className="text-[10px] text-emerald-600 font-bold">Active</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Inventory Detail Modal */}
      <Modal isOpen={activeModal === 'inventory'} onClose={() => setActiveModal(null)} title="Inventory Intelligence">
        <div className="space-y-5">
          <div className="p-4 bg-[#001f3f] rounded-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8762E]/20 flex items-center justify-center"><Package className="w-4 h-4 text-[#E8762E]" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI-Powered Inventory Engine</p>
              <p className="text-xs font-bold text-white">Restock recommendations based on sales velocity + Squad payment history</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 text-center"><p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Total Items</p><p className="text-xl font-bold text-slate-900">{inventoryItems.length}</p></div>
            <div className="bg-red-50 rounded-xl p-3 text-center"><p className="text-[10px] text-red-500 uppercase font-bold mb-1">Low Stock</p><p className="text-xl font-bold text-red-600">{lowStockItems.length}</p></div>
            <div className="bg-orange-50 rounded-xl p-3 text-center"><p className="text-[10px] text-[#E8762E] uppercase font-bold mb-1">Out of Stock</p><p className="text-xl font-bold text-[#E8762E]">{outOfStockItems.length}</p></div>
          </div>
          <div className="space-y-3">
            {inventoryItems.map((item) => {
              const isLow = item.stock <= item.minStock;
              const isOut = item.stock === 0;
              const isRestocked = restockedIds.has(item.id);
              const pct = Math.min((item.stock / item.minStock) * 100, 100);
              return (
                <div key={item.id} className={`p-4 rounded-2xl border ${isOut ? 'bg-red-50 border-red-100' : isLow ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.sku} · {item.vendor}</p>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${isOut ? 'bg-red-500 text-white' : isLow ? 'bg-orange-500 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                      {isOut ? 'OUT OF STOCK' : isLow ? 'LOW STOCK' : 'IN STOCK'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">{item.stock} / {item.minStock} {item.unit}</span>
                    <span className="text-xs font-bold text-slate-700">{item.sold} sold this month</span>
                  </div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mb-3">
                    <div className={`h-full rounded-full ${isOut ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }}></div>
                  </div>
                  {(isLow || isOut) && !isRestocked && (
                    <button onClick={() => handleRestock(item)} disabled={restockingId === item.id}
                      className="w-full bg-[#001f3f] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer disabled:opacity-60">
                      {restockingId === item.id ? <><Loader2 className="w-3 h-3 animate-spin" />Sending Restock Order...</> : <><RotateCcw className="w-3 h-3" />Restock {item.restockAmount} {item.unit}</>}
                    </button>
                  )}
                  {isRestocked && <div className="w-full bg-emerald-50 text-emerald-600 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 border border-emerald-100"><CheckCircle2 className="w-3 h-3" />Restock Order Sent to {item.vendor}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Vendor Modal */}
      <Modal isOpen={activeModal === 'vendors'} onClose={() => setActiveModal(null)} title="Vendor Marketplace">
        <div className="space-y-5">
          <div className="p-4 bg-[#001f3f] rounded-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8762E]/20 flex items-center justify-center"><Truck className="w-4 h-4 text-[#E8762E]" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI-Matched Vendors</p>
              <p className="text-xs font-bold text-white">Suppliers recommended based on your inventory patterns and payment history</p>
            </div>
          </div>
          {vendors.map((vendor) => {
            const isConnected = connectedVendors.has(vendor.name);
            const isConnecting = connectingVendor === vendor.name;
            return (
              <div key={vendor.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-black text-slate-900">{vendor.name}</p>
                      <span className="text-[9px] font-bold text-slate-400">{vendor.badge}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{vendor.category} · {vendor.items} products</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{vendor.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[{ l: 'Delivery', v: `${vendor.deliveryDays} days` }, { l: 'Min Order', v: vendor.minOrder }, { l: 'Benefit', v: vendor.discount }].map((item, j) => (
                    <div key={j} className="bg-white rounded-xl p-2 text-center">
                      <p className="text-[9px] text-slate-400 uppercase">{item.l}</p>
                      <p className="text-[10px] font-black text-slate-900 leading-tight">{item.v}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => !isConnected && handleConnectVendor(vendor)} disabled={isConnecting || isConnected}
                  className={`w-full font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${isConnected ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-[#001f3f] text-white hover:bg-[#002b55]'}`}>
                  {isConnecting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Connecting...</> :
                   isConnected ? <><CheckCircle2 className="w-3.5 h-3.5" />Connected</> :
                   <><Zap className="w-3.5 h-3.5" />Connect Vendor</>}
                </button>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* ── SIDEBAR ── */}
      <aside className="w-[260px] bg-[#001f3f] flex flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex">
        <div>
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-0">SquadMind AI</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">SME OPERATING SYSTEM</p>
          </div>
          <nav className="px-4 space-y-1">
            {[
              { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: 'dashboard', active: true },
              { label: 'Cash Flow', icon: <Banknote className="w-5 h-5" />, path: 'cashflow' },
              { label: 'Fraud Detection', icon: <ShieldAlert className="w-5 h-5" />, path: 'frauddetection' },
              { label: 'Alerts', icon: <Bell className="w-5 h-5" />, path: 'alerts' },
              { label: 'TrustScore', icon: <Award className="w-5 h-5" />, path: 'trustscore' },
              { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },
            ].map((item) => (
              <button key={item.path} onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${item.active ? 'bg-[#E8762E] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {item.icon}
                <span className="font-medium text-[15px]">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT TIER</p>
              <p className="text-base font-bold text-white mb-4">Pro Business</p>
              <button className="w-full bg-[#E8762E] hover:bg-[#E8762E]/90 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#E8762E]/20 cursor-pointer">Upgrade Plan</button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E8762E]/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" /><span className="text-sm font-medium">Help Center</span>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" /><span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8762E] flex items-center justify-center text-white font-bold overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(businessName)}&background=E8762E&color=ffffff`} alt={businessName} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{businessName}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search transactions, inventory, vendors..." className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-[#f1f5f9] border-none rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-[#E8762E]/20 outline-none" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#E8762E] rounded-full">
              <div className="w-2 h-2 bg-[#E8762E] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-wider uppercase">AI LIVE MONITORING</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">{businessName}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Merchant Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          {error && <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600 text-sm font-medium">{error}</div>}

          {/* ── TRUSTSCORE IMPACT TOAST (THE KILLER MOMENT) ── */}
          {trustScoreImpact && (
            <div className="fixed top-6 right-6 z-50 bg-[#001f3f] text-white rounded-2xl shadow-2xl p-5 flex items-start gap-4 max-w-sm animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">TrustScore Updated</p>
                <p className="text-sm font-bold text-white">Restock of {trustScoreImpact.item} detected</p>
                <p className="text-xs text-slate-400 mt-1">Inventory consistency score improved → TrustScore <span className="text-emerald-400 font-black">{trustScoreImpact.points} points</span></p>
                <p className="text-[10px] text-[#E8762E] font-bold mt-2">Lending readiness: IMPROVING ↑</p>
              </div>
            </div>
          )}

          {/* ── Squad API Connection Banner ── */}
          <div className="bg-[#001f3f] rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Squad API — Connected</span>
                </div>
                <p className="text-sm font-bold text-white">{(1247).toLocaleString()} transactions synced · Last updated {lastSynced}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>Payments Active</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>Fraud Engine Active</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>TrustScore Active</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>Inventory AI Active</span>
              </div>
              <button onClick={handleSync} disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60">
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Business Overview</h2>
              <p className="text-slate-500 text-sm">SME Operating System — Inventory · Transactions · Vendors · Lending</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl border border-orange-100">
              <Zap className="w-4 h-4 text-[#E8762E]" />
              <span className="text-xs font-bold text-[#E8762E]">Squad-Compatible Intelligence Engine</span>
            </div>
          </div>

          {/* ── KPI CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div onClick={() => setActiveModal('revenue')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#E8762E]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors"><Banknote className="w-6 h-6" /></div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">+{revenueChange}%</div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">TOTAL REVENUE</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{formatCurrency(totalRevenue)}</h3>
              <p className="text-xs text-slate-400 mt-1">vs last month</p>
              <div className="mt-3 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Via Squad API</span></div>
              <p className="text-[10px] text-[#E8762E] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to see breakdown →</p>
            </div>

            <div onClick={() => setActiveModal('transactions')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#E8762E]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors"><FileText className="w-6 h-6" /></div>
                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Daily Goal</div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">TRANSACTIONS</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">{totalTransactions}</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-[#E8762E] h-full w-[72%] rounded-full"></div></div>
              <p className="text-[10px] text-slate-400 font-medium mt-1.5">72% of target reached</p>
              <div className="mt-2 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Squad Monitored</span></div>
              <p className="text-[10px] text-[#E8762E] font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to see details →</p>
            </div>

            <div onClick={() => setShowHourly(true)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#E8762E]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors"><Calendar className="w-6 h-6" /></div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">BEST SALES DAY</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{bestSalesDay}</h3>
              <p className="text-xs text-slate-400 mt-1">₦47,000 avg. volume</p>
              <div className="mt-2 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Squad Transaction Data</span></div>
              <p className="text-[10px] text-[#E8762E] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for hourly breakdown →</p>
            </div>

            <div onClick={() => setActiveModal('health')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#E8762E]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div><p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">HEALTH SCORE</p><h3 className="text-3xl font-bold text-slate-900">{healthScore}/100</h3><p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-wide">Status: {healthLabel}</p></div>
                <div className="w-16 h-16 rounded-xl border-4 border-orange-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-[#E8762E] border-t-transparent border-r-transparent rounded-xl rotate-45"></div>
                  <span className="text-sm font-bold text-[#E8762E]">{healthScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">AI-Generated Signal</span></div>
              <p className="text-[10px] text-[#E8762E] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to see breakdown →</p>
            </div>
          </div>

          {/* ── CHARTS ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
                  <div className="flex items-center gap-1 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><p className="text-xs text-slate-400">Sourced from Squad Payment API · Hover to inspect</p></div>
                </div>
                <div className="flex gap-2">
                  {[7, 30, 90].map(d => (
                    <button key={d} onClick={() => setChartPeriod(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${chartPeriod === d ? 'bg-[#001f3f] text-white' : 'bg-[#f8fafc] border border-slate-100 text-slate-500 hover:text-slate-900'}`}>
                      {d}D
                    </button>
                  ))}
                  <button onClick={exportCSV} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center gap-1 cursor-pointer">
                    <Download className="w-3 h-3" /> CSV
                  </button>
                </div>
              </div>
              {renderChart()}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Busiest Periods</h3>
              <div className="flex items-center gap-1 mb-6"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><p className="text-xs text-slate-400">Weekly — Squad transaction volume</p></div>
              <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-6">
                {[{ d: 'M', h: '40%' }, { d: 'T', h: '60%' }, { d: 'W', h: '35%' }, { d: 'T', h: '50%' }, { d: 'F', h: '100%', active: true }, { d: 'S', h: '65%' }, { d: 'S', h: '45%' }].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 w-full">
                    <div className="w-full bg-[#f1f5f9] rounded-md relative overflow-hidden" style={{ height: '140px' }}>
                      <div className={`absolute bottom-0 left-0 w-full rounded-md ${item.active ? 'bg-[#E8762E]' : 'bg-[#e2e8f0]'}`} style={{ height: item.h }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${item.active ? 'text-[#E8762E]' : 'text-slate-400'}`}>{item.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════ */}
          {/* ── NEW: INVENTORY INTELLIGENCE SECTION ── */}
          {/* ══════════════════════════════════════════════════ */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#E8762E]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Inventory Intelligence</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <p className="text-xs text-slate-400">AI restock recommendations based on sales velocity + Squad payment patterns</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {outOfStockItems.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-xl border border-red-100">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-red-600">{outOfStockItems.length} out of stock</span>
                  </div>
                )}
                {lowStockItems.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-xl border border-orange-100">
                    <AlertTriangle className="w-4 h-4 text-[#E8762E]" />
                    <span className="text-xs font-bold text-[#E8762E]">{lowStockItems.length} low stock alerts</span>
                  </div>
                )}
                <button onClick={() => setActiveModal('inventory')} className="text-sm font-bold text-[#E8762E] hover:underline cursor-pointer">Manage All</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-[#f8fafc]/50 border-b border-slate-50">
                    {['PRODUCT', 'STOCK LEVEL', 'SALES THIS MONTH', 'AI STATUS', 'ACTION'].map(h => (
                      <th key={h} className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {inventoryItems.map((item) => {
                    const isLow = item.stock <= item.minStock;
                    const isOut = item.stock === 0;
                    const isRestocked = restockedIds.has(item.id);
                    const pct = Math.min((item.stock / item.minStock) * 100, 100);
                    return (
                      <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="p-5">
                          <p className="text-sm font-black text-[#001f3f]">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.sku} · {item.vendor}</p>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${isOut ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }}></div>
                            </div>
                            <span className={`text-xs font-bold ${isOut ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-emerald-600'}`}>
                              {item.stock} / {item.minStock} {item.unit}
                            </span>
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            {item.trend === 'fast' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : item.trend === 'slow' ? <TrendingDown className="w-4 h-4 text-slate-400" /> : <span className="w-4 h-4 text-slate-400">→</span>}
                            <span className="text-sm font-bold text-slate-900">{item.sold} units</span>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            isOut ? 'bg-red-100 text-red-600' :
                            isLow ? 'bg-orange-100 text-orange-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            {isOut ? '⚠ Restock Now' : isLow ? '↑ Running Low' : '✓ Sufficient'}
                          </span>
                        </td>
                        <td className="p-5">
                          {isRestocked ? (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Order Sent</span>
                          ) : (isLow || isOut) ? (
                            <button onClick={() => handleRestock(item)} disabled={restockingId === item.id}
                              className="px-4 py-1.5 bg-[#001f3f] text-white rounded-lg text-[10px] font-black hover:bg-[#002b55] transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5">
                              {restockingId === item.id ? <><Loader2 className="w-3 h-3 animate-spin" />Ordering...</> : <><RotateCcw className="w-3 h-3" />Restock {item.restockAmount}</>}
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-300 font-medium">No action needed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Inventory footer with TrustScore link */}
            <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-100/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8762E]" />
                <p className="text-xs text-slate-600">
                  <span className="font-bold text-[#E8762E]">AI Insight:</span> Consistent restocking behavior improves your Inventory Reliability score → directly boosts TrustScore → increases lending eligibility
                </p>
              </div>
              <button onClick={() => onNavigate('trustscore')} className="text-xs font-bold text-[#E8762E] hover:underline cursor-pointer whitespace-nowrap">View TrustScore →</button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════ */}
          {/* ── NEW: MULTI-BANK TRANSACTIONS ── */}
          {/* ══════════════════════════════════════════════════ */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#E8762E]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Multi-Bank Transaction View</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <p className="text-xs text-slate-400">All bank accounts in one view — powered by Squad-compatible financial infrastructure</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['All', 'GTBank', 'Access Bank', 'OPay', 'Moniepoint', 'Squad VA'].map(bank => (
                  <button key={bank} onClick={() => setSelectedBank(bank)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${selectedBank === bank ? 'bg-[#001f3f] text-white' : 'bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-900'}`}>
                    {bank}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank summary cards */}
            <div className="p-6 border-b border-slate-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { bank: 'GTBank', balance: '₦842,500', txns: 34, color: 'bg-orange-500', abbr: 'GT' },
                  { bank: 'Access Bank', balance: '₦234,000', txns: 18, color: 'bg-red-500', abbr: 'AB' },
                  { bank: 'OPay', balance: '₦87,200', txns: 12, color: 'bg-emerald-500', abbr: 'OP' },
                  { bank: 'Moniepoint', balance: '₦156,800', txns: 20, color: 'bg-blue-500', abbr: 'MP' },
                ].map((b, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${b.color} flex items-center justify-center text-white text-[10px] font-black`}>{b.abbr}</div>
                      <p className="text-xs font-bold text-slate-700">{b.bank}</p>
                    </div>
                    <p className="text-base font-black text-slate-900">{b.balance}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{b.txns} transactions today</p>
                    <div className="flex items-center gap-1 mt-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><span className="text-[9px] text-emerald-600 font-bold">Active</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[650px]">
                <thead>
                  <tr className="bg-[#f8fafc]/50 border-b border-slate-50">
                    {['REF ID', 'BANK', 'TYPE', 'FROM/TO', 'AMOUNT', 'CHANNEL', 'STATUS'].map(h => (
                      <th key={h} className="p-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="p-5 text-[10px] font-bold text-slate-400 font-mono">{tx.id}</td>
                      <td className="p-5">
                        <span className="text-xs font-black text-[#001f3f] px-2 py-1 bg-slate-100 rounded-lg">{tx.bank}</span>
                      </td>
                      <td className="p-5">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${tx.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>{tx.type}</span>
                      </td>
                      <td className="p-5 text-sm font-bold text-slate-700">{tx.from}</td>
                      <td className={`p-5 text-sm font-black ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {tx.type === 'Credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                      </td>
                      <td className="p-5 text-xs text-slate-500">{tx.channel}</td>
                      <td className="p-5">
                        {tx.flagged ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                            <AlertTriangle className="w-3 h-3" />Flagged
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="w-3 h-3" />Success
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] text-slate-400 font-medium">All transactions aggregated via Squad-compatible financial data infrastructure</p>
              <button onClick={() => onNavigate('frauddetection')} className="text-xs font-bold text-[#E8762E] hover:underline cursor-pointer">View Fraud Analysis →</button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════ */}
          {/* ── NEW: VENDOR MARKETPLACE ── */}
          {/* ══════════════════════════════════════════════════ */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-[#E8762E]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Vendor Marketplace</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <p className="text-xs text-slate-400">AI-matched suppliers based on your inventory patterns and purchase history</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-600">{connectedVendors.size} vendors connected</span>
                </div>
                <button onClick={() => setActiveModal('vendors')} className="text-sm font-bold text-[#E8762E] hover:underline cursor-pointer">Browse All</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-50">
              {vendors.map((vendor) => {
                const isConnected = connectedVendors.has(vendor.name);
                const isConnecting = connectingVendor === vendor.name;
                return (
                  <div key={vendor.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#001f3f]/5 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-[#001f3f]" />
                      </div>
                      {isConnected && <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></div>}
                    </div>
                    <p className="text-sm font-black text-slate-900 mb-0.5">{vendor.name}</p>
                    <p className="text-[10px] text-slate-400 mb-1">{vendor.category}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-slate-600">{vendor.rating}</span>
                      <span className="text-[10px] text-slate-400">· {vendor.deliveryDays}d delivery</span>
                    </div>
                    <div className="p-2 bg-orange-50 rounded-xl mb-3">
                      <p className="text-[9px] font-bold text-[#E8762E]">{vendor.discount}</p>
                    </div>
                    <button
                      onClick={() => !isConnected && handleConnectVendor(vendor)}
                      disabled={isConnecting || isConnected}
                      className={`w-full py-2 rounded-xl text-[10px] font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${isConnected ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-[#001f3f] text-white hover:bg-[#002b55]'}`}>
                      {isConnecting ? <><Loader2 className="w-3 h-3 animate-spin" />Connecting...</> :
                       isConnected ? <><CheckCircle2 className="w-3 h-3" />Connected</> :
                       <><Zap className="w-3 h-3" />Connect</>}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-100/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8762E]" />
                <p className="text-xs text-slate-600"><span className="font-bold text-[#E8762E]">AI Insight:</span> Connecting verified vendors improves your Supply Chain Reliability score → strengthens TrustScore → better loan terms</p>
              </div>
              <button onClick={() => onNavigate('trustscore')} className="text-xs font-bold text-[#E8762E] hover:underline cursor-pointer whitespace-nowrap">View Impact →</button>
            </div>
          </div>

          {/* ── TOP CUSTOMERS + AI INTELLIGENCE ── */}
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Top Revenue Drivers</h3>
                  <div className="flex items-center gap-1 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div><p className="text-xs text-slate-400">Ranked by Squad transaction spend</p></div>
                </div>
                <button onClick={() => setActiveModal('customers')} className="text-sm font-bold text-[#E8762E] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {topCustomers.slice(0, 3).map((customer, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-slate-50 rounded-xl p-3 -mx-3 transition-colors cursor-pointer" onClick={() => setActiveModal('customers')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{customer.id}</div>
                      <div>
                        <span className="font-bold text-slate-700">{customer.name}</span>
                        <p className="text-xs text-slate-400">{customer.transactions} transactions via Squad</p>
                        <p className="text-[10px] text-purple-500 font-bold">CLV: {formatCurrency(customer.amount * 1.5)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">{formatCurrency(customer.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad AI Intelligence panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Squad AI Intelligence</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <p className="text-xs text-slate-400">Behavioral analysis from Squad transaction history — updated every 5 mins</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold ${isEnglish ? 'text-slate-900' : 'text-slate-400'}`}>ENGLISH</span>
                  <button onClick={() => setIsEnglish(!isEnglish)} className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${isEnglish ? 'bg-slate-200' : 'bg-[#E8762E]'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isEnglish ? 'translate-x-0' : 'translate-x-5'}`}></div>
                  </button>
                  <span className={`text-[10px] font-bold ${!isEnglish ? 'text-slate-900' : 'text-slate-400'}`}>PIDGIN</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-50">
                <div className="p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5 text-[#E8762E]" /></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">AI INSIGHT</h4>
                      <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mb-2">Squad Data · 90-day analysis</p>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">{isEnglish ? aiInsightEnglish : aiInsightPidgin}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-slate-600" /></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">CUSTOMER INSIGHTS</h4>
                      <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mb-2">Squad Transaction Patterns</p>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        {isEnglish
                          ? <span>Your top 3 customers account for <span className="font-bold text-slate-900">25% of total revenue</span>. Consider a loyalty program to retain them.</span>
                          : <span>Your top 3 customers dey carry the load. <span className="font-bold text-slate-900">Reward dem with something special!</span></span>
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-red-50/30 hover:bg-red-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1">SECURITY ALERT</h4>
                      <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest mb-2">Squad Fraud Engine · Real-time</p>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4">
                        {fraudFlagged > 0
                          ? <span><span className="text-red-500 font-bold">{fraudFlagged} suspicious transaction{fraudFlagged > 1 ? 's' : ''}</span> flagged totalling {formatCurrency(fraudAmount)}.</span>
                          : <span>No suspicious transactions detected. Your account is <span className="text-emerald-600 font-bold">secure</span>.</span>
                        }
                      </p>
                      <button onClick={() => onNavigate('frauddetection')} className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest hover:gap-3 transition-all cursor-pointer">
                        Investigate Fraud <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-wrap">
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Squad Payment API</span>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Fraud Detection Engine</span>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Inventory AI</span>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Vendor Intelligence</span>
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>TrustScore™</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">All intelligence derived from Squad-compatible transaction data</p>
              </div>
            </div>
          </div>

          <footer className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="font-bold text-slate-900">SquadMind</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              © 2026 SquadMind. SME Operating System. Powered by Squad.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-slate-500 hover:text-[#E8762E] transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-[#E8762E] transition-colors font-medium">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-[#E8762E] transition-colors font-medium">Contact Support</a>
            </div>
          </footer>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-[#E8762E]"><LayoutDashboard className="w-5 h-5" /><span className="text-[10px] font-bold">Home</span></button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400"><Banknote className="w-5 h-5" /><span className="text-[10px] font-bold">Cash</span></button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400"><ShieldAlert className="w-5 h-5" /><span className="text-[10px] font-bold">Fraud</span></button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400"><Settings className="w-5 h-5" /><span className="text-[10px] font-bold">More</span></button>
      </nav>

      <button className="fixed bottom-24 right-6 w-12 h-12 bg-[#E8762E] text-white rounded-xl shadow-2xl shadow-[#E8762E]/30 flex items-center justify-center md:bottom-8 md:right-8 md:w-14 md:h-14 transition-all z-40 cursor-pointer">
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Dashboard;
