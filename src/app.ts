import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { GenshinGen } from "./routes/genshin";

export const app = new Elysia({ aot: false }).onError(({ code, error }) => {
    console.log(code);
    return new Response(JSON.stringify({ error: error.toString() ?? code }), {
        status: 500,
    });
});

app.use(
    swagger({
        documentation: {
            info: {
                title: "EnkaBadges API",
                version: "1.0.0",
            },
        },
    }),
);
app.use(GenshinGen);

app.get("/", () => "Hello from Elysia 🦊");