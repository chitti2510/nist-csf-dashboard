import { Shield, Lock, Building2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

// Microsoft "M" logo as inline SVG — no external dependency needed
function MicrosoftLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

interface Props {
  unauthorizedEmail?: string;
}

export default function LoginPage({ unauthorizedEmail }: Props) {
  const { signIn, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 shadow-lg shadow-indigo-500/10">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-800 text-center">
            <h1 className="text-xl font-semibold text-white mb-1">NIST CSF 2.0 Dashboard</h1>
            <p className="text-sm text-slate-400">Cybersecurity Assessment Portal</p>
          </div>

          <div className="px-8 py-8">
            {/* Unauthorized domain warning */}
            {unauthorizedEmail && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/10 p-4 mb-6">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-300">Access denied</p>
                  <p className="text-xs text-red-400/80 mt-0.5">
                    <span className="font-mono">{unauthorizedEmail}</span> is not an authorised domain.
                  </p>
                </div>
              </div>
            )}

            {/* Lock icon + copy */}
            <div className="flex items-start gap-3 mb-7">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                This dashboard is restricted to authorised personnel. Sign in with your
                Microsoft 365 work account to continue.
              </p>
            </div>

            {/* Sign-in button */}
            <button
              onClick={signIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-semibold text-sm px-5 py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
              ) : (
                <MicrosoftLogo />
              )}
              {isLoading ? 'Redirecting…' : 'Sign in with Microsoft'}
            </button>

            {/* Allowed domains */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                  Authorised organisations
                </span>
              </div>
              <div className="space-y-2">
                {['precision-cyber.com', 'ansamcal.com (coming soon)'].map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.includes('coming soon') ? 'bg-slate-600' : 'bg-emerald-500'}`} />
                    <span className={`text-xs font-mono ${d.includes('coming soon') ? 'text-slate-600' : 'text-slate-300'}`}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          NIST Cybersecurity Framework 2.0 · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
