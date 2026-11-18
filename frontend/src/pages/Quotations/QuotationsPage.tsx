import React, { useState } from 'react';
import { Plus, Trash2, FileText, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function QuotationsPage() {
  const [items, setItems] = useState([
    { description: 'Desarrollo de plataforma web personalizada', quantity: 1, estimated_unit: 1500000 },
  ]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, estimated_unit: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const copy = [...items];
    (copy[index] as any)[field] = value;
    setItems(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('¡Solicitud de cotización enviada! Recibirás la propuesta técnica formal en 24 horas hábiles.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Solicitud de Cotización Formal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Especifica los requerimientos de tu solución tecnológica y recibe una propuesta económica detallada.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 shadow-sm">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ¡Cotización Registrada con Éxito!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
              Un asesor de ingeniería revisará el desglose y se pondrá en contacto contigo con la cotización en PDF y opciones de financiamiento.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
            >
              Crear Nueva Solicitud
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Ítems o Módulos Solicitados
                </h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Plus className="w-4 h-4" /> Agregar Ítem
                </button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Descripción del requerimiento o servicio"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="Cant."
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm text-center outline-none"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Observaciones Técnicas o Plazos de Entrega
              </label>
              <textarea
                rows={4}
                placeholder="Indica el alcance deseado, si cuentas con infraestructura existente, fecha límite estimada, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all text-sm"
            >
              <Send className="w-4 h-4" /> Enviar Solicitud de Cotización
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
