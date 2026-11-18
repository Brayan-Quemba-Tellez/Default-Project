# ESPECIFICACIÓN TÉCNICA BACKEND
## Plataforma de Gestión PyMEs y E-commerce
### Documento de Implementación Backend

**Proyecto:** Página Web Integral para Brayan Quemba Tellez  
**Especialista:** Senior Backend Engineer  
**Fecha:** Septiembre 2026  
**Versión:** 1.0  
**Base:** arquitectura.md v1.0

---

## 1. STACK TECNOLÓGICO

### 1.1. Componentes Principales

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Framework** | FastAPI | 0.104+ | API RESTful |
| **Lenguaje** | Python | 3.11+ | Backend |
| **Base de datos** | PostgreSQL | 15+ | Persistencia |
| **ORM** | SQLAlchemy | 2.0+ | Mapeo objeto-relacional |
| **Migraciones** | Alembic | 1.13+ | Control de versiones BD |
| **Validación** | Pydantic | 2.5+ | Schemas y validación |
| **Cache** | Redis | 7+ | Caché y sesiones |
| **Queue** | Celery | 5.3+ | Tareas asíncronas |
| **Email** | SendGrid | - | Notificaciones por email |
| **Logs** | CloudWatch | - | Monitoreo y logs |
| **Auth** | JWT | - | Autenticación |
| **Docs API** | Swagger/OpenAPI | - | Documentación automática |

### 1.2. Dependencias Principales

| Paquete | Propósito |
|---------|-----------|
| fastapi | Framework web |
| uvicorn | Servidor ASGI |
| sqlalchemy[asyncio] | ORM asíncrono |
| asyncpg | Driver PostgreSQL |
| alembic | Migraciones |
| pydantic | Validación |
| python-jose | JWT tokens |
| passlib | Hashing contraseñas |
| redis | Conexión Redis |
| celery | Tareas asíncronas |
| sendgrid | Email transaccional |
| httpx | Cliente HTTP |
| python-dotenv | Variables de entorno |

---

## 2. ESTRUCTURA DEL PROYECTO

### 2.1. Árbol de Directorios Backend

```
backend/
│
├── app/
│   ├── __init__.py
│   ├── main.py                 ← Punto de entrada FastAPI
│   ├── config.py               ← Configuración centralizada
│   ├── dependencies.py         ← Inyección de dependencias
│   ├── middleware.py           ← Middleware global
│   ├── exceptions.py          ← Manejo de excepciones
│   │
│   ├── models/                 ← Modelos SQLAlchemy
│   │   ├── __init__.py
│   │   ├── base.py            ← Modelo base abstracto
│   │   ├── user.py            ← Modelo User
│   │   ├── category.py        ← Modelo Category
│   │   ├── product.py         ← Modelo Product
│   │   ├── cart.py            ← Modelo CartItem
│   │   ├── order.py           ← Modelo Order + OrderItem
│   │   ├── appointment.py     ← Modelo Appointment
│   │   ├── quotation.py       ← Modelo Quotation + QuotationItem
│   │   ├── blog.py            ← Modelo BlogPost
│   │   ├── contact.py         ← Modelo Contact
│   │   ├── chat.py            ← Modelo ChatConversation + ChatMessage
│   │   ├── consent.py         ← Modelo DataConsent
│   │   └── analytics.py       ← Modelo AnalyticsEvent
│   │
│   ├── schemas/                ← Schemas Pydantic
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── product.py
│   │   ├── cart.py
│   │   ├── order.py
│   │   ├── appointment.py
│   │   ├── quotation.py
│   │   ├── blog.py
│   │   ├── contact.py
│   │   ├── chat.py
│   │   ├── consent.py
│   │   ├── auth.py
│   │   └── common.py          ← Schemas compartidos
│   │
│   ├── repositories/           ← Repository Pattern
│   │   ├── __init__.py
│   │   ├── base.py            ← Repositorio base abstracto
│   │   ├── user_repository.py
│   │   ├── category_repository.py
│   │   ├── product_repository.py
│   │   ├── cart_repository.py
│   │   ├── order_repository.py
│   │   ├── appointment_repository.py
│   │   ├── quotation_repository.py
│   │   ├── blog_repository.py
│   │   ├── contact_repository.py
│   │   ├── chat_repository.py
│   │   └── consent_repository.py
│   │
│   ├── services/               ← Lógica de negocio
│   │   ├── __init__.py
│   │   ├── auth_service.py     ← Autenticación JWT
│   │   ├── user_service.py
│   │   ├── category_service.py
│   │   ├── product_service.py
│   │   ├── cart_service.py
│   │   ├── order_service.py
│   │   ├── payment_service.py  ← Integración Wompi
│   │   ├── appointment_service.py
│   │   ├── quotation_service.py
│   │   ├── blog_service.py
│   │   ├── contact_service.py
│   │   ├── chat_service.py     ← Chatbot
│   │   ├── crm_service.py     ← Integración Salesforce
│   │   ├── email_service.py   ← Integración SendGrid
│   │   ├── analytics_service.py ← Google Analytics
│   │   └── cache_service.py   ← Servicio de caché Redis
│   │
│   ├── routers/                ← Endpoints API
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── categories.py
│   │   ├── products.py
│   │   ├── cart.py
│   │   ├── orders.py
│   │   ├── appointments.py
│   │   ├── quotations.py
│   │   ├── blog.py
│   │   ├── contact.py
│   │   ├── chat.py
│   │   ├── consent.py
│   │   └── analytics.py
│   │
│   ├── tasks/                  ← Celery tasks
│   │   ├── __init__.py
│   │   ├── email_tasks.py
│   │   ├── crm_tasks.py
│   │   ├── analytics_tasks.py
│   │   └── report_tasks.py
│   │
│   └── utils/                  ← Utilidades
│       ├── __init__.py
│       ├── security.py         ← JWT, hashing
│       ├── validators.py      ← Validaciones custom
│       ├── pagination.py     ← Paginación
│       ├── slug.py            ← Generación de slugs
│       └── date_utils.py     ← Utilidades de fecha
│
├── alembic/                    ← Migraciones
│   ├── versions/
│   ├── env.py
│   └── alembic.ini
│
├── tests/                      ← Pruebas
│   ├── unit/
│   │   ├── test_services/
│   │   ├── test_repositories/
│   │   └── test_utils/
│   ├── integration/
│   │   ├── test_api/
│   │   └── test_database/
│   ├── e2e/
│   │   └── test_flows/
│   ├── conftest.py
│   └── pytest.ini
│
├── scripts/                    ← Scripts útiles
│   ├── seed_data.py
│   └── create_admin.py
│
├── .env.example
├── requirements.txt
├── requirements-dev.txt
├── alembic.ini
├── docker-compose.yml
├── Dockerfile
├── pytest.ini
└── README.md
```

