const fs = require('fs');

const EVENTS_DIR = './events';
const RECOGNIZERS_DIR = './recognizers';
const DIALOGS_DIR = './dialogs';

let bot = null;
let defaultLocale = 'fr';

module.exports = {
    init: function (botInstance) {
        bot = botInstance;

        this.setLocale(defaultLocale);

        this._initEvents();

        this._initRecognizers();

        this._initDialogs();

        this._initLogs();
    },
    getLabel: function (key, params) {
        const locale = this.getLocale();
        const labels = require('./locale/' + locale + '/index.json');
        let label = labels[key] || key;
        if (Array.isArray(params)) {
            params.forEach((element, index, array) => {
                label = label.replace('{' + index + '}', element)
            });
        }
        return label;
    },
    setLocale: function (locale) {
        bot.set('localizerSettings', {
            defaultLocale: locale
        });
        // TODO reload recognizers ?
    },
    getLocale: function () {
        const localizerSettings = bot.get('localizerSettings');
        return localizerSettings.defaultLocale;
    },
    _initEvents: function () {
        const files = fs.readdirSync(EVENTS_DIR);
        files.forEach((element, index, array) => {
            const desc = require(EVENTS_DIR + '/' + element);
            const eventName = element.replace('js', '');
            bot.on(eventName, desc.handler);
        });
    },
    _initRecognizers: function () {
        const files = fs.readdirSync(RECOGNIZERS_DIR);
        files.forEach((element, index, array) => {
            const desc = require(RECOGNIZERS_DIR + '/' + element);
            bot.recognizer(desc.recognizer);
        });
    },
    _initDialogs: function () {
        const files = fs.readdirSync(DIALOGS_DIR);
        files.forEach((element, index, array) => {
            const desc = require(DIALOGS_DIR + '/' + element);
            const dialog = bot.dialog(desc.label, desc.dialog);
            if (desc.triggerAction !== undefined) {
                dialog.triggerAction(desc.triggerAction);
            }
            dialog.beginDialogAction(desc.label + '_HELP', 'DIALOG_HELP', { matches: 'INTENT_HELP' });
        });
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