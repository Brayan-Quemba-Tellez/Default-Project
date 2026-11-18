import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cart.store';
import { Search, Filter, ShoppingCart, Check, Star, Tag, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Sample default catalog to allow immediate full visual and interactive testing
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sistema ERP para PyMEs Cloud',
    slug: 'sistema-erp-pymes-cloud',
    category: 'Software',
    price: 350000,
    description: 'Solución integral de inventario, contabilidad y facturación electrónica DIAN para medianas empresas.',
    stock: 25,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Licencia Servidor Backup Empresarial',
    slug: 'servidor-backup-empresarial',
    category: 'Infraestructura',
    price: 180000,
    description: 'Respaldo automatizado en la nube con cifrado AES-256 y replicación continua contra ransomware.',
    stock: 12,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Módulo Pasarela Wompi & PSE',
    slug: 'modulo-pasarela-wompi-pse',
    category: 'Integraciones',
    price: 120000,
    description: 'Conector seguro para recepción de pagos con tarjetas de crédito, PSE, Nequi y Daviplata.',
    stock: 50,
    rating: 5.0,
    image_url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    featured: false,
  },
  {
    id: 'prod-4',
    name: 'Paquete Consultoría DevOps & Docker',
    slug: 'consultoria-devops-docker',
    category: 'Servicios',
    price: 500000,
    description: 'Implementación de pipelines CI/CD, contenedorización Docker y despliegues sin interrupciones.',
    stock: 8,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Auditoría de Ciberseguridad PyME',
    slug: 'auditoria-ciberseguridad-pyme',
    category: 'Seguridad',
    price: 450000,
    description: 'Análisis de vulnerabilidades web, revisión de endpoints y reporte de mitigación técnica.',
    stock: 5,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Bot de Atención WhatsApp & IA',
    slug: 'bot-atencion-whatsapp-ia',
    category: 'Automatización',
    price: 290000,
    description: 'Automatización de respuestas, captura de leads calificados y conexión a tu CRM en tiempo real.',
    stock: 30,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const addItem = useCartStore((state) => state.addItem);

  const categories = ['Todas', 'Software', 'Infraestructura', 'Integraciones', 'Servicios', 'Seguridad', 'Automatización'];

  const filtered = INITIAL_PRODUCTS.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase()) ||
                          prod.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category_id: product.category,
        stock: product.stock,
        is_active: true,
      },
      1
    );
    toast.success(`"${product.name}" agregado al carrito`);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Catálogo de Productos & Soluciones
        </h1>
        <p className="text-blue-100 max-w-2xl text-base sm:text-lg">
          Herramientas de software, licencias, consultoría e integraciones especializadas para potenciar tu empresa.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow">
                {product.category}
              </span>
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-amber-300 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                {product.rating}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Precio (COP)</span>
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    ${product.price.toLocaleString('es-CO')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/productos/${product.slug}`}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    title="Ver detalle"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No se encontraron productos coincidentes con "{search}".
          </p>
        </div>
      )}
    </div>
  );
}
