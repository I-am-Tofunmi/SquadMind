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
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data assets..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Wallet className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6 ml-2">
               <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">Lekan Adeyemi</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Merchant Admin</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-[#001f3f] flex items-center justify-center text-white font-bold">
                  LA
               </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Main Score Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            
            {/* TrustScore Visualization Card */}
            <div className="lg:col-span-3 bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group">
               {/* Semi-circular gauge */}
               <div className="relative w-[340px] h-[170px] mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <path d="M5,50 A45,45 0 0,1 95,50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5,50 A45,45 0 0,1 78,14" fill="none" stroke="#001f3f" strokeWidth="10" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                    <span className="text-6xl font-bold text-slate-900">74<span className="text-2xl text-slate-300">/100</span></span>
                  </div>
               </div>
               
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold tracking-wider mb-6 border border-emerald-100 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Good Standing
               </div>
               
               <h3 className="text-2xl font-bold text-slate-900 mb-2">Your TrustScore is Healthy</h3>
               <p className="text-slate-500 font-medium mb-10">Based on your last 90 days of Squad transactions</p>
               
               <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-[#001f3f] text-white font-bold py-3.5 px-8 rounded-xl text-sm hover:bg-[#002b55] transition-all shadow-lg shadow-[#001f3f]/10">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-3.5 px-8 rounded-xl text-sm hover:bg-slate-50 transition-all">
                    <Share2 className="w-4 h-4" />
                    Share with Lender
                  </button>
               </div>

               {/* Background detail */}
               <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
                  <LayoutDashboard className="w-full h-full" />
               </div>
            </div>

            {/* Instant Insights Card */}
            <div className="bg-[#001f3f] rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col">
               <h4 className="text-lg font-bold mb-2">Instant Insights</h4>
               <p className="text-slate-400 text-xs leading-relaxed mb-8">Automated analysis of your operational health.</p>
               
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

               {/* Small Sparkline */}
               <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="h-16 flex items-end gap-1">
                     {[30, 45, 35, 55, 40, 65, 50, 75, 60, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#00d2ff]/40 rounded-t-sm" style={{height: `${h}%`}}></div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Score Breakdown Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-bold text-slate-900">Score Breakdown</h3>
                  <p className="text-sm text-slate-400 font-medium">Individual metrics contributing to your overall score</p>
               </div>
               <button className="text-sm font-bold text-[#001f3f] hover:underline transition-all flex items-center gap-2">
                  View Historical Data
                  <ChevronRight className="w-4 h-4" />
               </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
               {/* Metric 1 */}
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">REVENUE CONSISTENCY</p>
                  <div className="flex items-baseline justify-between mb-4">
                     <span className="text-2xl font-bold text-slate-900">22<span className="text-sm text-slate-300">/25</span></span>
                     <span className="text-[10px] font-bold text-emerald-500">+2.4%</span>
                  </div>
                  <div className="mt-auto h-1.5 bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400 w-[88%] rounded-full"></div>
                  </div>
               </div>

               {/* Metric 2 */}
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">REPEAT CUSTOMERS</p>
                  <div className="flex items-baseline justify-between mb-4">
                     <span className="text-2xl font-bold text-slate-900">18<span className="text-sm text-slate-300">/20</span></span>
                     <span className="text-[10px] font-bold text-slate-400">STABLE</span>
                  </div>
                  <div className="mt-auto h-1.5 bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400 w-[90%] rounded-full"></div>
                  </div>
               </div>

               {/* Metric 3 */}
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">LOW FRAUD RATE</p>
                  <div className="flex items-baseline justify-between mb-4">
                     <span className="text-2xl font-bold text-slate-900">18<span className="text-sm text-slate-300">/20</span></span>
                     <span className="text-[10px] font-bold text-emerald-500 uppercase">EXCELLENT</span>
                  </div>
                  <div className="mt-auto h-1.5 bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-400 w-[90%] rounded-full"></div>
                  </div>
               </div>

               {/* Metric 4 */}
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">CASHFLOW STABILITY</p>
                  <div className="flex items-baseline justify-between mb-4">
                     <span className="text-2xl font-bold text-slate-900">16<span className="text-sm text-slate-300">/20</span></span>
                     <span className="text-[10px] font-bold text-slate-400">STABLE</span>
                  </div>
                  <div className="mt-auto h-1.5 bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400 w-[80%] rounded-full"></div>
                  </div>
               </div>

               {/* Metric 5 */}
               <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col border-l-4 border-l-red-500">
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-4">GROWTH TREND</p>
                  <div className="flex items-baseline justify-between mb-4">
                     <span className="text-2xl font-bold text-slate-900">0<span className="text-sm text-slate-300">/15</span></span>
                     <span className="text-[9px] font-bold text-red-500 leading-tight">NEEDS<br/>IMPROVEMENT</span>
                  </div>
                  <div className="mt-auto h-1.5 bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 w-[5%] rounded-full shadow-[0_0_8px_rgba(239,68,68,0.3)]"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Explanation & Lender Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Explanation Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-8">
                  <Info className="w-6 h-6 text-[#001f3f]" />
                  <h3 className="text-xl font-bold text-slate-900">What This Means</h3>
               </div>
               
               <p className="text-slate-500 text-base leading-relaxed mb-10">
                  Your TrustScore of 74 indicates a high level of operational reliability. This score is generated by analyzing transaction patterns, liquidity ratios, and fraud prevention success over the past 90 days within the SquadMind ecosystem.
               </p>
               
               <div className="p-8 bg-slate-50 rounded-[32px] border-l-4 border-l-[#001f3f] relative group">
                  <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                     Growth Opportunity
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                     Your Growth Trend metric is currently low because of seasonal adjustments. Reaching a score of 80+ could unlock lower interest rates from our lending partners.
                  </p>
               </div>
            </div>

            {/* Lender Ready Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col">
               <div className="flex items-center gap-3 mb-10">
                  <Landmark className="w-6 h-6 text-[#001f3f]" />
                  <h3 className="text-xl font-bold text-slate-900">Lender Ready</h3>
               </div>
               
               <div className="space-y-6 mb-12 flex-1">
                  {[
                    "Identity Verified",
                    "Squad Account Active (>1yr)",
                    "Transaction History Audited",
                    "TrustScore Meeting Minimum Threshold"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                       </div>
                       <span className="text-base font-bold text-slate-700">{text}</span>
                    </div>
                  ))}
               </div>

               <div className="bg-cyan-50 rounded-[32px] p-8 border border-cyan-100 text-center">
                  <p className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider opacity-80">You are ready to apply for business credit</p>
                  <button className="w-full bg-[#00d2ff] hover:bg-[#00c2ee] text-[#001f3f] font-bold py-4 rounded-2xl text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#00d2ff]/20">
                     Find Lenders
                     <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </div>

          </div>

          {/* Final Footer */}
          <footer className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100 mt-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">POWERED BY SQUAD</span>
              <div className="flex gap-8">
                <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Privacy Policy</a>
                <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Terms of Service</a>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              © 2024 SQUADMIND FINANCIAL INTELLIGENCE UNIT
            </p>
          </footer>

        </div>
      </main>

    </div>
  );
}

// Added Landmark icon missing from lucide-react imports above
const Landmark = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
);

export default TrustScore;
