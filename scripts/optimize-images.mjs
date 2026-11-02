// Generates the optimized images used by the app from the originals in assets-src/.
// Run: npm run images   (outputs are committed; the build does not run this)
import { mkdir, stat } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'assets-src'
const OUT = 'src/assets/img'

const jobs = [
  // Hero: two widths, AVIF + WebP fallback.
  ...[720, 1200].flatMap((width) => [
    { input: 'cover.avif', output: `cover-${width}.avif`, width, format: 'avif', options: { quality: 50 } },
    { input: 'cover.avif', output: `cover-${width}.webp`, width, format: 'webp', options: { quality: 70 } },
  ]),
  // Avatars: shown at 48px, 160px covers 3x screens.
  ...['mariana', 'duda', 'marcia', 'andrea'].map((name) => ({
    input: `${name}.jpg`,
    output: `avatar-${name}.webp`,
    width: 160,
    height: 160,
    format: 'webp',
    options: { quality: 75 },
  })),
]

await mkdir(OUT, { recursive: true })
for (const job of jobs) {
  const target = `${OUT}/${job.output}`
  await sharp(`${SRC}/${job.input}`)
    .rotate()
    .resize({ width: job.width, height: job.height, fit: 'cover', position: 'attention', withoutEnlargement: true })
    .toFormat(job.format, job.options)
    .toFile(target)
  const { size } = await stat(target)
  console.log(`${target.padEnd(36)} ${(size / 1024).toFixed(1)} kB`)
}
