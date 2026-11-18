import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Sistema ERP para PyMEs Cloud', price: 350000, stock: 25, category: 'Software' },
    { id: '2', name: 'Licencia Servidor Backup Empresarial', price: 180000, stock: 12, category: 'Infraestructura' },
    { id: '3', name: 'Módulo Pasarela Wompi & PSE', price: 120000, stock: 50, category: 'Integraciones' },
    { id: '4', name: 'Paquete Consultoría DevOps & Docker', price: 500000, stock: 8, category: 'Servicios' },
  ]);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Producto eliminado del catálogo.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Administración de Productos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Control de precios, inventario y catálogo activo
          </p>
        </div>

        <button
          onClick={() => toast.info('Función para agregar nuevo producto abierta en modal.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Nuevo Producto
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                <td className="px-6 py-4 font-bold">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4 font-semibold">${p.price.toLocaleString('es-CO')} COP</td>
                <td className="px-6 py-4">{p.stock} unidades</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => toast.info(`Editando producto ${p.name}`)}
                    className="p-1.5 hover:text-blue-600 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 hover:text-red-600 rounded-lg"
                  >
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
