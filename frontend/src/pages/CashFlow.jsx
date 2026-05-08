import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ShieldAlert, 
  Bell, 
  Settings, 
  LogOut, 
  HelpCircle,
  Search,
  User,
  Download,
  Play,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Banknote,
  Award,
  MoreVertical,
  Upload,
  Share2
} from 'lucide-react';

function CashFlow() {
  const navigate = useNavigate();
  const onLogout = () => navigate('/');
  const onNavigate = (path) => navigate(`/${path}`);
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#001f3f] flex flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex">
        <div>
          {/* Logo */}
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-0">
              SquadMind AI
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">
              POWERED BY SQUAD
            </p>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-1">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium text-[15px]">Dashboard</span>
            </button>
            
            <button 
              onClick={() => onNavigate('cashflow')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer group"
            >
              <Banknote className="w-5 h-5 text-white" />
              <span className="font-medium text-[15px]">Cash Flow</span>
            </button>
            
            <button 
              onClick={() => onNavigate('frauddetection')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <ShieldAlert className="w-5 h-5" />
              <span className="font-medium text-[15px]">Fraud Detection</span>
            </button>
            
            <button 
              onClick={() => onNavigate('alerts')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium text-[15px]">Alerts</span>
            </button>
            
            <button 
              onClick={() => onNavigate('trustscore')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Award className="w-5 h-5" />
              <span className="font-medium text-[15px]">TrustScore</span>
            </button>
            
            <button 
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium text-[15px]">Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-[#112f4d] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT TIER</p>
                <p className="text-base font-bold text-white mb-4">Pro Business</p>
                <button className="w-full bg-[#00d2ff] hover:bg-[#00d2ff]/90 text-[#001f3f] font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d2ff]/20 cursor-pointer">
                   Upgrade Plan
                </button>
             </div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer group">
                <HelpCircle className="w-5 h-5" />
                <span className="text-[15px] font-medium">Help Center</span>
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-[15px] font-medium">Logout</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-[#00d2ff] flex items-center justify-center text-[#001f3f] font-bold overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Lekan+Adeyemi&background=00d2ff&color=001f3f" alt="Lekan Adeyemi" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">Lekan Adeyemi</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        
        {/* Top Header Bar */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex flex-col">
             <div className="hidden sm:flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5">
                <span>Analysis</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#00d2ff]">Predictions</span>
             </div>
             <h2 className="text-xl md:text-2xl font-black text-[#001f3f] leading-tight">Cash Flow Prediction</h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:relative lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search predictions..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button style={{ cursor: 'pointer' }} className="hidden sm:flex items-center gap-3 px-5 py-3 border border-slate-100 rounded-xl text-[11px] font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">
              <Upload className="w-4 h-4 text-[#001f3f]" />
              <span>Export Report</span>
            </button>
            
            <button style={{ cursor: 'pointer' }} className="flex items-center gap-3 px-6 py-3 bg-[#001f3f] text-white rounded-xl text-[11px] font-black hover:bg-[#002b55] transition-all shadow-xl shadow-[#001f3f]/10 uppercase tracking-widest">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">Run New Analysis</span>
              <span className="sm:hidden">Run</span>
            </button>

            <div className="hidden sm:flex items-center gap-4 ml-4 pl-4 border-l border-slate-100">
               <button className="p-2 text-slate-400 relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
               </button>
               <button className="p-2 text-slate-400">
                  <HelpCircle className="w-5 h-5" />
               </button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Prediction & Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            
            {/* Main Prediction Card */}
            <div className="lg:col-span-3 bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-2 h-2 bg-[#00d2ff] rounded-full"></div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AIDA PREDICTION MODEL V2.4</span>
              </div>
              
              <p className="text-xs md:text-sm font-bold text-slate-400 mb-4">Expected Revenue Next Month</p>
              <h3 className="text-3xl md:text-4xl font-black text-[#001f3f] mb-12 tracking-tight">
                ₦340,000 – ₦380,000
              </h3>
              
              {/* Detailed Prediction Chart */}
              <div className="relative h-[240px] md:h-[320px] w-full flex items-end">
                <div className="absolute top-0 left-0 text-[10px] font-bold text-slate-300">₦500k</div>
                <div className="absolute bottom-12 left-0 text-[10px] font-bold text-slate-300">₦200k</div>
                
                <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <path d="M0,250 L330,220 L660,190 L1000,160 L1000,210 L660,240 L330,270 L0,300 Z" fill="#f0f9ff" className="opacity-60" />
                  <path d="M0,275 L330,245 L660,215 L1000,185" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="4 4" />
                  <line x1="500" y1="40" x2="500" y2="280" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="500" cy="40" r="4" fill="#0ea5e9" />
                </svg>
                
                {/* Labels */}
                <div className="absolute bottom-0 w-full flex justify-between px-1 pt-6 border-t border-slate-50">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">OCT 14</span>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">OCT 21</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-[#001f3f] uppercase tracking-widest">TODAY</span>
                    <div className="w-8 h-1 bg-[#001f3f] rounded-full mt-1"></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">NOV 07, 2023</span>
                </div>
              </div>
            </div>

            {/* Side Insights */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-6 h-6 text-[#00d2ff]" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#001f3f] mb-2">Smart Insights</h4>
                    <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
                      Based on your last 90 days of Squad transactions, SquadMind predicts a <span className="font-bold text-[#0ea5e9]">15% increase</span> in month-end sales due to seasonal trends.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff7ed] rounded-[24px] p-8 border border-[#ffedd5]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#f97316]" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#9a3412] mb-1">Potential risks week ahead</h4>
                    <p className="text-[10px] font-black text-[#ea580c] uppercase tracking-widest mb-3">NOV 1-7 FORECAST</p>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                      Plan your client invoicing strategically to maintain liquid balance during the dip.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">CONFIDENCE SCORE</p>
                <div className="flex items-baseline justify-between mb-4">
                   <span className="text-4xl font-black text-[#001f3f]">92%</span>
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-[#0ea5e9] uppercase tracking-tighter">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +2.4% from last run
                   </div>
                </div>
                <div className="w-full h-2 bg-[#f8fafc] rounded-full overflow-hidden">
                  <div className="h-full bg-[#001f3f] w-[92%] rounded-full shadow-[0_0_10px_rgba(0,31,63,0.1)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast Table Section */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden mb-12">
            <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#001f3f]">Forecasted Liquidity Peaks</h3>
              <div className="flex items-center bg-[#f8fafc] p-1.5 rounded-xl border border-slate-100">
                <button className="px-6 py-2 bg-white shadow-sm rounded-lg text-[10px] font-black text-[#001f3f] uppercase tracking-widest cursor-pointer">Weekly</button>
                <button className="px-6 py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-pointer">Monthly</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-[#f8fafc]/50">
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">TIMELINE</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">SOURCE / PREDICTOR</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">PREDICTED FLOW</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">RISK LEVEL</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {[
                     { time: 'Oct 24 — Oct 31', source: 'Payroll Cycle Spike', flow: '₦85,900', risk: 'LOW', status: 'Stable', riskColor: '#f0fdf4', textColor: '#16a34a', dotColor: 'bg-emerald-500' },
                     { time: 'Nov 01 — Nov 07', source: 'Post-Month End Dip', flow: '-₦23,450', risk: 'MODERATE', status: 'Watch', riskColor: '#fff7ed', textColor: '#ea580c', dotColor: 'bg-orange-400' },
                     { time: 'Nov 08 — Nov 15', source: 'Market Recovery', flow: '₦114,200', risk: 'LOW', status: 'Stable', riskColor: '#f0fdf4', textColor: '#16a34a', dotColor: 'bg-emerald-500' }
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-[#f8fafc] transition-all group">
                        <td className="p-8 font-black text-[#001f3f] text-sm">{row.time}</td>
                        <td className="p-8 text-slate-400 font-bold text-xs">{row.source}</td>
                        <td className={`p-8 font-black text-sm ${row.flow.startsWith('-') ? 'text-red-500' : 'text-[#0ea5e9]'}`}>{row.flow}</td>
                        <td className="p-8">
                          <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm`} style={{ backgroundColor: row.riskColor, color: row.textColor }}>{row.risk}</span>
                        </td>
                        <td className="p-8">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${row.dotColor}`}></div>
                              <span className="text-[11px] font-bold text-slate-500">{row.status}</span>
                           </div>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Promo Section */}
          <div className="bg-[#001f3f] rounded-[48px] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            <div className="relative z-10 max-w-2xl text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0ea5e9] text-white rounded-lg text-[9px] font-black tracking-widest mb-8 uppercase shadow-lg shadow-[#0ea5e9]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  PRO FEATURE
               </div>
               <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Optimize your liquidity with Squad Loans</h2>
               <p className="text-slate-400 text-sm md:text-lg mb-10 leading-relaxed font-medium opacity-90">
                  Based on your predictions Nov 1-7 dip, you qualify for a <span className="text-[#0ea5e9] font-black italic underline decoration-[#0ea5e9]/30">₦150,000 bridge loan</span> with 0% interest if repaid within 14 days. Ensure your operations never stall.
               </p>
               <button style={{ cursor: "pointer" }}   className="w-full md:w-auto bg-[#00d2ff] text-[#001f3f] font-black py-5 px-12 rounded-[20px] text-[13px] transition-all hover:scale-105 shadow-2xl shadow-[#00d2ff]/20 uppercase tracking-widest cursor-pointer">
                  Get Bridge Offer
               </button>
            </div>
            
            <div className="hidden lg:flex relative z-10 w-72 h-72 items-center justify-center">
               <div className="absolute inset-0 bg-white/5 rounded-[64px] backdrop-blur-2xl border border-white/10 group-hover:rotate-6 transition-transform"></div>
               <div className="relative flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-[32px] bg-[#00d2ff] flex items-center justify-center shadow-2xl shadow-[#00d2ff]/30">
                     <TrendingUp className="w-12 h-12 text-[#001f3f]" />
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
               <a href="#" className="hover:text-[#001f3f] transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-[#001f3f] transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-[#001f3f] transition-colors">Contact Support</a>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-3 md:hidden z-50">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-slate-400">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-[#001f3f]">
          <Banknote className="w-5 h-5" />
          <span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">Fraud</span>
        </button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400">
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-bold">More</span>
        </button>
      </nav>

    </div>
  );
}

export default CashFlow;
