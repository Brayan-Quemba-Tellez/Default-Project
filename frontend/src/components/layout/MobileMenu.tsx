import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navItems } from './Navbar';
import { useAuth } from '@/contexts/AuthContext';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            {Icon && <Icon className="w-5 h-5 text-slate-400" />}
            {item.name}
          </NavLink>
        );
      })}

      {!isAuthenticated && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            Crear Cuenta
          </Link>
        </div>
      )}
    </div>
  );
};
