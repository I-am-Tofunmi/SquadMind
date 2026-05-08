import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChevronDown,
  ShieldCheck,
  Languages,
  Activity as LatencyIcon
} from 'lucide-react';

function Settings() {
  const navigate = useNavigate();
  const onLogout = () => navigate('/');
  const onNavigate = (path) => navigate(`/${path}`);
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
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Settings</h2>
          
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
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Platform Settings</h2>
              <p className="text-slate-400 font-medium text-sm md:text-base">Configure your identity and AI parameters.</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                 System Health: <span className="text-[#00d2ff]">99.9% Uptime</span>
               </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Business Profile */}
               <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-8">Business Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BUSINESS NAME</label>
                        <input type="text" defaultValue="Squad Financial" className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INDUSTRY</label>
                        <input type="text" defaultValue="Fintech" className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LOCATION</label>
                     <input type="text" defaultValue="Lagos, Nigeria" className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20" />
                  </div>
               </div>

               {/* API Key */}
               <div className="bg-[#001f3f] rounded-2xl md:rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg md:text-xl font-bold">Squad API Integration</h3>
                    <div className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-[9px] font-bold tracking-widest border border-cyan-400/30 uppercase">Connected</div>
                  </div>
                  <p className="text-slate-400 text-sm mb-8">Secure production environment link.</p>
                  <div className="bg-[#0c243d] rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5">
                     <div className="flex flex-col gap-1.5 overflow-hidden w-full md:w-auto">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PRODUCTION API KEY</p>
                        <p className="text-xs md:text-sm font-mono text-cyan-400 break-all">sk_prod_••••••••••••••••••••4j92</p>
                     </div>
                     <button onClick={copyKey} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all whitespace-nowrap">
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied' : 'Copy Key'}
                     </button>
                  </div>
               </div>

               {/* AI Language & Tone */}
               <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-8">
                     <Languages className="w-5 h-5 text-[#001f3f]" />
                     <h3 className="text-lg md:text-xl font-bold text-slate-900">AI Language & Tone</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-6 rounded-2xl bg-white border-2 border-[#00d2ff] shadow-md shadow-[#00d2ff]/5 relative overflow-hidden">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">English (Professional)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Standard corporate dialect. Precise, formal, and objective financial reporting.</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Pidgin (Casual)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Local flavor for quick insights. Relatable, energetic, and efficient communication.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
               {/* Alerts */}
               <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-10">
                     <Bell className="w-5 h-5 text-slate-900" />
                     <h3 className="text-lg font-bold text-slate-900">AI Alerts</h3>
                  </div>
                  <div className="space-y-8">
                     {[
                       { type: 'WhatsApp Alerts', sub: 'Instant anomalies detected' },
                       { type: 'SMS Alerts', sub: 'Priority security events' },
                       { type: 'Email Digests', sub: 'Daily financial health' }
                     ].map((item, i) => (
                        <div key={item.type} className="flex items-center justify-between">
                           <div>
                              <p className="text-sm font-bold text-slate-900">{item.type}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                           </div>
                           <button 
                             onClick={() => toggleAlert(item.type.split(' ')[0].toLowerCase())}
                             className={`w-11 h-6 rounded-full relative transition-all duration-300 ${alerts[item.type.split(' ')[0].toLowerCase()] ? 'bg-[#00d2ff]' : 'bg-slate-200'}`}
                           >
                             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${alerts[item.type.split(' ')[0].toLowerCase()] ? 'right-1' : 'left-1'}`}></div>
                           </button>
                        </div>
                     ))}
                  </div>

                  <div className="mt-12 p-6 bg-cyan-50/50 rounded-2xl border border-cyan-100/50 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#00d2ff]/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#00d2ff]" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">GLOBAL INSIGHTS ACTIVE</span>
                  </div>
               </div>

               {/* Node Latency */}
               <div className="bg-white rounded-2xl md:rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NODE LATENCY</p>
                     <span className="text-[10px] font-bold text-emerald-500 uppercase">STABLE</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-12">
                     {[40, 60, 45, 85, 55, 65, 45, 55].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm transition-all ${i === 3 ? 'bg-[#00d2ff]' : 'bg-[#00d2ff]/20'}`} style={{ height: `${h}%` }}></div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Deactivate Account */}
          <div className="mt-12 bg-red-50/50 rounded-3xl p-8 md:p-12 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-2 text-center md:text-left">
                <h3 className="text-lg font-bold text-red-600">Deactivate Account</h3>
                <p className="text-sm text-red-500 font-medium opacity-80 leading-relaxed max-w-xl">
                   Once deactivated, all access to SquadMind's predictive intelligence and history will be permanently revoked.
                </p>
             </div>
             <button className="px-10 py-4 bg-white border-2 border-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm shadow-red-100">
                Deactivate
             </button>
          </div>

          <footer className="py-12 border-t border-slate-100 mt-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
               <span className="text-slate-400">POWERED BY SQUAD</span>
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
        <button onClick={() => onNavigate('alerts')} className="flex flex-col items-center gap-1 text-slate-400 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-[#001f3f]">
          <SettingsIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">More</span>
        </button>
      </nav>

    </div>
  );
}

export default Settings;
