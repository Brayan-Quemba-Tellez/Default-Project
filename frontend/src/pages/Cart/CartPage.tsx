import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart.store';
import { useAuth } from '@/contexts/AuthContext';
import { ordersApi } from '@/api/orders.api';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, subtotal, total, updateItem, removeItem, clearCart } = useCartStore();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para realizar un pedido.');
      navigate('/login', { state: { from: { pathname: '/carrito' } } });
      return;
    }

    setIsSubmitting(true);
    toast.loading('Guardando pedido en base de datos...', { id: 'checkout' });
    try {
      const orderPayload = {
        shipping_address: {
          street: 'Calle 100 # 15-20',
          city: 'Bogotá',
          state: 'Cundinamarca',
          zip: '110111',
          country: 'Colombia',
        },
        payment_method: 'wompi',
        notes: 'Pedido generado desde la tienda PyMEs',
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          unit_price: i.product?.price || 0,
        })),
      };

      await ordersApi.create(orderPayload);
      clearCart();
      toast.success('¡Pedido guardado exitosamente en PostgreSQL!', { id: 'checkout' });
      navigate('/pedidos');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail || 'Error al procesar el pedido. Verifica tu sesión.',
        { id: 'checkout' }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tu carrito está vacío
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Explora nuestro catálogo y agrega soluciones digitales o servicios a tu orden.
        </p>
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          Ir al Catálogo de Productos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Carrito de Compras
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Revisa tus productos y procede al pago seguro
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" /> Vaciar Carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">
                    {item.product?.name || `Producto ${item.product_id}`}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ${((item.product?.price || 0)).toLocaleString('es-CO')} COP c/u
                  </span>
                </div>
              </div>

              {/* Counter and Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-1">
                  <button
                    onClick={() => updateItem(item.product_id, Math.max(1, item.quantity - 1))}
                    className="p-1 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItem(item.product_id, item.quantity + 1)}
                    className="p-1 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="font-black text-gray-900 dark:text-white">
                    ${((item.product?.price || 0) * item.quantity).toLocaleString('es-CO')} COP
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.product_id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-fit space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
            Resumen del Pedido
          </h2>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${subtotal.toLocaleString('es-CO')} COP
              </span>
            </div>
            <div className="flex justify-between">
              <span>IVA (19% incluido)</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${Math.round(subtotal * 0.19).toLocaleString('es-CO')} COP
              </span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between text-base font-extrabold text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="text-xl text-blue-600 dark:text-blue-400">
                ${total.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all text-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              {isSubmitting ? 'Procesando Pedido...' : 'Pagar con Wompi / PSE'}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Transacciones protegidas con cifrado SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
