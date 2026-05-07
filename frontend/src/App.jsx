import React, { useState } from 'react';
import { Landmark, Key, Shield, BadgeCheck, Eye, EyeOff } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import CashFlow from './pages/CashFlow';
import FraudDetection from './pages/FraudDetection';

function App() {
  const [view, setView] = useState('landing');
  const [showPassword, setShowPassword] = useState(false);

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} onNavigate={setView} />;
  }

  if (view === 'cashflow') {
    return <CashFlow onLogout={() => setView('landing')} onNavigate={setView} />;
  }

  if (view === 'frauddetection') {
    return <FraudDetection onLogout={() => setView('landing')} onNavigate={setView} />;
  }

  if (view === 'landing') {
    return <Landing onGetStarted={() => setView('connection')} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans relative overflow-hidden">
      {/* Background radial circles decoration (subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-200/50 pointer-events-none hidden md:block"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-slate-200/30 pointer-events-none hidden md:block"></div>
      
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 md:py-6 px-4 md:px-10 relative z-10">
        <div className="text-lg md:text-xl font-bold text-[#1b2559] tracking-tight">
          SquadMind
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 bg-slate-100/80 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-slate-200/50">
          <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Powered by</span>
          <span className="text-[9px] md:text-[10px] font-bold text-[#f97316] uppercase tracking-widest">Squad</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-[500px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 md:p-10 flex flex-col items-center">
          
          {/* Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f0f4f8] rounded-2xl flex items-center justify-center mb-5 md:mb-6">
            <Landmark className="w-6 h-6 md:w-7 md:h-7 text-[#1b2559]" strokeWidth={2} />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-xl md:text-2xl font-bold text-[#1b2559] text-center mb-2 md:mb-3 tracking-tight">
            Connect your Squad account securely
          </h1>
          <p className="text-slate-500 text-xs md:text-sm text-center mb-6 md:mb-8 leading-relaxed max-w-[360px]">
            Integrate your financial data to unlock AI-driven insights and fraud detection.
          </p>

          {/* Primary Button */}
          <button 
            onClick={() => setView('dashboard')}
            className="w-full bg-[#1e3264] hover:bg-[#16254a] text-white font-medium py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mb-6 md:mb-8 shadow-sm text-sm sm:text-base cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Connect via Squad OAuth
          </button>

          {/* Divider */}
          <div className="w-full relative flex items-center justify-center mb-6 md:mb-8">
            <div className="absolute w-full border-t border-slate-200"></div>
            <span className="bg-white px-3 md:px-4 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
              Or use API credentials
            </span>
          </div>

          {/* Form */}
          <form 
            className="w-full"
            onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }}
          >
            <div className="w-full space-y-4 md:space-y-5 mb-6 md:mb-8">
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  Squad API Key
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="sk_live_..." 
                  className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#1e3264] focus:ring-1 focus:ring-[#1e3264] placeholder:text-slate-300 transition-shadow"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  Secret Key
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••••••••••" 
                    className={`w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#1e3264] focus:ring-1 focus:ring-[#1e3264] placeholder:text-slate-300 transition-shadow ${!showPassword ? 'tracking-widest' : ''}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-[#1e3264] transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-4 h-4 sm:w-4 sm:h-4" /> : <EyeOff className="w-4 h-4 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <button 
              type="submit"
              className="w-full bg-transparent border border-[#1e3264] text-[#1e3264] font-medium py-3 sm:py-3.5 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors mb-8 md:mb-10 text-sm sm:text-base cursor-pointer"
            >
              Link via API Keys
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 border-t border-slate-100 pt-6 md:pt-8">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1b2559]" strokeWidth={1.5} />
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-600">Read-only access</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1b2559]" strokeWidth={1.5} />
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-600">Verified by Squad</span>
            </div>
          </div>

          <p className="text-[9px] md:text-[10px] text-slate-400 italic text-center max-w-[380px] leading-relaxed">
            "Your data is secure. We use bank-grade encryption to ensure your financial information remains private and protected at all times."
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-transparent to-slate-200/50 pt-6 pb-20 md:py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] text-slate-500 relative z-10 border-t border-slate-200/30 gap-4 md:gap-0 text-center md:text-left">
        <div className="font-bold text-[#1b2559]">
          SquadMind
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Contact Support</a>
        </div>
        <div>
          © 2026 SquadMind. Powered by <span className="text-[#f97316] font-bold">Squad</span>.
        </div>
      </footer>
    </div>
  );
}

export default App;

