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
  Loader2
} from 'lucide-react';
import { getDashboard, getToken } from '../services/api';

function Dashboard() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      setDashboardData(response.data || response);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₦0.00';
    return `₦${Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
  };

  const totalRevenue = dashboardData?.total_revenue || dashboardData?.revenue?.total || 342500;
  const totalTransactions = dashboardData?.transaction_count || dashboardData?.transactions?.count || 84;
  const bestSalesDay = dashboardData?.best_sales_day || 'Friday';
  const healthScore = dashboardData?.health_score || 78;
  const revenueChange = dashboardData?.revenue_change_percent || 12;
  const topCustomers = dashboardData?.top_customers || [
    { id: 'CS', name: 'Chinedu Stores', amount: 750000 },
    { id: 'BL', name: 'Bright Logistics', amount: 420000 },
    { id: 'TB', name: 'Tolu Boutique', amount: 310000 },
  ];
  const businessName = dashboardData?.business_name || 'Lekan Adeyemi';

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
              <img src={`https://ui-avatars.com/api/?name=${businessName}&background=00d2ff&color=001f3f`} alt={businessName} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{businessName}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

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
              {error} — showing demo data
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Business Overview</h2>
            <p className="text-slate-500 text-sm">Real-time intelligence and performance metrics for your business.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Banknote className="w-6 h-6" />
                </div>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">+{revenueChange}%</div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">TOTAL REVENUE</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{formatCurrency(totalRevenue)}</h3>
              <p className="text-xs text-slate-400 mt-2">vs last month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
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
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">BEST SALES DAY</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{bestSalesDay}</h3>
              <p className="text-xs text-slate-400 mt-2">₦47,000 avg. volume</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">HEALTH SCORE</p>
                  <h3 className="text-3xl font-bold text-slate-900">{healthScore}/100</h3>
                  <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase tracking-wide">Status: Stable</p>
                </div>
                <div className="w-16 h-16 rounded-xl border-4 border-[#e0f7fa] flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-[#00d2ff] border-t-transparent border-r-transparent rounded-xl rotate-45"></div>
                  <span className="text-sm font-bold text-[#00d2ff]">{healthScore}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
                  <p className="text-sm text-slate-400">Last 30 days performance</p>
                </div>
                <div className="px-4 py-1.5 bg-[#f8fafc] border border-slate-100 rounded-lg text-xs font-medium text-slate-600">Last 30 Days</div>
              </div>
              <div className="relative h-[240px] w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />
                  <path d="M0,250 C100,220 200,100 300,150 C400,200 500,50 600,120 C700,180 800,280 900,150 C950,100 1000,50 1000,50" fill="none" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" />
                  <path d="M0,250 C100,220 200,100 300,150 C400,200 500,50 600,120 C700,180 800,280 900,150 C950,100 1000,50 1000,50 L1000,300 L0,300 Z" fill="url(#gradient)" className="opacity-10" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00d2ff" />
                      <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-0 w-full flex justify-between px-2 pt-4">
                  <span className="text-[11px] font-bold text-slate-400">W1</span>
                  <span className="text-[11px] font-bold text-slate-400">W2</span>
                  <span className="text-[11px] font-bold text-slate-400">W3</span>
                  <span className="text-[11px] font-bold text-slate-400">W4</span>
                </div>
              </div>
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

          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-slate-900">Top Revenue Drivers</h3>
                <button className="text-sm font-bold text-[#00d2ff] hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                {topCustomers.slice(0, 3).map((customer, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {customer.id || customer.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-700">{customer.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{formatCurrency(customer.amount || customer.total_revenue)}</span>
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
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">GROWTH OPPORTUNITY</h4>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        {isEnglish
                          ? <>Your sales consistently peak on <span className="font-bold text-slate-900">Fridays at 4 PM</span>. Consider running a flash promo at 3 PM.</>
                          : <>Your Friday sales strong well well 💪 — <span className="font-bold text-slate-900">₦47,000 average</span>. Try run promo before 4PM.</>
                        }
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
                          ? <>Customer concentration high: <span className="font-bold text-slate-900">60% of revenue</span> comes from only 3 regular customers.</>
                          : <>3 customers account for 60% of your revenue. <span className="font-bold text-slate-900">Dem be your VIPs.</span></>
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
                        {isEnglish
                          ? <>Suspicious transaction flagged for <span className="text-red-500 font-bold text-lg">₦12,500</span> from a new IP location.</>
                          : <>One transaction from Tuesday looks suspicious — <span className="text-red-500 font-bold">₦12,500 reversal</span>. Dem flagged am from new location.</>
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
