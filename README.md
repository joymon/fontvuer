# fontvuer

[![fontvuer](https://snapcraft.io//fontvuer/badge.svg)](https://snapcraft.io/fontvuer)
[![Download Count](https://img.shields.io/github/downloads/ssssota/fontvuer/total.svg)](https://github.com/ssssota/fontvuer/releases)

![fontvuer screenshot](./screenshots/default.png)

This is a cross platform fontviewer.
You can preview fonts that installed.

## Feature

- List and preview
- Favorite
  - Show only favorite fonts
- Change styles
  - Italic
  - Size
  - Weight

You can see in [screenshots](./screenshots/screenshots.md).

## Points to note

- Incase there is an `Error: Electron failed to install correctly, please delete node_modules/electron and try installing again`, please install electron separately using `npm install electron` command

## Contribution

You must use `node.js 10` for building a native dependency(`font-manager`).

1. Fork this repository.
2. `npm install` to install dependencies.
3. Create a branch.
4. Commit your changes.
5. `npm run electron:serve` to check changes.
6. Create new Pull Request.

Please tell me if my English is wrong.

## LICENSE

[MIT](LICENSE)
