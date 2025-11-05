# ⚡ INICIO RÁPIDO

## Instalar y ejecutar en 5 minutos

---

## 📋 REQUISITOS

- Python 3.8+
- Node.js 16+
- MySQL 8.0+

---

## 🚀 INSTALACIÓN RÁPIDA

### 1. Base de Datos (2 min)
```bash
mysql -u root -p
CREATE DATABASE sistema_municipal_yau;
EXIT;

cd database
mysql -u root -p sistema_municipal_yau < schema_completo_nuevo.sql
```

### 2. Backend (1 min)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Frontend (2 min)
```bash
# Nueva terminal
cd frontend
npm install
npm run dev
```

---

## 🌐 ACCEDER

**Frontend:** http://localhost:3000

**Login Admin:**
- DNI: `12345678`
- Pass: `Admin2024!`

---

## ⚙️ CONFIGURAR .ENV

Crear `backend/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sistema_municipal_yau
JWT_SECRET_KEY=clave_secreta_123
GEMINI_API_KEY=tu_api_key
```

---

## 📖 DOCUMENTACIÓN COMPLETA

Ver: `INSTALACION_COMPLETA.md`

---

✅ **¡Listo!** Sistema corriendo.
