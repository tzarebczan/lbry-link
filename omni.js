var id = "";
/* set this variable once you've installed the app (it's labeled ID in chrome://extensions)
            (once deployed this will be hard coded and unchanging) */

const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/igm;
var providers = [
    'https://beta.lbry.tv',
];
var lbry_parts, url;

chrome.omnibox.onInputStarted.addListener(function() {
    chrome.management.launchApp(id, function onAppLaunched() {
        chrome.omnibox.onInputEntered.addListener(function(uri) {
            if (uri.indexOf("/") == 0){
                uri = uri.substr(1);
            }

            if(!urlRegex.test(uri)){return;}

            lbry_parts = uri.match(urlRegex);
            url = lbry_parts[1];

            uri = providers[Math.floor(Math.random() * providers.length)] + url;

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabIds) {
                var tabId = tabIds[0].id;
                chrome.tabs.update(tabId, {
                    url: uri
                }, function tabUpdateCallback() {
                    console.log("redirected")
                })
            })

        })
    })
})
