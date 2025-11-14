/**
 * Script para generar imágenes de platillos usando IA (Replicate API)
 *
 * Requiere:
 * - npm install replicate axios sharp
 * - Configurar REPLICATE_API_TOKEN en .env
 *
 * Uso:
 * node scripts/generate-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Si tienes Replicate instalado, descomenta:
// const Replicate = require('replicate');
// const sharp = require('sharp');

// Configuración
const MENU_FILE = path.join(__dirname, '..', 'menu.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'dishes');

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Prompts optimizados para cada platillo
const imagePrompts = {
    'ahuevo-homelet': {
        prompt: 'Professional food photography of a delicious cheese and ham omelet (homelet) with 3 eggs, melted gouda cheese and ham, served with refried black beans, mashed potatoes, dessert and handmade tortillas on a colorful Mexican plate, bright natural lighting, appetizing presentation, high resolution, 4k, vibrant colors, overhead shot',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'ahuevo-sonora': {
        prompt: 'Professional food photography of 3 fried eggs on 3 soft tortillas, covered with melted cheese and house sauce, served with refried black beans, mashed potatoes, dessert and handmade tortillas, Mexican style breakfast, bright natural lighting, appetizing presentation, high resolution, 4k, vibrant colors, overhead shot',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'ahuevo-mexicano': {
        prompt: 'Professional food photography of scrambled eggs with tomato, onion and chili peppers (huevos a la mexicana), topped with fresh cheese strips, served with refried black beans, mashed potatoes, dessert and handmade tortillas on a colorful Mexican plate, bright natural lighting, appetizing presentation, high resolution, 4k, vibrant colors, overhead shot',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'ahuevo-veracruz': {
        prompt: 'Professional food photography of 3 eggs with premium crispy bacon strips and fresh cheese, served with refried black beans, mashed potatoes, dessert and handmade tortillas on a colorful Mexican plate, bright natural lighting, appetizing presentation, high resolution, 4k, vibrant colors, overhead shot',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'ahuevo-chilango': {
        prompt: 'Professional food photography of scrambled eggs with Toluca chorizo and fresh cheese strips, served with refried black beans, mashed potatoes, dessert and handmade tortillas on a colorful Mexican plate, bright natural lighting, appetizing presentation, high resolution, 4k, vibrant colors, overhead shot',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'agua-naranja': {
        prompt: 'Professional beverage photography of a tall glass of fresh natural orange water (agua fresca de naranja) with ice, orange slices, condensation on the glass, bright natural lighting, refreshing presentation, high resolution, 4k, vibrant orange color, white background',
        negativePrompt: 'blurry, dark, artificial, watermark'
    },
    'agua-melon': {
        prompt: 'Professional beverage photography of a tall glass of fresh natural melon water (agua fresca de melón) with ice, melon pieces, condensation on the glass, bright natural lighting, refreshing presentation, high resolution, 4k, vibrant pale green color, white background',
        negativePrompt: 'blurry, dark, artificial, watermark'
    },
    'agua-pina': {
        prompt: 'Professional beverage photography of a tall glass of fresh natural pineapple water (agua fresca de piña) with ice, pineapple pieces, condensation on the glass, bright natural lighting, refreshing presentation, high resolution, 4k, vibrant yellow color, white background',
        negativePrompt: 'blurry, dark, artificial, watermark'
    },
    'jugo-verde': {
        prompt: 'Professional beverage photography of a tall glass of healthy green juice made with spinach, nopal cactus, celery, pineapple and parsley, bright green color, fresh vegetables visible, natural lighting, healthy presentation, high resolution, 4k, vibrant green color, white background',
        negativePrompt: 'blurry, dark, unappetizing, artificial, watermark'
    },
    'cafe-olla': {
        prompt: 'Professional beverage photography of traditional Mexican pot coffee (café de olla) in a clay mug with hot steaming milk, cinnamon stick, traditional Mexican style, warm lighting, cozy presentation, high resolution, 4k, brown tones, rustic background',
        negativePrompt: 'blurry, dark, artificial, watermark'
    }
};

/**
 * Genera una imagen usando Replicate API
 *
 * Para usar este script, necesitas:
 * 1. Instalar replicate: npm install replicate
 * 2. Obtener API key de https://replicate.com
 * 3. Configurar REPLICATE_API_TOKEN en .env
 */
