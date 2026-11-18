import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MessageSquare, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Laura Restrepo', email: 'laura@comercializadora.co', phone: '3104567890', company: 'Comercializadora del Valle', message: 'Requerimos cotización urgente para integrar facturación electrónica con 3 sedes físicas.', date: '14 Oct 2026', read: false },
    { id: '2', name: 'Andrés Gómez', email: 'andres@distribuciones.com', phone: '3157891234', company: 'Distribuciones AG', message: 'Interesados en consultoría de arquitectura para migrar nuestro ERP legado a Docker.', date: '12 Oct 2026', read: true },
  ]);

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success('Contacto eliminado.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Mensajes & Prospectos (Leads)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Consultas recibidas a través del formulario de contacto y landing page
        </p>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border shadow-sm space-y-3 ${
              c.read ? 'border-gray-200 dark:border-gray-700' : 'border-blue-300 dark:border-blue-800 bg-blue-50/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 dark:text-white text-base">
                  {c.name}
                </span>
                {c.company && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {c.company}
                  </span>
                )}
                {!c.read && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold uppercase">
                    Nuevo
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{c.date}</span>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700">
              "{c.message}"
            </p>

            <div className="flex items-center justify-between pt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> {c.email}
                </span>
                {c.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-blue-500" /> {c.phone}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${c.email}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Responder
                </a>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
