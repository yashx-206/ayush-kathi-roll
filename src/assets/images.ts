// Ayush Kathi Roll - Cinematic Food & Kitchen Imagery
// Each photo ships as a compressed WebP in two sizes: phones get the small set, larger screens the large set.
import heroRollLg from './images/web/hero_kathi_roll_1791306893707-lg.webp';
import heroRollSm from './images/web/hero_kathi_roll_1791306893707-sm.webp';
import chickenRollLg from './images/web/chicken_tikka_roll_1791306906990-lg.webp';
import chickenRollSm from './images/web/chicken_tikka_roll_1791306906990-sm.webp';
import paneerRollLg from './images/web/paneer_tikka_roll_1791306919847-lg.webp';
import paneerRollSm from './images/web/paneer_tikka_roll_1791306919847-sm.webp';
import paneerCookingPanLg from './images/web/paneer_cooking_pan_1791377637537-lg.webp';
import paneerCookingPanSm from './images/web/paneer_cooking_pan_1791377637537-sm.webp';
import tawaKitchenLg from './images/web/tawa_kitchen_cooking_1791306935435-lg.webp';
import tawaKitchenSm from './images/web/tawa_kitchen_cooking_1791306935435-sm.webp';
import coldDrinksLg from './images/web/cold_drinks_shakes_1791308114337-lg.webp';
import coldDrinksSm from './images/web/cold_drinks_shakes_1791308114337-sm.webp';
import heroDishLg from './images/web/hero_wok_noodles_hd-lg.webp';
import heroDishSm from './images/web/hero_wok_noodles_hd-sm.webp';
import macroTextureLg from './images/web/macro_noodle_texture_1791302350540-lg.webp';
import macroTextureSm from './images/web/macro_noodle_texture_1791302350540-sm.webp';
import flameActionLg from './images/web/cinematic_wok_flame_1791302362290-lg.webp';
import flameActionSm from './images/web/cinematic_wok_flame_1791302362290-sm.webp';
import overheadShowcaseLg from './images/web/noodle_overhead_showcase_1791302373487-lg.webp';
import overheadShowcaseSm from './images/web/noodle_overhead_showcase_1791302373487-sm.webp';

/** Phones and touch tablets: lighter images and fewer heavy effects so the site stays smooth */
export const LITE_MODE =
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

const small = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
const pick = (lg: string, sm: string) => (small ? sm : lg);

export const CINEMATIC_IMAGES = {
  heroRoll: pick(heroRollLg, heroRollSm),
  chickenRoll: pick(chickenRollLg, chickenRollSm),
  paneerRoll: pick(paneerRollLg, paneerRollSm),
  paneerCookingPan: pick(paneerCookingPanLg, paneerCookingPanSm),
  tawaKitchen: pick(tawaKitchenLg, tawaKitchenSm),
  coldDrinks: pick(coldDrinksLg, coldDrinksSm),
  heroDish: pick(heroDishLg, heroDishSm),
  macroTexture: pick(macroTextureLg, macroTextureSm),
  flameAction: pick(flameActionLg, flameActionSm),
  overheadShowcase: pick(overheadShowcaseLg, overheadShowcaseSm),
};

// Aliases for compatibility
export const NOODLE_IMAGES = {
  hero: CINEMATIC_IMAGES.heroDish,
  macro: CINEMATIC_IMAGES.macroTexture,
  flame: CINEMATIC_IMAGES.flameAction,
  overhead: CINEMATIC_IMAGES.overheadShowcase,
};

export const KATHI_IMAGES = CINEMATIC_IMAGES;
