define(["app:CommonModule", "app:RegexpsView"],
	function (CommonModule, RegexpsView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: RegexpsView }
					])
				],
				declarations: [
					RegexpsView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function RegexpsModule() {

					}
				]
			})
		};
	});