# ESPECIFICACIÓN TÉCNICA FRONTEND
## Plataforma de Gestión PyMEs y E-commerce
### Documento de Implementación Frontend

**Proyecto:** Página Web Integral para Brayan Quemba Tellez  
**Especialista:** Senior Frontend Engineer  
**Fecha:** Septiembre 2026  
**Versión:** 1.0  
**Base:** backend.md v1.0 + arquitectura.md v1.0

---

## 1. STACK TECNOLÓGICO

### 1.1. Componentes Principales

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Framework** | React | 18+ | UI Library |
| **Lenguaje** | TypeScript | 5+ | Type safety |
| **Estilos** | Tailwind CSS | 3+ | Utility-first CSS |
| **Estado Global** | Context API + Zustand | - | State management |
| **Routing** | React Router | 6+ | Navegación SPA |
| **Formularios** | React Hook Form | 7+ | Manejo de formularios |
| **Validación** | Zod | 3+ | Schema validation |
| **HTTP Client** | TanStack Query | 5+ | Data fetching + cache |
| **Notificaciones** | Sonner | - | Toast notifications |
| **Build Tool** | Vite | 5+ | Bundler |
| **Testing** | Vitest + Testing Library | - | Pruebas |
| **Linting** | ESLint + Prettier | - | Code quality |

### 1.2. Dependencias Principales

| Paquete | Propósito |
|---------|-----------|
| react | UI Library |
| react-dom | DOM rendering |
| react-router-dom | Routing |
| @tanstack/react-query | Data fetching |
| react-hook-form | Formularios |
| zod | Validación |
| @hookform/resolvers | Integración Zod + RHF |
| zustand | Estado ligero |
| sonner | Notificaciones |
| tailwindcss | Estilos |
| @headlessui/react | Componentes accesibles |
| axios | HTTP client (para interceptors) |
| lucide-react | Iconografía |

---

## 2. ESTRUCTURA DEL PROYECTO

### 2.1. Árbol de Directorios Frontend