---

## 3. MODELO DE DATOS COMPLETO

### 3.1. Entidad: users

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Identificador único |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Correo electrónico |
| password_hash | VARCHAR(255) | NOT NULL | Hash de contraseña |
| full_name | VARCHAR(200) | NOT NULL | Nombre completo |
| phone | VARCHAR(20) | NULL | Teléfono |
| document_type | VARCHAR(20) | NOT NULL | Tipo documento (CC/NIT/CE) |
| document_number | VARCHAR(20) | UNIQUE, NOT NULL | Número de documento |
| role | VARCHAR(20) | DEFAULT 'customer' | Rol (admin/vendor/customer) |
| is_active | BOOLEAN | DEFAULT true | Estado de cuenta |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha actualización |

### 3.2. Entidad: categories

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| name | VARCHAR(100) | NOT NULL | Nombre categoría |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | Slug URL-friendly |
| description | TEXT | NULL | Descripción |
| parent_id | UUID | FK → categories.id, NULL | Categoría padre (jerarquía) |
| sector | VARCHAR(50) | NOT NULL | Sector (mercado/tecnologia/manufactura) |
| image_url | VARCHAR(500) | NULL | URL imagen |
| is_active | BOOLEAN | DEFAULT true | Estado |
| sort_order | INTEGER | DEFAULT 0 | Orden de visualización |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |

### 3.3. Entidad: products

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| category_id | UUID | FK → categories.id, NOT NULL | Categoría |
| vendor_id | UUID | FK → users.id, NOT NULL | Vendedor |
| name | VARCHAR(200) | NOT NULL | Nombre producto |
| slug | VARCHAR(200) | UNIQUE, NOT NULL | Slug URL-friendly |
| description | TEXT | NULL | Descripción completa |
| short_description | VARCHAR(500) | NULL | Descripción corta |
| price | DECIMAL(10,2) | NOT NULL | Precio |
| discount_price | DECIMAL(10,2) | NULL | Precio con descuento |
| stock_quantity | INTEGER | DEFAULT 0 | Stock disponible |
| sku | VARCHAR(100) | UNIQUE, NULL | Código SKU |
| is_available | BOOLEAN | DEFAULT true | Disponibilidad |
| is_featured | BOOLEAN | DEFAULT false | Destacado |
| image_urls | JSONB | DEFAULT '[]' | URLs de imágenes |
| specifications | JSONB | DEFAULT '{}' | especificaciones |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha actualización |

### 3.4. Entidad: cart_items

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NOT NULL | Usuario |
| product_id | UUID | FK → products.id, NOT NULL | Producto |
| quantity | INTEGER | NOT NULL, DEFAULT 1 | Cantidad |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha agregado |
| | | UNIQUE(user_id, product_id) | Un item por usuario |

### 3.5. Entidad: orders

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NOT NULL | Usuario |
| status | VARCHAR(30) | DEFAULT 'pending' | Estado (pending/confirmed/shipped/delivered/cancelled) |
| subtotal | DECIMAL(10,2) | NOT NULL | Subtotal |
| tax | DECIMAL(10,2) | DEFAULT 0 | Impuestos |
| total | DECIMAL(10,2) | NOT NULL | Total |
| shipping_address | JSONB | NOT NULL | Dirección de envío |
| payment_method | VARCHAR(50) | NULL | Método de pago |
| payment_status | VARCHAR(30) | DEFAULT 'pending' | Estado del pago |
| wompi_transaction_id | VARCHAR(100) | NULL | ID transacción Wompi |
| notes | TEXT | NULL | Notas |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha actualización |

