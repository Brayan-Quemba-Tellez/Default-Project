import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';

const POSTS = [
  {
    id: 'post-1',
    slug: 'facturacion-electronica-pymes-guia-2026',
    title: 'Guía Definitiva de Facturación Electrónica DIAN para PyMEs (2026)',
    summary: 'Aprende los nuevos requisitos técnicos, cómo integrar la validación previa en tiempo real y evitar sanciones tributarias.',
    author: 'Brayan Quemba Tellez',
    date: '10 de Octubre, 2026',
    readTime: '6 min de lectura',
    category: 'Normativa & DIAN',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'post-2',
    slug: 'por-que-migrar-tu-tienda-a-wompi-y-pse',
    title: 'Por qué integrar Wompi y PSE incrementa tus ventas en línea un 35%',
    summary: 'Análisis de tasas de conversión, soporte de pagos locales con Nequi y métodos de dispersión segura de fondos en Colombia.',
    author: 'Brayan Quemba Tellez',
    date: '2 de Octubre, 2026',
    readTime: '4 min de lectura',
    category: 'Comercio Electrónico',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'post-3',
    slug: 'mejores-practicas-docker-infraestructura-pyme',
    title: 'Modernización de Servidores con Docker y Nginx para Pequeñas Empresas',
    summary: 'Cómo reducir costos en servidores en un 50% implementando microservicios ligeros con alta disponibilidad.',
    author: 'Brayan Quemba Tellez',
    date: '18 de Septiembre, 2026',
    readTime: '8 min de lectura',
    category: 'Infraestructura',
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const categories = ['Todas', 'Normativa & DIAN', 'Comercio Electrónico', 'Infraestructura'];

  const filtered = selectedCategory === 'Todas' 
    ? POSTS 
    : POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-4">
          <BookOpen className="w-4 h-4" /> Centro de Conocimiento & Estrategia
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Blog de Tecnología & Negocios
        </h1>
        <p className="text-blue-100 max-w-2xl text-base sm:text-lg">
          Artículos técnicos, guías prácticas y tendencias para acelerar la transformación de tu empresa.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  Leer <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
