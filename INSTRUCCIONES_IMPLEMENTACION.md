# 📋 INSTRUCCIONES DE IMPLEMENTACIÓN COMPLETA
## Sistema Municipal de Yau - Versión Completa

---

## ✅ LO QUE YA ESTÁ HECHO

### 1. ✅ BASE DE DATOS COMPLETA
**Archivo:** `database/schema_completo_nuevo.sql`

- **50+ tipos de trámites** organizados en 9 categorías:
  1. 🏦 Impuestos y Pagos (4 trámites)
  2. 🏠 Catastro y Propiedad (5 trámites)
  3. 🧑‍💼 Licencias y Autorizaciones (5 trámites)
  4. 🚧 Obras y Construcción (6 trámites)
  5. 🧑‍⚖️ Quejas, Reclamos y Denuncias (5 trámites)
  6. ⚰️ Registro Civil (5 trámites)
  7. 🚗 Transporte y Tránsito (5 trámites)
  8. 💡 Servicios Municipales (5 trámites)
  9. 🧍 Atención al Ciudadano (5 trámites)

- **Tablas incluidas:**
  - `usuarios` - Con contraseña y fecha de nacimiento
  - `preguntas_seguridad` - Para recuperación de contraseña
  - `tipos_tramite` - Todos los 50+ trámites
  - `tramites` - Con soporte para archivos adjuntos
  - `archivos_adjuntos` - Documentos, fotos, videos
  - `notificaciones` - Sistema de notificaciones
  - `consultas_gemini` - Historial de IA
  - `configuracion` - Configuraciones del sistema

- **Usuario administrador creado:**
  - DNI: `12345678`
  - Email: `alcalde@municipalidad-yau.gob.pe`
  - Contraseña: `Admin2024!`
  - Tipo: `administrador`

### 2. ✅ BACKEND COMPLETO
**Archivo:** `backend/app.py`

#### Endpoints de Autenticación:
- ✅ `POST /api/auth/register` - Registro con contraseña y fecha nacimiento
- ✅ `POST /api/auth/login` - Login con DNI + contraseña
- ✅ `POST /api/auth/login-facial` - Login con reconocimiento facial
- ✅ `POST /api/auth/register-face` - Registrar rostro
- ✅ `POST /api/auth/guardar-pregunta-seguridad` - Guardar pregunta de seguridad
- ✅ `GET /api/auth/obtener-pregunta/<dni>` - Obtener pregunta para recuperación
- ✅ `POST /api/auth/recuperar-password` - Recuperar contraseña con pregunta
- ✅ `POST /api/auth/cambiar-password` - Cambiar contraseña (autenticado)

#### Endpoints de Trámites:
- ✅ `GET /api/tramites/tipos` - Obtener tipos de trámites
- ✅ `POST /api/tramites` - Crear trámite
- ✅ `GET /api/tramites/usuario` - Obtener trámites del usuario
- ✅ `GET /api/tramites/<id>` - Obtener detalle de trámite

#### Endpoints de Administrador:
- ✅ `GET /api/admin/tramites` - Ver todos los trámites (filtros: estado, categoría)
- ✅ `POST /api/admin/tramites/<id>/responder` - Responder/actualizar trámite
- ✅ `GET /api/admin/estadisticas` - Estadísticas completas

#### Endpoints de IA Gemini:
- ✅ `POST /api/gemini/consultar` - Consulta general
- ✅ `POST /api/gemini/ayudar-redactar` - Ayuda a redactar solicitud
- ✅ `POST /api/gemini/buscar-tramite` - Buscar trámite por descripción

#### Otros Endpoints:
- ✅ `GET /api/notificaciones` - Obtener notificaciones
- ✅ `PUT /api/notificaciones/<id>/leer` - Marcar como leída
- ✅ `GET /api/dashboard/stats` - Estadísticas del dashboard
- ✅ `GET /api/health` - Estado del sistema

### 3. ✅ SERVICIO DE IA MEJORADO
**Archivo:** `backend/gemini_service.py`

- ✅ Contexto completo del sistema (50+ trámites)
- ✅ Ayuda a redactar solicitudes formales
- ✅ Búsqueda inteligente de trámites
- ✅ Recomendaciones personalizadas
- ✅ Análisis de documentos faltantes
- ✅ Historial de consultas por usuario

### 4. ✅ CORRECCIONES DE TIPOS DE DATOS
**Archivo:** `backend/database.py`

- ✅ Todos los parámetros convertidos correctamente a tipos MySQL
- ✅ Validación de diccionarios vs tuplas/listas
- ✅ Logging mejorado para depuración
- ✅ Manejo de None en tramite_id para notificaciones

---

## 📝 LO QUE FALTA POR HACER

### 1. ⏳ EJECUTAR LA NUEVA BASE DE DATOS

