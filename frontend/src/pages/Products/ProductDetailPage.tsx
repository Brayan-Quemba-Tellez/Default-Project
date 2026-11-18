import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cart.store';
import { ArrowLeft, ShoppingCart, ShieldCheck, CheckCircle2, Truck, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);

  // Fallback demo product
  const product = {
    id: `prod-${slug || '1'}`,
    name: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Solución Digital PyME',
    price: 350000,
    description: 'Solución empresarial integral con licenciamiento de por vida, actualizaciones de seguridad incluidas por 12 meses, soporte técnico directo por chat o videollamada y panel de control web accesible 24/7.',
    features: [
      'Implementación guiada en tu infraestructura',
      'Facturación Electrónica DIAN homologada',
      'Compatibilidad con pasarelas de pago colombianas (Wompi, PSE, Nequi)',
      'Copias de seguridad automáticas en la nube',
      'Garantía de servicio y acuerdo SLA del 99.9%',
    ],
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: slug || 'producto',
        description: product.description,
        price: product.price,
        category_id: 'software',
        stock: 10,
        is_active: true,
      },
      1
    );
    toast.success('Producto agregado al carrito exitosamente');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link
        to="/productos"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Productos
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
        <div className="h-80 md:h-full bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
              Entrega Digital Inmediata
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
              ${product.price.toLocaleString('es-CO')} COP
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Incluye:
              </h4>
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al Carrito
            </button>
            <Link
              to="/cotizaciones"
              className="py-3.5 px-6 rounded-xl border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Pedir Ajuste Personalizado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
