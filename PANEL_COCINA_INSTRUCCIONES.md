# 🔐 Panel de Cocina - Instrucciones de Configuración

## 🎉 ¡Panel Desplegado Exitosamente!

**URL del Panel:** https://ahuevoesverde.web.app/admin.html

---

## ⚠️ CONFIGURACIÓN REQUERIDA (Solo 5 minutos)

Para que el panel funcione, necesitas habilitar la autenticación en Firebase:

### 1️⃣ Habilitar Autenticación de Google

1. Ve a la **Consola de Firebase**:
   https://console.firebase.google.com/project/ahuevoesverde/authentication

2. Haz clic en la pestaña **"Sign-in method"** (Método de inicio de sesión)

3. Habilita **Google** como proveedor:
   - Haz clic en "Google"
   - Activa el switch
   - Selecciona tu email de soporte
   - Haz clic en "Guardar"

### 2️⃣ Habilitar Autenticación por Email/Contraseña

1. En la misma página "Sign-in method"

2. Habilita **Email/Password**:
   - Haz clic en "Email/Password"
   - Activa el switch
   - Haz clic en "Guardar"

### 3️⃣ Crear Usuario Administrador

1. Ve a la pestaña **"Users"** (Usuarios)

2. Haz clic en **"Add user"** (Agregar usuario)

3. Crea el usuario admin:
   ```
   Email: admin@ahuevoesverde.com
   Password: [Tu contraseña segura]
   ```

4. Haz clic en "Add user"

### 4️⃣ (Opcional) Agregar Dominios Autorizados

Si quieres usar dominios personalizados:

1. Ve a "Settings" → "Authorized domains"
2. Agrega tu dominio personalizado

---

## 🔒 Reglas de Seguridad Implementadas

Las siguientes reglas de seguridad están ACTIVAS:

### ✅ **Acceso al Panel (admin.html)**
- ✓ Solo usuarios con email: `admin@ahuevoesverde.com`
- ✓ O emails que terminen en: `@ahuevoesverde.com`
- ✗ Todos los demás usuarios: **BLOQUEADOS**

### ✅ **Base de Datos (Firebase Realtime Database)**

| Recurso | Lectura | Escritura |
|---------|---------|-----------|
| `orders` | Solo admin | Solo admin |
| `orders/$orderId` | Público (para crear pedidos) | Público (para crear pedidos) |
| `notifications` | Autenticados | Solo admin |
| `archive` | Solo admin | Solo admin |
| `menu` | Público | Solo admin |
| `inventory` | Solo admin | Solo admin |
| `settings` | Solo admin | Solo admin principal |
| `users/$userId` | Solo el usuario | Solo el usuario |

---

## 🎨 Funcionalidades del Panel

### 📊 **Dashboard Principal**

#### Stats Cards en Tiempo Real:
1. **Pedidos Pendientes** (Naranja) - Nuevos pedidos sin atender
2. **En Preparación** (Azul) - Platillos en la cocina
3. **En Entrega** (Morado) - Pedidos en camino
4. **Completados Hoy** (Verde) - Pedidos entregados

#### Tarjetas de Pedidos:
- **Color por estado** - Identificación visual rápida
- **Timer en vivo** - Tiempo transcurrido desde la orden
- **Información completa**:
  - Items con cantidades
  - Dirección de entrega
  - Teléfono del cliente
  - Total del pedido
- **Botones de acción**:
  - 🔥 **Preparar** - Marca el pedido como "En Preparación"
  - 🚚 **Entregar** - Marca como "En Entrega"
  - ✅ **Completar** - Marca como "Entregado"
  - 🖨️ **Imprimir** - Ticket de cocina

---

### 🖥️ **Pantalla KDS (Kitchen Display System)**

Sistema optimizado para la cocina:

- **Vista de pantalla completa** - Botón para maximizar
- **Tarjetas grandes** - Fuentes enormes para ver desde lejos
- **Solo pedidos activos** - Muestra pending y preparing
- **Colores llamativos** - Gradientes azul/morado
- **Timer prominente** - Tiempo en grande
- **Lista de items clara** - Cantidades y nombres grandes

**Uso recomendado:**
- Coloca una tablet en la cocina
- Abre el panel en modo KDS
- Activa pantalla completa
- Los cocineros ven en tiempo real lo que deben preparar

---

### 📈 **Analíticas**

#### Métricas en Tiempo Real:
1. **Ventas Hoy** - Total en dólares
2. **Ticket Promedio** - Gasto promedio por pedido
3. **Pedidos Hoy** - Cantidad de órdenes
4. **Tiempo Promedio de Preparación** - En minutos

#### Reportes Visuales:
- **Platillos Más Vendidos** - Top 5 productos
- **Ventas por Hora** - Gráfico de barras
- **Tendencias** - Análisis de patrones

---

### ⚙️ **Configuración**

- **Notificaciones de Sonido** - Toggle on/off
- **Usuarios Autorizados** - Lista de accesos
- **Información del Sistema** - Versión y estado

---

## 🎯 Flujo de Trabajo Recomendado

### 1. **Nuevo Pedido Llega**
```
🔔 SONIDO + NOTIFICACIÓN
↓
Aparece en "Pendientes" (Naranja)
↓
Staff revisa items y dirección
```

### 2. **Iniciar Preparación**
```
👨‍🍳 Click en "PREPARAR"
↓
Pasa a "En Preparación" (Azul)
↓
Aparece en pantalla KDS
↓
Cocineros preparan platillos
```

