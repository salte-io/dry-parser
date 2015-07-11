# Dry Parser
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

A simple tool for parsing JavaScript objects to avoid repetition.

> This tool was primarily developed to parse config files.

## Installation
```
$ npm install dry-parser
```
## Usage

### _config.json_

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
var dry = require('dry-parser');
var config = require('./config.json');

// first we want to set dry parsers configuration object.
dry.config = config;

// next we want to parse and convert each of its values.
dry.convert();

// finally we want to bring it back into our config object.
config = dry.config;
```

**_The config object is equivalent to the following._**

```json
{
    "dir": {
        "assets": "assets",
        "less": "assets/less",
        "bower": "assets/pkgs"
    },
    "lib": {
        "jquery": "assets/pkgs/jquery/jquery.js"
    }
}
```

## License
[MIT](https://github.com/arxstudios/dry-parser/blob/master/LICENSE)

[npm-downloads-image]: http://img.shields.io/npm/dm/dry-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dry-parser
[npm-image]: http://img.shields.io/npm/v/dry-parser.svg?style=flat-square
