import { defineBadgeRoute } from "../../../lib/badge";
import { getZzzPlayer, type ZzzPlayer } from "../../../lib/enka";

const medal = (p: ZzzPlayer, type: number) => p.MedalList?.find((m) => m.MedalType === type)?.Value;

export default defineBadgeRoute({
  label: "Zenless Zone Zero",
  fetch: getZzzPlayer,
  types: {
    level: (p) => ({ prefix: "Inter-Knot Lv", value: p.ProfileDetail?.Level }),
    shiyu: (p) => ({ prefix: "Shiyu Defense", value: medal(p, 1) }),
    tower: (p) => ({ prefix: "Battle Tower", value: medal(p, 2) }),
    assault: (p) => ({ prefix: "Deadly Assault", value: medal(p, 3) }),
    laststand: (p) => ({ prefix: "Last Stand", value: medal(p, 4) }),
  },
});
