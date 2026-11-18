import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent_given: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent_given) {
      toast.error('Debes aceptar la autorización de tratamiento de datos personales.');
      return;
    }
    setSubmitted(true);
    toast.success('¡Mensaje enviado con éxito! Nos comunicaremos en menos de 24 horas.');
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Contáctanos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          ¿Tienes dudas sobre nuestros servicios, necesitas soporte o quieres iniciar un proyecto? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Column */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white space-y-8 shadow-xl">
          <div>
            <h2 className="text-xl font-bold mb-2">Información Directa</h2>
            <p className="text-blue-100 text-sm">
              Atención personalizada para PyMEs y emprendedores en Colombia.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-xs text-blue-200 uppercase">Correo</span>
                <span>contacto@tudominio.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-xs text-blue-200 uppercase">Teléfono / WhatsApp</span>
                <span>+57 (300) 123-4567</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-xs text-blue-200 uppercase">Ubicación</span>
                <span>Bogotá D.C., Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                ¡Mensaje Recibido!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
                Gracias por comunicarte con Brayan Quemba Tellez. Responderemos a la brevedad posible a <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                    Nombre o Razón Social
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                    Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe tu consulta o requerimiento aquí..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent_given}
                  onChange={(e) => setFormData({ ...formData, consent_given: e.target.checked })}
                  className="mt-1 rounded text-blue-600"
                />
                <label htmlFor="consent" className="text-xs text-gray-600 dark:text-gray-400">
                  Autorizo el tratamiento de mis datos personales para fines de contacto y asesoría comercial conforme a la Ley Estatutaria 1581 de 2012 (Habeas Data).
                </label>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all text-sm"
              >
                <Send className="w-4 h-4" /> Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
