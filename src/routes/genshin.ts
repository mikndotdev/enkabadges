import { Elysia } from "elysia";
import { Wrapper } from "enkanetwork.js";
import { makeBadge, ValidationError } from "badge-maker";

const { genshin } = new Wrapper({
    userAgent: "EnkaBadges/enkabadges.mikn.dev",
});

const ErrorBadge = {
    label: "error",
    message: "Bad Request",
    color: "red",
};

const NotFoundBadge = {
    label: "error",
    message: "User not found",
    color: "red",
};

export const GenshinGen = new Elysia({ prefix: "/genshin" }).get(
    "/:uid/:type",
    async (context) => {
        const {
            params: { uid, type },
        } = context;

        if (type !== "ar" && type !== "abyss" && type !== "wl" && type !== "achievements") {
            return new Response(makeBadge(ErrorBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 400,
            });
        }

        let userData;
        try {
            userData = await genshin.getPlayer(uid);
        } catch (error) {
            return new Response(makeBadge(NotFoundBadge), {
                headers: {
                    "Content-Type": "image/svg+xml",
                },
                status: 404,
            });
        }

        if (type === "ar") {
            const ar = userData.player.levels.rank;
            return new Response(
                makeBadge({
                    label: "Genshin Impact",
                    message: `AR ${ar.toString()}`,
                    color: "blue",
                }),
                {
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                },
            );
        }
    },
);