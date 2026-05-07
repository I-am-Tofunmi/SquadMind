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
  ShieldCheck,
  TrendingDown,
  Banknote,
  Award,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Clock,
  Download,
  CheckSquare,
  Sparkles
} from 'lucide-react';

function FraudDetection({ onLogout, onNavigate }) {
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
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Banknote className="w-5 h-5" />
              <span className="font-medium text-[15px]">Cash Flow</span>
            </button>
            
            <button 
              onClick={() => onNavigate('frauddetection')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer group"
            >
              <ShieldAlert className="w-5 h-5 text-white" />
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
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">SECURITY TIER</p>
                <p className="text-base font-bold text-white mb-4">Enterprise</p>
                <div className="w-full h-1 bg-white/10 rounded-full">
                  <div className="w-full h-full bg-[#00d2ff] rounded-full"></div>
                </div>
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Fraud Monitor</h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:relative lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Active Protection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            
            {/* Protection Status Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="p-6 md:p-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-[#00d2ff] rounded-lg text-[9px] font-bold tracking-widest mb-6 border border-cyan-100 uppercase">
                  <Sparkles className="w-3 h-3" />
                  AI Monitor
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  Active Protection Enabled
                </h3>
                
                <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">
                  SquadMind is currently monitoring real-time streams. 3 threats neutralized in the last 24 hours.
                </p>
                
                <button className="w-full md:w-auto bg-[#001f3f] hover:bg-[#002b55] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg">
                  Full Report
                </button>
              </div>
              
              <div className="w-full md:w-1/3 bg-slate-100/50 border-l border-slate-50 flex items-center justify-center p-8">
                 <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]" />
              </div>
            </div>

            {/* Risk Score Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 border-l-4 border-l-red-500">
              <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-6">RISKSCORE</p>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl md:text-7xl font-bold text-slate-900 leading-none">94</span>
                <span className="text-lg md:text-xl text-slate-400 font-bold">/100</span>
              </div>
              
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-red-500 w-[94%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-700 leading-tight uppercase">Critical Attention</p>
              </div>
            </div>
          </div>

          {/* Flagged Transactions Table */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Flagged Transactions</h3>
                <p className="text-xs md:text-sm text-slate-400 font-medium">Suspicious patterns identified by AI</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 uppercase">Export</button>
                <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 uppercase">Resolve All</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DATE</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DESCRIPTION</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">AMOUNT</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">RISK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-xs font-medium text-slate-500 uppercase">Oct 12</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-900 mb-1">POS Reversal Spam</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">TXN-9921-XF</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-900">₦12,500</td>
                    <td className="p-6">
                      <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[9px] font-bold uppercase tracking-wider rounded-md">High Risk</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-xs font-medium text-slate-500 uppercase">Oct 11</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-900 mb-1">Duplicate Payment</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">TXN-4820-MQ</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-900">₦5,000</td>
                    <td className="p-6">
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[9px] font-bold uppercase tracking-wider rounded-md">Medium</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Heatmap Area */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 mb-10">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8">Activity Heatmap</h3>
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                 {[...Array(28)].map((_, i) => (
                   <div key={i} className={`aspect-square rounded-md md:rounded-lg ${i % 7 === 0 ? 'bg-red-500' : i % 5 === 0 ? 'bg-orange-300' : 'bg-slate-50'}`}></div>
                 ))}
              </div>
              <div className="mt-8 flex justify-center gap-6">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded bg-slate-100"></div>
                   <span className="text-[9px] font-bold text-slate-400 uppercase">Low</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded bg-orange-300"></div>
                   <span className="text-[9px] font-bold text-slate-400 uppercase">Medium</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded bg-red-500"></div>
                   <span className="text-[9px] font-bold text-slate-400 uppercase">Critical</span>
                 </div>
              </div>
          </div>

          <footer className="py-12 border-t border-slate-100 text-center md:text-left">
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
        <button onClick={() => onNavigate('cashflow')} className="flex flex-col items-center gap-1 text-slate-400">
          <Banknote className="w-5 h-5" />
          <span className="text-[10px] font-bold">Cash</span>
        </button>
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-[#001f3f]">
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

export default FraudDetection;
