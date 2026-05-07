import React from 'react';
import { ArrowRight, BarChart3, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';

function Landing({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800">
      
      {/* Navbar */}
      <nav className="w-full bg-[#1b2559] px-6 py-4 flex justify-between items-center text-white relative z-20">
        <div className="text-xl font-bold tracking-tight">
          SquadMind
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="text-sm font-medium hover:text-slate-300 transition-colors hidden sm:block cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={onGetStarted}
            className="bg-white text-[#1b2559] text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-12 px-6 flex flex-col items-center text-center z-10 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-200/50 text-[#1b2559] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b2559]"></span>
          Now Integrated with Squad
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-2">
          <span className="text-black">Your AI CFO.</span><br />
          <span className="text-[#1b2559]">Built for Your Business.</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-[600px] mx-auto mt-6 mb-10 leading-relaxed">
          Connect your Squad account. Understand your money in seconds. Gain deep insights into your revenue, forecast cashflow, and secure your transactions with AI.
        </p>

        {/* Hero Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 z-10">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-[#1b2559] hover:bg-[#161f4c] text-white font-medium px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            Connect My Squad Account
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-[#1b2559] hover:bg-slate-50 font-medium px-8 py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            View Demo
          </button>
        </div>

        {/* Hero Image Mockup Container */}
        <div className="w-full max-w-[800px] aspect-[16/9] bg-[#0a0a0a] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center group z-10">
           {/* Faux Dashboard Visuals for Mockup */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/80 z-10"></div>
           <div className="w-full h-full p-8 flex flex-col gap-6 relative z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <div className="w-full h-8 flex gap-2">
                <div className="w-1/3 h-full bg-emerald-500/20 rounded border border-emerald-500/30"></div>
                <div className="w-2/3 h-full bg-slate-800/50 rounded border border-slate-700"></div>
              </div>
              <div className="flex-1 w-full border border-emerald-500/20 bg-emerald-900/10 rounded-xl relative flex items-end p-4 gap-1">
                 {/* Faux Bars */}
                 {[...Array(40)].map((_, i) => (
                   <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%`, opacity: Math.random() * 0.5 + 0.3 }}></div>
                 ))}
                 <div className="absolute left-8 top-8 w-32 h-32 rounded-full border-4 border-emerald-500/40 border-t-emerald-400 border-r-emerald-400"></div>
              </div>
           </div>
           {/* Gloss Overlay */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[1100px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
            <BarChart3 className="w-5 h-5 text-[#1b2559]" />
          </div>
          <h3 className="text-lg font-bold text-[#1b2559] mb-3">Revenue Intelligence</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Identify growth patterns and revenue leakage automatically. SquadMind analyzes every transaction to find hidden opportunities in your sales data.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
            <Shield className="w-5 h-5 text-[#1b2559]" />
          </div>
          <h3 className="text-lg font-bold text-[#1b2559] mb-3">Fraud Detection</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Stop suspicious activities before they impact your balance. Our AI monitors patterns in real-time to safeguard your business revenue.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
            <TrendingUp className="w-5 h-5 text-[#1b2559]" />
          </div>
          <h3 className="text-lg font-bold text-[#1b2559] mb-3">Cash Flow Forecast</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Predict your financial health 90 days out. Smart forecasting helps you make confident decisions about hiring, inventory, and scaling.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full max-w-[1100px] mx-auto px-6 py-12 mb-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1b2559] tracking-tight">
              Experience AI-Driven Clarity
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              SquadMind isn't just a dashboard—it's your dedicated financial intelligence partner. We turn thousands of raw transactions into actionable strategy.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1b2559]" strokeWidth={2} />
                <span className="text-sm font-medium text-slate-700">Real-time Squad integration</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1b2559]" strokeWidth={2} />
                <span className="text-sm font-medium text-slate-700">Customizable alert thresholds</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1b2559]" strokeWidth={2} />
                <span className="text-sm font-medium text-slate-700">Automated weekly CFO summaries</span>
              </li>
            </ul>
          </div>

          {/* Side Mockup */}
          <div className="flex-1 w-full max-w-[450px] aspect-[4/3] bg-[#0a0a0a] rounded-2xl overflow-hidden relative shadow-inner border border-slate-800 flex items-center justify-center p-6">
            {/* Faux gauges */}
            <div className="w-full h-full flex flex-col gap-4">
               <div className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-900/10 flex items-center justify-center relative">
                 <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500/20 border-t-emerald-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                   <span className="text-emerald-400 font-bold">82.1k</span>
                 </div>
               </div>
               <div className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-900/10 flex items-center justify-center relative">
                 <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500/20 border-b-emerald-400 flex items-center justify-center">
                   <span className="text-emerald-400 font-bold">100%</span>
                 </div>
               </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-8 px-6 md:px-10 mt-auto">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-bold text-[#1b2559] text-lg">SquadMind</span>
            <span className="text-[10px] text-slate-400">© 2026 SquadMind. Powered by Squad</span>
          </div>
          
          <div className="flex gap-6 text-[11px] font-medium text-slate-500">
            <a href="#" className="hover:text-[#1b2559] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1b2559] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1b2559] transition-colors">Contact Support</a>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Powered by</span>
            <span className="text-[9px] font-bold text-[#f97316] uppercase tracking-widest">Squad</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Landing;
 