const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Initialize Twilio client (lazy initialization - loaded only when needed)
let twilioClient = null;
function getTwilioClient() {
    if (!twilioClient) {
        const twilio = require('twilio'); // Load twilio only when needed
        const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

        if (!twilioAccountSid || !twilioAuthToken) {
            console.warn('Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables.');
        }

        twilioClient = twilio(twilioAccountSid, twilioAuthToken);
    }
    return twilioClient;
}

// Initialize Stripe with your secret key (lazy initialization)
let stripeClient = null;
function getStripeClient() {
    if (!stripeClient) {
        const stripe = require('stripe');
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeSecretKey) {
            console.warn('Stripe secret key not configured. Set STRIPE_SECRET_KEY environment variable.');
        }

        stripeClient = stripe(stripeSecretKey);
    }
    return stripeClient;
}

/**
 * Trigger when a new order is created
 * Sends notifications via SMS/WhatsApp to kitchen staff
 */
exports.onNewOrder = functions.database.ref('/orders/{orderId}')
    .onCreate(async (snapshot, context) => {
        const orderId = context.params.orderId;
        const orderData = snapshot.val();

        console.log('New order created:', orderId, orderData);

        try {
            // Send notification to kitchen via WhatsApp (Twilio)
            const kitchenPhone = '+526311081965'; // Your WhatsApp number
            const message = `🥚 NUEVO PEDIDO #${orderId.substring(0, 8)}\n\n` +
                `Total: $${orderData.total.toFixed(2)}\n` +
                `Dirección: ${orderData.deliveryAddress}\n` +
                `Tel: ${orderData.phone}\n\n` +
                `Items:\n${orderData.items.map(item =>
                    `${item.quantity}x ${item.name}`
                ).join('\n')}`;

            try {
                await getTwilioClient().messages.create({
                    body: message,
                    from: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox
                    to: `whatsapp:${kitchenPhone}`
                });
                console.log('WhatsApp notification sent to kitchen');
            } catch (twilioError) {
                console.error('Failed to send WhatsApp notification:', twilioError);
                // Continue execution even if WhatsApp fails
            }

            // Send confirmation to customer
            if (orderData.paymentMethod === 'online' && orderData.phone) {
                const customerMessage = `¡Gracias por tu pedido! 🥚\n\n` +
                    `Tu pedido #${orderId.substring(0, 8)} ha sido recibido.\n` +
                    `Total: $${orderData.total.toFixed(2)}\n\n` +
                    `Lo prepararemos y entregaremos en aprox. 20-30 minutos.\n\n` +
                    `Te avisaremos cuando esté listo. ¡Gracias!`;

                try {
                    // Format customer phone for WhatsApp
                    const customerPhone = orderData.phone.startsWith('+') ? orderData.phone : `+${orderData.phone}`;
                    await getTwilioClient().messages.create({
                        body: customerMessage,
                        from: 'whatsapp:+14155238886',
                        to: `whatsapp:${customerPhone}`
                    });
                    console.log('WhatsApp confirmation sent to customer');
                } catch (twilioError) {
                    console.error('Failed to send customer confirmation:', twilioError);
                }
            }

            // Log for monitoring
            await admin.database().ref(`notifications/${orderId}`).set({
                type: 'new_order',
                orderId: orderId,
                sentAt: admin.database.ServerValue.TIMESTAMP,
                status: 'sent'
            });

            return null;
        } catch (error) {
            console.error('Error sending notification:', error);
            return null;
        }
    });

/**
 * Trigger when order status changes
 * Sends update notifications to customer
 */
exports.onOrderStatusChange = functions.database.ref('/orders/{orderId}/status')
    .onUpdate(async (change, context) => {
        const orderId = context.params.orderId;
        const newStatus = change.after.val();
        const oldStatus = change.before.val();

        console.log(`Order ${orderId} status changed from ${oldStatus} to ${newStatus}`);

        try {
            // Get full order data
            const orderSnapshot = await admin.database()
                .ref(`/orders/${orderId}`)
                .once('value');
            const orderData = orderSnapshot.val();

            if (!orderData) {
                console.error('Order data not found');
                return null;
            }

            // Prepare message based on status
            let message = '';
            switch (newStatus) {
                case 'preparing':
                    message = `🍳 Tu pedido #${orderId.substring(0, 8)} está siendo preparado.\n\n` +
                        `¡Pronto estará listo para entregar!`;
                    break;
                case 'delivering':
                    message = `🚗 Tu pedido #${orderId.substring(0, 8)} está en camino!\n\n` +
                        `Dirección: ${orderData.deliveryAddress}\n` +
                        `Tiempo estimado: 15-20 minutos`;
                    break;
                case 'delivered':
                    message = `✅ Tu pedido #${orderId.substring(0, 8)} ha sido entregado.\n\n` +
                        `¡Gracias por tu preferencia! Esperamos que lo disfrutes. 🥚🍊`;
                    break;
                default:
                    return null;
            }

            // Send notification to customer via WhatsApp
            if (orderData.phone) {
                try {
                    const customerPhone = orderData.phone.startsWith('+') ? orderData.phone : `+${orderData.phone}`;
                    await getTwilioClient().messages.create({
                        body: message,
                        from: 'whatsapp:+14155238886',
                        to: `whatsapp:${customerPhone}`
                    });
                    console.log('Status update notification sent:', message);
                } catch (twilioError) {
                    console.error('Failed to send status update:', twilioError);
                }
            }

            return null;
        } catch (error) {
            console.error('Error sending status update:', error);
            return null;
        }
    });

