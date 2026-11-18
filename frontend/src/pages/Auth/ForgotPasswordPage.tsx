import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { KeyRound, Mail, Lock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, { email });
      if (res.data?.reset_token) {
        setToken(res.data.reset_token);
        setStep('reset');
        toast.success('Código de recuperación generado. Ingresa tu nueva contraseña.');
      } else {
        toast.info(res.data?.message || 'Si el correo existe, se enviaron instrucciones.');
        setStep('reset');
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Error al solicitar recuperación. Verifica el correo.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!token) {
      setError('Token de recuperación no encontrado. Solicita uno nuevo.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/v1/auth/reset-password`, {
        token,
        new_password: newPassword,
      });
      setStep('success');
      toast.success('¡Contraseña restablecida exitosamente!');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'El token es inválido o ha expirado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {step === 'success'
              ? '¡Contraseña Actualizada!'
              : step === 'reset'
              ? 'Nueva Contraseña'
              : 'Recuperar Contraseña'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {step === 'success'
              ? 'Tu clave ha sido modificada. Ya puedes ingresar.'
              : step === 'reset'
              ? `Ingresa la nueva clave para ${email}`
              : 'Ingresa tu correo para restablecer el acceso a tu cuenta'}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'request' && (
          <form onSubmit={handleRequestToken} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all text-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              {loading ? 'Generando solicitud...' : 'Continuar'}
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nueva Contraseña
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-500/20 active:scale-95 transition-all text-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {loading ? 'Guardando contraseña...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tu contraseña ha sido actualizada en la base de datos PostgreSQL. Ya puedes acceder a tu cuenta.
            </p>
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-500/20 transition-all text-sm"
            >
              Ir a Iniciar Sesión <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
