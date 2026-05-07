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
  Download,
  Share2,
  CheckCircle2,
  Mail,
  MoreVertical,
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

function TrustScore({ onLogout, onNavigate }) {
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
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium text-[15px]">Alerts</span>
            </button>
            
            <button 
              onClick={() => onNavigate('trustscore')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer group"
            >
              <Award className="w-5 h-5 text-white" />
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">TrustScore</h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Mail className="w-5 h-5" />
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
          
          {/* Main Score Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
            
            {/* TrustScore Visualization Card */}
            <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="relative w-full max-w-[340px] aspect-[2/1] mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <path d="M5,50 A45,45 0 0,1 95,50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5,50 A45,45 0 0,1 78,14" fill="none" stroke="#001f3f" strokeWidth="10" strokeLinecap="round" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold text-slate-900">74<span className="text-xl md:text-2xl text-slate-300">/100</span></span>
                  </div>
               </div>
               
               <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold tracking-wider mb-6 border border-emerald-100 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Good Standing
               </div>
               
               <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">Score is Healthy</h3>
               <p className="text-slate-500 text-sm font-medium mb-10 text-center">Based on last 90 days of transactions</p>
               
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 bg-[#001f3f] text-white font-bold py-3.5 px-8 rounded-xl text-xs transition-all shadow-lg">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-3.5 px-8 rounded-xl text-xs transition-all">
                    <Share2 className="w-4 h-4" />
                    Share with Lender
                  </button>
               </div>
            </div>

            {/* Instant Insights Card */}
            <div className="bg-[#001f3f] rounded-2xl md:rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col">
               <h4 className="text-lg font-bold mb-6">Instant Insights</h4>
               
               <div className="space-y-6 flex-1">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                     </div>
                     <div>
                        <p className="text-sm font-bold">Revenue Up 12%</p>
                        <p className="text-[10px] text-slate-400">Month-over-month growth trend is positive.</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-5 h-5 text-red-400" />
                     </div>
                     <div>
                        <p className="text-sm font-bold">Fraud Alerts</p>
                        <p className="text-[10px] text-slate-400">2 flagged transactions requiring review.</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="h-12 flex items-end gap-1">
                     {[30, 45, 35, 55, 40, 65, 50, 75, 60, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#00d2ff]/40 rounded-t-sm" style={{height: `${h}%`}}></div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Score Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
               {[
                 { label: 'REVENUE', score: '22/25', progress: '88%', color: 'cyan' },
                 { label: 'CUSTOMERS', score: '18/20', progress: '90%', color: 'cyan' },
                 { label: 'FRAUD RATE', score: '18/20', progress: '90%', color: 'emerald' },
                 { label: 'CASHFLOW', score: '16/20', progress: '80%', color: 'cyan' },
                 { label: 'GROWTH', score: '0/15', progress: '5%', color: 'red' }
               ].map((metric, i) => (
                 <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col ${metric.color === 'red' ? 'border-l-4 border-l-red-500' : ''}`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{metric.label}</p>
                    <span className="text-2xl font-bold text-slate-900 mb-4">{metric.score}</span>
                    <div className="mt-auto h-1 bg-slate-50 rounded-full overflow-hidden">
                       <div className={`h-full ${metric.color === 'red' ? 'bg-red-500' : metric.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-400'}`} style={{width: metric.progress}}></div>
                    </div>
                 </div>
               ))}
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
        <button onClick={() => onNavigate('trustscore')} className="flex flex-col items-center gap-1 text-[#001f3f]">
          <Award className="w-5 h-5" />
          <span className="text-[10px] font-bold">Score</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-slate-400">
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-bold">More</span>
        </button>
      </nav>

    </div>
  );
}

const Landmark = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
);

export default TrustScore;
