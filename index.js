/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
'use strict';

function elt(id, html) {
	var e = document.getElementById('web-demo-' + id);
	if (html) e.innerHTML = html;
	return e;
}

var Simplicite = require('simplicite');

var debug = false;
var app = Simplicite.session({ url: 'https://demo.dev.simplicite.io', debug: debug }), prd;

app.login({ username: 'website', password: 'simplicite' }).then(function(params) {
	if (debug) console.log('Logged in as ' + params.username);
	return app.getGrant();
}).then(function(grant) {
	if (debug) console.log(grant);
	elt('message', 'Hello ' + grant.getLogin());
	prd = app.getBusinessObject('DemoProduct');
	return prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] });
}).then(function(list) {
	if (debug) console.log(list);
	var l = '<ul>';
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		l += '<li>' +
				'<img alt="Picture" src="data:' + item.demoPrdPicture.mime + ';base64,' + item.demoPrdPicture.content + '"/>' +
				'<h1>' + item.demoPrdName + '</h1>' +
				'<h2>' + item.demoPrdReference + '</h2>' +
				'<p>' + item.demoPrdDescription+ '</p>' +
			'</li>';
	}
	l += '</ul>';
	elt('products', l);
}).catch(function(err) {
	if (debug) console.log(err);
	elt('message', '<div class="error">Error: ' + err.message + ')</div>');
});