```
frontend/
│
├── src/
│   ├── main.tsx                  ← Punto de entrada
│   ├── App.tsx                   ← Configuración principal
│   ├── vite-env.d.ts             ← Tipos Vite
│   │
│   ├── api/                      ← Servicios API
│   │   ├── client.ts             ← Configuración Axios
│   │   ├── auth.api.ts           ← Endpoints auth
│   │   ├── users.api.ts          ← Endpoints users
│   │   ├── categories.api.ts     ← Endpoints categories
│   │   ├── products.api.ts       ← Endpoints products
│   │   ├── cart.api.ts           ← Endpoints cart
│   │   ├── orders.api.ts         ← Endpoints orders
│   │   ├── appointments.api.ts   ← Endpoints appointments
│   │   ├── quotations.api.ts     ← Endpoints quotations
│   │   ├── blog.api.ts           ← Endpoints blog
│   │   ├── contact.api.ts        ← Endpoints contact
│   │   ├── chat.api.ts           ← Endpoints chat
│   │   └── analytics.api.ts      ← Endpoints analytics
│   │
│   ├── hooks/                    ← Custom hooks
│   │   ├── useAuth.ts            ← Autenticación
│   │   ├── useCart.ts            ← Carrito
│   │   ├── useProducts.ts        ← Productos
│   │   ├── useCategories.ts      ← Categorías
│   │   ├── useOrders.ts          ← Pedidos
│   │   ├── useAppointments.ts    ← Citas
│   │   ├── useQuotations.ts      ← Cotizaciones
│   │   ├── useBlog.ts            ← Blog
│   │   ├── useChat.ts            ← Chatbot
│   │   ├── useDarkMode.ts        ← Modo oscuro
│   │   └── useDebounce.ts        ← Búsqueda
│   │
│   ├── stores/                   ← Zustand stores
│   │   ├── auth.store.ts         ← Estado auth
│   │   ├── cart.store.ts         ← Estado carrito
│   │   ├── ui.store.ts           ← Estado UI (sidebar, modals)
│   │   └── theme.store.ts        ← Tema (claro/oscuro)
│   │
│   ├── contexts/                 ← React Context
│   │   ├── AuthContext.tsx        ← Provider auth
│   │   └── ThemeContext.tsx       ← Provider tema
│   │
│   ├── components/               ← Componentes reutilizables
│   │   ├── ui/                   ← Componentes base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Pagination.tsx
│   │   │
│   │   ├── layout/               ← Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── auth/                 ← Componentes auth
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── products/             ← Componentes productos
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── SearchBar.tsx
│   │   │
│   │   ├── cart/                 ← Componentes carrito
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartDrawer.tsx
│   │   │
│   │   ├── blog/                 ← Componentes blog
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogGrid.tsx
│   │   │   ├── BlogFilters.tsx
│   │   │   └── BlogContent.tsx
│   │   │
│   │   ├── chat/                 ← Componentes chatbot
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatOptions.tsx
│   │   │   └── ChatInput.tsx
│   │   │
│   │   └── common/               ← Componentes comunes
│   │       ├── ThemeToggle.tsx
│   │       ├── CookieConsent.tsx
│   │       ├── HabeasDataConsent.tsx
│   │       └── Analytics.tsx
│   │
│   ├── pages/                    ← Páginas/Vistas
│   │   ├── Home/
│   │   │   └── HomePage.tsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── Products/
│   │   │   ├── ProductsPage.tsx
│   │   │   └── ProductDetailPage.tsx
│   │   ├── Cart/
│   │   │   └── CartPage.tsx
│   │   ├── Orders/
│   │   │   ├── OrdersPage.tsx
│   │   │   └── OrderDetailPage.tsx
│   │   ├── Appointments/
│   │   │   └── AppointmentsPage.tsx
│   │   ├── Quotations/
│   │   │   └── QuotationsPage.tsx
│   │   ├── Blog/
│   │   │   ├── BlogPage.tsx
│   │   │   └── BlogPostPage.tsx
│   │   ├── Contact/
│   │   │   └── ContactPage.tsx
│   │   ├── Profile/
│   │   │   └── ProfilePage.tsx
│   │   └── admin/
│   │       ├── DashboardPage.tsx
│   │       ├── AdminProductsPage.tsx
│   │       ├── AdminOrdersPage.tsx
│   │       ├── AdminBlogPage.tsx
│   │       └── AdminContactsPage.tsx
│   │
│   ├── schemas/                  ← Schemas Zod
│   │   ├── auth.schema.ts
│   │   ├── user.schema.ts
│   │   ├── product.schema.ts
│   │   ├── cart.schema.ts
│   │   ├── order.schema.ts
│   │   ├── appointment.schema.ts
│   │   ├── quotation.schema.ts
│   │   ├── blog.schema.ts
│   │   └── contact.schema.ts
│   │
│   ├── types/                    ← Tipos TypeScript
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   ├── cart.types.ts
│   │   ├── order.types.ts
│   │   ├── appointment.types.ts
│   │   ├── quotation.types.ts
│   │   ├── blog.types.ts
│   │   └── contact.types.ts
│   │
│   ├── utils/                    ← Utilidades
│   │   ├── formatters.ts         ← Formateo de datos
│   │   ├── validators.ts         ← Validaciones
│   │   ├── constants.ts          ← Constantes
│   │   └── helpers.ts            ← Funciones auxiliares
│   │
│   ├── styles/                   ← Estilos globales
│   │   ├── globals.css           ← Estilos globales + Tailwind
│   │   └── theme.css             ← Variables de tema
│   │
│   └── assets/                   ← Assets estáticos
│       ├── images/
│       └── icons/
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── .env.example
├── .eslintrc.js
└── .prettierrc
```

---

## 3. RUTAS Y NAVEGACIÓN

### 3.1. Estructura de Rutas

| Ruta | Página | Autenticación | Descripción |
|------|--------|---------------|-------------|
| `/` | HomePage | Pública | Inicio con hero, categorías destacadas |
| `/login` | LoginPage | Pública | Inicio de sesión |
| `/register` | RegisterPage | Pública | Registro de usuario |
| `/productos` | ProductsPage | Pública | Catálogo de productos |
| `/productos/:slug` | ProductDetailPage | Pública | Detalle de producto |
| `/carrito` | CartPage | Protegida | Carrito de compras |
| `/pedidos` | OrdersPage | Protegida | Historial de pedidos |
| `/pedidos/:id` | OrderDetailPage | Protegida | Detalle de pedido |
| `/citas` | AppointmentsPage | Protegida | Gestión de citas |
| `/cotizaciones` | QuotationsPage | Protegida | Solicitar cotización |
| `/blog` | BlogPage | Pública | Listado de posts |
| `/blog/:slug` | BlogPostPage | Pública | Post individual |
| `/contacto` | ContactPage | Pública | Formulario de contacto |
| `/perfil` | ProfilePage | Protegida | Perfil de usuario |
| `/admin` | DashboardPage | Admin | Dashboard administrativo |
| `/admin/productos` | AdminProductsPage | Admin | Gestionar productos |
| `/admin/pedidos` | AdminOrdersPage | Admin | Gestionar pedidos |
| `/admin/blog` | AdminBlogPage | Admin | Gestionar blog |
| `/admin/contactos` | AdminContactsPage | Admin | Gestionar contactos |