async function generateImageWithReplicate(slug, promptData) {
    console.log(`Generando imagen para: ${slug}`);

    // Ejemplo de cómo usar Replicate (descomenta cuando tengas la API key):
    /*
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    prompt: promptData.prompt,
                    negative_prompt: promptData.negativePrompt,
                    width: 1024,
                    height: 1024,
                    num_outputs: 1,
                    scheduler: "K_EULER",
                    num_inference_steps: 30,
                    guidance_scale: 7.5
                }
            }
        );

        // Descargar imagen
        const imageUrl = output[0];
        const outputPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

        await downloadImage(imageUrl, outputPath);

        // Optimizar imagen con sharp
        await optimizeImage(outputPath);

        console.log(`✅ Imagen generada: ${slug}.jpg`);
        return outputPath;
    } catch (error) {
        console.error(`❌ Error generando imagen para ${slug}:`, error.message);
        return null;
    }
    */

    // Placeholder: Crear una imagen placeholder para desarrollo
    console.log(`⚠️  Placeholder: Necesitas configurar Replicate API para generar imágenes reales`);
    console.log(`   Prompt: ${promptData.prompt}`);
    return null;
}

/**
 * Descarga una imagen desde una URL
 */
function downloadImage(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (error) => {
            fs.unlink(outputPath, () => {});
            reject(error);
        });
    });
}

/**
 * Optimiza una imagen con sharp
 */
async function optimizeImage(imagePath) {
    // Si tienes sharp instalado, descomenta:
    /*
    const optimizedPath = imagePath.replace('.jpg', '-optimized.jpg');

    await sharp(imagePath)
        .resize(1200, 1200, {
            fit: 'cover',
            position: 'center'
        })
        .jpeg({
            quality: 85,
            progressive: true
        })
        .toFile(optimizedPath);

    // Reemplazar original con optimizada
    fs.unlinkSync(imagePath);
    fs.renameSync(optimizedPath, imagePath);
    */
}

/**
 * Procesa todos los platillos
 */
async function generateAllImages() {
    console.log('🎨 Iniciando generación de imágenes...\n');

    try {
        // Leer menú
        const menuData = JSON.parse(fs.readFileSync(MENU_FILE, 'utf8'));

        // Generar imágenes
        for (const item of menuData) {
            const promptData = imagePrompts[item.slug];

            if (!promptData) {
                console.log(`⚠️  No hay prompt definido para: ${item.slug}`);
                continue;
            }

            await generateImageWithReplicate(item.slug, promptData);

            // Esperar un poco entre solicitudes para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        console.log('\n✅ Proceso completado!');
        console.log('\n📋 INSTRUCCIONES PARA GENERAR IMÁGENES REALES:');
        console.log('   1. Regístrate en https://replicate.com');
        console.log('   2. Obtén tu API key');
        console.log('   3. Crea un archivo .env con: REPLICATE_API_TOKEN=tu_api_key');
        console.log('   4. Instala dependencias: npm install replicate axios sharp');
        console.log('   5. Descomenta el código en generate-images.js');
        console.log('   6. Ejecuta: node scripts/generate-images.js\n');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

/**
 * Alternativa: Usar DALL-E de OpenAI
 */
async function generateWithDallE(slug, promptData) {
    console.log(`Generando con DALL-E: ${slug}`);

    // Requiere: npm install openai
    // const OpenAI = require('openai');
    /*
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: promptData.prompt,
            n: 1,
            size: "1024x1024",
            quality: "hd"
        });

        const imageUrl = response.data[0].url;
        const outputPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

        await downloadImage(imageUrl, outputPath);
        await optimizeImage(outputPath);

        console.log(`✅ Imagen generada con DALL-E: ${slug}.jpg`);
        return outputPath;
    } catch (error) {
        console.error(`❌ Error con DALL-E para ${slug}:`, error.message);
        return null;
    }
    */
}

// Ejecutar
if (require.main === module) {
    generateAllImages();
}

module.exports = {
    generateImageWithReplicate,
    generateWithDallE,
    imagePrompts
};
