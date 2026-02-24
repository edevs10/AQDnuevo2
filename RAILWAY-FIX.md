# 🚨 Solución Rápida: Error "Application failed to respond" en Railway

## Problema
Railway no puede conectar con tu aplicación FastAPI.

## Causa
FastAPI no está escuchando en el puerto correcto que Railway proporciona (`$PORT`).

## ✅ Solución Implementada

He creado 3 archivos en la raíz del proyecto:

### 1. `Procfile`
Indica a Railway cómo iniciar la aplicación:
```
web: cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
```

### 2. `railway.json`
Configuración específica de Railway con comandos de build y deploy.

### 3. `nixpacks.toml`
Configuración para el builder Nixpacks que usa Railway.

---

## 📋 Pasos para Arreglar en Railway

### 1. Hacer push de los archivos nuevos a GitHub
```bash
git add Procfile railway.json nixpacks.toml
git commit -m "Add Railway configuration files"
git push origin main
```

### 2. En Railway Dashboard
1. Ve a tu proyecto en Railway
2. Ve a **Settings** → **Redeploy**
3. Railway debería detectar los archivos nuevos y hacer rebuild

### 3. Verificar Variables de Entorno
Asegúrate de tener configuradas en Railway:

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/
DB_NAME=aqd_production
CORS_ORIGINS=https://tu-frontend.vercel.app
LOG_LEVEL=WARNING
```

**NO configures PORT manualmente** - Railway lo proporciona automáticamente.

### 4. Verificar Logs
1. Ve a **Deployments** en Railway
2. Click en el último deployment
3. Revisa los logs para ver si hay errores

---

## 🔍 Checklist de Verificación

- [ ] Archivos `Procfile`, `railway.json`, `nixpacks.toml` están en la raíz del repositorio
- [ ] Archivos están pusheados a GitHub
- [ ] Railway ha hecho rebuild con los nuevos archivos
- [ ] Variables de entorno están configuradas (excepto PORT)
- [ ] MongoDB Atlas permite conexiones desde Railway (whitelist IP: `0.0.0.0/0`)
- [ ] `requirements.txt` está en la carpeta `backend/`

---

## 🐛 Errores Comunes y Soluciones

### Error: "ModuleNotFoundError"
**Solución:** Verifica que todas las dependencias están en `backend/requirements.txt`

### Error: "Connection refused to MongoDB"
**Solución:** 
1. Verifica que MONGO_URL está correcta
2. En MongoDB Atlas → Network Access → Whitelist: `0.0.0.0/0` (permite todas las IPs)

### Error: "Address already in use"
**Solución:** No hardcodees el puerto. Railway proporciona `$PORT` automáticamente.

### Error: "CORS policy blocked"
**Solución:** 
1. Verifica que `CORS_ORIGINS` incluye la URL exacta de tu frontend
2. Formato: `https://tu-app.vercel.app` (sin / al final)

---

## 📞 Si Sigue Sin Funcionar

1. **Copia los logs completos** del deployment en Railway
2. Verifica en MongoDB Atlas que el usuario tiene permisos de lectura/escritura
3. Prueba el backend localmente primero:
   ```bash
   cd backend
   uvicorn server:app --host 0.0.0.0 --port 8000
   ```
4. Si funciona local pero no en Railway, el problema es de configuración de Railway

---

## ✨ Test Rápido

Una vez desplegado, probar:
```bash
curl https://TU-APP.railway.app/api/
```

Debería responder:
```json
{"message":"Hello World"}
```

---

**Última actualización:** Febrero 2025
