# ✅ UPLOAD DE ARCHIVOS Y MARKDOWN EN NUEVO TRÁMITE

## 🎯 FUNCIONALIDADES AGREGADAS

### 1. ✅ Upload de Archivos (Imágenes, Videos, PDFs)
Componente completo para subir archivos adjuntos a los trámites

### 2. ✅ Preview de Markdown
Ver cómo se verá la descripción con formato antes de enviar

### 3. ✅ Escritura Manual Mejorada
Textarea grande con ayuda de IA opcional

---

## 📁 COMPONENTE FILEUPLOAD

### Creado: `frontend/src/components/FileUpload.jsx`

**Características:**
- ✅ Drag & drop visual
- ✅ Múltiples archivos (máx. 5 por defecto)
- ✅ Límite de tamaño (10MB por defecto)
- ✅ Vista previa de imágenes
- ✅ Iconos por tipo de archivo
- ✅ Botón para eliminar archivos
- ✅ Formato de tamaño legible
- ✅ Validaciones automáticas

**Tipos de archivo soportados:**
- 📷 **Imágenes:** JPG, PNG, GIF, etc.
- 🎥 **Videos:** MP4, MOV, AVI, etc.
- 📄 **Documentos:** PDF, Word, TXT
- 📦 **Otros:** Cualquier archivo

---

## 🎨 INTERFAZ VISUAL

```
┌─────────────────────────────────────────────┐
│ Descripción (Opcional)   [✨ Ayuda con IA] │
├─────────────────────────────────────────────┤
│ 🤖 La IA puede redactar una solicitud...   │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ [Área de texto - 8 líneas]             │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
│ Info adicional...    [Ver Vista Previa]    │
├─────────────────────────────────────────────┤
│ Vista Previa: (si está activada)           │
│ Texto con **negritas** y *cursivas*        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Documentos Adjuntos (Opcional)              │
├─────────────────────────────────────────────┤
│        📤 Upload                            │
│   Click para seleccionar archivos          │
│   Imágenes, videos, PDF (Máx. 10MB)        │
├─────────────────────────────────────────────┤
│ 3 archivo(s) seleccionado(s):              │
│                                             │
│ [🖼️] foto.jpg      [150 KB]    [❌]       │
│ [📄] documento.pdf [2.3 MB]    [❌]       │
│ [🎥] video.mp4     [8.5 MB]    [❌]       │
└─────────────────────────────────────────────┘

[Crear Trámite] [Cancelar]
```

---

## 📝 MARKDOWN EN DESCRIPCIÓN

### Cómo Usar:

**1. Escribir con formato markdown:**
```markdown
**Solicitud de Licencia**

Requiero una licencia de funcionamiento para:

1. Local comercial
2. Dirección: Av. Principal 123
3. Rubro: *Panadería*

**Documentos adjuntos:**
- Plano de ubicación
- Certificado de defensa civil
```

**2. Click en "Ver Vista Previa":**
Se muestra cómo se verá con formato aplicado:
- **Solicitud de Licencia** (negrita)
- Lista numerada
- *Panadería* (cursiva)

**3. Enviar:**
El sistema guarda el texto y lo muestra formateado

---

## 🔧 FLUJO COMPLETO

### Crear Trámite con Todo:

```
1. Seleccionar Tipo de Trámite
   └─ Click en categoría
   └─ Click en trámite específico

2. Escribir Descripción
   Opción A: Manual
   └─ Escribir con markdown
   └─ Click "Ver Vista Previa"
   └─ Verificar formato
   
   Opción B: Con IA
   └─ Click "✨ Ayuda con IA"
   └─ IA genera texto formal
   └─ Editar si es necesario

3. Subir Archivos (Opcional)
   └─ Click en zona de upload
   └─ Seleccionar archivos
   └─ Ver previews
   └─ Eliminar si es necesario

4. Crear Trámite
   └─ Click "Crear Trámite"
   └─ Sistema convierte archivos a base64
   └─ Envía al backend
   └─ Guarda en BD
```

---

## 💾 CÓMO SE GUARDAN LOS ARCHIVOS