### 3.6. Entidad: order_items

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| order_id | UUID | FK → orders.id, NOT NULL | Pedido |
| product_id | UUID | FK → products.id, NOT NULL | Producto |
| quantity | INTEGER | NOT NULL | Cantidad |
| unit_price | DECIMAL(10,2) | NOT NULL | Precio unitario |
| total_price | DECIMAL(10,2) | NOT NULL | Total línea |

### 3.7. Entidad: appointments

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NOT NULL | Usuario |
| service_type | VARCHAR(50) | NOT NULL | Tipo (consulta/mantenimiento/desarrollo) |
| title | VARCHAR(200) | NOT NULL | Título |
| description | TEXT | NULL | Descripción |
| scheduled_date | DATE | NOT NULL | Fecha programada |
| scheduled_time | TIME | NOT NULL | Hora programada |
| duration_minutes | INTEGER | DEFAULT 60 | Duración en minutos |
| status | VARCHAR(20) | DEFAULT 'pending' | Estado (pending/confirmed/completed/cancelled) |
| location | VARCHAR(300) | NULL | Ubicación |
| notes | TEXT | NULL | Notas |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |

### 3.8. Entidad: quotations

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NOT NULL | Usuario |
| status | VARCHAR(20) | DEFAULT 'draft' | Estado (draft/sent/accepted/rejected) |
| subtotal | DECIMAL(10,2) | NOT NULL | Subtotal |
| tax | DECIMAL(10,2) | DEFAULT 0 | Impuestos |
| total | DECIMAL(10,2) | NOT NULL | Total |
| valid_until | DATE | NULL | Vigencia |
| notes | TEXT | NULL | Notas |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha actualización |

### 3.9. Entidad: quotation_items

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| quotation_id | UUID | FK → quotations.id, NOT NULL | Cotización |
| description | VARCHAR(500) | NOT NULL | Descripción servicio/producto |
| quantity | INTEGER | NOT NULL | Cantidad |
| unit_price | DECIMAL(10,2) | NOT NULL | Precio unitario |
| total_price | DECIMAL(10,2) | NOT NULL | Total línea |

### 3.10. Entidad: blog_posts

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| author_id | UUID | FK → users.id, NOT NULL | Autor |
| title | VARCHAR(300) | NOT NULL | Título |
| slug | VARCHAR(300) | UNIQUE, NOT NULL | Slug URL-friendly |
| excerpt | VARCHAR(500) | NULL | Extracto |
| content | TEXT | NOT NULL | Contenido |
| category | VARCHAR(50) | NOT NULL | Categoría (tecnologia/mercado/manufactura/mantenimiento) |
| tags | JSONB | DEFAULT '[]' | Etiquetas |
| featured_image | VARCHAR(500) | NULL | Imagen destacada |
| is_published | BOOLEAN | DEFAULT false | Publicado |
| published_at | TIMESTAMP | NULL | Fecha publicación |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha actualización |

### 3.11. Entidad: contacts

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| name | VARCHAR(200) | NOT NULL | Nombre |
| email | VARCHAR(255) | NOT NULL | Email |
| phone | VARCHAR(20) | NULL | Teléfono |
| company | VARCHAR(200) | NULL | Empresa |
| message | TEXT | NOT NULL | Mensaje |
| source | VARCHAR(50) | NULL | Fuente (web/whatsapp/instagram/email) |
| status | VARCHAR(20) | DEFAULT 'new' | Estado (new/contacted/qualified/converted) |
| salesforce_id | VARCHAR(100) | NULL | ID en Salesforce |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |

### 3.12. Entidad: chat_conversations

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NULL | Usuario (nullable para anónimos) |
| session_id | VARCHAR(100) | NOT NULL | ID de sesión |
| status | VARCHAR(20) | DEFAULT 'active' | Estado (active/closed/escalated) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha creación |

### 3.13. Entidad: chat_messages

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| conversation_id | UUID | FK → chat_conversations.id, NOT NULL | Conversación |
| sender | VARCHAR(20) | NOT NULL | Emisor (user/bot/agent) |
| message | TEXT | NOT NULL | Mensaje |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha envío |

### 3.14. Entidad: data_consents

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| user_id | UUID | FK → users.id, NOT NULL | Usuario |
| consent_type | VARCHAR(50) | NOT NULL | Tipo (marketing/analytics/third_party) |
| is_granted | BOOLEAN | DEFAULT false | Otorgado |
| ip_address | VARCHAR(45) | NULL | IP del usuario |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha registro |

### 3.15. Entidad: analytics_events

| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID | PK | Identificador único |
| event_type | VARCHAR(50) | NOT NULL | Tipo evento |
| user_id | UUID | FK → users.id, NULL | Usuario (nullable) |
| session_id | VARCHAR(100) | NULL | Sesión |
| event_data | JSONB | DEFAULT '{}' | Datos del evento |
| ip_address | VARCHAR(45) | NULL | IP |
| user_agent | TEXT | NULL | User agent |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha evento |

---

## 4. ESPECIFICACIÓN DE ENDPOINTS

### 4.1. Módulo Auth

**POST /api/v1/auth/register**
- Descripción: Registro de nuevo usuario
- Request Body: { email, password, full_name, phone, document_type, document_number }
- Response 201: { id, email, full_name, role, created_at }
- Response 400: { detail: "Email ya registrado" }
- Response 422: { detail: "Error de validación" }

**POST /api/v1/auth/login**
- Descripción: Inicio de sesión
- Request Body: { email, password }
- Response 200: { access_token, refresh_token, token_type, expires_in, user }
- Response 401: { detail: "Credenciales inválidas" }

**POST /api/v1/auth/refresh**
- Descripción: Renovar access token
- Request Body: { refresh_token }
- Response 200: { access_token, token_type, expires_in }
- Response 401: { detail: "Refresh token inválido o expirado" }

**POST /api/v1/auth/logout**
- Descripción: Cerrar sesión
- Headers: Authorization: Bearer {token}
- Response 200: { detail: "Sesión cerrada" }

### 4.2. Módulo Users

**GET /api/v1/users/me**
- Descripción: Obtener perfil del usuario actual
- Headers: Authorization: Bearer {token}
- Response 200: UserSchema
- Response 401: { detail: "No autenticado" }

**PUT /api/v1/users/me**
- Descripción: Actualizar perfil
- Headers: Authorization: Bearer {token}
- Request Body: { full_name?, phone?, email? }
- Response 200: UserSchema
- Response 400: { detail: "Email ya en uso" }

**GET /api/v1/users/{id}**
- Descripción: Obtener usuario (solo admin)
- Headers: Authorization: Bearer {token}
- Response 200: UserSchema
- Response 403: { detail: "Sin permisos" }
- Response 404: { detail: "Usuario no encontrado" }

### 4.3. Módulo Categories

**GET /api/v1/categories**
- Descripción: Listar categorías con jerarquía
- Query Params: sector?, is_active?
- Response 200: [CategorySchema]

**GET /api/v1/categories/{slug}**
- Descripción: Obtener categoría por slug
- Response 200: CategorySchema
- Response 404: { detail: "Categoría no encontrada" }

**POST /api/v1/categories**
- Descripción: Crear categoría (solo admin)
- Headers: Authorization: Bearer {token}
- Request Body: { name, description?, parent_id?, sector, image_url? }
- Response 201: CategorySchema
- Response 403: { detail: "Sin permisos" }

**PUT /api/v1/categories/{id}**
- Descripción: Actualizar categoría (solo admin)
- Headers: Authorization: Bearer {token}
- Request Body: { name?, description?, sector?, is_active?, sort_order? }
- Response 200: CategorySchema
- Response 403: { detail: "Sin permisos" }

**DELETE /api/v1/categories/{id}**
- Descripción: Eliminar categoría (solo admin)
- Headers: Authorization: Bearer {token}
- Response 204: No Content
- Response 403: { detail: "Sin permisos" }

### 4.4. Módulo Products

**GET /api/v1/products**
- Descripción: Listar productos con filtros
- Query Params: category?, sector?, min_price?, max_price?, search?, featured?, page?, limit?
- Response 200: { items: [ProductSchema], total, page, pages }

**GET /api/v1/products/featured**
- Descripción: Productos destacados
- Response 200: [ProductSchema]

**GET /api/v1/products/{slug}**
- Descripción: Obtener producto por slug
- Response 200: ProductSchema
- Response 404: { detail: "Producto no encontrado" }

**POST /api/v1/products**
- Descripción: Crear producto (solo vendor)
- Headers: Authorization: Bearer {token}
- Request Body: { category_id, name, description?, short_description?, price, discount_price?, stock_quantity, sku?, specifications? }
- Response 201: ProductSchema
- Response 403: { detail: "Sin permisos" }

**PUT /api/v1/products/{id}**
- Descripción: Actualizar producto (vendor/admin)
- Headers: Authorization: Bearer {token}
- Request Body: { name?, description?, price?, stock_quantity?, is_available?, is_featured? }
- Response 200: ProductSchema
- Response 403: { detail: "Sin permisos" }

**DELETE /api/v1/products/{id}**
- Descripción: Eliminar producto (vendor/admin)
- Headers: Authorization: Bearer {token}
- Response 204: No Content
- Response 403: { detail: "Sin permisos" }

### 4.5. Módulo Cart

**GET /api/v1/cart**
- Descripción: Obtener carrito del usuario
- Headers: Authorization: Bearer {token}
- Response 200: { items: [CartItemSchema], subtotal, total }

**POST /api/v1/cart/items**
- Descripción: Agregar item al carrito
- Headers: Authorization: Bearer {token}
- Request Body: { product_id, quantity }
- Response 201: CartItemSchema
- Response 400: { detail: "Producto no disponible" }

