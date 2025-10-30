// Background service worker for Smart Content Assistant

// Install event
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Smart Content Assistant installed successfully!');
    
    // Create context menu items
    createContextMenus();
    
    // Open welcome page
    chrome.tabs.create({
      url: 'https://developer.chrome.com/docs/ai/built-in'
    });
  } else if (details.reason === 'update') {
    console.log('Smart Content Assistant updated!');
    createContextMenus();
  }
});

// Create context menu items for quick AI actions
function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'smart-assistant-main',
      title: '✨ Smart Content Assistant',
      contexts: ['selection']
    });
    
    chrome.contextMenus.create({
      id: 'summarize',
      parentId: 'smart-assistant-main',
      title: '📄 Summarize',
      contexts: ['selection']
    });
    
    chrome.contextMenus.create({
      id: 'rewrite',
      parentId: 'smart-assistant-main',
      title: '🖊️ Rewrite',
      contexts: ['selection']
    });
    
    chrome.contextMenus.create({
      id: 'proofread',
      parentId: 'smart-assistant-main',
      title: '🔤 Proofread',
      contexts: ['selection']
    });
    
    chrome.contextMenus.create({
      id: 'translate',
      parentId: 'smart-assistant-main',
      title: '🌐 Translate',
      contexts: ['selection']
    });
    
    chrome.contextMenus.create({
      id: 'explain',
      parentId: 'smart-assistant-main',
      title: '⚡ Explain',
      contexts: ['selection']
    });
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'smart-assistant-main') return;
  
  const selectedText = info.selectionText;
  if (!selectedText) return;
  
  // Send message to content script to perform AI action
  chrome.tabs.sendMessage(tab.id, {
    action: 'performAI',
    type: info.menuItemId,
    text: selectedText
  });
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkAIAvailability') {
    // This will be handled in the content script context
    sendResponse({ available: true });
  }
  return true;
});

// Handle keyboard shortcuts (if configured in manifest)
if (chrome.commands) {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'open-popup') {
      chrome.action.openPopup();
    }
  });
}

// Monitor AI API availability
async function checkAIAPIs() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const apis = {
            languageModel: 'ai' in window && 'languageModel' in window.ai,
            summarizer: 'ai' in window && 'summarizer' in window.ai,
            writer: 'ai' in window && 'writer' in window.ai,
            rewriter: 'ai' in window && 'rewriter' in window.ai
          };
          return apis;
        }
      }, (results) => {
        if (results && results[0]) {
          console.log('AI APIs available:', results[0].result);
        }
      });
    }
  } catch (error) {
    console.error('Error checking AI APIs:', error);
  }
}

// Periodically check AI API availability
setInterval(checkAIAPIs, 60000); // Check every minute

console.log('Smart Content Assistant background service worker loaded');


