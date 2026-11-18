import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  FileText, 
  Users, 
  Settings,
  ChevronLeft
} from 'lucide-react';

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Productos', path: '/admin/productos', icon: Package },
    { name: 'Pedidos', path: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Contactos', path: '/admin/contactos', icon: Users },
  ];

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      } min-h-screen`}
      aria-label="Panel administrativo"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {isOpen && (
          <span className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-100 uppercase">
            Admin Panel
          </span>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'}
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`
              }
              title={!isOpen ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <NavLink
          to="/perfil"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Configuración</span>}
        </NavLink>
      </div>
    </aside>
  );
};
