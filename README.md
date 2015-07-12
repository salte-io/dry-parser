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
        "less": "{dir.assets}/less", === "assets/less"
        "bower": "{dir.assets}/bower_components" === "assets/bower_components"
    },
    "lib": {
        "jquery": "{dir.bower}/jquery/jquery.js" === "assets/bower_components/jquery/jquery.js"
    }
}
```

### _app.js_

**_VERBOSE_**

```js
// Load dry-parser.
var dry = require('dry-parser');

// Load our configuration file.
var config = require('./config.json');

// Parse our config and get the real values.
config = dry.parse(config);
```

**_CONDENSED_**

```js
// Load dry-parser.
var dry = require('dry-parser');

// Load our configuration file and parse it into the real values.
var config = dry.parse(require('./config.json'));
```

## License
[MIT](https://github.com/arxstudios/dry-parser/blob/master/LICENSE)

[npm-downloads-image]: http://img.shields.io/npm/dm/dry-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dry-parser
[npm-image]: http://img.shields.io/npm/v/dry-parser.svg?style=flat-square
