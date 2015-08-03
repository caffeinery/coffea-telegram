# coffea-telegram

_telegram plugin for [coffea](https://github.com/caffeinery/coffea/)_


## Setup

 * Make sure to use the latest *unstable* version of coffea by specifying: `"coffea": "caffeinery/coffea#plugin-manager"` in your dependencies
 * Install `coffea-telegram`: `npm install --save coffea-telegram`


## Usage

Make sure to load the plugin:

```javascript
var client = require('coffea')();
client.loadPlugin('coffea-telegram');
```

`coffea-telegram` aims to be compatible with coffea. Of course, features that telegram doesn't have (like joining channels) aren't available for telegram protocols and will result in an error if called on a telegram stream. (If `join` is called in the `motd` event it shouldn't make a difference though, as telegram doesn't emit that event)
