const builder = require('botbuilder');
const fs = require('fs');

const RECOGNIZERS_DIR = './recognizers';
const DIALOGS_DIR = './dialogs';

let bot = null;
let preferredLocale = 'fr';

module.exports = {
    init: function (botInstance) {
        bot = botInstance;

        bot.set('localizerSettings', {
            defaultLocale: preferredLocale
        });

        this._initEvents();

        this._initRecognizers();

        this._initDialogs();

        this._initEndConversation();

        this._initLogs();
    },
    checkIntent: function (message, regExpKey, intentName) {
        let intent = { score: 0.0 };
        if (message) {
            const regExp = new RegExp(this.getLabel(regExpKey), 'i');
            if (message.search(regExp) !== -1) {
                intent = { score: 1.0, intent: intentName };
            }
        }
        return intent;
    },
    getLabel: function (key, params) {
        const locale = this.getLocale();
        const labels = require('./locale/' + locale + '/index.json');
        let label = labels[key] || key;
        if (Array.isArray(params)) {
            params.forEach((element, index) => {
                label = label.replace('{' + index + '}', element)
            });
        }
        return label;
    },
    setLocale: function (session, locale, callback) {
        session.preferredLocale(locale, (err) => {
            if (err) {
                // TODO log ?
            } else {
                preferredLocale = locale;
            }
            callback();
        });
    },
    getLocale: function () {
        return preferredLocale;
    },
    _initEvents: function () {
        bot.on('conversationUpdate', (message) => {
            const L10N_HELLO = this.getLabel('L10N_HELLO');
            if (message.membersAdded) {
                message.membersAdded.forEach(identity => {
                    if (identity.id === message.address.bot.id) {
                        const reply = new builder.Message()
                            .address(message.address)
                            .text(L10N_HELLO);
                        bot.send(reply);
                    }
                });
            }
        });
    },
    _initRecognizers: function () {
        const files = fs.readdirSync(RECOGNIZERS_DIR);
        files.forEach((element) => {
            const desc = require(RECOGNIZERS_DIR + '/' + element);
            bot.recognizer(desc.recognizer);
        });
    },
    _initDialogs: function () {
        const files = fs.readdirSync(DIALOGS_DIR);
        files.forEach((element) => {
            const desc = require(DIALOGS_DIR + '/' + element);
            const dialog = bot.dialog(desc.label, desc.dialog);
            if (desc.triggerAction !== undefined) {
                dialog.triggerAction(desc.triggerAction);
            }
            dialog.beginDialogAction(desc.label + '_HELP', 'DIALOG_HELP', { matches: 'INTENT_HELP' });
            dialog.beginDialogAction(desc.label + '_CANCEL', 'DIALOG_CANCEL', { matches: 'INTENT_CANCEL' });
        });
    },
    _initEndConversation: function () {
        bot.endConversationAction('DIALOG_GOODBYE', 'L10N_SEE_YOU_LATER', { matches: 'INTENT_GOODBYE' });
    },
    _initLogs: function () {
        bot.use({
            botbuilder: function (session, next) {
                //.dir(session.message);
                next();
            }
        });
    }
}