### 3.2. Guards de Autenticación

**Rutas Públicas:**
- No requieren token
- Accesibles para todos

**Rutas Protegidas:**
- Requieren token JWT válido
- Redirigen a `/login` si no hay token
- Guard: ProtectedRoute

**Rutas Admin:**
- Requieren token JWT + role "admin"
- Redirigen a `/` si no es admin
- Guard: ProtectedRoute + role check

### 3.3. Lazy Loading por Ruta

| Ruta | Componente | Prioridad Carga |
|------|------------|-----------------|
| `/` | HomePage | Alta (above-fold) |
| `/productos` | ProductsPage | Alta |
| `/blog` | BlogPage | Media |
| `/login` | LoginPage | Media |
| `/register` | RegisterPage | Media |
| `/carrito` | CartPage | Baja (solo auth) |
| `/pedidos` | OrdersPage | Baja |
| `/citas` | AppointmentsPage | Baja |
| `/cotizaciones` | QuotationsPage | Baja |
| `/admin/*` | AdminPages | Baja (solo admin) |

---

## 4. COMPONENTES PRINCIPALES

### 4.1. Componentes de Layout

| Componente | Responsabilidad | Hijos |
|------------|-----------------|-------|
| **Layout** | Wrapper principal | Header, Footer, Main |
| **Header** | Navegación superior | Logo, Navbar, CartIcon, ThemeToggle, UserMenu |
| **Navbar** | Menú de navegación | Links por módulo |
| **MobileMenu** | Menú hamburguesa | Links responsive |
| **Footer** | Pie de página | Links, Redes sociales, Newsletter |
| **Sidebar** | Panel lateral (admin) | Links admin |

### 4.2. Componentes de UI Base

| Componente | Props | Uso |
|------------|-------|-----|
| **Button** | variant, size, loading, disabled | Acciones |
| **Input** | type, label, error, placeholder | Formularios |
| **Select** | options, label, value, onChange | Formularios |
| **Modal** | isOpen, onClose, title, children | Diálogos |
| **Card** | children, className | Contenedor |
| **Badge** | variant, children | Estados |
| **Spinner** | size | Carga |
| **Toast** | type, message | Notificaciones |
| **Pagination** | page, totalPages, onPageChange | Listas |

### 4.3. Componentes de Productos

| Componente | Props | Uso |
|------------|-------|-----|
| **ProductCard** | product, onAddToCart | Tarjeta de producto |
| **ProductGrid** | products, loading | Grid de productos |
| **ProductFilters** | categories, onFilterChange | Filtros laterales |
| **ProductDetail** | product, onAddToCart | Detalle completo |
| **SearchBar** | value, onSearch | Búsqueda de productos |

### 4.4. Componentes de Carrito

| Componente | Props | Uso |
|------------|-------|-----|
| **CartItem** | item, onUpdateQuantity, onRemove | Item del carrito |
| **CartSummary** | items, subtotal, total | Resumen del carrito |
| **CartDrawer** | isOpen, items | Drawer lateral del carrito |

### 4.5. Componentes de Blog

| Componente | Props | Uso |
|------------|-------|-----|
| **BlogCard** | post | Tarjeta de post |
| **BlogGrid** | posts, loading | Grid de posts |
| **BlogFilters** | categories, onFilterChange | Filtros de categoría |
| **BlogContent** | content | Contenido renderizado |

### 4.6. Componentes de Chat

| Componente | Props | Uso |
|------------|-------|-----|
| **ChatWidget** | isOpen, onToggle | Widget flotante |
| **ChatMessage** | message, sender | Mensaje individual |
| **ChatOptions** | options, onSelect | Opciones predefinidas |
| **ChatInput** | onSend, disabled | Input de mensaje |

---

## 5. CONSUMO DE ENDPOINTS

### 5.1. Módulo Auth

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| LoginPage | `/api/v1/auth/login` | POST | email, password → token |
| RegisterPage | `/api/v1/auth/register` | POST | userData → user |
| Header | `/api/v1/auth/logout` | POST | token → success |
| Header | `/api/v1/auth/refresh` | POST | refresh_token → token |

### 5.2. Módulo Users

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| ProfilePage | `/api/v1/users/me` | GET | token → user |
| ProfilePage | `/api/v1/users/me` | PUT | userData → user |

