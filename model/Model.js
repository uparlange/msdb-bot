const builder = require("botbuilder");
const Shell = require("./../Shell");

const _LOCALE_DIR = "./locale";

module.exports = {
    getIntents: function () {
        return require("./intents.json");
    },
    getEntities: function (name) {
        const entities = require("./entities.json");
        let result = [];
        if (name !== undefined) {
            entities.forEach((entity) => {
                if (entity.name === name) {
                    result.push(entity);
                }
            });
        } else {
            result = entities;
        }
        return result;
    },
    getRegexps4locale: function (locale) {
        return require(_LOCALE_DIR + "/" + locale + "/regexp.json");
    },
    getRegexps: function (group) {
        const result = [];
        const locales = Shell.getLocales();
        locales.forEach((locale) => {
            const regexps = this.getRegexps4locale(locale);
            regexps.forEach((regexp) => {
                if (group === undefined || regexp.group === group) {
                    result.push({
                        group: regexp.group,
                        value: regexp.value,
                        locale: locale
                    });
                }
            });
        });
        return result;
    },
    recognize: function (message) {
        let result = null;
        if (message) {
            result = this._getIntent(message);
        }
        if (result === null) {
            result = { score: 0.0 };
        }
        return result;
    },
    _getIntent: function (message) {
        let result = null;
        const intents = this.getIntents();
        const regexps = this.getRegexps4locale(Shell.getPreferredLocale());
        regexps.forEach((regexp) => {
            const regexpGroup = regexp.group;
            if (message.search(new RegExp(regexp.value, "i")) !== -1) {
                intents.forEach((intent) => {
                    if (regexpGroup === intent.regexpGroup) {
                        result = {
                            score: 1.0,
                            intent: intent.name,
                            entities: this._getEntities(message, intent.entities)
                        };
                        return;
                    }
                });
            }
            if (result !== null) {
                return;
            }
        });
        return result;
    },
    _getEntities: function (message, entities) {
        return [];
    }
};