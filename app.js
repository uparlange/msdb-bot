const restify = require("restify");
const builder = require("botbuilder");
const Shell = require("./Shell");
const Model = require("./model/Model");
const fs = require("fs");

// init env

require("dotenv-extended").load();

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
server.use(restify.queryParser());

server.listen(process.env.PORT);

server.post("/api/messages", connector.listen());

server.get("/api/locales", function (req, res, next) {
    res.send(Shell.getLocales());
    next();
});

server.get("/api/intents", function (req, res, next) {
    res.send(Model.getIntents());
    next();
});

server.get("/api/entities", function (req, res, next) {
    res.send(Model.getEntities(req.query.name));
    next();
});

server.get("/api/regexps", function (req, res, next) {
    res.send(Model.getRegexps(req.query.group));
    next();
});

server.get("/api/dialogs", function (req, res, next) {
    res.send(Shell.getDialogs(req.query.name));
    next();
});

server.get(/\/admin\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: "index.html"
}));

server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: "index.html"
}));

server.get(/\/node_modules\/?.*/, restify.serveStatic({
    directory: __dirname
}));