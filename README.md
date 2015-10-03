# Dry Parser
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url]

[![Travis][travis-ci-image]][travis-ci-url]

A simple tool for parsing JavaScript objects to avoid repetition.

> This tool was primarily developed to parse config files.

## Installation

```
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
[MIT](https://github.com/arxstudios/dry-parser/blob/master/LICENSE)

[npm-downloads-image]: http://img.shields.io/npm/dm/dry-parser.svg?style=flat
[npm-url]: https://npmjs.org/package/dry-parser
[npm-image]: http://img.shields.io/npm/v/dry-parser.svg?style=flat
[travis-ci-image]: https://img.shields.io/travis/rust-lang/rust.svg?style=flat
[travis-ci-url]: https://travis-ci.org/arxstudios/dry-parser
