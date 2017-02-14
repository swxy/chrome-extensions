document.addEventListener('DOMContentLoaded', function () {
    var $ = document.querySelector.bind(document);
    var $save = $('#save');
    var $domain = $('#domain');
    var $script = $('#script');
    var $error = $('.error');

    $save.addEventListener('click', function () {
        if (!$domain.value.trim() || !$script.value.trim()) {
            $error.style.display = 'block';
            return ;
        }

        console.log($domain.value.trim(), $script.value.trim());
    });
});