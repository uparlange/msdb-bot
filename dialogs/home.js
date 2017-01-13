const builder = require('botbuilder');

module.exports = {
    label: '/',
    dialog: [
        function (session, args) {
            session.send("L10N_HELLO");
            session.beginDialog("DIALOG_MENU");
        }
    ]
};