### En el Frontend:
```javascript
// 1. Usuario selecciona archivos
const files = [File1, File2, File3]

// 2. Se convierten a base64
const archivosBase64 = []
for (const file of files) {
  const base64 = await readFileAsDataURL(file)
  archivosBase64.push({
    nombre: file.name,
    tipo: file.type,
    tamaño: file.size,
    data: base64  // "data:image/jpeg;base64,/9j/4AAQ..."
  })
}

// 3. Se envían al backend
POST /api/tramites
{
  tipo_tramite_id: 1,
  descripcion: "...",
  documentos: archivosBase64
}
```

### En el Backend:
```python
# app.py recibe los documentos
data = request.get_json()
documentos = data.get('documentos', [])  # Array de objetos

# Se guarda en BD como JSON
query = """
  INSERT INTO tramites (documentos_adjuntos, ...)
  VALUES (%s, ...)
"""
Database.execute_query(query, (json.dumps(documentos), ...))
```

### En la Base de Datos:
```sql
-- Tabla: tramites
-- Campo: documentos_adjuntos (JSON)

[
  {
    "nombre": "foto.jpg",
    "tipo": "image/jpeg",
    "tamaño": 153600,
    "data": "data:image/jpeg;base64,/9j/4AAQ..."
  },
  {
    "nombre": "documento.pdf",
    "tipo": "application/pdf",
    "tamaño": 2411520,
    "data": "data:application/pdf;base64,JVBERi0x..."
  }
]
```

---

## 🎯 VALIDACIONES

### FileUpload Component:

**Máximo de Archivos:**
```javascript
if (files.length + selectedFiles.length > maxFiles) {
  toast.error('Máximo 5 archivos permitidos')
  return
}
```

**Tamaño Máximo:**
```javascript
const maxSizeBytes = 10 * 1024 * 1024  // 10MB
const invalidFiles = selectedFiles.filter(file => file.size > maxSizeBytes)
if (invalidFiles.length > 0) {
  toast.error('Archivos muy grandes. Máximo 10MB')
  return
}
```

**Tipos Permitidos:**
```html
<input
  type="file"
  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
/>
```

---

## 📊 EJEMPLOS DE USO

### Caso 1: Solicitud con Fotos
```
Tipo: Denuncia de Obra Ilegal
Descripción:
  "Reporto construcción sin permiso en:
  **Dirección:** Calle Falsa 123
  
  Adjunto *evidencias fotográficas*"
  
Archivos:
  - foto1.jpg (obra sin permiso)
  - foto2.jpg (fecha y hora)
  - plano_ubicacion.pdf
```

### Caso 2: Licencia con Documentos
```
Tipo: Licencia de Funcionamiento
Descripción:
  "**Solicitud de Licencia**
  
  Datos del negocio:
  1. Nombre: Panadería San José
  2. Dirección: Av. Principal 456
  3. Rubro: *Panadería y pastelería*"
  
Archivos:
  - recibo_agua.pdf
  - recibo_luz.pdf
  - certificado_defensa_civil.pdf
  - plano_local.jpg
```

### Caso 3: Solo Texto con IA
```
Tipo: Constancia de No Adeudo
Descripción: (Generada por IA)
  "Estimados señores de la Municipalidad:
  
  Por medio de la presente, solicito...
  
  Atentamente,
  [Nombre del ciudadano]"
  
Archivos: Ninguno
```

---

## 🔒 SEGURIDAD

### Base64 vs Upload Directo:

**¿Por qué base64?**
✅ Más simple (sin servidor de archivos)
✅ JSON en MySQL funciona bien
✅ Todo en una transacción
✅ Fácil de implementar

**Limitaciones:**
⚠️ Base64 aumenta tamaño ~33%
⚠️ No ideal para archivos muy grandes
⚠️ Límite de 10MB por archivo

**Para Producción (futuro):**
- Usar S3 de AWS o similar
- Guardar solo URLs en BD
- Soporte para archivos más grandes

---

## 🎨 ESTILOS DE MARKDOWN

### Ya incluidos en `index.css`:

