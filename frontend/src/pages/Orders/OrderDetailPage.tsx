import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, Package, CreditCard, ShieldCheck } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/pedidos"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Pedidos
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Pedido {id || 'ORD-98421'}
              </h1>
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                Pago Aprobado
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Emitido el 14 de Octubre de 2026 a las 10:45 AM
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
            <Download className="w-4 h-4" /> Descargar Factura PDF
          </button>
        </div>

        {/* Order Details items */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Productos y Licencias
          </h2>
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  Sistema ERP para PyMEs Cloud - Licencia Anual
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Código de activación: <code className="bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded text-[11px]">PYME-CLOUD-8921-X9A</code>
                </p>
              </div>
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              $350.000 COP
            </p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <h3 className="font-bold text-gray-900 dark:text-white">Método de Pago</h3>
            <p className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-500" /> Wompi - Bancolombia / PSE
            </p>
            <p className="text-xs">ID de transacción: <code>wompi_tx_982402148</code></p>
          </div>

          <div className="space-y-2 text-sm text-right">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal:</span>
              <span>$294.118 COP</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>IVA (19%):</span>
              <span>$55.882 COP</span>
            </div>
            <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Total Pagado:</span>
              <span className="text-blue-600 dark:text-blue-400">$350.000 COP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
