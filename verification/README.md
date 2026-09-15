URL checked: https://aaronrjackson.github.io
When: 2026-09-15 11:35 MDT
What would have made this fail: a leading-slash path on style.css, app.js, or the fonts/images (e.g. /style.css instead of style.css) would have 404'd on GitHub Pages, and the page would have rendered as unstyled black-on-white text with no sidebar, no dark mode, and no theme toggle. Alternatively, GitHub Pages being down would also cause a failure.
