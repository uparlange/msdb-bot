const restify = require('restify');
const builder = require('botbuilder');
const Shell = require('./Shell');
const fs = require('fs');

// init env

require('dotenv-extended').load();

// init bot

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);

Shell.init(bot);

// init server

const server = restify.createServer();

server.use(restify.gzipResponse());

server.listen(process.env.PORT);

server.post('/api/messages', connector.listen());

server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

server.get(/\/admin\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

server.get(/\/node_modules\/?.*/, restify.serveStatic({
    directory: __dirname
}));

server.get('/api/intents', function (req, res, next) {
    const intents = require('./model/intents.json');
    const regexps = {};
    const locales = [];
    const files = fs.readdirSync('./locale');
    files.forEach((locale) => {
        locales.push(locale);
        regexps[locale] = require('./locale/' + locale + '/regexp');
    });
    intents.forEach((intent) => {
        intent.regexps.forEach((regexp) => {
            regexp.values = [];
            locales.forEach((locale) => {
                regexp.values.push({
                    locale: locale,
                    value: regexps[locale][regexp.id]
                });
            });
        });
    });
    res.send(intents);
    next();
});