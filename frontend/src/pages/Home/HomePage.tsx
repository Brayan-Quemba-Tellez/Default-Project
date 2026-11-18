import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  MessageSquare,
  CheckCircle2,
  Users,
  Award
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      title: 'Comercio Electrónico B2B & B2C',
      description: 'Catálogo dinámico, pasarela Wompi integrada, gestión de inventario y pedidos en tiempo real.',
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Agendamiento Inteligente',
      description: 'Reserva citas de consultoría técnica o mantenimiento con sincronización directa de disponibilidad.',
      icon: Calendar,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Cotizaciones Automatizadas',
      description: 'Generación instantánea de propuestas comerciales y presupuestos ajustados a tu modelo de negocio.',
      icon: FileText,
      gradient: 'from-violet-500 to-pink-500',
    },
    {
      title: 'Soporte y Consultoría Experta',
      description: 'Acompañamiento especializado por Brayan Quemba Tellez para escalar tu infraestructura tecnológica.',
      icon: Cpu,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    { label: 'PyMEs Impulsadas', value: '150+' },
    { label: 'Disponibilidad Cloud', value: '99.9%' },
    { label: 'Tiempo de Respuesta', value: '< 2h' },
    { label: 'Satisfacción de Clientes', value: '98%' },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Glow blur background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Transformación Tecnológica para Micro, Pequeñas y Medianas Empresas</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
            Potencia el crecimiento de tu empresa con soluciones digitales{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              de nivel Enterprise
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Plataforma integral de gestión, ventas y agendamiento personalizada para optimizar la productividad y automatizar tus operaciones.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/productos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all text-base"
            >
              Explorar Catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/citas"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-gray-700 shadow-sm hover:-translate-y-0.5 transition-all text-base"
            >
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Agendar Asesoría
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-800/40 dark:to-gray-900/40 rounded-3xl p-8 sm:p-12 border border-gray-200/80 dark:border-gray-800 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Soluciones integradas diseñadas para tu éxito
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cada módulo está diseñado para resolver las necesidades reales de gestión y ventas de las empresas colombianas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/60 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 sm:p-14 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className="text-blue-100 text-lg">
            Solicita una cotización personalizada o agenda una cita con nuestro equipo técnico hoy mismo.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/cotizaciones"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Pedir Cotización Inmediata
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700/50 hover:bg-blue-700/70 border border-white/20 text-white font-medium transition-colors"
            >
              Escribir un Mensaje
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
