# Christmas Unwrap Experience for Shona ❤️

A single-page, interactive Christmas "unwrap" experience built as a static site for GitHub Pages.

## 🚀 Quick Start

Simply open `index.html` in your browser to test locally. No build tools or server required!

## 📦 GitHub Pages Setup

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push all files to the `main` branch (or `master`)

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select your branch (usually `main` or `master`)
   - Select the root folder (`/`)
   - Click "Save"

3. **Access your site:**
   - Your site will be available at: `https://[your-username].github.io/[repository-name]`
   - It may take a few minutes to go live

## 🖼️ Adding/Replacing Images

All images are stored in the `/assets/` folder:

- `paper-texture.png` - Used for the unwrap animation overlay
- `sloth.png` - Team Sloth selection image
- `capybara.png` - Team Capybara selection image

To replace images:
1. Add your new image files to the `/assets/` folder
2. Keep the same filenames, or update the references in:
   - `index.html` (for sloth/capybara images)
   - `styles.css` (for paper-texture.png in the `.paper-layer` background)

## 🧪 Testing Locally

1. **Simple method:**
   - Double-click `index.html` to open in your default browser
   - Or right-click → "Open with" → choose your browser

2. **Using a local server (recommended for testing):**
   - **Python 3:** Run `python -m http.server 8000` in the project directory, then visit `http://localhost:8000`
   - **Node.js:** Install `http-server` globally (`npm install -g http-server`), then run `http-server` in the project directory
   - **VS Code:** Use the "Live Server" extension

## ✨ Features

- **Progress saving:** Uses localStorage to remember which section you're on
- **Team selection:** Saves your sloth/capybara choice
- **Responsive design:** Works on mobile and desktop
- **Accessibility:** Proper button elements, focus states, and ARIA labels
- **Smooth animations:** CSS transitions and keyframes for a polished feel

## 📝 Notes

- The site works completely offline once loaded
- All progress is saved in browser localStorage
- No external dependencies or frameworks required
- Fully static - perfect for GitHub Pages

---

Made with ❤️ for Shona

