// Character image utilities
// Images loaded from Fandom wiki CDN with referrerpolicy="no-referrer" to bypass hotlink protection

import { IMAGE_MAP, searchImages as searchImageMap } from './image_map.js'

export function getCharacterIcon(charId) {
    if (!charId) return null;
    const q = charId.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const direct = IMAGE_MAP[q + '_icon'];
    if (direct) return direct;

    const matches = searchImageMap(q);
    const iconMatch = matches.find(m => m.key.includes('icon'));
    if (iconMatch) return iconMatch.url;

    return matches.length > 0 ? matches[0].url : null;
}

export function getCharacterPortrait(charId) {
    if (!charId) return null;
    const q = charId.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const direct = IMAGE_MAP[q + '_splash_art'] || IMAGE_MAP[q + '_splash'];
    if (direct) return direct;

    const matches = searchImageMap(q);
    const splashMatch = matches.find(m => m.key.includes('splash'));
    if (splashMatch) return splashMatch.url;

    return matches.length > 0 ? matches[0].url : null;
}

export function getCharacterCard(charId) {
    if (!charId) return null;
    let q = charId.toLowerCase().replace(/[^a-z0-9]/g, '_');

    // Explicit overrides for Rovers using Waveband items as custom cards
    if (q === 'rover_aero' || (q === 'rover' && charId.includes('aero'))) {
        if (IMAGE_MAP['item_rover_s_waveband__aero_']) {
            return IMAGE_MAP['item_rover_s_waveband__aero_'];
        }
    }
    if (q === 'rover_spectro' || (q === 'rover' && charId.includes('spectro'))) {
        if (IMAGE_MAP['item_rover_s_waveband__spectro_']) {
            return IMAGE_MAP['item_rover_s_waveband__spectro_'];
        }
    }

    // Exact card match
    const directCard = IMAGE_MAP[q + '_card'];
    if (directCard) return directCard;

    // Fuzzy card match
    const matches = searchImageMap(q);
    const cardMatch = matches.find(m => m.key.includes('card'));
    if (cardMatch) return cardMatch.url;

    // Fallback to Icon
    return getCharacterIcon(charId);
}

export function getFuzzyImage(queryText) {
    if (!queryText) return null;
    const q = queryText.toLowerCase().replace(/[^a-z0-9]/g, '_');

    if (IMAGE_MAP[q]) return IMAGE_MAP[q];

    const matches = searchImageMap(q);

    // Exact match prioritizing icon
    const exactIconMatch = matches.find(m => m.key === q + '_icon');
    if (exactIconMatch) return exactIconMatch.url;

    // Contains icon
    const iconMatch = matches.find(m => m.key.includes('icon'));
    if (iconMatch) return iconMatch.url;

    if (matches.length > 0) return matches[0].url;
    return null;
}

// Element icons (emoji fallbacks or Material Symbols)
export const ELEMENT_ICONS = {
    fusion: 'local_fire_department',
    glacio: 'ac_unit',
    aero: 'air',
    electro: 'bolt',
    spectro: 'light_mode',
    havoc: 'dark_mode'
}

// Modern vibrant element colors for the new UI
export const ELEMENT_COLORS = {
    fusion: '#ff3b3b',   // Deeper vibrant red
    glacio: '#00d2ff',   // Cyan/Ice blue
    aero: '#00e676',     // Bright emerald green
    electro: '#f92fdf',  // Pinkish-purple (from Yinlin reference)
    spectro: '#ffd700',  // Golden yellow
    havoc: '#e91e63'     // Deep pink/crimson
}
