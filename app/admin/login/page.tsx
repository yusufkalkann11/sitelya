'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login, type LoginState } from '../actions';
import { SiteliyaIcon } from '@/components/Logo';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-sm font-semibold transition-colors disabled:opacity-50"
    >
      {pending ? 'Giriş yapılıyor…' : 'Giriş yap'}
    </button>
  );
}

export default function LoginPage() {
  const [state, action] = useFormState<LoginState, FormData>(login, {});

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <SiteliyaIcon size={32} />
          <span className="text-xl font-extrabold tracking-tight">Sitelya <span className="text-white/40 font-medium">Admin</span></span>
        </div>
        <form action={action} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03] space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">Şifre</label>
            <input
              id="password" name="password" type="password" required autoFocus autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-[#1e293b] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>
          {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
