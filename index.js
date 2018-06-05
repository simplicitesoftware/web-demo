/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
'use strict';

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
	if (debug) console.log('Logged in as ' + params.username);
	return app.getGrant().then(function(grant) {
		if (debug) console.log(grant);
		elt('user', 'Hello ' + grant.getLogin() + '!');
		prd = app.getBusinessObject('DemoProduct');
		return prd.search(null, { inlineThumbs: true });
	}).then(function(list) {
		if (debug) console.log(list);
		var l = '<table><tbody>';
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			l += '<tr>' +
					'<td><img src="data:image/png;base64,' + item.demoPrdPicture.thumbnail + '"/></td>' +
				 	'<td>' +
						'<div class="name">' + item.demoPrdName + '</div>' +
						'<div class="reference">' + item.demoPrdReference + '</div>' +
						'<div class="description">' + item.demoPrdDescription+ '</div>' +
					'</td>' +
				'</tr>';
		}
		l += '</tbody></table>';
		elt('products', l);
	});
}).fail(function(reason) {
	elt('user', 'ERROR: Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});
