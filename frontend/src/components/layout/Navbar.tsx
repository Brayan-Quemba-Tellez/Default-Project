import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers, Calendar, FileText, BookOpen, Mail, LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  path: string;
  icon?: LucideIcon;
}

export const navItems: NavItem[] = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/productos', icon: Layers },
  { name: 'Citas', path: '/citas', icon: Calendar },
  { name: 'Cotizaciones', path: '/cotizaciones', icon: FileText },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Contacto', path: '/contacto', icon: Mail },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Navegación principal">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-semibold'
                : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};
