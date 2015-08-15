/*jslint node: true*/
"use strict";

var debug = require('debug')('telegram');
var debugC = require('debug')('telegram:command');

var TelegramBot = require('node-telegram-bot-api');

module.exports = function (cb) {
    return function (coffea) {
        var utils = coffea.utils;

        debug('loading protocol');

        function getAPI(network) {
            return coffea.streams[network];
        }

        coffea.protocols.telegram = {

            parse: function parseTelegram(config, shortConfig) {
                if (shortConfig) config.token = shortConfig;
                return config;
            },

            setup: function setupTelegram(config) {
                debug('setting up stream');

                var stream = new TelegramBot(config.token, {polling: true});

                debug('setup stream');

                return stream;
            },

            Parser: {}
        }; // TODO: don't define parse and setup like this, maybe just use coffea.define('telegram', {functionname: function () {}})

        coffea.define('telegram', 'connect', function connectTelegram(stream_id) {
            debug('connecting to telegram');
            var bot = getAPI(stream_id);

            bot.getMe().then(function (me) {
                bot.me = me;
                debug('user: %s', JSON.stringify(bot.me));
            });

            function parseTelegramCommand(me, msg) {
                var text = msg.text;
                if (text.charAt(0) === '/') {
                    debugC("command detected: %s", text);

                    var doEmit = false;

                    var message = text.split(' ');
                    debugC("message: %s", JSON.stringify(message));

                    var cmdStr = message.shift();
                    var cmdStrSplit = cmdStr.split('@');
                    debugC("cmdStrSplit: %s", JSON.stringify(cmdStrSplit));
                    var cmd = cmdStrSplit.shift();
                    var username = cmdStrSplit.shift();

                    debugC("cmdStr: %s - cmd: %s - username: %s - me: %s",
                        JSON.stringify(cmdStr),
                        JSON.stringify(cmd),
                        JSON.stringify(username),
                        JSON.stringify(me)
                    );

                    if (username) {
                        if (username === me.username) {
                            doEmit = true;
                            var newText = text.split(' ');
                            newText[0] = cmd; // replace cmdStr with cmd
                            msg.text = newText.join(' '); // this also sets the text for on('message') events!
                        }
                    } else {
                        doEmit = true;
                    }

                    debugC("doEmit: %s", doEmit);

                    if (doEmit) {
                        utils.emit(coffea, stream_id, 'command', {
                            "channel": msg.chat.id !== msg.from.id ? msg.chat : undefined, // TODO: use Channel object
                            "user": msg.from, // TODO: use User object
                            "message": msg.text,
                            "cmd": cmd.substr(1),
                            "args": message,
                            // "isAction": isAction,
                            // "tags": msg.tags ? msg.tags : []
                        });
                    }
                }
                return text;
            }

            bot.on('message', function (msg) {
                debug('recv %s', JSON.stringify(msg));
                msg.from.nick = msg.from.username ? msg.from.username : msg.from.id; // alias
                parseTelegramCommand(bot.me, msg);
                utils.emit(coffea, stream_id, 'message', {
                    "channel": msg.chat.id !== msg.from.id ? msg.chat : undefined, // TODO: use Channel object
                    "user": msg.from, // TODO: use User object
                    "message": msg.text,
                    // "isAction": isAction,
                    // "tags": msg.tags ? msg.tags : []
                });
            });
        });

        coffea.define('telegram', 'write', function writeTelegram() { });
        // FIXME: this is just a workaround because the irc protocol still calls write to all networks sometimes and we don't handle "send to all networks" in the new system yet

        coffea.define('telegram', 'send', function telegramSend(target, msg, network, fn) {
            if (typeof target !== "string") target = target.id;
            getAPI(network).sendMessage(target, msg);
        });

        coffea.loadPlugins(__dirname + '/plugins/');
        debug('protocol initialized');
        if (cb) cb();
    };
};