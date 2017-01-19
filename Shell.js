const builder = require('botbuilder');
const fs = require('fs');

const RECOGNIZERS_DIR = './recognizers';
const DIALOGS_DIR = './dialogs';

const DIALOG_MAIN = '/';

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
    getDialogName: function (fileName) {
        return 'DIALOG_' + fileName.toUpperCase();
    },
    getIntentName: function (fileName) {
        return 'INTENT_' + fileName.toUpperCase();
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
            const fileName = element.replace('.js', '');
            let dialogName = this.getDialogName(fileName);
            if (dialogName === this.getDialogName('MAIN')) {
                dialogName = DIALOG_MAIN;
            }
            const dialog = bot.dialog(dialogName, desc.dialog);
            if (dialogName !== DIALOG_MAIN) {
                dialog.triggerAction({ matches: this.getIntentName(fileName) });
            }
            dialog.beginDialogAction(dialogName + '_HELP', this.getDialogName('HELP'), { matches: this.getIntentName('HELP') });
            dialog.beginDialogAction(dialogName + '_CANCEL', this.getDialogName('CANCEL'), { matches: this.getIntentName('CANCEL') });
        });
    },
    _initEndConversation: function () {
        bot.endConversationAction(this.getDialogName('GOODBYE'), 'L10N_SEE_YOU_LATER', { matches: this.getIntentName('GOODBYE') });
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