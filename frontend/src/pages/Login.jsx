import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { login } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-outfit relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-100/30 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-10 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#001f3f] font-bold hover:opacity-70 transition-all cursor-pointer group"
        >
          <span className="text-xl tracking-tight">SquadMind</span>
        </button>
        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
          <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-widest">Squad</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-10">
        <div className="w-full max-w-[480px] bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-[#001f3f]/5 border border-slate-50 p-8 md:p-12 flex flex-col">

          {/* Icon */}
          <div className="w-16 h-16 bg-[#f8fafc] rounded-3xl flex items-center justify-center mb-8 shadow-inner self-center">
            <LogIn className="w-8 h-8 text-[#001f3f]" strokeWidth={2.5} />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl font-extrabold text-[#001f3f] text-center mb-4 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm text-center mb-10 leading-relaxed font-medium max-w-[300px] self-center">
            Sign in to continue to your dashboard and manage your financial insights.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-none bg-slate-50 rounded-2xl pl-12 pr-5 py-4 text-sm text-slate-900 focus:ring-2 focus:ring-[#00d2ff]/30 outline-none placeholder:text-slate-300 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Password
                </label>
                <a href="#" className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-widest hover:text-[#001f3f] transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-none bg-slate-50 rounded-2xl pl-12 pr-12 py-4 text-sm text-slate-900 focus:ring-2 focus:ring-[#00d2ff]/30 outline-none placeholder:text-slate-300 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-[#001f3f] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#001f3f] hover:bg-[#002b55] disabled:opacity-70 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mt-8 shadow-xl shadow-[#001f3f]/10 cursor-pointer text-base active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 text-[#00d2ff]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00d2ff] hover:text-[#001f3f] font-bold transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-10 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-300 relative z-10 border-t border-slate-50 gap-4 uppercase tracking-[0.2em]">
        <div className="text-[#001f3f]">
          SquadMind
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Support</a>
        </div>
        <div>
          © 2026 SQUADMIND v2.4.1
        </div>
      </footer>
    </div>
  );
}

export default Login;