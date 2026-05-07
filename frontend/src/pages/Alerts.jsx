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
  Clock
} from 'lucide-react';

function Alerts({ onLogout, onNavigate }) {
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Alerts</h2>
          
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
          
          {/* AI Status Header */}
          <div className="bg-[#e0f2fe] rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d2ff] text-white rounded text-[9px] font-bold tracking-widest mb-4 uppercase">
                 AI Engine Active
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-[#0c4a6e] mb-2 leading-tight">3 high-priority events</h3>
               <p className="text-[#0369a1] text-sm md:text-base opacity-80 font-medium">
                 Requiring intervention within the next 2 hours.
               </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm relative z-10 flex flex-col items-center min-w-[140px]">
               <span className="text-3xl font-bold text-[#0c4a6e]">98.2</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Feed Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
               <div className="flex items-center gap-3 mb-2">
                 <Sparkles className="w-5 h-5 text-[#00d2ff]" />
                 <h3 className="text-xl font-bold text-slate-900">Live Feed</h3>
               </div>
               
               {/* Alert Cards */}
               {[
                 { type: 'CRITICAL DROP', color: 'red', title: 'Sales Drop Detected', text: 'Your sales dropped 40% this week. Friday usually peaks — check your stock.', time: '2h ago' },
                 { type: 'FRAUD RISK', color: '#e11d48', title: 'Suspicious Reversal', text: 'A ₦12,500 reversal was flagged from POS-221 at 2:14 AM.', time: '5h ago' },
                 { type: 'PERFORMANCE', color: '#00d2ff', title: 'Your Best Month Yet 🥳', text: 'You are up 23% from last month. Well done o!', time: '1d ago' }
               ].map((alert, i) => (
                 <div key={i} className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-l-[6px] hover:shadow-md transition-all`} style={{ borderLeftColor: alert.color }}>
                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: alert.color }}>{alert.type}</span>
                        <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{alert.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{alert.text}</p>
                      <button className="w-full md:w-auto bg-[#001f3f] text-white font-bold py-2.5 px-6 rounded-xl text-xs">View Details</button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Integrity Column */}
            <div className="flex flex-col gap-8">
               <h3 className="text-xl font-bold text-slate-900 mb-2">Integrity</h3>
               <div className="bg-[#001f3f] rounded-3xl p-8 text-white relative overflow-hidden">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">SUMMARY</p>
                  <div className="mb-6">
                     <span className="text-4xl font-bold block mb-1">11</span>
                     <span className="text-[11px] text-slate-400 font-medium">Alerts resolved</span>
                  </div>
                  <div className="mb-6">
                     <span className="text-3xl font-bold block mb-1">₦442k</span>
                     <span className="text-[11px] text-slate-400 font-medium">Losses prevented</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00d2ff] font-bold text-xs uppercase">
                     <TrendingUp className="w-3 h-3" />
                     +14.2% Efficiency
                  </div>
               </div>

               <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Latest Log</p>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">POS Reconciliation Validated</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                           <AlertCircle className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">New Sub-account Added</p>
                     </div>
                  </div>
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
