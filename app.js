const restify = require('restify');
const builder = require('botbuilder');
const fs = require('fs');

// init env

require('dotenv-extended').load();

// init bot

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector, {
    localizerSettings: {
        defaultLocale: "fr"
    }
});

const recognizerDir = './recognizers';
const recognizers = fs.readdirSync(recognizerDir);
recognizers.forEach((element, index, array) => {
    const recognizerDesc = require(recognizerDir + '/' + element);
    bot.recognizer(recognizerDesc.recognizer);
});

const dialogDir = './dialogs';
const dialogs = fs.readdirSync(dialogDir);
dialogs.forEach((element, index, array) => {
    const dialogDesc = require(dialogDir + '/' + element);
    const dialog = bot.dialog(dialogDesc.label, dialogDesc.dialog);
    if(dialogDesc.triggerAction !== undefined) {
        dialog.triggerAction(dialogDesc.triggerAction);
    }
});

// init server

const server = restify.createServer();
server.listen(process.env.PORT, function () {
    console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));