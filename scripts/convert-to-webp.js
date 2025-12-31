import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, "../public/asserts/images");

// Get all JPG and PNG files
const imageFiles = fs
  .readdirSync(imagesDir)
  .filter((file) => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file));

console.log("Converting images to WebP format...\n");

async function convertImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputFileName = file.replace(
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i,
      ".webp"
    );
    const outputPath = path.join(imagesDir, outputFileName);

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = newStats.size;
      const reduction = (
        ((originalSize - newSize) / originalSize) *
        100
      ).toFixed(1);

      console.log(`✓ ${file} -> ${outputFileName}`);
      console.log(
        `  Original: ${(originalSize / 1024).toFixed(1)}KB -> WebP: ${(
          newSize / 1024
        ).toFixed(1)}KB (${reduction}% smaller)\n`
      );
    } catch (error) {
      console.error(`✗ Error converting ${file}:`, error.message);
    }
  }

  console.log("\nDone! WebP images created successfully.");
}

convertImages();
