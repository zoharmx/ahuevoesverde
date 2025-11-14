# 🔧 Comandos para Ejecutar en tu Terminal (PowerShell)

## Configurar Firebase Functions Config (Producción)

Ejecuta estos comandos en tu PowerShell desde la carpeta del proyecto:

```powershell
# Configurar Twilio (usa tus credenciales reales de Twilio Console)
firebase functions:config:set twilio.account_sid="TU_ACCOUNT_SID_AQUI"
firebase functions:config:set twilio.auth_token="TU_AUTH_TOKEN_AQUI"

# Verificar que se guardó correctamente
firebase functions:config:get
```

Deberías ver algo como:
```json
{
  "twilio": {
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "auth_token": "********************************"
  }
}
```

## Desplegar a Producción

Una vez configurado, despliega las funciones:

```powershell
firebase deploy --only functions
```

## Para Desarrollo Local

Ya creé el archivo `.env` con tus credenciales de Twilio.

Para usar el emulador local:

```powershell
cd functions
npm run serve
```

El emulador usará automáticamente las variables del archivo `.env`.

---

## Configurar Stripe (Más Adelante)

Cuando estés listo para configurar Stripe con la URL:

```powershell
firebase functions:config:set stripe.secret_key="TU_STRIPE_SECRET_KEY_AQUI"
```

---

## ⚠️ IMPORTANTE

El archivo `.env` está en `.gitignore` y NO se subirá a GitHub (es seguro).
Las configuraciones de Firebase Functions config están en la nube de forma segura.
