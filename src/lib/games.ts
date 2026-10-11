import genshinIcon from "../assets/games/genshin.webp";
import hsrIcon from "../assets/games/hsr.webp";
import zzzIcon from "../assets/games/zzz.webp";

export const GAMES = [
  {
    id: "genshin",
    name: "Genshin Impact",
    icon: genshinIcon,
    attributes: [
      { id: "ar", name: "Adventure Rank" },
      { id: "wl", name: "World Level" },
      { id: "achievements", name: "Achievements" },
      { id: "abyss", name: "Spiral Abyss" },
      { id: "theater", name: "Imaginarium Theater" },
    ],
  },
  {
    id: "hsr",
    name: "Honkai: Star Rail",
    icon: hsrIcon,
    attributes: [
      { id: "tl", name: "Trailblaze Level" },
      { id: "eq", name: "Equilibrium Level" },
      { id: "achievements", name: "Achievements" },
      { id: "characters", name: "Characters" },
      { id: "lcs", name: "Light Cones" },
      { id: "relics", name: "Relics" },
      { id: "su", name: "Simulated Universe" },
    ],
  },
  {
    id: "zzz",
    name: "Zenless Zone Zero",
    icon: zzzIcon,
    attributes: [
      { id: "level", name: "Inter-Knot Level" },
      { id: "shiyu", name: "Shiyu Defense" },
      { id: "assault", name: "Deadly Assault" },
      { id: "tower", name: "Battle Tower" },
      { id: "laststand", name: "Last Stand" },
    ],
  },
] as const;

export type Game = (typeof GAMES)[number];
export type GameId = Game["id"];

export const STYLES = [
  { id: "flat", name: "Flat" },
  { id: "flat-square", name: "Flat Square" },
  { id: "plastic", name: "Plastic" },
  { id: "for-the-badge", name: "For the Badge" },
  { id: "social", name: "Social" },
] as const;

export type BadgeStyle = (typeof STYLES)[number]["id"];

export const UID_PATTERN = "\\d{9,10}";

export function isValidUid(uid: string) {
  return new RegExp(`^${UID_PATTERN}$`).test(uid);
}

export function buildBadgeUrl(options: {
  origin: string;
  game: GameId;
  uid: string;
  attribute: string;
  colour: string;
  style: BadgeStyle;
  title: string;
  prefix: string;
}) {
  const url = new URL(`/${options.game}/${options.uid}/${options.attribute}`, options.origin);
  url.searchParams.set("colour", options.colour.replace("#", ""));
  url.searchParams.set("style", options.style);
  if (options.title.trim()) url.searchParams.set("title", options.title.trim());
  if (options.prefix.trim()) url.searchParams.set("prefix", options.prefix.trim());
  return url.toString();
}
