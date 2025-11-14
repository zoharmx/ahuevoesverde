#!/bin/bash

# Script para configurar las variables de entorno de Firebase Functions
# Este script te ayuda a configurar las claves de API de forma segura

echo "🔧 Configuración de Variables de Entorno - A Huevo Es Verde"
echo "============================================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para validar entrada
validate_input() {
    if [ -z "$1" ]; then
        echo -e "${RED}Error: El valor no puede estar vacío${NC}"
        return 1
    fi
    return 0
}

echo -e "${YELLOW}Este script configurará las claves de API en Firebase Functions Config${NC}"
echo ""
echo "Necesitarás las siguientes claves:"
echo "  - Twilio Account SID"
echo "  - Twilio Auth Token"
echo "  - Stripe Secret Key"
echo ""

read -p "¿Deseas continuar? (s/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Configuración cancelada."
    exit 0
fi

# Verificar que Firebase CLI esté instalado
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}Error: Firebase CLI no está instalado${NC}"
    echo "Instálalo con: npm install -g firebase-tools"
    exit 1
fi

# Verificar que estemos autenticados en Firebase
if ! firebase projects:list &> /dev/null; then
    echo -e "${RED}Error: No estás autenticado en Firebase${NC}"
    echo "Ejecuta: firebase login"
    exit 1
fi

echo ""
echo -e "${GREEN}=== Configuración de Twilio (WhatsApp) ===${NC}"
echo ""

# Twilio Account SID
while true; do
    read -p "Ingresa tu Twilio Account SID: " TWILIO_SID
    if validate_input "$TWILIO_SID"; then
        break
    fi
done

# Twilio Auth Token
while true; do
    read -sp "Ingresa tu Twilio Auth Token: " TWILIO_TOKEN
    echo ""
    if validate_input "$TWILIO_TOKEN"; then
        break
    fi
done

echo ""
echo -e "${GREEN}=== Configuración de Stripe (Pagos) ===${NC}"
echo ""

# Stripe Secret Key
while true; do
    read -sp "Ingresa tu Stripe Secret Key: " STRIPE_KEY
    echo ""
    if validate_input "$STRIPE_KEY"; then
        break
    fi
done

echo ""
echo -e "${YELLOW}Configurando Firebase Functions Config...${NC}"

# Configurar las variables en Firebase
firebase functions:config:set \
    twilio.account_sid="$TWILIO_SID" \
    twilio.auth_token="$TWILIO_TOKEN" \
    stripe.secret_key="$STRIPE_KEY"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Configuración completada exitosamente!${NC}"
    echo ""
    echo "Para aplicar los cambios:"
    echo "  1. Si estás usando el emulador local, reinícialo"
    echo "  2. Si estás en producción, despliega las funciones:"
    echo "     firebase deploy --only functions"
    echo ""
    echo "Para ver la configuración actual:"
    echo "  firebase functions:config:get"
else
    echo ""
    echo -e "${RED}❌ Error al configurar las variables${NC}"
    exit 1
fi
