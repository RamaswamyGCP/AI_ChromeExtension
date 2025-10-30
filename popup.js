// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    
    // Hide error message when switching tabs
    hideError();
  });
});

// Utility functions
function showLoading() {
  document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

function hideError() {
  document.getElementById('error').style.display = 'none';
}

function showOutput(outputId, text) {
  const outputGroup = document.getElementById(`${outputId}-output-group`);
  const output = document.getElementById(`${outputId}-output`);
  output.textContent = text;
  outputGroup.style.display = 'block';
}

// Check AI API availability
async function checkAIAvailability(apiName) {
  try {
    if (apiName === 'summarizer' && 'ai' in window && 'summarizer' in window.ai) {
      const availability = await window.ai.summarizer.capabilities();
      return availability.available === 'readily';
    }
    if (apiName === 'writer' && 'ai' in window && 'writer' in window.ai) {
      const availability = await window.ai.writer.capabilities();
      return availability.available === 'readily';
    }
    if (apiName === 'rewriter' && 'ai' in window && 'rewriter' in window.ai) {
      const availability = await window.ai.rewriter.capabilities();
      return availability.available === 'readily';
    }
    if (apiName === 'languageModel' && 'ai' in window && 'languageModel' in window.ai) {
      const availability = await window.ai.languageModel.capabilities();
      return availability.available === 'readily';
    }
    return false;
  } catch (error) {
    console.error(`Error checking ${apiName} availability:`, error);
    return false;
  }
}

// Summarizer API
document.getElementById('summarize-btn').addEventListener('click', async () => {
  const input = document.getElementById('summarize-input').value.trim();
  const length = document.getElementById('summary-length').value;
  
  if (!input) {
    showError('Please enter text to summarize');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    // Check if running in a context with AI API access
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (text, summaryLength) => {
        try {
          if (!('ai' in window) || !('summarizer' in window.ai)) {
            return { error: 'Summarizer API is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canSummarize = await window.ai.summarizer.capabilities();
          if (canSummarize.available === 'no') {
            return { error: 'Summarizer API is not available on this device.' };
          }
          
          const summarizer = await window.ai.summarizer.create({
            type: 'key-points',
            length: summaryLength
          });
          
          const summary = await summarizer.summarize(text);
          summarizer.destroy();
          
          return { result: summary };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [input, length]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('summarize', results[0].result.result);
        }
      } else {
        showError('Unable to summarize. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Use Page Content button
document.getElementById('use-page-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return document.body.innerText;
      }
    }, (results) => {
      if (results && results[0] && results[0].result) {
        const text = results[0].result.substring(0, 4000); // Limit to 4000 chars
        document.getElementById('summarize-input').value = text;
      }
    });
  } catch (error) {
    showError('Unable to extract page content');
  }
});

// Rewriter API
document.getElementById('rewrite-btn').addEventListener('click', async () => {
  const input = document.getElementById('rewrite-input').value.trim();
  const tone = document.getElementById('rewrite-tone').value;
  
  if (!input) {
    showError('Please enter text to rewrite');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (text, rewriteTone) => {
        try {
          if (!('ai' in window) || !('rewriter' in window.ai)) {
            return { error: 'Rewriter API is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canRewrite = await window.ai.rewriter.capabilities();
          if (canRewrite.available === 'no') {
            return { error: 'Rewriter API is not available on this device.' };
          }
          
          const rewriter = await window.ai.rewriter.create({
            tone: rewriteTone,
            length: 'as-is'
          });
          
          const rewritten = await rewriter.rewrite(text);
          rewriter.destroy();
          
          return { result: rewritten };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [input, tone]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('rewrite', results[0].result.result);
        }
      } else {
        showError('Unable to rewrite. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Proofreader API
document.getElementById('proofread-btn').addEventListener('click', async () => {
  const input = document.getElementById('proofread-input').value.trim();
  
  if (!input) {
    showError('Please enter text to proofread');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (text) => {
        try {
          // Note: As of now, there's no dedicated Proofreader API in Chrome
          // We'll use the Rewriter API with formal tone as a workaround
          // or Language Model API for grammar correction
          
          if (!('ai' in window) || !('languageModel' in window.ai)) {
            return { error: 'AI Language Model is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canUseAI = await window.ai.languageModel.capabilities();
          if (canUseAI.available === 'no') {
            return { error: 'AI Language Model is not available on this device.' };
          }
          
          const session = await window.ai.languageModel.create({
            systemPrompt: 'You are a professional proofreader. Correct any grammar, spelling, and punctuation errors in the text. Return only the corrected text without explanations.'
          });
          
          const corrected = await session.prompt(`Proofread and correct this text: ${text}`);
          session.destroy();
          
          return { result: corrected };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [input]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('proofread', results[0].result.result);
        }
      } else {
        showError('Unable to proofread. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Translator API
document.getElementById('translate-btn').addEventListener('click', async () => {
  const input = document.getElementById('translate-input').value.trim();
  const targetLang = document.getElementById('target-language').value;
  
  if (!input) {
    showError('Please enter text to translate');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (text, language) => {
        try {
          if (!('ai' in window) || !('languageModel' in window.ai)) {
            return { error: 'AI Translator is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canUseAI = await window.ai.languageModel.capabilities();
          if (canUseAI.available === 'no') {
            return { error: 'AI Language Model is not available on this device.' };
          }
          
          const languageNames = {
            'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian',
            'pt': 'Portuguese', 'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese',
            'ar': 'Arabic', 'hi': 'Hindi'
          };
          
          const session = await window.ai.languageModel.create();
          const translated = await session.prompt(`Translate the following text to ${languageNames[language]}. Return only the translation: ${text}`);
          session.destroy();
          
          return { result: translated };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [input, targetLang]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('translate', results[0].result.result);
        }
      } else {
        showError('Unable to translate. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Writer API
document.getElementById('writer-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('writer-prompt').value.trim();
  const length = document.getElementById('writer-length').value;
  
  if (!prompt) {
    showError('Please enter a writing prompt');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (userPrompt, contentLength) => {
        try {
          if (!('ai' in window) || !('writer' in window.ai)) {
            return { error: 'Writer API is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canWrite = await window.ai.writer.capabilities();
          if (canWrite.available === 'no') {
            return { error: 'Writer API is not available on this device.' };
          }
          
          const writer = await window.ai.writer.create({
            tone: 'neutral',
            length: contentLength
          });
          
          const written = await writer.write(userPrompt);
          writer.destroy();
          
          return { result: written };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [prompt, length]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('writer', results[0].result.result);
        }
      } else {
        showError('Unable to generate text. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Prompt API (Language Model)
document.getElementById('prompt-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt-input').value.trim();
  
  if (!prompt) {
    showError('Please enter a prompt');
    return;
  }
  
  showLoading();
  hideError();
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (userPrompt) => {
        try {
          if (!('ai' in window) || !('languageModel' in window.ai)) {
            return { error: 'AI Language Model is not available. Please ensure you\'re using Chrome 127+ with AI features enabled.' };
          }
          
          const canUseAI = await window.ai.languageModel.capabilities();
          if (canUseAI.available === 'no') {
            return { error: 'AI Language Model is not available on this device.' };
          }
          
          const session = await window.ai.languageModel.create();
          const response = await session.prompt(userPrompt);
          session.destroy();
          
          return { result: response };
        } catch (error) {
          return { error: error.message };
        }
      },
      args: [prompt]
    }, (results) => {
      hideLoading();
      if (results && results[0] && results[0].result) {
        if (results[0].result.error) {
          showError(results[0].result.error);
        } else {
          showOutput('prompt', results[0].result.result);
        }
      } else {
        showError('Unable to generate response. Please try again.');
      }
    });
  } catch (error) {
    hideLoading();
    showError(`Error: ${error.message}`);
  }
});

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const text = document.getElementById(targetId).textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent;
      button.textContent = '✓ Copied!';
      button.style.background = '#38a169';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#48bb78';
      }, 2000);
    }).catch(err => {
      showError('Failed to copy to clipboard');
    });
  });
});

// ============================================
// EXPORT FUNCTIONALITY (TXT, PDF, DOC)
// ============================================

// Helper function to get the current feature name for filename
function getFeatureName() {
  const activeTab = document.querySelector('.tab-content.active');
  const featureNames = {
    'summarize': 'Summary',
    'rewrite': 'Rewritten',
    'proofread': 'Proofread',
    'translate': 'Translation',
    'writer': 'Generated',
    'prompt': 'AI_Response'
  };
  return featureNames[activeTab.id] || 'Export';
}

// Export as TXT
function exportAsTXT(text, filename) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showSuccessMessage('✓ Exported as TXT');
}

// Export as PDF
function exportAsPDF(text, filename) {
  try {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      showError('PDF library is loading. Please try again in a moment.');
      return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Smart Content Assistant', 20, 20);
    
    // Add metadata
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);
    const date = new Date().toLocaleString();
    doc.text(`Generated: ${date}`, 20, 28);
    
    // Add content
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont(undefined, 'normal');
    
    // Split text into lines that fit the page width
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = 20;
    const maxWidth = pageWidth - (margins * 2);
    
    const lines = doc.splitTextToSize(text, maxWidth);
    
    let yPosition = 40;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    
    lines.forEach((line, index) => {
      // Add new page if needed
      if (yPosition + lineHeight > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(line, margins, yPosition);
      yPosition += lineHeight;
    });
    
    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`${filename}.pdf`);
    showSuccessMessage('✓ Exported as PDF');
  } catch (error) {
    console.error('PDF export error:', error);
    showError('Failed to export PDF. Please try again.');
  }
}

// Export as DOC (actually HTML format that Word can open)
function exportAsDOC(text, filename) {
  const date = new Date().toLocaleString();
  
  // Create HTML content with proper DOC formatting
  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${filename}</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      margin: 1in;
    }
    h1 {
      color: #667eea;
      font-size: 18pt;
      margin-bottom: 10px;
    }
    .metadata {
      color: #666;
      font-size: 10pt;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
    }
    .content {
      white-space: pre-wrap;
      margin-top: 20px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #ccc;
      font-size: 9pt;
      color: #888;
    }
  </style>
</head>
<body>
  <h1>Smart Content Assistant</h1>
  <div class="metadata">
    <strong>Generated:</strong> ${date}<br>
    <strong>Feature:</strong> ${getFeatureName()}
  </div>
  <div class="content">${text.replace(/\n/g, '<br>')}</div>
  <div class="footer">
    <p>Generated by Smart Content Assistant - Powered by Chrome Built-in AI (Gemini Nano)</p>
    <p>🔒 All processing happened locally on your device</p>
  </div>
</body>
</html>`;
  
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showSuccessMessage('✓ Exported as DOC');
}

// Success message helper
function showSuccessMessage(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.background = '#c6f6d5';
  errorDiv.style.border = '2px solid #48bb78';
  errorDiv.style.color = '#22543d';
  errorDiv.style.display = 'block';
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
    errorDiv.style.background = '#fed7d7';
    errorDiv.style.border = '2px solid #fc8181';
    errorDiv.style.color = '#c53030';
  }, 3000);
}

// Export button click handlers
document.querySelectorAll('.export-option').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent menu from closing immediately
    
    const format = button.getAttribute('data-format');
    const sourceId = button.getAttribute('data-source');
    const text = document.getElementById(sourceId).textContent.trim();
    
    if (!text) {
      showError('No content to export');
      return;
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    const featureName = getFeatureName();
    const filename = `${featureName}_${timestamp}`;
    
    switch (format) {
      case 'txt':
        exportAsTXT(text, filename);
        break;
      case 'pdf':
        exportAsPDF(text, filename);
        break;
      case 'doc':
        exportAsDOC(text, filename);
        break;
      default:
        showError('Unknown export format');
    }
  });
});


