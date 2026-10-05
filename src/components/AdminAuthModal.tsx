/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, KeyRound } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const ADMIN_SECURITY_CODE = '990584';

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === ADMIN_SECURITY_CODE) {
      setError(false);
      setCode('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Shield Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-cinzel text-white">
            XOLARA Owner Security Gate
          </h2>
          <p className="text-xs text-zinc-400">
            Admin Panel me access karne ke liye 6-digit security code daliye:
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 block text-center">
              Enter 6-Digit Security Code:
            </label>
            <div className="relative max-w-xs mx-auto">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                required
                placeholder="******"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                className={`w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-3 pl-10 pr-4 bg-zinc-900 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none transition ${
                  error
                    ? 'border-rose-500 ring-2 ring-rose-500/30'
                    : 'border-zinc-700 focus:border-amber-400'
                }`}
              />
            </div>

            {error && (
              <div className="text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Security Code galat hai! Kripya sahi code daliye.</span>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Confidential Owner Access Only</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              Unlock Admin Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
