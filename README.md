# EnkaBadges

Show off your gacha game stats on your GitHub profile!<br>
Generate shields.io style badges, like this!
<br>
![AR](https://enkabadges.mikn.dev/genshin/827014674/ar)
<br>
![Abyss](https://enkabadges.mikn.dev/genshin/827014674/abyss?colour=ff7700&style=for-the-badge)
<br>
Also works with Honkai: Star Rail and Zenless Zone Zero!
<br>
![Characters](https://enkabadges.mikn.dev/hsr/827014674/characters?colour=f66f75&style=social)

## Usage

```
/{game}/{uid}/{type}?title=&prefix=&colour=&style=
```

| Game      | Types                                                           |
| :-------- | :-------------------------------------------------------------- |
| `genshin` | `ar`, `wl`, `abyss`, `achievements`, `theater`                  |
| `hsr`     | `tl`, `eq`, `su`, `achievements`, `characters`, `lcs`, `relics` |
| `zzz`     | `level`, `shiyu`, `assault`, `tower`, `laststand`               |

Styles: `flat` (default), `plastic`, `flat-square`, `for-the-badge`, `social`.

## Stack

- [Nitro](https://nitro.build/)
- [Vite](https://vite.dev/) + [React](https://react.dev/)
- [Vercel](https://vercel.com/)

## Development

```bash
bun install
bun run dev
```

## Deployment

Import the repo on Vercel, or run `bun run deploy`.

## Special Thanks

- [Enka.Network](https://enka.network/) for providing the player data
- [badge-maker](https://npm.im/badge-maker) for badge generation
