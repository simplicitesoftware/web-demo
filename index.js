'use sctrict';

function elt(id, html) { var e = document.getElementById(id); if (html) e.innerHTML = html; return e; };

var Simplicite = require('simplicite');

var debug = false;

var app = Simplicite.session({
	url: 'https://demo.dev.simplicite.io',
	username: 'website',
	password: 'simplicite',
	debug: debug
}), prd;

app.login().then(function(params) {
	if (debug) console.log(params);
	console.log('Logged in as ' + params.username);
	return app.getGrant().then(function(grant) {
		if (debug) console.log(grant);
		elt('user', 'Hello ' + grant.getLogin() + '!');
		prd = app.getBusinessObject('DemoProduct');
		return prd.search(null, { inlineThumbs: true });
	}).then(function(list) {
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
}, function(reason) {
	elt('user', 'ERROR: Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});
