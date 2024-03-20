import { CONSTANT } from "../constant/constant.js"; // using relative import to avoid component resolve issue in service_worker.js

const getConfiguredNetRequestRules = async () => {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    return existingRules;
}

const getNewNetRequestRules = async () => {
    const rules = [];
    const extensionId = chrome.runtime.id;
    const pageUrl = await chrome.runtime.getURL(CONSTANT.APP_PAGE);
    const rule = {
        "id": 1,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": {
                "regexSubstitution": pageUrl + "?sourceHref=\\0"
            }
        },
        "condition": {
            "excludedInitiatorDomains": [extensionId],
            "regexFilter": "^https://([a-zA-Z0-9.]*).safelinks.protection.outlook.com(.*)",
            "resourceTypes": [
                "main_frame"
            ]
        }
    };
    rules.push(rule);
    return rules;
}

const refreshNetRequestRules = async () => {
    // Get arrays containing new and old rules
    const newRules = await getNewNetRequestRules();
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    const oldRuleIds = oldRules.map(rule => rule.id);

    // update the dynamic rules
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRuleIds,
        addRules: newRules
    });
}


export {
    getConfiguredNetRequestRules,
    refreshNetRequestRules
}