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

var debug = true;
var app = Simplicite.session({ url: 'https://demo.dev.simplicite.io', debug: debug }), prd;

app.login({ username: 'website', password: 'simplicite' }).then(function(res) {
	app.debug('Logged in as ' + res.username);
	// Get user's details
	return app.getGrant();
}).then(function(grant) {
	app.debug(grant);
	elt('message', 'Hello ' + grant.getLogin());
	// Create object
	prd = app.getBusinessObject('DemoProduct');
	// Get product object's metadata
	return prd.getMetaData(); 
}).then(function(metadata) {
	app.debug(metadata);
	// Search available products (with picture)
	return prd.search({ demoPrdAvailable: true }, { inlineDocuments: [ 'demoPrdPicture' ] });
}).then(function(list) {
	app.debug(list);
	// Display product
	var l = '<ul>';
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		l += '<li>' +
				'<img alt="Picture" src="data:' + item.demoPrdPicture.mime + ';base64,' + item.demoPrdPicture.content + '"/>' +
				'<h1>' + item.demoPrdName + '</h1>' +
				'<h2>' + item.demoPrdReference + ' (' + prd.getFieldListValue('demoPrdType', item) + ')</h2>' +
				'<p>' + item.demoPrdDescription + '</p>' +
			'</li>';
	}
	l += '</ul>';
	elt('products', l);
}).catch(function(err) {
	app.log(err);
	elt('message', '<div class="error">Error: ' + err.message + ')</div>');
});
