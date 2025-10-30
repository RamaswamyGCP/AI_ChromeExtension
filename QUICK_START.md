# 🚀 Quick Start Guide

Get up and running with Smart Content Assistant in 5 minutes!

## Step 1: Enable Chrome AI Features ⚙️

1. Open Chrome and paste these into your address bar (one at a time):

```
chrome://flags/#optimization-guide-on-device-model
```
Set to: **Enabled BypassPerfRequirement**

```
chrome://flags/#prompt-api-for-gemini-nano
```
Set to: **Enabled**

2. **Restart Chrome** when prompted

## Step 2: Download Gemini Nano Model 📥

1. Open **DevTools** (Press F12) on any webpage
2. Go to the **Console** tab
3. Paste and run this command:

```javascript
await ai.languageModel.create()
```

4. Wait for the model to download (~1.5GB, may take a few minutes)
5. You should see a success message

## Step 3: Generate Icons 🎨

1. **Open** the `generate-icons.html` file in Chrome:
   - Just double-click it or drag it into Chrome

2. **Click** the "Download All Icons" button

3. **Move** the 4 downloaded PNG files into the `/icons` folder:
   - `icon16.png`
   - `icon32.png`
   - `icon48.png`
   - `icon128.png`

## Step 4: Install Extension 🔌

1. Open Chrome and go to:
```
chrome://extensions/
```

2. **Enable Developer Mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Navigate to and select the **ChromeExtenion** folder

5. The extension should now appear! 🎉

## Step 5: Pin & Use 📌

1. Click the **puzzle icon** (🧩) in Chrome toolbar

2. Find **"Smart Content Assistant"**

3. Click the **pin icon** to keep it visible

4. **Click the extension icon** to open the popup

5. **Try it out!**
   - Paste some text
   - Click "Summarize"
   - Watch the AI magic happen ✨

## Troubleshooting 🔧

### "AI API is not available" error?

✅ **Solution:**
- Verify you're using Chrome 127 or later
- Check that both flags are enabled
- Ensure Gemini Nano downloaded successfully
- Try restarting Chrome completely

### Icons not showing?

✅ **Solution:**
- Make sure you generated the PNG icons
- Check they're in the `/icons` folder
- Reload the extension

### How do I reload the extension after changes?

✅ **Solution:**
1. Go to `chrome://extensions/`
2. Find Smart Content Assistant
3. Click the reload icon (↻)

## Quick Test 🧪

Once installed, try this:

1. **Click the extension icon**
2. Go to the **"AI Prompt"** tab
3. Type: `"Explain what AI is in simple terms"`
4. Click **"Generate"**
5. You should see an AI-generated response!

---

## You're Ready! 🎊

Now you can:
- ✨ Summarize any webpage
- 🖊️ Rewrite text in different tones
- 🔤 Proofread for grammar errors
- 🌐 Translate to 10+ languages
- ✏️ Generate original content
- ⚡ Ask the AI anything

**Pro Tip:** Select text on any webpage and watch the AI toolbar appear!

---

Need more help? Check out the full [README.md](README.md)


