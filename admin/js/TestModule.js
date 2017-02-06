define(["CommonModule", "TestView"],
	function (CommonModule, TestView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: TestView }
					])
				],
				declarations: [
					TestView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function TestModule() {

					}
				]
			})
		};
	});