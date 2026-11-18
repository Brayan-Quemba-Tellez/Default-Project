import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Blog
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Tecnología & Negocios
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Artículo de Consultoría Tecnológica'}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 py-3">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-blue-500" /> Brayan Quemba Tellez
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> 14 de Octubre, 2026
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> 5 min de lectura
          </span>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden h-80 bg-gray-100 dark:bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
          alt="Portada del artículo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed">
        <p>
          Las micro y pequeñas empresas en América Latina enfrentan un entorno cada vez más competitivo donde la automatización y la presencia digital ya no son opcionales, sino imperativas para la supervivencia del negocio.
        </p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
          1. Automatización de Facturación y Cobro
        </h2>
        <p>
          Reducir los tiempos de conciliación bancaria mediante la integración directa de pasarelas de pago colombianas como Wompi, PSE o Nequi permite que los clientes completen sus transacciones sin fricción y disminuye el error humano en un 90%.
        </p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">
          2. Gestión Centralizada en la Nube
        </h2>
        <p>
          Tener un catálogo unificado, control de inventario en tiempo real y módulo de agendamiento sincronizado permite escalar la operación sin aumentar costos fijos de personal operativo de manera desproporcionada.
        </p>
      </div>
    </article>
  );
}
