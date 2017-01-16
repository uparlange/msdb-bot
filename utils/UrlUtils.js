const BASE_URL = 'https://msdb.lapli.fr';
const BASE_SERVIVE_URL = BASE_URL + '/php/services';

module.exports = {
    getInitServiceUrl: function () {
        return BASE_SERVIVE_URL + '/init.php';
    },
    getSearchServiceUrl: function (gameName, token) {
        return BASE_SERVIVE_URL + '/search.php?params={"description":"' + gameName + '"}&token=' + token;
    },
    getGameSnapUrl: function (gameName) {
        return BASE_URL + '/games/' + gameName + '/snap.png';
    },
    getGameDetailUrl: function (gameName) {
        return BASE_URL + '/#/detail?name=' + gameName;
    }
};