### 5.3. Módulo Categories

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| HomePage | `/api/v1/categories` | GET | sector? → [category] |
| ProductsPage | `/api/v1/categories` | GET | sector? → [category] |
| ProductsPage | `/api/v1/categories/{slug}` | GET | slug → category |

### 5.4. Módulo Products

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| HomePage | `/api/v1/products/featured` | GET | → [product] |
| ProductsPage | `/api/v1/products` | GET | filters, pagination → {items, total} |
| ProductDetailPage | `/api/v1/products/{slug}` | GET | slug → product |

### 5.5. Módulo Cart

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| CartPage | `/api/v1/cart` | GET | token → {items, total} |
| ProductCard | `/api/v1/cart/items` | POST | product_id, quantity → item |
| CartItem | `/api/v1/cart/items/{id}` | PUT | quantity → item |
| CartItem | `/api/v1/cart/items/{id}` | DELETE | → success |

### 5.6. Módulo Orders

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| OrdersPage | `/api/v1/orders` | GET | status?, pagination → {items} |
| OrderDetailPage | `/api/v1/orders/{id}` | GET | id → order |
| CartPage | `/api/v1/orders` | POST | shipping_address, payment_method → order |

### 5.7. Módulo Appointments

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| AppointmentsPage | `/api/v1/appointments` | GET | status? → [appointment] |
| AppointmentsPage | `/api/v1/appointments/available` | GET | date, service_type → slots |
| AppointmentsPage | `/api/v1/appointments` | POST | appointmentData → appointment |
| AppointmentsPage | `/api/v1/appointments/{id}` | PUT | appointmentData → appointment |
| AppointmentsPage | `/api/v1/appointments/{id}` | DELETE | → success |

### 5.8. Módulo Quotations

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| QuotationsPage | `/api/v1/quotations` | GET | status? → [quotation] |
| QuotationsPage | `/api/v1/quotations/{id}` | GET | id → quotation |
| QuotationsPage | `/api/v1/quotations` | POST | items, notes → quotation |

### 5.9. Módulo Blog

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| BlogPage | `/api/v1/blog` | GET | category?, pagination → {items} |
| BlogPostPage | `/api/v1/blog/{slug}` | GET | slug → post |

### 5.10. Módulo Contact

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| ContactPage | `/api/v1/contact` | POST | contactData → contact |

### 5.11. Módulo Chat

| Componente | Endpoint | Método | Datos |
|------------|----------|--------|-------|
| ChatWidget | `/api/v1/chat/start` | POST | session_id → conversation |
| ChatWidget | `/api/v1/chat/message` | POST | conversation_id, message → response |
| ChatWidget | `/api/v1/chat/history/{session}` | GET | session → [message] |

### 5.12. Módulo Consent

| Componente | Endpoint | Método | Datos |
|------------|----------|--------|-------|
| CookieConsent | `/api/v1/consent` | POST | consent_type, is_granted → consent |
| HabeasDataConsent | `/api/v1/consent` | POST | consent_type, is_granted → consent |

---

## 6. ESTADOS GLOBALES

### 6.1. Auth Store (Zustand)

**Estado:**
- user: User | null
- token: string | null
- isAuthenticated: boolean
- isLoading: boolean

**Acciones:**
- login(credentials)
- register(userData)
- logout()
- refreshToken()
- updateUser(userData)

**Persistencia:** localStorage (token, user)

### 6.2. Cart Store (Zustand)

**Estado:**
- items: CartItem[]
- subtotal: number
- total: number
- itemCount: number

**Acciones:**
- addItem(productId, quantity)
- updateItem(itemId, quantity)
- removeItem(itemId)
- clearCart()
- calculateTotals()

**Persistencia:** localStorage (items)

### 6.3. UI Store (Zustand)

**Estado:**
- isSidebarOpen: boolean
- isCartDrawerOpen: boolean
- isMobileMenuOpen: boolean
- isChatOpen: boolean

**Acciones:**
- toggleSidebar()
- toggleCartDrawer()
- toggleMobileMenu()
- toggleChat()

### 6.4. Theme Store (Zustand)

**Estado:**
- theme: 'light' | 'dark'
- isSystemPreference: boolean

**Acciones:**
- setTheme(theme)
- toggleTheme()
- setSystemPreference(boolean)

**Persistencia:** localStorage (theme)

---

## 7. FORMULARIOS

### 7.1. Formulario de Login

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| email | email | Email válido | Sí |
| password | password | Mínimo 8 caracteres | Sí |