**PUT /api/v1/cart/items/{id}**
- Descripción: Actualizar cantidad
- Headers: Authorization: Bearer {token}
- Request Body: { quantity }
- Response 200: CartItemSchema
- Response 400: { detail: "Stock insuficiente" }

**DELETE /api/v1/cart/items/{id}**
- Descripción: Eliminar item
- Headers: Authorization: Bearer {token}
- Response 204: No Content

### 4.6. Módulo Orders

**GET /api/v1/orders**
- Descripción: Listar pedidos del usuario
- Headers: Authorization: Bearer {token}
- Query Params: status?, page?, limit?
- Response 200: { items: [OrderSchema], total, page, pages }

**GET /api/v1/orders/{id}**
- Descripción: Obtener detalle de pedido
- Headers: Authorization: Bearer {token}
- Response 200: OrderSchema
- Response 404: { detail: "Pedido no encontrado" }

**POST /api/v1/orders**
- Descripción: Crear pedido desde carrito
- Headers: Authorization: Bearer {token}
- Request Body: { shipping_address, payment_method, notes? }
- Response 201: OrderSchema
- Response 400: { detail: "Carrito vacío" }

**PUT /api/v1/orders/{id}/status**
- Descripción: Actualizar estado (solo admin)
- Headers: Authorization: Bearer {token}
- Request Body: { status }
- Response 200: OrderSchema
- Response 403: { detail: "Sin permisos" }

### 4.7. Módulo Appointments

**GET /api/v1/appointments**
- Descripción: Listar citas del usuario
- Headers: Authorization: Bearer {token}
- Query Params: status?, from_date?, to_date?
- Response 200: [AppointmentSchema]

**GET /api/v1/appointments/available**
- Descripción: Horarios disponibles
- Query Params: date, service_type
- Response 200: { available_slots: [{ time, duration }] }

**POST /api/v1/appointments**
- Descripción: Agendar nueva cita
- Headers: Authorization: Bearer {token}
- Request Body: { service_type, title, description?, scheduled_date, scheduled_time, duration_minutes?, location?, notes? }
- Response 201: AppointmentSchema
- Response 400: { detail: "Horario no disponible" }

**PUT /api/v1/appointments/{id}**
- Descripción: Modificar cita
- Headers: Authorization: Bearer {token}
- Request Body: { scheduled_date?, scheduled_time?, notes? }
- Response 200: AppointmentSchema
- Response 400: { detail: "No se puede modificar cita pasada" }

**DELETE /api/v1/appointments/{id}**
- Descripción: Cancelar cita
- Headers: Authorization: Bearer {token}
- Response 200: { detail: "Cita cancelada" }
- Response 400: { detail: "No se puede cancelar cita pasada" }

### 4.8. Módulo Quotations

**GET /api/v1/quotations**
- Descripción: Listar cotizaciones
- Headers: Authorization: Bearer {token}
- Query Params: status?
- Response 200: [QuotationSchema]

**GET /api/v1/quotations/{id}**
- Descripción: Obtener cotización
- Headers: Authorization: Bearer {token}
- Response 200: QuotationSchema
- Response 404: { detail: "Cotización no encontrada" }

**POST /api/v1/quotations**
- Descripción: Solicitar cotización
- Headers: Authorization: Bearer {token}
- Request Body: { items: [{ description, quantity, unit_price }], notes? }
- Response 201: QuotationSchema

**PUT /api/v1/quotations/{id}/status**
- Descripción: Actualizar estado
- Headers: Authorization: Bearer {token}
- Request Body: { status }
- Response 200: QuotationSchema

### 4.9. Módulo Blog

**GET /api/v1/blog**
- Descripción: Listar posts
- Query Params: category?, page?, limit?
- Response 200: { items: [BlogPostSchema], total, page, pages }

**GET /api/v1/blog/{slug}**
- Descripción: Obtener post por slug
- Response 200: BlogPostSchema
- Response 404: { detail: "Post no encontrado" }

**POST /api/v1/blog**
- Descripción: Crear post (solo admin)
- Headers: Authorization: Bearer {token}
- Request Body: { title, content, category, excerpt?, tags?, featured_image?, is_published? }
- Response 201: BlogPostSchema
- Response 403: { detail: "Sin permisos" }

**PUT /api/v1/blog/{id}**
- Descripción: Actualizar post (solo admin)
- Headers: Authorization: Bearer {token}
- Request Body: { title?, content?, category?, excerpt?, tags?, featured_image?, is_published? }
- Response 200: BlogPostSchema
- Response 403: { detail: "Sin permisos" }

**DELETE /api/v1/blog/{id}**
- Descripción: Eliminar post (solo admin)
- Headers: Authorization: Bearer {token}
- Response 204: No Content
- Response 403: { detail: "Sin permisos" }

### 4.10. Módulo Contact

**POST /api/v1/contact**
- Descripción: Enviar mensaje de contacto
- Request Body: { name, email, phone?, company?, message, source?, consent_given }
- Response 201: ContactSchema
- Response 400: { detail: "Debe aceptar políticas de privacidad" }

