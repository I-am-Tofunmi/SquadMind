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
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden">
      
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
          {/* Upgrade Card */}
          <div className="bg-[#112f4d] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CURRENT TIER</p>
                <p className="text-base font-bold text-white mb-4">Pro Business</p>
                <button className="w-full bg-[#00d2ff] hover:bg-[#00d2ff]/90 text-[#001f3f] font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d2ff]/20">
                  Upgrade Plan
                </button>
             </div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          </div>

          {/* Bottom Links */}
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help Center</span>
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* User Profile */}
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-bold text-slate-900">Fraud & Suspicious Activity</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 ml-2">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Active Protection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            
            {/* Protection Status Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              <div className="p-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-[#00d2ff] rounded-lg text-[9px] font-bold tracking-widest mb-6 border border-cyan-100">
                  <Sparkles className="w-3 h-3" />
                  AI INSIGHT
                </div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  Active Protection Enabled
                </h3>
                
                <p className="text-slate-500 text-base mb-8 leading-relaxed">
                  SquadMind is currently monitoring 1,240 real-time transaction streams. 3 threats were successfully neutralized in the last 24 hours.
                </p>
                
                <button className="bg-[#001f3f] hover:bg-[#002b55] text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg shadow-[#001f3f]/10">
                  View Protection Report
                </button>
              </div>
              
              {/* Circuit Illustration Area */}
              <div className="w-full md:w-1/3 bg-slate-100/50 border-l border-slate-50 flex items-center justify-center p-8 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                       <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                       <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                       <path d="M30,50 L70,50 M50,30 L50,70" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                 </div>
                 <ShieldCheck className="w-20 h-20 text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.3)] relative z-10" />
              </div>
            </div>

            {/* Risk Score Card */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 border-l-4 border-l-red-500">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-6">RISKSCORE</p>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl font-bold text-slate-900 leading-none">94</span>
                <span className="text-xl text-slate-400 font-bold">/100</span>
              </div>
              
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-red-500 w-[94%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-700 leading-tight">
                  Critical Attention Required
                </p>
              </div>
            </div>
          </div>

          {/* Flagged Transactions Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Flagged Transactions</h3>
                <p className="text-sm text-slate-400 font-medium">Suspicious patterns identified by SquadMind AI</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Export CSV
                </button>
                <button className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Mark All Resolved
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DATE</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DESCRIPTION</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">AMOUNT</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">RISK LEVEL</th>
                    <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI REASON</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-500 uppercase">Oct 12</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-900 mb-1">Reversal from POS-221</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">TXN-9921-XF</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-900">₦12,500</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-100">High Risk</span>
                    </td>
                    <td className="p-6">
                      <span className="text-xs italic text-slate-400 font-medium">"Unusual..."</span>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-500 uppercase">Oct 11</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-900 mb-1">Duplicate Payment</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">TXN-4820-MQ</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-900">₦5,000</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-orange-100">Medium Risk</span>
                    </td>
                    <td className="p-6">
                      <span className="text-xs italic text-slate-400 font-medium">"Two..."</span>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm font-medium text-slate-500 uppercase">Oct 09</td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-slate-900 mb-1">Large Transfer</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">TXN-1102-ZZ</p>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-900">₦85,000</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-cyan-100">Low Risk</span>
                    </td>
                    <td className="p-6">
                      <span className="text-xs italic text-slate-400 font-medium">"Transacti..."</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Heatmap & Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Activity Heatmap */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Activity Heatmap</h3>
              </div>
              
              <div className="flex-1 flex flex-col">
                {/* Days Header */}
                <div className="flex mb-4 pl-20">
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                    <span key={day} className="flex-1 text-[9px] font-bold text-slate-300 tracking-widest text-center">{day}</span>
                  ))}
                </div>
                
                {/* Heatmap Grid */}
                {[
                  { label: 'MORNING', cells: [0, 1, 0, 0, 0, 0, 0] },
                  { label: 'AFTERNOON', cells: [0, 0, 1, 1, 1, 0, 0] },
                  { label: 'EVENING', cells: [1, 1, 0, 1, 0, 0, 0] },
                  { label: 'NIGHT', cells: [0, 2, 2, 0, 0, 1, 1] },
                ].map((row, i) => (
                  <div key={i} className="flex items-center mb-2 last:mb-0">
                    <span className="w-20 text-[9px] font-bold text-slate-300 tracking-widest">{row.label}</span>
                    <div className="flex-1 flex gap-2">
                       {row.cells.map((val, j) => (
                         <div 
                           key={j} 
                           className={`flex-1 aspect-[2/1] rounded-md ${
                             val === 2 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]' : 
                             val === 1 ? 'bg-orange-200' : 
                             'bg-slate-50'
                           }`}
                         ></div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-10 flex items-center justify-center gap-8 border-t border-slate-50 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-100"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LOW</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-200"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MEDIUM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SUSPICIOUS</span>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Security Recommendations</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <CheckSquare className="w-4 h-4 text-[#00d2ff]" />, 
                    text: "Update withdrawal limits for POS-221 to prevent further automated reversal spam.",
                    active: true 
                  },
                  { 
                    icon: <CheckSquare className="w-4 h-4 text-[#00d2ff]" />, 
                    text: "Enable 2FA for all transfers exceeding ₦50,000 to mitigate high-value transfer risks.",
                    active: true 
                  },
                  { 
                    icon: <Clock className="w-4 h-4 text-slate-400" />, 
                    text: "Merchant account verification pending for 12 secondary terminals.",
                    active: false 
                  },
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-2xl border transition-all ${item.active ? 'bg-cyan-50/30 border-cyan-100' : 'bg-slate-50/50 border-slate-100'}`}>
                    <div className="flex items-start gap-4">
                       <div className={`mt-1 shrink-0`}>
                          {item.icon}
                       </div>
                       <p className={`text-sm font-medium leading-relaxed ${item.active ? 'text-slate-700' : 'text-slate-500'}`}>
                          {item.text}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Final Footer */}
          <footer className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="font-bold text-slate-900 uppercase tracking-tighter">SquadMind</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              © 2024 SQUADMIND. POWERED BY SQUAD.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">Contact Support</a>
            </div>
          </footer>

        </div>
      </main>

    </div>
  );
}

export default FraudDetection;
