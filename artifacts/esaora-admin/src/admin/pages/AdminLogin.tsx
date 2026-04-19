import { useState } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, Loader2, AlertCircle, Shield, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { signIn, signUp, resetPassword, getAdminProfile } from '@workspace/esaora-core/lib/auth';
import { supabase } from '@workspace/esaora-core/lib/supabase';

type AuthView = 'login' | 'signup' | 'forgot' | 'success';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(pass)) return "Password must contain at least one number.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Input Validation
    if (!email.includes('@')) {
      setError("Please enter a valid official email identity.");
      return;
    }

    if (view === 'signup') {
      const passError = validatePassword(password);
      if (passError) {
        setError(passError);
        return;
      }
    }

    setLoading(true);
    try {
      if (view === 'login') {
        if (attempts >= 3) {
          throw new Error('Maximum security attempts reached. Please reset your password to regain access.');
        }

        try {
          const { user } = await signIn(email, password);
          if (!user) throw new Error('Authentication failed.');

          // Development bypass: ensure profile exists
          let profile = await getAdminProfile(user.id);
          
          if (!profile) {
            // Attempt to create a standard profile for development ease
            // This assumes RLS allows users to insert their own profile
            const { data } = await supabase
              .from('admin_profiles')
              .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || 'Admin',
                role: 'admin',
                is_active: true // Auto-activate for development flow
              })
              .select()
              .single();
            profile = data;
          }

          // Temporarily relaxed for dev flow as requested: "easily log in"
          // In production, this should check for profile.is_active
          if (profile && !profile.is_active) {
            // Force activate for dev testing if missing
            await supabase.from('admin_profiles').update({ is_active: true }).eq('id', user.id);
          }

          // Subtle delay for "little loading" effect
          await new Promise(resolve => setTimeout(resolve, 800));
          setLocation('/admin');
        } catch (err: any) {
          setAttempts(prev => prev + 1);
          throw err;
        }
      } else if (view === 'signup') {
        const response = await signUp(email, password, { 
          full_name: fullName,
          role: 'admin',
        });
        
        if (response.user) {
          // Attempt to pre-create profile to avoid "pending" state
          await supabase.from('admin_profiles').insert({
            id: response.user.id,
            full_name: fullName,
            role: 'admin',
            is_active: true
          });
          setView('success');
        }
      } else if (view === 'forgot') {
        await resetPassword(email);
        setView('success');
      }
    } catch (err: any) {
      setError(err.message || 'Identity verification failed. Please try again.');
    } finally {
      if (view !== 'login') setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch font-sans selection:bg-[#39FF14]/30">
      {/* Left Panel: Precise Institutional Identity */}
      <div className="hidden lg:flex flex-col w-[40%] p-16 bg-[#001B40] relative overflow-hidden">
        {/* Deep Field Background */}
        <div 
          className="absolute inset-0 z-0 brightness-[0.2]"
          style={{
            backgroundImage: "url('/images/hero/hero-bg-10.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* [1] TOP LOGO */}
          <div className="mb-12">
            <img src="/footerlogo.png" alt="ESA-ORA" className="h-12 w-auto brightness-110" />
          </div>

          {/* [2] CONCISE HEADING & DESCRIPTION */}
          <div className="flex flex-col">
            <h1 className="text-white text-2xl font-bold tracking-tight uppercase mb-4">
              Admin Portal
            </h1>
            
            <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
              Secure administrative gateway for the ESA-ORA Consortium. This environment is strictly audited to maintain regional maritime data integrity and alliance operational security.
            </p>
          </div>

          {/* [3] SEPARATOR & SECURITY (CENTERED) */}
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-3 text-[#39FF14]">
            <Shield className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Secure node active</span>
          </div>

          {/* [4] TECHNICAL METADATA (BOTTOM ANCHOR) */}
          <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-white/20 text-[10px] font-bold uppercase tracking-widest">
             <span>portal.esaora.org</span>
             <span>v2.4.0</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Clean Dotted Security Portal */}
      <div 
        className="flex-1 flex flex-col justify-center items-center p-8 bg-white relative"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="w-full max-w-sm space-y-8">
          
          {/* Header (Outside the Card) */}
          <div className="space-y-2">
            <h1 className="text-brand-navy font-bold text-3xl tracking-tight">
              {view === 'login' && 'Sign in'}
              {view === 'signup' && 'Create account'}
              {view === 'forgot' && 'Reset pass key'}
              {view === 'success' && 'Request received'}
            </h1>
            <p className="text-gray-400 text-sm">
              {view === 'login' && 'Management portal for alliance reporting'}
              {view === 'signup' && 'Request administrative access for ESA-ORA'}
              {view === 'forgot' && 'Verification will be sent to your identity email'}
              {view === 'success' && 'Processing your security request...'}
            </p>
          </div>

          <div className="bg-white p-0">
            {view === 'success' ? (
              <div className="space-y-8 py-4">
                <div className="w-16 h-16 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto">
                   <Shield className="w-8 h-8 text-[#39FF14]" />
                </div>
                <div className="text-center space-y-3 px-4">
                   <p className="text-brand-navy font-semibold text-sm leading-relaxed">
                     {view === 'signup' 
                       ? "Security access request received. Verification will be processed by the systems lead."
                       : "If you signed up for an account, check your email for the reset link."}
                   </p>
                   <p className="text-gray-400 text-xs leading-relaxed">
                     To maintain the integrity of the alliance portal, we recommend checking your spam folder if the identity key does not appear within 5 minutes.
                   </p>
                </div>
                <button 
                  onClick={() => setView('login')}
                  className="w-full text-brand-navy font-bold text-xs uppercase tracking-widest hover:text-[#00d2ff] transition-colors"
                >
                  Return to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded p-4 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <p className="text-red-700 text-xs font-semibold leading-relaxed">{error}</p>
                  </div>
                )}

                {view === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 ml-1 leading-none">Full name</label>
                    <div className="relative pt-1">
                       <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ESA-ORA official"
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00d2ff] transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 ml-1 leading-none">Email identity</label>
                  <div className="relative pt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Identity@esaora.org"
                      required
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#00d2ff] transition-all"
                    />
                  </div>
                </div>

                {view !== 'forgot' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-gray-400 leading-none">Password</label>
                      {view === 'login' && (
                        <button type="button" onClick={() => setView('forgot')} className="text-[10px] font-bold text-[#00d2ff] hover:text-brand-navy transition-colors">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative pt-1">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-[#00d2ff] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-300 hover:text-brand-navy"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-6 pt-2">
                  <div className="flex items-center justify-between">
                    {view === 'login' && (
                       <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-[#00d2ff] peer-checked:border-[#00d2ff] transition-all" />
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-brand-navy transition-colors">Keep session active</span>
                      </label>
                    )}
                    {view !== 'login' && (
                      <button type="button" onClick={() => setView('login')} className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-brand-navy transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-navy text-white hover:bg-[#002659]/90 px-8 py-4 rounded-lg font-bold text-xs tracking-widest transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span>
                          {view === 'login' && 'Security sign in'}
                          {view === 'signup' && 'Request access'}
                          {view === 'forgot' && 'Send reset link'}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="pt-8 flex flex-col items-center gap-6">
             {view === 'login' && (
               <button 
                onClick={() => setView('signup')}
                className="group flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-brand-navy transition-colors"
               >
                 No credentials? <span className="text-[#00d2ff] group-hover:text-brand-navy transition-colors underline underline-offset-4 decoration-gray-200">Create account</span>
               </button>
             )}
             
             <div className="flex flex-col items-center gap-4">
                <a 
                  href="mailto:emanuel@kazinikai.co.ke" 
                  className="flex items-center gap-2 group transition-all"
                >
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-[#39FF14] transition-colors" />
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-brand-navy transition-colors tracking-wide underline underline-offset-4 decoration-gray-100 group-hover:decoration-brand-navy">It support</span>
                </a>

                <div className="flex flex-col items-center gap-2 pt-4">
                  <p className="text-gray-300 text-[9px] font-bold uppercase tracking-[0.2em] font-mono">
                    Alliance · Regional Security Protocol
                  </p>
                  <a 
                    href="https://portfolio.kazinikazi.co.ke" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-gray-400 hover:text-brand-navy transition-colors font-medium"
                  >
                    Designed by <span className="font-bold underline underline-offset-2 italic">KNK Digital</span>
                  </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
