define(["AppUtils", "LocalesModel"],
	function (AppUtils, LocalesModel) {
		return ng.core.Component(AppUtils.getComponentConfiguration("regexps")).Class({
			constructor: [ng.http.Http, ng.router.ActivatedRoute, LocalesModel,
			function RegexpsView(Http, ActivatedRoute, LocalesModel) {
				this._http = Http;
				this._activatedRoute = ActivatedRoute;
				this._activatedRouteQueryParamsSubscriber = null;
				this.locales = LocalesModel;
				this.provider = [];
			}
			],
			ngOnInit: function () {
				this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) => {
					const url = "/api/regexps";
					const search = new ng.http.URLSearchParams();
					search.set("group", params.group);
					this._http.get(url, { search: search }).subscribe((result) => {
						this.provider = result.json();
					});
				});
			},
			ngOnDestroy: function () {
				this._activatedRouteQueryParamsSubscriber.unsubscribe();
			}
		});
	});