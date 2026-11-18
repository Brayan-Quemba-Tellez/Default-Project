import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                PY
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">PyMEs Platform</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transformación digital integral, comercio electrónico y gestión empresarial para PyMEs en Colombia y Latinoamérica.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/productos" className="hover:text-blue-600 dark:hover:text-blue-400">Catálogo de Productos</Link></li>
              <li><Link to="/citas" className="hover:text-blue-600 dark:hover:text-blue-400">Agendar Cita</Link></li>
              <li><Link to="/cotizaciones" className="hover:text-blue-600 dark:hover:text-blue-400">Solicitar Cotización</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog & Artículos</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" /> contacto@tudominio.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" /> +57 (300) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" /> Bogotá D.C., Colombia
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Legal y Privacidad
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400">Política de Privacidad</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400">Términos y Condiciones</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400">Tratamiento de Datos (Habeas Data)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Brayan Quemba Tellez - Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Desarrollado con <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para PyMEs
          </p>
        </div>
      </div>
    </footer>
  );
}
