module.exports = {
    label: '/',
    dialog: [
        function (session) {
            session.send("L10N_HELLO");
            session.beginDialog("DIALOG_MENU");
        }
    ]
};