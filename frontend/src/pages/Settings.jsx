import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut, 
  User,
  Banknote,
  Award,
  Mail,
  Copy,
  Globe,
  Languages,
  CheckCircle2,
  X,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
  Shield,
  Zap
} from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const onLogout = () => navigate('/');
  const onNavigate = (path) => navigate(`/${path}`);

  const [language, setLanguage] = useState('english');
  const [alerts, setAlerts] = useState({ whatsapp: true, sms: false, email: true });
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [deactivateText, setDeactivateText] = useState('');
  const [regenerating, setRegenerating] = useState(false);

  const [profile, setProfile] = useState({
    businessName: 'Lekan Stores',
    industry: 'Retail / Trading',
    location: 'Lagos, Nigeria',
    email: 'user1@example.com',
    phone: '+234 801 234 5678',
  });

  const apiKey = 'sk_prod_592837485928374859283748592837484j92';
  const maskedKey = 'sk_prod_••••••••••••••••••••4j92';

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const toggleAlert = (type) => {
    setAlerts(prev => ({ ...prev, [type]: !prev[type] }));
    showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} alerts ${!alerts[type] ? 'enabled' : 'disabled'}.`);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showSuccess('API key copied to clipboard!');
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    await new Promise(r => setTimeout(r, 1200));
    setSavingProfile(false);
    showSuccess('Business profile saved successfully!');
  };

  const regenerateKey = async () => {
    setRegenerating(true);
    await new Promise(r => setTimeout(r, 1500));
    setRegenerating(false);
    setActiveModal(null);
    showSuccess('New API key generated! Update your environment variables.');
  };

  const handleDeactivate = () => {
    if (deactivateText === 'DEACTIVATE') {
      setActiveModal(null);
      setDeactivateText('');
      showSuccess('Account deactivation request submitted. You will receive a confirmation email.');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-outfit text-slate-900 overflow-hidden relative">

      {/* ── MODALS ── */}

      {/* Regenerate API Key */}
      <Modal isOpen={activeModal === 'regenerate'} onClose={() => setActiveModal(null)} title="Regenerate API Key">
        <div className="space-y-5">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-700 mb-1">Warning — This action is irreversible</p>
                <p className="text-xs text-amber-600 leading-relaxed">Generating a new API key will immediately invalidate your current key. Any connected services using the old key will stop working until updated.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">What you need to do after:</p>
            {[
              'Update VITE_API_BASE_URL in your Vercel environment',
              'Update any other services using this key',
              'Test your connections after updating',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-black text-slate-400 mt-0.5">{i + 1}.</span>
                <p className="text-xs text-slate-600">{step}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveModal(null)}
              className="py-3 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={regenerateKey}
              disabled={regenerating}
              className="py-3 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {regenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {regenerating ? 'Generating...' : 'Regenerate Key'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Deactivate Account */}
      <Modal isOpen={activeModal === 'deactivate'} onClose={() => setActiveModal(null)} title="Deactivate Account">
        <div className="space-y-5">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-700 mb-1">This action cannot be undone</p>
                <p className="text-xs text-red-600 leading-relaxed">All your transaction history, TrustScore data, AI insights, and settings will be permanently deleted. Your Squad API connection will be severed immediately.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">What you will lose:</p>
            {[
              'All transaction history and analytics',
              'TrustScore and lending eligibility',
              'Cash flow forecasts and fraud detection',
              'All AI insights and alert history',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-xs text-slate-600">{item}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700">Type <span className="text-red-500 font-black">DEACTIVATE</span> to confirm:</p>
            <input
              type="text"
              value={deactivateText}
              onChange={e => setDeactivateText(e.target.value)}
              placeholder="Type DEACTIVATE"
              className="w-full px-4 py-3 border-2 border-red-100 rounded-xl text-sm outline-none focus:border-red-400 font-mono"
            />
          </div>
          <button
            onClick={handleDeactivate}
            disabled={deactivateText !== 'DEACTIVATE'}
            className="w-full py-3 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Permanently Deactivate Account
          </button>
        </div>
      </Modal>

      {/* Notification Settings */}
      <Modal isOpen={activeModal === 'notifications'} onClose={() => setActiveModal(null)} title="Notification Preferences">
        <div className="space-y-5">
          <p className="text-xs text-slate-400">Configure when and how you receive alerts from SquadMind.</p>
          {[
            { key: 'whatsapp', label: 'WhatsApp Alerts', desc: 'Instant fraud and anomaly notifications', icon: '💬' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Priority security events only', icon: '📱' },
            { key: 'email', label: 'Email Digests', desc: 'Daily financial health summary', icon: '📧' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggleAlert(item.key)}
                className={`w-11 h-6 rounded-full relative transition-all duration-300 ${alerts[item.key] ? 'bg-[#00d2ff]' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${alerts[item.key] ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
          <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-[#00d2ff]">Tip:</span> Enable WhatsApp alerts for the fastest fraud notifications — they're delivered within 200ms of detection.
            </p>
          </div>
          <button
            onClick={() => { setActiveModal(null); showSuccess('Notification preferences saved!'); }}
            className="w-full bg-[#001f3f] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#002b55] transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </Modal>

      {/* ── SIDEBAR ── */}
      <aside className="w-[260px] bg-[#001f3f] flex flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex">
        <div>
          <div className="p-8 pb-10">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-0">SquadMind AI</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">POWERED BY SQUAD</p>
          </div>
          <nav className="px-4 space-y-1">
            <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium text-[15px]">Dashboard</span>
            </button>
            <button onClick={() => onNavigate('cashflow')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Banknote className="w-5 h-5" />
              <span className="font-medium text-[15px]">Cash Flow</span>
            </button>
            <button onClick={() => onNavigate('frauddetection')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-medium text-[15px]">Fraud Detection</span>
            </button>
            <button onClick={() => onNavigate('alerts')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="font-medium text-[15px]">Alerts</span>
            </button>
            <button onClick={() => onNavigate('trustscore')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#112f4d]/50 rounded-lg transition-colors cursor-pointer">
              <Award className="w-5 h-5" />
              <span className="font-medium text-[15px]">TrustScore</span>
            </button>
            <button onClick={() => onNavigate('settings')} className="w-full flex items-center gap-3 px-4 py-3 bg-[#112f4d] text-white rounded-lg transition-colors cursor-pointer">
              <SettingsIcon className="w-5 h-5 text-white" />
              <span className="font-medium text-[15px]">Settings</span>
            </button>
          </nav>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          <div className="pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00d2ff] flex items-center justify-center text-[#001f3f] font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{profile.businessName}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Merchant Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-20 md:pb-0">
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

          {/* Success Toast */}
          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              {successMsg}
            </div>
          )}

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
                    <input
                      type="text"
                      value={profile.businessName}
                      onChange={e => setProfile(p => ({ ...p, businessName: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20 focus:border-[#00d2ff]/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INDUSTRY</label>
                    <input
                      type="text"
                      value={profile.industry}
                      onChange={e => setProfile(p => ({ ...p, industry: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20 focus:border-[#00d2ff]/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EMAIL</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20 focus:border-[#00d2ff]/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PHONE</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20 focus:border-[#00d2ff]/30 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LOCATION</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-5 py-3.5 bg-[#f8fafc] border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00d2ff]/20 focus:border-[#00d2ff]/30 transition-all"
                  />
                </div>
                <button
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#001f3f] text-white font-bold rounded-xl text-sm hover:bg-[#002b55] transition-colors cursor-pointer disabled:opacity-70 shadow-lg"
                >
                  {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {/* API Key */}
              <div className="bg-[#001f3f] rounded-2xl md:rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg md:text-xl font-bold">Squad API Integration</h3>
                  <div className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-[9px] font-bold tracking-widest border border-cyan-400/30 uppercase">Connected</div>
                </div>
                <p className="text-slate-400 text-sm mb-8">Secure production environment link.</p>
                <div className="bg-[#0c243d] rounded-xl p-5 md:p-6 border border-white/5 mb-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1.5 overflow-hidden w-full md:w-auto">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PRODUCTION API KEY</p>
                      <p className="text-xs md:text-sm font-mono text-cyan-400 break-all">
                        {showKey ? apiKey : maskedKey}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {showKey ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={copyKey}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('regenerate')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate Key
                </button>
              </div>

              {/* AI Language & Tone */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <Languages className="w-5 h-5 text-[#001f3f]" />
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">AI Language & Tone</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div
                    onClick={() => { setLanguage('english'); showSuccess('AI language set to English (Professional).'); }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${language === 'english' ? 'border-[#00d2ff] bg-white shadow-md shadow-[#00d2ff]/5' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900">English (Professional)</h4>
                      {language === 'english' && <div className="w-5 h-5 rounded-full bg-[#00d2ff] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Standard corporate dialect. Precise, formal, and objective financial reporting.</p>
                  </div>
                  <div
                    onClick={() => { setLanguage('pidgin'); showSuccess('AI language set to Pidgin (Casual).'); }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${language === 'pidgin' ? 'border-[#00d2ff] bg-white shadow-md shadow-[#00d2ff]/5' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900">Pidgin (Casual)</h4>
                      {language === 'pidgin' && <div className="w-5 h-5 rounded-full bg-[#00d2ff] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Local flavor for quick insights. Relatable, energetic, and efficient communication.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-xs font-bold text-slate-500 mb-1">Preview in {language === 'english' ? 'English' : 'Pidgin'}:</p>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    {language === 'english'
                      ? '"Your revenue increased by 12.5% this period. Your top 3 customers account for 25% of total revenue."'
                      : '"Your money don go up 12.5% this period! Your top 3 customers dey carry the load — dem account for 25% of your revenue."'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">

              {/* Alerts */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-slate-900" />
                    <h3 className="text-lg font-bold text-slate-900">AI Alerts</h3>
                  </div>
                  <button
                    onClick={() => setActiveModal('notifications')}
                    className="text-[10px] font-bold text-[#00d2ff] hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Configure
                  </button>
                </div>
                <div className="space-y-8">
                  {[
                    { key: 'whatsapp', label: 'WhatsApp Alerts', sub: 'Instant anomalies detected' },
                    { key: 'sms', label: 'SMS Alerts', sub: 'Priority security events' },
                    { key: 'email', label: 'Email Digests', sub: 'Daily financial health' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                      </div>
                      <button
                        onClick={() => toggleAlert(item.key)}
                        className={`w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${alerts[item.key] ? 'bg-[#00d2ff]' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${alerts[item.key] ? 'right-1' : 'left-1'}`}></div>
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
                <div className="flex items-end gap-1.5 h-12 mb-4">
                  {[40, 60, 45, 85, 55, 65, 45, 55].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm transition-all ${i === 3 ? 'bg-[#00d2ff]' : 'bg-[#00d2ff]/20'}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Avg', value: '142ms' },
                    { label: 'Peak', value: '287ms' },
                    { label: 'Min', value: '89ms' },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-[10px] text-slate-400 uppercase mb-1">{item.label}</p>
                      <p className="text-xs font-black text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => { onNavigate('trustscore'); }}
                    className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-cyan-50 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <Shield className="w-4 h-4 text-[#00d2ff]" />
                    <span className="text-xs font-bold text-slate-700">View TrustScore Report</span>
                  </button>
                  <button
                    onClick={() => { onNavigate('frauddetection'); }}
                    className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-slate-700">Review Fraud Alerts</span>
                  </button>
                  <button
                    onClick={() => setActiveModal('notifications')}
                    className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <Bell className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-bold text-slate-700">Manage Notifications</span>
                  </button>
                  <button
                    onClick={() => showSuccess('Support ticket opened. We will respond within 2 hours.')}
                    className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700">Contact Support</span>
                  </button>
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
            <button
              onClick={() => setActiveModal('deactivate')}
              className="px-10 py-4 bg-white border-2 border-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm shadow-red-100 cursor-pointer"
            >
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
