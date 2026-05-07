import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ShieldAlert, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut, 
  HelpCircle,
  Search,
  User,
  ChevronRight,
  TrendingDown,
  Banknote,
  Award,
  Sparkles,
  Mail,
  MapPin,
  Copy,
  Globe,
  MessageSquare,
  Activity,
  CheckCircle2,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

function Settings({ onLogout, onNavigate }) {
  const [language, setLanguage] = useState('english');
  const [alerts, setAlerts] = useState({
    whatsapp: true,
    sms: false,
    email: true
  });
  const [copied, setCopied] = useState(false);

  const toggleAlert = (type) => {
    setAlerts(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const copyKey = () => {
    navigator.clipboard.writeText('sk_prod_592837485928374859283748592837484j92');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer group"
            >
              <Award className="w-5 h-5" />
              <span className="font-medium text-[15px]">TrustScore</span>
            </button>
            
            <button 
              onClick={() => onNavigate('settings')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer group"
            >
              <SettingsIcon className="w-5 h-5 text-white" />
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
              placeholder="Search configurations..." 
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
            <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
               <img src="https://ui-avatars.com/api/?name=Lekan+Adeyemi&background=f1f5f9&color=64748b" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1400px] w-full mx-auto">
          
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Platform Settings</h2>
              <p className="text-slate-400 font-medium">Configure your business identity and AI intelligence parameters.</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">System Health: <span className="text-emerald-500">99.9% Uptime</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-10">
               
               {/* Business Profile Card */}
               <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-slate-900" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900">Business Profile</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BUSINESS NAME</label>
                        <input type="text" defaultValue="Squad Financial Services" className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-cyan-400/20 outline-none" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INDUSTRY</label>
                        <div className="relative">
                           <select className="w-full appearance-none px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-cyan-400/20 outline-none">
                              <option>Financial Technology</option>
                              <option>Retail & E-commerce</option>
                              <option>Food & Logistics</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LOCATION</label>
                     <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" defaultValue="Lagos, Nigeria" className="w-full pl-12 pr-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-cyan-400/20 outline-none" />
                     </div>
                  </div>
               </div>

               {/* Squad API Integration Card */}
               <div className="bg-[#001f3f] rounded-[32px] p-10 text-white relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10 mb-8">
                     <div>
                        <h3 className="text-xl font-bold mb-2">Squad API Integration</h3>
                        <p className="text-slate-400 text-sm">Secure production environment link.</p>
                     </div>
                     <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-cyan-400/20">CONNECTED</span>
                  </div>

                  <div className="bg-[#112f4d] border border-white/10 rounded-2xl p-6 relative z-10">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">PRODUCTION API KEY</p>
                           <p className="text-sm font-mono tracking-wider text-cyan-400 break-all">sk_prod_••••••••••••••••••••••••••••••••4j92</p>
                        </div>
                        <button 
                           onClick={copyKey}
                           className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                              copied ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 hover:bg-white/10 text-white border-white/5'
                           }`}
                        >
                           {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                           {copied ? 'Copied!' : 'Copy Key'}
                        </button>
                     </div>
                  </div>
                  
                  {/* Abstract shapes */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
               </div>

               {/* AI Language & Tone Card */}
               <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-slate-900" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900">AI Language & Tone</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div 
                        onClick={() => setLanguage('english')}
                        className={`p-8 rounded-[24px] border-2 transition-all cursor-pointer group ${
                           language === 'english' ? 'border-cyan-400 bg-cyan-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                     >
                        <div className="flex items-start justify-between mb-4">
                           <h4 className={`font-bold ${language === 'english' ? 'text-slate-900' : 'text-slate-600'}`}>English (Professional)</h4>
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              language === 'english' ? 'border-cyan-400 bg-white' : 'border-slate-200 bg-white'
                           }`}>
                              {language === 'english' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                           </div>
                        </div>
                        <p className={`text-sm leading-relaxed ${language === 'english' ? 'text-slate-500' : 'text-slate-400'}`}>
                           Standard corporate dialect. Precise, formal, and objective financial reporting.
                        </p>
                     </div>

                     <div 
                        onClick={() => setLanguage('pidgin')}
                        className={`p-8 rounded-[24px] border-2 transition-all cursor-pointer group ${
                           language === 'pidgin' ? 'border-cyan-400 bg-cyan-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                     >
                        <div className="flex items-start justify-between mb-4">
                           <h4 className={`font-bold ${language === 'pidgin' ? 'text-slate-900' : 'text-slate-600'}`}>Pidgin (Casual)</h4>
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              language === 'pidgin' ? 'border-cyan-400 bg-white' : 'border-slate-200 bg-white'
                           }`}>
                              {language === 'pidgin' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                           </div>
                        </div>
                        <p className={`text-sm leading-relaxed ${language === 'pidgin' ? 'text-slate-500' : 'text-slate-400'}`}>
                           Local flavor for quick insights. Relatable, energetic, and efficient communication.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="space-y-10">
               
               {/* AI Alerts Card */}
               <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-slate-900" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900">AI Alerts</h3>
                  </div>

                  <div className="space-y-8 mb-10">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-bold text-slate-900">WhatsApp Alerts</p>
                           <p className="text-[10px] text-slate-400 font-medium">Instant anomalies detected</p>
                        </div>
                        <div 
                           onClick={() => toggleAlert('whatsapp')}
                           className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${alerts.whatsapp ? 'bg-cyan-400' : 'bg-slate-200'}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-all ${alerts.whatsapp ? 'right-1' : 'left-1'}`}></div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-bold text-slate-900">SMS Alerts</p>
                           <p className="text-[10px] text-slate-400 font-medium">Priority security events</p>
                        </div>
                        <div 
                           onClick={() => toggleAlert('sms')}
                           className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${alerts.sms ? 'bg-cyan-400' : 'bg-slate-200'}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-all ${alerts.sms ? 'right-1' : 'left-1'}`}></div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-bold text-slate-900">Email Digests</p>
                           <p className="text-[10px] text-slate-400 font-medium">Daily financial health</p>
                        </div>
                        <div 
                           onClick={() => toggleAlert('email')}
                           className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${alerts.email ? 'bg-cyan-400' : 'bg-slate-200'}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-all ${alerts.email ? 'right-1' : 'left-1'}`}></div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-cyan-500" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest leading-tight">GLOBAL INSIGHTS<br/>ACTIVE</p>
                     </div>
                  </div>
               </div>

               {/* Node Latency Card */}
               <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-8">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NODE LATENCY</p>
                     <span className="text-[10px] font-bold text-emerald-500 uppercase">STABLE</span>
                  </div>
                  <div className="flex gap-1 h-12 items-end">
                     {[30, 45, 35, 70, 40, 55, 45].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-cyan-400' : 'bg-cyan-100'}`} style={{height: `${h}%`}}></div>
                     ))}
                  </div>
               </div>
            </div>

          </div>

          {/* Deactivate Account */}
          <div className="mt-12 bg-red-50 rounded-[32px] p-10 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <h3 className="text-xl font-bold text-red-600 mb-2">Deactivate Account</h3>
                <p className="text-sm text-red-400 font-medium max-w-xl">
                   Once deactivated, all access to SquadMind's predictive intelligence and history will be permanently revoked.
                </p>
             </div>
             <button className="bg-white border border-red-100 text-red-600 font-bold py-4 px-10 rounded-2xl hover:bg-red-600 hover:text-white transition-all text-base shadow-sm">
                Deactivate
             </button>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100">
             <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">POWERED BY SQUAD</span>
                <div className="flex gap-6">
                   <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">PRIVACY POLICY</a>
                   <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">TERMS OF SERVICE</a>
                </div>
             </div>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                © 2024 SQUADMIND v2.4.1
             </p>
          </footer>

        </div>
      </main>

    </div>
  );
}

export default Settings;
