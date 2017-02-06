define(["CommonModule", "IntentsView"],
	function (CommonModule, IntentsView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: IntentsView }
					])
				],
				declarations: [
					IntentsView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function IntentsModule() {

					}
				]
			})
		};
	});