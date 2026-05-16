import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShieldAlert, Bell, Settings, LogOut,
  ShieldCheck, Banknote, Award, CheckCircle2, AlertTriangle, Sparkles,
  Grid, History, Loader2, X, ThumbsUp, ThumbsDown, TrendingUp, Shield, Activity,
  HelpCircle, Download, ChevronRight
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

const DEMO_TRANSACTIONS = [
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

function FraudDetection() {
  const navigate = useNavigate();
  const [fraudData, setFraudData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);
  const [resolving, setResolving] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [showReport, setShowReport] = useState(false);

  // FIX 1: businessName read once in state, not inline in JSX
  const [businessName] = useState(() => localStorage.getItem('businessName') || 'Lekan Adeyemi');

  // FIX 3: resolvedIds persisted to sessionStorage so refresh doesn't reset UI
  const [resolvedIds, setResolvedIds] = useState(() => {
    try {
      const saved = sessionStorage.getItem('sm_resolved_fraud');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const persistResolved = (newSet) => {
    try { sessionStorage.setItem('sm_resolved_fraud', JSON.stringify([...newSet])); } catch {}
    setResolvedIds(newSet);
  };

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
      const next = new Set([...resolvedIds, id]);
      persistResolved(next);
      setSuccessMsg(`Transaction ${resolution === 'approve' ? 'approved as legitimate' : 'flagged as fraud'} successfully!`);
      setSelectedTx(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      const next = new Set([...resolvedIds, id]);
      persistResolved(next);
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

  const rawFlags = fraudData?.fraud_flags || fraudData?.flags || fraudData?.items || fraudData;
  const flaggedTransactions = (Array.isArray(rawFlags) && rawFlags.length > 0) ? rawFlags : DEMO_TRANSACTIONS;

  const unresolvedCount = flaggedTransactions.filter(tx => !resolvedIds.has(tx.id || tx.flag_id)).length;

  // FIX 4: Risk score reacts to resolutions — drops ~8pts per resolved high-risk tx, ~4 per medium
  const baseRiskScore = fraudData?.risk_score || 94;
  const derivedRiskScore = Math.max(0, flaggedTransactions.reduce((score, tx) => {
    const id = tx.id || tx.flag_id;
    if (!resolvedIds.has(id)) return score;
    const l = (tx.risk_level || '').toLowerCase();
    if (l === 'high' || l === 'critical') return score - 8;
    if (l === 'medium') return score - 4;
    return score - 2;
  }, baseRiskScore));

  const threatsNeutralized = (fraudData?.threats_neutralized || 3) + resolvedIds.size;
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

  // FIX 2: Shared CSV export logic used by both the table button and Protection Report
  const exportFraudCSV = () => {
    const rows = [
      ['SquadMind Fraud Detection Report'],
      ['Generated:', new Date().toLocaleDateString('en-NG')],
      ['Risk Score:', `${derivedRiskScore}/100`],
      ['Transactions Monitored:', transactionsMonitored],
      ['Threats Neutralized:', threatsNeutralized],
      [''],
      ['FLAGGED TRANSACTIONS'],
      ['Date', 'Description', 'Reference', 'Amount', 'Anomaly Score', 'Risk Level', 'Status'],
      ...flaggedTransactions.map(tx => [
        formatDate(tx.transaction_date || tx.date),
        tx.description || tx.narration || 'Transaction',
        tx.reference || tx.squad_transaction_ref || 'N/A',
        formatCurrency(tx.amount),
        tx.anomaly_score ? `${tx.anomaly_score}/100` : 'N/A',
        tx.risk_level || 'N/A',
        resolvedIds.has(tx.id || tx.flag_id) ? 'Resolved' : 'Pending',
      ]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'squadmind-fraud-report.csv'; a.click();
    URL.revokeObjectURL(url);
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
                <p className="text-2xl font-black text-red-400">{unresolvedCount}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Pending</p>
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
              { label: 'Flagged for Review', value: unresolvedCount.toString(), icon: '⚠️' },
              { label: 'Resolved This Session', value: resolvedIds.size.toString(), icon: '✔️' },
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
                <span className="font-bold text-[#E8762E]">AI Recommendation:</span> Enable 2FA for all transfers above ₦50,000 to reduce your risk score from {derivedRiskScore} to an estimated {Math.max(0, derivedRiskScore - 22)}. This single action eliminates 60% of your current exposure.
              </p>
            </div>
          </div>

          {/* FIX 2: wired to shared exportFraudCSV */}
          <button
            onClick={exportFraudCSV}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4" /> Download Full Report (CSV)
          </button>
        </div>
      </Modal>

      {/* ── TRANSACTION DETAIL MODAL ── */}
      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction Analysis">
        {selectedTx && (
          <div className="space-y-5">
            {resolvedIds.has(selectedTx.id || selectedTx.flag_id) && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 text-sm font-bold text-center">
                ✅ Already Resolved
              </div>
            )}

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

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-bold text-slate-700">Risk Classification</span>
              </div>
              {getRiskBadge(selectedTx.risk_level)}
            </div>

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
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#E8762E]/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-5 h-5" /><span className="text-[15px] font-medium">Help Center</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-5 h-5" /><span className="text-[15px] font-medium">Logout</span>
            </button>
          </div>
          {/* FIX 1: businessName from state + ui-avatars image consistent with CashFlow */}
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8762E] flex items-center justify-center text-white font-bold overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(businessName)}&background=E8762E&color=ffffff`} alt="user" />
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
        {/* FIX 6: Header now consistent with CashFlow — breadcrumb + bell + help */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex flex-col">
            <div className="hidden sm:flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5">
              <span>Security</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#E8762E]">Fraud Detection</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#001f3f] leading-tight">Fraud &amp; Suspicious Activity</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={exportFraudCSV}
              className="hidden sm:flex items-center gap-3 px-5 py-3 border border-slate-100 rounded-xl text-[11px] font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm cursor-pointer">
              <Download className="w-4 h-4 text-[#001f3f]" />
              <span>Export CSV</span>
            </button>
            <div className="hidden sm:flex items-center gap-4 ml-2 pl-4 border-l border-slate-100">
              <button className="p-2 text-slate-400 relative">
                <Bell className="w-5 h-5" />
                {unresolvedCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>}
              </button>
              <button className="p-2 text-slate-400"><HelpCircle className="w-5 h-5" /></button>
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
                  SquadMind is monitoring {transactionsMonitored.toLocaleString()} real-time transaction streams. {threatsNeutralized} threats neutralized in the last 24 hours.
                  {unresolvedCount > 0 && <span className="text-red-500 font-bold"> {unresolvedCount} transactions still pending review.</span>}
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

            {/* FIX 4: Risk score card reacts to resolutions */}
            <div className={`bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 border-l-4 transition-all duration-700 ${
              derivedRiskScore >= 80 ? 'border-l-red-500' : derivedRiskScore >= 50 ? 'border-l-orange-400' : 'border-l-emerald-500'
            }`}>
              <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">RISK SCORE</p>
              {resolvedIds.size > 0 && (
                <p className="text-[10px] text-emerald-600 font-bold mb-4 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> -{baseRiskScore - derivedRiskScore} pts from {resolvedIds.size} resolution{resolvedIds.size > 1 ? 's' : ''}
                </p>
              )}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl md:text-7xl font-bold text-slate-900 leading-none transition-all duration-700">{derivedRiskScore}</span>
                <span className="text-lg md:text-xl text-slate-400 font-bold">/100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div className={`h-full rounded-full transition-all duration-700 ${
                  derivedRiskScore >= 80 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                  derivedRiskScore >= 50 ? 'bg-orange-400' : 'bg-emerald-500'
                }`} style={{ width: `${derivedRiskScore}%` }}></div>
              </div>
              <div className={`flex items-start gap-3 p-4 rounded-2xl border ${
                derivedRiskScore >= 80 ? 'bg-red-50/50 border-red-100/50' :
                derivedRiskScore >= 50 ? 'bg-orange-50/50 border-orange-100/50' : 'bg-emerald-50/50 border-emerald-100/50'
              }`}>
                <AlertTriangle className={`w-5 h-5 shrink-0 ${derivedRiskScore >= 80 ? 'text-red-500' : derivedRiskScore >= 50 ? 'text-orange-400' : 'text-emerald-500'}`} />
                <p className={`text-[10px] font-bold leading-tight uppercase tracking-widest ${
                  derivedRiskScore >= 80 ? 'text-red-600' : derivedRiskScore >= 50 ? 'text-orange-600' : 'text-emerald-600'
                }`}>
                  {derivedRiskScore >= 80 ? 'Critical Attention Required' : derivedRiskScore >= 50 ? 'Moderate Risk — Monitor Closely' : 'Risk Level Acceptable'}
                </p>
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
                {/* FIX 2: Export CSV button now wired to exportFraudCSV */}
                <button
                  onClick={exportFraudCSV}
                  className="px-6 py-2.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:text-[#001f3f] transition-all uppercase tracking-widest cursor-pointer flex items-center gap-2">
                  <Download className="w-3 h-3" />Export CSV
                </button>
                <button
                  onClick={() => {
                    const allIds = flaggedTransactions.map(tx => tx.id || tx.flag_id);
                    persistResolved(new Set(allIds));
                    setSuccessMsg('All transactions marked as resolved!');
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-all uppercase tracking-widest cursor-pointer"
                >
                  Mark All Resolved
                </button>
              </div>
            </div>

            {/* FIX 5: Empty state */}
            {flaggedTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-slate-400 mb-1">No flagged transactions</p>
                <p className="text-xs text-slate-300">SquadMind has not detected any suspicious activity in this period.</p>
              </div>
            ) : (
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
                    {/* FIX 7: Resolved rows move to bottom and fade */}
                    {[
                      ...flaggedTransactions.filter(tx => !resolvedIds.has(tx.id || tx.flag_id)),
                      ...flaggedTransactions.filter(tx => resolvedIds.has(tx.id || tx.flag_id)),
                    ].map((tx, i) => {
                      const txId = tx.id || tx.flag_id || i;
                      const isResolved = resolvedIds.has(txId);
                      return (
                        <tr key={txId} onClick={() => setSelectedTx(tx)}
                          className={`hover:bg-[#f8fafc] transition-all cursor-pointer group ${isResolved ? 'opacity-40' : ''}`}>
                          <td className="p-6 text-[11px] font-bold text-slate-400 uppercase">{formatDate(tx.transaction_date || tx.date)}</td>
                          <td className="p-6">
                            <p className="text-sm font-black text-[#001f3f] mb-1">{tx.description || tx.narration || 'Transaction'}</p>
                            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{tx.reference || tx.squad_transaction_ref || 'N/A'}</p>
                          </td>
                          <td className="p-6 text-sm font-black text-[#001f3f]">{formatCurrency(tx.amount)}</td>
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
            )}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-10 self-start">
                <Grid className="w-5 h-5 text-[#001f3f]" />
                <h3 className="text-lg font-bold text-slate-900">Activity Heatmap</h3>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-auto">Last 4 weeks</span>
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

      {/* ── MOBILE NAV ── */}
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
          {unresolvedCount > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>}
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
