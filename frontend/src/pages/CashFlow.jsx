import React from 'react';
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
  MoreVertical
} from 'lucide-react';

function CashFlow({ onLogout, onNavigate }) {
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
                <button className="w-full bg-[#00d2ff] hover:bg-[#00d2ff]/90 text-[#001f3f] font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d2ff]/20">
                   Upgrade Plan
                </button>
             </div>
          </div>

          <div className="space-y-1">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-[#00d2ff] flex items-center justify-center text-[#001f3f] font-bold">
                <User className="w-5 h-5" />
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Lekan Adeyemi</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
        
        {/* Top Header Bar */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex flex-col">
             <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <span>Analysis</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#001f3f]">Predictions</span>
             </div>
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Predictions</h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:relative lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden xl:inline">Export</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 md:py-2.5 bg-[#001f3f] text-white rounded-lg text-xs font-bold hover:bg-[#002b55] transition-colors shadow-lg shadow-[#001f3f]/10">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">Run Analysis</span>
              <span className="sm:hidden">Run</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Prediction & Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            
            {/* Main Prediction Card */}
            <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 md:mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">AIDA MODEL V2.4</span>
              </div>
              
              <p className="text-xs md:text-sm font-medium text-slate-500 mb-2">Expected Revenue Next Month</p>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-8 md:mb-12 tracking-tight">
                ₦340k – ₦380k
              </h3>
              
              {/* Detailed Prediction Chart */}
              <div className="relative h-[200px] md:h-[280px] w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <path d="M0,250 L300,220 L600,190 L1000,160 L1000,210 L600,240 L300,270 L0,300 Z" fill="#e0f2fe" className="opacity-40" />
                  <path d="M0,275 L300,245 L600,215 L1000,185" fill="none" stroke="#075985" strokeWidth="3" />
                  <line x1="600" y1="0" x2="600" y2="300" stroke="#00d2ff" strokeWidth="1" opacity="0.3" />
                </svg>
                
                {/* Labels */}
                <div className="absolute bottom-0 w-full flex justify-between px-1 pt-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Oct 14</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-900 uppercase">TODAY</span>
                    <div className="w-6 h-0.5 bg-slate-900 rounded-full mt-0.5"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Nov 07</span>
                </div>
              </div>
            </div>

            {/* Side Insights */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#00d2ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Insights</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Predicted <span className="font-bold text-[#001f3f]">15% increase</span> in month-end sales.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff9f2] rounded-xl md:rounded-2xl p-6 border border-[#ffe4bc]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe4bc]/50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Risk</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Plan client invoicing strategically for the Nov 1-7 dip.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CONFIDENCE</p>
                <span className="text-2xl font-bold text-slate-900">92%</span>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-[#001f3f] w-[92%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast Table Section */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold text-slate-900">Forecasted Peaks</h3>
              <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold text-slate-900 uppercase">Week</button>
                <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase">Month</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Predicted Flow</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-700 text-sm">Oct 24 — Oct 31</td>
                    <td className="p-6 text-slate-500 font-medium text-xs">Payroll Cycle Spike</td>
                    <td className="p-6 font-bold text-[#00838f] text-sm">₦85,900</td>
                    <td className="p-6">
                      <span className="px-2.5 py-1 bg-[#e0f2f1] text-[#00695c] text-[9px] font-bold uppercase rounded">LOW</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-700 text-sm">Nov 01 — Nov 07</td>
                    <td className="p-6 text-slate-500 font-medium text-xs">Post-Month End Dip</td>
                    <td className="p-6 font-bold text-red-500 text-sm">-₦23,450</td>
                    <td className="p-6">
                      <span className="px-2.5 py-1 bg-[#fff8e1] text-[#f57f17] text-[9px] font-bold uppercase rounded">MODERATE</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Promo Section */}
          <div className="bg-[#001f3f] rounded-[32px] md:rounded-[40px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">Squad Loans Offer</h2>
              <p className="text-slate-300 text-sm md:text-lg mb-8 leading-relaxed">
                Qualify for a <span className="text-[#00d2ff] font-bold">₦150,000 bridge loan</span> with 0% interest for 14 days.
              </p>
              <button className="w-full md:w-auto bg-[#00d2ff] text-[#001f3f] font-bold py-4 px-10 rounded-2xl text-sm transition-all hover:scale-105 shadow-xl">
                GET OFFER
              </button>
            </div>
            <div className="hidden md:block relative z-10 w-48 h-48">
               <div className="aspect-square bg-white/5 rounded-[48px] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                  <TrendingUp className="w-16 h-16 text-[#00d2ff]" />
               </div>
            </div>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-12 text-center md:text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2024 SQUADMIND AI</p>
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
