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
  ChevronRight,
  TrendingDown,
  Banknote,
  Award,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Share2,
  Gift,
  MoreVertical,
  Activity,
  ShieldCheck,
  FileText,
  Clock,
  Star,
  History,
  Layout,
  Eye
} from 'lucide-react';

function Alerts() {
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
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Banknote className="w-5 h-5" />
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
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer group"
            >
              <Bell className="w-5 h-5 text-white" />
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Intelligence Alerts</h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:relative lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search alerts or insights..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
               <HelpCircle className="w-5 h-5" />
            </button>
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
          
          {/* AI Status Header */}
          <div className="bg-[#eef2ff] rounded-2xl md:rounded-[32px] p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d2ff] text-white rounded text-[9px] font-bold tracking-widest mb-6 uppercase shadow-sm shadow-[#00d2ff]/20">
                 AI Engine Active
               </div>
               <h3 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-3 leading-tight">Analyzing 4,281 real-time signals</h3>
               <p className="text-[#475569] text-sm md:text-base font-medium opacity-80">
                 We detected 3 high-priority events requiring intervention within the next 2 hours.
               </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-[#001f3f]/5 relative z-10 flex flex-col items-center min-w-[160px]">
               <span className="text-4xl font-black text-[#001f3f]">98.2</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Signal Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Feed Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
               <div className="flex items-center gap-3 mb-4">
                 <Sparkles className="w-5 h-5 text-[#00d2ff]" />
                 <h3 className="text-xl font-bold text-slate-900">AI Insights Feed</h3>
               </div>
               
               {/* Alert Cards */}
               {[
                 { type: 'CRITICAL DROP', color: '#dc2626', title: 'Sales Drop Detected', text: 'Your sales dropped 40% this week compared to last week. Friday usually peaks — check your stock or pricing.', time: '2h ago', buttons: ['Analyze Now', 'Dismiss'] },
                 { type: 'FRAUD RISK', color: '#dc2626', title: 'Suspicious Reversal Flagged', text: 'A ₦12,500 reversal was flagged from POS-221 at 2:14 AM — unusual timing and location detected.', time: '5h ago', buttons: ['Review Reversal'] },
                 { type: 'PERFORMANCE PEAK', color: '#0ea5e9', title: 'Your Best Month Yet 🥳', text: 'You are up 23% from last month. Your Friday flash promos are working. Well done o!', time: '1d ago', buttons: ['Share Stats'] },
                 { type: 'VIP CUSTOMER', color: '#f59e0b', title: 'New VIP Recognised ⭐', text: 'Chinedu Stores just completed their 10th purchase this month — your most loyal customer.', time: '2d ago', buttons: ['Send Reward'] }
               ].map((alert, i) => (
                 <div key={i} className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-l-[4px] hover:shadow-md transition-all`} style={{ borderLeftColor: alert.color }}>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: alert.color }}>{alert.type}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{alert.title}</h4>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 opacity-80 font-medium">{alert.text}</p>
                      <div className="flex gap-4">
                         {alert.buttons.map((btn, bi) => (
                            <button key={bi} className={`px-8 py-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${bi === 0 ? 'bg-[#001f3f] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{btn}</button>
                         ))}
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Integrity Column */}
            <div className="flex flex-col gap-8">
               <h3 className="text-xl font-bold text-slate-900">Integrity Summary</h3>
               <div className="bg-[#001f3f] rounded-[32px] p-10 text-white relative overflow-hidden group">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-10">SMART SUMMARY</p>
                  <div className="mb-8">
                     <span className="text-5xl font-black block mb-2">11</span>
                     <span className="text-[11px] text-slate-400 font-medium opacity-80 uppercase tracking-wider">Alerts resolved this week</span>
                  </div>
                  <div className="mb-8">
                     <span className="text-4xl font-black block mb-2">₦442k</span>
                     <span className="text-[11px] text-slate-400 font-medium opacity-80 uppercase tracking-wider">Losses prevented by AI</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00d2ff] font-bold text-xs uppercase tracking-tight">
                     <TrendingUp className="w-4 h-4" />
                     +14.2% Efficiency
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LATEST AUDIT LOG</p>
                     <Clock className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="space-y-8">
                     {[
                       { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50', title: 'POS Reconciliation Validated', sub: 'Cleared 144 entries, ₦1.1M total' },
                       { icon: <AlertCircle className="text-orange-500" />, bg: 'bg-orange-50', title: 'New Sub-account Added', sub: 'Lagos Main Terminal Branch' },
                       { icon: <History className="text-red-500" />, bg: 'bg-red-50', title: 'Pending Review', sub: 'Supplier Invoice #772 (Out of Range)' }
                     ].map((log, i) => (
                        <div key={i} className="flex gap-4">
                           <div className={`w-9 h-9 rounded-full ${log.bg} flex items-center justify-center shrink-0`}>
                              {React.cloneElement(log.icon, { className: 'w-4 h-4' })}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-slate-900 leading-tight">{log.title}</p>
                              <p className="text-[9px] text-slate-400 font-medium mt-1">{log.sub}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-10 py-3 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">View All Audit Logs</button>
               </div>
            </div>
          </div>

          {/* Daily Smart Summary */}
          <div className="mt-16 mb-12">
             <h3 className="text-2xl font-bold text-slate-900 mb-8">Daily Smart Summary</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'TOTAL SCANNED', icon: <Eye />, value: '84', sub: 'Transactions today', color: 'slate' },
                  { label: 'ANOMALIES', icon: <FileText />, value: '02', sub: 'Flagged for manual verification', color: 'red' },
                  { label: 'HEALTH SCORE', icon: <ShieldCheck />, value: '78', sub: 'Stable - Needs attention', color: 'blue' }
                ].map((kpi, i) => (
                  <div key={i} className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 flex flex-col items-start relative overflow-hidden group">
                     <div className="absolute top-8 right-8 text-slate-300 group-hover:text-[#00d2ff] transition-colors">
                        {React.cloneElement(kpi.icon, { className: 'w-6 h-6' })}
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{kpi.label}</p>
                     
                     {kpi.label === 'HEALTH SCORE' ? (
                       <div className="flex items-center gap-6 w-full">
                          <div className="relative w-20 h-20">
                             <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3"></circle>
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#00d2ff" strokeWidth="3" strokeDasharray="100" strokeDashoffset="22"></circle>
                             </svg>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-black text-[#001f3f]">{kpi.value}</span>
                             </div>
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">Stable</p>
                             <p className="text-[10px] text-slate-400 font-medium">Needs attention</p>
                          </div>
                       </div>
                     ) : (
                       <>
                         <h4 className="text-5xl font-black text-[#001f3f] mb-2">{kpi.value}</h4>
                         <p className="text-xs text-slate-400 font-medium mb-10">{kpi.sub}</p>
                         <div className="w-full flex items-end gap-1.5 h-12">
                            {[20, 30, 25, 45, 35, 65, 40, 55, 30, 45].map((h, bi) => (
                               <div key={bi} className={`flex-1 rounded-t-sm transition-all ${kpi.color === 'red' ? (bi === 5 ? 'bg-red-500' : 'bg-red-100') : 'bg-[#00d2ff]/20'}`} style={{ height: `${h}%` }}></div>
                            ))}
                         </div>
                       </>
                     )}
                  </div>
                ))}
             </div>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
               <span className="text-slate-400 font-black">SQUADMIND AI</span>
               <a href="#" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-slate-500 transition-colors">Terms of Service</a>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2026 SQUADMIND v2.4.1</p>
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
        <button onClick={() => onNavigate('frauddetection')} className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">Fraud</span>
        </button>
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-[#001f3f] relative">
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

export default Alerts;
