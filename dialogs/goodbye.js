const Shell = require('./../Shell');

module.exports = {
    label: 'DIALOG_GOODBYE',
    dialog: [
        function (session) {
            session.endConversation(Shell.getLabel('L10N_GOODBYE'));
        }
    ],
    triggerAction: { matches: 'INTENT_GOODBYE' }
};