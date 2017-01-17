const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    recognizer: new builder.RegExpRecognizer('INTENT_FIND_GAME', new RegExp(Shell.getLabel('L10N_REGEXP_FIND_GAME'), 'i'))
};