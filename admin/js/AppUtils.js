define(function () {
	return {
		getComponentConfiguration: function (componentName, params) {
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + "-template" + ".html",
				styleUrls: ["css/" + componentName + "-template.css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getModuleName: function (moduleName) {
			return "" + moduleName + "#module";
		}
	};
});