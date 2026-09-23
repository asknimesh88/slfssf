// Resizes source photos into web-ready WebP files in src/assets/img.
// Run with `npm run images` after adding or replacing a photo; output is committed,
// so the Cloudflare build never has to touch the multi-megabyte originals.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DRIVE = path.join(__dirname, '../../drive-download-20260923T115640Z-1-001');
const RAW = path.join(__dirname, '../raw');
const OUT = path.join(__dirname, '../src/assets/img');
const SFF = `${DRIVE}/Community Works/savings for future/images`;
const EC = `${DRIVE}/Executive Committee`;
const NEWS = `${DRIVE}/Research Arm/Newspaper Articles`;

// [source, output name, width, options]
const jobs = [
  [`${RAW}/pexels-charithk-5787501.jpg`, 'hero', 2000],
  [`${RAW}/pexels-charithk-5787501.jpg`, 'hero-sm', 900],
  [`${RAW}/image(5).png`, 'landing-beach', 1400],
  [`${RAW}/Photo-1.-FGD-at-Jaffna-21.jpg`, 'fgd-jaffna', 1000],
  [`${RAW}/Photo-1.-Negombo-FGD1.jpg`, 'fgd-negombo', 1000],
  [`${RAW}/Photo-4.-FGD-with-state-actors-at-Rekawa1.jpg`, 'fgd-rekawa', 1000],
  [`${RAW}/Photo-5.-FGD-with-state-actors-at-Trincomalee1.jpg`, 'fgd-trincomalee', 1000],
  [`${RAW}/medium_Conference-Image_Fishing-for-Life-2022-SACSFA-002.png`, 'sacsfa-2022-poster', 800],
  [`${RAW}/Illuminating-Hidden-Harvests.jpg`, 'hidden-harvests', 800],
  [`${SFF}/_AVU9200.JPG`, 'sff-group', 1800],
  [`${SFF}/_AVU9095.JPG`, 'sff-session-outdoor', 1200],
  [`${SFF}/IMG_0644.JPG`, 'sff-workshop-1', 1200],
  [`${SFF}/IMG_1342.JPG`, 'sff-workshop-2', 1200],
  [`${SFF}/WhatsApp Image 2024-02-11 at 08.53.27.jpeg`, 'sff-scoping', 1200],
  [`${SFF}/WhatsApp Image 2024-07-05 at 08.17.50.jpeg`, 'sff-participants', 1200],
  [`${SFF}/IMG_1317.JPG`, 'pink-fish-lid', 900],
  [`${SFF}/IMG_1323.JPG`, 'pink-fish-products', 1200],
  [`${SFF}/WhatsApp Image 2024-04-04 at 11.02.50 AM.jpeg`, 'pink-fish-banner', 1200],
  [`${DRIVE}/Community Works/Game changing concept Hybrid fishing vessel to combat fuel crisis.jpg`, 'hybrid-vessel-webinar', 900],
  [`${NEWS}/kudawella-Observaer article.png`, 'clip-kudawella', 1200],
  [`${NEWS}/suo-04-06-pg46-kwm-page-001 (1).jpg`, 'clip-lobster-prawn', 2000],
  // Portraits: square crop, face-weighted toward the top of the frame.
  [`${EC}/achini2026.JPG`, 'achini-de-silva', 600, { square: true }],
  [`${EC}/Ruwini Basnayake_Secretary.JPG`, 'ruwini-basnayake', 600, { square: true }],
  [`${EC}/sulochana senevriathe.JPG`, 'sulochana-senevirathne', 600, { square: true }],
  [`${EC}/prof. Yashodha.jpg`, 'yasoda-hirimuthugoda', 600, { square: true }],
  [`${EC}/Dr Ahilan Kadirgamar.jpeg`, 'ahilan-kadirgamar', 600, { square: true }],
  [`${EC}/Yathursha Ulakentheran FSSF.jpg`, 'yathursha-ulakentheran', 600, { square: true }],
  // Partner logos keep PNG so white backgrounds stay crisp.
  [`${RAW}/Logos-1-150x150.jpg`, 'partner-ousl', 300, { png: true, trim: true }],
  [`${RAW}/fao-logo-en-e1685980448270-150x150.jpg`, 'partner-fao', 300, { png: true, trim: true }],
  [`${RAW}/ssf_hub_logo.jpg`, 'partner-ssf-hub', 300, { png: true, trim: true }],
  [`${RAW}/Logos-3-150x150.jpg`, 'partner-nara', 300, { png: true, trim: true }],
  [`${RAW}/Logos-2-150x150.jpg`, 'partner-naqda', 300, { png: true, trim: true }],
  [`${RAW}/1-e1685980335481-150x150.png`, 'partner-iyafa', 300, { png: true, trim: true }],
  [`${RAW}/logo.png`, 'logo', 200, { png: true }],
  [`${RAW}/favicon.png`, 'favicon', 192, { png: true }],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [src, name, width, opt = {}] of jobs) {
    let img = sharp(src).rotate();
    if (opt.trim) img = sharp(await img.trim({ threshold: 20 }).toBuffer()); // drop white margins so logos align
    img = opt.square
      ? img.resize(width, width, { fit: 'cover', position: 'north' })
      : img.resize({ width, withoutEnlargement: true });
    const file = `${OUT}/${name}.${opt.png ? 'png' : 'webp'}`;
    await (opt.png ? img.png({ compressionLevel: 9 }) : img.webp({ quality: 78 })).toFile(file);
    console.log(file.replace(OUT + '/', ''), (fs.statSync(file).size / 1024).toFixed(0) + ' KB');
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
