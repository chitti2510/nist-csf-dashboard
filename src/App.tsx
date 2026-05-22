import { Shield, AlertCircle } from 'lucide-react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useData } from './hooks/useData';
import { useAuth } from './auth/useAuth';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import RadarOverview from './components/RadarOverview';
import FunctionBarChart from './components/FunctionBarChart';
import FunctionSection from './components/FunctionSection';
import LoginPage from './components/LoginPage';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-500/20 border border-indigo-500/30 mb-4 animate-pulse">
          <Shield className="w-7 h-7 text-indigo-400" />
        </div>
        <p className="text-slate-300 font-medium">Loading assessment data…</p>
        <p className="text-slate-500 text-sm mt-1">Parsing NIST CSF 2.0 controls</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-white font-semibold mb-2">Failed to load data</p>
        <p className="text-slate-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

// Inner dashboard — only rendered when MSAL confirms authenticated
function Dashboard() {
  const { data, loading, error } = useData();

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error ?? 'Unknown error'} />;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <SummaryCards data={data} />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RadarOverview data={data} />
          <FunctionBarChart functions={data.functions} />
        </section>
        <section>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-white">Function Breakdown</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any category to expand subcategories · Click a subcategory to view details
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.functions.map(fn => (
              <FunctionSection key={fn.name} fn={fn} />
            ))}
          </div>
        </section>
        <footer className="text-center text-xs text-slate-600 pb-4">
          NIST Cybersecurity Framework 2.0 · Assessment Dashboard · {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}

// Domain guard — shown when authenticated but domain is not allowed
function UnauthorizedScreen() {
  const { email } = useAuth();
  return <LoginPage unauthorizedEmail={email} />;
}

// Root — MSAL decides which branch to render
export default function App() {
  const { isAuthorized } = useAuth();

  return (
    <>
      <AuthenticatedTemplate>
        {isAuthorized ? <Dashboard /> : <UnauthorizedScreen />}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
  );
}
