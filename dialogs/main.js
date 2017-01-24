const Shell = require("./../Shell");

module.exports = {
    label: "/",
    dialog: Shell.getDialogDescription([
        function (session) {
            session.beginDialog("DIALOG_MENU");
        }
    ])
};