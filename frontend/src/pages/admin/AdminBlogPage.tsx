import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([
    { id: '1', title: 'Guía Definitiva de Facturación Electrónica DIAN para PyMEs (2026)', category: 'Normativa & DIAN', views: 342, date: '10 Oct 2026' },
    { id: '2', title: 'Por qué integrar Wompi y PSE incrementa tus ventas en línea un 35%', category: 'Comercio Electrónico', views: 512, date: '2 Oct 2026' },
    { id: '3', title: 'Modernización de Servidores con Docker y Nginx para Pequeñas Empresas', category: 'Infraestructura', views: 280, date: '18 Sep 2026' },
  ]);

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast.success('Entrada eliminada.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Gestión de Entradas del Blog
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Crea, edita y administra el contenido educativo y técnico
          </p>
        </div>

        <button
          onClick={() => toast.info('Editor de nuevo artículo abierto.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Redactar Artículo
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Título del Artículo</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Lecturas</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                <td className="px-6 py-4 font-bold max-w-md truncate">{p.title}</td>
                <td className="px-6 py-4 text-xs">{p.category}</td>
                <td className="px-6 py-4 text-xs font-semibold">{p.views}</td>
                <td className="px-6 py-4 text-xs text-gray-400">{p.date}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => toast.info('Editando artículo')} className="p-1.5 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
