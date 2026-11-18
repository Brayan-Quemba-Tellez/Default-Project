import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi, Order } from '@/api/orders.api';
import { Package, Calendar, Clock, CheckCircle, ChevronRight, FileText, Loader2, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.list()
      .then((data) => setOrders(data || []))
      .catch((err) => {
        console.error('Error fetching orders:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'entregado':
      case 'aprobado':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400';
      case 'processing':
      case 'procesando':
        return 'text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400';
      case 'cancelled':
      case 'cancelado':
        return 'text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-400';
      default:
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400';
    }
  };

  const formatStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'Entregado';
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'cancelled': return 'Cancelado';
      default: return status || 'Pendiente';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Mis Pedidos
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Historial de compras registradas en la base de datos
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-500">Cargando tus pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 space-y-4">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aún no tienes pedidos registrados</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Explora nuestros productos, añade soluciones a tu carrito y genera tu primera orden.
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            Ver Catálogo de Productos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      ORD-{order.id.substring(0, 8).toUpperCase()}
                    </h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {order.items?.length || 1} producto(s) &bull; Método: {order.payment_method || 'Wompi'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />{' '}
                      {new Date(order.created_at).toLocaleDateString('es-CO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700">
                <div className="text-left md:text-right">
                  <span className="text-xs text-gray-400 block">Total</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${Number(order.total).toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
