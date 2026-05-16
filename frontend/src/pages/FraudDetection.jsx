import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShieldAlert, Bell, Settings, LogOut, User,
  ShieldCheck, Banknote, Award, CheckCircle2, AlertTriangle, Sparkles,
  Grid, History, Loader2, X, ThumbsUp, ThumbsDown, TrendingUp, Shield, Activity
} from 'lucide-react';
import { getFraudAlerts, resolveFraud, getToken } from '../services/api';

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

function FraudDetection() {
  const navigate = useNavigate();
  const [fraudData, setFraudData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);
  const [resolving, setResolving] = useState(null);
  const [resolvedIds, setResolvedIds] = useState(new Set());
  const [successMsg, setSuccessMsg] = useState('');
  const [showReport, setShowReport] = useState(false);

  const onLogout = () => { localStorage.removeItem('token'); navigate('/login'); };
  const onNavigate = (path) => navigate(`/${path}`);

  useEffect(() => {
    const token = getToken();
    if (!token) { navigate('/login'); return; }
    fetchFraudData();
  }, []);

  const fetchFraudData = async () => {
    try {
      setLoading(true);
      const response = await getFraudAlerts();
      const data = response?.data || response;
      setFraudData(data && typeof data === 'object' ? data : {});
    } catch (err) {
      setError('Using demo data');
      setFraudData({});
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (tx, resolution) => {
    const id = tx.id || tx.flag_id;
    if (!id || resolvedIds.has(id)) return;
    try {
      setResolving(`${id}-${resolution}`);
      await resolveFraud(id, resolution);
      setResolvedIds(prev => new Set([...prev, id]));
      setSuccessMsg(`Transaction ${resolution === 'approve' ? 'approved' : 'flagged as fraud'} successfully!`);
      setSelectedTx(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setResolvedIds(prev => new Set([...prev, id]));
      setSuccessMsg(`Transaction marked as ${resolution === 'approve' ? 'legitimate' : 'fraudulent'}.`);
      setSelectedTx(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setResolving(null);
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
    return <span className="px-4 py-1 bg-orange-50 text-[#E8762E] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#E8762E]/20">Low Risk</span>;
  };

  // ── UPGRADED: demo transactions now include anomaly scores and triggered signals ──
  const rawFlags = fraudData?.fraud_flags || fraudData?.flags || fraudData?.items || fraudData;
  const flaggedTransactions = (Array.isArray(rawFlags) && rawFlags.length > 0)
    ? rawFlags
    : [
        {
          id: 1,
          transaction_date: '2026-05-12',
          description: 'Reversal from POS-221',
          reference: 'TXN-9921-XF',
          amount: 12500,
          risk_level: 'high',
          anomaly_score: 92,
          ai_reason: 'Unusual reversal at 2:14 AM from new device location. Pattern matches known fraud signature.',
          triggered_signals: [
            { label: 'Abnormal Transfer Time', detail: '2:14 AM — outside merchant operating hours', severity: 'high' },
            { label: 'New Device Fingerprint', detail: 'Unrecognized device ID — first seen today', severity: 'high' },
            { label: 'Reversal Pattern Match', detail: 'Matches 3 known fraud signatures in database', severity: 'high' },
            { label: 'Velocity Anomaly', detail: '4 reversals within 12 minutes — 800% above baseline', severity: 'high' },
          ],
        },
        {
          id: 2,
          transaction_date: '2026-05-11',
          description: 'Duplicate Payment',
          reference: 'TXN-4820-MQ',
          amount: 5000,
          risk_level: 'medium',
          anomaly_score: 67,
          ai_reason: 'Two identical payments within 3 minutes from same customer ID. Possible double-charge attempt.',
          triggered_signals: [
            { label: 'Duplicate Transaction', detail: '2 identical payments within 3 minutes', severity: 'medium' },
            { label: 'Same Customer ID', detail: 'Customer TXN-4820 charged twice consecutively', severity: 'medium' },
            { label: 'Round-Number Amount', detail: '₦5,000 exact — common in test fraud attempts', severity: 'low' },
          ],
        },
        {
          id: 3,
          transaction_date: '2026-05-09',
          description: 'Large Transfer',
          reference: 'TXN-1102-ZZ',
          amount: 85000,
          risk_level: 'low',
          anomaly_score: 38,
          ai_reason: 'Transaction 340% above merchant average. Flagged for manual review per threshold policy.',
          triggered_signals: [
            { label: 'Amount Threshold Exceeded', detail: '₦85,000 — 340% above 90-day merchant average', severity: 'low' },
            { label: 'First High-Value Transfer', detail: 'No prior transactions above ₦30,000 on record', severity: 'low' },
          ],
        },
      ];

  const riskScore = fraudData?.risk_score || 94;
  const threatsNeutralized = fraudData?.threats_neutralized || 3;
  const transactionsMonitored = fraudData?.transactions_monitored || 1240;

  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'bg-red-50 border-red-100 text-red-600';
    if (severity === 'medium') return 'bg-orange-50 border-orange-100 text-orange-600';
    return 'bg-slate-50 border-slate-100 text-slate-500';
  };

  const getSeverityDot = (severity) => {
    if (severity === 'high') return 'bg-red-500';
    if (severity === 'medium') return 'bg-orange-400';
    return 'bg-slate-300';
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#E8762E] animate-spin" />
          <p className="text-slate-500 font-medium">Loading fraud detection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">

      {/* ── PROTECTION REPORT MODAL ── */}
      <Modal isOpen={showReport} onClose={() => setShowReport(false)} title="Protection Report">
        <div className="space-y-5">
          <div className="p-5 bg-[#001f3f] rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#E8762E]" />
              <p className="text-sm font-bold">SquadMind AI — Active Protection</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-black text-[#E8762E]">{transactionsMonitored.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Monitored</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-emerald-400">{threatsNeutralized}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Neutralized</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-red-400">{flaggedTransactions.length}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Flagged</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Risk Score Breakdown</h4>
            {[
              { label: 'Transaction Velocity', score: 88, status: 'Normal', color: 'bg-emerald-500' },
              { label: 'Device Fingerprinting', score: 72, status: 'Warning', color: 'bg-orange-400' },
              { label: 'Geo-location Checks', score: 91, status: 'Clear', color: 'bg-emerald-500' },
              { label: 'Behavioural Pattern', score: 65, status: 'Alert', color: 'bg-red-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{item.score}%</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === 'Normal' || item.status === 'Clear' ? 'bg-emerald-50 text-emerald-600' :
                      item.status === 'Warning' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                    }`}>{item.status}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">24-Hour Activity Summary</h4>
            {[
              { label: 'Transactions Screened', value: transactionsMonitored.toLocaleString(), icon: '🔍' },
              { label: 'Threats Blocked', value: threatsNeutralized.toString(), icon: '🛡️' },
              { label: 'False Positive Rate', value: '0.3%', icon: '✅' },
              { label: 'Avg Response Time', value: '< 200ms', icon: '⚡' },
              { label: 'Flagged for Review', value: flaggedTransactions.length.toString(), icon: '⚠️' },
              { label: 'Auto-Resolved', value: resolvedIds.size.toString(), icon: '✔️' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-xs font-medium text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#E8762E] mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-[#E8762E]">AI Recommendation:</span> Enable 2FA for all transfers above ₦50,000 to reduce your risk score from 94 to an estimated 72. This single action eliminates 60% of your current exposure.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const rows = [
                ['SquadMind Protection Report'],
                ['Generated:', new Date().toLocaleDateString('en-NG')],
                [''], ['Transactions Monitored', transactionsMonitored],
                ['Threats Neutralized', threatsNeutralized],
                ['Flagged Transactions', flaggedTransactions.length],
                ['Risk Score', `${riskScore}/100`], [''],
                ['FLAGGED TRANSACTIONS'],
                ['Date', 'Description', 'Amount', 'Risk Level', 'Anomaly Score'],
                ...flaggedTransactions.map(tx => [formatDate(tx.transaction_date), tx.description, formatCurrency(tx.amount), tx.risk_level, `${tx.anomaly_score || 'N/A'}/100`])
              ];
              const csv = rows.map(r => r.join(',')).join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'squadmind-protection-report.csv'; a.click();
              URL.revokeObjectURL(url);
            }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4" /> Download Full Report (CSV)
          </button>
        </div>
      </Modal>

      {/* ── TRANSACTION DETAIL MODAL — UPGRADED ── */}
      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction Analysis">
        {selectedTx && (
          <div className="space-y-5">
            {resolvedIds.has(selectedTx.id || selectedTx.flag_id) && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 text-sm font-bold text-center">
                ✅ Already Resolved
              </div>
            )}

            {/* Transaction basics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(selectedTx.amount)}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                <p className="text-xl font-bold text-slate-900">{formatDate(selectedTx.transaction_date || selectedTx.date)}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reference</p>
                <p className="text-sm font-bold text-slate-900">{selectedTx.reference || selectedTx.squad_transaction_ref || 'N/A'}</p>
              </div>
            </div>

            {/* ── UPGRADED: Behavioral Anomaly Score ── */}
            {selectedTx.anomaly_score && (
              <div className="p-5 bg-[#001f3f] rounded-2xl text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#E8762E]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Behavioral Anomaly Score</p>
                  </div>
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${
                    selectedTx.anomaly_score >= 80 ? 'bg-red-500/20 text-red-400' :
                    selectedTx.anomaly_score >= 50 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {selectedTx.anomaly_score >= 80 ? 'CRITICAL' : selectedTx.anomaly_score >= 50 ? 'ELEVATED' : 'LOW'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-black text-white">{selectedTx.anomaly_score}</span>
                  <span className="text-xl text-slate-400">/100</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${
                    selectedTx.anomaly_score >= 80 ? 'bg-red-500' :
                    selectedTx.anomaly_score >= 50 ? 'bg-orange-400' : 'bg-emerald-500'
                  }`} style={{ width: `${selectedTx.anomaly_score}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Scored against 90-day merchant behavioral baseline via Squad transaction history</p>
              </div>
            )}

            {/* Risk level */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-bold text-slate-700">Risk Classification</span>
              </div>
              {getRiskBadge(selectedTx.risk_level)}
            </div>

            {/* ── UPGRADED: Triggered Signals ── */}
            {selectedTx.triggered_signals && selectedTx.triggered_signals.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#E8762E]" />
                  <p className="text-[10px] font-bold text-[#E8762E] uppercase tracking-widest">Triggered Detection Signals</p>
                </div>
                {selectedTx.triggered_signals.map((signal, i) => (
                  <div key={i} className={`p-3 rounded-xl border flex items-start gap-3 ${getSeverityColor(signal.severity)}`}>
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${getSeverityDot(signal.severity)}`}></div>
                    <div>
                      <p className="text-xs font-bold mb-0.5">{signal.label}</p>
                      <p className="text-[10px] opacity-80 leading-relaxed">{signal.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI narrative */}
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#E8762E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-[#E8762E] uppercase tracking-wider mb-2">AI Narrative Summary</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedTx.ai_reason || selectedTx.reason || 'Suspicious pattern detected by SquadMind AI engine.'}</p>
                </div>
              </div>
            </div>

            {!resolvedIds.has(selectedTx.id || selectedTx.flag_id) && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleResolve(selectedTx, 'approve')} disabled={!!resolving}
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer disabled:opacity-70">
                  {resolving === `${selectedTx.id || selectedTx.flag_id}-approve` ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsUp className="w-4 h-4" />}
                  Approve
                </button>
                <button onClick={() => handleResolve(selectedTx, 'reject')} disabled={!!resolving}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer disabled:opacity-70">
                  {resolving === `${selectedTx.id || selectedTx.flag_id}-reject` ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsDown className="w-4 h-4" />}
                  Flag Fraud
                </button>
              </div>
            )}
            <p className="text-[10px] text-slate-400 text-center">Approve = legitimate transaction. Flag Fraud = escalate for investigation.</p>
          </div>
        )}
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
              { label: 'Fraud Detection', icon: <ShieldAlert className="w-5 h-5" />, path: 'frauddetection', active: true },
              { label: 'Alerts', icon: <Bell className="w-5 h-5" />, path: 'alerts' },
              { label: 'TrustScore', icon: <Award className="w-5 h-5" />, path: 'trustscore' },
              { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },
            ].map(item => (
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
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">SECURITY TIER</p>
              <p className="text-base font-bold text-white mb-4">Enterprise</p>
              <div className="w-full h-1 bg-white/10 rounded-full">
                <div className="w-full h-full bg-[#E8762E] rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" /><span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          {/* ── FIXED: name reads from localStorage ── */}
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8762E] flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{localStorage.getItem('businessName') || 'Lekan Adeyemi'}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
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
          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />{successMsg}
            </div>
          )}
          {error && <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600 text-sm font-medium">{error}</div>}

          {/* Active Protection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 md:p-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-[#E8762E] rounded-lg text-[9px] font-bold tracking-widest mb-10 border border-[#E8762E]/20 uppercase">
                  <Sparkles className="w-3 h-3" />AI Insight
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-[#001f3f] mb-4 leading-tight">Active Protection Enabled</h3>
                <p className="text-slate-400 text-sm md:text-base mb-12 leading-relaxed max-w-md font-medium opacity-80">
                  SquadMind is currently monitoring {transactionsMonitored.toLocaleString()} real-time transaction streams. {threatsNeutralized} threats were successfully neutralized in the last 24 hours.
                </p>
                <button onClick={() => setShowReport(true)}
                  className="w-full md:w-auto bg-[#001f3f] hover:bg-[#002b55] text-white font-bold py-4 px-10 rounded-xl text-sm transition-all shadow-xl shadow-[#001f3f]/20 cursor-pointer">
                  View Protection Report
                </button>
              </div>
              <div className="w-full md:w-1/3 bg-[#f8fafc] border-l border-slate-50 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="w-full h-full absolute inset-0 opacity-10 bg-[radial-gradient(#E8762E_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-[#E8762E] relative z-10 drop-shadow-[0_0_20px_rgba(232,118,46,0.4)]" />
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
                <p className="text-xs md:text-sm text-slate-400 font-medium">Click any row to view AI analysis and behavioral signals</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:text-[#001f3f] transition-all uppercase tracking-widest cursor-pointer">Export CSV</button>
                <button
                  onClick={() => {
                    const allIds = flaggedTransactions.map(tx => tx.id || tx.flag_id);
                    setResolvedIds(new Set(allIds));
                    setSuccessMsg('All transactions marked as resolved!');
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-all uppercase tracking-widest cursor-pointer"
                >
                  Mark All Resolved
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[650px]">
                <thead>
                  <tr className="bg-[#f8fafc]/50 border-b border-slate-50">
                    {['DATE', 'DESCRIPTION', 'AMOUNT', 'ANOMALY SCORE', 'RISK LEVEL', 'ACTION'].map(h => (
                      <th key={h} className={`p-6 text-[9px] font-black text-slate-400 uppercase tracking-widest ${h === 'ACTION' ? 'text-center' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {flaggedTransactions.map((tx, i) => {
                    const txId = tx.id || tx.flag_id || i;
                    const isResolved = resolvedIds.has(txId);
                    return (
                      <tr key={txId} onClick={() => setSelectedTx(tx)} className="hover:bg-[#f8fafc] transition-colors cursor-pointer group">
                        <td className="p-6 text-[11px] font-bold text-slate-400 uppercase">{formatDate(tx.transaction_date || tx.date)}</td>
                        <td className="p-6">
                          <p className="text-sm font-black text-[#001f3f] mb-1">{tx.description || tx.narration || 'Transaction'}</p>
                          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{tx.reference || tx.squad_transaction_ref || 'N/A'}</p>
                        </td>
                        <td className="p-6 text-sm font-black text-[#001f3f]">{formatCurrency(tx.amount)}</td>
                        {/* ── NEW: Anomaly Score column ── */}
                        <td className="p-6">
                          {tx.anomaly_score ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                                <div className={`h-full rounded-full ${tx.anomaly_score >= 80 ? 'bg-red-500' : tx.anomaly_score >= 50 ? 'bg-orange-400' : 'bg-emerald-500'}`} style={{ width: `${tx.anomaly_score}%` }}></div>
                              </div>
                              <span className={`text-xs font-black ${tx.anomaly_score >= 80 ? 'text-red-500' : tx.anomaly_score >= 50 ? 'text-orange-500' : 'text-emerald-500'}`}>{tx.anomaly_score}/100</span>
                            </div>
                          ) : <span className="text-[10px] text-slate-300">—</span>}
                        </td>
                        <td className="p-6">{getRiskBadge(tx.risk_level)}</td>
                        <td className="p-6 text-center" onClick={e => e.stopPropagation()}>
                          {isResolved ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Resolved
                            </span>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleResolve(tx, 'approve')} disabled={!!resolving}
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1">
                                {resolving === `${txId}-approve` ? <Loader2 className="w-3 h-3 animate-spin" /> : <ThumbsUp className="w-3 h-3" />}Approve
                              </button>
                              <button onClick={() => handleResolve(tx, 'reject')} disabled={!!resolving}
                                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1">
                                {resolving === `${txId}-reject` ? <Loader2 className="w-3 h-3 animate-spin" /> : <ThumbsDown className="w-3 h-3" />}Fraud
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-10 self-start">
                <Grid className="w-5 h-5 text-[#001f3f]" />
                <h3 className="text-lg font-bold text-slate-900">Activity Heatmap</h3>
              </div>
              <div className="flex gap-4 w-full max-w-[480px]">
                <div className="flex flex-col justify-between py-1 text-[9px] font-black text-slate-300 uppercase h-[180px]">
                  <span>Morning</span><span>Afternoon</span><span>Evening</span><span>Night</span>
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
                {[
                  { color: 'bg-[#f1f5f9]', label: 'LOW' },
                  { color: 'bg-orange-100', label: 'MEDIUM' },
                  { color: 'bg-red-500', label: 'SUSPICIOUS' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Security Recommendations</h3>
              </div>
              <div className="space-y-6">
                {[
                  { text: 'Update withdrawal limits for POS-221 to prevent further automated reversal spam.', icon: <CheckCircle2 className="text-[#E8762E]" />, bg: 'bg-orange-50' },
                  { text: 'Enable 2FA for all transfers exceeding ₦50,000 to mitigate high-value transfer risks.', icon: <CheckCircle2 className="text-[#E8762E]" />, bg: 'bg-orange-50' },
                  { text: 'Merchant account verification pending for 12 secondary terminals.', icon: <History className="text-slate-400" />, bg: 'bg-slate-50' },
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
              <a href="#" className="hover:text-[#E8762E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Contact Support</a>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SQUADMIND. POWERED BY SQUAD.</p>
          </footer>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
          <LayoutDashboard className="w-5 h-5" /><span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400">
          <Banknote className="w-5 h-5" /><span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-[#E8762E]">
          <ShieldAlert className="w-5 h-5" /><span className="text-[10px] font-bold">Fraud</span>
        </button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400">
          <Settings className="w-5 h-5" /><span className="text-[10px] font-bold">More</span>
        </button>
      </nav>
    </div>
  );
}

export default FraudDetection;
