// Character image utilities
// Images loaded from Fandom wiki CDN with referrerpolicy="no-referrer" to bypass hotlink protection
// IMPORTANT: All <img> tags using these URLs MUST have referrerPolicy="no-referrer"

const CHAR_IMAGES = {
    'aemeath': 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e4/Aemeath_Splash_Art.png/revision/latest?cb=20260204135601',
    'augusta': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/13/Augusta_Splash_Art.png/revision/latest?cb=20250818064837',
    'brant': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c9/Brant_Splash_Art.png/revision/latest?cb=20250213070907',
    'calcharo': 'https://static.wikia.nocookie.net/wutheringwaves/images/8/8a/Calcharo_Splash_Art.png/revision/latest?cb=20241001061902',
    'camellya': 'https://static.wikia.nocookie.net/wutheringwaves/images/7/7f/Camellya_Splash_Art.png/revision/latest?cb=20241112033310',
    'cantarella': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c2/Cantarella_Splash_Art.png/revision/latest?cb=20250611111109',
    'carlotta': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c0/Carlotta_Splash_Art.png/revision/latest?cb=20250104064448',
    'cartethyia': 'https://static.wikia.nocookie.net/wutheringwaves/images/9/9c/Cartethyia_Splash_Art.png/revision/latest?cb=20250611113557',
    'changli': 'https://static.wikia.nocookie.net/wutheringwaves/images/8/82/Changli_Splash_Art.png/revision/latest?cb=20240628004906',
    'chisa': 'https://static.wikia.nocookie.net/wutheringwaves/images/2/2f/Chisa_Splash_Art.png/revision/latest?cb=20251118042706',
    'ciaccona': 'https://static.wikia.nocookie.net/wutheringwaves/images/7/74/Ciaccona_Splash_Art.png/revision/latest?cb=20250611112502',
    'encore': 'https://static.wikia.nocookie.net/wutheringwaves/images/7/79/Encore_Splash_Art.png/revision/latest?cb=20241001062336',
    'galbrena': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c9/Galbrena_Splash_Art.png/revision/latest?cb=20250926180902',
    'iuno': 'https://static.wikia.nocookie.net/wutheringwaves/images/2/2f/Iuno_Splash_Art.png/revision/latest?cb=20250818065103',
    'jianxin': 'https://static.wikia.nocookie.net/wutheringwaves/images/f/ff/Jianxin_Splash_Art.png/revision/latest?cb=20241001062219',
    'jinhsi': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/17/Jinhsi_Splash_Art.png/revision/latest?cb=20240628004816',
    'jiyan': 'https://static.wikia.nocookie.net/wutheringwaves/images/7/7d/Jiyan_Splash_Art.png/revision/latest?cb=20241001062528',
    'lingyang': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/ad/Lingyang_Splash_Art.png/revision/latest?cb=20241001061635',
    'lupa': 'https://static.wikia.nocookie.net/wutheringwaves/images/e/e1/Lupa_Splash_Art.png/revision/latest?cb=20250616161732',
    'lynae': 'https://static.wikia.nocookie.net/wutheringwaves/images/0/02/Lynae_Splash_Art.png/revision/latest?cb=20251223061321',
    'mornye': 'https://static.wikia.nocookie.net/wutheringwaves/images/5/5b/Mornye_Splash_Art.png/revision/latest?cb=20251223061502',
    'phoebe': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c9/Phoebe_Splash_Art.png/revision/latest?cb=20250213064456',
    'phrolova': 'https://static.wikia.nocookie.net/wutheringwaves/images/8/83/Phrolova_Splash_Art.png/revision/latest?cb=20250719040459',
    'qiuyuan': 'https://static.wikia.nocookie.net/wutheringwaves/images/3/36/Qiuyuan_Splash_Art.png/revision/latest?cb=20250926181050',
    'roccia': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/1d/Roccia_Splash_Art.png/revision/latest?cb=20250104071512',
    'shorekeeper': 'https://static.wikia.nocookie.net/wutheringwaves/images/4/4a/Shorekeeper_Splash_Art.png/revision/latest?cb=20240927030646',
    'verina': 'https://static.wikia.nocookie.net/wutheringwaves/images/b/b1/Verina_Splash_Art.png/revision/latest?cb=20241001062018',
    'xiangli-yao': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a1/Xiangli_Yao_Splash_Art.png/revision/latest?cb=20240813051556',
    'yinlin': 'https://static.wikia.nocookie.net/wutheringwaves/images/5/5f/Yinlin_Splash_Art.png/revision/latest?cb=20241001062635',
    'zani': 'https://static.wikia.nocookie.net/wutheringwaves/images/e/ee/Zani_Splash_Art.png/revision/latest?cb=20250611111902',
    'zhezhi': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/c3/Zhezhi_Splash_Art.png/revision/latest?cb=20240813051642',
}

export function getCharacterIcon(charId) {
    return CHAR_IMAGES[charId] || null
}

export function getCharacterPortrait(charId) {
    return CHAR_IMAGES[charId] || null
}

// Element icons (emoji fallbacks)
export const ELEMENT_ICONS = {
    fusion: '🔥',
    glacio: '❄️',
    aero: '🌪️',
    electro: '⚡',
    spectro: '✨',
    havoc: '💀'
}

// Element colors
export const ELEMENT_COLORS = {
    fusion: '#ff6b4a',
    glacio: '#4fc3f7',
    aero: '#81c784',
    electro: '#ce93d8',
    spectro: '#fff176',
    havoc: '#ef5350'
}
