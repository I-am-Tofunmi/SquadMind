import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  Search,
  User,
  ShieldCheck,
  Banknote,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Grid,
  History,
  Loader2
} from 'lucide-react';
import { getFraudAlerts, getToken } from '../services/api';

function FraudDetection() {
  const navigate = useNavigate();
  const [fraudData, setFraudData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    fetchFraudData();
  }, []);

  const fetchFraudData = async () => {
    try {
      setLoading(true);
      const data = await getFraudAlerts();
      setFraudData(data);
    } catch (err) {
      setError('Using demo data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₦0';
    return `₦${Number(amount).toLocaleString('en-NG')}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
  };

  const getRiskBadge = (level) => {
    const l = (level || '').toLowerCase();
    if (l === 'high' || l === 'critical') return <span className="px-4 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20">High Risk</span>;
    if (l === 'medium') return <span className="px-4 py-1 bg-[#fff7ed] text-[#f97316] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#f97316]/20">Medium Risk</span>;
    return <span className="px-4 py-1 bg-[#f0f9ff] text-[#0ea5e9] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#0ea5e9]/20">Low Risk</span>;
  };

  // Fallback demo data
  const flaggedTransactions = fraudData?.fraud_flags || fraudData?.flags || fraudData?.items || [
    { id: 1, transaction_date: '2024-10-12', description: 'Reversal from POS-221', reference: 'TXN-9921-XF', amount: 12500, risk_level: 'high', ai_reason: 'Unusual reversal at 2:14 AM' },
    { id: 2, transaction_date: '2024-10-11', description: 'Duplicate Payment', reference: 'TXN-4820-MQ', amount: 5000, risk_level: 'medium', ai_reason: 'Two identical payments within 3 minutes' },
    { id: 3, transaction_date: '2024-10-09', description: 'Large Transfer', reference: 'TXN-1102-ZZ', amount: 85000, risk_level: 'low', ai_reason: 'Transaction above average threshold' },
  ];

  const riskScore = fraudData?.risk_score || 94;
  const threatsNeutralized = fraudData?.threats_neutralized || 3;
  const transactionsMonitored = fraudData?.transactions_monitored || 1240;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#00d2ff] animate-spin" />
          <p className="text-slate-500 font-medium">Loading fraud detection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#001f3f] flex flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex">
        <div>
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-0">SquadMind AI</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">POWERED BY SQUAD</p>
          </div>
          <nav className="px-4 space-y-1">
            <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium text-[15px]">Dashboard</span>
            </button>
            <button onClick={() => onNavigate('cashflow')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Banknote className="w-5 h-5" />
              <span className="font-medium text-[15px]">Cash Flow</span>
            </button>
            <button onClick={() => onNavigate('frauddetection')} className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer">
              <ShieldAlert className="w-5 h-5 text-white" />
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
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">SECURITY TIER</p>
              <p className="text-base font-bold text-white mb-4">Enterprise</p>
              <div className="w-full h-1 bg-white/10 rounded-full">
                <div className="w-full h-full bg-[#00d2ff] rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d2ff] flex items-center justify-center text-[#001f3f] font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Lekan Adeyemi</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Fraud & Suspicious Activity</h2>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-[1400px] w-full mx-auto">

          {error && (
            <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Active Protection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 md:p-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e0faff] text-[#00d2ff] rounded-lg text-[9px] font-bold tracking-widest mb-10 border border-[#00d2ff]/20 uppercase">
                  <Sparkles className="w-3 h-3" />
                  AI Insight
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-[#001f3f] mb-4 leading-tight">Active Protection Enabled</h3>
                <p className="text-slate-400 text-sm md:text-base mb-12 leading-relaxed max-w-md font-medium opacity-80">
                  SquadMind is currently monitoring {transactionsMonitored.toLocaleString()} real-time transaction streams. {threatsNeutralized} threats were successfully neutralized in the last 24 hours.
                </p>
                <button className="w-full md:w-auto bg-[#001f3f] hover:bg-[#002b55] text-white font-bold py-4 px-10 rounded-xl text-sm transition-all shadow-xl shadow-[#001f3f]/20 cursor-pointer">
                  View Protection Report
                </button>
              </div>
              <div className="w-full md:w-1/3 bg-[#f8fafc] border-l border-slate-50 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="w-full h-full absolute inset-0 opacity-10 bg-[radial-gradient(#00d2ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-[#00d2ff] relative z-10 drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]" />
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 border-l-4 border-l-red-500">
              <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-6">RISK SCORE</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl md:text-7xl font-bold text-slate-900 leading-none">{riskScore}</span>
                <span className="text-lg md:text-xl text-slate-400 font-bold">/100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]" style={{ width: `${riskScore}%` }}></div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-[10px] font-bold text-red-600 leading-tight uppercase tracking-widest">Critical Attention Required</p>
              </div>
            </div>
          </div>

          {/* Flagged Transactions Table */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Flagged Transactions</h3>
                <p className="text-xs md:text-sm text-slate-400 font-medium">Suspicious patterns identified by SquadMind AI</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:text-[#001f3f] transition-all uppercase tracking-widest cursor-pointer">Export CSV</button>
                <button className="px-6 py-2.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:text-[#001f3f] transition-all uppercase tracking-widest cursor-pointer">Mark All Resolved</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-[#f8fafc]/50 border-b border-slate-50">
                    <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">DATE</th>
                    <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">DESCRIPTION</th>
                    <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">AMOUNT</th>
                    <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">RISK LEVEL</th>
                    <th className="p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">AI REASON</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {flaggedTransactions.map((tx, i) => (
                    <tr key={tx.id || i} className="hover:bg-[#f8fafc] transition-colors group">
                      <td className="p-6 text-[11px] font-bold text-slate-400 uppercase">{formatDate(tx.transaction_date || tx.date)}</td>
                      <td className="p-6">
                        <p className="text-sm font-black text-[#001f3f] mb-1">{tx.description || tx.narration || 'Transaction'}</p>
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{tx.reference || tx.squad_transaction_ref || 'N/A'}</p>
                      </td>
                      <td className="p-6 text-sm font-black text-[#001f3f]">{formatCurrency(tx.amount)}</td>
                      <td className="p-6">{getRiskBadge(tx.risk_level)}</td>
                      <td className="p-6 text-[10px] text-slate-300 font-medium italic text-center">"{(tx.ai_reason || tx.reason || 'Suspicious pattern').substring(0, 20)}..."</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Activity Heatmap */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-10 self-start">
                <Grid className="w-5 h-5 text-[#001f3f]" />
                <h3 className="text-lg font-bold text-slate-900">Activity Heatmap</h3>
              </div>
              <div className="flex gap-4 w-full max-w-[480px]">
                <div className="flex flex-col justify-between py-1 text-[9px] font-black text-slate-300 uppercase h-[180px]">
                  <span>Morning</span>
                  <span>Afternoon</span>
                  <span>Evening</span>
                  <span>Night</span>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between px-2 text-[9px] font-black text-slate-300 uppercase mb-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {[...Array(28)].map((_, i) => (
                      <div key={i} className={`aspect-square rounded-lg transition-all ${[9, 15, 22, 23].includes(i) ? 'bg-red-500' : [8, 16, 17, 18, 19, 21].includes(i) ? 'bg-orange-100' : 'bg-[#f1f5f9]'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#f1f5f9]"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LOW</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-100"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MEDIUM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SUSPICIOUS</span>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Security Recommendations</h3>
              </div>
              <div className="space-y-6">
                {[
                  { text: 'Update withdrawal limits for POS-221 to prevent further automated reversal spam.', icon: <CheckCircle2 className="text-[#00d2ff]" />, bg: 'bg-[#f0f9ff]' },
                  { text: 'Enable 2FA for all transfers exceeding ₦50,000 to mitigate high-value transfer risks.', icon: <CheckCircle2 className="text-[#00d2ff]" />, bg: 'bg-[#f0f9ff]' },
                  { text: 'Merchant account verification pending for 12 secondary terminals.', icon: <History className="text-slate-400" />, bg: 'bg-slate-50' }
                ].map((rec, i) => (
                  <div key={i} className={`p-6 rounded-2xl border border-slate-50 flex items-center gap-5 ${rec.bg}`}>
                    <div className="shrink-0">{React.cloneElement(rec.icon, { className: 'w-5 h-5' })}</div>
                    <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <span className="text-slate-400 font-black">SQUADMIND AI</span>
              <a href="#" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-500 transition-colors">Contact Support</a>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SQUADMIND. POWERED BY SQUAD.</p>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400">
          <Banknote className="w-5 h-5" />
          <span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-[#001f3f]">
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
    </div>
  );
}

export default FraudDetection;