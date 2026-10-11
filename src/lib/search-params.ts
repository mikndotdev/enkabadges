import { createParser, debounce, parseAsString, parseAsStringLiteral } from "nuqs";
import { GAMES, STYLES } from "./games";

const typing = { limitUrlUpdates: debounce(300) };

const parseAsHexColour = createParser({
  parse: (value) => (/^[0-9a-f]{6}$/i.test(value) ? `#${value.toLowerCase()}` : null),
  serialize: (value: string) => value.replace("#", ""),
});

export const builderParams = {
  game: parseAsStringLiteral(GAMES.map((g) => g.id)).withDefault(GAMES[0].id),
  stat: parseAsString,
  uid: parseAsString.withDefault("").withOptions(typing),
  title: parseAsString.withDefault("").withOptions(typing),
  prefix: parseAsString.withDefault("").withOptions(typing),
  colour: parseAsHexColour.withDefault("#007ec6").withOptions(typing),
  style: parseAsStringLiteral(STYLES.map((s) => s.id)).withDefault("flat"),
};
