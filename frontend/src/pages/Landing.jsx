import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Play,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ChevronRight,
  MessageSquare,
  BarChart,
  Activity,
  ShieldAlert
} from 'lucide-react';

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/register');
  const handleLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-surface flex flex-col font-outfit text-slate-900 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full h-20 bg-primary flex items-center justify-between px-6 md:px-20 relative z-50">
        <div className="text-xl font-bold text-white tracking-tight">
          SquadMind
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-white/80">
          <a href="#features" className="hover:text-white transition-all">Features</a>
          <a href="#intelligence" className="hover:text-white transition-all">Intelligence</a>
          <a href="#pricing" className="hover:text-white transition-all">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogin}
            className="text-[13px] font-bold text-white/80 hover:text-white transition-all cursor-pointer hidden sm:block"
          >
            Login
          </button>
          <button 
            onClick={handleGetStarted}
            className="bg-card text-primary px-5 md:px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-lg"
          >
            Get Started
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
          >
            {isMenuOpen ? <Zap className="w-6 h-6" /> : <BarChart className="w-6 h-6 rotate-90" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-primary border-t border-white/5 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50">
             <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-white">Features</a>
             <a href="#intelligence" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-white">Intelligence</a>
             <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-white">Pricing</a>
             <button onClick={handleLogin} className="text-left text-lg font-bold text-white/60">Login</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-20 md:pb-32 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#e0faff] rounded-full mb-8">
           <span className="text-[10px] font-extrabold text-accent uppercase tracking-wider">AI DRIVEN BUSINESS INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-primary tracking-tight mb-8 leading-[1.1] max-w-4xl">
          Your AI CFO.<br />Built for Your Business.
        </h1>

        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mb-12 font-medium leading-relaxed">
          Connect your Squad account. Understand your money in seconds. Gain deep insights into your revenue, forecast cash flow, and secure your transactions with AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-24 w-full sm:w-auto">
          <button 
            onClick={handleGetStarted}
            className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:translate-y-[-2px] transition-all cursor-pointer shadow-xl shadow-primary/20"
          >
            Connect My Squad Account
          </button>
          <button className="w-full sm:w-auto bg-card border border-slate-200 text-primary px-10 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
            View Demo
          </button>
        </div>

        {/* Browser Mockup */}
        <div className="w-full max-w-5xl mx-auto bg-card rounded-[24px] md:rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,31,63,0.1)] border border-slate-100 p-2 md:p-3 relative">
           <div className="bg-surface rounded-[18px] md:rounded-[24px] border border-slate-100 overflow-hidden flex flex-col">
              {/* Browser bar */}
              <div className="h-10 md:h-12 border-b border-slate-200/60 bg-card flex items-center justify-between px-4 md:px-6">
                 <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-emerald-400"></div>
                 </div>
                 <div className="w-1/2 md:w-1/3 h-5 md:h-6 bg-slate-100 rounded-lg flex items-center px-4">
                    <span className="text-[7px] md:text-[8px] text-slate-300 font-bold uppercase tracking-widest truncate">squadmind.ai/dashboard</span>
                 </div>
                 <div className="w-8 md:w-12 h-2"></div>
              </div>
              {/* Dashboard Content */}
              <div className="flex h-[400px] md:h-[550px] overflow-hidden">
                 {/* Sidebar Mockup */}
                 <div className="w-16 md:w-56 bg-[#001f3f] h-full p-4 md:p-8 space-y-8 shrink-0 flex flex-col">
                    <div className="w-full h-6 md:h-8 bg-white/10 rounded-lg"></div>
                    <div className="space-y-4">
                       {[
                         { w: 'w-full', active: true },
                         { w: 'w-4/5' },
                         { w: 'w-3/4' },
                         { w: 'w-full' },
                         { w: 'w-4/5' },
                         { w: 'w-2/3' }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-md ${item.active ? 'bg-[#00d2ff]' : 'bg-white/10'}`}></div>
                            <div className={`hidden md:block h-2 bg-white/10 rounded-full ${item.w}`}></div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-auto space-y-4">
                       <div className="w-full h-20 bg-white/5 rounded-2xl border border-white/5 hidden md:block"></div>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#00d2ff]"></div>
                          <div className="hidden md:block space-y-1.5">
                             <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                             <div className="w-12 h-1.5 bg-white/10 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Main Content Mockup */}
                 <div className="flex-1 bg-white p-6 md:p-10 flex flex-col gap-8">
                    {/* Header Mockup */}
                    <div className="flex justify-between items-center pb-6 border-b border-slate-50">
                       <div className="w-1/3 h-9 bg-slate-50 rounded-lg hidden sm:block"></div>
                       <div className="flex gap-4">
                          <div className="w-24 h-6 bg-cyan-50 rounded-full hidden sm:block"></div>
                          <div className="w-8 h-8 bg-slate-50 rounded-full"></div>
                       </div>
                    </div>

                    {/* Title Mockup */}
                    <div className="space-y-2">
                       <div className="w-48 h-6 bg-[#001f3f]/5 rounded-md"></div>
                       <div className="w-64 h-3 bg-slate-100 rounded-full"></div>
                    </div>

                    {/* KPI Cards Mockup */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                       {[
                         { icon: true, title: 'REVENUE', val: '₦342k', trend: '+12%' },
                         { icon: true, title: 'TXNS', val: '84', bar: true },
                         { icon: true, title: 'BEST DAY', val: 'Friday' },
                         { icon: true, title: 'HEALTH', val: '78/100', circle: true }
                       ].map((card, i) => (
                         <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                               <div className="w-8 h-8 bg-slate-50 rounded-lg"></div>
                               {card.trend && <div className="w-8 h-4 bg-emerald-50 rounded-md"></div>}
                            </div>
                            <div className="space-y-1">
                               <div className="w-12 h-2 bg-slate-100 rounded-full"></div>
                               <div className="w-16 h-4 bg-slate-900/10 rounded-md"></div>
                            </div>
                            {card.bar && <div className="w-full h-1.5 bg-slate-100 rounded-full"><div className="w-[72%] h-full bg-[#00d2ff] rounded-full"></div></div>}
                         </div>
                       ))}
                    </div>

                    {/* Lower Section Mockup */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
                       <div className="md:col-span-2 bg-[#f8fafc] rounded-2xl border border-slate-100 p-6 flex flex-col justify-end gap-6 overflow-hidden">
                          <div className="flex items-end gap-3 h-24">
                             {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                               <div key={i} className="flex-1 bg-[#00d2ff]/20 rounded-t-lg transition-all hover:bg-[#00d2ff]/40" style={{ height: `${h}%` }}></div>
                             ))}
                          </div>
                       </div>
                       <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 hidden md:block">
                          <div className="w-full h-4 bg-slate-50 rounded-md"></div>
                          <div className="space-y-3">
                             {[1, 2, 3].map(i => (
                               <div key={i} className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-slate-50"></div>
                                  <div className="flex-1 h-2 bg-slate-50 rounded-full"></div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Cards */}
      <section id="features" className="py-16 md:py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <BarChart className="w-5 h-5 text-accent" />, title: "Revenue Intelligence", text: "Identify growth patterns and revenue leakage automatically. SquadMind analyzes every transaction to find hidden opportunities for sustainable scale." },
          { icon: <Shield className="w-5 h-5 text-accent" />, title: "Fraud Detection", text: "Stop suspicious activities before they impact your bottom line. Our AI monitors patterns in real-time to safeguard your business revenue." },
          { icon: <Activity className="w-5 h-5 text-accent" />, title: "Cash Flow Forecast", text: "Predict your financial health 90 days out. Smart forecasting helps you make confident decisions about hiring, inventory, and scaling." },
          { icon: <ShieldCheck className="w-5 h-5 text-accent" />, title: "TrustScore", text: "Turn your Squad transaction history into a verified credit score. Access loans and financial services for the first time." }
        ].map((f, i) => (
          <div key={i} className="bg-card p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
              {f.icon}
            </div>
            <h4 className="text-base md:text-lg font-bold text-primary mb-3 md:mb-4">{f.title}</h4>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section id="intelligence" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-20 shadow-sm border border-slate-100 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8 md:space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#001f3f] tracking-tight">Experience AI-Driven Clarity</h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
              SquadMind isn't just a dashboard—it's your dedicated financial intelligence partner. We run thousands of AI simulations on every transaction for summary strategy.
            </p>
            <div className="space-y-4">
              {[
                "Real-time Squad Integration",
                "Customizable alert thresholds",
                "Automated weekly CFO summaries"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-xs md:text-[13px] font-bold text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-md bg-white rounded-[24px] md:rounded-[32px] shadow-2xl shadow-[#001f3f]/10 border border-slate-100 p-6 md:p-8 relative overflow-hidden">
             <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">TOTAL REVENUE</p>
                   <h4 className="text-xl md:text-2xl font-black text-[#001f3f]">₦342,500.00</h4>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-50 rounded-2xl flex items-center justify-center">
                   <Activity className="w-4 h-4 md:w-5 md:h-5 text-[#00d2ff]" />
                </div>
             </div>
             <div className="h-32 md:h-40 w-full relative z-10">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 120 Q 50 130 100 100 T 200 110 T 300 80 T 400 100 V 150 H 0 Z" fill="url(#gradient)" />
                  <path d="M0 120 Q 50 130 100 100 T 200 110 T 300 80 T 400 100" fill="none" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" />
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="space-y-2">
           <h4 className="text-lg font-black text-[#001f3f]">SquadMind</h4>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SquadMind. Powered by Squad.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[11px] font-bold text-slate-500">
           <a href="#" className="hover:text-[#001f3f] transition-all">Features</a>
           <a href="#" className="hover:text-[#001f3f] transition-all">Benefits</a>
           <a href="#" className="hover:text-[#001f3f] transition-all">Intelligence</a>
        </div>
        <button 
           onClick={handleGetStarted}
           className="px-8 py-3 border border-slate-200 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer"
        >
           Connect Now
        </button>
      </footer>

    </div>
  );
}

export default Landing;
