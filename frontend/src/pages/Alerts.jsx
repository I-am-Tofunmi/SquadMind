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
          <h2 className="text-lg font-bold text-slate-900">Intelligence Alerts</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
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
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          
          {/* AI Status Header */}
          <div className="bg-[#e0f2fe] rounded-3xl p-8 mb-10 flex items-center justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00d2ff]"></div>
            
            <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d2ff] text-white rounded text-[9px] font-bold tracking-widest mb-4">
                 AI ENGINE ACTIVE
               </div>
               <h3 className="text-3xl font-bold text-[#0c4a6e] mb-2 leading-tight">Analyzing 4,281 real-time signals</h3>
               <p className="text-[#0369a1] text-base opacity-80 font-medium">
                 We detected 3 high-priority events requiring intervention within the next 2 hours.
               </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm relative z-10 flex flex-col items-center min-w-[140px]">
               <span className="text-3xl font-bold text-[#0c4a6e]">98.2</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SIGNAL ACCURACY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Feed Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
               <div className="flex items-center gap-3 mb-2">
                 <Sparkles className="w-5 h-5 text-[#00d2ff]" />
                 <h3 className="text-xl font-bold text-slate-900">AI Insights Feed</h3>
               </div>
               
               {/* Alert 1: Critical Drop */}
               <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden border-l-[6px] border-l-red-500 hover:shadow-md transition-all">
                 <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-2">
                       <TrendingDown className="w-4 h-4 text-red-500" />
                       <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">CRITICAL DROP</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-400">2h ago</span>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Sales Drop Detected</h4>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">
                     Your sales dropped 40% this week compared to last week. Friday usually peaks — check your stock or pricing.
                   </p>
                   
                   <div className="flex gap-4">
                     <button className="bg-[#001f3f] text-white font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-[#002b55] transition-colors">Analyze Now</button>
                     <button className="bg-white border border-slate-200 text-slate-600 font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-slate-50 transition-colors">Dismiss</button>
                   </div>
                 </div>
               </div>

               {/* Alert 2: Fraud Risk */}
               <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden border-l-[6px] border-l-[#e11d48] hover:shadow-md transition-all">
                 <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-2">
                       <ShieldAlert className="w-4 h-4 text-[#e11d48]" />
                       <span className="text-[11px] font-bold text-[#e11d48] uppercase tracking-widest">FRAUD RISK</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-400">5h ago</span>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Suspicious Reversal Flagged</h4>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">
                     A ₦12,500 reversal was flagged from POS-221 at 2:14 AM — unusual timing and location detected.
                   </p>
                   
                   <button className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-red-700 transition-colors">Review Reversal</button>
                 </div>
               </div>

               {/* Alert 3: Performance Peak */}
               <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden border-l-[6px] border-l-[#00d2ff] hover:shadow-md transition-all">
                 <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-2">
                       <Activity className="w-4 h-4 text-[#00d2ff]" />
                       <span className="text-[11px] font-bold text-[#00d2ff] uppercase tracking-widest">PERFORMANCE PEAK</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-400">1 day ago</span>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Your Best Month Yet 🥳</h4>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">
                     You are up 23% from last month. Your Friday flash promos are working. Well done o!
                   </p>
                   
                   <button className="bg-[#00d2ff] text-[#001f3f] font-bold py-2.5 px-6 rounded-xl text-xs hover:opacity-90 transition-all">Share Stats</button>
                 </div>
               </div>

               {/* Alert 4: VIP Customer */}
               <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden border-l-[6px] border-l-[#f59e0b] hover:shadow-md transition-all">
                 <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-2">
                       <Award className="w-4 h-4 text-[#f59e0b]" />
                       <span className="text-[11px] font-bold text-[#f59e0b] uppercase tracking-widest">VIP CUSTOMER</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-400">2 days ago</span>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-3">New VIP Recognised ⭐</h4>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">
                     Chinedu Stores just completed their 10th purchase this month — your most loyal customer.
                   </p>
                   
                   <button className="bg-white border border-[#f59e0b] text-[#f59e0b] font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-[#fffbeb] transition-colors">Send Reward</button>
                 </div>
               </div>
            </div>

            {/* Integrity Column */}
            <div className="flex flex-col gap-10">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Integrity Summary</h3>
                  
                  {/* Summary Card */}
                  <div className="bg-[#001f3f] rounded-3xl p-8 text-white relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">SMART SUMMARY</p>
                        <div className="mb-8">
                           <span className="text-4xl font-bold block mb-1">11</span>
                           <span className="text-xs text-slate-400 font-medium">Alerts resolved this week</span>
                        </div>
                        <div className="mb-8">
                           <span className="text-3xl font-bold block mb-1">₦442k</span>
                           <span className="text-xs text-slate-400 font-medium">Losses prevented by AI</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#00d2ff] font-bold text-sm">
                           <TrendingUp className="w-4 h-4" />
                           +14.2% Efficiency
                        </div>
                     </div>
                     {/* Abstract shape in bg */}
                     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00d2ff]/10 rounded-full blur-3xl"></div>
                  </div>
               </div>

               {/* Audit Logs */}
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">LATEST AUDIT LOG</p>
                  
                  <div className="space-y-8 mb-10">
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 mb-0.5 leading-tight">POS Reconciliation Validated</p>
                           <p className="text-[11px] text-slate-400 font-medium">Cleared 144 entries, ₦1.1M total</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                           <AlertCircle className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 mb-0.5 leading-tight">New Sub-account Added</p>
                           <p className="text-[11px] text-slate-400 font-medium">Lagos Main Terminal Branch</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                           <Clock className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 mb-0.5 leading-tight">Pending Review</p>
                           <p className="text-[11px] text-slate-400 font-medium">Supplier Invoice #772 (Out of Range)</p>
                        </div>
                     </div>
                  </div>

                  <button className="w-full py-4 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                     View All Audit Logs
                  </button>
               </div>
            </div>
          </div>

          {/* Daily Smart Summary Row */}
          <div className="mt-16 mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Daily Smart Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* Scanned Card */}
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TOTAL SCANNED</p>
                     <Activity className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="mb-8">
                     <span className="text-5xl font-bold text-slate-900 block mb-1">84</span>
                     <span className="text-sm text-slate-400 font-medium">Transactions today</span>
                  </div>
                  <div className="flex gap-1 h-12 items-end">
                     {[20, 35, 25, 45, 60, 30, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-100 rounded-t-sm" style={{height: `${h}%`}}></div>
                     ))}
                  </div>
               </div>

               {/* Anomalies Card */}
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ANOMALIES</p>
                     <FileText className="w-4 h-4 text-red-300" />
                  </div>
                  <div className="mb-8">
                     <span className="text-5xl font-bold text-red-500 block mb-1">02</span>
                     <span className="text-sm text-slate-400 font-medium">Flagged for manual verification</span>
                  </div>
                  <div className="flex gap-1 h-12 items-end">
                     {[10, 20, 100, 30, 60, 20, 10].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${i === 2 ? 'bg-red-500' : i === 4 ? 'bg-orange-400' : 'bg-red-100'}`} style={{height: `${h}%`}}></div>
                     ))}
                  </div>
               </div>

               {/* Health Card */}
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="relative w-24 h-24 shrink-0">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#00d2ff" strokeWidth="8" strokeDasharray="210" strokeDashoffset="50" strokeLinecap="round" />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-slate-900">78</div>
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">HEALTH SCORE</p>
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                     </div>
                     <p className="text-sm font-bold text-slate-900 mb-0.5">Stable</p>
                     <p className="text-[11px] text-slate-400 font-medium">Needs attention</p>
                  </div>
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

export default Alerts;
