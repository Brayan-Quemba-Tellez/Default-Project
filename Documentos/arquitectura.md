# ARQUITECTURA TÉCNICA DEL SISTEMA
## Plataforma de Gestión PyMEs y E-commerce
### Documento de Especificación Técnica

**Proyecto:** Página Web Integral para Brayan Quemba Tellez  
**Cliente:** Brayan Quemba Tellez - Técnico en Mantenimiento y Programación de Sistemas  
**Arquitecto:** Chief Software Architect  
**Fecha:** Septiembre 2026  
**Versión:** 1.0  

---

## 1. CONTEXTO DEL PROYECTO

### 1.1. Información General
- **Nombre del cliente:** Brayan Quemba Tellez
- **Perfil:** Técnico en mantenimiento de equipos de cómputo y técnico en programación de sistemas de información
- **Inversión:** $5,000 USD
- **Plazo total:** 4 meses (24 semanas) - 4 sprints × 6 semanas
- **Ubicación objetivo:** Colombia - Distrital (barrio/zonas Norte/Centro/Sur)

### 1.2. Objetivos del Negocio
- Captar clientes locales (leads de contacto) - Objetivo: 5 leads/día
- Posicionamiento en línea como proveedor de servicios tecnológicos
- Sectores objetivo: Mercado, Tecnología, Manufactura

---

## 2. ARQUITECTURA DE CAPAS

### 2.1. Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                        │
│                    React 18+ (SPA)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │  Componentes │ │   Router    │ │   Estado    │              │
│  │  Reutiliz.   │ │   React     │ │  Context    │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                          HTTP/HTTPS
                          JSON REST
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE API GATEWAY                         │
│                    FastAPI (Python)                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │  Endpoints   │ │    JWT      │ │  Validación  │              │
│  │  RESTful     │ │   Auth      │ │  Pydantic    │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                          ORM/SQL
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE LÓGICA DE NEGOCIO                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │  Servicios   │ │  Reglas de  │ │ Integración │              │
│  │  Domain      │ │  Negocio    │ │ Externas    │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                          SQL/ORM
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                               │
│                    PostgreSQL 15+                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │  Connection  │ │  Migrations │ │  Repositorios│              │
│  │  Pool        │ │  Alembic    │ │  Pattern     │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2. Responsabilidades por Capa

| Capa | Tecnología | Responsabilidades |
|------|------------|-------------------|
| **Presentación** | React 18+ | UI/UX, Componentes, Navegación, Estado local |
| **API Gateway** | FastAPI | Endpoints, Autenticación JWT, Validación, CORS |
| **Lógica de Negocio** | Python | Servicios, Reglas, Integraciones, Transformación |
| **Datos** | PostgreSQL | Persistencia, Consultas, Migraciones, Pool |

### 2.3. Principios de Diseño

| Principio | Aplicación en el Proyecto |
|-----------|--------------------------|
| **Separación de Responsabilidades** | Cada capa tiene una función específica |
| **Inyección de Dependencias** | Servicios desacoplados vía constructor |
| **Repository Pattern** | Acceso a datos abstraído en repositorios |
| **SOLID** | Aplicado en cada componente del sistema |
| **API First** | Contratos definidos antes de la implementación |

---

## 3. MODELO DE DATOS

### 3.1. Entidades Principales

| Entidad | Descripción | Relaciones |
|---------|-------------|------------|
| **users** | Usuarios del sistema (natural/empresa) | padre de orders, appointments, quotations |
| **categories** | Categorías de productos por sector | padre de products |
| **products** | Productos/servicios del catálogo | hijo de categories, padre de cart_items, order_items |
| **cart_items** | Items del carrito de compras | hijo de users, products |
| **orders** | Pedidos realizados | hijo de users, padre de order_items |
| **order_items** | Detalles del pedido | hijo de orders, products |
| **appointments** | Citas y agendamientos | hijo de users |
| **quotations** | Cotizaciones solicitadas | hijo de users, padre de quotation_items |
| **quotation_items** | Detalles de cotización | hijo de quotations |
| **blog_posts** | Artículos del blog diario | hijo de users (autor) |
| **contacts** | Leads de contacto |独立 |
| **chat_conversations** | Conversaciones del chatbot | hijo de users, padre de chat_messages |
| **chat_messages** | Mensajes del chat | hijo de chat_conversations |
| **data_consents** | Consentimientos Habeas Data | hijo de users |
| **analytics_events** | Eventos de tracking | hijo de users (opcional) |

