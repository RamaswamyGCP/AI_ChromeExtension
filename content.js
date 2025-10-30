// Content script for text selection features
let aiToolbar = null;
let selectedText = '';

// Create floating toolbar for selected text
function createAIToolbar() {
  if (aiToolbar) return;
  
  aiToolbar = document.createElement('div');
  aiToolbar.id = 'smart-assistant-toolbar';
  aiToolbar.className = 'smart-assistant-toolbar';
  aiToolbar.innerHTML = `
    <div class="toolbar-content">
      <button class="toolbar-btn" data-action="summarize" title="Summarize">📄</button>
      <button class="toolbar-btn" data-action="rewrite" title="Rewrite">🖊️</button>
      <button class="toolbar-btn" data-action="proofread" title="Proofread">🔤</button>
      <button class="toolbar-btn" data-action="translate" title="Translate">🌐</button>
      <button class="toolbar-btn" data-action="explain" title="Explain">⚡</button>
    </div>
  `;
  
  document.body.appendChild(aiToolbar);
  
  // Add event listeners to toolbar buttons
  aiToolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', handleToolbarAction);
  });
}

// Position toolbar near selected text
function positionToolbar(x, y) {
  if (!aiToolbar) return;
  
  const toolbar = aiToolbar;
  const rect = toolbar.getBoundingClientRect();
  
  // Position above the selection
  let top = y - rect.height - 10 + window.scrollY;
  let left = x - rect.width / 2 + window.scrollX;
  
  // Keep toolbar within viewport
  if (left < 10) left = 10;
  if (left + rect.width > window.innerWidth - 10) {
    left = window.innerWidth - rect.width - 10;
  }
  if (top < 10 + window.scrollY) {
    top = y + 20 + window.scrollY; // Position below if not enough space above
  }
  
  toolbar.style.top = `${top}px`;
  toolbar.style.left = `${left}px`;
  toolbar.style.display = 'flex';
}

// Handle text selection
document.addEventListener('mouseup', (e) => {
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0 && text.length < 5000) {
      selectedText = text;
      if (!aiToolbar) createAIToolbar();
      
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      positionToolbar(rect.left + rect.width / 2, rect.top);
    } else {
      hideToolbar();
    }
  }, 10);
});

// Hide toolbar when clicking outside
document.addEventListener('mousedown', (e) => {
  if (aiToolbar && !aiToolbar.contains(e.target)) {
    hideToolbar();
  }
});

// Hide toolbar
function hideToolbar() {
  if (aiToolbar) {
    aiToolbar.style.display = 'none';
  }
}

// Handle toolbar actions
async function handleToolbarAction(e) {
  e.stopPropagation();
  const action = e.currentTarget.getAttribute('data-action');
  
  if (!selectedText) return;
  
  hideToolbar();
  
  try {
    switch (action) {
      case 'summarize':
        await performAIAction('summarize', selectedText);
        break;
      case 'rewrite':
        await performAIAction('rewrite', selectedText);
        break;
      case 'proofread':
        await performAIAction('proofread', selectedText);
        break;
      case 'translate':
        await performAIAction('translate', selectedText);
        break;
      case 'explain':
        await performAIAction('explain', selectedText);
        break;
    }
  } catch (error) {
    console.error('AI action error:', error);
    showNotification('Error processing request', 'error');
  }
}

// Perform AI actions
async function performAIAction(action, text) {
  showNotification('Processing with AI...', 'info');
  
  try {
    let result;
    
    switch (action) {
      case 'summarize':
        if ('ai' in window && 'summarizer' in window.ai) {
          const canSummarize = await window.ai.summarizer.capabilities();
          if (canSummarize.available !== 'no') {
            const summarizer = await window.ai.summarizer.create({
              type: 'key-points',
              length: 'short'
            });
            result = await summarizer.summarize(text);
            summarizer.destroy();
          }
        }
        break;
        
      case 'rewrite':
        if ('ai' in window && 'rewriter' in window.ai) {
          const canRewrite = await window.ai.rewriter.capabilities();
          if (canRewrite.available !== 'no') {
            const rewriter = await window.ai.rewriter.create({
              tone: 'casual',
              length: 'as-is'
            });
            result = await rewriter.rewrite(text);
            rewriter.destroy();
          }
        }
        break;
        
      case 'proofread':
      case 'translate':
      case 'explain':
        if ('ai' in window && 'languageModel' in window.ai) {
          const canUseAI = await window.ai.languageModel.capabilities();
          if (canUseAI.available !== 'no') {
            const session = await window.ai.languageModel.create();
            
            if (action === 'proofread') {
              result = await session.prompt(`Proofread and correct this text, return only the corrected version: ${text}`);
            } else if (action === 'translate') {
              result = await session.prompt(`Translate this to Spanish: ${text}`);
            } else if (action === 'explain') {
              result = await session.prompt(`Explain this in simple terms: ${text}`);
            }
            
            session.destroy();
          }
        }
        break;
    }
    
    if (result) {
      showResultModal(action, result);
    } else {
      showNotification('AI feature not available. Please use Chrome 127+ with AI enabled.', 'error');
    }
  } catch (error) {
    console.error('AI processing error:', error);
    showNotification('Error: ' + error.message, 'error');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `smart-assistant-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Show result modal
function showResultModal(action, result) {
  const modal = document.createElement('div');
  modal.className = 'smart-assistant-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${action.charAt(0).toUpperCase() + action.slice(1)} Result</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>${result}</p>
      </div>
      <div class="modal-footer">
        <button class="modal-copy-btn">Copy</button>
        <button class="modal-close-btn">Close</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal
  const closeModal = () => {
    modal.classList.add('fade-out');
    setTimeout(() => modal.remove(), 300);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Copy result
  modal.querySelector('.modal-copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(result).then(() => {
      showNotification('Copied to clipboard!', 'success');
    });
  });
  
  setTimeout(() => modal.classList.add('show'), 10);
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageText') {
    sendResponse({ text: document.body.innerText });
  }
});


