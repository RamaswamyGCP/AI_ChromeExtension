# ✨ Smart Content Assistant

**AI-powered Chrome extension using Chrome's Built-in AI APIs**

Transform your browsing experience with powerful on-device AI capabilities powered by Gemini Nano. Summarize, rewrite, proofread, translate, and generate content—all without sending data to external servers!

![Chrome Built-in AI](https://img.shields.io/badge/Chrome-Built--in%20AI-blue?style=for-the-badge&logo=google-chrome)
![Gemini Nano](https://img.shields.io/badge/Gemini-Nano-purple?style=for-the-badge)
![Privacy First](https://img.shields.io/badge/Privacy-First-green?style=for-the-badge)

## 🌟 Features

### 📄 Summarizer API
- Distill complex information into clear, concise insights
- Choose from short, medium, or long summaries
- Extract key points from any webpage
- Perfect for research, news articles, and documentation

### 🖊️ Rewriter API
- Improve content with alternative phrasing
- Adjust tone: formal, casual, professional, or friendly
- Maintain the original meaning while enhancing clarity
- Great for emails, reports, and creative writing

### 🔤 Proofreader API
- Correct grammar, spelling, and punctuation errors
- Professional-grade text correction
- Instant feedback on your writing
- No external API calls—100% private

### 🌐 Translator API
- Translate text into 10+ languages
- Supported languages: Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Arabic, Hindi
- Real-time translation powered by on-device AI
- Perfect for international communication

### ✏️ Writer API
- Generate original and engaging content
- Create emails, articles, social media posts, and more
- Customizable length options
- AI-powered creativity at your fingertips

### ⚡ Prompt API (Language Model)
- Ask anything and get intelligent responses
- Multimodal support for complex queries
- General-purpose AI assistant
- Explain concepts, answer questions, and more

## 🚀 Installation

### Prerequisites

**Important:** This extension requires Chrome 127 or later with AI features enabled.

1. **Chrome Version:** Chrome 127+ (Canary, Dev, or Beta channel recommended)
2. **Enable AI Features:**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Set to "Enabled BypassPerfRequirement"
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
   - Set to "Enabled"
   - Restart Chrome

3. **Download Gemini Nano:**
   - Open DevTools (F12) on any page
   - Run: `await ai.languageModel.create()`
   - This will trigger the download of Gemini Nano model (~1.5GB)
   - Wait for the download to complete

### Install the Extension

#### Method 1: Load Unpacked (Development)

1. **Generate Icons:**
   - Open `generate-icons.html` in Chrome
   - Click "Download All Icons"
   - Move downloaded icons to the `/icons` folder
   - Ensure files are named: `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`

2. **Load Extension:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `ChromeExtenion` folder
   - The extension should now appear in your extensions list

3. **Pin the Extension:**
   - Click the puzzle icon in Chrome toolbar
   - Find "Smart Content Assistant"
   - Click the pin icon to keep it visible

#### Method 2: Package and Install

```bash
# Navigate to parent directory
cd /Users/ramaswamy/Documents/

# Create a zip file
zip -r SmartContentAssistant.zip ChromeExtenion/ -x "*.git*" "*.DS_Store"

# Or use Chrome's "Pack extension" feature in chrome://extensions/
```

## 📖 Usage Guide

### Using the Popup Interface

1. **Click the extension icon** in your Chrome toolbar
2. **Choose a feature** from the tab menu:
   - 📄 Summarize
   - 🖊️ Rewrite
   - 🔤 Proofread
   - 🌐 Translate
   - ✏️ Writer
   - ⚡ AI Prompt

3. **Enter your text** or use "Use Page Content" for summaries
4. **Click the action button** to process with AI
5. **Copy the result** to clipboard with one click

### Using Text Selection (Context Menu)

1. **Select any text** on a webpage
2. **Look for the floating AI toolbar** that appears above your selection
3. **Click an icon** to perform an action:
   - 📄 Summarize selected text
   - 🖊️ Rewrite in different tone
   - 🔤 Proofread for errors
   - 🌐 Translate to another language
   - ⚡ Explain the concept

4. **Right-click selected text** for context menu options

### Keyboard Shortcuts

You can configure custom keyboard shortcuts in Chrome:
1. Go to `chrome://extensions/shortcuts`
2. Find "Smart Content Assistant"
3. Set your preferred shortcuts

## 🏗️ Project Structure

```
ChromeExtenion/
├── manifest.json           # Extension configuration
├── popup.html              # Main popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality and AI API calls
├── content.js             # Content script for text selection
├── content.css            # Content script styling
├── background.js          # Service worker and context menus
├── generate-icons.html    # Icon generator utility
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   ├── icon.svg
│   └── README.txt
└── README.md              # This file
```

## 🔧 Technical Details

### Chrome AI APIs Used

- **Summarizer API** - `window.ai.summarizer`
- **Writer API** - `window.ai.writer`
- **Rewriter API** - `window.ai.rewriter`
- **Language Model API** - `window.ai.languageModel`

### Privacy & Security

🔒 **100% On-Device Processing**
- All AI operations run locally on your device
- No data sent to external servers
- No API keys required
- No tracking or analytics

🚀 **Performance Benefits**
- Instant responses (no network latency)
- Works offline
- No usage limits or costs
- Respects your privacy

### Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome Canary | 127+ | ✅ Fully Supported |
| Chrome Dev | 127+ | ✅ Fully Supported |
| Chrome Beta | 127+ | ✅ Fully Supported |
| Chrome Stable | 127+ | ⏳ Coming Soon |
| Edge | Not yet | ❌ Not Supported |
| Firefox | Not yet | ❌ Not Supported |

## 🛠️ Development

### Prerequisites
- Node.js (optional, for development tools)
- Chrome 127+ with AI features enabled
- Basic understanding of JavaScript and Chrome Extensions

### Making Changes

1. **Edit the code** in your preferred editor
2. **Reload the extension:**
   - Go to `chrome://extensions/`
   - Click the reload icon on the extension card
3. **Test your changes** in the popup or on web pages

### Debugging

- **Popup:** Right-click popup → Inspect
- **Content Script:** F12 on any webpage → Console
- **Background:** chrome://extensions/ → Inspect views: service worker

### Common Issues

**Q: "AI API is not available" error**
- Ensure you're using Chrome 127+
- Check that AI flags are enabled (see Prerequisites)
- Download Gemini Nano model
- Try restarting Chrome

**Q: Icons not showing**
- Generate icons using `generate-icons.html`
- Ensure PNG files are in `/icons` folder
- Reload the extension

**Q: Extension not working on some pages**
- Some pages (chrome://, chrome-extension://) have restricted access
- Extension works on all regular web pages

## 🎨 Customization

### Changing the Theme

Edit `popup.css` to customize colors:

```css
/* Change gradient colors */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Adding New AI Features

1. Add a new tab in `popup.html`
2. Implement the AI logic in `popup.js`
3. Update `content.js` for text selection support
4. Add context menu item in `background.js`

## 📚 Resources

- [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai/built-in)
- [Gemini Nano Overview](https://developers.googleblog.com/en/gemini-nano-in-chrome/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Origin Trial for Gemini Nano](https://developer.chrome.com/origintrials/#/trials/active)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add more language support
- Implement image description using multimodal AI
- Add audio transcription features
- Create custom AI prompts library
- Improve UI/UX design
- Add dark mode
- Implement settings page

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Chrome's Built-in AI APIs
- Powered by Google's Gemini Nano
- Icons generated with custom SVG design
- UI inspired by modern design principles

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Common Issues](#common-issues) section
2. Review Chrome AI [documentation](https://developer.chrome.com/docs/ai/built-in)
3. Open an issue on GitHub (if applicable)

## 📥 Export Functionality

Export your AI-generated results in multiple formats:

### Supported Formats
- **TXT** - Plain text format for simple text editors
- **PDF** - Professional documents with formatting and metadata
- **DOC** - Microsoft Word compatible format

### How to Export
1. Generate content using any AI feature
2. Click the **📥 Export** button next to the Copy button
3. Choose your desired format (TXT, PDF, or DOC)
4. File downloads automatically with timestamp and feature name

### Export Features
- **Smart Filenames**: Auto-generated with feature name and date (e.g., `Summary_2025-10-30.pdf`)
- **Professional Formatting**: PDFs include headers, footers, and page numbers
- **Metadata**: All exports include generation date and feature information
- **Privacy First**: All exports happen locally, no server uploads

## 🔮 Future Enhancements

- [ ] Image analysis and description
- [ ] Audio/speech recognition and transcription
- [ ] Batch processing multiple texts
- [ ] Custom AI prompt templates
- [x] ✅ Export results to various formats (TXT, PDF, DOC)
- [ ] Settings page for preferences
- [ ] Dark mode theme
- [ ] Multi-language UI
- [ ] Browser action shortcuts
- [ ] History of AI operations

## ⚡ Quick Start Example

```javascript
// Example: Using the Summarizer API
const summarizer = await window.ai.summarizer.create({
  type: 'key-points',
  length: 'medium'
});

const summary = await summarizer.summarize('Your long text here...');
console.log(summary);

summarizer.destroy();
```

---

**Made with ❤️ using Chrome Built-in AI**

*Last updated: October 2025*