### 3.2. Diagrama de Relaciones

```
users (1) ──────────< (N) orders
users (1) ──────────< (N) appointments
users (1) ──────────< (N) quotations
users (1) ──────────< (N) cart_items
users (1) ──────────< (N) blog_posts (como autor)
users (1) ──────────< (N) data_consents
users (1) ──────────< (N) chat_conversations

categories (1) ─────< (N) categories (self-ref: subcategorías)
categories (1) ─────< (N) products

products (1) ───────< (N) cart_items
products (1) ───────< (N) order_items

orders (1) ──────────< (N) order_items

quotations (1) ─────< (N) quotation_items

chat_conversations (1) < (N) chat_messages
```

### 3.3. Atributos Clave por Entidad

**users:**
- id (UUID), email, password_hash, full_name, phone
- document_type (CC/NIT/CE), document_number
- role (admin/vendor/customer), is_active
- created_at, updated_at

**categories:**
- id (UUID), name, slug, description
- parent_id (auto-referencia para jerarquía)
- sector (mercado/tecnologia/manufactura)
- image_url, is_active, sort_order

**products:**
- id (UUID), category_id, vendor_id
- name, slug, description, short_description
- price, discount_price, stock_quantity
- sku, is_available, is_featured
- image_urls (JSON), specifications (JSON)

**orders:**
- id (UUID), user_id, status
- subtotal, tax, total
- shipping_address (JSON)
- payment_method, payment_status
- notes, created_at, updated_at

**appointments:**
- id (UUID), user_id, service_type
- title, description
- scheduled_date, scheduled_time
- duration_minutes, status
- location, notes

**blog_posts:**
- id (UUID), author_id
- title, slug, excerpt, content
- category (tecnologia/mercado/manufactura)
- tags (JSON), featured_image
- is_published, published_at
- created_at, updated_at

**cart_items:**
- id (UUID), user_id, product_id
- quantity (INTEGER, DEFAULT 1)
- UNIQUE(user_id, product_id)
- created_at

**order_items:**
- id (UUID), order_id, product_id
- quantity (INTEGER)
- unit_price (DECIMAL 10,2)
- total_price (DECIMAL 10,2)

**orders:**
- id (UUID), user_id, status
- subtotal, tax, total
- shipping_address (JSON)
- payment_method, payment_status
- wompi_transaction_id (VARCHAR 100)
- notes, created_at, updated_at

**appointments:**
- id (UUID), user_id, service_type
- title, description
- scheduled_date, scheduled_time
- duration_minutes, status
- location, notes
- created_at

**quotations:**
- id (UUID), user_id, status
- subtotal, tax, total
- valid_until (DATE)
- notes, created_at, updated_at

**quotation_items:**
- id (UUID), quotation_id
- description (VARCHAR 500)
- quantity (INTEGER)
- unit_price (DECIMAL 10,2)
- total_price (DECIMAL 10,2)

**contacts:**
- id (UUID)
- name, email, phone, company
- message (TEXT)
- source (VARCHAR 50)
- status (VARCHAR 20)
- salesforce_id (VARCHAR 100)
- created_at

**chat_conversations:**
- id (UUID), user_id, session_id
- status (VARCHAR 20)
- created_at

**chat_messages:**
- id (UUID), conversation_id
- sender (VARCHAR 20)
- message (TEXT)
- created_at

**data_consents:**
- id (UUID), user_id
- consent_type (VARCHAR 50)
- is_granted (BOOLEAN)
- ip_address (VARCHAR 45)
- created_at

**analytics_events:**
- id (UUID)
- event_type (VARCHAR 50)
- user_id (nullable)
- session_id (VARCHAR 100)
- event_data (JSONB)
- ip_address (VARCHAR 45)
- user_agent (TEXT)
- created_at

---

## 4. DISEÑO DE API

### 4.1. Estructura de Endpoints

