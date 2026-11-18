import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    service_type: 'consulta',
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '10:00',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('¡Cita agendada correctamente! Te enviaremos un correo de confirmación con el enlace de Google Meet.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Agendamiento de Asesoría Técnica
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Coordina una sesión virtual personalizada con Brayan Quemba Tellez para diagnosticar y escalar tu proyecto.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 shadow-sm">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ¡Cita Reservada con Éxito!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
              Hemos registrado tu sesión para el día <strong>{formData.scheduled_date}</strong> a las <strong>{formData.scheduled_time}</strong>. Te contactaremos con los detalles de conexión.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Agendar Otra Cita
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Servicio
                </label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="consulta">Consultoría Estratégica & Arquitectura</option>
                  <option value="mantenimiento">Diagnóstico & Soporte Técnico</option>
                  <option value="desarrollo">Desarrollo a Medida & E-commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Asunto o Tema Principal
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Integración de pagos y facturación"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Fecha Deseada
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Hora de Preferencia
                </label>
                <select
                  value={formData.scheduled_time}
                  onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Descripción de Necesidades o Proyecto
              </label>
              <textarea
                rows={4}
                placeholder="Cuéntanos brevemente sobre tu empresa y qué objetivos buscas lograr..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all text-sm"
            >
              <CalendarIcon className="w-4 h-4" />
              Confirmar Reserva
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
