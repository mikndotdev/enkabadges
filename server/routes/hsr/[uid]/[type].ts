import { defineBadgeRoute } from "../../../lib/badge";
import { getHsrPlayer } from "../../../lib/enka";

export default defineBadgeRoute({
  label: "Honkai: Star Rail",
  fetch: getHsrPlayer,
  types: {
    tl: (p) => ({ prefix: "TL", value: p.level }),
    eq: (p) => ({ prefix: "EQ", value: p.worldLevel ?? 0 }),
    su: (p) => ({ prefix: "SU World", value: p.recordInfo?.maxRogueChallengeScore }),
    achievements: (p) => ({ prefix: "Achievements:", value: p.recordInfo?.achievementCount }),
    characters: (p) => ({
      prefix: "Characters obtained",
      value: p.recordInfo?.avatarCount,
      suffix: true,
    }),
    lcs: (p) => ({ prefix: "LCs obtained", value: p.recordInfo?.equipmentCount, suffix: true }),
    relics: (p) => ({ prefix: "Relics owned", value: p.recordInfo?.relicCount, suffix: true }),
  },
});
