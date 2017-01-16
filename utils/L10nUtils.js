module.exports = {
    getLabel: function (session, key, params) {
        let label = session.localizer.gettext(session.preferredLocale(), key);
        if (Array.isArray(params)) {
            params.forEach((element, index, array) => {
                label = label.replace('{' + index + '}', element)
            });
        }
        return label;
    }
};