**GET /api/v1/contact**
- Descripción: Listar mensajes (solo admin)
- Headers: Authorization: Bearer {token}
- Query Params: status?, page?, limit?
- Response 200: { items: [ContactSchema], total, page, pages }

### 4.11. Módulo Chat

**POST /api/v1/chat/start**
- Descripción: Iniciar conversación
- Request Body: { session_id, user_id? }
- Response 201: ChatConversationSchema

**POST /api/v1/chat/message**
- Descripción: Enviar mensaje
- Request Body: { conversation_id, message, sender }
- Response 201: ChatMessageSchema
- Response 200: { bot_response: "Respuesta del bot" }

**GET /api/v1/chat/history/{session}**
- Descripción: Obtener historial
- Response 200: [ChatMessageSchema]

### 4.12. Módulo Consent

**POST /api/v1/consent**
- Descripción: Registrar consentimiento
- Headers: Authorization: Bearer {token}
- Request Body: { consent_type, is_granted }
- Response 201: DataConsentSchema

**GET /api/v1/consent**
- Descripción: Obtener consentimientos
- Headers: Authorization: Bearer {token}
- Response 200: [DataConsentSchema]

### 4.13. Módulo Analytics

**POST /api/v1/analytics/event**
- Descripción: Registrar evento
- Request Body: { event_type, event_data?, session_id? }
- Response 201: { detail: "Evento registrado" }

**GET /api/v1/analytics/dashboard**
- Descripción: Dashboard (solo admin)
- Headers: Authorization: Bearer {token}
- Query Params: from_date?, to_date?
- Response 200: { total_visits, total_leads, top_products, ... }

---

## 5. LÓGICA DE NEGOCIO POR MÓDULO

### 5.1. Módulo Auth

**Servicio: AuthService**
- Registrar usuario con validación de email único
- Hashear contraseñas con bcrypt
- Generar access token (30 min) y refresh token (7 días)
- Invalidar tokens en logout
- Validar refresh token antes de renovar

### 5.2. Módulo Users

**Servicio: UserService**
- Obtener perfil del usuario autenticado
- Actualizar perfil con validación de email único
- Listar usuarios (solo admin)
- Cambiar estado de usuario (activar/desactivar)

### 5.3. Módulo Categories

**Servicio: CategoryService**
- Listar categorías con jerarquía (árbol)
- Filtrar por sector
- Crear categoría con slug automático
- Validar que no tenga productos al eliminar

### 5.4. Módulo Products

**Servicio: ProductService**
- Listar productos con filtros avanzados
- Búsqueda por nombre/descripción
- Paginación con límite configurable
- Validar stock antes de agregar al carrito
- Marcar como destacado (máximo 10)

### 5.5. Módulo Cart

**Servicio: CartService**
- Agregar item (validar stock)
- Actualizar cantidad (validar stock)
- Calcular subtotal y total
- Limpiar carrito después de crear pedido

### 5.6. Módulo Orders

**Servicio: OrderService**
- Crear pedido desde carrito
- Validar stock de todos los items
- Calcular impuestos
- Generar número de orden
- Actualizar estado con historial
- Sincronizar con Salesforce

### 5.7. Módulo Payment (Wompi)

**Servicio: PaymentService**
- Crear transacción en Wompi
- Generar widget de pago
- Procesar webhook de confirmación
- Actualizar estado de pedido
- Generar recibo

**Flujo de Pago:**
1. Validar carrito y stock
2. Crear orden con estado "pending"
3. Llamar API de Wompi para crear transacción
4. Retornar URL/widget de pago
5. Recibir webhook de Wompi
6. Actualizar estado de orden y pago
7. Enviar email de confirmación
8. Sincronizar con Salesforce

### 5.8. Módulo Appointments

**Servicio: AppointmentService**
- Verificar disponibilidad horaria
- Validar que no haya conflictos
- Calcular duración
- Enviar recordatorio (email)
- Actualizar estado

### 5.9. Módulo Quotations

**Servicio: QuotationService**
- Crear cotización con items
- Calcular totales
- Generar PDF (opcional)
- Enviar por email
- Validar vigencia

### 5.10. Módulo Blog

**Servicio: BlogService**
- Crear post con slug automático
- Programar publicación
- Filtrar por categoría
- Paginación

### 5.11. Módulo Contact

**Servicio: ContactService**
- Registrar lead de contacto
- Validar consentimiento Habeas Data
- Enviar email de confirmación
- Sincronizar con Salesforce
- Actualizar estado del lead

### 5.12. Módulo Chat

**Servicio: ChatService**
- Iniciar conversación anónima o autenticada
- Buscar respuesta predefinida
- Escalar a formulario si no hay respuesta
- Mantener historial de conversación

