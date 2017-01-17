const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    recognizer: new builder.RegExpRecognizer('INTENT_INFO', new RegExp(Shell.getLabel('L10N_REGEXP_INFO'), 'i'))
};