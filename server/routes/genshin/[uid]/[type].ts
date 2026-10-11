import { defineBadgeRoute } from "../../../lib/badge";
import { getGenshinPlayer } from "../../../lib/enka";

export default defineBadgeRoute({
  label: "Genshin Impact",
  fetch: getGenshinPlayer,
  types: {
    ar: (p) => ({ prefix: "AR", value: p.level }),
    wl: (p) => ({ prefix: "WL", value: p.worldLevel }),
    abyss: (p) => ({
      prefix: "Abyss",
      value:
        p.towerFloorIndex && p.towerLevelIndex
          ? `${p.towerFloorIndex} - ${p.towerLevelIndex}`
          : undefined,
    }),
    achievements: (p) => ({ prefix: "Achievements:", value: p.finishAchievementNum }),
    theater: (p) => ({
      prefix: "Theater Act",
      value: p.theaterActIndex ? `${p.theaterActIndex} - ★ ${p.theaterStarIndex ?? 0}` : undefined,
    }),
  },
});
