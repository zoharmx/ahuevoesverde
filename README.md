# 🥚 A Huevo Es Verde

**Restaurante virtual de almuerzos y jugos en Nogales, Sonora**

Una aplicación web moderna con sistema de pedidos en línea, especializada en servicio a domicilio para la zona fronteriza de Nogales, con enfoque especial en entregas a la aduana.

![A Huevo Es Verde](./images/6f694ae6-8898-4889-a769-82766dbf3725.png)

## 🌟 Características

### Para Clientes
- ✅ **Menú Digital Interactivo** - 5 platillos exclusivos de huevos + bebidas naturales
- 🛒 **Carrito de Compras** - Gestión fácil e intuitiva de pedidos
- 💳 **Pagos en Línea** - Integración con Stripe y Google Pay
- 📱 **Pedidos por WhatsApp** - Opción alternativa para ordenar
- 🚚 **Entrega Rápida** - Especializado en entregas a la aduana (~20 min)
- 📍 **Seguimiento de Pedidos** - Notificaciones en tiempo real
- 📱 **PWA** - Instala la app en tu dispositivo
- 🌐 **Responsive** - Optimizado para móviles y desktop

### Para Cocina/Admin
- 📊 **Panel de Administración** - Gestión de pedidos en tiempo real
- 🔔 **Notificaciones Automáticas** - Alertas sonoras y visuales
- 📈 **Dashboard** - Estadísticas y reportes
- 🔄 **Actualización de Estados** - Seguimiento del proceso de cada pedido
- 📞 **Contacto Directo** - WhatsApp con clientes desde el panel

### Tecnologías Avanzadas
- 🔥 **Firebase Realtime Database** - Sincronización en tiempo real
- ⚡ **Firebase Functions** - Automatización de procesos
- 🎨 **Tailwind CSS** - Diseño moderno y responsivo
- 🤖 **IA para Imágenes** - Generación de fotos de platillos
- 💬 **Twilio** - Notificaciones SMS/WhatsApp
- 💰 **Stripe** - Procesamiento de pagos seguro

