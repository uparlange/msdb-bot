const Shell = require("./../Shell");

module.exports = {
    label: "/",
    dialog: Shell.getDialog([
        function (session) {
            session.beginDialog("DIALOG_MENU");
        }
    ])
};