import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  Search,
  User,
  Banknote,
  FileText,
  Users,
  Calendar,
  Loader2,
  X,
  TrendingUp,
  CheckCircle2,
  Info,
  Download
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

function Dashboard() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [chartPeriod, setChartPeriod] = useState(30);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [showHourly, setShowHourly] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const onNavigate = (path) => navigate(`/${path}`);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
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
      { date: 'May 11', revenue: 146000, transactions: 42 },
      { date: 'May 10', revenue: 149000, transactions: 43 },
      { date: 'May 09', revenue: 152000, transactions: 44 },
    ];
    const rows = [
      ['Date', 'Revenue (NGN)', 'Transactions'],
      ...data.map(p => [p.date, p.revenue, p.transactions])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `squadmind-revenue-${chartPeriod}d.csv`;
    a.click();
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
  const businessName = safeString(dashboardData?.business_name, 'Lekan Stores');
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

  const getChartData = () => {
  if (revenueTrend.length > 0) return revenueTrend.slice(-chartPeriod);
  
  if (chartPeriod === 7) {
    // 7D — volatile, spiky week
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
    // 30D — steady upward trend with mid dip
    return Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      revenue: 140000 + Math.sin(i * 0.4) * 40000 + i * 1000,
      transactions: 40 + i,
    }));
  }

  // 90D — slow growth with two big peaks
  return Array.from({ length: 90 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: 100000
      + (i * 1200)
      + (i > 25 && i < 35 ? 80000 : 0)
      + (i > 65 && i < 75 ? 120000 : 0)
      + Math.sin(i * 0.2) * 15000,
    transactions: 30 + Math.floor(i * 0.5),
  }));
};

  const renderChart = () => {
  const filtered = getChartData();
  const max = 400000; // fixed ceiling
  const min = 0;      // fixed floor
  const range = 250000;

    const coords = filtered.map((p, i) => ({
      x: (i / Math.max(filtered.length - 1, 1)) * 1000,
      y: 280 - ((p.revenue - min) / range) * 240,
      ...p,
    }));

    const points = coords.map(c => `${c.x},${c.y}`).join(' ');
    const areaPoints = `0,280 ${points} 1000,280`;
    const labels = chartPeriod === 7
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : chartPeriod === 30
      ? ['W1', 'W2', 'W3', 'W4']
      : ['Jan', 'Feb', 'Mar'];

    return (
      <div className="relative h-[240px] w-full">
        {hoveredPoint && (
          <div
            className="absolute bg-[#001f3f] text-white text-xs font-bold px-3 py-2 rounded-xl pointer-events-none shadow-xl z-10 whitespace-nowrap"
            style={{ left: `${(hoveredPoint.x / 1000) * 100}%`, top: '8px', transform: 'translateX(-50%)' }}
          >
            <p className="text-slate-300 text-[10px]">{hoveredPoint.date}</p>
            <p className="text-[#00d2ff]">{formatCurrency(hoveredPoint.revenue)}</p>
            <p className="text-slate-300">{hoveredPoint.transactions} txns</p>
          </div>
        )}
        <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />
          <polyline points={points} fill="none" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points={areaPoints} fill="url(#grad2)" opacity="0.15" />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {coords.map((c, i) => (
            <circle
              key={i}
              cx={c.x} cy={c.y} r="18"
              fill="transparent"
              style={{ cursor: 'crosshair' }}
              onMouseEnter={() => setHoveredPoint(c)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
          {hoveredPoint && (
            <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="5" fill="#00d2ff" stroke="white" strokeWidth="2" />
          )}
        </svg>
        <div className="absolute bottom-0 w-full flex justify-between px-2">
          {labels.map(d => (
            <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#00d2ff] animate-spin" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden">

      {/* ── MODALS ── */}

      <Modal isOpen={showHourly} onClose={() => setShowHourly(false)} title="Hourly Sales Breakdown">
        <div className="space-y-4">
          <p className="text-xs text-slate-400 font-medium">Average transactions by hour of day</p>
          <div className="flex items-end gap-1 h-32 pt-4">
            {[2,1,1,0,0,1,3,8,12,15,18,14,10,13,16,19,22,18,14,10,7,5,4,3].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-sm ${val >= 18 ? 'bg-[#00d2ff]' : val >= 10 ? 'bg-[#00d2ff]/60' : 'bg-slate-200'}`}
                  style={{ height: `${(val / 22) * 100}%`, minHeight: val > 0 ? '4px' : '0' }}
                ></div>
                {i % 6 === 0 && <span className="text-[8px] text-slate-400">{i}h</span>}
              </div>
            ))}
          </div>
          <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
            <p className="text-xs font-bold text-[#00d2ff] mb-1">⚡ Peak hours: 4PM – 6PM</p>
            <p className="text-xs text-slate-500 leading-relaxed">Schedule promotions between 3PM–4PM to maximize conversion. Lowest traffic is midnight to 5AM.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Peak</p>
              <p className="text-sm font-bold text-slate-900">4PM–6PM</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg/hr</p>
              <p className="text-sm font-bold text-slate-900">{Math.round(totalTransactions / 24)} txns</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Quiet</p>
              <p className="text-sm font-bold text-slate-900">12AM–5AM</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'revenue'} onClose={() => setActiveModal(null)} title="Revenue Breakdown">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Growth</p>
              <p className="text-xl font-bold text-slate-900">+{revenueChange}%</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Avg Transaction</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(avgTransactionValue)}</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider mb-1">Best Day</p>
              <p className="text-xl font-bold text-slate-900">{bestSalesDay}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Recent Daily Revenue</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(revenueTrend.length > 0 ? revenueTrend.slice(-7).reverse() : [
                { date: 'May 13, 2026', revenue: 140000, transactions: 40 },
                { date: 'May 12, 2026', revenue: 143000, transactions: 41 },
                { date: 'May 11, 2026', revenue: 146000, transactions: 42 },
                { date: 'May 10, 2026', revenue: 149000, transactions: 43 },
                { date: 'May 09, 2026', revenue: 152000, transactions: 44 },
              ]).map((point, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-medium text-slate-500">{point.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{point.transactions} txns</span>
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(point.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export as CSV
          </button>
          <button
            onClick={() => { setActiveModal(null); onNavigate('cashflow'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            View Full Cash Flow Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'transactions'} onClose={() => setActiveModal(null)} title="Transaction Details">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Total</p>
              <p className="text-2xl font-bold text-slate-900">{totalTransactions}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Success</p>
              <p className="text-2xl font-bold text-slate-900">{Math.round(totalTransactions * 0.9)}</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Failed</p>
              <p className="text-2xl font-bold text-slate-900">{Math.round(totalTransactions * 0.1)}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Payment Channels</h4>
            <div className="space-y-3">
              {[
                { channel: 'Bank Transfer', count: Math.round(totalTransactions * 0.35), color: 'bg-blue-500' },
                { channel: 'POS Terminal', count: Math.round(totalTransactions * 0.28), color: 'bg-emerald-500' },
                { channel: 'Virtual Account', count: Math.round(totalTransactions * 0.22), color: 'bg-cyan-500' },
                { channel: 'USSD', count: Math.round(totalTransactions * 0.15), color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-slate-600 flex-1">{item.channel}</span>
                  <span className="text-sm font-bold text-slate-900">{item.count} txns</span>
                  <span className="text-xs text-slate-400">{Math.round((item.count / totalTransactions) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-xs font-bold text-amber-700">72% of daily target reached</p>
            <p className="text-xs text-amber-600 mt-1">You need {Math.round(totalTransactions * 0.38)} more transactions to hit today's goal</p>
          </div>
          <button
            onClick={() => { setActiveModal(null); onNavigate('frauddetection'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            View Fraud Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'health'} onClose={() => setActiveModal(null)} title="Health Score Breakdown">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-[#e0f7fa] flex items-center justify-center relative">
              <div className="absolute inset-0 border-8 border-[#00d2ff] border-b-transparent border-l-transparent rounded-full rotate-45"></div>
              <div className="text-center z-10">
                <span className="text-3xl font-bold text-slate-900">{healthScore}</span>
                <span className="text-sm text-slate-400">/100</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 text-center font-medium">{healthAiSummary}</p>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">Score Components</h4>
            {[
              { label: 'Revenue Growth', score: healthBreakdown.revenue_growth, color: 'bg-emerald-500', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
              { label: 'Fraud Safety', score: healthBreakdown.fraud_safety, color: 'bg-blue-500', icon: <ShieldAlert className="w-4 h-4 text-blue-500" /> },
              { label: 'Transaction Volume', score: healthBreakdown.transaction_volume, color: 'bg-cyan-500', icon: <FileText className="w-4 h-4 text-cyan-500" /> },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.score}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-[#00d2ff] mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                To improve your score, focus on increasing transaction volume and maintaining your current fraud prevention success rate.
              </p>
            </div>
          </div>
          <button
            onClick={() => { setActiveModal(null); onNavigate('trustscore'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            View Full TrustScore Report <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'customers'} onClose={() => setActiveModal(null)} title="All Revenue Drivers">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 rounded-2xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Customers</p>
              <p className="text-xl font-bold text-slate-900">{uniqueCustomers}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Returning Rate</p>
              <p className="text-xl font-bold text-slate-900">{returningRate}%</p>
            </div>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#001f3f] flex items-center justify-center text-white font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                    <p className="text-[10px] text-slate-400">{customer.transactions} transactions</p>
                    <p className="text-[10px] text-purple-500 font-bold">CLV: {formatCurrency(customer.amount * 1.5)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(customer.amount)}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs font-bold text-blue-700 mb-1">💡 Loyalty Opportunity</p>
            <p className="text-xs text-blue-600">Your top 3 customers account for 25% of revenue. A loyalty program could increase their spend by 20%.</p>
          </div>
        </div>
      </Modal>

      {/* ── SIDEBAR ── */}
      <aside className="w-[260px] bg-[#001f3f] flex flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex">
        <div>
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-0">SquadMind AI</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">POWERED BY SQUAD</p>
          </div>
          <nav className="px-4 space-y-1">
            <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer">
              <LayoutDashboard className="w-5 h-5 text-white" />
              <span className="font-medium text-[15px]">Dashboard</span>
            </button>
            <button onClick={() => onNavigate('cashflow')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Banknote className="w-5 h-5" />
              <span className="font-medium text-[15px]">Cash Flow</span>
            </button>
            <button onClick={() => onNavigate('frauddetection')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-medium text-[15px]">Fraud Detection</span>
            </button>
            <button onClick={() => onNavigate('alerts')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="font-medium text-[15px]">Alerts</span>
            </button>
            <button onClick={() => onNavigate('trustscore')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Award className="w-5 h-5" />
              <span className="font-medium text-[15px]">TrustScore</span>
            </button>
            <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Settings className="w-5 h-5" />
              <span className="font-medium text-[15px]">Settings</span>
            </button>
          </nav>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-[#112f4d] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT TIER</p>
              <p className="text-base font-bold text-white mb-4">Pro Business</p>
              <button className="w-full bg-[#00d2ff] hover:bg-[#00d2ff]/90 text-[#001f3f] font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d2ff]/20">
                Upgrade Plan
              </button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help Center</span>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d2ff] flex items-center justify-center text-[#001f3f] font-bold overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(businessName)}&background=00d2ff&color=001f3f`} alt={businessName} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{businessName}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-[#f1f5f9] border-none rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e0f7fa] text-[#00838f] rounded-full">
              <div className="w-2 h-2 bg-[#00acc1] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-wider uppercase">AI LIVE MONITORING</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
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

          {error && (
            <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Business Overview</h2>
            <p className="text-slate-500 text-sm">Real-time intelligence and performance metrics for your business.</p>
          </div>

          {/* ── KPI CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div onClick={() => setActiveModal('revenue')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#00d2ff]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <Banknote className="w-6 h-6" />
                </div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">+{revenueChange}%</div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">TOTAL REVENUE</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{formatCurrency(totalRevenue)}</h3>
              <p className="text-xs text-slate-400 mt-2">vs last month</p>
              <p className="text-[10px] text-[#00d2ff] font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to see breakdown →</p>
            </div>

            <div onClick={() => setActiveModal('transactions')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#00d2ff]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Daily Goal</div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">TRANSACTIONS</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{totalTransactions}</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[72%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-2">72% of target reached</p>
              <p className="text-[10px] text-[#00d2ff] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to see details →</p>
            </div>

            <div onClick={() => setShowHourly(true)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#00d2ff]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">BEST SALES DAY</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{bestSalesDay}</h3>
              <p className="text-xs text-slate-400 mt-2">₦47,000 avg. volume</p>
              <p className="text-[10px] text-[#00d2ff] font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click for hourly breakdown →</p>
            </div>

            <div onClick={() => setActiveModal('health')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md hover:border-[#00d2ff]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">HEALTH SCORE</p>
                  <h3 className="text-3xl font-bold text-slate-900">{healthScore}/100</h3>
                  <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase tracking-wide">Status: {healthLabel}</p>
                </div>
                <div className="w-16 h-16 rounded-xl border-4 border-[#e0f7fa] flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-[#00d2ff] border-t-transparent border-r-transparent rounded-xl rotate-45"></div>
                  <span className="text-sm font-bold text-[#00d2ff]">{healthScore}%</span>
                </div>
              </div>
              <p className="text-[10px] text-[#00d2ff] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Click to see breakdown →</p>
            </div>
          </div>

          {/* ── CHARTS ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
                  <p className="text-sm text-slate-400">Hover chart to see daily values</p>
                </div>
                <div className="flex gap-2">
                  {[7, 30, 90].map(d => (
                    <button
                      key={d}
                      onClick={() => setChartPeriod(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartPeriod === d ? 'bg-[#001f3f] text-white' : 'bg-[#f8fafc] border border-slate-100 text-slate-500 hover:text-slate-900'}`}
                    >
                      {d}D
                    </button>
                  ))}
                  <button
                    onClick={exportCSV}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> CSV
                  </button>
                </div>
              </div>
              {renderChart()}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Busiest Periods</h3>
              <p className="text-sm text-slate-400 mb-10">Weekly traffic volume</p>
              <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-6">
                {[
                  { d: 'M', h: '40%' }, { d: 'T', h: '60%' }, { d: 'W', h: '35%' },
                  { d: 'T', h: '50%' }, { d: 'F', h: '100%', active: true },
                  { d: 'S', h: '65%' }, { d: 'S', h: '45%' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 w-full">
                    <div className="w-full bg-[#f1f5f9] rounded-md relative overflow-hidden" style={{ height: '140px' }}>
                      <div className={`absolute bottom-0 left-0 w-full rounded-md ${item.active ? 'bg-[#00d2ff]' : 'bg-[#e2e8f0]'}`} style={{ height: item.h }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${item.active ? 'text-[#00d2ff]' : 'text-slate-400'}`}>{item.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TOP CUSTOMERS + AI INTELLIGENCE ── */}
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-slate-900">Top Revenue Drivers</h3>
                <button onClick={() => setActiveModal('customers')} className="text-sm font-bold text-[#00d2ff] hover:underline cursor-pointer">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {topCustomers.slice(0, 3).map((customer, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-slate-50 rounded-xl p-2 -mx-2 transition-colors cursor-pointer" onClick={() => setActiveModal('customers')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {customer.id}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">{customer.name}</span>
                        <p className="text-xs text-slate-400">{customer.transactions} transactions</p>
                        <p className="text-[10px] text-purple-500 font-bold">CLV: {formatCurrency(customer.amount * 1.5)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">{formatCurrency(customer.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Squad AI Intelligence</h3>
                    <p className="text-sm text-slate-400">Automated insights based on your recent activity</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold ${isEnglish ? 'text-slate-900' : 'text-slate-400'}`}>ENGLISH</span>
                    <button onClick={() => setIsEnglish(!isEnglish)} className={`w-10 h-5 rounded-full p-1 transition-colors ${isEnglish ? 'bg-slate-200' : 'bg-[#00d2ff]'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isEnglish ? 'translate-x-0' : 'translate-x-5'}`}></div>
                    </button>
                    <span className={`text-[10px] font-bold ${!isEnglish ? 'text-slate-900' : 'text-slate-400'}`}>PIDGIN</span>
                  </div>
                  <button onClick={() => onNavigate('settings')} className="text-xs font-bold text-[#00d2ff] hover:underline cursor-pointer">Settings</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-50">
                <div className="p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#00d2ff]" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">AI INSIGHT</h4>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        {isEnglish ? aiInsightEnglish : aiInsightPidgin}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">CUSTOMER INSIGHTS</h4>
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
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-2">SECURITY ALERT</h4>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4">
                        {fraudFlagged > 0
                          ? <span><span className="text-red-500 font-bold">{fraudFlagged} suspicious transaction{fraudFlagged > 1 ? 's' : ''}</span> flagged totalling {formatCurrency(fraudAmount)}.</span>
                          : <span>No suspicious transactions detected. Your account is <span className="text-emerald-600 font-bold">secure</span>.</span>
                        }
                      </p>
                      <button onClick={() => onNavigate('frauddetection')} className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest hover:gap-3 transition-all">
                        Investigate Fraud <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="font-bold text-slate-900">SquadMind</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              © 2026 SquadMind. Powered by Squad.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Contact Support</a>
            </div>
          </footer>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-[#001f3f]">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400">
          <Banknote className="w-5 h-5" />
          <span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">Fraud</span>
        </button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400">
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-bold">More</span>
        </button>
      </nav>

      <button className="fixed bottom-24 right-6 w-12 h-12 bg-[#001f3f] text-white rounded-xl shadow-2xl flex items-center justify-center md:bottom-8 md:right-8 md:w-14 md:h-14 transition-all z-40">
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Dashboard;