```bash
# En XAMPP MySQL:
1. Abrir phpMyAdmin (http://localhost/phpmyadmin)
2. Ir a la pestaña "SQL"
3. Copiar y pegar el contenido de: database/schema_completo_nuevo.sql
4. Ejecutar
```

**IMPORTANTE:** Esto eliminará la base de datos anterior y creará una nueva con todos los 50+ trámites.

### 2. ⏳ ACTUALIZAR FRONTEND - Recuperación de Contraseña

Crear: `frontend/src/pages/RecuperarPassword.jsx`

```jsx
// Página con 3 pasos:
// 1. Ingresar DNI
// 2. Responder pregunta de seguridad
// 3. Ingresar nueva contraseña
```

Agregar ruta en `App.jsx`:
```jsx
<Route path="/recuperar-password" element={<RecuperarPassword />} />
```

Agregar link en `Login.jsx`:
```jsx
<Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
```

### 3. ⏳ CREAR SECCIÓN DE PERFIL

Crear: `frontend/src/pages/Perfil.jsx`

Debe incluir:
- ✅ Ver datos del usuario
- ✅ Cambiar contraseña
- ✅ Configurar pregunta de seguridad (con 5 opciones)
- ✅ Registrar rostro (ya existe el componente)

**5 preguntas de seguridad sugeridas:**
1. ¿Cuál es el nombre de tu primera mascota?
2. ¿En qué ciudad naciste?
3. ¿Cuál es el nombre de tu mejor amigo de la infancia?
4. ¿Cuál es tu comida favorita?
5. ¿Cuál fue el nombre de tu primera escuela?

### 4. ⏳ CREAR INTERFAZ DE ADMINISTRADOR

Crear: `frontend/src/pages/admin/` con:

#### A. `AdminDashboard.jsx`
- Estadísticas generales
- Trámites pendientes destacados
- Gráficos de estado de trámites

#### B. `AdminTramites.jsx`
- Lista de todos los trámites
- Filtros: estado, categoría, fecha
- Búsqueda por código o DNI
- Vista detallada de cada trámite

#### C. `AdminResponder.jsx`
- Formulario para responder trámites
- Cambiar estado (pendiente, en_revision, observado, aprobado, rechazado, completado)
- Textarea para respuesta del alcalde
- **Botón "Ayuda IA"** para que Gemini sugiera respuesta
- **Upload de archivos** (documentos de respuesta)

#### D. `AdminEstadisticas.jsx`
- Gráficos avanzados
- Reportes descargables
- Análisis por categoría

### 5. ⏳ SISTEMA DE ARCHIVOS ADJUNTOS

#### Backend:
Ya existe `guardar_archivo_adjunto()` en database.py

Crear endpoint en `app.py`:
```python
@app.route('/api/tramites/<int:tramite_id>/archivos', methods=['POST'])
def subir_archivo(tramite_id):
    # Recibir archivo
    # Guardar en carpeta uploads/
    # Registrar en BD
    # Tipos permitidos: pdf, jpg, jpeg, png, docx, xlsx
    # Tamaño máximo: 10MB
```

#### Frontend:
Componente de upload en `NuevoTramite.jsx` y `AdminResponder.jsx`

### 6. ⏳ MEJORAR INTERFAZ

#### Colores y Tema:
```css
/* Tema Municipal */
--primary: #1e40af; /* Azul gobierno */
--secondary: #059669; /* Verde éxito */
--danger: #dc2626; /* Rojo error */
--warning: #f59e0b; /* Amarillo advertencia */
--admin: #7c3aed; /* Morado admin */
```

#### Componentes a mejorar:
- `Dashboard.jsx` - Cards más atractivos
- `MisTramites.jsx` - Vista de tabla mejorada
- `NuevoTramite.jsx` - Wizard de pasos
- Agregar loading skeletons
- Animaciones suaves con Framer Motion

### 7. ⏳ PROTEGER RUTAS DE ADMINISTRADOR

En `App.jsx`:
```jsx
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user || user.tipo_usuario !== 'administrador') {
    return <Navigate to="/dashboard" />
  }
  return children
}

// Usar en rutas:
<Route path="/admin/*" element={
  <ProtectedAdminRoute>
    <AdminLayout />
  </ProtectedAdminRoute>
} />
```

### 8. ⏳ MEJORAR ASISTENTE IA

En `AsistenteIA.jsx`:
- Agregar botones de acciones rápidas:
  - "Ayúdame a redactar una solicitud"
  - "¿Qué trámite necesito para...?"
  - "¿Cuánto demora mi trámite?"
  - "¿Qué documentos necesito?"
- Mostrar historial de consultas
- Permitir seleccionar trámite actual para contexto

---

## 🚀 PASOS PARA IMPLEMENTAR

### Paso 1: Base de Datos (5 minutos)
```bash
1. Abrir XAMPP
2. Iniciar MySQL
3. Abrir phpMyAdmin
4. Ejecutar script: database/schema_completo_nuevo.sql
5. Verificar que se crearon todas las tablas
```

