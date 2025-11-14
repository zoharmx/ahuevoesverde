# 🔑 Configuración Rápida de Claves API

## Paso 1: Obtén tus Claves

### Twilio (WhatsApp)
1. Crea una cuenta en [Twilio](https://www.twilio.com/try-twilio)
2. Ve al [Dashboard](https://console.twilio.com/)
3. Copia tu **Account SID** y **Auth Token**
4. Activa [WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox)

### Stripe (Pagos)
1. Crea una cuenta en [Stripe](https://dashboard.stripe.com/register)
2. Ve a **Developers → API keys**
3. Copia tu **Secret Key** (usa test key para desarrollo)

## Paso 2: Configura las Claves

### Método Rápido (Recomendado)

```bash
bash scripts/setup-env.sh
```

### Método Manual

```bash
# Twilio
firebase functions:config:set twilio.account_sid="TU_ACCOUNT_SID"
firebase functions:config:set twilio.auth_token="TU_AUTH_TOKEN"

# Stripe
firebase functions:config:set stripe.secret_key="TU_STRIPE_SECRET_KEY"
```

## Paso 3: Verifica

```bash
firebase functions:config:get
```

## Paso 4: Despliega

```bash
firebase deploy --only functions
```

---

Para más detalles, consulta [CONFIGURACION.md](./CONFIGURACION.md)
