import { BadgeBuilder } from "./components/BadgeBuilder";

const EXAMPLES = [
  "/genshin/827014674/ar",
  "/genshin/827014674/abyss?colour=orange&style=for-the-badge&title=Genshin",
  "/hsr/827014674/characters?colour=f66f75&style=social",
  "/hsr/827014674/tl?style=flat-square&colour=red",
  "/zzz/1300028766/level?colour=ff7700&style=plastic",
  "/zzz/1300028766/shiyu?colour=9b59b6",
];

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">EnkaBadges</h1>
          <p className="text-base-content/70">
            Show off your gacha game stats on your GitHub profile!
          </p>
        </header>

        <div className="flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {EXAMPLES.map((src) => (
            <img key={src} src={src} alt="Example badge" className="h-5 w-auto" />
          ))}
        </div>

        <BadgeBuilder />

        <a className="link link-hover text-sm" href="https://github.com/mikndotdev/enkabadges">
          Check out the source code on GitHub
        </a>
      </main>

      <footer className="footer footer-center bg-base-200 p-6 text-xs text-base-content/60">
        <aside className="gap-1">
          <p>
            Powered by{" "}
            <a className="link" href="https://enka.network">
              Enka.Network
            </a>{" "}
            and{" "}
            <a className="link" href="https://shields.io">
              shields.io
            </a>
            . A thingy from{" "}
            <a className="link" href="https://mikn.dev">
              MikanDev
            </a>
            .
          </p>
          <p>
            &copy; 2020-{new Date().getFullYear()} MikanDev. Not affiliated with Enka.Network or
            HoYoverse.
          </p>
        </aside>
      </footer>
    </div>
  );
}
