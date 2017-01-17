const Shell = require('./../Shell');

module.exports = {
    label: 'DIALOG_HELP',
    dialog: [
        function (session, args) {
            const label = Shell.getLabel(args.action);
            if (label !== args.action) {
                session.endDialog(label);
            } else {
                session.endDialog('L10N_NO_CONTEXTUAL_HELP');
            }
        }
    ],
    triggerAction: { matches: 'INTENT_HELP' }
};