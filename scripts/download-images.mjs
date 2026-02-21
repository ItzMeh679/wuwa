// Downloads character icon images from wuthering.gg and other public sources
// Run: node scripts/download-images.mjs

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import https from 'https';

const OUT_DIR = 'public/images/characters';
mkdirSync(OUT_DIR, { recursive: true });

// Character ID -> wutheringwaves wiki name mapping
// The WuWa wiki on Fandom uses Special:Redirect/file which follows redirects
const charMap = {
    'jiyan': 'Jiyan',
    'changli': 'Changli',
    'jinhsi': 'Jinhsi',
    'calcharo': 'Calcharo',
    'encore': 'Encore',
    'camellya': 'Camellya',
    'carlotta': 'Carlotta',
    'shorekeeper': 'Shorekeeper',
    'verina': 'Verina',
    'yinlin': 'Yinlin',
    'sanhua': 'Sanhua',
    'mortefi': 'Mortefi',
    'rover-spectro': 'Rover_(Spectro)',
    'rover-havoc': 'Rover_(Havoc)',
    'rover-aero': 'Rover_(Aero)',
    'aalto': 'Aalto',
    'baizhi': 'Baizhi',
    'chixia': 'Chixia',
    'danjin': 'Danjin',
    'jianxin': 'Jianxin',
    'lingyang': 'Lingyang',
    'yangyang': 'Yangyang',
    'yuanwu': 'Yuanwu',
    'taoqi': 'Taoqi',
    'xiangli-yao': 'Xiangli_Yao',
    'zhezhi': 'Zhezhi',
    'lumi': 'Lumi',
    'youhu': 'Youhu',
    'brant': 'Brant',
    'roccia': 'Roccia',
    'phoebe': 'Phoebe',
    'cantarella': 'Cantarella',
    'cartethyia': 'Cartethyia',
    'ciaccona': 'Ciaccona',
    'iuno': 'Iuno',
    'buling': 'Buling',
    'zani': 'Zani',
    'lupa': 'Lupa',
    'galbrena': 'Galbrena',
    'chisa': 'Chisa',
    'aemeath': 'Aemeath',
    'augusta': 'Augusta',
    'lynae': 'Lynae',
    'mornye': 'Mornye',
    'phrolova': 'Phrolova',
    'qiuyuan': 'Qiuyuan',
};

function download(url) {
    return new Promise((resolve, reject) => {
        const doRequest = (currentUrl, redirectCount = 0) => {
            if (redirectCount > 10) return reject(new Error('Too many redirects'));
            const parsedUrl = new URL(currentUrl);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname + parsedUrl.search,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                }
            };
            https.get(options, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    let redirectUrl = res.headers.location;
                    if (redirectUrl.startsWith('/')) {
                        redirectUrl = `https://${parsedUrl.hostname}${redirectUrl}`;
                    }
                    res.resume();
                    return doRequest(redirectUrl, redirectCount + 1);
                }
                if (res.statusCode !== 200) {
                    res.resume();
                    return reject(new Error(`HTTP ${res.statusCode}`));
                }
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => resolve(Buffer.concat(chunks)));
                res.on('error', reject);
            }).on('error', reject);
        };
        doRequest(url);
    });
}

async function main() {
    let success = 0, failed = 0;
    const failedList = [];

    for (const [id, wikiName] of Object.entries(charMap)) {
        const destIcon = join(OUT_DIR, `${id}-icon.webp`);

        if (existsSync(destIcon)) {
            console.log(`  ⏭ ${id}`);
            success++;
            continue;
        }

        // Try multiple naming patterns from the Fandom wiki
        const fileNames = [
            `Resonator_${wikiName.replace(/[()]/g, '')}_Icon.png`,
            `${wikiName.replace(/[()]/g, '')}_Icon.png`,
            `Resonator_${wikiName}_Icon.png`,
            `${wikiName}_Icon.png`,
            `Icon_${wikiName}.png`,
            `T_IconRole_${wikiName}_UI.png`,
        ];

        let downloaded = false;
        for (const fileName of fileNames) {
            const url = `https://wuthering-waves.fandom.com/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
            try {
                const buf = await download(url);
                // Check if we got actual image data (not HTML error page)
                if (buf.length > 500 && !buf.toString('utf8', 0, 50).includes('<!DOCTYPE')) {
                    writeFileSync(destIcon, buf);
                    console.log(`  ✓ ${id} (${(buf.length / 1024).toFixed(1)}KB) via ${fileName}`);
                    success++;
                    downloaded = true;
                    break;
                }
            } catch (e) {
                // try next
            }
            await new Promise(r => setTimeout(r, 100));
        }

        if (!downloaded) {
            console.log(`  ✗ ${id}`);
            failed++;
            failedList.push(id);
        }

        await new Promise(r => setTimeout(r, 300));
    }

    console.log(`\n✅ ${success} downloaded, ❌ ${failed} failed`);
    if (failedList.length > 0) {
        console.log(`Failed: ${failedList.join(', ')}`);
    }
}

main().catch(console.error);
