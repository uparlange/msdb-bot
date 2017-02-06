define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("test")).Class({
			constructor: [ng.http.Http,
			function TestView(Http) {
				this._http = Http;
				this.phrase = "";
				this.intent = "";
			}
			],
			test: function () {
				const url = "/api/recognize";
				const search = new ng.http.URLSearchParams();
				search.set("phrase", this.phrase);
				this._http.get(url, { search: search }).subscribe((result) => {
					this.intent = JSON.stringify(result.json());
				});
			}
		});
	});