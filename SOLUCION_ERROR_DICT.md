# 🔧 SOLUCIÓN AL ERROR: "Python 'dict' cannot be converted to a MySQL type"

## ⚠️ CAUSA DEL ERROR

Este error aparece porque el backend está intentando usar una **base de datos antigua** que NO tiene la estructura correcta.

## ✅ SOLUCIÓN (3 PASOS)

### PASO 1: Detener Backend y Frontend

Si están corriendo, detenlos:
- Backend: `Ctrl+C` en la terminal del backend
- Frontend: `Ctrl+C` en la terminal del frontend

### PASO 2: Ejecutar el Script SQL Nuevo ⭐ IMPORTANTE

```
1. Abrir XAMPP → Iniciar MySQL (si no está iniciado)
2. Abrir http://localhost/phpmyadmin en tu navegador
3. Click en la pestaña "SQL" (arriba)
4. Abrir el archivo: database/schema_completo_nuevo.sql
5. Copiar TODO el contenido (Ctrl+A, Ctrl+C)
6. Pegar en phpMyAdmin (Ctrl+V)
7. Click en "Continuar" o "Go"
8. Esperar a que termine (verás mensajes de éxito)
```

**IMPORTANTE:** Esto eliminará la base de datos anterior y creará una nueva con:
- 50+ trámites
- Estructura correcta de tablas
- Usuario administrador
- Todas las configuraciones

### PASO 3: Reiniciar Backend y Frontend

**Terminal 1 (Backend):**
```bash
cd backend
python app.py
```

Debes ver:
```
✅ Conexión a base de datos MySQL establecida
✅ 0 encodings faciales cargados
✅ Motor ML inicializado
✅ Servicio Gemini AI disponible
🚀 Servidor Flask SIMPLE iniciado en http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Debes ver:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

## 🧪 VERIFICAR QUE FUNCIONÓ

### Prueba 1: Login Administrador
```
1. Ir a: http://localhost:5173/login
2. DNI: 12345678
3. Contraseña: Admin2024!
4. Click "Iniciar Sesión"
```

✅ **Debe redirigir a:** `/admin` (panel morado del alcalde)

### Prueba 2: Registrarse como Ciudadano
```
1. Ir a: http://localhost:5173/register
2. Llenar todos los campos
3. DNI: 87654321 (ejemplo)
4. Contraseña: MiPassword123
5. Fecha nacimiento: Cualquier fecha (18+ años)
6. Click "Registrar"
```

✅ **Debe mostrar:** Mensaje de éxito y redirigir a login

## ❌ SI EL ERROR PERSISTE

Si después de ejecutar el SQL el error continúa:

### Verificación 1: Base de Datos Creada
```
1. phpMyAdmin → Ver bases de datos en el menú izquierdo
2. Debe existir: municipalidad_yau
3. Click en ella → Debe tener estas tablas:
   - usuarios
   - tipos_tramite
   - tramites
   - preguntas_seguridad
   - archivos_adjuntos
   - notificaciones
   - consultas_gemini
   - configuracion
```

### Verificación 2: Datos Insertados
```
1. phpMyAdmin → municipalidad_yau → tipos_tramite
2. Click en "Examinar"
3. Debe tener aproximadamente 50 registros
```

### Verificación 3: Usuario Admin Existe
```
1. phpMyAdmin → municipalidad_yau → usuarios
2. Click en "Examinar"
3. Debe existir un usuario con:
   - DNI: 12345678
   - tipo_usuario: administrador
```

## 🔧 CORRECCIONES ADICIONALES APLICADAS

También he corregido en el código:

1. ✅ `gemini_service.py` - Conversión correcta de contexto JSON
2. ✅ `database.py` - Validación de que params no sea dict
3. ✅ `app.py` - Conversión explícita de tipos en todos los INSERT

## 📞 SI NADA FUNCIONA

Envía el error exacto que aparece en la consola del backend (terminal donde corre `python app.py`).

El error completo debe decir algo como:
```
Error ejecutando query: ...
Query: INSERT INTO ...
Params: (...)
```

Esto nos dirá exactamente qué operación está fallando.

---

**En el 99% de los casos, el problema se soluciona ejecutando el script SQL nuevo.** ✅