```css
.markdown-content strong {
  font-bold text-gray-900;
}

.markdown-content em {
  italic text-gray-700;
}

.markdown-content ul, ol {
  ml-4 mb-3 space-y-1;
}

.markdown-content code {
  bg-gray-200 px-1 rounded;
}
```

---

## 📁 ARCHIVOS MODIFICADOS/CREADOS

### Nuevos:
1. ✅ `frontend/src/components/FileUpload.jsx`
   - Componente completo de upload
   - 170 líneas
   - Drag & drop, previews, validaciones

### Modificados:
1. ✅ `frontend/src/pages/NuevoTramite.jsx`
   - Importado ReactMarkdown
   - Importado FileUpload
   - Estado para archivos
   - Función convertir a base64
   - Preview de markdown
   - Sección de archivos

2. ✅ `frontend/src/index.css`
   - Estilos para markdown-content (ya existían)

### Base de Datos:
❌ **No se modificó** - Ya tenía el campo correcto:
```sql
CREATE TABLE tramites (
  ...
  documentos_adjuntos JSON,  -- ✅ Ya existía
  ...
);
```

---

## 🧪 CÓMO PROBAR

### 1. Probar Upload de Archivos:

```
1. Ir a: /nuevo-tramite
2. Seleccionar un tipo de trámite
3. Scroll hasta "Documentos Adjuntos"
4. Click en la zona de upload
5. Seleccionar 2-3 archivos (imágenes, PDF, etc.)
6. Ver previews de imágenes
7. Ver lista de archivos con tamaños
8. Click en [X] para eliminar uno
9. Verificar que se eliminó
```

### 2. Probar Markdown:

```
1. En "Descripción" escribir:
   **Solicitud**
   
   Requiero:
   1. Item 1
   2. Item 2
   
   *Importante*: Urgente

2. Click "Ver Vista Previa"
3. Verificar formato:
   - "Solicitud" en negrita
   - Lista numerada
   - "Importante" en cursiva
```

### 3. Probar Todo Junto:

```
1. Seleccionar trámite
2. Click "✨ Ayuda con IA"
3. IA genera texto con markdown
4. Click "Ver Vista Previa"
5. Agregar 2 archivos
6. Click "Crear Trámite"
7. ✅ Debe crear con texto Y archivos
```

---

## ⚠️ LÍMITES ACTUALES

| Aspecto | Límite | Configurable |
|---------|--------|--------------|
| Archivos por trámite | 5 | ✅ Sí (maxFiles) |
| Tamaño por archivo | 10MB | ✅ Sí (maxSize) |
| Tamaño total | 50MB | ⚠️ Indirecto |
| Tipos permitidos | Todos | ✅ Sí (accept) |

**Para cambiar límites:**
```javascript
<FileUpload 
  onFilesChange={setArchivos}
  maxFiles={10}      // ← Cambiar aquí
  maxSize={20}       // ← Cambiar aquí (en MB)
/>
```

---

## ✅ CHECKLIST

- [x] Componente FileUpload creado
- [x] Soporte para múltiples archivos
- [x] Previews de imágenes
- [x] Iconos por tipo de archivo
- [x] Validación de tamaño
- [x] Validación de cantidad
- [x] Conversión a base64
- [x] ReactMarkdown en NuevoTramite
- [x] Preview de markdown
- [x] Toggle para mostrar/ocultar preview
- [x] Integración con formulario
- [x] Envío al backend
- [x] Campo BD ya existe (documentos_adjuntos)
- [x] Sin cambios en BD necesarios

---

## 🚀 RESULTADO FINAL

**Nuevo Trámite ahora tiene:**
- ✅ Selección de tipo por categorías
- ✅ Ayuda con IA para redactar
- ✅ Escritura manual mejorada
- ✅ **Soporte de markdown** con preview
- ✅ **Upload de archivos** (imágenes, videos, PDFs)
- ✅ Vista previa de imágenes
- ✅ Validaciones automáticas
- ✅ Todo guardado en base64
- ✅ UX profesional y completa

---

**Todo implementado y funcionando** ✅

Última actualización: 4 de noviembre, 2025 - 17:19
