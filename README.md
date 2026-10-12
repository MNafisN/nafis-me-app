# nafis-me-app

My personal site. 

## The look

Arcade-flavoured neo-brutalism: thin dark outlines, hard offset shadows with no blur, flat colors and a monospace body font.

- Body text: IBM Plex Mono
- Headings and buttons: Comfortaa
- Palette: ink teal, cream background, arcade yellow, cornflower blue

## Stack

- [Astro](https://astro.build) (static output)
- Plain CSS with custom properties, no CSS framework
- Fonts through Astro's Fonts API, served from the site itself

## Run it locally

You need Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in ./dist
```

## Project layout

```text
src/
├── components/   small reusable pieces (Button, Tag, Card)
├── layouts/      Base.astro, the page frame shared by every page
├── pages/        one file per route
└── styles/       tokens.css (variables) and global.css (base styles)
public/           favicons and other static files
```
