define(function () {
	return ng.core.Class({
		constructor: [ng.http.Http,
		function LocalesModel(Http) {
			this._http = Http;
			this.provider = [];
			this.selectedValue = "fr";
			this._init();
		}
		],
		_init: function () {
			const url = "/api/locales";
			this._http.get(url).subscribe((result) => {
				this.provider = result.json();
			})
		}
	});
});