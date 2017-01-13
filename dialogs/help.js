const builder = require('botbuilder');

module.exports = {
    label: 'DialogHelp',
    dialog: [
        function (session, args) {
            session.send("Aide");
            session.endDialog();
        }
    ],
    triggerAction: { matches: 'INTENT_HELP' }
};