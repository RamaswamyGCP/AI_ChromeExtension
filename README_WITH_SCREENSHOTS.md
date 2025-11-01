# ✨ Smart Content Assistant

<p align="center">
  <img src="icons/icon128.png" alt="Smart Content Assistant Logo" width="128" height="128">
</p>

<p align="center">
  <strong>AI-powered Chrome extension using Chrome's Built-in AI APIs</strong>
</p>

<p align="center">
  Transform your browsing experience with powerful on-device AI capabilities powered by Gemini Nano.<br>
  Summarize, rewrite, proofread, translate, and generate content—all without sending data to external servers!
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Built--in%20AI-blue?style=for-the-badge&logo=google-chrome" alt="Chrome Built-in AI">
  <img src="https://img.shields.io/badge/Gemini-Nano-purple?style=for-the-badge" alt="Gemini Nano">
  <img src="https://img.shields.io/badge/Privacy-First-green?style=for-the-badge" alt="Privacy First">
</p>

---

## 📸 Screenshots

### Main Interface
<p align="center">
  <img src="screenshots/popup-interface.png" alt="Extension Popup Interface" width="800">
  <br>
  <em>Clean, modern interface with 6 AI-powered features</em>
</p>

### Features in Action

<table>
  <tr>
    <td width="50%">
      <img src="screenshots/tab-summarize.png" alt="Summarize Tab" width="100%">
      <p align="center"><strong>📄 Summarize</strong><br>Extract key points from any text</p>
    </td>
    <td width="50%">
      <img src="screenshots/tab-rewrite.png" alt="Rewrite Tab" width="100%">
      <p align="center"><strong>🖊️ Rewrite</strong><br>Adjust tone and style</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="screenshots/tab-translate.png" alt="Translate Tab" width="100%">
      <p align="center"><strong>🌐 Translate</strong><br>10+ languages supported</p>
    </td>
    <td width="50%">
      <img src="screenshots/tab-writer.png" alt="Writer Tab" width="100%">
      <p align="center"><strong>✏️ Writer</strong><br>Generate original content</p>
    </td>
  </tr>
</table>

### Text Selection Toolbar
<p align="center">
  <img src="screenshots/text-selection-toolbar.png" alt="Text Selection Toolbar" width="800">
  <br>
  <em>Floating toolbar appears when you select text on any webpage</em>
</p>

### Smart Error Handling
<p align="center">
  <img src="screenshots/error-message.png" alt="Error Message Display" width="800">
  <br>
  <em>Comprehensive error messages with step-by-step troubleshooting</em>
</p>

### Context Menu Integration
<p align="center">
  <img src="screenshots/context-menu.png" alt="Context Menu" width="600">
  <br>
  <em>Quick access via right-click menu</em>
</p>

---

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

---

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

1. **Clone or Download:**
   ```bash
   git clone https://github.com/RamaswamyGCP/AI_ChromeExtension.git
   ```

2. **Load Extension:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `ChromeExtenion` folder
   - The extension should now appear in your extensions list

<p align="center">
  <img src="screenshots/chrome-extensions-page.png" alt="Chrome Extensions Page" width="800">
  <br>
  <em>Extension loaded in Chrome</em>
</p>

3. **Pin the Extension:**
   - Click the puzzle icon in Chrome toolbar
   - Find "Smart Content Assistant"
   - Click the pin icon to keep it visible

---

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

---

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

---

## 🛠️ Development

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

---

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
├── ai-diagnostic.html     # AI availability diagnostic tool
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
├── screenshots/           # Screenshots for README
└── README.md              # This file
```

---

## 📚 Resources

- [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai/built-in)
- [Gemini Nano Overview](https://developers.googleblog.com/en/gemini-nano-in-chrome/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Origin Trial for Gemini Nano](https://developer.chrome.com/origintrials/#/trials/active)

---

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

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Built with Chrome's Built-in AI APIs
- Powered by Google's Gemini Nano
- Icons generated with custom SVG design
- UI inspired by modern design principles

---

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Common Issues](#common-issues) section
2. Review Chrome AI [documentation](https://developer.chrome.com/docs/ai/built-in)
3. Open an issue on [GitHub](https://github.com/RamaswamyGCP/AI_ChromeExtension/issues)

---

## 🔮 Future Enhancements

- [ ] Image analysis and description
- [ ] Audio/speech recognition and transcription
- [ ] Batch processing multiple texts
- [ ] Custom AI prompt templates
- [ ] Export results to various formats
- [ ] Settings page for preferences
- [ ] Dark mode theme
- [ ] Multi-language UI
- [ ] Browser action shortcuts
- [ ] History of AI operations

---

<p align="center">
  <strong>Made with ❤️ using Chrome Built-in AI</strong>
</p>

<p align="center">
  <em>Last updated: November 2025</em>
</p>

<p align="center">
  <a href="https://github.com/RamaswamyGCP/AI_ChromeExtension">⭐ Star on GitHub</a> •
  <a href="https://github.com/RamaswamyGCP/AI_ChromeExtension/issues">🐛 Report Bug</a> •
  <a href="https://github.com/RamaswamyGCP/AI_ChromeExtension/issues">💡 Request Feature</a>
</p>

