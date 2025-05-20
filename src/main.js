/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
'use strict';

import styles from './styles.less'; // eslint-disable-line no-unused-vars
import simplicite from 'simplicite';

// Explicit URL needed for a standalone deployment, remove it when deploying in Simplicité
const app = simplicite.session({ url: 'https://demo.dev2.simplicite.io', debug: false });

app.info(`Version: ${app.getModuleVersion()}`);
elt('version', app.getModuleVersion());

let prd;

function elt(id, html) {
  const el = document.getElementById(`web-demo-${id}`);
  if (el && html) el.innerHTML = html;
  return el;
}

function error(err) {
  app.error(err);
  elt('message', `<div class="error">Error: ${err.message}</div>`);
}

function display() {
  prd.search({ demoPrdAvailable: true }, { inlineDocuments: [ 'demoPrdPicture' ] }).then(() => {
    let l = '<ul>';
    for (const item of prd.list)
      l += '<li>' +
          (item.demoPrdPicture ? `<img alt="Picture" src="data:${item.demoPrdPicture.mime};base64,${item.demoPrdPicture.content}"/>` : '') +
          `<h1>${item.demoPrdName}</h1>` +
          `<h2>${item.demoPrdReference} (${prd.getFieldListValue('demoPrdType', item)})</h2>` +
          `<p>${item.demoPrdDescription}</p>` +
        '</li>';
    l += '</ul>';
    elt('products', l);
  });
}

function save() {
  prd.save().then(display).catch(error);
}

app.login({ username: 'website', password: 'simplicite' }).then(user => {
  app.debug('Logged in as ' + user.login);
  // Get user's details
  return app.getGrant();
}).then(grant => {
  app.debug(grant);
  elt('message', `Hello ${grant.getLogin()}`);
  // Get object
  prd = app.getBusinessObject('DemoProduct');
  // Get product object's metadata
  return prd.getMetaData();
}).then(metadata => {
  app.debug(metadata);
  elt('product-add').onclick = () => {
    // Create new product
    prd.getForCreate().then(item => {
      app.debug(item);
      prd.item.demoPrdSupId = 1;
      prd.item.demoPrdType = 'OTHER';
      prd.item.demoPrdReference = elt('product-ref').value;
      prd.item.demoPrdName = elt('product-name').value;
      var file = elt('product-picture').files[0];
      if (file)
        new simplicite.Doc().load(file).then(doc => {
          prd.item.demoPrdPicture = doc;
          save();
        });
      else
        save();
    });
  };
  display();
}).catch(error);
