import { refreshNetRequestRules } from './src/modules/c/utils/utils.js';

chrome.runtime.onInstalled.addListener(function () {
  refreshNetRequestRules();
});


chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});