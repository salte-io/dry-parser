# Dry Parser
[![Slack Status][slack-image]][slack-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Travis][travis-ci-image]][travis-ci-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

A simple tool for parsing JavaScript objects to avoid repetition.

> This tool was primarily developed to parse config files.

## Installation

```sh
$ npm install dry-parser
```

## Usage - Parsing an Object
### _config.json - input_

```json
{
    "dir": {
        "assets": "assets",
        "less": "{dir.assets}/less",
        "bower": "{dir.assets}/bower_components"
    },
    "lib": {
        "jquery": "{dir.bower}/jquery/jquery.js"
    }
}
```

### _app.js_

```js
// Load dry-parser.
var dry = require('dry-parser');

// Load our configuration file.
var config = require('./config.json');

// Parse our config and get the real values.
config = dry.parse(config);
```

### _config.json - output_

```json
{
    "dir": {
        "assets": "assets",
        "less": "assets/less",
        "bower": "assets/bower_components"
    },
    "lib": {
        "jquery": "assets/bower_components/jquery/jquery.js"
    }
}
```

## Usage - Bi-Parsing two objects

### _dir.json - input_

```json
{
    "assets": "assets",
    "less": "{assets}/less",
    "bower": "{assets}/bower_components"
}
```

### _lib.json - input_

```json
{
    "jquery": "{bower}/jquery/jquery.js"
}
```

### _app.js_

```js
// Load dry-parser.
var dry = require('dry-parser');

// Load our configuration file.
var dir = require('./dir.json');

var lib = require('./lib.json');

// Parse our config and get the real values.
lib = dry.parse(lib, dir);
```

### _lib.json - output_

```json
{
    "jquery": "assets/bower_components/jquery/jquery.js"
}
```

## License

The MIT License

Copyright (c) 2016 Salte. https://www.salte.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[slack-image]: https://salte-slack.herokuapp.com/badge.svg
[slack-url]: https://salte-slack.herokuapp.com/

[npm-version-image]: http://img.shields.io/npm/v/dry-parser.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/dry-parser.svg?style=flat
[npm-url]: https://npmjs.org/package/dry-parser

[travis-ci-image]: https://img.shields.io/travis/salte-io/dry-parser.svg?style=flat
[travis-ci-url]: https://travis-ci.org/salte-io/dry-parser

[coveralls-image]: https://img.shields.io/coveralls/salte-io/dry-parser/master.svg
[coveralls-url]: https://coveralls.io/github/salte-io/dry-parser

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
