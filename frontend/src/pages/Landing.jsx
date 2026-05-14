import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Shield, TrendingUp, Zap, ChevronRight, ArrowRight,
  BarChart3, ShieldCheck, Bell, Brain, Banknote, Award,
  CheckCircle2, Star, Menu, X, Play
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [counter, setCounter] = useState({ merchants: 0, revenue: 0, threats: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounter({
        merchants: Math.round(ease * 4200),
        revenue: Math.round(ease * 99),
        threats: Math.round(ease * 442),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Revenue Intelligence',
      desc: 'SquadMind reads 90+ days of your Squad transaction history and surfaces patterns you\'d never see manually.',
      tag: 'PREDICTIVE',
      color: 'from-cyan-500/10 to-cyan-500/5',
      border: 'border-cyan-500/20',
      iconBg: 'bg-cyan-500/10 text-[#00d2ff]',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Real-Time Fraud Detection',
      desc: 'HMAC-512 encrypted monitoring flags suspicious reversals, duplicate charges, and off-hours activity before damage is done.',
      tag: 'PROTECTION',
      color: 'from-red-500/10 to-red-500/5',
      border: 'border-red-500/20',
      iconBg: 'bg-red-500/10 text-red-400',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Cash Flow Forecasting',
      desc: 'Predict your next 30-90 days of liquidity with 92% confidence. Know your dips before they happen.',
      tag: 'FORECASTING',
      color: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'TrustScore™ Credit Engine',
      desc: 'Your Squad data becomes a living credit score. Qualify for instant bridge loans without visiting a single bank.',
      tag: 'CREDIT',
      color: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Alert Engine',
      desc: 'Get WhatsApp + email alerts the moment your sales drop, a VIP customer returns, or fraud is detected.',
      tag: 'ALERTS',
      color: 'from-orange-500/10 to-orange-500/5',
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10 text-orange-400',
    },
    {
      icon: <Banknote className="w-6 h-6" />,
      title: 'Instant Bridge Loans',
      desc: 'Qualify in seconds. ₦150k at 0% interest, disbursed within 24 hours via Squad\'s Transfer API. No paperwork.',
      tag: 'LENDING',
      color: 'from-yellow-500/10 to-yellow-500/5',
      border: 'border-yellow-500/20',
      iconBg: 'bg-yellow-500/10 text-yellow-400',
    },
  ];

  const testimonials = [
    { name: 'Amara Okafor', role: 'Founder, Trendy Fabrics Lagos', quote: 'SquadMind told me my Friday sales were dropping 3 weeks before I noticed. I ran a flash promo and recovered ₦180,000 I would have lost.', stars: 5 },
    { name: 'Emeka Nwosu', role: 'CEO, QuickServe Logistics', quote: 'Got a ₦150,000 bridge loan approved in under 10 minutes. No bank visit, no paperwork. Just my Squad data doing the work.', stars: 5 },
    { name: 'Chidinma Eze', role: 'CFO, Eze Group', quote: 'My TrustScore went from 61 to 74 in 4 months. Now Access Bank is calling me — I didn't even approach them.', stars: 5 },
  ];

  return (
    <div className="bg-[#030d1a] text-white min-h-screen font-outfit overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030d1a]/95 backdrop-blur-xl border-b border-white/5 py-3' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00d2ff] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#001f3f]" />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">SquadMind</span>
              <span className="text-[10px] font-bold text-[#00d2ff] ml-1 uppercase tracking-widest">AI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Benefits', 'TrustScore', 'Pricing'].map(item => (
              <a key={item} href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2.5 bg-[#00d2ff] text-[#001f3f] font-black text-sm rounded-xl hover:bg-[#00d2ff]/90 transition-all shadow-lg shadow-[#00d2ff]/20 cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-400 cursor-pointer">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#001f3f] border-t border-white/5 px-6 py-6 space-y-4">
            {['Features', 'Benefits', 'TrustScore', 'Pricing'].map(item => (
              <a key={item} href="#" className="block text-sm font-medium text-slate-300">{item}</a>
            ))}
            <button onClick={() => navigate('/register')} className="w-full mt-4 px-5 py-3 bg-[#00d2ff] text-[#001f3f] font-black text-sm rounded-xl cursor-pointer">
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,210,255,0.08)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,31,63,0.6)_0%,transparent_60%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00d2ff]/3 blur-3xl pointer-events-none"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(0,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/20 rounded-full text-[#00d2ff] text-xs font-black uppercase tracking-widest mb-8">
                <div className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full animate-pulse"></div>
                Intelligence Layer for Squad Accounts
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-8">
                The AI CFO
                <span className="block text-[#00d2ff]">Built for Your</span>
                <span className="block text-slate-300">Business.</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-medium">
                SquadMind transforms your Squad transaction data into actionable financial strategy. Forecast liquidity, stop revenue leakage, and automate your CFO workflows — in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#00d2ff] text-[#001f3f] font-black text-sm rounded-2xl hover:bg-[#00d2ff]/90 transition-all shadow-2xl shadow-[#00d2ff]/20 hover:scale-105 cursor-pointer uppercase tracking-wider"
                >
                  <Zap className="w-4 h-4" /> Connect My Squad Account
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" /> View Demo
                </button>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                <div className="flex -space-x-2">
                  {['AO', 'EN', 'CE', 'BL', 'MO'].map((init, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#001f3f] border-2 border-[#030d1a] flex items-center justify-center text-[9px] font-black text-white">{init}</div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Trusted by <span className="text-white font-bold">4,200+</span> Squad merchants</p>
                </div>
              </div>
            </div>

            {/* Hero visual — dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="relative bg-[#001f3f]/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                {/* Fake dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LIVE DASHBOARD</p>
                    <p className="text-lg font-black text-white">Lekan Stores</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">AI Live</span>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Revenue', value: '₦4.2M', change: '+12%', up: true },
                    { label: 'TrustScore', value: '74/100', change: 'Good', up: true },
                    { label: 'Threats', value: '3', change: 'Blocked', up: false },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{kpi.label}</p>
                      <p className="text-lg font-black text-white">{kpi.value}</p>
                      <p className={`text-[10px] font-bold ${kpi.up ? 'text-emerald-400' : 'text-red-400'}`}>{kpi.change}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-white">Revenue Trend</p>
                    <span className="text-[10px] font-bold text-[#00d2ff]">30D ↑</span>
                  </div>
                  <svg className="w-full h-16" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,60 0,45 50,38 100,30 150,22 200,15 250,8 300,5 300,60" fill="url(#heroGrad)" />
                    <polyline points="0,45 50,38 100,30 150,22 200,15 250,8 300,5" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* AI insight */}
                <div className="bg-[#00d2ff]/5 border border-[#00d2ff]/20 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#00d2ff]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#00d2ff]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-wider mb-1">AI INSIGHT</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Friday flash promos drove +23% this month. Cash flow dip expected Nov 1-7 — bridge loan pre-approved.</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg rotate-3">
                92% Confidence ✓
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#001f3f] border border-[#00d2ff]/30 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg -rotate-2">
                ₦442k saved this week 🛡️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/5 bg-[#001f3f]/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: `${counter.merchants.toLocaleString()}+`, label: 'Squad Merchants Active', color: 'text-[#00d2ff]' },
              { value: `${counter.revenue}%`, label: 'Average Confidence Score', color: 'text-emerald-400' },
              { value: `₦${counter.threats}k`, label: 'Losses Prevented by AI', color: 'text-purple-400' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className={`text-4xl md:text-5xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,31,63,0.8)_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs font-black uppercase tracking-widest mb-6">
              <BarChart3 className="w-3.5 h-3.5" /> Everything You Need
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Your Squad data.<br /><span className="text-[#00d2ff]">Your financial edge.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Six AI-powered modules, one platform. Built exclusively for Nigerian SMEs operating on Squad's payment infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${feat.color} border ${feat.border} rounded-3xl p-8 group hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} flex items-center justify-center`}>
                      {feat.icon}
                    </div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-lg">{feat.tag}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#00d2ff] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-[#001f3f]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">From data to decision<br /><span className="text-[#00d2ff]">in seconds.</span></h2>
            <p className="text-slate-400 text-lg font-medium">No technical setup. No bank visit. Just your Squad account.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Connect Squad', desc: 'Link your Squad merchant account with one click using your API keys.', icon: <Zap className="w-6 h-6" /> },
              { step: '02', title: 'AI Analyzes', desc: 'SquadMind processes 90+ days of transactions and builds your financial profile.', icon: <Brain className="w-6 h-6" /> },
              { step: '03', title: 'Get Intelligence', desc: 'Receive your TrustScore, cash flow forecast, and fraud alerts instantly.', icon: <BarChart3 className="w-6 h-6" /> },
              { step: '04', title: 'Access Capital', desc: 'Qualify for bridge loans using your TrustScore — no paperwork required.', icon: <Banknote className="w-6 h-6" /> },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-8 left-[calc(100%-0px)] w-full h-px bg-gradient-to-r from-[#00d2ff]/30 to-transparent z-0"></div>}
                <div className="relative z-10 bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 hover:border-[#00d2ff]/30 transition-all">
                  <div className="text-[10px] font-black text-[#00d2ff] uppercase tracking-widest mb-4">{item.step}</div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00d2ff]/10 text-[#00d2ff] flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-black text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTSCORE SECTION ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(0,210,255,0.06)_0%,transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/20 rounded-full text-[#00d2ff] text-xs font-black uppercase tracking-widest mb-8">
                <Award className="w-3.5 h-3.5" /> TrustScore™ Engine
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Your Squad history<br /><span className="text-[#00d2ff]">becomes your</span><br />credit score.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                No salary slips. No guarantors. No bank visits. SquadMind's TrustScore™ evaluates your real transaction behaviour and converts it into lender-ready credit intelligence.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Revenue consistency tracked over 90 days',
                  'Repeat customer ratio analyzed in real-time',
                  'Fraud rate benchmarked against platform average',
                  'Cash flow stability scored and projected',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00d2ff] shrink-0" />
                    <span className="text-slate-300 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/register')}
                className="flex items-center gap-3 px-8 py-4 bg-[#00d2ff] text-[#001f3f] font-black text-sm rounded-2xl hover:bg-[#00d2ff]/90 transition-all shadow-lg shadow-[#00d2ff]/20 cursor-pointer"
              >
                Get Your TrustScore Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* TrustScore Visual */}
            <div className="bg-[#001f3f]/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">SAMPLE TRUSTSCORE REPORT</p>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <path d="M5,50 A45,45 0 0,1 95,50" fill="none" stroke="#ffffff10" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5,50 A45,45 0 0,1 79,18" fill="none" stroke="#00d2ff" strokeWidth="10" strokeLinecap="round" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 text-center">
                    <span className="text-4xl font-black text-white">74</span>
                    <span className="text-slate-400 text-sm">/100</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Revenue Consistency', score: 22, max: 25, color: 'bg-[#00d2ff]' },
                  { label: 'Repeat Customers', score: 18, max: 20, color: 'bg-emerald-500' },
                  { label: 'Low Fraud Rate', score: 18, max: 20, color: 'bg-emerald-500' },
                  { label: 'Cash Flow Stability', score: 16, max: 20, color: 'bg-[#00d2ff]' },
                  { label: 'Growth Trend', score: 0, max: 15, color: 'bg-red-500' },
                ].map((comp, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">{comp.label}</span>
                      <span className="text-xs font-black text-white">{comp.score}/{comp.max}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${comp.color} rounded-full`} style={{ width: `${(comp.score / comp.max) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="text-xs font-bold text-emerald-400">✓ Qualifies for ₦150,000 Bridge Loan at 0% interest</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-[#001f3f]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What merchants say</h2>
            <p className="text-slate-400 text-lg font-medium">Real results from real Squad businesses across Nigeria.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 hover:border-[#00d2ff]/20 transition-all">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.stars)].map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-medium mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#001f3f] flex items-center justify-center text-xs font-black text-white">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#001f3f]/60 border border-white/5 rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,210,255,0.05)_0%,transparent_70%)]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-8">
                <ShieldCheck className="w-3.5 h-3.5" /> Security & Trust
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Bank-grade security.<br /><span className="text-[#00d2ff]">Fintech-speed delivery.</span></h2>
              <p className="text-slate-400 text-lg font-medium mb-12 max-w-2xl mx-auto">
                Your data is encrypted and protected with the same standards used by global financial institutions. HMAC-SHA512 verified. GTCO Ecosystem powered.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <Shield className="w-6 h-6" />, label: 'HMAC-SHA512 Encrypted' },
                  { icon: <ShieldCheck className="w-6 h-6" />, label: 'Squad API Verified' },
                  { icon: <Zap className="w-6 h-6" />, label: 'Real-time Monitoring' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, label: 'GTCO Compliant' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="text-xs font-bold text-slate-400 text-center">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,210,255,0.08)_0%,transparent_60%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to automate your<br /><span className="text-[#00d2ff]">financial intelligence?</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium mb-12 max-w-2xl mx-auto">
            Join the next generation of founders using AI to master their cash flow. Connect your Squad account in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-[#00d2ff] text-[#001f3f] font-black text-base rounded-2xl hover:bg-[#00d2ff]/90 transition-all shadow-2xl shadow-[#00d2ff]/20 hover:scale-105 cursor-pointer uppercase tracking-wider"
            >
              <Zap className="w-5 h-5" /> Launch My AI CFO
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-base rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
            >
              Already have an account
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-6 font-medium">Free to start · No credit card required · Powered by Squad API</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#00d2ff] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#001f3f]" />
                </div>
                <span className="text-lg font-black text-white">SquadMind AI</span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mb-6">
                The AI intelligence layer for Squad accounts. Built for Nigerian SMEs who are serious about financial growth.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                All systems operational
              </div>
            </div>
            {[
              {
                title: 'Features',
                links: ['Revenue Intelligence', 'Fraud Detection', 'Cash Flow Forecast', 'TrustScore™', 'Smart Alerts', 'Bridge Loans'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Privacy Policy', 'Terms of Service', 'Contact Support', 'docs.squadco.com'],
              },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 font-medium">© 2026 SquadMind. Powered by Squad · HabariPay · GTCO Ecosystem</p>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-widest">Squad Hackathon 3.0 — Smart Systems: The Intelligent Economy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
