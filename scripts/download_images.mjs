import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES = [
  // hero-terrace.jpg already generated & copied!
  { file: 'about-hallway.jpg', id: 'photo-1600210492486-724fe5c67fb0', w: 2400, h: 1030 },
  { file: 'project-01-livingroom.jpg', id: 'photo-1600607687939-ce8a6c25118c', w: 1600, h: 1200 },
  { file: 'project-02-riverview.jpg', id: 'photo-1600566753190-17f0baa2a6c3', w: 1600, h: 1200 },
  { file: 'project-03-lounge.jpg', id: 'photo-1616486338812-3dadae4b4ace', w: 1600, h: 1200 },
  { file: 'why-fireplace.jpg', id: 'photo-1600596542815-ffad4c1539a9', w: 2400, h: 900 },
  { file: 'why-01-reading-nook.jpg', id: 'photo-1586023492125-27b2c045efd7', w: 1200, h: 1500 },
  { file: 'why-02-sculpted-lounge.jpg', id: 'photo-1616046229478-9901c5536a45', w: 1200, h: 1500 },
  { file: 'why-03-dining.jpg', id: 'photo-1617806118233-18e1de247200', w: 1200, h: 1500 },
  { file: 'service-01-main.jpg', id: 'photo-1600607687920-4e2a09cf159d', w: 1200, h: 1500 },
  { file: 'service-01-detail.jpg', id: 'photo-1600585154340-be6161a56a0c', w: 1400, h: 700 },
  { file: 'service-02-main.jpg', id: 'photo-1590381105924-c72589b9ef3f', w: 1200, h: 1500 },
  { file: 'service-02-detail.jpg', id: 'photo-1497366216548-37526070297c', w: 1400, h: 700 },
  { file: 'service-03-main.jpg', id: 'photo-1513694203232-719a280e022f', w: 1200, h: 1500 },
  { file: 'service-03-detail.jpg', id: 'photo-1600566752355-35792bedcfea', w: 1400, h: 700 },
  { file: 'service-04-main.jpg', id: 'photo-1538688525198-9b88f6f53126', w: 1200, h: 1500 },
  { file: 'service-04-detail.jpg', id: 'photo-1507089947368-19c1da9775ae', w: 1400, h: 700 },
  { file: 'process-intro.jpg', id: 'photo-1600585152220-90363fe7e115', w: 1200, h: 1400 },
  { file: 'process-office.jpg', id: 'photo-1524758631624-e2822e304c36', w: 1200, h: 1600 },
  { file: 'team-01.jpg', id: 'photo-1507003211169-0a1dd7228f2d', w: 900, h: 1200 },
  { file: 'team-02.jpg', id: 'photo-1573496359142-b8d87734a5a2', w: 900, h: 1200 },
  { file: 'team-03.jpg', id: 'photo-1580489944761-15a19d654956', w: 900, h: 1200 },
  { file: 'team-04.jpg', id: 'photo-1534528741775-53994a69daeb', w: 900, h: 1200 },
  { file: 'team-05.jpg', id: 'photo-1567532939604-b6b5b0db2604', w: 900, h: 1200 },
  { file: 'team-06.jpg', id: 'photo-1500648767791-00dcc994a43e', w: 900, h: 1200 },
  { file: 'testimonial-01-bg.jpg', id: 'photo-1600607687644-c7171b42498f', w: 2400, h: 1050 },
  { file: 'testimonial-02-bg.jpg', id: 'photo-1582719478250-c89cae4dc85b', w: 2400, h: 1050 },
  { file: 'testimonial-03-bg.jpg', id: 'photo-1545324418-cc1a3fa10c00', w: 2400, h: 1050 },
  { file: 'avatar-01.jpg', id: 'photo-1544005313-94ddf0286df2', w: 300, h: 300 },
  { file: 'avatar-02.jpg', id: 'photo-1506794778202-cad84cf45f1d', w: 300, h: 300 },
  { file: 'avatar-03.jpg', id: 'photo-1517841905240-472988babdf9', w: 300, h: 300 },
  { file: 'journal-01.jpg', id: 'photo-1618221195710-dd6b41faaea6', w: 1600, h: 1200 },
  { file: 'journal-02.jpg', id: 'photo-1616594039964-ae9021a400a0', w: 1600, h: 1200 },
  { file: 'faq-nook.jpg', id: 'photo-1598928506311-c55ded91a20c', w: 1000, h: 1250 },
  { file: 'cta-dark-interior.jpg', id: 'photo-1618219908412-a29a1bb7b86e', w: 2400, h: 1300 },
  { file: 'footer-lounge.jpg', id: 'photo-1600585154340-be6161a56a0c', w: 2400, h: 900 }
];

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${IMAGES.length} images...`);
  for (const item of IMAGES) {
    const dest = path.join(targetDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Skipping already present: ${item.file}`);
      continue;
    }
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=${item.w}&h=${item.h}&q=85`;
    try {
      await download(url, dest);
      console.log(`Downloaded: ${item.file} (${item.w}x${item.h})`);
    } catch (err) {
      console.error(`Error downloading ${item.file}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

run();
