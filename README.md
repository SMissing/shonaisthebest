# Christmas Unwrap Experience for Shona ❤️

A single-page interactive Christmas "unwrap" experience built with vanilla HTML, CSS, and JavaScript.

## Features

- 6-section interactive story with smooth transitions
- Unwrap animations with paper peeling effects
- Team Sloth vs Team Capybara selection
- Progress persistence via localStorage
- Fully responsive (mobile + desktop)
- No build tools required - just open `index.html`!

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - State management and interactions
- `assets/` - Folder for images and other assets

## How to Test Locally

1. Simply open `index.html` in your web browser
2. No server needed - it works as a static file
3. Test on different screen sizes by resizing your browser window

## GitHub Pages Setup

### Option 1: Using GitHub's Web Interface

1. Push this repository to GitHub
2. Go to your repository on GitHub
3. Click **Settings** → **Pages** (in the left sidebar)
4. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://[your-username].github.io/shonaisthebest/`

### Option 2: Using GitHub CLI

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Then follow steps 2-6 from Option 1.

## Adding Images

If you want to replace the SVG placeholders with actual images:

1. Place your images in the `assets/` folder
2. Update the `<svg>` elements in `index.html` (sections 4 and 6) with `<img>` tags:

```html
<!-- Example for Team Sloth card -->
<img src="assets/sloth.png" alt="Sloth illustration" class="team-icon">
```

3. Make sure image paths are relative (e.g., `assets/image.png`)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Uses CSS Grid, Flexbox, and modern JavaScript (ES6+)

## Notes

- Progress is saved in localStorage, so refreshing won't reset the experience
- Team selection is also persisted
- The ring size input is just for fun - it saves to localStorage too!

## Customization

- Colors: Edit CSS variables in `styles.css` (`:root` section)
- Content: Edit text directly in `index.html`
- Animations: Adjust timing in `styles.css` keyframe animations

---

Made with ❤️ for Shona