```
/api/v1/
│
├── /auth/
│   ├── POST   /register        → Registro de usuario
│   ├── POST   /login           → Inicio de sesión (retorna JWT)
│   ├── POST   /refresh         → Renovar token de acceso
│   └── POST   /logout          → Cerrar sesión
│
├── /users/
│   ├── GET    /me              → Obtener perfil actual
│   ├── PUT    /me              → Actualizar perfil
│   └── GET    /:id             → Obtener usuario (admin)
│
├── /categories/
│   ├── GET    /                → Listar categorías (con jerarquía)
│   ├── GET    /:slug           → Obtener categoría por slug
│   ├── POST   /                → Crear categoría (admin)
│   ├── PUT    /:id             → Actualizar categoría (admin)
│   └── DELETE /:id             → Eliminar categoría (admin)
│
├── /products/
│   ├── GET    /                → Listar productos (filtros, paginación)
│   ├── GET    /featured        → Productos destacados
│   ├── GET    /:slug           → Obtener producto por slug
│   ├── POST   /                → Crear producto (vendor)
│   ├── PUT    /:id             → Actualizar producto (vendor/admin)
│   └── DELETE /:id             → Eliminar producto (vendor/admin)
│
├── /cart/
│   ├── GET    /                → Obtener carrito del usuario
│   ├── POST   /items           → Agregar item al carrito
│   ├── PUT    /items/:id       → Actualizar cantidad
│   └── DELETE /items/:id       → Eliminar item
│
├── /orders/
│   ├── GET    /                → Listar pedidos del usuario
│   ├── GET    /:id             → Obtener detalle de pedido
│   ├── POST   /                → Crear pedido desde carrito
│   └── PUT    /:id/status      → Actualizar estado (admin)
│
├── /appointments/
│   ├── GET    /                → Listar citas del usuario
│   ├── GET    /available       → Horarios disponibles
│   ├── POST   /                → Agendar nueva cita
│   ├── PUT    /:id             → Modificar cita
│   └── DELETE /:id             → Cancelar cita
│
├── /quotations/
│   ├── GET    /                → Listar cotizaciones
│   ├── GET    /:id             → Obtener cotización
│   ├── POST   /                → Solicitar cotización
│   └── PUT    /:id/status      → Actualizar estado
│
├── /blog/
│   ├── GET    /                → Listar posts (con paginación)
│   ├── GET    /:slug           → Obtener post por slug
│   ├── POST   /                → Crear post (admin)
│   ├── PUT    /:id             → Actualizar post (admin)
│   └── DELETE /:id             → Eliminar post (admin)
│
├── /contact/
│   ├── POST   /                → Enviar mensaje de contacto
│   └── GET    /                → Listar mensajes (admin)
│
├── /chat/
│   ├── POST   /start           → Iniciar conversación
│   ├── POST   /message         → Enviar mensaje
│   └── GET    /history/:session→ Obtener historial
│
├── /consent/
│   ├── POST   /                → Registrar consentimiento
│   └── GET    /                → Obtener consentimientos
│
└── /analytics/
    ├── POST   /event           → Registrar evento
    └── GET    /dashboard       → Dashboard (admin)
```

### 4.2. Métodos HTTP y Códigos de Respuesta

| Método | Uso | Códigos Exitosos | Códigos de Error |
|--------|-----|------------------|------------------|
| **GET** | Consultar recursos | 200 OK | 404 Not Found |
| **POST** | Crear recursos | 201 Created | 400 Bad Request, 409 Conflict |
| **PUT** | Actualizar recursos | 200 OK | 404 Not Found, 400 Bad Request |
| **DELETE** | Eliminar recursos | 204 No Content | 404 Not Found |

### 4.3. Autenticación y Autorización

| Concepto | Especificación |
|----------|----------------|
| **Método** | JWT (JSON Web Tokens) |
| **Algoritmo** | HS256 |
| **Duración Access Token** | 30 minutos |
| **Duración Refresh Token** | 7 días |
| **Roles** | admin, vendor, customer |
| **Headers** | Authorization: Bearer {token} |

---

## 5. PATRONES ARQUITECTÓNICOS

### 5.1. Repository Pattern

**Propósito:** Abstraer el acceso a datos de la lógica de negocio

**Componentes:**
- **Interfaz:** Define los métodos de acceso (CRUD)
- **Implementación:** Concrete repositories con SQLAlchemy
- **Beneficio:** Intercambiables, testables, desacoplados

### 5.2. Service Layer Pattern

**Propósito:** Encapsular la lógica de negocio

**Componentes:**
- **Services:** Lógica de aplicación
- **Business Rules:** Validaciones y reglas
- **DTOs:** Transferencia de datos entre capas

### 5.3. Dependency Injection

**Propósito:** Desacoplar componentes mediante inyección

**Implementación:**
- FastAPI Depends para inyección de dependencias
- Repositories y Services inyectados vía constructores

### 5.4. API Gateway Pattern

