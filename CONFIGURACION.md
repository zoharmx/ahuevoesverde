# Configuración de A Huevo Es Verde

## Credenciales Configuradas

### Firebase
La aplicación está configurada con Firebase para:
- **Hosting**: Alojamiento de la aplicación web
- **Realtime Database**: Base de datos para pedidos
- **Analytics**: Análisis de uso
- **Functions**: Funciones en la nube (Stripe webhooks)

**Configuración:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA_Gno-Pc8Ve09Ue6_hgeXTCAFVrc2u3yU",
  authDomain: "ahuevoesverde.firebaseapp.com",
  databaseURL: "https://ahuevoesverde-default-rtdb.firebaseio.com",
  projectId: "ahuevoesverde",
  storageBucket: "ahuevoesverde.firebasestorage.app",
  messagingSenderId: "625137246289",
  appId: "1:625137246289:web:260cc0eb9e1377c6d55870",
  measurementId: "G-0ZXZKMH43V"
};
```

### Stripe (Modo de Prueba)
Configurado para pagos en línea:

**Clave Publicable (Client-side):**
```
pk_test_your_stripe_publishable_key_here
```

**Clave Secreta (Server-side):**
```
sk_test_your_stripe_secret_key_here
```

**Webhook URL:**
```
https://us-central1-ahuevoesverde.cloudfunctions.net/ext-firestore-stripe-payments-handleWebhookEvents
```

**Tarjetas de Prueba:**
- **Éxito:** 4242 4242 4242 4242
- **Rechazo:** 4000 0000 0000 0002
- Cualquier CVC de 3 dígitos
- Cualquier fecha futura

### Twilio
Configurado para SMS (opcional):

**Account SID:**
```
your_twilio_account_sid_here
```

**Número Toll-Free:**
```
+1 888 430 6773
```

**Bundle SID:**
```
BU5aec6263c7ea32d26d913c124e844964
```

### WhatsApp
**Número de Contacto:**
```
528115676691
```

## Estructura de Imágenes

Las imágenes de platillos y bebidas están ubicadas en:
```
public/images/
├── ahuevohomelet.png
├── ahuevosonora.png
├── ahuevomexicano.png
├── ahuevoveracruz.png
├── ahuevochilango.png
├── jugodenaranja.png
├── jugodepina.png
├── jugodemelon.png
├── jugoverde.png
└── cafedeolla.png
```

## Despliegue

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login a Firebase
```bash
firebase login
```

### 3. Inicializar el proyecto (si no está inicializado)
```bash
firebase init
```
Selecciona:
- Hosting
- Realtime Database
- Functions

### 4. Desplegar
```bash
# Desplegar todo
firebase deploy

# O desplegar componentes individuales
firebase deploy --only hosting
firebase deploy --only database
firebase deploy --only functions
```

## Configurar Stripe Webhook

1. Ve a tu Dashboard de Stripe: https://dashboard.stripe.com/test/webhooks
2. Clic en "Add endpoint"
3. URL del endpoint:
   ```
   https://us-central1-ahuevoesverde.cloudfunctions.net/ext-firestore-stripe-payments-handleWebhookEvents
   ```
4. Selecciona los eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`

## URLs de la Aplicación

**Sitio Principal:**
```
https://ahuevoesverde.web.app
https://ahuevoesverde.firebaseapp.com
```

**Panel de Cocina:**
```
https://ahuevoesverde.web.app/admin.html
```

## Funcionalidades Implementadas

✅ **Menú Digital**
- Visualización de platillos y bebidas con imágenes
- Filtrado por categoría
- Detalles de cada producto

✅ **Sistema de Pedidos**
- Carrito de compras
- Persistencia en localStorage
- Gestión de cantidades

✅ **Métodos de Pedido**
- Pago en línea con Stripe
- Pedido por WhatsApp

✅ **Panel de Cocina**
- Vista en tiempo real de pedidos
- Actualización de estado de pedidos
- Notificaciones de audio y navegador
- Estadísticas del día

✅ **Integración con Firebase**
- Base de datos en tiempo real
- Hosting configurado
- Analytics activo

## Próximos Pasos

### Para Producción:

1. **Cambiar a claves de producción de Stripe:**
   - Reemplazar `pk_test_...` con `pk_live_...`
   - Reemplazar `sk_test_...` con `sk_live_...`

2. **Configurar autenticación** (opcional):
   - Implementar Firebase Auth
   - Proteger el panel de cocina

3. **Agregar SMS con Twilio** (opcional):
   - Crear función de Firebase para enviar SMS
   - Notificar a clientes del estado del pedido

4. **Optimizar imágenes:**
   - Comprimir imágenes para carga más rápida
   - Implementar lazy loading

5. **Testing:**
   - Probar flujo completo de pedidos
   - Verificar webhooks de Stripe
   - Probar en diferentes dispositivos

## Soporte

Para preguntas o problemas:
- Email: contacto@ahuevoesverde.com
- WhatsApp: +52 631 123 4567

---

**Última actualización:** 2025-01-04
**Versión:** 1.0.0
