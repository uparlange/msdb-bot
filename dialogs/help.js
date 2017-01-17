const builder = require('botbuilder');

module.exports = {
    label: 'DIALOG_HELP',
    dialog: [
        function (session, args) {
            switch (args.action) {
                default:
                    session.endDialog(args.action);
                    break;
            }
        }
    ],
    triggerAction: { matches: 'INTENT_HELP' }
};