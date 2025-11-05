# ✅ ARCHIVOS BIDIRECCIONALES - COMPLETADO

## 🎯 FUNCIONALIDAD IMPLEMENTADA:

### ADMIN ve archivos del CIUDADANO ✅
### CIUDADANO ve archivos del ADMIN ✅

---

## 📊 FLUJO COMPLETO

### 1️⃣ Ciudadano crea trámite:
```
Nuevo Trámite → Subir archivos → Crear
↓
Archivos guardados en: tramites.documentos_adjuntos
```

### 2️⃣ Admin ve archivos del ciudadano:
```
Admin → Trámites → Responder
↓
Modal muestra:
📎 Archivos Adjuntos (del ciudadano)
[🖼️ foto.jpg] [🎥 video.mp4]
```

### 3️⃣ Admin sube sus archivos:
```
En el mismo modal:
📤 Adjuntar Archivos (Admin)
[Click para subir]
→ Sube foto_respuesta.jpg
↓
Archivos guardados en: tramites.documentos_admin
```

### 4️⃣ Ciudadano ve archivos del admin:
```
Mis Trámites → Ver Completo
↓
Modal muestra:
📎 Archivos Adjuntos (tuyos - morado)
[🖼️ foto.jpg] [🎥 video.mp4]

📎 Archivos de la Municipalidad (verde)
[🖼️ foto_respuesta.jpg] [📄 doc_oficial.pdf]
```

---

## 🗄️ CAMBIOS EN BASE DE DATOS

### Nueva columna agregada:
```sql
ALTER TABLE tramites 
ADD COLUMN documentos_admin LONGTEXT 
COMMENT 'Archivos adjuntos subidos por el administrador';
```

### Estructura de tramites ahora:
```
tramites
├── id
├── codigo_tramite
├── descripcion
├── documentos_adjuntos  ← Archivos del ciudadano
├── documentos_admin     ← Archivos del admin (NUEVO)
├── respuesta_admin
└── ...
```

---

## 🎨 DIFERENCIAS VISUALES

### En Admin (Modal de Responder):

```
┌────────────────────────────────────────┐
│ Responder Trámite              [X]    │
├────────────────────────────────────────┤
│                                        │
│ 📎 Archivos Adjuntos (3)              │
│ [Fondo AZUL]                          │
│ Archivos que subió el ciudadano:     │
│ [🖼️ foto.jpg] [🎥 video.mp4]         │
│                                        │
│ ──────────────────────────────────     │
│                                        │
│ [Estado] [Respuesta]                  │
│                                        │
│ 📤 Adjuntar Archivos (Opcional)       │
│ [Subir archivos del admin]            │
│ • foto_respuesta.jpg [X]              │
│                                        │
│ [Guardar y Notificar]                 │
└────────────────────────────────────────┘
```

### En Ciudadano (Modal Ver Completo):

```
┌────────────────────────────────────────┐
│ Detalles del Trámite           [X]    │
├────────────────────────────────────────┤
│                                        │
│ Descripción...                        │
│ Respuesta del Admin...                │
│                                        │
│ 📎 Archivos Adjuntos                  │
│ [Fondo MORADO]                        │
│ Tus archivos:                         │
│ [🖼️ foto.jpg] [🎥 video.mp4]         │
│                                        │
│ 📎 Archivos de la Municipalidad       │
│ [Fondo VERDE]                         │
│ Archivos del admin:                   │
│ [🖼️ foto_respuesta.jpg]              │
│ [📄 doc_oficial.pdf]                  │
│                                        │
│ [Descargar PDF] [Descargar DOCX]     │
└────────────────────────────────────────┘
```

---

## 🎨 CÓDIGOS DE COLOR

### Archivos del Ciudadano:
- **En Admin:** `bg-blue-50` (azul claro)
- **En Ciudadano:** `bg-purple-50` (morado)
- **Título:** "📎 Archivos Adjuntos"

### Archivos del Admin:
- **En Ciudadano:** `bg-green-50` (verde claro)
- **Título:** "📎 Archivos de la Municipalidad"

---

## 🔧 CAMBIOS TÉCNICOS

### Backend (`app.py`):

**1. Endpoint de responder modificado:**
```python
# Líneas 969-972: Preparar documentos del admin
documentos_admin_json = None
if 'documentos_admin' in data and data['documentos_admin']:
    documentos_admin_json = json.dumps(data['documentos_admin'])

# Línea 979: Agregar a query UPDATE
documentos_admin = %s,
```

### Frontend (`AdminTramites.jsx`):

**2. Conversión a Base64:**
```javascript
// Líneas 125-140: Convertir archivos a base64
const documentosAdmin = []
for (const file of archivosAdmin) {
    const base64 = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(file)
    })
    
    documentosAdmin.push({
        nombre: file.name,
        tipo: file.type,
        tamaño: file.size,
        data: base64
    })
}
```

**3. Envío al servidor:**
```javascript
// Línea 142-146
await axios.post('/api/admin/tramites/${id}/responder', {
    estado: nuevoEstado,
    respuesta: respuesta,
    documentos_admin: documentosAdmin  // ← NUEVO
})
```

### Frontend (`MisTramites.jsx`):

**4. Vista de archivos del admin:**
```javascript
// Líneas 457-519: Nueva sección
{tramiteSeleccionado.documentos_admin && (
    <div>
        <h4>📎 Archivos de la Municipalidad</h4>
        <div className="bg-green-50">
            {/* Preview y descarga */}
        </div>
    </div>
)}
```

