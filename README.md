![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250.png)
* * *

Web demo
========

This project is a **very basic** web front-end demo using the [Simplicit&eacute;&reg; node.js &amp; browser library](https://github.com/simplicitesoftware/nodejs-api)
to connect to a Simplicité® demo backend instance from the **client-side**.

Prerequisites:

	sudo npm install -g browserify uglify-js watchify

Install:

	npm install

Run in watch mode:

	npm run watch

Build:

	npm run build

Frameworks tips &amp; tricks
----------------------------

### Angular&reg;

In [Angular&reg;](https://angular.io) you can include the Simplicit&eacute;&reg; node.js &amp; browser library like this
(after adding the dependency `"simplicite": "latest"`in the `package.json`):

```typescript
import Simplicite from 'simplicite';
```

Then you can start an application session by:

```typescript
 let app = Simplicite.session({ /* Your application's parameters */});
```

The usage is similar to the example of this repository.

### Vue

_To be competed_

License
=======

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

[](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

