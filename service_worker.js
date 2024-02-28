import { refreshNetRequestRules } from './src/modules/c/utils/utils.js';

chrome.runtime.onInstalled.addListener(function () {
  refreshNetRequestRules();
});