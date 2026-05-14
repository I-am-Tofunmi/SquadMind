import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShieldAlert, Bell, Settings, LogOut, HelpCircle, User,
  ChevronRight, Banknote, Award, Sparkles, TrendingUp, AlertCircle,
  CheckCircle2, Share2, Activity, ShieldCheck, FileText, Clock, History,
  Eye, X, TrendingDown, Gift, ArrowRight, Loader2
} from 'lucide-react';

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

function Alerts() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [dismissedIds, setDismissedIds] = useState(new Set());
  const [successMsg, setSuccessMsg] = useState('');
  const [showAuditLogs, setShowAuditLogs] = useState(false);

  const onLogout = () => navigate('/');
  const onNavigate = (path) => navigate(`/${path}`);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const alerts = [
    { id: 0, type: 'CRITICAL DROP', color: '#dc2626', title: 'Sales Drop Detected', text: 'Your sales dropped 40% this week compared to last week. Friday usually peaks — check your stock or pricing.', time: '2h ago', buttons: ['Analyze Now', 'Dismiss'], modal: 'analyze' },
    { id: 1, type: 'FRAUD RISK', color: '#dc2626', title: 'Suspicious Reversal Flagged', text: 'A ₦12,500 reversal was flagged from POS-221 at 2:14 AM — unusual timing and location detected.', time: '5h ago', buttons: ['Review Reversal'], modal: 'reversal' },
    { id: 2, type: 'PERFORMANCE PEAK', color: '#E8762E', title: 'Your Best Month Yet 🥳', text: 'You are up 23% from last month. Your Friday flash promos are working. Well done o!', time: '1d ago', buttons: ['Share Stats'], modal: 'share' },
    { id: 3, type: 'VIP CUSTOMER', color: '#f59e0b', title: 'New VIP Recognised ⭐', text: 'Chinedu Stores just completed their 10th purchase this month — your most loyal customer.', time: '2d ago', buttons: ['Send Reward'], modal: 'reward' },
  ];

  const visibleAlerts = alerts.filter(a => !dismissedIds.has(a.id));

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">

      <Modal isOpen={activeModal === 'analyze'} onClose={() => setActiveModal(null)} title="Sales Drop Analysis">
        <div className="space-y-5">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">40% Drop Detected</p>
                <p className="text-sm text-slate-600 leading-relaxed">Your weekly revenue dropped from ₦342,000 to ₦205,200. This is significantly below your 30-day average.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Likely Causes</h4>
            {[
              { label: 'Stock Availability', status: 'Check Required', color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Pricing Changes', status: 'No Changes Detected', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Competitor Activity', status: 'Monitor', color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Seasonal Trend', status: 'Within Normal Range', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.bg} ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Recommended Actions</h4>
            {[
              'Run a flash promo this Friday to recover weekend sales',
              'Review top 5 products — check if any are out of stock',
              'Send a loyalty discount to your top 10 customers',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#E8762E] mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { setActiveModal(null); onNavigate('cashflow'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer">
            View Cash Flow Forecast <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'reversal'} onClose={() => setActiveModal(null)} title="Suspicious Reversal — Review">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount</p><p className="text-xl font-bold text-red-600">₦12,500</p></div>
            <div className="bg-slate-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</p><p className="text-xl font-bold text-slate-900">2:14 AM</p></div>
            <div className="bg-slate-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Terminal</p><p className="text-sm font-bold text-slate-900">POS-221</p></div>
            <div className="bg-red-50 rounded-2xl p-4"><p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Risk Level</p><p className="text-sm font-bold text-red-600">HIGH</p></div>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#E8762E] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#E8762E] uppercase tracking-wider mb-2">AI Analysis</p>
                <p className="text-sm text-slate-600 leading-relaxed">This reversal occurred at an unusual time (2:14 AM) from a new device location not previously associated with POS-221. Pattern matches known fraud signatures.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { setActiveModal(null); showSuccess('Reversal approved as legitimate.'); }}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm cursor-pointer transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Approve
            </button>
            <button onClick={() => { setActiveModal(null); onNavigate('frauddetection'); }}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm cursor-pointer transition-colors">
              <ShieldAlert className="w-4 h-4" /> Escalate
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'share'} onClose={() => setActiveModal(null)} title="Share Your Stats">
        <div className="space-y-5">
          <div className="p-6 bg-gradient-to-br from-[#001f3f] to-[#E8762E] rounded-2xl text-white text-center">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2">SquadMind Performance Card</p>
            <p className="text-4xl font-black mb-1">+23%</p>
            <p className="text-sm text-white/80">Revenue Growth — May 2026</p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div><p className="text-xl font-black">1,247</p><p className="text-[10px] text-white/60">Transactions</p></div>
              <div><p className="text-xl font-black">342</p><p className="text-[10px] text-white/60">Customers</p></div>
              <div><p className="text-xl font-black">78</p><p className="text-[10px] text-white/60">Trust Score</p></div>
            </div>
            <p className="text-[10px] text-white/40 mt-4">Powered by SquadMind AI</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Share via</h4>
            {[
              { platform: 'Copy Link', icon: '🔗', action: () => { navigator.clipboard?.writeText('https://squadmind-khaki.vercel.app'); showSuccess('Link copied!'); setActiveModal(null); } },
              { platform: 'WhatsApp', icon: '💬', action: () => { showSuccess('Opening WhatsApp...'); setActiveModal(null); } },
              { platform: 'Download Image', icon: '📥', action: () => { showSuccess('Stats card downloaded!'); setActiveModal(null); } },
            ].map((item, i) => (
              <button key={i} onClick={item.action} className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors cursor-pointer">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-bold text-slate-700">{item.platform}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'reward'} onClose={() => setActiveModal(null)} title="Send VIP Reward">
        <div className="space-y-5">
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl">⭐</div>
              <div>
                <p className="text-sm font-black text-slate-900">Chinedu Stores</p>
                <p className="text-[10px] text-slate-400">10 purchases this month • ₦220,000 total spend</p>
                <p className="text-[10px] text-amber-600 font-bold">CLV: ₦330,000 estimated</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Choose Reward Type</h4>
            {[
              { type: 'Discount Voucher', desc: '10% off next purchase', icon: '🏷️' },
              { type: 'Free Delivery', desc: 'On next 3 orders', icon: '🚚' },
              { type: 'Loyalty Points', desc: '500 bonus points', icon: '💎' },
              { type: 'Personal Thank You', desc: 'Send a WhatsApp message', icon: '💬' },
            ].map((reward, i) => (
              <button key={i} onClick={() => { setActiveModal(null); showSuccess(`${reward.type} sent to Chinedu Stores!`); }}
                className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-2xl transition-all cursor-pointer text-left">
                <span className="text-xl">{reward.icon}</span>
                <div><p className="text-sm font-bold text-slate-900">{reward.type}</p><p className="text-[10px] text-slate-400">{reward.desc}</p></div>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </button>
            ))}
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">💡 Rewarding loyal customers increases repeat purchase rate by an average of 34%.</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showAuditLogs} onClose={() => setShowAuditLogs(false)} title="Full Audit Log">
        <div className="space-y-4">
          <p className="text-xs text-slate-400">All system events from the last 7 days</p>
          {[
            { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'POS Reconciliation Validated', sub: 'Cleared 144 entries, ₦1.1M total', time: '2h ago' },
            { icon: <AlertCircle className="text-orange-500" />, bg: 'bg-orange-50', title: 'New Sub-account Added', sub: 'Lagos Main Terminal Branch', time: '5h ago' },
            { icon: <History className="text-red-500" />, bg: 'bg-red-50', title: 'Pending Review', sub: 'Supplier Invoice #772 (Out of Range)', time: '8h ago' },
            { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'Fraud Alert Resolved', sub: 'TXN-9921-XF marked as investigated', time: '1d ago' },
            { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'Daily Backup Complete', sub: 'All transaction records secured', time: '1d ago' },
            { icon: <AlertCircle className="text-orange-500" />, bg: 'bg-orange-50', title: 'Unusual Login Attempt', sub: 'Blocked from unrecognized device', time: '2d ago' },
            { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'TrustScore Updated', sub: 'Score improved from 71 to 74', time: '2d ago' },
            { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'Squad API Synced', sub: '247 new transactions imported', time: '3d ago' },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className={`w-9 h-9 rounded-full ${log.bg} flex items-center justify-center shrink-0`}>
                {React.cloneElement(log.icon, { className: 'w-4 h-4' })}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-900">{log.title}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{log.sub}</p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">{log.time}</span>
            </div>
          ))}
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
            {[
              { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: 'dashboard' },
              { label: 'Cash Flow', icon: <Banknote className="w-5 h-5" />, path: 'cashflow' },
              { label: 'Fraud Detection', icon: <ShieldAlert className="w-5 h-5" />, path: 'frauddetection' },
              { label: 'Alerts', icon: <Bell className="w-5 h-5" />, path: 'alerts', active: true },
              { label: 'TrustScore', icon: <Award className="w-5 h-5" />, path: 'trustscore' },
              { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },
            ].map(item => (
              <button key={item.path} onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${item.active ? 'bg-[#E8762E] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {item.icon}<span className="font-medium text-[15px]">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" /><span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8762E] flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Lekan Adeyemi</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Intelligence Alerts</h2>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><HelpCircle className="w-5 h-5" /></button>
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
          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />{successMsg}
            </div>
          )}

          {/* AI Status Header */}
          <div className="bg-orange-50 rounded-2xl md:rounded-[32px] p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8762E] text-white rounded text-[9px] font-bold tracking-widest mb-6 uppercase shadow-sm">
                AI Engine Active
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-3 leading-tight">Analyzing 4,281 real-time signals</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium opacity-80">
                We detected {visibleAlerts.filter(a => a.type.includes('CRITICAL') || a.type.includes('FRAUD')).length} high-priority events requiring intervention within the next 2 hours.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-xl relative z-10 flex flex-col items-center min-w-[160px]">
              <span className="text-4xl font-black text-[#001f3f]">98.2</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Signal Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#E8762E]" />
                  <h3 className="text-xl font-bold text-slate-900">AI Insights Feed</h3>
                </div>
                {dismissedIds.size > 0 && (
                  <button onClick={() => setDismissedIds(new Set())} className="text-xs font-bold text-[#E8762E] hover:underline cursor-pointer">
                    Restore dismissed ({dismissedIds.size})
                  </button>
                )}
              </div>

              {visibleAlerts.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-lg font-bold text-slate-900 mb-2">All Clear!</p>
                  <p className="text-sm text-slate-400">No active alerts. Your business is running smoothly.</p>
                </div>
              )}

              {visibleAlerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all" style={{ borderLeftWidth: '4px', borderLeftColor: alert.color }}>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: alert.color }}>{alert.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{alert.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 opacity-80 font-medium">{alert.text}</p>
                    <div className="flex gap-4 flex-wrap">
                      <button onClick={() => setActiveModal(alert.modal)}
                        className="px-8 py-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer bg-[#001f3f] text-white shadow-lg hover:bg-[#002b55]">
                        {alert.buttons[0]}
                      </button>
                      {alert.buttons[1] && (
                        <button onClick={() => { setDismissedIds(prev => new Set([...prev, alert.id])); showSuccess('Alert dismissed.'); }}
                          className="px-8 py-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
                          {alert.buttons[1]}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Integrity Column */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xl font-bold text-slate-900">Integrity Summary</h3>
              <div className="bg-[#001f3f] rounded-[32px] p-10 text-white relative overflow-hidden group">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-10">SMART SUMMARY</p>
                <div className="mb-8">
                  <span className="text-5xl font-black block mb-2">11</span>
                  <span className="text-[11px] text-slate-400 font-medium opacity-80 uppercase tracking-wider">Alerts resolved this week</span>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black block mb-2">₦442k</span>
                  <span className="text-[11px] text-slate-400 font-medium opacity-80 uppercase tracking-wider">Losses prevented by AI</span>
                </div>
                <div className="flex items-center gap-2 text-[#E8762E] font-bold text-xs uppercase tracking-tight">
                  <TrendingUp className="w-4 h-4" />+14.2% Efficiency
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LATEST AUDIT LOG</p>
                  <Clock className="w-4 h-4 text-slate-300" />
                </div>
                <div className="space-y-8">
                  {[
                    { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'POS Reconciliation Validated', sub: 'Cleared 144 entries, ₦1.1M total' },
                    { icon: <AlertCircle className="text-orange-500" />, bg: 'bg-orange-50', title: 'New Sub-account Added', sub: 'Lagos Main Terminal Branch' },
                    { icon: <History className="text-red-500" />, bg: 'bg-red-50', title: 'Pending Review', sub: 'Supplier Invoice #772 (Out of Range)' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-9 h-9 rounded-full ${log.bg} flex items-center justify-center shrink-0`}>
                        {React.cloneElement(log.icon, { className: 'w-4 h-4' })}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{log.title}</p>
                        <p className="text-[9px] text-slate-400 font-medium mt-1">{log.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowAuditLogs(true)}
                  className="w-full mt-10 py-3 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest cursor-pointer">
                  View All Audit Logs
                </button>
              </div>
            </div>
          </div>

          {/* Daily Smart Summary */}
          <div className="mt-16 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Daily Smart Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'TOTAL SCANNED', icon: <Eye />, value: '84', sub: 'Transactions today', color: 'slate' },
                { label: 'ANOMALIES', icon: <FileText />, value: '02', sub: 'Flagged for manual verification', color: 'red' },
                { label: 'HEALTH SCORE', icon: <ShieldCheck />, value: '78', sub: 'Stable - Needs attention', color: 'orange' },
              ].map((kpi, i) => (
                <div key={i}
                  onClick={() => { if (kpi.label === 'ANOMALIES') onNavigate('frauddetection'); else if (kpi.label === 'HEALTH SCORE') onNavigate('trustscore'); }}
                  className={`bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 flex flex-col items-start relative overflow-hidden group ${kpi.label !== 'TOTAL SCANNED' ? 'cursor-pointer hover:shadow-md hover:border-[#E8762E]/30 transition-all' : ''}`}>
                  <div className="absolute top-8 right-8 text-slate-300 group-hover:text-[#E8762E] transition-colors">
                    {React.cloneElement(kpi.icon, { className: 'w-6 h-6' })}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{kpi.label}</p>
                  {kpi.label === 'HEALTH SCORE' ? (
                    <div className="flex items-center gap-6 w-full">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3"></circle>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#E8762E" strokeWidth="3" strokeDasharray="100" strokeDashoffset="22"></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-black text-[#001f3f]">{kpi.value}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Stable</p>
                        <p className="text-[10px] text-slate-400 font-medium">Needs attention</p>
                        <p className="text-[10px] text-[#E8762E] font-bold mt-2">Click to view TrustScore →</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-5xl font-black text-[#001f3f] mb-2">{kpi.value}</h4>
                      <p className="text-xs text-slate-400 font-medium mb-10">{kpi.sub}</p>
                      {kpi.label === 'ANOMALIES' && <p className="text-[10px] text-[#E8762E] font-bold mb-4">Click to view Fraud Detection →</p>}
                      <div className="w-full flex items-end gap-1.5 h-12">
                        {[20, 30, 25, 45, 35, 65, 40, 55, 30, 45].map((h, bi) => (
                          <div key={bi} className={`flex-1 rounded-t-sm transition-all ${kpi.color === 'red' ? (bi === 5 ? 'bg-red-500' : 'bg-red-100') : 'bg-[#E8762E]/20'}`} style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <span className="text-slate-400 font-black">SQUADMIND AI</span>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Terms of Service</a>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SQUADMIND v2.4.1</p>
          </footer>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400"><LayoutDashboard className="w-5 h-5" /><span className="text-[10px] font-bold">Home</span></button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400"><Banknote className="w-5 h-5" /><span className="text-[10px] font-bold">Cash</span></button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400"><ShieldAlert className="w-5 h-5" /><span className="text-[10px] font-bold">Fraud</span></button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-[#E8762E] relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400"><Settings className="w-5 h-5" /><span className="text-[10px] font-bold">More</span></button>
      </nav>
    </div>
  );
}

export default Alerts;
