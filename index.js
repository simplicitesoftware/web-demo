'use sctrict';

function elt(id, html) { var e = document.getElementById(id); if (html) e.innerHTML = html; return e; };

var Simplicite = require('simplicite');

var debug = false;
var app = Simplicite.session({
	url: 'https://demo.dev.simplicite.io',
	username: 'website',
	password: 'simplicite',
	debug: debug
});
var prd;

app.login().then(function(params) {
	if (debug) console.log(params);
	console.log('Logged in as ' + params.username);
	return app.getGrant(); // next promise
}, function(reason) {
	app = null;
	var msg = 'Login failed (status: ' + reason.status + ', message: ' + reason.message + ')';
	console.error(msg);
	elt('user', msg);
}).then(function(grant) {
	if (!app) return;
	if (debug) console.log(grant);
	elt('user', 'Hello ' + grant.getLogin() + '!');
	prd = app.getBusinessObject('DemoProduct');
	return prd.search(null, { inlineThumbs: true }); // next promise
}).then(function(list) {
	if (!app) return;
	if (debug) console.log(list);
	var l = '<table class="products"><tbody>';
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		l += '<tr><td><img src="data:image/png;base64,' + item.demoPrdPicture.thumbnail + '"/></td>';
		l += '<td><div class="name">' + item.demoPrdName + '</div><div class="reference">' + item.demoPrdReference + '</div></td></tr>';
	}
	l += '</tbody></table>';
	elt('products', l);
});
