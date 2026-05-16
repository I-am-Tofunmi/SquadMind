import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShieldAlert, Bell, Settings, LogOut, HelpCircle,
  Download, Play, CheckCircle2, Lightbulb, AlertTriangle, ChevronRight,
  Sparkles, TrendingUp, Banknote, Award, Loader2, X, Zap
} from 'lucide-react';
import { getLatestForecast, generateForecast, getToken } from '../services/api';

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

// FIX 4: Proper SVG arc-based confidence ring
function ConfidenceRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 136 136">
          <circle cx="68" cy="68" r={radius} fill="none" stroke="#fff7ed" strokeWidth="12" />
          <circle
            cx="68" cy="68" r={radius}
            fill="none"
            stroke="#E8762E"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">{score}</span>
          <span className="text-sm text-slate-400 font-bold">%</span>
        </div>
      </div>
    </div>
  );
}

function CashFlow() {
  const navigate = useNavigate();
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPeak, setSelectedPeak] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // FIX: 7D / 14D / 30D windows instead of calendar dates
  const [selectedWindow, setSelectedWindow] = useState('7d');

  // Liquidity peaks weekly/monthly toggle — now wired up
  const [peaksView, setPeaksView] = useState('weekly');

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  // FIX 5: businessName read once, not inline in JSX
  const [businessName] = useState(() => localStorage.getItem('businessName') || 'Lekan Adeyemi');

  // FIX 7: appId stable via useRef — won't change on re-render
  const appId = useRef('SQ-2026-' + Math.floor(Math.random() * 90000 + 10000)).current;

  const onLogout = () => { localStorage.removeItem('token'); navigate('/login'); };
  const onNavigate = (path) => navigate(`/${path}`);

  useEffect(() => {
    const token = getToken();
    if (!token) { navigate('/login'); return; }
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      setLoading(true);
      const response = await getLatestForecast();
      const data = response?.data || response;
      setForecastData(data && typeof data === 'object' ? data : null);
    } catch (err) {
      setError('Using demo forecast data');
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateForecast = async () => {
    try {
      setGenerating(true);
      await generateForecast();
      await fetchForecast();
      setSuccessMsg('New analysis generated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to generate forecast');
    } finally {
      setGenerating(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₦0';
    return `₦${Number(amount).toLocaleString('en-NG')}`;
  };

  const minRevenue = Number(forecastData?.data?.projected_revenue || forecastData?.projected_revenue || 340000) * 0.9 || 340000;
  const maxRevenue = Number(forecastData?.data?.projected_revenue || forecastData?.projected_revenue || 380000) * 1.1 || 380000;
  const confidenceScore = Number(forecastData?.data?.confidence_score || forecastData?.confidence_score || 92) || 92;
  const aiNarrative = forecastData?.data?.ai_narrative || forecastData?.ai_narrative || 'Based on your last 90 days of Squad transactions, SquadMind predicts a 15% increase in month-end sales due to seasonal trends.';
  const pidginExplanation = forecastData?.pidgin_explanation || 'Your money dey grow! Based on how you dey sell, next month go better pass this month by 15%. Keep the hustle!';

  const liquidityPeaksWeekly = forecastData?.liquidity_peaks || [
    { time: 'Oct 24 — Oct 31', source: 'Payroll Cycle Spike', flow: 85900, risk: 'LOW', status: 'Stable' },
    { time: 'Nov 01 — Nov 07', source: 'Post-Month End Dip', flow: -23450, risk: 'MODERATE', status: 'Watch' },
    { time: 'Nov 08 — Nov 15', source: 'Market Recovery', flow: 114200, risk: 'LOW', status: 'Stable' },
  ];

  const liquidityPeaksMonthly = forecastData?.liquidity_peaks_monthly || [
    { time: 'October 2026', source: 'Q4 Seasonal Uplift', flow: 312400, risk: 'LOW', status: 'Stable' },
    { time: 'November 2026', source: 'Month-End Volatility', flow: -41200, risk: 'HIGH', status: 'Watch' },
    { time: 'December 2026', source: 'Festive Season Peak', flow: 490000, risk: 'LOW', status: 'Stable' },
  ];

  const liquidityPeaks = peaksView === 'weekly' ? liquidityPeaksWeekly : liquidityPeaksMonthly;

  // FIX 7: export uses || fallbacks to handle both API shapes
  const exportReport = () => {
    const rows = [
      ['SquadMind Cash Flow Report'],
      ['Generated:', new Date().toLocaleDateString('en-NG')],
      ['Forecast Window:', selectedWindow.toUpperCase()],
      [''],
      ['FORECAST SUMMARY'],
      ['Expected Min Revenue', formatCurrency(minRevenue)],
      ['Expected Max Revenue', formatCurrency(maxRevenue)],
      ['Confidence Score', `${confidenceScore}%`],
      [''],
      ['LIQUIDITY PEAKS'],
      ['Timeline', 'Source', 'Predicted Flow', 'Risk Level', 'Status'],
      ...liquidityPeaks.map(p => [
        p.time || p.timeline || '',
        p.source || p.predictor || '',
        formatCurrency(Math.abs(p.flow || p.predicted_flow || 0)),
        p.risk || p.risk_level || '',
        p.status || '',
      ]),
      [''],
      ['AI NARRATIVE'],
      [aiNarrative],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'squadmind-cashflow-report.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskStyle = (risk) => {
    const r = (risk || '').toUpperCase();
    if (r === 'HIGH') return { bg: '#fef2f2', color: '#dc2626' };
    if (r === 'MODERATE' || r === 'MEDIUM') return { bg: '#fff7ed', color: '#ea580c' };
    return { bg: '#f0fdf4', color: '#16a34a' };
  };

  const getDotColor = (risk) => {
    const r = (risk || '').toUpperCase();
    if (r === 'HIGH') return 'bg-red-500';
    if (r === 'MODERATE' || r === 'MEDIUM') return 'bg-orange-400';
    return 'bg-emerald-500';
  };

  // FIX 1 + 2: Chart driven by selectedWindow (7D/14D/30D) with data-mapped points
  // Each window defines % progress points that map to SVG Y coords (300 = bottom, 0 = top)
  const windowConfig = {
    '7d': {
      label: '7-Day Forecast',
      description: 'Steady upward trend — payroll cycle incoming.',
      // [x%, y-value 0-100 where 100=high revenue]
      points: [0, 28, 42, 55, 63, 71, 78],
      xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      accuracy: '85%',
    },
    '14d': {
      label: '14-Day Forecast',
      description: 'Dip expected Nov 1–7, recovery from Nov 8.',
      points: [0, 22, 38, 55, 65, 60, 48, 35, 30, 38, 52, 65, 72, 78],
      xLabels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'],
      accuracy: '80%',
    },
    '30d': {
      label: '30-Day Forecast',
      description: 'Q4 seasonal uplift with festive peak in December.',
      points: [0, 10, 18, 25, 35, 42, 38, 30, 28, 36, 45, 52, 60, 65, 62, 58, 55, 60, 68, 72, 75, 78, 80, 82, 85, 86, 87, 88, 90, 92],
      xLabels: ['W1', '', '', '', '', '', '', 'W2', '', '', '', '', '', '', 'W3', '', '', '', '', '', '', 'W4', '', '', '', '', '', '', '', 'D30'],
      accuracy: '72%',
    },
  };

  const renderForecastChart = () => {
    const cfg = windowConfig[selectedWindow];
    const W = 1000;
    const H = 260;
    const PAD = 20;
    const chartW = W - PAD * 2;
    const chartH = H - 60;

    const pts = cfg.points.map((v, i) => {
      const x = PAD + (i / (cfg.points.length - 1)) * chartW;
      const y = PAD + (1 - v / 100) * chartH;
      return { x, y };
    });

    const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = `${linePath} L${pts[pts.length - 1].x},${H - 40} L${PAD},${H - 40} Z`;

    // Show every other label to avoid clutter
    const visibleLabels = cfg.xLabels.filter((_, i) =>
      cfg.points.length <= 8 ? true : i % Math.ceil(cfg.points.length / 8) === 0 || i === cfg.points.length - 1
    );
    const labelIndices = cfg.xLabels.reduce((acc, lbl, i) => {
      if (cfg.points.length <= 8 || i % Math.ceil(cfg.points.length / 8) === 0 || i === cfg.points.length - 1) {
        acc.push(i);
      }
      return acc;
    }, []);

    return (
      <div className="relative w-full" style={{ height: 280 }}>
        <div className="absolute top-0 right-0 flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
          <div className="w-1.5 h-1.5 bg-[#E8762E] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-[#E8762E] uppercase tracking-widest">{cfg.accuracy} accuracy</span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mb-3">{cfg.description}</p>
        <svg className="w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 200 }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct, i) => {
            const y = PAD + (1 - pct / 100) * chartH;
            return (
              <g key={i}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              </g>
            );
          })}
          {/* Y-axis labels */}
          {[{ pct: 100, label: '₦500k' }, { pct: 50, label: '₦350k' }, { pct: 0, label: '₦200k' }].map((item, i) => {
            const y = PAD + (1 - item.pct / 100) * chartH;
            return (
              <text key={i} x={PAD - 4} y={y + 4} textAnchor="end" fontSize="10" fill="#cbd5e1" fontWeight="700">{item.label}</text>
            );
          })}
          {/* Area fill */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8762E" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#E8762E" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGrad)" />
          {/* Line */}
          <path d={linePath} fill="none" stroke="#E8762E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Data points */}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#E8762E" strokeWidth="2" />
          ))}
          {/* Peak dot highlight */}
          {(() => {
            const maxIdx = cfg.points.indexOf(Math.max(...cfg.points));
            const p = pts[maxIdx];
            return (
              <g>
                <circle cx={p.x} cy={p.y} r="6" fill="#E8762E" opacity="0.2" />
                <circle cx={p.x} cy={p.y} r="4" fill="#E8762E" />
              </g>
            );
          })()}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between px-5 mt-1 border-t border-slate-50 pt-2">
          {labelIndices.map((idx) => (
            <span key={idx} className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              {cfg.xLabels[idx]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#E8762E] animate-spin" />
          <p className="text-slate-500 font-medium">Loading cash flow forecast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">

      {/* ── MODALS ── */}
      <Modal isOpen={activeModal === 'insights'} onClose={() => setActiveModal(null)} title="Smart Insights">
        <div className="space-y-5">
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#E8762E] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#E8762E] uppercase tracking-wider mb-2">AI Narrative</p>
                <p className="text-sm text-slate-600 leading-relaxed">{aiNarrative}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Key Predictions</h4>
            {[
              { label: 'Revenue Trend', value: '+15% vs last month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Peak Sales Window', value: 'Oct 24 – Oct 31', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Risk Period', value: 'Nov 01 – Nov 07', color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Recovery Expected', value: 'Nov 08 onwards', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.bg} ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 mb-1">🇳🇬 Pidgin Summary</p>
            <p className="text-sm text-slate-600 leading-relaxed">{pidginExplanation}</p>
          </div>
          <div className="p-4 bg-[#001f3f] rounded-2xl text-white">
            <p className="text-xs font-bold mb-1">💡 Recommended Action</p>
            <p className="text-xs text-slate-300 leading-relaxed">Run promotions before Oct 24 to capitalize on the payroll cycle spike. Consider delaying large expenditures until after Nov 7.</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'risks'} onClose={() => setActiveModal(null)} title="Potential Risks — Nov 1-7">
        <div className="space-y-5">
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Risk Window: Nov 1–7</p>
                <p className="text-sm text-slate-600 leading-relaxed">A cash flow dip of approximately ₦23,450 is predicted during this period based on post-month-end payment cycles and reduced inflow patterns.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Risk Breakdown</h4>
            {[
              { label: 'Predicted Shortfall', value: '₦23,450', severity: 'MODERATE', color: 'text-orange-600' },
              { label: 'Affected Operations', value: 'Payroll & Supplier Payments', severity: 'HIGH', color: 'text-red-600' },
              { label: 'Duration', value: '7 days', severity: 'LOW', color: 'text-emerald-600' },
              { label: 'Recovery Probability', value: '94%', severity: 'LOW', color: 'text-emerald-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
                <div className="text-right">
                  <p className={`text-xs font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-[10px] text-slate-400">{item.severity} impact</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Mitigation Strategies</h4>
            {[
              'Send invoices early — before Oct 28 — to ensure payment before the dip',
              'Negotiate extended payment terms with suppliers for Nov 1-7 period',
              'Consider the ₦150,000 bridge loan offer for zero-interest liquidity cover',
              'Hold off on non-essential capex until after Nov 7 recovery',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setActiveModal('bridge')}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#002b55] transition-colors cursor-pointer">
            View Bridge Loan Offer <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Modal>

      {/* FIX 4: Replaced broken border-trick ring with proper SVG arc ConfidenceRing component */}
      <Modal isOpen={activeModal === 'confidence'} onClose={() => setActiveModal(null)} title="Confidence Score Explained">
        <div className="space-y-5">
          <ConfidenceRing score={confidenceScore} />
          <p className="text-sm text-slate-500 text-center">A score of {confidenceScore}% means our AI model is highly confident in this forecast based on your transaction history.</p>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Score Components</h4>
            {[
              { label: 'Transaction History Depth', score: 94, desc: '90+ days of Squad transaction data' },
              { label: 'Pattern Consistency', score: 88, desc: 'Stable weekly revenue patterns detected' },
              { label: 'Seasonal Adjustment', score: 91, desc: 'Q4 seasonal factors applied' },
              { label: 'Anomaly Detection', score: 96, desc: 'No major anomalies in recent data' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{item.label}</p>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                  <span className="text-sm font-black text-[#E8762E]">{item.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E8762E] rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-[#E8762E]">+2.4% from last run</span> — Your confidence score improved because more transaction data was added since the last forecast cycle.
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'peak'} onClose={() => setActiveModal(null)} title="Liquidity Peak Details">
        {selectedPeak && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Timeline</p>
                <p className="text-sm font-bold text-slate-900">{selectedPeak.time || selectedPeak.timeline}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getDotColor(selectedPeak.risk)}`}></div>
                  <p className="text-sm font-bold text-slate-900">{selectedPeak.status}</p>
                </div>
              </div>
              <div className={`rounded-2xl p-4 col-span-2 ${(selectedPeak.flow || 0) < 0 ? 'bg-red-50' : 'bg-emerald-50'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: (selectedPeak.flow || 0) < 0 ? '#dc2626' : '#16a34a' }}>Predicted Flow</p>
                <p className={`text-2xl font-black ${(selectedPeak.flow || 0) < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {(selectedPeak.flow || 0) < 0 ? '-' : '+'}{formatCurrency(Math.abs(selectedPeak.flow || selectedPeak.predicted_flow || 0))}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-2xl border" style={getRiskStyle(selectedPeak.risk)}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: getRiskStyle(selectedPeak.risk).color }}>Risk Level</span>
                <span className="text-sm font-black" style={{ color: getRiskStyle(selectedPeak.risk).color }}>{selectedPeak.risk || selectedPeak.risk_level}</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Source / Predictor</p>
              <p className="text-sm font-bold text-slate-900">{selectedPeak.source || selectedPeak.predictor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">Recommended Actions</p>
              {(selectedPeak.flow || 0) < 0 ? (
                <>
                  <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600">Send outstanding invoices before this period to improve inflow.</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600">Consider the bridge loan offer to cover this shortfall at 0% interest.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600">Good period to schedule supplier payments and clear outstanding bills.</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600">Consider running promotions to maximize revenue during this peak window.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'bridge'} onClose={() => { setActiveModal(null); setApplied(false); }} title="Squad Bridge Loan Offer">
        <div className="space-y-5">
          <div className="p-6 bg-[#001f3f] rounded-2xl text-white text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">You Qualify For</p>
            <p className="text-4xl font-black text-[#E8762E] mb-1">₦150,000</p>
            <p className="text-xs text-slate-400">Bridge Loan — 0% Interest</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Interest Rate', value: '0%', sub: 'if repaid in 14 days', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Repayment', value: '14 Days', sub: 'flexible extension available', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Approval Time', value: 'Instant', sub: 'powered by TrustScore', color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Disbursement', value: '24hrs', sub: 'to your Squad account', color: 'text-[#E8762E]', bg: 'bg-orange-50' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-2xl p-4 text-center`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${item.color}`}>{item.label}</p>
                <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
                <p className="text-[10px] text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700">Why You Qualify</p>
            {[
              'TrustScore of 74/100 meets minimum threshold',
              'Squad account active with consistent transaction history',
              'Predicted cash flow dip of ₦23,450 during Nov 1-7',
              'Revenue recovery confirmed after Nov 8',
            ].map((reason, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600">{reason}</p>
              </div>
            ))}
          </div>
          {applied ? (
            <div className="space-y-4">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-black text-emerald-700 mb-1">Application Submitted!</p>
                <p className="text-xs text-emerald-600 leading-relaxed">Your bridge loan application for <span className="font-bold">₦150,000</span> has been received.</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Application ID', value: appId, done: true },
                  { label: 'TrustScore Check', value: '74/100 — Approved', done: true },
                  { label: 'Disbursement', value: 'Within 24 hours', done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-medium text-slate-600">{step.label}</span>
                    <div className="flex items-center gap-2">
                      {step.done ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Loader2 className="w-4 h-4 text-[#E8762E] animate-spin" />}
                      <span className="text-xs font-bold text-slate-900">{step.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                setActiveModal(null); setApplied(false);
                setSuccessMsg('Bridge loan application submitted! Disbursement within 24 hours.');
                setTimeout(() => setSuccessMsg(''), 5000);
              }}
                className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#002b55] transition-colors cursor-pointer">
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs text-amber-700 leading-relaxed"><span className="font-bold">Note:</span> This is a demo feature. In production, clicking Apply would connect to Squad's Transfer API.</p>
              </div>
              <button
                onClick={async () => { setApplying(true); await new Promise(r => setTimeout(r, 2000)); setApplying(false); setApplied(true); }}
                disabled={applying}
                className="w-full bg-[#E8762E] text-white font-black py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#E8762E]/90 transition-colors cursor-pointer shadow-lg shadow-[#E8762E]/20 disabled:opacity-70">
                {applying ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing Application...</> : <><Zap className="w-4 h-4" /> Apply Now — Instant Approval</>}
              </button>
            </>
          )}
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
              { label: 'Cash Flow', icon: <Banknote className="w-5 h-5" />, path: 'cashflow', active: true },
              { label: 'Fraud Detection', icon: <ShieldAlert className="w-5 h-5" />, path: 'frauddetection' },
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
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT TIER</p>
              <p className="text-base font-bold text-white mb-4">Pro Business</p>
              <button className="w-full bg-[#E8762E] hover:bg-[#E8762E]/90 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#E8762E]/20 cursor-pointer">
                Upgrade Plan
              </button>
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
          {/* FIX 5: businessName from state, not inline localStorage call */}
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

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex flex-col">
            <div className="hidden sm:flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5">
              <span>Analysis</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#E8762E]">Predictions</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#001f3f] leading-tight">Cash Flow Prediction</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={exportReport}
              className="hidden sm:flex items-center gap-3 px-5 py-3 border border-slate-100 rounded-xl text-[11px] font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm cursor-pointer">
              <Download className="w-4 h-4 text-[#001f3f]" />
              <span>Export Report</span>
            </button>
            <button onClick={handleGenerateForecast} disabled={generating}
              className="flex items-center gap-3 px-6 py-3 bg-[#001f3f] text-white rounded-xl text-[11px] font-black hover:bg-[#002b55] transition-all shadow-xl shadow-[#001f3f]/10 uppercase tracking-widest cursor-pointer disabled:opacity-70">
              {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span className="hidden sm:inline">{generating ? 'Generating...' : 'Run New Analysis'}</span>
              <span className="sm:hidden">Run</span>
            </button>
            <div className="hidden sm:flex items-center gap-4 ml-4 pl-4 border-l border-slate-100">
              <button className="p-2 text-slate-400 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="lg:col-span-3 bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#E8762E] rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AIDA PREDICTION MODEL V2.4</span>
              </div>
              <p className="text-xs md:text-sm font-bold text-slate-400 mb-2">Expected Revenue Next Month</p>
              <h3 className="text-3xl md:text-4xl font-black text-[#001f3f] mb-6 tracking-tight">
                {formatCurrency(minRevenue)} – {formatCurrency(maxRevenue)}
              </h3>

              {/* FIX 2: 7D / 14D / 30D window selector matching one-pager spec */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Forecast Window:</span>
                {[
                  { key: '7d', label: '7 Days' },
                  { key: '14d', label: '14 Days' },
                  { key: '30d', label: '30 Days' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedWindow(item.key)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      selectedWindow === item.key
                        ? 'bg-[#E8762E] text-white shadow-md shadow-[#E8762E]/20'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* FIX 1: Data-driven chart — points map to SVG coords based on selectedWindow */}
              {renderForecastChart()}
            </div>

            <div className="flex flex-col gap-6">
              <div onClick={() => setActiveModal('insights')} className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-[#E8762E]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                    <Lightbulb className="w-6 h-6 text-[#E8762E]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-black text-[#001f3f]">Smart Insights</h4>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#E8762E] transition-colors" />
                    </div>
                    <p className="text-[12px] text-slate-400 leading-relaxed font-medium line-clamp-3">{aiNarrative}</p>
                  </div>
                </div>
              </div>

              <div onClick={() => setActiveModal('risks')} className="bg-[#fff7ed] rounded-[24px] p-8 border border-[#ffedd5] cursor-pointer hover:shadow-md hover:border-orange-300 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#f97316]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-black text-[#9a3412]">Potential risks week ahead</h4>
                      <ChevronRight className="w-4 h-4 text-orange-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <p className="text-[10px] font-black text-[#ea580c] uppercase tracking-widest mb-3">NOV 1-7 FORECAST</p>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Plan your client invoicing strategically to maintain liquid balance during the dip.</p>
                  </div>
                </div>
              </div>

              <div onClick={() => setActiveModal('confidence')} className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col cursor-pointer hover:shadow-md hover:border-[#E8762E]/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">CONFIDENCE SCORE</p>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#E8762E] transition-colors" />
                </div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-4xl font-black text-[#001f3f]">{confidenceScore}%</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-[#E8762E] uppercase tracking-tighter">
                    <TrendingUp className="w-3.5 h-3.5" />+2.4% from last run
                  </div>
                </div>
                <div className="w-full h-2 bg-[#f8fafc] rounded-full overflow-hidden">
                  <div className="h-full bg-[#E8762E] rounded-full transition-all duration-700" style={{ width: `${confidenceScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* FIX 3: Weekly/Monthly toggle now wired to peaksView state */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-12">
            <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#001f3f]">Forecasted Liquidity Peaks</h3>
              <div className="flex items-center bg-[#f8fafc] p-1.5 rounded-xl border border-slate-100">
                <button
                  onClick={() => setPeaksView('weekly')}
                  className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${peaksView === 'weekly' ? 'bg-white shadow-sm text-[#001f3f]' : 'text-slate-300 hover:text-slate-500'}`}>
                  Weekly
                </button>
                <button
                  onClick={() => setPeaksView('monthly')}
                  className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${peaksView === 'monthly' ? 'bg-white shadow-sm text-[#001f3f]' : 'text-slate-300 hover:text-slate-500'}`}>
                  Monthly
                </button>
              </div>
            </div>

            {/* FIX 6: Empty state for no peaks */}
            {liquidityPeaks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <Banknote className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-400 mb-1">No liquidity peaks detected</p>
                <p className="text-xs text-slate-300">Run a new analysis to generate forecast data for this period.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f8fafc]/50">
                      {['TIMELINE', 'SOURCE / PREDICTOR', 'PREDICTED FLOW', 'RISK LEVEL', 'STATUS'].map(h => (
                        <th key={h} className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {liquidityPeaks.map((row, i) => {
                      const style = getRiskStyle(row.risk || row.risk_level);
                      const isNegative = (row.flow || row.predicted_flow || 0) < 0;
                      return (
                        <tr key={i} onClick={() => { setSelectedPeak(row); setActiveModal('peak'); }} className="hover:bg-[#f8fafc] transition-all cursor-pointer group">
                          <td className="p-8 font-black text-[#001f3f] text-sm">{row.time || row.timeline}</td>
                          <td className="p-8 text-slate-400 font-bold text-xs">{row.source || row.predictor}</td>
                          <td className={`p-8 font-black text-sm ${isNegative ? 'text-red-500' : 'text-[#E8762E]'}`}>
                            {isNegative ? '-' : ''}{formatCurrency(Math.abs(row.flow || row.predicted_flow || 0))}
                          </td>
                          <td className="p-8">
                            <span className="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm" style={{ backgroundColor: style.bg, color: style.color }}>
                              {row.risk || row.risk_level}
                            </span>
                          </td>
                          <td className="p-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getDotColor(row.risk || row.risk_level)}`}></div>
                                <span className="text-[11px] font-bold text-slate-500">{row.status}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-[#001f3f] rounded-[48px] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8762E] text-white rounded-lg text-[9px] font-black tracking-widest mb-8 uppercase shadow-lg shadow-[#E8762E]/20">
                <Sparkles className="w-3.5 h-3.5" />PRO FEATURE
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Optimize your liquidity with Squad Loans</h2>
              <p className="text-slate-400 text-sm md:text-lg mb-10 leading-relaxed font-medium opacity-90">
                Based on your predictions Nov 1-7 dip, you qualify for a <span className="text-[#E8762E] font-black italic underline decoration-[#E8762E]/30">₦150,000 bridge loan</span> with 0% interest if repaid within 14 days.
              </p>
              <button onClick={() => setActiveModal('bridge')}
                className="w-full md:w-auto bg-[#E8762E] text-white font-black py-5 px-12 rounded-[20px] text-[13px] transition-all hover:scale-105 shadow-2xl shadow-[#E8762E]/20 uppercase tracking-widest cursor-pointer">
                Get Bridge Offer
              </button>
            </div>
            <div className="hidden lg:flex relative z-10 w-72 h-72 items-center justify-center">
              <div className="absolute inset-0 bg-white/5 rounded-[64px] backdrop-blur-2xl border border-white/10 group-hover:rotate-6 transition-transform"></div>
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-[32px] bg-[#E8762E] flex items-center justify-center shadow-2xl shadow-[#E8762E]/30">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <span className="text-4xl font-black text-white/90">₦</span>
              </div>
            </div>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SQUADMIND AI</p>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">© 2026 SQUADMIND. POWERED BY SQUAD INTELLIGENCE</p>
            </div>
            <div className="flex items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-[#E8762E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#E8762E] transition-colors">Contact Support</a>
            </div>
          </footer>
        </div>
      </main>

      {/* ── MOBILE NAV ── */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
          <LayoutDashboard className="w-5 h-5" /><span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-[#E8762E]">
          <Banknote className="w-5 h-5" /><span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400">
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

export default CashFlow;