**Base de Conocimiento Predefinida:**
| Tema | Pregunta | Respuesta |
|------|----------|-----------|
| Horarios | ¿Cuál es el horario de atención? | Lunes a Viernes 8am-6pm, Sábados 9am-1pm |
| Servicios | ¿Qué servicios ofrecen? | Desarrollo web, mantenimiento, consultoría |
| Contacto | ¿Cómo puedo contactarlos? | WhatsApp: +57 XXXX, Email: info@ejemplo.com |
| Ubicación | ¿Dónde están ubicados? | [Ciudad], Colombia |
| Presupuesto | ¿Cuánto cuesta un proyecto? | Solicite una cotización personalizada |

### 5.13. Módulo CRM (Salesforce)

**Servicio: CRMService**
- Sincronizar lead de contacto → Salesforce Lead
- Sincronizar pedido → Salesforce Opportunity
- Sincronizar usuario → Salesforce Contact/Account
- Actualizar estado de oportunidad
- Obtener métricas de Salesforce

### 5.14. Módulo Email (SendGrid)

**Servicio: EmailService**
- Enviar email de bienvenida
- Enviar confirmación de pedido
- Enviar recordatorio de cita
- Enviar cotización
- Enviar notificación de cambio de estado

**Templates:**
| Template | Uso |
|----------|-----|
| welcome | Bienvenida al registrarse |
| order_confirmation | Confirmación de pedido |
| appointment_reminder | Recordatorio de cita |
| quotation_sent | Cotización enviada |
| password_reset | Recuperación de contraseña |

### 5.15. Módulo Cache (Redis)

**Servicio: CacheService**
- Cachear productos destacados (TTL: 1 hora)
- Cachear categorías (TTL: 2 horas)
- Cachear configuración (TTL: 24 horas)
- Invalidar caché en cambios
- Almacenar sesiones

---

## 6. MIDDLEWARE GLOBALES

### 6.1. Middleware de Autenticación

**Propósito:** Validar tokens JWT en rutas protegidas

