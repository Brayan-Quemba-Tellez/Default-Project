import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart.store';
import { useAuth } from '@/contexts/AuthContext';
import { ordersApi } from '@/api/orders.api';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Loader2,
  Smartphone,
  QrCode,
  Key,
  Building2,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, subtotal, total, updateItem, removeItem, clearCart } = useCartStore();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wompi' | 'bre-b'>('bre-b');
  
  // Bre-B States
  const [brebMode, setBrebMode] = useState<'key' | 'qr'>('key');
  const [keyType, setKeyType] = useState<'celular' | 'documento' | 'email' | 'codigo'>('celular');
  const [keyValue, setKeyValue] = useState('');
  const [bank, setBank] = useState('Bancolombia');

  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para realizar un pedido.');
      navigate('/login', { state: { from: { pathname: '/carrito' } } });
      return;
    }

    if (paymentMethod === 'bre-b' && brebMode === 'key' && !keyValue.trim()) {
      toast.error('Por favor ingresa el valor de tu Llave Bre-B para procesar el pago.');
      return;
    }

    setIsSubmitting(true);
    toast.loading('Procesando transacción y guardando pedido...', { id: 'checkout' });
    try {
      const notes =
        paymentMethod === 'bre-b'
          ? brebMode === 'key'
            ? `Pago Bre-B Inmediato | Llave (${keyType.toUpperCase()}): ${keyValue} | Entidad: ${bank}`
            : `Pago Bre-B Inmediato | Código QR Escaneado | Entidad: ${bank}`
          : 'Pedido generado con Wompi / PSE';

      const orderPayload = {
        shipping_address: {
          street: 'Calle 100 # 15-20',
          city: 'Bogotá',
          state: 'Cundinamarca',
          zip: '110111',
          country: 'Colombia',
        },
        payment_method: paymentMethod === 'bre-b' ? 'bre-b' : 'wompi',
        notes,
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          unit_price: i.product?.price || 0,
        })),
      };

      await ordersApi.create(orderPayload);
      clearCart();
      toast.success(
        paymentMethod === 'bre-b'
          ? '¡Pago Bre-B exitoso y pedido guardado en PostgreSQL!'
          : '¡Pedido guardado exitosamente en PostgreSQL!',
        { id: 'checkout' }
      );
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

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Método de Pago
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('bre-b')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'bre-b'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Bre-B
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded-full">
                    Inmediato
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Llaves & QR Colombia
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wompi')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'wompi'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-blue-600" /> Wompi
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  PSE & Tarjetas
                </p>
              </button>
            </div>

            {/* Bre-B Form */}
            {paymentMethod === 'bre-b' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/5 via-blue-500/5 to-emerald-500/5 border border-amber-500/20 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
                      B
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        Pagos Inmediatos Bre-B
                      </h4>
                      <p className="text-[10px] text-gray-500">Banco de la República de Colombia</p>
                    </div>
                  </div>

                  {/* Toggle Mode */}
                  <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setBrebMode('key')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        brebMode === 'key' ? 'bg-white dark:bg-gray-800 text-blue-600 font-bold shadow-sm' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Por Llave
                    </button>
                    <button
                      type="button"
                      onClick={() => setBrebMode('qr')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        brebMode === 'qr' ? 'bg-white dark:bg-gray-800 text-blue-600 font-bold shadow-sm' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Código QR
                    </button>
                  </div>
                </div>

                {brebMode === 'key' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                          Tipo de Llave
                        </label>
                        <select
                          value={keyType}
                          onChange={(e: any) => setKeyType(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                        >
                          <option value="celular">📱 Número Celular</option>
                          <option value="documento">🆔 Cédula CC / NIT</option>
                          <option value="email">✉️ Correo Electrónico</option>
                          <option value="codigo">🔑 Código Alfanumérico</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                          Entidad Financiera
                        </label>
                        <select
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                        >
                          <option value="Bancolombia">Bancolombia</option>
                          <option value="Nequi">Nequi</option>
                          <option value="Daviplata">Daviplata</option>
                          <option value="Davivienda">Davivienda</option>
                          <option value="Banco de Bogotá">Banco de Bogotá</option>
                          <option value="BBVA Colombia">BBVA Colombia</option>
                          <option value="Nu Colombia">Nu Colombia</option>
                          <option value="Lulo Bank">Lulo Bank</option>
                          <option value="Dale!">Dale!</option>
                          <option value="Scotiabank">Scotiabank Colpatria</option>
                          <option value="Banco Falabella">Banco Falabella</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                        Valor de tu Llave Bre-B
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={keyType === 'celular' ? 'tel' : keyType === 'email' ? 'email' : 'text'}
                          value={keyValue}
                          onChange={(e) => setKeyValue(e.target.value)}
                          placeholder={
                            keyType === 'celular'
                              ? 'Ej: 310 987 6543'
                              : keyType === 'documento'
                              ? 'Ej: 1000123456'
                              : keyType === 'email'
                              ? 'usuario@banco.com'
                              : 'Alias o código de llave'
                          }
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="p-3 bg-white rounded-lg shadow-inner border border-gray-100">
                      <QrCode className="w-24 h-24 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        QR Interoperable Bre-B
                      </p>
                      <p className="text-[10px] text-gray-500 max-w-[200px]">
                        Abre Bancolombia, Nequi, Daviplata o cualquier app y escanea para pagar ${total.toLocaleString('es-CO')} COP
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all text-sm disabled:opacity-50 ${
                paymentMethod === 'bre-b'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 hover:from-amber-700 hover:to-blue-800 shadow-amber-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : paymentMethod === 'bre-b' ? (
                <Zap className="w-4 h-4 fill-white" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {isSubmitting
                ? 'Procesando Pago...'
                : paymentMethod === 'bre-b'
                ? `Confirmar Pago Bre-B ($${total.toLocaleString('es-CO')})`
                : 'Pagar con Wompi / PSE'}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Transacciones protegidas con cifrado y trazabilidad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
