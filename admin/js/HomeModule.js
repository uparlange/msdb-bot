define(["CommonModule", "HomeView"],
	function (CommonModule, HomeView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: HomeView }
					])
				],
				declarations: [
					HomeView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function HomeModule() {

					}
				]
			})
		};
	});