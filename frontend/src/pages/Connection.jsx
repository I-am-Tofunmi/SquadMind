import React, { useState, useEffect } from 'react';
import { Landmark, Key, Shield, BadgeCheck, Eye, EyeOff, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saveSquadCredentials } from '../services/api';

function Connection() {
  const [showPassword, setShowPassword] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleOAuth = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleConnect = async (e) => {
    if (e) e.preventDefault();
    setIsConnecting(true);
    setError('');
    try {
      await saveSquadCredentials(secretKey, publicKey);
      setTimeout(() => {
        setIsConnecting(false);
        setIsAnalyzing(true);
      }, 2000);
    } catch (err) {
      setIsConnecting(false);
      setError('Invalid credentials. Please check your Squad API keys.');
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => navigate('/dashboard'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-outfit relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Toast */}
      {showToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#E8762E] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-orange-300">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-bold tracking-tight">OAuth Integration Coming Soon</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-10 relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#E8762E] font-bold hover:opacity-70 transition-all cursor-pointer"
        >
          <span className="text-xl tracking-tight">SquadMind</span>
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-orange-100 shadow-sm cursor-pointer">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
          <span className="text-[10px] font-bold text-[#E8762E] uppercase tracking-widest">Squad</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-10">
        <div className="w-full max-w-[480px] bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-[#E8762E]/10 border border-orange-100 p-8 md:p-12 flex flex-col items-center min-h-[500px] justify-center">
          
          {isAnalyzing ? (
            <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#E8762E] text-center mb-4 tracking-tight">
                Squad account connected!
              </h2>
              <p className="text-slate-400 text-sm text-center mb-12 leading-relaxed max-w-[280px] font-medium">
                SquadMind is analyzing your transactions and building your financial profile...
              </p>
              <div className="w-full bg-orange-50 h-3 rounded-full overflow-hidden mb-4 border border-orange-100">
                <div 
                  className="h-full bg-[#E8762E] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between w-full">
                <span className="text-[10px] font-bold text-[#E8762E] uppercase tracking-widest">{progress}% Complete</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic animate-pulse">Processing Data...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                <Landmark className="w-8 h-8 text-[#E8762E]" strokeWidth={2.5} />
              </div>

              <h1 className="text-2xl font-extrabold text-[#E8762E] text-center mb-4 tracking-tight">
                Connect your Squad account
              </h1>
              <p className="text-slate-400 text-sm text-center mb-10 leading-relaxed max-w-[320px] font-medium">
                Integrate your financial data to unlock AI-driven insights and fraud detection.
              </p>

              <button 
                onClick={handleOAuth}
                className="w-full bg-[#E8762E] hover:bg-[#E8762E]/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mb-8 shadow-xl shadow-[#E8762E]/20 cursor-pointer text-base active:scale-95"
              >
                <Key className="w-4 h-4 text-white" />
                Connect via Squad OAuth
              </button>

              <div className="w-full relative flex items-center justify-center mb-8">
                <div className="absolute w-full border-t border-orange-100"></div>
                <span className="bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest relative z-10">
                  Or use API credentials
                </span>
              </div>

              {error && (
                <div className="w-full mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold text-center animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}

              <form className="w-full" onSubmit={handleConnect}>
                <div className="w-full space-y-6 mb-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                      Squad API Key
                    </label>
                    <input 
                      type="text" 
                      required
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      placeholder="sk_live_..." 
                      className="w-full border border-orange-100 bg-orange-50/30 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-2 focus:ring-[#E8762E]/30 outline-none placeholder:text-slate-300 transition-all font-medium"
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
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="••••••••••••••••" 
                        className={`w-full border border-orange-100 bg-orange-50/30 rounded-2xl px-5 py-4 pr-12 text-sm text-slate-900 focus:ring-2 focus:ring-[#E8762E]/30 outline-none placeholder:text-slate-300 transition-all font-medium ${!showPassword ? 'tracking-widest' : ''}`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-[#E8762E] transition-colors focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isConnecting}
                  className="w-full bg-white border-2 border-[#E8762E] text-[#E8762E] font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-orange-50 transition-all mb-10 text-base cursor-pointer active:scale-95 disabled:opacity-70"
                >
                  {isConnecting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    "Link via API Keys"
                  )}
                </button>
              </form>

              <div className="w-full flex justify-center items-center gap-8 mb-8 border-t border-orange-50 pt-10">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#E8762E]" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Read-only</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#E8762E]" strokeWidth={2} />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-300 italic text-center max-w-[320px] leading-relaxed font-medium">
                "Your data is secure. We use bank-grade encryption to ensure your financial information remains private."
              </p>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-10 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-300 relative z-10 border-t border-orange-50 gap-4 uppercase tracking-[0.2em]">
        <div className="text-[#E8762E]">SquadMind</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#E8762E] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#E8762E] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#E8762E] transition-colors">Support</a>
        </div>
        <div>© 2026 SQUADMIND v2.4.1</div>
      </footer>
    </div>
  );
}

export default Connection;
