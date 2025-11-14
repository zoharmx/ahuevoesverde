# 🔐 Guía de Configuración de Variables de Entorno

Esta guía te ayudará a configurar de forma segura las claves de API necesarias para el funcionamiento de **A Huevo Es Verde**.

## 📋 Variables Requeridas

### 1. Twilio (WhatsApp Notifications)
Necesarias para enviar notificaciones de pedidos por WhatsApp:
- `TWILIO_ACCOUNT_SID`: Tu Account SID de Twilio
- `TWILIO_AUTH_TOKEN`: Tu Auth Token de Twilio

**¿Dónde obtenerlas?**
1. Ve a [Twilio Console](https://console.twilio.com/)
2. Encuentra tu Account SID y Auth Token en el Dashboard
3. Para WhatsApp, necesitas activar el [Twilio Sandbox for WhatsApp](https://www.twilio.com/docs/whatsapp/sandbox)

### 2. Stripe (Procesamiento de Pagos)
Necesaria para procesar pagos en línea:
- `STRIPE_SECRET_KEY`: Tu Secret Key de Stripe

**¿Dónde obtenerla?**
1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/)
2. En Developers → API keys
3. Usa las claves de **Test** para desarrollo
4. Usa las claves de **Production** para producción

⚠️ **IMPORTANTE**: Nunca compartas tu Secret Key públicamente.

---

## 🚀 Métodos de Configuración

### Opción 1: Script Automático (Recomendado)

Ejecuta el script de configuración:

```bash
bash scripts/setup-env.sh
```

Este script te guiará paso a paso para configurar todas las claves necesarias.

### Opción 2: Configuración Manual con Firebase CLI

#### Configurar variables:

```bash
# Twilio
firebase functions:config:set twilio.account_sid="TU_ACCOUNT_SID_AQUI"
firebase functions:config:set twilio.auth_token="TU_AUTH_TOKEN_AQUI"

# Stripe
firebase functions:config:set stripe.secret_key="TU_STRIPE_SECRET_KEY_AQUI"
```

#### Ver configuración actual:

```bash
firebase functions:config:get
```

#### Eliminar una configuración:

```bash
firebase functions:config:unset twilio.account_sid
```

### Opción 3: Variables de Entorno Locales (Desarrollo)

Para desarrollo local con el emulador de Firebase:

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita `.env` y agrega tus claves reales:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_secreto
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxx
```

3. El archivo `.env` está en `.gitignore` para que no se suba a Git.

---

## 🔄 Aplicar los Cambios

### En Desarrollo (Emulador)

Después de configurar las variables, reinicia el emulador:

```bash
cd functions
npm run serve
```

### En Producción

Despliega las funciones actualizadas:

```bash
firebase deploy --only functions
```

---

## ✅ Verificar la Configuración

### Verificar Firebase Functions Config:

```bash
firebase functions:config:get
```

Deberías ver algo como:

```json
{
  "twilio": {
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxx",
    "auth_token": "**********************"
  },
  "stripe": {
    "secret_key": "sk_**********************"
  }
}
```

### Verificar en el código:

Las funciones en `functions/index.js` obtienen las claves de esta manera:

```javascript
// Primero intenta con Firebase Config, luego con variables de entorno
const twilioAccountSid = functions.config().twilio?.account_sid || process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = functions.config().twilio?.auth_token || process.env.TWILIO_AUTH_TOKEN;
const stripeKey = functions.config().stripe?.secret_key || process.env.STRIPE_SECRET_KEY;
```

---

## 🛡️ Seguridad

### ✅ Buenas Prácticas:

- ✅ Usa claves de **Test** en desarrollo
- ✅ Usa claves de **Production** solo en producción
- ✅ Nunca compartas tus claves en repositorios públicos
- ✅ Rota tus claves periódicamente
- ✅ Usa Firebase Functions Config para producción
- ✅ Usa `.env` local solo para desarrollo

### ❌ Nunca hagas:

- ❌ NO hardcodees claves en el código
- ❌ NO subas archivos `.env` a Git
- ❌ NO compartas claves en Slack, email, etc.
- ❌ NO uses claves de producción en desarrollo

---

## 🔍 Troubleshooting

### Error: "Firebase CLI not found"

Instala Firebase CLI:
```bash
npm install -g firebase-tools
```

### Error: "Not authenticated"

Inicia sesión en Firebase:
```bash
firebase login
```

### Error: "Unable to send WhatsApp message"

1. Verifica que tus credenciales de Twilio sean correctas
2. Asegúrate de haber activado WhatsApp en Twilio
3. Verifica que el número esté en el formato correcto: `+526311081965`
4. Para desarrollo, usa el [Twilio Sandbox](https://www.twilio.com/docs/whatsapp/sandbox)

### Error: "Stripe payment failed"

1. Verifica que tu Secret Key sea correcta
2. En desarrollo, usa claves de Test (`sk_test_...`)
3. Verifica que tu cuenta de Stripe esté activa

---

## 📚 Recursos Adicionales

- [Firebase Functions Configuration](https://firebase.google.com/docs/functions/config-env)
- [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Firebase Environment Config](https://firebase.google.com/docs/functions/config-env)

---

## 🆘 Soporte

Si tienes problemas con la configuración:

1. Revisa los logs de Firebase Functions:
   ```bash
   firebase functions:log
   ```

2. Verifica la configuración:
   ```bash
   firebase functions:config:get
   ```

3. Prueba las funciones localmente:
   ```bash
   cd functions
   npm run serve
   ```
