# 🔍 JumpToSearch

A Chrome extension that allows users to instantly jump to search pages of selected websites with a clean and intuitive interface.

## ✨ Key Features

### 🔍 Quick Search

- Select target website from dropdown
- Enter search terms and click search icon
- Option to open in new tab or current tab
- Keyboard shortcut support (Cmd+Shift+S / Ctrl+Shift+S)

### 🏪 Site Management

- Add custom search engines with URL templates
- Use `{query}` placeholder for automatic search term insertion
- Drag and drop to reorder sites
- Edit or delete registered sites
- Local storage for persistence

### 🎨 Modern UI/UX

- Compact home interface with two-row layout
- Separate pages for different functions (no animation conflicts)
- Focus management with TAB navigation
- Responsive design with hover effects
- Notification system for user feedback

## 🚀 Default Search Sites

- **Google**: `https://www.google.com/search?q={query}`
- **YouTube**: `https://www.youtube.com/results?search_query={query}`

## 📦 Installation

### 1. Enable Developer Mode

1. Go to `chrome://extensions/` in Chrome
2. Enable "Developer mode" toggle in the top right

### 2. Load Extension

1. Click "Load unpacked" button
2. Select this project folder
3. Extension icon will appear in browser toolbar

## 🎯 How to Use

### Basic Search

1. Click JumpToSearch icon in browser toolbar
2. Select website from dropdown
3. Enter search terms
4. Toggle "Open in new tab" option
5. Click search icon or press Enter

### Adding New Sites

1. Click "+" button in popup
2. Enter site name (e.g., "StackOverflow")
3. Enter search URL template (e.g., `https://stackoverflow.com/search?q={query}`)
4. Click "Save Site"

### Managing Sites

1. Click list icon to view all sites
2. Use drag and drop to reorder sites
3. Click "Edit" or "Delete" buttons for each site

## 🛠️ Technical Stack

- **Platform**: Chrome Extension (Manifest v3)
- **Language**: JavaScript (ES6+)
- **UI**: HTML + CSS (Modern Design)
- **Storage**: chrome.storage.local
- **Features**: Drag & Drop, Keyboard Navigation, Focus Management

## 📁 Project Structure

```
jump-to-search/
├── manifest.json          # Extension configuration
├── popup.html            # Popup UI
├── popup.css             # Stylesheets
├── popup.js              # Popup logic
├── background.js         # Background service worker
├── icons/                # Icon files
└── README.md             # Project documentation
```

## 🔧 Development Setup

1. Clone or download the project
2. Enable developer mode in Chrome
3. Load the extension
4. Refresh extension after code changes

## 🎨 Customization

### Adding New Sites Example

```
Site Name: Reddit
URL Template: https://www.reddit.com/search/?q={query}
```

### Modifying Styles

Edit `popup.css` to customize UI appearance

## 🚀 Recent Updates

- Complete UI/UX redesign with modern interface
- Added keyboard shortcuts for quick access
- Implemented drag-and-drop site reordering
- Separated pages for better navigation
- Enhanced focus management and accessibility
- Added notification system for user feedback
- Improved responsive design and hover effects

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Bug reports, feature suggestions, and pull requests are welcome!

---

Experience faster and more efficient searching with **JumpToSearch**! 🚀
