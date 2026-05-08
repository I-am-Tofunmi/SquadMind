import React, { useState } from 'react';
import { Landmark, Key, Shield, BadgeCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Connection() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleConnect = (e) => {
    if (e) e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-outfit relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-100/30 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-10 relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#001f3f] font-bold hover:opacity-70 transition-all cursor-pointer group"
        >
          <span className="text-xl tracking-tight">SquadMind</span>
        </button>
        <div style={{cursor:'pointer'}} className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
          <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-widest">Squad</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-10">
        <div className="w-full max-w-[480px] bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-[#001f3f]/5 border border-slate-50 p-8 md:p-12 flex flex-col items-center">
          
          {/* Icon */}
          <div className="w-16 h-16 bg-[#f8fafc] rounded-3xl flex items-center justify-center mb-8 shadow-inner">
            <Landmark className="w-8 h-8 text-[#001f3f]" strokeWidth={2.5} />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl font-extrabold text-[#001f3f] text-center mb-4 tracking-tight">
            Connect your Squad account
          </h1>
          <p className="text-slate-400 text-sm text-center mb-10 leading-relaxed max-w-[320px] font-medium">
            Integrate your financial data to unlock AI-driven insights and fraud detection.
          </p>

          {/* Primary Button */}
          <button 
            onClick={handleConnect}
            className="w-full bg-[#001f3f] hover:bg-[#002b55] text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all mb-8 shadow-xl shadow-[#001f3f]/10 cursor-pointer text-base active:scale-95"
          >
            <Key className="w-4 h-4 text-[#00d2ff]" />
            Connect via Squad OAuth
          </button>

          {/* Divider */}
          <div className="w-full relative flex items-center justify-center mb-8">
            <div className="absolute w-full border-t border-slate-100"></div>
            <span className="bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest relative z-10">
              Or use API credentials
            </span>
          </div>

          {/* Form */}
          <form 
            className="w-full"
            onSubmit={handleConnect}
          >
            <div className="w-full space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                  Squad API Key
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="sk_live_..." 
                  className="w-full border-none bg-slate-50 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-2 focus:ring-[#00d2ff]/30 outline-none placeholder:text-slate-300 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                  Secret Key
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••••••••••" 
                    className={`w-full border-none bg-slate-50 rounded-2xl px-5 py-4 pr-12 text-sm text-slate-900 focus:ring-2 focus:ring-[#00d2ff]/30 outline-none placeholder:text-slate-300 transition-all font-medium ${!showPassword ? 'tracking-widest' : ''}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-[#001f3f] transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <button 
              type="submit"
              className="w-full bg-white border-2 border-[#001f3f] text-[#001f3f] font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all mb-10 text-base cursor-pointer active:scale-95"
            >
              Link via API Keys
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="w-full flex justify-center items-center gap-8 mb-8 border-t border-slate-50 pt-10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00d2ff]" strokeWidth={2} />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Read-only</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#00d2ff]" strokeWidth={2} />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-300 italic text-center max-w-[320px] leading-relaxed font-medium">
            "Your data is secure. We use bank-grade encryption to ensure your financial information remains private."
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-10 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-300 relative z-10 border-t border-slate-50 gap-4 uppercase tracking-[0.2em]">
        <div className="text-[#001f3f]">
          SquadMind
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Support</a>
        </div>
        <div>
          © 2026 SQUADMIND v2.4.1
        </div>
      </footer>
    </div>
  );
}

export default Connection;
