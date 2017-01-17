const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    label: 'DIALOG_GOODBYE',
    dialog: [
        function (session, args) {
            session.endConversation(Shell.getLabel('L10N_GOODBYE'));
        }
    ],
    triggerAction: { matches: 'INTENT_GOODBYE' }
};