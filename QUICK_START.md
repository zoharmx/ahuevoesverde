# 🚀 Guía Rápida de Inicio - A Huevo Es Verde

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias

```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Instalar dependencias de Functions
cd functions
npm install
cd ..
```

### 2. Configurar Firebase

```bash
# Login en Firebase
firebase login

# Verificar que estás en el proyecto correcto
firebase use ahuevoesverde
```

### 3. Desplegar la Aplicación

```bash
# Deploy todo
firebase deploy
```

¡Listo! Tu aplicación estará en: **https://ahuevoesverde.web.app**

---

## 🎯 Accesos Rápidos

### URLs
- **App Principal (Clientes):** https://ahuevoesverde.web.app
- **Panel de Cocina:** https://ahuevoesverde.web.app/admin.html
- **Firebase Console:** https://console.firebase.google.com/project/ahuevoesverde

### Desarrollo Local

```bash
# Servir localmente
firebase serve

# Abrir en navegador
# App: http://localhost:5000
# Admin: http://localhost:5000/admin.html
```

---

## 📱 Probar la Aplicación

### Como Cliente

1. Abre https://ahuevoesverde.web.app
2. Navega por el menú
3. Agrega platillos al carrito
4. Ingresa dirección y teléfono
5. Elige método de pago:
   - **Pagar en Línea** (Stripe - requiere configuración)
   - **Ordenar por WhatsApp** (funciona inmediatamente)

### Como Cocina/Admin

1. Abre https://ahuevoesverde.web.app/admin.html
2. Verás los pedidos en tiempo real
3. Actualiza el estado de los pedidos
4. Contacta clientes directamente

---

## ⚙️ Configuraciones Opcionales (pero recomendadas)

### 1. Stripe (Pagos en Línea)

```bash
# 1. Obtén tus claves en: https://dashboard.stripe.com
# 2. Actualiza public/index.html línea 692:
stripe = Stripe('tu_publishable_key_aqui');

# 3. Configura Functions:
firebase functions:config:set stripe.secret_key="tu_secret_key"
firebase deploy --only functions
```

### 2. Twilio (Notificaciones WhatsApp/SMS)

```bash
# 1. Obtén credenciales en: https://www.twilio.com
# 2. Configura:
firebase functions:config:set \
  twilio.account_sid="tu_sid" \
  twilio.auth_token="tu_token" \
  twilio.phone_number="+1234567890"

# 3. Descomenta código en functions/index.js
# 4. Deploy:
firebase deploy --only functions
```

### 3. Generar Imágenes con IA

```bash
# Opción 1: Replicate (SDXL)
# 1. Regístrate en: https://replicate.com
# 2. Copia API key
# 3. Crea archivo .env:
echo "REPLICATE_API_TOKEN=tu_token" > .env

# 4. Instala dependencias:
npm install replicate sharp

# 5. Descomenta código en scripts/generate-images.js
# 6. Genera imágenes:
npm run generate-images

# Opción 2: DALL-E (OpenAI)
# Similar pero con: npm install openai
```

---

## 🔥 Comandos Útiles

```bash
# Ver logs de Functions
firebase functions:log

# Deploy solo hosting (más rápido)
firebase deploy --only hosting

# Deploy solo functions
firebase deploy --only functions

# Ver estadísticas
firebase hosting:channel:list

# Abrir Firebase Console
firebase open
```

---

## 🐛 Solución de Problemas

### Error: "Firebase not initialized"

```bash
# Verifica que el proyecto exista
firebase projects:list

# Usa el proyecto correcto
firebase use ahuevoesverde
```

### Error: "Permission denied" en Realtime Database

```bash
# Actualiza las reglas
firebase deploy --only database
```

### Pedidos no aparecen en Admin

1. Abre la consola del navegador (F12)
2. Verifica errores de Firebase
3. Asegúrate de que las reglas de database estén actualizadas

### WhatsApp no funciona

- El número debe incluir código de país: `+526311234567`
- Formato correcto: `https://wa.me/526311234567`

---

## 📊 Monitoreo

### Ver Pedidos en Firebase

1. Abre [Firebase Console](https://console.firebase.google.com/project/ahuevoesverde/database)
2. Ve a Realtime Database
3. Expande el nodo `/orders`

### Ver Analytics

1. Ve a Analytics en Firebase Console
2. Revisa usuarios activos, páginas más visitadas, etc.

---

## 🎨 Personalización

### Cambiar Colores

Edita `public/index.html` línea 38-44:

```javascript
colors: {
    'egg-yellow': '#TU_COLOR',
    'fresh-green': '#TU_COLOR',
    'sky-blue': '#TU_COLOR',
    // ...
}
```

### Modificar Menú

1. Edita `menu.json`
2. Copia a `public/menu.json`
3. Deploy: `firebase deploy --only hosting`

### Cambiar Número de WhatsApp

Busca y reemplaza `526311234567` en:
- `public/index.html`
- `public/admin.html`
- `functions/index.js`

---

## 📱 Instalar como App

### iOS

1. Abre en Safari
2. Toca botón de compartir
3. "Agregar a pantalla de inicio"

### Android

1. Abre en Chrome
2. Menú (⋮)
3. "Instalar app"

---

## ✅ Checklist Pre-Producción

- [ ] Firebase configurado correctamente
- [ ] Stripe integrado (si usas pagos en línea)
- [ ] Twilio configurado (para notificaciones)
- [ ] Número de WhatsApp actualizado
- [ ] Reglas de database configuradas
- [ ] Imágenes de platillos generadas
- [ ] Probado en móvil y desktop
- [ ] Panel de admin funciona
- [ ] Notificaciones funcionan

---

## 🆘 Soporte

**¿Necesitas ayuda?**

- 📖 Documentación completa: Ver `README.md`
- 🔥 Firebase Docs: https://firebase.google.com/docs
- 💳 Stripe Docs: https://stripe.com/docs
- 📱 Twilio Docs: https://www.twilio.com/docs

---

## 🎉 ¡Todo Listo!

Tu aplicación **A Huevo Es Verde** está lista para recibir pedidos.

**Próximos pasos:**

1. Comparte el enlace con tus clientes
2. Capacita al personal de cocina con el panel de admin
3. Monitorea los primeros pedidos
4. Configura las integraciones adicionales (Stripe, Twilio)
5. Genera imágenes profesionales de los platillos

**¡Mucho éxito! 🥚🍊**