**Endpoint:** POST `/api/v1/auth/login`

### 7.2. Formulario de Registro

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| full_name | text | Mínimo 2 caracteres | Sí |
| email | email | Email válido | Sí |
| password | password | Mínimo 8 caracteres | Sí |
| confirm_password | password | Debe coincidir | Sí |
| phone | tel | Formato válido | No |
| document_type | select | CC/NIT/CE | Sí |
| document_number | text | Mínimo 5 caracteres | Sí |
| accept_terms | checkbox | Debe aceptar | Sí |

**Endpoint:** POST `/api/v1/auth/register`

### 7.3. Formulario de Contacto

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| name | text | Mínimo 2 caracteres | Sí |
| email | email | Email válido | Sí |
| phone | tel | Formato válido | No |
| company | text | - | No |
| message | textarea | Mínimo 10 caracteres | Sí |
| consent_given | checkbox | Debe aceptar | Sí |

**Endpoint:** POST `/api/v1/contact`

### 7.4. Formulario de Agendamiento

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| service_type | select | consulta/mantenimiento/desarrollo | Sí |
| title | text | Mínimo 3 caracteres | Sí |
| description | textarea | - | No |
| scheduled_date | date | Fecha futura | Sí |
| scheduled_time | time | Horario disponible | Sí |
| duration_minutes | number | 30-480 | No (default 60) |
| location | text | - | No |
| notes | textarea | - | No |

**Endpoint:** POST `/api/v1/appointments`

### 7.5. Formulario de Cotización

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| items | array | Mínimo 1 item | Sí |
| items[].description | text | Mínimo 3 caracteres | Sí |
| items[].quantity | number | Mínimo 1 | Sí |
| items[].unit_price | number | Mínimo 0 | Sí |
| notes | textarea | - | No |

**Endpoint:** POST `/api/v1/quotations`

### 7.6. Formulario de Checkout

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| shipping_address | object | - | Sí |
| shipping_address.street | text | - | Sí |
| shipping_address.city | text | - | Sí |
| shipping_address.state | text | - | Sí |
| shipping_address.zip | text | - | Sí |
| shipping_address.country | text | - | Sí |
| payment_method | select | wompi/pse/nequi | Sí |
| notes | textarea | - | No |

**Endpoint:** POST `/api/v1/orders`

---

## 8. INTEGRACIONES EXTERNAS

### 8.1. Widget de Pago Wompi

**Componente:** WompiCheckout

**Flujo:**
1. Usuario completa checkout
2. Frontend llama a POST `/api/v1/orders`
3. Backend retorna `wompi_checkout_url`
4. Frontend redirige a widget de Wompi
5. Wompi procesa pago
6. Wompi redirige a `/pedidos/{id}?status=success`
7. Frontend muestra confirmación

**Estados del widget:**
- loading: Cargando widget
- ready: Widget listo
- processing: Procesando pago
- success: Pago exitoso
- error: Error en pago

### 8.2. Chatbot Widget

**Componente:** ChatWidget

**Flujo:**
1. Widget flotante en esquina inferior derecha
2. Click para abrir/cerrar
3. Opciones predefinidas iniciales
4. Selección de tema
5. Respuesta automática
6. Si no hay respuesta → "Contactar asesor"
7. Formulario de contacto integrado

**Base de conocimiento:**
- Horarios de atención
- Servicios ofrecidos
- Formas de contacto
- Ubicación
- Presupuestos

### 8.3. Google Analytics

**Componente:** Analytics

**Eventos a trackear:**
- page_view: Cada cambio de ruta
- product_view: Vista de producto
- add_to_cart: Agregar al carrito
- purchase: Completar compra
- contact_form: Envío de formulario
- blog_post_view: Vista de post

**Implementación:**
- Inicializar GA4 en App.tsx
- Enviar eventos vía hooks personalizados
- Respetar consentimiento de cookies

### 8.4. Modo Oscuro

**Componente:** ThemeToggle

**Implementación:**
- CSS variables para colores
- Tailwind dark mode
- localStorage para persistencia
- Toggle en header/navbar

**Paleta de colores:**

| Elemento | Claro | Oscuro |
|----------|-------|--------|
| Background | #ffffff | #1a1a2e |
| Surface | #f5f5f5 | #16213e |
| Primary | #3b82f6 | #60a5fa |
| Text | #1f2937 | #f3f4f6 |
| Border | #e5e7eb | #374151 |

---

## 9. RESPONSIVE DESIGN

### 9.1. Breakpoints

