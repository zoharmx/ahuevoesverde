# 🔧 Guía de Despliegue - A Huevo Es Verde

## ✅ Configuración Completada

Las credenciales de Twilio ya están configuradas en `functions/.env`:
- ✅ TWILIO_ACCOUNT_SID
- ✅ TWILIO_AUTH_TOKEN

## 🚀 Desplegar a Producción

Ejecuta estos comandos en tu PowerShell:

```powershell
# 1. Instalar dependencias (si no lo has hecho)
cd functions
npm install

# 2. Volver a la raíz del proyecto
cd ..

# 3. Desplegar las funciones
firebase deploy --only functions
```

---

## 🧪 Para Desarrollo Local

Si quieres probar las funciones localmente antes de desplegar:

```powershell
# Desde la carpeta functions
cd functions
npm run serve
```

El emulador usará automáticamente las variables del archivo `functions/.env`.

---

## 🔐 Configurar Stripe (Más Adelante)

Cuando tengas tu Stripe Secret Key, edita el archivo `functions/.env`:

```env
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
```

O para producción:

```env
STRIPE_SECRET_KEY=sk_live_tu_clave_aqui
```

---

## ⚠️ Nota Importante sobre Firebase Config

Firebase Functions Config (`functions.config()`) está obsoleto y dejará de funcionar en marzo 2026.

**Ya migré el código a usar dotenv (`.env`)**, que es el método recomendado por Firebase.

Los archivos `.env` están en `.gitignore` y NO se subirán a GitHub (es seguro).
