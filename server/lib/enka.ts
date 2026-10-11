export type Game = "genshin" | "hsr" | "zzz";

const ENDPOINTS: Record<Game, (uid: string) => string> = {
  genshin: (uid) => `https://enka.network/api/uid/${uid}?info`,
  hsr: (uid) => `https://enka.network/api/hsr/uid/${uid}`,
  zzz: (uid) => `https://enka.network/api/zzz/uid/${uid}`,
};

const USER_AGENT = "EnkaBadges/enkabadges.mikn.dev";

export class EnkaError extends Error {
  status: number;

  constructor(status: number) {
    super(`Enka.Network responded with ${status}`);
    this.status = status;
    this.name = "EnkaError";
  }
}

export interface EnkaResult<T> {
  ttl: number;
  player: T;
}

export interface GenshinPlayer {
  nickname?: string;
  level?: number;
  worldLevel?: number;
  finishAchievementNum?: number;
  towerFloorIndex?: number;
  towerLevelIndex?: number;
  theaterActIndex?: number;
  theaterStarIndex?: number;
}

export interface HsrPlayer {
  nickname?: string;
  level?: number;
  worldLevel?: number;
  recordInfo?: {
    achievementCount?: number;
    avatarCount?: number;
    equipmentCount?: number;
    relicCount?: number;
    maxRogueChallengeScore?: number;
  };
}

export interface ZzzMedal {
  MedalType: number;
  Value: number;
  MedalIcon?: number;
  MedalScore?: number;
}

export interface ZzzPlayer {
  Desc?: string;
  ProfileDetail?: {
    Uid?: number;
    Nickname?: string;
    Level?: number;
  };
  MedalList?: ZzzMedal[];
}

export async function fetchEnka<T>(game: Game, uid: string): Promise<T> {
  if (!/^\d{9,10}$/.test(uid)) throw new EnkaError(400);
  const res = await fetch(ENDPOINTS[game](uid), {
    headers: {
      "user-agent": USER_AGENT,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new EnkaError(res.status);
  return (await res.json()) as T;
}

export async function getGenshinPlayer(uid: string): Promise<EnkaResult<GenshinPlayer>> {
  const data = await fetchEnka<{ ttl: number; playerInfo?: GenshinPlayer }>("genshin", uid);
  if (!data.playerInfo) throw new EnkaError(404);
  return { ttl: data.ttl, player: data.playerInfo };
}

export async function getHsrPlayer(uid: string): Promise<EnkaResult<HsrPlayer>> {
  const data = await fetchEnka<{ ttl: number; detailInfo?: HsrPlayer }>("hsr", uid);
  if (!data.detailInfo) throw new EnkaError(404);
  return { ttl: data.ttl, player: data.detailInfo };
}

export async function getZzzPlayer(uid: string): Promise<EnkaResult<ZzzPlayer>> {
  const data = await fetchEnka<{ ttl: number; PlayerInfo?: { SocialDetail?: ZzzPlayer } }>(
    "zzz",
    uid,
  );
  if (!data.PlayerInfo?.SocialDetail) throw new EnkaError(404);
  return { ttl: data.ttl, player: data.PlayerInfo.SocialDetail };
}