**Configuración:**
- Rutas públicas: /auth/*, /blog/*, /categories/*, /products/*, /contact, /chat/*
- Rutas protegidas: /users/*, /cart/*, /orders/*, /appointments/*, /quotations/*
- Rutas admin: /analytics/dashboard, DELETE/PUT en recursos

### 6.2. Middleware de Rate Limiting

**Propósito:** Limitar requests por endpoint

**Configuración:**
- Por defecto: 100 requests/minuto por IP
- Login: 10 requests/minuto por IP
- Register: 5 requests/minuto por IP
- API General: 1000 requests/minuto por API key

### 6.3. Middleware de CORS

**Propósito:** Controlar acceso cross-origin

**Configuración:**
- Origins permitidos: http://localhost:3000, https://tudominio.com
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Authorization, Content-Type
- Credentials: true

### 6.4. Middleware de Logging

**Propósito:** Registrar requests y errores

**Configuración:**
- Formato: JSON estructurado
- Destino: CloudWatch Logs
- Datos: method, path, status, duration, user_id

### 6.5. Middleware de Error Handler

**Propósito:** Manejar errores globalmente

**Configuración:**
- HTTPException → Respuesta formateada
- ValidationError → 422 con detalles
- Exception → 500 con log

---

## 7. TAREAS ASÍNCRONAS (CELERY)

### 7.1. Configuración Celery

- Broker: Redis
- Backend: Redis
- Concurrency: 4 workers
- Retry policy: 3 intentos, delay exponencial

### 7.2. Tareas Definidas

| Tarea | Módulo | Trigger |
|-------|--------|---------|
| send_welcome_email | Email | Registro usuario |
| send_order_confirmation | Email | Creación pedido |
| send_appointment_reminder | Email | 24h antes de cita |
| send_quotation_email | Email | Creación cotización |
| sync_lead_to_crm | CRM | Lead de contacto |
| sync_order_to_crm | CRM | Creación pedido |
| track_analytics_event | Analytics | Evento registrado |
| generate_daily_report | Reportes | Diario 12am |

---

## 8. CACHÉ (REDIS)

### 8.1. Estrategia de Caché

| Recurso | TTL | Invalidación |
|---------|-----|--------------|
| Productos destacados | 1 hora | Al actualizar producto |
| Categorías | 2 horas | Al modificar categoría |
| Configuración | 24 horas | Al modificar config |
| Posts blog | 30 minutos | Al publicar/actualizar |
| Horarios disponibles | 5 minutos | Al agendar cita |

### 8.2. Patrones de Caché

- **Cache-Aside:** Consultar caché primero, si no existe consultar BD
- **Write-Through:** Actualizar caché al escribir en BD
- **TTL:** Time-to-live por tipo de recurso

---

## 9. LOGGING (CLOUDWATCH)

### 9.1. Configuración

- **Servicio:** AWS CloudWatch Logs
- **Log Group:** /aws/fastapi/pymedb
- **Retención:** 30 días
- **Formato:** JSON estructurado

### 9.2. Datos por Log

```json
{
  "timestamp": "2026-09-09T12:00:00Z",
  "level": "INFO",
  "service": "order_service",
  "message": "Pedido creado",
  "user_id": "uuid-1234",
  "order_id": "uuid-5678",
  "method": "POST",
  "path": "/api/v1/orders",
  "status": 201,
  "duration": 150
}
```

### 9.3. Niveles de Log

| Nivel | Uso |
|-------|-----|
| DEBUG | Información detallada para desarrollo |
| INFO | Eventos normales del sistema |
| WARNING | Advertencias no críticas |
| ERROR | Errores que requieren atención |
| CRITICAL | Errores críticos del sistema |

---

## 10. TESTING

### 10.1. Estrategia de Pruebas

| Tipo | Framework | Cobertura Objetivo |
|------|-----------|-------------------|
| **Unit** | pytest | 80% |
| **Integration** | pytest | 60% |
| **E2E** | pytest | Flujos principales |

### 10.2. Estructura de Tests

```
tests/
├── unit/
│   ├── test_services/
│   │   ├── test_auth_service.py
│   │   ├── test_user_service.py
│   │   └── ...
│   ├── test_repositories/
│   │   ├── test_user_repository.py
│   │   └── ...
│   └── test_utils/
│       ├── test_validators.py
│       └── ...
├── integration/
│   ├── test_api/
│   │   ├── test_auth_api.py
│   │   ├── test_products_api.py
│   │   └── ...
│   └── test_database/
│       └── test_connections.py
├── e2e/
│   └── test_flows/
│       ├── test_purchase_flow.py
│       └── test_appointment_flow.py
└── conftest.py
```

### 10.3. Fixtures Principales

| Fixture | Propósito |
|---------|-----------|
| db_session | Sesión de BD para tests |
| test_user | Usuario de prueba |
| auth_headers | Headers con JWT válido |
| test_product | Producto de prueba |
| test_category | Categoría de prueba |

---

## 11. VARIABLES DE ENTORNO

### 11.1. Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| DATABASE_URL | URL PostgreSQL | postgresql+asyncpg://user:pass@localhost:5432/db |
| REDIS_URL | URL Redis | redis://localhost:6379/0 |
| JWT_SECRET_KEY | Clave secreta JWT | tu-clave-secreta-super-segura |
| JWT_ALGORITHM | Algoritmo JWT | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Duración access token | 30 |
| REFRESH_TOKEN_EXPIRE_DAYS | Duración refresh token | 7 |
| WOMPI_API_KEY | API Key Wompi | pub_test_xxxxx |
| WOMPI_API_URL | URL API Wompi | https://api-sandbox.wompi.co |
| SALESFORCE_API_KEY | API Key Salesforce |xxxxx |
| SALESFORCE_API_URL | URL API Salesforce | https://login.salesforce.com |
| SENDGRID_API_KEY | API Key SendGrid | SG.xxxxx |
| SENDGRID_FROM_EMAIL | Email remitente | no-reply@tudominio.com |
| GA_TRACKING_ID | ID Google Analytics | G-XXXXXXXXXX |
| AWS_ACCESS_KEY_ID | Acceso AWS | AKIAIOSFODNN7 |
| AWS_SECRET_ACCESS_KEY | Secreto AWS | wJalrXUtnFEMI |
| AWS_REGION | Región AWS | us-east-1 |
| CLOUDWATCH_LOG_GROUP | Log group | /aws/fastapi/pymedb |
| ENVIRONMENT | Entorno | development/production |
| DEBUG | Modo debug | true/false |
| ALLOWED_ORIGINS | Orígenes permitidos | http://localhost:3000 |

---

## 12. DOCKER COMPOSE

### 12.1. Servicios

| Servicio | Imagen | Puerto | Propósito |
|----------|--------|--------|-----------|
| api | python:3.11-slim | 8000 | Backend FastAPI |
| db | postgres:15-alpine | 5432 | Base de datos |
| redis | redis:7-alpine | 6379 | Caché/Queue |
| celery_worker | python:3.11-slim | - | Tareas asíncronas |

### 12.2. Volúmenes

| Volumen | Servicio | Persistencia |
|---------|----------|--------------|
| postgres_data | db | Datos PostgreSQL |
| redis_data | redis | Datos Redis |

---

## 13. DOCUMENTACIÓN API (SWAGGER)

### 13.1. Configuración

- **URL:** /docs
- **ReDoc URL:** /redoc
- **OpenAPI JSON:** /openapi.json
- **Título:** API PyMEs Platform
- **Versión:** 1.0.0
- **Descripción:** API para plataforma de gestión PyMEs y e-commerce

### 13.2. Tags Endpoints

| Tag | Descripción |
|-----|-------------|
| Auth | Autenticación y registro |
| Users | Gestión de usuarios |
| Categories | Gestión de categorías |
| Products | Gestión de productos |
| Cart | Carrito de compras |
| Orders | Gestión de pedidos |
| Appointments | Agendamiento de citas |
| Quotations | Cotizaciones |
| Blog | Gestión de blog |
| Contact | Formulario de contacto |
| Chat | Chatbot |
| Consent | Consentimientos |
| Analytics | Métricas y dashboard |

---

**Documento generado por:** Senior Backend Engineer  
**Última actualización:** Septiembre 2026  
**Próxima revisión:** Al finalizar Sprint 1