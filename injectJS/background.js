function getHostOfUrl(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return {
        hostname: parser.hostname,
        phost: parser.protocol + parser.hostname,
        host: parser.host
    };
}

function dynamicInject(match) {
    chrome.tabs.executeScript({
        code: match['script'],
        runAt: 'document_start'
    });
}

chrome.webNavigation.onCommitted.addListener(function(e) {
    var url = getHostOfUrl(e.url);
    chrome.storage.local.get(null, function (hosts) {
        var match = hosts[url.hostname] || hosts[url.phost] || hosts[url.host];
        if (match !== undefined) {
            console.log('match rules', match);
            dynamicInject(match);
        }
    })
});