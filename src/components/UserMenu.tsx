import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

export default function UserMenu() {
  const { name, email, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : email[0]?.toUpperCase() ?? '?';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
      >
        <div className="w-7 h-7 rounded-full bg-indigo-500/25 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">
          {initials}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-medium text-white leading-tight max-w-[140px] truncate">{name || email}</p>
          <p className="text-[10px] text-slate-500 max-w-[140px] truncate">{email}</p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {/* Profile info */}
          <div className="px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-500/25 border border-indigo-500/40 flex items-center justify-center text-sm font-bold text-indigo-300 flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{name}</p>
                <p className="text-xs text-slate-400 truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1.5">
            <button
              onClick={() => { setOpen(false); signOut(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-800 border border-slate-700">
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
              </div>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
