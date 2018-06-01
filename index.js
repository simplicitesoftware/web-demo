'use sctrict';

var debug = true;
var app = require('simplicite').session({
        url: 'https://demo.dev.simplicite.io',
        username: 'website',
        password: 'simplicite',
        debug: debug
});

app.login().then(function(params) {
        if (debug) console.log(params);
        console.log('Logged in as ' + params.username);
        return app.getGrant(); // next promise
}, function(reason) {
        app = undefined;
        console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
}).then(function(grant) {
        if (!app) return;
        if (debug) console.log(grant);
        document.getElementById('root').innerHTML = 'Hello ' + grant.getLogin() + ' (' + grant.getFirstName() + ' ' + grant.getLastName() + ')!';
})
