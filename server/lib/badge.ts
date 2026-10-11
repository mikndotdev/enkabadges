import { makeBadge } from "badge-maker";
import { defineHandler } from "nitro";
import { getQuery, getRouterParam } from "nitro/h3";
import { EnkaError, type EnkaResult } from "./enka";

export const STYLES = ["plastic", "flat", "flat-square", "for-the-badge", "social"] as const;

export type BadgeStyle = (typeof STYLES)[number];

export interface BadgeValue {
  prefix: string;
  value: string | number | undefined;
  suffix?: boolean;
}

export type BadgeTypes<T> = Record<string, (player: T) => BadgeValue>;

const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad Request",
  404: "User not found",
  424: "Game maintenance",
  429: "Rate limited",
};

export function svg(body: string, status = 200, ttl?: number) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control":
        status === 200 && ttl
          ? `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=${ttl}`
          : "no-store",
    },
  });
}

export function errorBadge(status: number, message = ERROR_MESSAGES[status] ?? "Enka unavailable") {
  return svg(makeBadge({ label: "error", message, color: "red" }), status);
}

function isStyle(style: string): style is BadgeStyle {
  return (STYLES as readonly string[]).includes(style);
}

export function defineBadgeRoute<T>(options: {
  label: string;
  fetch: (uid: string) => Promise<EnkaResult<T>>;
  types: BadgeTypes<T>;
}) {
  return defineHandler(async (event) => {
    const uid = getRouterParam(event, "uid") ?? "";
    const type = getRouterParam(event, "type") ?? "";
    const query = getQuery<Record<string, string | undefined>>(event);
    const style = query.style || "flat";

    const resolve = Object.hasOwn(options.types, type) ? options.types[type] : undefined;
    if (!resolve || !isStyle(style)) return errorBadge(400);

    let result: EnkaResult<T>;
    try {
      result = await options.fetch(uid);
    } catch (error) {
      return errorBadge(error instanceof EnkaError ? error.status : 502);
    }

    const { prefix, value, suffix } = resolve(result.player);
    const text = query.prefix || prefix;
    const label = query.title || options.label;

    if (value === undefined) {
      return svg(
        makeBadge({ label, message: "No data", color: "lightgrey", style }),
        200,
        result.ttl,
      );
    }

    return svg(
      makeBadge({
        label,
        message: suffix ? `${value} ${text}` : `${text} ${value}`,
        color: query.colour || "blue",
        style,
      }),
      200,
      result.ttl,
    );
  });
}
