// constants
(function() {
    const CONSTANT = {
        APP_PAGE: '/pages/app/app.html',
        SAFE_LINK_PATTERN: /^https:\/\/(.*).safelinks.protection.outlook.com(.*)/,
    };

    // content.js
    const decypherUrls = async () => {
        const anchorTags = [...document.querySelectorAll('a')];

        const safeLinksTags = anchorTags.filter((anchorTag) => {
            return anchorTag.href && CONSTANT.SAFE_LINK_PATTERN.test(anchorTag.href);
        });

        safeLinksTags.forEach((safeLinkTag) => {
            const safeLinkUrl = new URL(safeLinkTag.href);
            const safeLinkUrlParams = new URLSearchParams(safeLinkUrl.search);
            const targetHref = safeLinkUrlParams.get('url');
            safeLinkTag.href = targetHref;
            safeLinkTag.title = "Decyphered: " + (safeLinkTag.title ? safeLinkTag.title : targetHref);
        });
    }

    decypherUrls();
})();