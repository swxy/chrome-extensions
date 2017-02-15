document.addEventListener('DOMContentLoaded', function () {
    var $ = document.querySelector.bind(document);
    var $save = $('#save');
    var $domain = $('#domain');
    var $script = $('#script');
    var $error = $('.error');

    $save.addEventListener('click', function () {
        var dValue = $domain.value.trim();
        var sValue = $script.value.trim();
        if (!dValue || !sValue) {
            show($error);
            return ;
        }

        console.log(dValue, sValue);
        // 保存到本地
        var data = {};
        data[dValue] = sValue;
        chrome.storage.local.set(data, function () {
            console.log('save to local success');
            $domain.value = '';
            $script.value = '';
        });
    });

    $domain.addEventListener('focus', function () {
        hide($error);
    });

    $script.addEventListener('focus', function () {
        hide($error);
    });
});

function hide($dom) {
    $dom.style.display = 'none';
}

function show($dom, display) {
    $dom.style.display = display || 'block';
}

// 监听数据变化，便于调试
chrome.storage.onChanged.addListener(function(changes, namespace) {
    var key;
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});