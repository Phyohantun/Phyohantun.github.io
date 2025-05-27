const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDirectories = ['images', 'assets/images'];
const outputQuality = 80;

async function optimizeImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    const outputPath = inputPath.replace(ext, `_optimized${ext}`);
    
    try {
        if (ext === '.png') {
            await sharp(inputPath)
                .png({ quality: outputQuality, compressionLevel: 9 })
                .toFile(outputPath);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            await sharp(inputPath)
                .jpeg({ quality: outputQuality })
                .toFile(outputPath);
        }
        
        // Replace original with optimized version
        fs.unlinkSync(inputPath);
        fs.renameSync(outputPath, inputPath);
        
        console.log(`Optimized: ${inputPath}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const ext = path.extname(file).toLowerCase();
        
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            await optimizeImage(filePath);
        }
    }
}

async function main() {
    for (const dir of imageDirectories) {
        await processDirectory(dir);
    }
}

main().catch(console.error); 