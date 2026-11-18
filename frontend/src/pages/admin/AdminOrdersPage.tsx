import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi, Order } from '@/api/orders.api';
import { ArrowLeft, CheckCircle2, Clock, Eye, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.list()
      .then((data) => setOrders(data || []))
      .catch((err) => {
        console.error('Error al cargar órdenes de admin:', err);
        toast.error('Error al consultar pedidos.');
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'aprobado':
      case 'entregado':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case 'pending':
      case 'pendiente':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Gestión de Pedidos & Pagos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Transacciones procesadas en la plataforma y registradas en PostgreSQL
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-sm text-gray-500">Cargando pedidos...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">
            No se han registrado pedidos en la base de datos todavía.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Usuario / ID</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4">Método</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                    ORD-{o.id.substring(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{o.user_id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 font-bold">${Number(o.total).toLocaleString('es-CO')} COP</td>
                  <td className="px-6 py-4 text-xs uppercase">{o.payment_method || 'Wompi'}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(o.created_at).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
