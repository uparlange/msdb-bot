const Shell = require('./../Shell');

module.exports = {
    dialog: [
        function (session, args) {
            const label = Shell.getLabel(args.action);
            if (label !== args.action) {
                session.endDialog(label);
            } else {
                session.endDialog('L10N_NO_CONTEXTUAL_HELP');
            }
        }
    ]
};