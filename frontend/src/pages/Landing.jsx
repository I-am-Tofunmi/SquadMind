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
  ChevronRight
} from 'lucide-react';

function Landing({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-outfit text-slate-900 overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[1000px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[80%] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[70%] bg-cyan-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[60%] h-[50%] bg-[#001f3f]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="w-full h-24 flex items-center justify-between px-8 md:px-20 relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#001f3f] rounded-xl flex items-center justify-center shadow-lg shadow-[#001f3f]/20">
            <Sparkles className="w-6 h-6 text-[#00d2ff]" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-[#001f3f]">SquadMind</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {['Features', 'Security', 'Pricing', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-[#001f3f] transition-all">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="text-sm font-bold text-[#001f3f] hover:opacity-70 transition-all cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={onGetStarted}
            className="bg-[#001f3f] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xl shadow-[#001f3f]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Connect Squad
            <ArrowRight className="w-4 h-4 text-[#00d2ff]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-8 md:px-20 flex flex-col items-center text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8 animate-fade-in-down">
          <div className="w-2 h-2 bg-[#00d2ff] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Financial intelligence for the informal economy</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-[#001f3f] tracking-tight mb-8 max-w-4xl leading-[1.1]">
          Make your business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001f3f] to-[#00d2ff]">visible</span> to the financial world.
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed">
          Transform your Squad transaction data into real-time business insights, fraud detection, and a lender-ready credit identity.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-24">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-[#00d2ff] text-[#001f3f] px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-[#00d2ff]/30 hover:scale-105 active:scale-95 transition-all"
          >
            Get Started Free
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-[#001f3f] border-2 border-slate-100 bg-white hover:bg-slate-50 transition-all shadow-sm">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 fill-[#001f3f]" />
            </div>
            Watch Demo
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-[#001f3f]/10 border border-slate-100 p-4 relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&q=80&w=2000" 
              alt="SquadMind Dashboard Mockup" 
              className="w-full h-auto rounded-[32px] border border-slate-100 shadow-sm transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </div>
          
          {/* Decorative Floating Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00d2ff]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Empowering merchants across Nigeria</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-2xl font-black text-slate-900 tracking-tighter">GTCO</div>
             <div className="text-2xl font-black text-slate-900 tracking-tighter">HABARIPAY</div>
             <div className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Squad</div>
             <div className="text-2xl font-black text-slate-900 tracking-tighter">UNILAG</div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section */}
      <section id="features" className="py-32 px-8 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#001f3f] tracking-tight mb-6">One data pipeline.<br/>Two powerful outputs.</h2>
                <p className="text-lg text-slate-500 max-w-lg">We transform raw Squad transaction data into automated financial intelligence and a formal credit identity.</p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0">
                    <BarChart3 className="w-7 h-7 text-[#00d2ff]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#001f3f] mb-2">Layer 1: Financial Intelligence</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Your AI CFO gives you real-time revenue insights, fraud detection, and cash flow forecasts in plain English or Pidgin.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Award className="w-7 h-7 text-[#001f3f]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#001f3f] mb-2">Layer 2: TrustScore (Credit Identity)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">An AI credit score built entirely from Squad history. Turn your data into a lender-ready report in one click.</p>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 text-[#001f3f] font-bold text-lg group">
                See all features
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="space-y-6 pt-12">
                <div className="bg-[#001f3f] text-white p-8 rounded-[32px] shadow-xl">
                  <ShieldCheck className="w-10 h-10 text-[#00d2ff] mb-6" />
                  <h5 className="font-bold mb-2">Fraud Protection</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">Real-time anomaly detection for POS reversals.</p>
                </div>
                <div className="bg-[#f8fafc] p-8 rounded-[32px] border border-slate-100">
                  <TrendingUp className="w-10 h-10 text-[#001f3f] mb-6" />
                  <h5 className="font-bold mb-2 text-[#001f3f]">90-Day Forecast</h5>
                  <p className="text-slate-500 text-xs leading-relaxed">Predict future liquidity with 98% accuracy.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#00d2ff] text-[#001f3f] p-8 rounded-[32px] shadow-xl shadow-[#00d2ff]/20">
                  <Zap className="w-10 h-10 text-[#001f3f] mb-6" />
                  <h5 className="font-bold mb-2">Instant Setup</h5>
                  <p className="text-[#001f3f]/70 text-xs leading-relaxed">Connect Squad and get results in 60 seconds.</p>
                </div>
                <div className="bg-[#f8fafc] p-8 rounded-[32px] border border-slate-100">
                  <MessageSquare className="w-10 h-10 text-[#001f3f] mb-6" />
                  <h5 className="font-bold mb-2 text-[#001f3f]">AI Chatbot</h5>
                  <p className="text-slate-500 text-xs leading-relaxed">Financial advice in English and Pidgin.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TrustScore Promo Section */}
      <section className="py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto bg-[#001f3f] rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#001f3f] to-[#00d2ff]/20 z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to unlock your credit identity?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              Stop being invisible. Turn your transaction history into a powerful report that lenders can trust.
            </p>
            <button 
              onClick={onGetStarted}
              className="bg-white text-[#001f3f] px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Building My TrustScore
            </button>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00d2ff]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-20 px-8 md:px-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#001f3f] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00d2ff]" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-[#001f3f]">SquadMind</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                AI-powered financial intelligence and credit identity for Nigerian SMEs. Built on Squad APIs.
              </p>
            </div>
            
            <div>
               <h5 className="font-bold text-[#001f3f] mb-6 uppercase tracking-widest text-[10px]">Product</h5>
               <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">AI CFO Dashboard</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Fraud Detection</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">TrustScore Report</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">API Access</a></li>
               </ul>
            </div>

            <div>
               <h5 className="font-bold text-[#001f3f] mb-6 uppercase tracking-widest text-[10px]">Company</h5>
               <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">About Us</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Success Stories</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Contact</a></li>
               </ul>
            </div>

            <div>
               <h5 className="font-bold text-[#001f3f] mb-6 uppercase tracking-widest text-[10px]">Compliance</h5>
               <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#001f3f] transition-all">Data Security</a></li>
               </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-50">
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Powered by Squad</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2024 SquadMind Inc.</span>
            </div>
            
            <div className="flex gap-6">
              {['𝕏', 'In', 'Fb'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#001f3f] font-bold hover:bg-[#001f3f] hover:text-white transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Landing;