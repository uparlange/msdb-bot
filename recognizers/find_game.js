const builder = require('botbuilder');

module.exports = {
    recognizer: new builder.RegExpRecognizer('INTENT_FIND_GAME', /(trouver|jouer|rechercher)/i)
};