| Breakpoint | Ancho | Dispositivo |
|------------|-------|-------------|
| **xs** | < 640px | Móvil pequeño |
| **sm** | 640px+ | Móvil |
| **md** | 768px+ | Tablet |
| **lg** | 1024px+ | Desktop |
| **xl** | 1280px+ | Desktop grande |
| **2xl** | 1536px+ | Pantalla grande |

### 9.2. Layout por Breakpoint

| Componente | Móvil | Tablet | Desktop |
|------------|-------|--------|---------|
| **Header** | Logo + Cart + Hamburger | Logo + Nav + Cart | Logo + Nav + Cart + User |
| **Navbar** | Drawer lateral | Horizontal | Horizontal |
| **Products** | 1 columna | 2 columnas | 3-4 columnas |
| **Blog** | 1 columna | 2 columnas | 3 columnas |
| **Cart** | Página completa | Drawer | Drawer |
| **Chat** | Fullscreen | Widget flotante | Widget flotante |
| **Sidebar** | Oculto | Oculto | Visible (admin) |

### 9.3. Componentes Responsive

**Mobile First:**
- Estilos base para móvil
- `sm:`, `md:`, `lg:` para escalar

**Touch Targets:**
- Mínimo 44x44px para botones en móvil
- Espaciado adecuado entre elementos

**Gestos:**
- Swipe para eliminar items del carrito
- Pull to refresh en listas
- Tap para seleccionar

---

## 10. ACCESIBILIDAD (WCAG 2.1 AA)

### 10.1. Requisitos

| Requisito | Implementación |
|-----------|----------------|
| **Contraste** | Ratio mínimo 4.5:1 para texto |
| **Navegación teclado** | Tab order lógico, focus visible |
| **Labels** | Todos los inputs con labels |
| **Imágenes** | Alt text obligatorio |
| **Formularios** | Mensajes de error claros |
| **ARIA** | Roles y labels ARIA |
| **Skip links** | Saltar al contenido principal |

### 10.2. Componentes Accesibles

**Button:**
- aria-label para iconos
- aria-disabled para disabled
- Focus ring visible

**Input:**
- label asociado con htmlFor
- aria-describedby para errores
- aria-invalid para errores

**Modal:**
- aria-modal="true"
- aria-labelledby para título
- Focus trap dentro del modal
- Escape para cerrar

**Menu:**
- aria-expanded para toggle
- aria-haspopup="menu"
- Navegación con flechas

### 10.3. Testing de Accesibilidad

**Herramientas:**
- axe-core para testing automatizado
- Lighthouse para auditoría
- Screen readers (NVDA, VoiceOver)
- Keyboard-only navigation

---

## 11. SEO

### 11.1. Meta Tags por Página

| Página | Title | Description |
|--------|-------|-------------|
| Home | Brayan Quemba Tellez - Servicios Tecnológicos | Soluciones tecnológicas para PyMEs |
| Products | Productos | Catálogo de productos y servicios |
| Blog | Blog | Noticias y artículos de tecnología |
| Contact | Contacto | Formulario de contacto |

### 11.2. Open Graph Tags

| Tag | Valor |
|-----|-------|
| og:title | Título de la página |
| og:description | Descripción de la página |
| og:image | Imagen de la página |
| og:url | URL de la página |
| og:type | website |

### 11.3. Sitemap

- Generar sitemap.xml con todas las rutas
- Incluir/products y/blog posts
- Actualizar automáticamente

---

## 12. PERFORMANCE

### 12.1. Métricas Objetivo

| Métrica | Objetivo |
|---------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **FID** (First Input Delay) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |
| **TTI** (Time to Interactive) | < 3.5s |
| **TTFB** (Time to First Byte) | < 800ms |

### 12.2. Estrategias de Optimización

| Estrategia | Implementación |
|------------|----------------|
| **Code Splitting** | Lazy loading por ruta |
| **Tree Shaking** | Eliminar código no utilizado |
| **Image Optimization** | Formatos modernos (WebP, AVIF) |
| **Caching** | Service Worker para assets |
| **Minification** | CSS y JS minificados |
| **Compression** | Gzip/Brotli en servidor |

### 12.3. Bundle Size Targets

| Paquete | Tamaño Máximo |
|---------|---------------|
| **Vendor** | 150 KB |
| **App** | 100 KB |
| **Styles** | 50 KB |
| **Total** | 300 KB |

---

## 13. TESTING

### 13.1. Estrategia

