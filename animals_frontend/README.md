# Animals Content Explorer (React)

A modern, minimalistic, light-themed React frontend to browse animal information with search, sidebar filters, responsive grid, and interactive details.

## Features
- Browse curated animal cards
- Search by name, type, habitat, continent, or conservation status
- Sidebar filters (multi-select chips)
- Sort by name, type, or conservation status
- Responsive grid and layout
- Accessible keyboard navigation, focus styles, and ARIA labels
- Lightweight stack: React + CSS (no heavy UI libraries)

## Getting Started

In the project directory:

- `npm install`
- `npm start` → http://localhost:3000
- `npm run build` → production build in `build/`

## Configuration (.env)
Create a `.env` file in this folder (optional):

```
REACT_APP_APP_TITLE=Animals Explorer
```

Notes:
- All React environment variables must be prefixed with `REACT_APP_`.
- No backend or database is required for this project.

## Project Structure
- `src/App.js` — Main app with header, filters, grid, modal, footer
- `src/App.css` — Minimalistic light theme and responsive layout
- `src/index.js` — Entry point

## Accessibility
- Keyboard access for cards (Enter to open details)
- Focus rings for interactive elements
- ARIA attributes for dialog and landmarks

## License
MIT