---

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Deployment](#-deployment)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Menú](#-menú)
- [Firebase Functions](#-firebase-functions)
- [Generación de Imágenes](#-generación-de-imágenes)
- [Contribuir](#-contribuir)

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de Firebase
- Cuenta de Stripe (opcional, para pagos)
- Cuenta de Twilio (opcional, para notificaciones)
- Cuenta de Replicate o OpenAI (opcional, para generar imágenes)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ahuevoesverde.git
   cd ahuevoesverde
   ```

2. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login en Firebase**
   ```bash
   firebase login
   ```

4. **Inicializar Firebase**
   ```bash
   firebase init
   ```
   Selecciona:
   - ✅ Realtime Database
   - ✅ Functions
   - ✅ Hosting

5. **Instalar dependencias de Functions**
   ```bash
   cd functions
   npm install
   cd ..
   ```

---

## ⚙️ Configuración

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto o usa el existente: `ahuevoesverde`
3. Habilita Realtime Database
4. Copia la configuración de Firebase

### 2. Configurar Variables de Entorno

✅ **¡Las credenciales ya están configuradas!**

El archivo `.env.example` ya incluye todas las credenciales necesarias:

- ✅ **Firebase**: Configuración completa del proyecto
- ✅ **Stripe**: Claves de prueba (test mode) listas para usar
- ✅ **Twilio**: Account SID y número configurados
- ✅ **WhatsApp**: Número de contacto activo

**Nota:** Las imágenes de platillos ya están incluidas en `public/images/`

Para personalizar las credenciales, copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

### 3. Configurar Firebase Functions

```bash
cd functions
firebase functions:config:set \
  stripe.secret_key="sk_test_tu_clave" \
  twilio.account_sid="tu_sid" \
  twilio.auth_token="tu_token" \
  twilio.phone_number="+1234567890"
```

### 4. Actualizar Reglas de Realtime Database

El archivo `database.rules.json` ya está configurado. Deploy:

```bash
firebase deploy --only database
```

---

## 💻 Uso

### Desarrollo Local

1. **Servir la aplicación localmente**
   ```bash
   firebase serve
   ```

2. **Abrir en el navegador**
   ```
   http://localhost:5000
   ```

3. **Panel de Administración (Cocina)**
   ```
   http://localhost:5000/admin.html
   ```

### Probar Firebase Functions Localmente

```bash
cd functions
npm run serve
```

---

## 🌐 Deployment

### Deploy Completo

```bash
firebase deploy
```

### Deploy Selectivo

```bash
# Solo hosting
firebase deploy --only hosting

# Solo functions
firebase deploy --only functions

# Solo database rules
firebase deploy --only database
```

### URL de Producción

```
https://ahuevoesverde.web.app
```

---

## 📁 Estructura del Proyecto

```
ahuevoesverde/
├── public/                      # Archivos públicos
│   ├── index.html              # Aplicación principal (clientes)
│   ├── admin.html              # Panel de administración (cocina)
│   ├── manifest.json           # PWA manifest
│   ├── menu.json               # Datos del menú
│   └── images/                 # Imágenes
│       ├── 6f694ae6-...png    # Logo principal
│       └── dishes/             # Imágenes de platillos
├── functions/                   # Firebase Functions
│   ├── index.js                # Functions principales
│   └── package.json            # Dependencias
├── scripts/                     # Scripts útiles
│   └── generate-images.js      # Generación de imágenes con IA
├── images/                      # Imágenes fuente
│   └── 6f694ae6-...png        # Logo original
├── firebase.json               # Configuración de Firebase
├── database.rules.json         # Reglas de Realtime Database
├── menu.json                   # Datos del menú (fuente)
├── .env.example                # Ejemplo de variables de entorno
└── README.md                   # Este archivo
```

---

## 🍳 Menú

### Platillos (todos incluyen frijol negro refrito, puré, postre y tortillas hechas a mano)

1. **Ahuevo Homelet** - $12.00
   - 3 huevos con queso gouda y jamón

2. **Ahuevo Sonora** - $13.00
   - 3 huevos sobre tortillas blandas gratinados con salsa de la casa

3. **Ahuevo Mexicano** - $11.00
   - 3 huevos con tomate, cebolla, chile y queso fresco

4. **Ahuevo Veracruz** - $13.00
   - 3 huevos con tocino premium y queso fresco

5. **Ahuevo Chilango** - $12.00
   - 3 huevos con chorizo de Toluca y queso fresco

### Bebidas

- **Agua de Naranja** - $4.00
- **Agua de Melón** - $4.00
- **Agua de Piña** - $4.00
- **Jugo Verde** - $6.00 (espinaca, nopal, apio, piña, perejil)
- **Café de Olla** - $4.00 (con leche caliente)

---

## 🔥 Firebase Functions

### Functions Disponibles

1. **`onNewOrder`** - Trigger cuando se crea un nuevo pedido
   - Envía notificación a la cocina vía WhatsApp/SMS
   - Envía confirmación al cliente

2. **`onOrderStatusChange`** - Trigger cuando cambia el estado del pedido
   - Notifica al cliente sobre el progreso

3. **`createPaymentIntent`** - Callable function para Stripe
   - Crea intención de pago para checkout

4. **`processGooglePayPayment`** - Callable function para Google Pay
   - Procesa pagos de Google Pay

5. **`sendInvoice`** - Trigger al completar pedido
   - Genera y envía factura vía Stripe

6. **`dailySalesReport`** - Scheduled function (11 PM diario)
   - Genera reporte de ventas diarias

7. **`cleanupOldOrders`** - Scheduled function (semanal)
   - Archiva pedidos antiguos (>30 días)

### Deploy Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

---

## 🎨 Generación de Imágenes

El proyecto incluye un script para generar imágenes de platillos usando IA.

### Opción 1: Replicate (SDXL)

1. **Obtener API Key**
   - Regístrate en [Replicate](https://replicate.com)
   - Copia tu API key

2. **Configurar**
   ```bash
   npm install replicate sharp
   ```

3. **Generar Imágenes**
   ```bash
   node scripts/generate-images.js
   ```

### Opción 2: DALL-E (OpenAI)

1. **Configurar**
   ```bash
   npm install openai
   ```

2. **Actualizar script**
   - Descomenta la función `generateWithDallE` en el script

3. **Ejecutar**
   ```bash
   node scripts/generate-images.js
   ```

### Prompts Incluidos

El script incluye prompts optimizados para cada platillo y bebida, diseñados para generar imágenes profesionales y apetitosas.

---

## 🔒 Seguridad

### Reglas de Firebase Realtime Database

```json
{
  "rules": {
    "orders": {
      ".read": true,
      ".write": true
    }
  }
}
```

**⚠️ IMPORTANTE:** En producción, debes implementar autenticación:

```json
{
  "rules": {
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Configurar Stripe

1. Obtén tus claves en [Stripe Dashboard](https://dashboard.stripe.com)
2. Actualiza `public/index.html` con tu publishable key:
   ```javascript
   stripe = Stripe('pk_live_tu_clave_real');
   ```

---

## 📱 PWA (Progressive Web App)

La aplicación es una PWA completa que puede instalarse en dispositivos móviles:

### Características PWA
- ✅ Manifest configurado
- ✅ Iconos en múltiples tamaños
- ✅ Instalable en iOS y Android
- ✅ Funciona offline (con Service Worker, próximamente)

### Instalar en Móvil

**iOS:**
1. Abre Safari
2. Toca el botón de compartir
3. Selecciona "Agregar a pantalla de inicio"

**Android:**
1. Abre Chrome
2. Toca el menú (⋮)
3. Selecciona "Instalar app"

---

## 🎯 Roadmap

### Fase 1 - ✅ Completado
- [x] Aplicación web principal
- [x] Sistema de carrito de compras
- [x] Integración con Firebase
- [x] Panel de administración
- [x] Firebase Functions básicas
- [x] PWA Manifest

### Fase 2 - ✅ Completado
- [x] Integrar Stripe completamente (configurado con claves de prueba)
- [x] Configurar credenciales de Twilio (listo para activar)
- [x] Agregar imágenes reales de platillos
- [ ] Sistema de autenticación (opcional)
- [ ] Service Worker para offline (opcional)

### Fase 3 - 📋 Planeado
- [ ] Sistema de tracking GPS en tiempo real
- [ ] Ratings y reseñas
- [ ] Programa de lealtad
- [ ] Panel de reportes avanzados
- [ ] Integración con POS
- [ ] App móvil nativa (React Native)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Contacto

**A Huevo Es Verde**
- 📍 Acacia Frondosa, Nogales, Sonora C.P. 84093
- 📱 WhatsApp: +52 811 567 6691
- 📧 Email: info@ahuevoesverde.com
- 🌐 Web: https://ahuevoesverde.web.app

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- Firebase por la infraestructura en tiempo real
- Tailwind CSS por el framework de diseño
- Font Awesome por los iconos
- Google Fonts por las tipografías
- Stripe por el procesamiento de pagos
- Twilio por las notificaciones

---

## 🎉 ¡Gracias!

**A Huevo Es Verde** - Almuerzos y jugos naturales en Nogales, Sonora 🥚🍊

*¿Tienes hambre? ¡Ordena ahora en [ahuevoesverde.web.app](https://ahuevoesverde.web.app)!*