| Tipo | Framework | Cobertura |
|------|-----------|-----------|
| **Unit** | Vitest | 80% |
| **Component** | Vitest + Testing Library | 70% |
| **E2E** | Playwright/Cypress | Flujos principales |

### 13.2. Estructura

```
tests/
├── unit/
│   ├── hooks/
│   │   ├── useAuth.test.ts
│   │   ├── useCart.test.ts
│   │   └── ...
│   ├── utils/
│   │   ├── formatters.test.ts
│   │   └── validators.test.ts
│   └── schemas/
│       ├── auth.schema.test.ts
│       └── ...
├── component/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Input.test.tsx
│   │   └── ...
│   └── pages/
│       ├── HomePage.test.tsx
│       └── ...
└── e2e/
    ├── flows/
    │   ├── login.flow.ts
    │   ├── purchase.flow.ts
    │   └── appointment.flow.ts
    └── fixtures/
        └── users.json
```

---

## 14. VARIABLES DE ENTORNO

### 14.1. Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| VITE_API_URL | URL del backend | http://localhost:8000 |
| VITE_WOMPI_PUBLIC_KEY | Public key Wompi | pub_test_xxxxx |
| VITE_WOMPI_API_URL | URL API Wompi | https://api-sandbox.wompi.co |
| VITE_GA_TRACKING_ID | Google Analytics | G-XXXXXXXXXX |
| VITE_APP_NAME | Nombre de la app | PyMEs Platform |
| VITE_APP_URL | URL de la app | http://localhost:3000 |

### 14.2. Variables Compartidas (Backend → Frontend)

Variables backend definidas en backend.md sección 11.1 que no necesitan valores en frontend (consumidas por API):
- DATABASE_URL, REDIS_URL, JWT_SECRET_KEY, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS, WOMPI_API_KEY, SALESFORCE_API_KEY, SENDGRID_API_KEY, GA_TRACKING_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, CLOUDWATCH_LOG_GROUP, ENVIRONMENT, DEBUG, ALLOWED_ORIGINS

Nota: El frontend solo necesita VITE_API_URL para conectarse al backend. Todas las demás variables son consumidas por el backend.

---

## 15. DOCKER COMPOSE (FRONTEND)

### 15.1. Servicios

| Servicio | Imagen | Puerto | Propósito |
|----------|--------|--------|-----------|
| frontend | node:20-alpine | 3000 | Dev server Vite |

### 15.2. Configuración

- Hot reload habilitado
- Puerto 3000 expuesto
- Variable VITE_API_URL para backend

---

## 16. COHERENCIA CON BACKEND.MD

### 16.1. Endpoints Consumidos

| Backend Endpoint | Frontend Página | Método |
|------------------|-----------------|--------|
| POST /auth/login | LoginPage | POST |
| POST /auth/register | RegisterPage | POST |
| POST /auth/logout | Header | POST |
| POST /auth/refresh | Client interceptor | POST |
| GET /users/me | ProfilePage | GET |
| PUT /users/me | ProfilePage | PUT |
| GET /categories | HomePage, ProductsPage | GET |
| GET /products | ProductsPage | GET |
| GET /products/featured | HomePage | GET |
| GET /products/{slug} | ProductDetailPage | GET |
| GET /cart | CartPage | GET |
| POST /cart/items | ProductCard | POST |
| PUT /cart/items/{id} | CartItem | PUT |
| DELETE /cart/items/{id} | CartItem | DELETE |
| GET /orders | OrdersPage | GET |
| GET /orders/{id} | OrderDetailPage | GET |
| POST /orders | CartPage | POST |
| GET /appointments | AppointmentsPage | GET |
| GET /appointments/available | AppointmentsPage | GET |
| POST /appointments | AppointmentsPage | POST |
| PUT /appointments/{id} | AppointmentsPage | PUT |
| DELETE /appointments/{id} | AppointmentsPage | DELETE |
| GET /quotations | QuotationsPage | GET |
| POST /quotations | QuotationsPage | POST |
| GET /blog | BlogPage | GET |
| GET /blog/{slug} | BlogPostPage | GET |
| POST /contact | ContactPage | POST |
| POST /chat/start | ChatWidget | POST |
| POST /chat/message | ChatWidget | POST |
| GET /chat/history/{session} | ChatWidget | GET |
| POST /consent | CookieConsent, HabeasData | POST |
| GET /users/{id} | AdminDashboard | GET |
| POST /categories | AdminProductsPage | POST |
| PUT /categories/{id} | AdminProductsPage | PUT |
| DELETE /categories/{id} | AdminProductsPage | DELETE |
| POST /products | AdminProductsPage | POST |
| PUT /products/{id} | AdminProductsPage | PUT |
| DELETE /products/{id} | AdminProductsPage | DELETE |
| PUT /orders/{id}/status | AdminOrdersPage | PUT |
| POST /blog | AdminBlogPage | POST |
| PUT /blog/{id} | AdminBlogPage | PUT |
| DELETE /blog/{id} | AdminBlogPage | DELETE |
| GET /contact | AdminContactsPage | GET |
| POST /analytics/event | Analytics.tsx | POST |
| GET /analytics/dashboard | AdminDashboard | GET |