**Propósito:** Unificar el acceso a servicios

**Responsabilidades:**
- Enrutamiento de requests
- Autenticación centralizada
- Rate limiting
- Logging y monitoreo

---

## 6. INTEGRACIONES EXTERNAS

### 6.1. Pasarela de Pago - Wompi

| Aspecto | Especificación |
|---------|----------------|
| **Proveedor** | Wompi (Colombia) |
| **Métodos de pago** | Tarjeta de crédito/débito, PSE, Nequi, Baloto |
| **Moneda** | COP (Peso Colombiano) |
| **Integración** | API REST + Webhooks para confirmación |
| **Seguridad** | Transacciones encriptadas, tokenización |

**Flujo de pago:**
1. Usuario inicia checkout
2. Backend crea transacción con Wompi
3. Frontend redirige a widget de pago Wompi
4. Wompi procesa y notifica vía webhook
5. Backend actualiza estado del pedido

### 6.2. CRM - Salesforce

| Aspecto | Especificación |
|---------|----------------|
| **Proveedor** | Salesforce |
| **Integración** | API REST de Salesforce |
| **Datos sincronizados** | Contactos, leads, oportunidades |
| **Eventos** | Creación de contacto, actualización de pedido |

**Datos a sincronizar:**
- Leads de contacto → Salesforce Leads
- Pedidos → Salesforce Oportunidades
- Usuarios → Salesforce Contactos/Cuentas

### 6.3. Google Analytics

| Aspecto | Especificación |
|---------|----------------|
| **Versión** | GA4 (Google Analytics 4) |
| **Tracking ID** | Configurar en deployment |
| **Eventos a trackear** | page_view, add_to_cart, purchase, contact_form |

### 6.4. Chatbot - IA Básica

| Aspecto | Especificación |
|---------|----------------|
| **Tipo** | Respuestas predefinidas |
| **Integración** | Widget en frontend |
| **Funciones** | FAQ, contacto, horarios |
| **Escalamiento** | Opción de contacto humano |

**Flujo del chatbot:**
1. Usuario abre chat
2. Sistema presenta opciones predefinidas
3. Usuario selecciona tema
4. Sistema responde con información relevante
5. Si no hay respuesta → Escalar a formulario de contacto

### 6.5. Redes Sociales

| Red | Uso | Integración |
|-----|-----|-------------|
| **WhatsApp** | Contacto directo | Enlace wa.me |
| **Instagram** | Portafolio/Contacto | Widget embebido |

---

## 7. SEGURIDAD Y COMPLIANCE

### 7.1. Autenticación

| Componente | Especificación |
|------------|----------------|
| **Método** | JWT (JSON Web Tokens) |
| **Almacenamiento** | HttpOnly cookies + localStorage |
| **Renovación** | Refresh token automático |
| **Cierre de sesión** | Invalidación de tokens |

### 7.2. Habeas Data (Colombia)

| Requisito | Implementación |
|-----------|----------------|
| **Consentimiento explícito** | Checkbox en formularios |
| **Finalidad** | Specify en cada formulario |
| **Derechos ARCO** | Endpoint para consulta/eliminación |
| **Retención** | Política de retención de datos |

### 7.3. Políticas de Cookies

| Tipo | Duración | Propósito |
|------|----------|-----------|
| **Sesión** | 30 minutos | Autenticación |
| **Consentimiento** | 1 año | Registro de aceptación |
| **Analíticas** | 2 años | Google Analytics |

### 7.4. WCAG 2.1 AA

| Requisito | Implementación |
|-----------|----------------|
| **Contraste** | Ratio mínimo 4.5:1 |
| **Navegación** | Tab y teclado completo |
| **Labels** | Todos los inputs con labels |
| **Imágenes** | Alt text obligatorio |
| **Formularios** | Mensajes de error claros |

---

## 8. INFRAESTRUCTURA Y DESPLIEGUE

### 8.1. Proveedor Cloud - AWS

| Servicio | Uso |
|----------|-----|
| **EC2** | Servidor de aplicación |
| **RDS** | PostgreSQL managed |
| **S3** | Almacenamiento de archivos estáticos |
| **CloudFront** | CDN para assets |
| **Route 53** | DNS |
| **Certificate Manager** | SSL/TLS |

### 8.2. Arquitectura de Despliegue

