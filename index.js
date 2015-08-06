/*jslint node: true*/
"use strict";

var debug = require('debug')('telegram');

var TelegramBot = require('node-telegram-bot-api');

module.exports = function (cb) {
    return function (coffea) {
        var utils = coffea.utils;

        debug('loading protocol');

        function T(network) {
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
            var bot = coffea.streams[stream_id];

            bot.on('message', function (msg) {
                debug('recv %s', JSON.stringify(msg));
                msg.from.nick = msg.from.username ? msg.from.username : msg.from.id; // alias
                utils.emit(coffea, stream_id, 'message', {
                    "channel": msg.chat.id !== msg.from.id ? msg.chat : undefined, // TODO: use Channel object
                    "user": msg.from, // TODO: use User object
                    "message": msg.text,
                    "telegram": msg
                    // "isAction": isAction,
                    // "tags": msg.tags ? msg.tags : []
                });
            });
        });

        coffea.define('telegram', 'write', function writeTelegram() { });
        // FIXME: this is just a workaround because the irc protocol still calls write to all networks sometimes and we don't handle "send to all networks" in the new system yet

        coffea.define('telegram', 'format.get', function (name) {
            return ''; // telegram doesn't support formatting
        });

        coffea.define('telegram', 'send', function telegramSend(target, msg, network, fn) {
            if (typeof target !== "string") target = target.id;
            T(network).sendMessage(target, msg);
        });

        coffea.loadPlugins(__dirname + '/plugins/');
        debug('protocol initialized');
        if (cb) cb();
    };
};