### 16.2. Autenticación

**Token Flow:**
1. Login → access_token (30 min) + refresh_token (7 días)
2. Almacenar ambos en localStorage
3. Enviar access_token en Authorization header
4. Si 401 → intentar refresh
5. Si refresh falla → logout

**Interceptor Axios:**
- Request: Agregar token a headers
- Response: Si 401, intentar refresh
- Si refresh falla, logout

### 16.3. Paginación

**Formato Backend:**
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "pages": 10
}
```

**Formato Frontend:**
- Parámetros: page, limit
- Componente Pagination
- Infinite scroll (opcional)

### 16.4. Matriz de Endpoints Admin (No Mapeados en Sección 5)

| Backend Endpoint | Método | Página Admin | Descripción |
|------------------|--------|--------------|-------------|
| `/users/{id}` | GET | AdminDashboard | Obtener usuario específico |
| `/categories` | POST | AdminProductsPage | Crear categoría |
| `/categories/{id}` | PUT | AdminProductsPage | Actualizar categoría |
| `/categories/{id}` | DELETE | AdminProductsPage | Eliminar categoría |
| `/products` | POST | AdminProductsPage | Crear producto |
| `/products/{id}` | PUT | AdminProductsPage | Actualizar producto |
| `/products/{id}` | DELETE | AdminProductsPage | Eliminar producto |
| `/orders/{id}/status` | PUT | AdminOrdersPage | Actualizar estado del pedido |
| `/blog` | POST | AdminBlogPage | Crear post |
| `/blog/{id}` | PUT | AdminBlogPage | Actualizar post |
| `/blog/{id}` | DELETE | AdminBlogPage | Eliminar post |
| `/contact` | GET | AdminContactsPage | Listar mensajes de contacto |
| `/analytics/event` | POST | Analytics.tsx | Registrar evento de tracking |
| `/analytics/dashboard` | GET | AdminDashboard | Obtener métricas del dashboard |
| `/consent` | GET | Admin (no explicitado) | Listar consentimientos |

### 16.5. Flujos de Usuario (UX)

Basado en Brief.md sección 11:

| Tipo de Usuario | Flujo |
|-----------------|-------|
| **Nuevo** | Descubrimiento (blog, categorías, búsqueda) → Registro → Primera compra/agendamiento |
| **Recurrente** | Recompra rápida (carrito guardado, historial) → Agendamiento recurrente → Acceso a historial de cotizaciones |
| **Con Dudas** | Flujo de asistencia (búsqueda soporte antes de comprar) → FAQs integradas → Contacto directo (WhatsApp/Instagram) |
| **Recuperado** | Carrito abandonado (recordatorios) → Descuento de reenganche → Seguimiento post-agendamiento |

### 16.6. Coherencia de service_type

Brief.md menciona "Agendar llamadas" además de citas. El campo `service_type` en appointments acepta: `consulta`, `mantenimiento`, `desarrollo`, `llamada`.

| service_type | Descripción |
|-------------|-------------|
| consulta | Consulta técnica |
| mantenimiento | Mantenimiento de equipos |
| desarrollo | Desarrollo de software |
| llamada | Agendar llamada |

### 16.7. Disponibilidad de Servicios

Campo `is_available` en products (VARCHAR/BOOLEAN) cubre la funcionalidad de "Estado de disponibilidad de servicios (disponible/no disponible)" requerida en Brief.md sección 6.3.

**Errores Backend:**
- 400: Bad Request → Toast error
- 401: Unauthorized → Logout
- 403: Forbidden → Toast error
- 404: Not Found → Página 404
- 422: Validation → Errores en formulario
- 500: Server Error → Toast error

**Componentes de Error:**
- Toast para errores transientes
- ErrorBoundary para errores fatales
- Página 404 para rutas no encontradas

---

**Documento generado por:** Senior Frontend Engineer  
**Última actualización:** Septiembre 2026  
**Próxima revisión:** Al finalizar Sprint 1