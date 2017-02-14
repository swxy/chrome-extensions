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
        var data = {};
        data[dValue] = sValue;
        chrome.storage.local.set(data);
        console.log('save to local success');
        $domain.value = '';
        $script.value = '';
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