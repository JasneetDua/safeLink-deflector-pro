import { LightningElement } from 'lwc';

export default class App extends LightningElement {


    sourceHref;
    targetHref;
    isLoading = false;

    connectedCallback() {
        this.init();
    }

    async init() {
        const sourceHref = window.location.search.replace(/^(\?sourceHref\=)/, ''); // removes starting ?sourceHref=
        this.sourceHref = sourceHref;
        const sourceUrl = new URL(sourceHref);
        const sourceUrlParams = new URLSearchParams(sourceUrl.search);
        const targetHref = sourceUrlParams.get('url');
        this.targetHref = targetHref;

        // Check if sourceHref is available
        if (targetHref) {
            // Check configuration for automatic redirection
            // TODO: if manual then do nothing else automatic then redirect accordingly 

            // Check if the domain is in the bypass list
            const result = await chrome.storage.sync.get(['bypassHosts']);
            const bypassHosts = result.bypassHosts || {};
            const hostname = new URL(sourceHref).hostname;
            if (bypassHosts.hasOwnProperty(hostname)) {
                // Bypass Microsoft SafeLink and navigate to the original link
                window.open(targetHref, '_self');
            } 
            else {
                // Redirect to the SafeLink original URL
                window.open(sourceHref, '_self');
            }
        } else {
            // If sourceHref is not available, handle the situation accordingly
            console.error('sourceHref parameter is missing.');
            // Redirect to an error page or handle the error in a different way
        }
    }

    // handle on screen action
    handleAction(event) {
        const { action } = event.currentTarget.dataset;
        if (action == 'source') {
            window.open(this.sourceHref, '_self');
        }
        else if (action == 'target') {
            window.open(this.targetHref, '_self');
        }
    }
}