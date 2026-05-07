import React from 'react';
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

function Landing({ onGetStarted }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-outfit text-slate-900 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full h-20 bg-[#001f3f] flex items-center justify-between px-6 md:px-20 relative z-50">
        <div className="text-xl font-bold text-white tracking-tight">
          SquadMind
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-white/80">
          <a href="#" className="hover:text-white transition-all">Features</a>
          <a href="#" className="hover:text-white transition-all">Intelligence</a>
          <a href="#" className="hover:text-white transition-all">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="text-[13px] font-bold text-white/80 hover:text-white transition-all cursor-pointer hidden sm:block"
          >
            Login
          </button>
          <button 
            onClick={onGetStarted}
            className="bg-white text-[#001f3f] px-5 md:px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-lg"
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
          <div className="absolute top-20 left-0 w-full bg-[#001f3f] border-t border-white/5 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50">
             <a href="#" className="text-lg font-bold text-white">Features</a>
             <a href="#" className="text-lg font-bold text-white">Intelligence</a>
             <a href="#" className="text-lg font-bold text-white">Pricing</a>
             <button onClick={onGetStarted} className="text-left text-lg font-bold text-white/60">Login</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-20 md:pb-32 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#e0faff] rounded-full mb-8">
           <span className="text-[10px] font-extrabold text-[#00d2ff] uppercase tracking-wider">AI DRIVEN BUSINESS INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#001f3f] tracking-tight mb-8 leading-[1.1] max-w-4xl">
          Your AI CFO.<br />Built for Your Business.
        </h1>

        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mb-12 font-medium leading-relaxed">
          Connect your Squad account. Understand your money in seconds. Gain deep insights into your revenue, forecast cash flow, and secure your transactions with AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-24 w-full sm:w-auto">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-[#001f3f] text-white px-8 py-4 rounded-xl font-bold text-sm hover:translate-y-[-2px] transition-all cursor-pointer shadow-xl shadow-[#001f3f]/20"
          >
            Connect My Squad Account
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-[#001f3f] px-10 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm cursor-pointer">
            View Demo
          </button>
        </div>

        {/* Browser Mockup */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-[24px] md:rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,31,63,0.1)] border border-slate-100 p-2 md:p-3 relative">
           <div className="bg-[#f8fafc] rounded-[18px] md:rounded-[24px] border border-slate-100 overflow-hidden flex flex-col">
              {/* Browser bar */}
              <div className="h-10 md:h-12 border-b border-slate-200/60 bg-white flex items-center justify-between px-4 md:px-6">
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
              <div className="flex h-[300px] md:h-[450px]">
                 <div className="w-16 md:w-48 bg-[#001f3f] h-full p-4 md:p-6 space-y-4 shrink-0 overflow-hidden">
                    <div className="w-full h-6 md:h-8 bg-white/10 rounded-lg mb-6 md:mb-8"></div>
                    <div className="w-full h-2 md:h-3 bg-white/10 rounded-full"></div>
                    <div className="w-3/4 h-2 md:h-3 bg-[#00d2ff] rounded-full"></div>
                    <div className="w-full h-2 md:h-3 bg-white/10 rounded-full"></div>
                 </div>
                 <div className="flex-1 bg-white p-6 md:p-10 flex flex-col gap-6 md:gap-10 overflow-hidden">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2">TOTAL REVENUE</p>
                          <h3 className="text-xl md:text-3xl font-black text-[#001f3f]">₦342,500.00</h3>
                       </div>
                       <div className="w-16 md:w-24 h-8 md:h-12 relative">
                          <svg className="w-full h-full text-[#00d2ff]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3">
                             <path d="M0 30 Q 25 10 50 25 T 100 10" strokeLinecap="round" />
                          </svg>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                       <div className="hidden md:flex h-48 bg-[#f8fafc] rounded-3xl border border-slate-100 p-8 flex-col justify-end gap-2">
                          <div className="flex items-end gap-3 h-32">
                             <div className="flex-1 h-1/2 bg-[#00d2ff]/20 rounded-t-lg"></div>
                             <div className="flex-1 h-3/4 bg-[#00d2ff]/40 rounded-t-lg"></div>
                             <div className="flex-1 h-2/3 bg-[#00d2ff]/60 rounded-t-lg"></div>
                             <div className="flex-1 h-full bg-[#00d2ff] rounded-t-lg"></div>
                          </div>
                       </div>
                       <div className="flex flex-col gap-4">
                          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4">
                             <div className="w-6 h-6 md:w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                             </div>
                             <div>
                                <p className="text-[7px] md:text-[8px] font-bold text-red-600 uppercase tracking-widest mb-1">FRAUD ALERT</p>
                                <p className="text-[9px] md:text-[10px] font-medium text-red-500 leading-tight">Suspicious activity detected in TXN-9021</p>
                             </div>
                          </div>
                          <div className="space-y-3 pt-2">
                             <div className="w-full h-2 md:h-3 bg-slate-100 rounded-full"></div>
                             <div className="w-2/3 h-2 md:h-3 bg-slate-100 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className="py-16 md:py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <BarChart className="w-5 h-5 text-[#00d2ff]" />, title: "Revenue Intelligence", text: "Identify growth patterns and revenue leakage automatically. SquadMind analyzes every transaction to find hidden opportunities for sustainable scale." },
          { icon: <Shield className="w-5 h-5 text-[#00d2ff]" />, title: "Fraud Detection", text: "Stop suspicious activities before they impact your bottom line. Our AI monitors patterns in real-time to safeguard your business revenue." },
          { icon: <Activity className="w-5 h-5 text-[#00d2ff]" />, title: "Cash Flow Forecast", text: "Predict your financial health 90 days out. Smart forecasting helps you make confident decisions about hiring, inventory, and scaling." },
          { icon: <ShieldCheck className="w-5 h-5 text-[#00d2ff]" />, title: "TrustScore", text: "Turn your Squad transaction history into a verified credit score. Access loans and financial services for the first time." }
        ].map((f, i) => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
              {f.icon}
            </div>
            <h4 className="text-base md:text-lg font-bold text-[#001f3f] mb-3 md:mb-4">{f.title}</h4>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
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
                    <CheckCircle2 className="w-3 h-3 text-[#00d2ff]" />
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
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2024 SquadMind. Powered by Squad.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[11px] font-bold text-slate-500">
           <a href="#" className="hover:text-[#001f3f] transition-all">Features</a>
           <a href="#" className="hover:text-[#001f3f] transition-all">Benefits</a>
           <a href="#" className="hover:text-[#001f3f] transition-all">Intelligence</a>
        </div>
        <button className="px-8 py-3 border border-slate-200 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer">
           Connect Now
        </button>
      </footer>

    </div>
  );
}

export default Landing;