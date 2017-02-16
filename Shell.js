const builder = require("botbuilder");
const fs = require("fs");

const _LOCALE_DIR = "./locale";
const _RECOGNIZERS_DIR = "./recognizers";
const _DIALOGS_DIR = "./dialogs";
const _DIALOG_MAIN = "/";

let _bot = null;
let _locales = [];
let _preferredLocale = "fr";

module.exports = {
    init: function (botInstance) {
        _bot = botInstance;

        this._initLocales();

        this._initEvents();

        this._initRecognizers();

        this._initDialogs();

        this._initEndConversation();

        this._initLogs();
    },
    getLocales: function () {
        return _locales;
    },
    getDialogs: function (name) {
        const result = [];
        const files = fs.readdirSync(_DIALOGS_DIR);
        files.forEach((element) => {
            const file = _DIALOGS_DIR + "/" + element;
            const fileName = element.replace(".js", "");
            const content = fs.readFileSync(file, "utf-8");
            let dialogName = this._getDialogName(fileName);
            if (dialogName === this._getDialogName("MAIN")) {
                dialogName = _DIALOG_MAIN;
            }
            if (name === undefined || name === dialogName) {
                result.push({
                    name: fileName,
                    file: file,
                    content: content,
                    dialogName: dialogName
                });
            }
        });
        return result;
    },
    getDialogDescription: function (dialog) {
        dialog.unshift((session, args, next) => {
            const spl = session.preferredLocale();
            if (_locales.indexOf(spl) === -1) {
                this.setLocale(session, _preferredLocale, () => {
                    next(args);
                });
            } else if (spl !== _preferredLocale) {
                _preferredLocale = spl;
                next(args);
            } else {
                next(args);
            }
        });
        return dialog;
    },
    getLabel: function (key, params) {
        const locale = this.getPreferredLocale();
        const labels = require(_LOCALE_DIR + "/" + locale + "/index.json");
        let label = labels[key] || key;
        if (Array.isArray(params)) {
            params.forEach((element, index) => {
                label = label.replace("{" + index + "}", element)
            });
        }
        return label;
    },
    setLocale: function (session, locale, callback) {
        session.preferredLocale(locale, (err) => {
            if (err) {
                // TODO log ?
            } else {
                _preferredLocale = locale;
            }
            callback();
        });
    },
    getPreferredLocale: function () {
        return _preferredLocale;
    },
    _getDialogName: function (fileName) {
        return "DIALOG_" + fileName.toUpperCase();
    },
    _getIntentName: function (fileName) {
        return "INTENT_" + fileName.toUpperCase();
    },
    _initLocales: function () {
        const dirs = fs.readdirSync(_LOCALE_DIR);
        dirs.forEach((dir) => {
            _locales.push(dir);
        });
    },
    _initEvents: function () {
        _bot.on("conversationUpdate", (message) => {
            /*
            const L10N_HELLO = this.getLabel("L10N_HELLO");
            if (message.membersAdded) {
                message.membersAdded.forEach(identity => {
                    if (identity.id === message.address._bot.id) {
                        const reply = new builder.Message()
                            .address(message.address)
                            .text(L10N_HELLO);
                        _bot.send(reply);
                    }
                });
            }
            */
        });
    },
    _initRecognizers: function () {
        const files = fs.readdirSync(_RECOGNIZERS_DIR);
        files.forEach((element) => {
            const desc = require(_RECOGNIZERS_DIR + "/" + element);
            _bot.recognizer(desc.recognizer);
        });
    },
    _initDialogs: function () {
        const files = this.getDialogs();
        files.forEach((element) => {
            const desc = require(element.file);
            const dialog = _bot.dialog(element.dialogName, desc.dialog);
            if (element.dialogName !== _DIALOG_MAIN) {
                dialog.triggerAction({ matches: this._getIntentName(element.name) });
            }
            dialog.beginDialogAction(element.dialogName + "_HELP", this._getDialogName("HELP"), { matches: this._getIntentName("HELP") });
            dialog.beginDialogAction(element.dialogName + "_CANCEL", this._getDialogName("CANCEL"), { matches: this._getIntentName("CANCEL") });
        });
    },
    _initEndConversation: function () {
        _bot.endConversationAction(this._getDialogName("GOODBYE"), "L10N_SEE_YOU_LATER", { matches: this._getIntentName("GOODBYE") });
    },
    _initLogs: function () {
        _bot.use({
            botbuilder: function (session, next) {
                //.dir(session.message);
                next();
            }
        });
    }
}