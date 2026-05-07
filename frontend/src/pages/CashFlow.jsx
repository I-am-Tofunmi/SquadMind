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
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group">
              <Bell className="w-5 h-5" />
              <span className="font-medium text-[15px]">Alerts</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group">
              <Award className="w-5 h-5" />
              <span className="font-medium text-[15px]">TrustScore</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group">
              <Settings className="w-5 h-5" />
              <span className="font-medium text-[15px]">Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-6 space-y-6">
          {/* Upgrade Button */}
          <button className="w-full bg-[#00d2ff] hover:bg-[#00d2ff]/90 text-[#001f3f] font-bold py-3.5 rounded-xl text-base transition-all shadow-lg shadow-[#00d2ff]/20">
            Upgrade Plan
          </button>

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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex flex-col">
             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <span>Analysis</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#001f3f]">Predictions</span>
             </div>
             <h2 className="text-2xl font-bold text-slate-900 leading-tight">Cash Flow Prediction</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search predictions..." 
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00d2ff]/30 outline-none"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#001f3f] text-white rounded-lg text-xs font-bold hover:bg-[#002b55] transition-colors shadow-lg shadow-[#001f3f]/10">
              <Play className="w-4 h-4 fill-white" />
              Run New Analysis
            </button>
            
            <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          
          {/* Prediction & Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Main Prediction Card */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AIDA PREDICTION MODEL V2.4</span>
              </div>
              
              <p className="text-sm font-medium text-slate-500 mb-2">Expected Revenue Next Month</p>
              <h3 className="text-5xl font-bold text-slate-900 mb-12 tracking-tight">
                ₦340,000 – ₦380,000
              </h3>
              
              {/* Detailed Prediction Chart */}
              <div className="relative h-[280px] w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="250" x2="1000" y2="250" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Label guides */}
                  <text x="0" y="45" className="text-[20px] fill-slate-300 font-bold">₦500k</text>
                  <text x="0" y="245" className="text-[20px] fill-slate-300 font-bold">₦200k</text>
                  
                  {/* Confidence Interval Area */}
                  <path 
                    d="M0,250 L300,220 L600,190 L1000,160 L1000,210 L600,240 L300,270 L0,300 Z" 
                    fill="#e0f2fe" 
                    className="opacity-40"
                  />
                  
                  {/* Main prediction line */}
                  <path 
                    d="M0,275 L300,245 L600,215 L1000,185" 
                    fill="none" 
                    stroke="#075985" 
                    strokeWidth="3" 
                  />
                  
                  {/* Vertical Today Line */}
                  <line x1="600" y1="0" x2="600" y2="300" stroke="#00d2ff" strokeWidth="1" opacity="0.3" />
                  <circle cx="600" cy="150" r="4" fill="#00d2ff" />
                </svg>
                
                {/* Time Labels */}
                <div className="absolute bottom-0 w-full flex justify-between px-2 pt-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">OCT 14</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">OCT 21</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">TODAY</span>
                    <div className="w-8 h-1 bg-slate-900 rounded-full mt-1"></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">NOV 07, 2023</span>
                </div>
              </div>
            </div>

            {/* Side Insights */}
            <div className="flex flex-col gap-6">
              
              {/* Insight 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#00d2ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Smart Insights</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Based on your last 90 days of Squad transactions, SquadMind predicts a <span className="font-bold text-[#001f3f]">15% increase</span> in month-end sales due to seasonal trends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Insight 2: Risk */}
              <div className="bg-[#fff9f2] rounded-2xl p-6 border border-[#ffe4bc] shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe4bc]/50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Potential risks week ahead</h4>
                    <p className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-widest mb-2">NOV 1-7 FORECAST</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Plan your client invoicing strategically to maintain liquid balance during the dip.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">CONFIDENCE SCORE</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-slate-900">92%</span>
                  <div className="flex items-center gap-1 text-[#00838f] text-[10px] font-bold">
                    <TrendingUp className="w-3 h-3" />
                    +2.4% from last run
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#001f3f] w-[92%] rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          {/* Forecast Table Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Forecasted Liquidity Peaks</h3>
              <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                <button className="px-6 py-2 bg-white shadow-sm rounded-lg text-xs font-bold text-slate-900">Weekly</button>
                <button className="px-6 py-2 text-xs font-bold text-slate-400 hover:text-slate-600">Monthly</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="p-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Timeline</th>
                    <th className="p-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Source / Predictor</th>
                    <th className="p-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Predicted Flow</th>
                    <th className="p-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</th>
                    <th className="p-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="p-6 font-bold text-slate-700">Oct 24 — Oct 31</td>
                    <td className="p-6 text-slate-500 font-medium">Payroll Cycle Spike</td>
                    <td className="p-6 font-bold text-[#00838f]">₦85,900</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-[#e0f2f1] text-[#00695c] text-[10px] font-bold uppercase rounded">LOW</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm text-slate-600 font-medium">Stable</span>
                      </div>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="p-6 font-bold text-slate-700">Nov 01 — Nov 07</td>
                    <td className="p-6 text-slate-500 font-medium">Post-Month End Dip</td>
                    <td className="p-6 font-bold text-red-500">-₦23,450</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-[#fff8e1] text-[#f57f17] text-[10px] font-bold uppercase rounded">MODERATE</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-sm text-slate-600 font-medium">Watch</span>
                      </div>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="p-6 font-bold text-slate-700">Nov 08 — Nov 15</td>
                    <td className="p-6 text-slate-500 font-medium">Market Recovery</td>
                    <td className="p-6 font-bold text-[#00838f]">₦114,200</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-[#e0f2f1] text-[#00695c] text-[10px] font-bold uppercase rounded">LOW</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm text-slate-600 font-medium">Stable</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Promo Section: Squad Loans */}
          <div className="bg-[#001f3f] rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] rounded-lg text-[10px] font-bold tracking-widest flex items-center gap-2 border border-[#00d2ff]/30">
                  <Sparkles className="w-3 h-3" />
                  PRO FEATURE
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Optimize your liquidity with<br />Squad Loans
              </h2>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Based on your predictions Nov 1-7 dip, you qualify for a <span className="text-[#00d2ff] font-bold">₦150,000 bridge loan</span> with 0% interest if repaid within 14 days. Ensure your operations never stall.
              </p>
              
              <button className="bg-[#00d2ff] hover:bg-[#00c2ee] text-[#001f3f] font-bold py-4 px-10 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#00d2ff]/20">
                GET BRIDGE OFFER
              </button>
            </div>
            
            {/* Promo Illustration */}
            <div className="relative z-10 w-full max-w-sm">
               <div className="aspect-square bg-white/5 rounded-[48px] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-6 shadow-2xl">
                  <div className="relative">
                    <TrendingUp className="w-24 h-24 text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
                    <div className="absolute -bottom-4 -right-2 bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                       <span className="text-4xl font-bold text-white">₦</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Final Footer */}
          <footer className="pt-12 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100 mt-12">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="font-bold text-slate-900 uppercase">SquadMind</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              © 2024 SquadMind. Powered by Squad Intelligence
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

export default CashFlow;
