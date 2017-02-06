define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("intents")).Class({
			constructor: [ng.http.Http,
			function IntentsView(Http) {
				this._http = Http;
				this.provider = [];
			}
			],
			ngOnInit: function () {
				const url = "/api/intents";
				this._http.get(url).subscribe((result) => {
					this.provider = result.json();
				});
			}
		});
	});