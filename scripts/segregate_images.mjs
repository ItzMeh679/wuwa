import fs from 'fs';

async function main() {
    console.log('Loading IMAGE_MAP...');
    const { IMAGE_MAP } = await import('../src/utils/image_map.js');

    // 1. Gather all character names
    const charsRaw = JSON.parse(fs.readFileSync('src/data/characters.json', 'utf8'));
    const charNames = charsRaw.map(c => c.name);

    // 2. Gather all echo names
    let echoNames = [];
    try {
        const echoesRaw = JSON.parse(fs.readFileSync('src/data/echoes.json', 'utf8'));
        if (Array.isArray(echoesRaw)) {
            echoNames = echoesRaw.map(e => e.name || e.Echo);
        } else {
            echoNames = Object.keys(echoesRaw);
        }
    } catch (e) {
        console.warn('Could not load echoes.json', e.message);
    }

    // 3. Gather all weapon names
    let weaponNames = [];
    try {
        const weaponsRaw = JSON.parse(fs.readFileSync('src/data/weapons.json', 'utf8'));
        if (Array.isArray(weaponsRaw)) {
            weaponNames = weaponsRaw.map(w => w.name || w.w || w.Weapon);
        } else {
            // It might be grouped by weapon type
            for (const type of Object.keys(weaponsRaw)) {
                if (Array.isArray(weaponsRaw[type])) {
                    weaponsRaw[type].forEach(w => {
                        if (w.name) weaponNames.push(w.name);
                    });
                }
            }
        }
    } catch (e) {
        console.warn('Could not load weapons.json', e.message);
    }

    // Prepare structure
    const grouped = {
        characters: {},
        echoes: {},
        weapons: {},
        other: {}
    };

    // Helper to normalize names to match keys format
    const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');

    // Create sets of normalized names for matching
    const charSet = charNames.map(n => ({ original: n, norm: normalize(n) }));
    const echoSet = echoNames.map(n => ({ original: n, norm: normalize(n) }));
    const weaponSet = weaponNames.map(n => ({ original: n, norm: normalize(n) }));

    const weaponTypes = ['broadblade', 'sword', 'pistols', 'gauntlets', 'rectifier'];

    console.log(`Processing ${Object.keys(IMAGE_MAP).length} images...`);

    for (const [key, url] of Object.entries(IMAGE_MAP)) {
        let matched = false;

        // Try Characters
        for (const c of charSet) {
            if (key.includes(c.norm)) {
                if (!grouped.characters[c.original]) grouped.characters[c.original] = {};
                grouped.characters[c.original][key] = url;
                matched = true;
                break;
            }
        }
        if (matched) continue;

        // Try Echoes
        for (const e of echoSet) {
            if (key.includes(e.norm)) {
                if (!grouped.echoes[e.original]) grouped.echoes[e.original] = {};
                grouped.echoes[e.original][key] = url;
                matched = true;
                break;
            }
        }
        if (matched) continue;

        // Try Weapons
        for (const w of weaponSet) {
            if (key.includes(w.norm)) {
                if (!grouped.weapons[w.original]) grouped.weapons[w.original] = {};
                grouped.weapons[w.original][key] = url;
                matched = true;
                break;
            }
        }
        if (matched) continue;

        // Try generic weapon types
        for (const wt of weaponTypes) {
            if (key.includes(wt)) {
                if (!grouped.weapons[wt]) grouped.weapons[wt] = {};
                grouped.weapons[wt][key] = url;
                matched = true;
                break;
            }
        }
        if (matched) continue;

        // If no match, place in other
        grouped.other[key] = url;
    }

    const outputFilePath = 'src/utils/categorized_images.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(grouped, null, 2));

    console.log(`Successfully categorized images into ${outputFilePath}`);
    console.log(`- Characters: ${Object.keys(grouped.characters).length}`);
    console.log(`- Echoes: ${Object.keys(grouped.echoes).length}`);
    console.log(`- Weapons: ${Object.keys(grouped.weapons).length}`);
    console.log(`- Uncategorized (Other): ${Object.keys(grouped.other).length}`);
}

main().catch(console.error);
