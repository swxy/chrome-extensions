function getHostOfUrl(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return {
        hostname: parser.hostname,
        phost: parser.protocol + '//' + parser.hostname,
        host: parser.host
    };
}

function dynamicInject(match) {
    console.log('inject script');
    chrome.tabs.executeScript({
        code: match['script'],
        runAt: 'document_start'
    });
}

chrome.webNavigation.onCommitted.addListener(function (e) {
    var url = getHostOfUrl(e.url);
    chrome.storage.local.get(null, function (hosts) {
        var match = hosts[url.hostname] || hosts[url.phost] || hosts[url.host];
        if (match !== undefined && match.checked) {
            console.log('match rules', match);
            dynamicInject(match);
        }
    })
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (sender.tab && request.action === 'close') {
            chrome.tabs.remove(sender.tab.id, function () {
                console.log('success');
                sendResponse({result: 'success'});
            })
        }
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
    });