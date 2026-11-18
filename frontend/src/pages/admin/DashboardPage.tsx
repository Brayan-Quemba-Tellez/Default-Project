import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Package, 
  MessageSquare, 
  FileText,
  Calendar,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    { title: 'Ventas Totales (Mes)', value: '$14.850.000 COP', change: '+18.2%', icon: DollarSign, color: 'text-emerald-500' },
    { title: 'Pedidos Completados', value: '42', change: '+12.5%', icon: Package, color: 'text-blue-500' },
    { title: 'Citas Pendientes', value: '7', change: '+3 nuevas', icon: Calendar, color: 'text-purple-500' },
    { title: 'Mensajes / Leads', value: '19', change: '+5 hoy', icon: MessageSquare, color: 'text-amber-500' },
  ];

  const adminModules = [
    { name: 'Gestión de Productos', path: '/admin/productos', icon: ShoppingBag, desc: 'Crear, editar catálogo y actualizar stock' },
    { name: 'Control de Pedidos', path: '/admin/pedidos', icon: Package, desc: 'Ver estado de pagos Wompi y despachos' },
    { name: 'Publicaciones del Blog', path: '/admin/blog', icon: FileText, desc: 'Publicar noticias, tutoriales y guías' },
    { name: 'Contactos & Leads', path: '/admin/contactos', icon: Users, desc: 'Consultas de clientes y prospectos de ventas' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Panel Administrativo PyMEs
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Métricas operacionales y administración integral de la plataforma
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {m.title}
                </span>
                <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {m.value}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Módulos de Gestión
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                to={mod.path}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {mod.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {mod.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