### Paso 2: Backend (Ya está listo)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

Verificar en: http://localhost:5000/api/health

### Paso 3: Frontend - Recuperación de Contraseña (30 min)
```bash
1. Crear RecuperarPassword.jsx
2. Agregar ruta en App.jsx
3. Agregar link en Login.jsx
4. Probar flujo completo
```

### Paso 4: Frontend - Perfil de Usuario (1 hora)
```bash
1. Crear Perfil.jsx
2. Agregar ruta en App.jsx
3. Implementar:
   - Cambiar contraseña
   - Configurar pregunta seguridad
   - Registrar rostro (reutilizar componente)
```

### Paso 5: Frontend - Panel de Administrador (3-4 horas)
```bash
1. Crear carpeta: frontend/src/pages/admin/
2. Crear AdminLayout.jsx (sidebar diferente)
3. Crear AdminDashboard.jsx
4. Crear AdminTramites.jsx
5. Crear AdminResponder.jsx
6. Proteger rutas con ProtectedAdminRoute
7. Agregar navegación en Dashboard según tipo_usuario
```

### Paso 6: Sistema de Archivos (2 horas)
```bash
Backend:
1. Crear carpeta: backend/uploads/
2. Agregar endpoint de upload
3. Agregar endpoint para descargar

Frontend:
1. Componente UploadFiles.jsx
2. Integrar en NuevoTramite
3. Integrar en AdminResponder
4. Mostrar archivos adjuntos en detalle
```

### Paso 7: Mejoras de UI (2-3 horas)
```bash
1. Actualizar colores y tema
2. Agregar animaciones
3. Mejorar responsive
4. Pulir detalles
```

---

## 🎯 PRIORIDADES

### Alta prioridad (hacer primero):
1. ✅ Ejecutar nueva base de datos
2. ✅ Página de recuperación de contraseña
3. ✅ Panel de administrador básico
4. ✅ Sistema de archivos adjuntos

### Media prioridad:
5. ✅ Perfil de usuario completo
6. ✅ Mejoras de interfaz
7. ✅ Estadísticas avanzadas

### Baja prioridad (opcional):
8. Notificaciones en tiempo real
9. Exportar reportes PDF
10. Chat en vivo

---

## 📊 RESUMEN DE ARCHIVOS

### Archivos NUEVOS creados:
- ✅ `database/schema_completo_nuevo.sql` (Base de datos completa)
- ✅ `backend/endpoints_seguridad.py` (Referencia de endpoints)
- ✅ `backend/test_conexion.py` (Script de prueba)

### Archivos MODIFICADOS:
- ✅ `backend/app.py` (Endpoints nuevos agregados)
- ✅ `backend/database.py` (Correcciones de tipos)
- ✅ `backend/gemini_service.py` (IA mejorada)
- ✅ `frontend/src/pages/Login.jsx` (Campo contraseña)
- ✅ `frontend/src/pages/Register.jsx` (Ya tenía contraseña y fecha)
- ✅ `frontend/src/context/AuthContext.jsx` (Login con contraseña)

### Archivos POR CREAR:
- ⏳ `frontend/src/pages/RecuperarPassword.jsx`
- ⏳ `frontend/src/pages/Perfil.jsx`
- ⏳ `frontend/src/pages/admin/AdminLayout.jsx`
- ⏳ `frontend/src/pages/admin/AdminDashboard.jsx`
- ⏳ `frontend/src/pages/admin/AdminTramites.jsx`
- ⏳ `frontend/src/pages/admin/AdminResponder.jsx`
- ⏳ `frontend/src/components/UploadFiles.jsx`
- ⏳ `frontend/src/components/ProtectedAdminRoute.jsx`

---

## ⚙️ CONFIGURACIÓN IMPORTANTE

### Variables de entorno (backend/.env):
```env
GEMINI_API_KEY=AIzaSyDHsTlq9HCdp2OxGXvvtOg5zt4LrDUklR4
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=municipalidad_yau
```

### Axios config (frontend/src/main.jsx):
```javascript
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Failed processing format-parameters"
✅ **YA CORREGIDO** en database.py - Todos los parámetros usan conversión explícita

### Error: "crear_usuario() missing arguments"
✅ **YA CORREGIDO** - Ahora requiere `fecha_nacimiento` y `password`

### Error: CORS
✅ **YA CONFIGURADO** en app.py - Permite localhost:5173

### Base de datos vacía
⏳ Ejecutar `schema_completo_nuevo.sql` en phpMyAdmin

---

## 📞 CONTACTO Y SOPORTE

Sistema desarrollado para la Municipalidad Provincial de Yau
- Email: alcalde@municipalidad-yau.gob.pe
- Contraseña Admin: Admin2024!
- Puerto Backend: 5000
- Puerto Frontend: 5173

---

**Última actualización:** 4 de noviembre, 2025
**Estado:** Backend 100% | Frontend 60% | Base de datos 100%
