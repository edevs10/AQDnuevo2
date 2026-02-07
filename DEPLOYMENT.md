# ¿Algo Que Declarar? - Guía de Deployment

## 📋 Pre-requisitos para Producción

### Backend
- **MongoDB Atlas** (base de datos en la nube)
- **Railway / Render / Heroku** (hosting backend)
- Python 3.9+

### Frontend
- **Vercel / Netlify** (hosting frontend recomendado)
- Node.js 18+

---

## 🚀 Pasos para Deploy

### 1️⃣ Configurar MongoDB en Producción

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener la URL de conexión (ejemplo: `mongodb+srv://usuario:password@cluster.mongodb.net/`)
4. Crear base de datos: `aqd_production`

### 2️⃣ Deploy del Backend

#### Opción A: Railway.app (Recomendado)

1. Crear cuenta en [Railway](https://railway.app)
2. Conectar repositorio de GitHub
3. **IMPORTANTE**: Railway debe detectar los archivos de configuración:
   - `Procfile` (define el comando de inicio)
   - `railway.json` o `nixpacks.toml` (configuración del build)
   
4. Configurar variables de entorno en Railway:
   ```
   MONGO_URL=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/
   DB_NAME=aqd_production
   CORS_ORIGINS=https://tu-dominio-frontend.vercel.app
   LOG_LEVEL=WARNING
   PORT=8000
   ```
   
5. **Importante sobre PORT**: Railway proporciona automáticamente la variable `$PORT`. No la configures manualmente.

6. Railway ejecutará automáticamente:
   - Build: `cd backend && pip install -r requirements.txt`
   - Start: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`

7. Obtener la URL del backend (ejemplo: `https://tu-backend.railway.app`)

8. **Troubleshooting Railway**:
   - Si falla, verifica los logs en Railway Dashboard
   - Asegúrate de que todas las dependencias están en `requirements.txt`
   - Verifica que MongoDB URL es accesible desde Railway
   - Railway necesita que la app escuche en `0.0.0.0` (no `localhost`)

#### Opción B: Render.com

1. Crear cuenta en [Render](https://render.com)
2. Nuevo Web Service → Conectar repo
3. Configurar:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Variables de entorno (iguales que Railway)

### 3️⃣ Deploy del Frontend

#### Vercel (Recomendado)

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar proyecto de GitHub
3. Configurar:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `yarn build` o `npm run build`
   - Output Directory: `build`
4. Variables de entorno:
   ```
   REACT_APP_BACKEND_URL=https://tu-backend.railway.app
   ```
5. Deploy automático

#### Netlify

1. Crear cuenta en [Netlify](https://netlify.com)
2. New site from Git → Conectar repo
3. Configurar:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
4. Variables de entorno (iguales que Vercel)

### 4️⃣ Actualizar CORS en Backend

Una vez que tengas la URL del frontend (ejemplo: `https://aqd.vercel.app`), actualizar en Railway/Render:

```
CORS_ORIGINS=https://aqd.vercel.app,https://www.aqd.vercel.app
```

---

## 🧪 Testing Post-Deploy

### Verificar Backend
```bash
curl https://tu-backend.railway.app/api/
# Debería responder: {"message":"Hello World"}
```

### Verificar Frontend
1. Abrir `https://tu-frontend.vercel.app`
2. Probar flujo completo de preguntas
3. Verificar que no hay errores CORS en la consola

---

## 🔧 Solución de Problemas Comunes

### Error: CORS Policy
**Problema:** Frontend no puede conectar con backend

**Solución:**
1. Verificar que `CORS_ORIGINS` incluye la URL exacta del frontend
2. Asegurarse de incluir https:// en la URL
3. Reiniciar el servicio backend

### Error: MongoDB Connection
**Problema:** Backend no conecta con MongoDB

**Solución:**
1. Verificar que la URL de MongoDB es correcta
2. Verificar que el usuario tiene permisos
3. Verificar que la IP está en la whitelist de MongoDB Atlas (o usar `0.0.0.0/0`)

### Error: Environment Variables
**Problema:** Variables de entorno no cargan

**Solución:**
1. Verificar que están escritas exactamente igual en el hosting
2. Reiniciar el servicio después de cambiarlas
3. No usar comillas en los valores (Railway/Render las añade automáticamente)

---

## 📊 Monitoreo

### Railway
- Logs en tiempo real en el dashboard
- Métricas de CPU/RAM/Network

### Vercel
- Analytics automático
- Logs de deploy y runtime

### MongoDB Atlas
- Dashboard de monitoreo de queries
- Alertas de uso de espacio

---

## 🔐 Seguridad - Checklist

- [ ] CORS configurado solo para dominios específicos (no `*`)
- [ ] Variables de entorno configuradas (no hardcodeadas)
- [ ] Archivos `.env` en `.gitignore`
- [ ] MongoDB con usuario/password fuerte
- [ ] IP whitelist en MongoDB (o red privada)
- [ ] HTTPS habilitado en frontend y backend

---

## 📝 Notas Importantes

1. **No subir archivos `.env` a Git**
   - Usar `.env.example` como plantilla
   - Configurar variables en el panel del hosting

2. **Testing en Staging**
   - Crear entornos de staging antes de producción
   - Vercel permite múltiples entornos fácilmente

3. **Backups de MongoDB**
   - MongoDB Atlas hace backups automáticos
   - Configurar alertas de espacio

4. **Updates**
   - Railway/Render: Auto-deploy en push a main
   - Vercel: Auto-deploy en push a main

---

## 🆘 Soporte

Si tienes dudas o detectas errores:
📧 e.goidevs@gmail.com

---

**Última actualización:** Febrero 2025
**Versión:** 1.0
