var items = [17,18,19,20,24,25,29,30,35,36,37,38,39,40,41,42,44,45,46,47,48,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,115,116,117,118,129,135,149,152,156,157,160];

var nos = [];

function removeEle () {
  //var items = localStorage.getItem('items').split(',');
  for(var i = items.length - 1; i >=0; i--) {
    $('tr').eq(Number(items[i]) + 6).remove();
  }
  console.log('remove element done');
}

function reloadPage () {
	setTimeout(function(){
		console.log('reload page');
		location.reload();
	}, 90000);
}

function selectItem (item) {
	console.log('select... ' + item.parent().next().text());
	localStorage.setItem('no', nos);
	item.click();
	$('input[type="submit"]:first').click();
}

function removeItem () {
	var time = localStorage.getItem('time');

	if (!time) {
		localStorage.setItem('time', new Date().getTime());
	}
	else if (new Date().getTime() - Number(time) > 1000 * 60 * 30) {
		localStorage.setItem('time', new Date().getTime());
		localStorage.setItem('no', []);
	}
}

function isEnough() {
	return $('input[type="checkbox"]:checked').length === 2;
}

function main() {
	var selected = $('input[type="checkbox"]:not(:disabled)');
	console.log('there are ' + selected.length + ' can be selected' );


	if (selected.length) {
		var lastArr = localStorage.getItem('no').split(',');
		var idx = 0;
		var $item;
		var no;
		while (idx < selected.length ) {
			$item = selected.eq(idx++);
			no = $item.parent().next().text();
			nos.push(no);
			if (lastArr.indexOf(no) == -1) {
				selectItem($item);
				break;
			}
			else {
				console.log('cannot select ' + no);
			}
		}
		if (idx === selected.length) {
			reloadPage();
		}
	}
	else {
		reloadPage();
	}
}

if (!isEnough()) {
	removeEle();
	removeItem();
	main();
}
else {
	console.log('course is enough.......');
}