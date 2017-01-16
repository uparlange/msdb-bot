const BASE_URL = 'https://msdb.lapli.fr/php/services';

module.exports = {
    getInitUrl: function () {
        return BASE_URL + '/init.php';
    },
    getSearchUrl: function (gameName, token) {
        return BASE_URL + '/search.php?params={"description":"' + gameName + '"}&token=' + token;
    }
};