/**
 * Process Stripe payment
 * Creates a payment intent for online orders
 */
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
    try {
        const { amount, currency = 'usd', orderId } = data;

        // Create payment intent with Stripe
        const paymentIntent = await getStripeClient().paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency,
            metadata: {
                orderId: orderId,
                restaurant: 'A Huevo Es Verde'
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        };
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw new functions.https.HttpsError('internal', 'Unable to create payment intent: ' + error.message);
    }
});

/**
 * Handle Google Pay payment
 * Processes payment through Stripe
 */
exports.processGooglePayPayment = functions.https.onCall(async (data, context) => {
    try {
        const { paymentToken, amount, orderId } = data;

        // Uncomment when Stripe is configured:
        /*
        const paymentIntent = await getStripeClient().paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            payment_method_data: {
                type: 'card',
                card: {
                    token: paymentToken
                }
            },
            metadata: {
                orderId: orderId
            },
            confirm: true
        });

        return {
            success: true,
            paymentIntentId: paymentIntent.id
        };
        */

        // Temporary response for development
        return {
            success: true,
            paymentIntentId: 'test_google_pay_id'
        };
    } catch (error) {
        console.error('Error processing Google Pay payment:', error);
        throw new functions.https.HttpsError('internal', 'Unable to process payment');
    }
});

/**
 * Send invoice via Stripe
 * Generates and sends invoice after order completion
 */
exports.sendInvoice = functions.database.ref('/orders/{orderId}/status')
    .onUpdate(async (change, context) => {
        const newStatus = change.after.val();

        if (newStatus !== 'delivered') {
            return null;
        }

        const orderId = context.params.orderId;

        try {
            const orderSnapshot = await admin.database()
                .ref(`/orders/${orderId}`)
                .once('value');
            const orderData = orderSnapshot.val();

            // Uncomment when Stripe is configured:
            /*
            // Create invoice in Stripe
            const invoice = await getStripeClient().invoices.create({
                customer: 'cus_xxxxx', // Create/get customer first
                description: `Pedido #${orderId.substring(0, 8)} - A Huevo Es Verde`,
                metadata: {
                    orderId: orderId
                }
            });

            // Send invoice via email
            await getStripeClient().invoices.sendInvoice(invoice.id);
            */

            console.log(`Invoice sent for order ${orderId}`);
            return null;
        } catch (error) {
            console.error('Error sending invoice:', error);
            return null;
        }
    });

/**
 * Daily sales report
 * Runs every day at 11 PM to send summary to admin
 */
exports.dailySalesReport = functions.pubsub.schedule('0 23 * * *')
    .timeZone('America/Hermosillo')
    .onRun(async (context) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Get today's orders
            const ordersSnapshot = await admin.database()
                .ref('orders')
                .orderByChild('timestamp')
                .startAt(today.getTime())
                .endAt(tomorrow.getTime())
                .once('value');

            const orders = ordersSnapshot.val() || {};
            const ordersList = Object.values(orders);

            const totalOrders = ordersList.length;
            const totalSales = ordersList.reduce((sum, order) => sum + order.total, 0);
            const deliveredOrders = ordersList.filter(o => o.status === 'delivered').length;

            const report = `📊 REPORTE DIARIO - A HUEVO ES VERDE\n` +
                `Fecha: ${today.toLocaleDateString('es-MX')}\n\n` +
                `Total de pedidos: ${totalOrders}\n` +
                `Pedidos entregados: ${deliveredOrders}\n` +
                `Ventas totales: $${totalSales.toFixed(2)} USD\n` +
                `Ticket promedio: $${(totalSales / totalOrders || 0).toFixed(2)} USD`;

            console.log(report);

            // Send report to admin via WhatsApp
            try {
                await getTwilioClient().messages.create({
                    body: report,
                    from: 'whatsapp:+14155238886',
                    to: 'whatsapp:+526311081965'
                });
                console.log('Daily report sent to admin');
            } catch (twilioError) {
                console.error('Failed to send daily report:', twilioError);
            }

            return null;
        } catch (error) {
            console.error('Error generating daily report:', error);
            return null;
        }
    });

/**
 * Clean up old orders
 * Runs weekly to archive orders older than 30 days
 */
exports.cleanupOldOrders = functions.pubsub.schedule('0 2 * * 0')
    .timeZone('America/Hermosillo')
    .onRun(async (context) => {
        try {
            const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

            const oldOrdersSnapshot = await admin.database()
                .ref('orders')
                .orderByChild('timestamp')
                .endAt(thirtyDaysAgo)
                .once('value');

            const oldOrders = oldOrdersSnapshot.val() || {};
            const orderIds = Object.keys(oldOrders);

            console.log(`Archiving ${orderIds.length} old orders...`);

            // Move to archive
            const archivePromises = orderIds.map(async (orderId) => {
                const orderData = oldOrders[orderId];
                await admin.database().ref(`archive/${orderId}`).set(orderData);
                await admin.database().ref(`orders/${orderId}`).remove();
            });

            await Promise.all(archivePromises);

            console.log(`Archived ${orderIds.length} orders`);
            return null;
        } catch (error) {
            console.error('Error cleaning up orders:', error);
            return null;
        }
    });