### 3. **Listo para Entregar**
```
✅ Platillos listos
↓
Click en "ENTREGAR"
↓
Pasa a "En Entrega" (Morado)
↓
Repartidor toma el pedido
```

### 4. **Pedido Completado**
```
🚚 Cliente recibe pedido
↓
Click en "COMPLETAR"
↓
Pasa a "Completado" (Verde)
↓
Se registra en analíticas
```

---

## 🔊 Notificaciones y Alertas

### Notificación Sonora:
- Se activa al recibir nuevo pedido
- Se puede desactivar en Configuración
- Útil para no perder pedidos

### Badge de Notificaciones:
- Muestra número de pedidos activos
- Rojo con animación de rebote
- Desaparece cuando no hay pendientes

### Código de Colores del Timer:
- 🟢 **Verde** (0-15 min) - Todo bien
- 🟠 **Naranja** (15-25 min) - Atención
- 🔴 **Rojo pulsante** (>25 min) - ¡URGENTE!

---

## 🖨️ Imprimir Tickets

Click en el botón 🖨️ en cualquier pedido para imprimir:

```
================================
    A HUEVO ES VERDE
    Panel de Cocina
================================
Pedido #abc12345
2025-01-15 10:30 AM
--------------------------------

2x Ahuevo Homelet     - $24.00
1x Jugo Verde         - $6.00
1x Café de Olla       - $4.00

--------------------------------
Total: $34.00
--------------------------------
Dirección: Calle Principal #123
Teléfono: 631-108-1965
--------------------------------
        ¡Gracias!
================================
```

---

## 📱 Acceso desde Móvil

El panel es 100% responsive:

### En Tablet (Recomendado para cocina):
- Vista optimizada con tarjetas grandes
- Botones grandes fáciles de presionar
- Perfecto para pantalla KDS

### En Smartphone:
- Tarjetas apiladas verticalmente
- Menú hamburguesa para tabs
- Ideal para gestión sobre la marcha

---

## 🚨 Troubleshooting

### Problema: "No puedo iniciar sesión"
**Solución:**
1. Verifica que habilitaste Google Sign-In en Firebase
2. Asegúrate de usar un email autorizado
3. Revisa que la autenticación esté activa

### Problema: "No veo los pedidos"
**Solución:**
1. Verifica tu conexión a internet
2. Revisa que las reglas de base de datos estén desplegadas
3. Asegúrate de que hay pedidos en Firebase

### Problema: "No suena la notificación"
**Solución:**
1. Verifica que el toggle está activado en Configuración
2. Revisa permisos del navegador
3. Sube el volumen del dispositivo

### Problema: "Botones no funcionan"
**Solución:**
1. Verifica que eres un usuario autorizado
2. Revisa las reglas de seguridad en Firebase
3. Mira la consola del navegador (F12) para errores

---

## 🎓 Capacitación del Personal

### Para Cocineros:
1. **Solo necesitan ver la pantalla KDS**
2. Enseña a leer el timer (urgencia por color)
3. Explica el flujo: Preparar → Entregar → Completar

### Para Managers:
1. **Acceso completo al dashboard**
2. Revisar analíticas diarias
3. Imprimir tickets cuando sea necesario
4. Gestionar usuarios autorizados

### Para Repartidores:
1. **Vista de "En Entrega"**
2. Ver dirección y teléfono
3. Marcar como "Completado" al entregar

---

## 🔐 Mejores Prácticas de Seguridad

### ✅ **HACER:**
- Cerrar sesión al terminar el turno
- Usar contraseñas fuertes
- No compartir credenciales
- Revisar usuarios autorizados regularmente
- Mantener actualizado el panel

### ❌ **NO HACER:**
- Dejar sesión abierta en computadoras públicas
- Compartir la URL del panel públicamente
- Usar contraseñas simples
- Dar acceso a usuarios no autorizados
- Ignorar alertas de seguridad

---

## 📞 Soporte

Si tienes problemas técnicos:

1. **Revisa la consola del navegador** (F12)
2. **Verifica Firebase Console**:
   - Authentication → Users
   - Realtime Database → Data
   - Realtime Database → Rules

3. **Contacta al desarrollador** con:
   - Screenshot del error
   - Descripción del problema
   - Navegador y dispositivo usado

---

## 🎉 ¡Listo para Usar!

Tu panel de cocina está **100% funcional** y **desplegado**.

**Siguiente paso:**
1. Ve a: https://ahuevoesverde.web.app/admin.html
2. Habilita autenticación en Firebase (5 minutos)
3. Crea el usuario admin
4. ¡Empieza a gestionar pedidos!

---

## 🚀 Funcionalidades Avanzadas (Próximamente)

Ideas para expandir el panel:

1. **Inventario Inteligente**
   - Tracking de ingredientes
   - Alertas de stock bajo
   - Cálculo automático de consumo

2. **Reportes Exportables**
   - PDF de ventas diarias
   - Excel de analíticas mensuales
   - Gráficos personalizados

3. **Integración con Impresora**
   - Impresión automática de tickets
   - Configuración de impresora térmica

4. **Chat Interno**
   - Comunicación cocina ↔ delivery
   - Notas especiales del cliente

5. **Cronómetro Predictivo**
   - ML para predecir tiempos de preparación
   - Optimización de rutas de entrega

---

**Versión del Panel:** 1.0.0
**Fecha de Despliegue:** 2025-01-15
**Desarrollado con:** ❤️ y Claude Code

¡Disfruta tu nuevo panel de cocina profesional! 🍳🥚🎉
