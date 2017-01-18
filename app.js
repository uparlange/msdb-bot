const restify = require('restify');
const builder = require('botbuilder');
const Shell = require('./Shell');

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
server.listen(process.env.PORT);
server.post('/api/messages', connector.listen());
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));