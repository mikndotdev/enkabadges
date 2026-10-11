import { useQueryStates } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {
  GAMES,
  STYLES,
  UID_PATTERN,
  buildBadgeUrl,
  isValidUid,
  type BadgeStyle,
  type Game,
} from "../lib/games";
import { builderParams } from "../lib/search-params";

export function BadgeBuilder() {
  const [{ game: gameId, stat, uid, title, prefix, colour, style }, setParams] =
    useQueryStates(builderParams);
  const game = GAMES.find((g) => g.id === gameId) ?? GAMES[0];
  const attribute = game.attributes.find((a) => a.id === stat)?.id ?? game.attributes[0].id;
  const [loadedUrl, setLoadedUrl] = useState("");

  const uidValid = isValidUid(uid);
  const url = uidValid
    ? buildBadgeUrl({
        origin: window.location.origin,
        game: game.id,
        uid,
        attribute,
        colour,
        style,
        title,
        prefix,
      })
    : "";
  const previewUrl = useDebouncedValue(url);
  const markdown = previewUrl ? `[![EnkaBadges](${previewUrl})](${window.location.origin})` : "";

  const selectGame = (next: Game) => {
    void setParams({ game: next.id, stat: null });
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${what} copied to clipboard`);
    } catch {
      toast.error("Couldn't access the clipboard");
    }
  };

  return (
    <section className="card card-border bg-base-200 w-full max-w-xl shadow-xl">
      <div className="card-body gap-4">
        <h2 className="card-title">Build your badge</h2>

        <div
          role="tablist"
          aria-label="Game"
          className="tabs tabs-box grid grid-cols-1 sm:grid-cols-3"
        >
          {GAMES.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={g.id === game.id}
              className={`tab h-auto flex-nowrap gap-2 py-2 whitespace-nowrap ${g.id === game.id ? "tab-active" : ""}`}
              onClick={() => selectGame(g)}
            >
              <img
                src={g.icon}
                alt=""
                className="size-7 shrink-0 rounded-full bg-white object-contain"
              />
              {g.name}
            </button>
          ))}
        </div>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">UID</legend>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="e.g. 827014674"
              pattern={UID_PATTERN}
              maxLength={10}
              required
              className="input validator w-full"
              value={uid}
              onChange={(e) => void setParams({ uid: e.target.value.replace(/\D/g, "") })}
            />
            <p className="validator-hint hidden">UIDs are 9 or 10 digits</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Stat</legend>
            <select
              className="select w-full"
              value={attribute}
              onChange={(e) => void setParams({ stat: e.target.value })}
            >
              {game.attributes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              placeholder={game.name}
              className="input w-full"
              value={title}
              onChange={(e) => void setParams({ title: e.target.value })}
            />
            <p className="label">Left side of the badge</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Prefix</legend>
            <input
              type="text"
              placeholder="Default"
              className="input w-full"
              value={prefix}
              onChange={(e) => void setParams({ prefix: e.target.value })}
            />
            <p className="label">Text next to the value</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Colour</legend>
            <label className="input w-full">
              <input
                type="color"
                aria-label="Badge colour"
                className="size-6 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
                value={colour}
                onChange={(e) => void setParams({ colour: e.target.value })}
              />
              <span className="font-mono uppercase">{colour}</span>
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Style</legend>
            <select
              className="select w-full"
              value={style}
              onChange={(e) => void setParams({ style: e.target.value as BadgeStyle })}
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <div className="divider my-0">Preview</div>

        {previewUrl ? (
          <div className="flex flex-col gap-4">
            <div className="flex min-h-12 items-center justify-center rounded-box bg-base-100 p-4">
              {loadedUrl !== previewUrl && <div className="skeleton h-6 w-40" />}
              <img
                key={previewUrl}
                src={previewUrl}
                alt={`${game.name} ${attribute} badge`}
                className={loadedUrl === previewUrl ? "max-w-full" : "hidden"}
                onLoad={() => setLoadedUrl(previewUrl)}
                onError={() => setLoadedUrl(previewUrl)}
              />
            </div>

            <textarea
              readOnly
              aria-label="Markdown snippet"
              rows={3}
              className="textarea w-full resize-none font-mono text-xs"
              value={markdown}
              onFocus={(e) => e.currentTarget.select()}
            />

            <div className="join join-vertical sm:join-horizontal w-full">
              <button
                type="button"
                className="btn join-item sm:flex-1"
                onClick={() => copy(previewUrl, "URL")}
              >
                Copy URL
              </button>
              <button
                type="button"
                className="btn btn-primary join-item sm:flex-1"
                onClick={() => copy(markdown, "Markdown")}
              >
                Copy Markdown
              </button>
              <button
                type="button"
                className="btn join-item sm:flex-1"
                onClick={() => copy(`<img src="${previewUrl}" alt="EnkaBadges" />`, "HTML")}
              >
                Copy HTML
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-base-content/60">
            Enter your UID to see a preview.
          </p>
        )}
      </div>
    </section>
  );
}