---

## 🧪 CÓMO PROBAR

### TEST COMPLETO:

**1. Como Ciudadano - Crear trámite con archivos:**
```
1. Login: http://localhost:3000
2. Nuevo Trámite
3. Subir foto.jpg y video.mp4
4. Crear trámite
5. ✅ Archivos guardados
```

**2. Como Admin - Ver archivos y responder:**
```
1. Login admin (DNI: 12345678, Pass: Admin2024!)
2. Admin → Trámites
3. Click "Responder" en el trámite del ciudadano
4. ✅ Ver "Archivos Adjuntos" del ciudadano (azul)
5. ✅ Ver foto.jpg y video.mp4 con preview
6. Scroll a "Adjuntar Archivos"
7. Subir foto_respuesta.jpg
8. ✅ Ver archivo en lista
9. Click "Guardar y Notificar"
10. ✅ Archivos del admin guardados
```

**3. Como Ciudadano - Ver archivos del admin:**
```
1. Login como ciudadano
2. Mis Trámites
3. Click "Ver Completo" en el trámite respondido
4. ✅ Ver "Archivos Adjuntos" (morado) - Tuyos
5. ✅ Ver "Archivos de la Municipalidad" (verde) - Del admin
6. ✅ Ver foto_respuesta.jpg con preview
7. Click "Descargar"
8. ✅ Archivo se descarga
```

---

## 📋 CASOS DE USO

### Caso 1: Ciudadano solicita licencia
```
Ciudadano:
- Sube: plano.pdf, foto_local.jpg
- Descripción: "Solicito licencia para mi restaurante"

Admin:
- Ve los archivos del ciudadano
- Sube: permiso_bomberos.pdf, certificado.pdf
- Responde: "Aprobado. Adjunto documentos oficiales"

Ciudadano:
- Ve sus archivos originales
- Ve documentos oficiales del admin
- Descarga todo
```

### Caso 2: Trámite observado
```
Ciudadano:
- Sube: documento_viejo.pdf

Admin:
- Ve documento viejo
- Responde: "Necesitas documento actualizado"

Ciudadano:
- Ve el documento viejo que subió
- Crea nuevo trámite con documento_nuevo.pdf
```

### Caso 3: Respuesta con evidencia
```
Ciudadano:
- Sube: foto_problema.jpg
- Describe: "Problema en calle X"

Admin:
- Ve foto del problema
- Sube: foto_solucion.jpg
- Responde: "Problema resuelto. Ver foto"

Ciudadano:
- Ve su foto original del problema
- Ve foto de la solución del admin
- Compara ambas fotos
```

---

## 📊 FORMATO DE DATOS

### JSON de archivos del ciudadano:
```json
// tramites.documentos_adjuntos
[
    {
        "nombre": "foto.jpg",
        "tipo": "image/jpeg",
        "tamaño": 153600,
        "data": "data:image/jpeg;base64,/9j/4AAQ..."
    },
    {
        "nombre": "video.mp4",
        "tipo": "video/mp4",
        "tamaño": 2457600,
        "data": "data:video/mp4;base64,AAAAIGZ0..."
    }
]
```

### JSON de archivos del admin:
```json
// tramites.documentos_admin
[
    {
        "nombre": "respuesta_oficial.pdf",
        "tipo": "application/pdf",
        "tamaño": 512000,
        "data": "data:application/pdf;base64,JVBERi0..."
    },
    {
        "nombre": "foto_evidencia.jpg",
        "tipo": "image/jpeg",
        "tamaño": 204800,
        "data": "data:image/jpeg;base64,/9j/4AAQ..."
    }
]
```

---

## ✅ CHECKLIST DE FUNCIONALIDADES

- [x] Admin ve archivos del ciudadano
- [x] Admin puede descargar archivos del ciudadano
- [x] Admin puede subir sus propios archivos
- [x] Archivos del admin se guardan en BD
- [x] Ciudadano ve sus propios archivos
- [x] Ciudadano ve archivos del admin
- [x] Ciudadano puede descargar archivos del admin
- [x] Preview de imágenes funciona (ambos lados)
- [x] Preview de videos funciona (ambos lados)
- [x] Colores diferentes para identificar origen
- [x] Límite de 5 archivos por lado

---

## 🚀 PARA INICIAR

**Backend:**
```bash
cd C:\Users\Admin\Desktop\sistema_municipalidad\backend
python app.py
```

**Frontend:**
```bash
cd C:\Users\Admin\Desktop\sistema_municipalidad\frontend
npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

**Credenciales:**
- Admin: DNI `12345678`, Pass `Admin2024!`

---

## 🎯 RESUMEN VISUAL

```
CIUDADANO                           ADMIN
    │                                 │
    ├─ Sube archivos ────────────────┤
    │  (foto.jpg, video.mp4)         │
    │                                 │
    │                                 ├─ Ve archivos del ciudadano
    │                                 │  (fondo azul)
    │                                 │
    │                                 ├─ Sube sus archivos
    │                                 │  (respuesta.pdf)
    │                                 │
    │                                 └─ Guarda
    │                                    ↓
    ├─ Ve sus archivos (morado) ◄─────┤
    │                                 │
    └─ Ve archivos del admin (verde) ─┘
```

---

**TODO IMPLEMENTADO Y FUNCIONANDO** ✅🎉

Fecha: 5 de noviembre, 2025 - 16:35
Sistema: `sistema_municipalidad`