```
                    ┌─────────────────┐
                    │   Route 53      │
                    │   (DNS)         │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  CloudFront     │
                    │  (CDN)          │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────────┐ ┌──▼──┐ ┌────────▼────────┐
     │  S3 (Assets)    │ │ EC2 │ │  RDS (Postgres) │
     │  React build    │ │ API │ │  Base de datos   │
     └─────────────────┘ └─────┘ └─────────────────┘
```

### 8.3. Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| DATABASE_URL | URL de conexión PostgreSQL |
| JWT_SECRET_KEY | Clave secreta para JWT |
| WOMPI_API_KEY | API key de Wompi |
| SALESFORCE_API_KEY | API key de Salesforce |
| GA_TRACKING_ID | ID de Google Analytics |
| AWS_ACCESS_KEY | Acceso a AWS |
| AWS_SECRET_KEY | Secreto de AWS |

### 8.4. Presupuesto del Proyecto

| Categoría | Porcentaje | Monto USD |
|-----------|-----------|-----------|
| Diseño | 20% | $1,000 |
| Desarrollo | 45% | $2,250 |
| Integraciones | 15% | $750 |
| Testing | 10% | $500 |
| Lanzamiento | 5% | $250 |
| Fondo de reserva | 5% | $250 |
| **Total** | **100%** | **$5,000** |

Fuente: Brief.md sección 12 | Asignación aprobadas por el cliente |

---

## 9. ESTRUCTURA DEL PROYECTO

### 9.1. Backend (Python/FastAPI)

```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── dependencies.py
│   │
│   ├── models/           ← Modelos de SQLAlchemy
│   ├── schemas/          ← Schemas Pydantic
│   ├── repositories/     ← Repository pattern
│   ├── services/         ← Lógica de negocio
│   ├── routers/          ← Endpoints API
│   └── utils/            ← Utilidades
│
├── alembic/              ← Migraciones
├── tests/                ← Pruebas
├── requirements.txt
└── docker-compose.yml
```

### 9.2. Frontend (React)

```
frontend/
├── src/
│   ├── components/       ← Componentes reutilizables
│   ├── pages/            ← Páginas/vistas
│   ├── hooks/            ← Custom hooks
│   ├── services/         ← Servicios API
│   ├── context/          ← Estado global
│   ├── utils/            ← Utilidades
│   └── styles/           ← Estilos
│
├── public/
├── package.json
└── vite.config.js
```

---

## 10. ROADMAP DE SPRINTS

### Sprint 1 (Semanas 1-6): Fundamentos
- Configuración de entorno (Python, React, PostgreSQL)
- Modelos de datos y migraciones
- Autenticación JWT
- CRUD de usuarios y categorías
- Blog inicial con estructura
- Frontend: Layout base y navegación

### Sprint 2 (Semanas 7-12): Módulos Principales
- E-commerce completo (catálogo, carrito, checkout)
- Integración Wompi (pasarela de pago)
- Calendario de agendamiento
- Integración Salesforce (CRM)
- Chatbot con respuestas predefinidas
- Frontend: Tienda, carrito, agenda

### Sprint 3 (Semanas 13-18): Beta y Testing
- Lanzamiento de versión Beta
- Testing de funcionalidades
- Corrección de errores
- Pruebas de seguridad
- Optimización de rendimiento
- Documentación técnica

### Sprint 4 (Semanas 19-24): MVP y Despliegue
- Implementación de MVP completo
- Mejoras y peticiones del cliente
- Despliegue a AWS
- Capacitación al cliente
- Soporte post-lanzamiento

---

## 11. CRITERIOS DE ACEPTACIÓN

| Criterio | Meta |
|----------|------|
| Leads de contacto | 5 promedio por día |
| Blog actualizado | 100% de días del mes |
| Salesforce operativo | 100% funcional |
| Google Analytics | Métricas en tiempo real |
| WCAG 2.1 AA | Cumplimiento completo |
| Tiempo de carga | < 3 segundos |
| Responsive | 100% compatible móvil |

---

## 12. ENTREGABLES FINALES

1. Arquitectura técnica completa
2. Base de datos modelada y optimizada
3. Backend API funcional
4. Frontend React funcional
5. Integraciones operativas (Wompi, Salesforce, GA)
6. Documentación de usuario
7. Manual de administración
8. Blog con calendario editorial
9. Testing y reporte de bugs
10. Capacitación al cliente

---

**Documento generado por:** Chief Software Architect  
**Última actualización:** Septiembre 2026  
**Próxima revisión:** Al finalizar Sprint 1