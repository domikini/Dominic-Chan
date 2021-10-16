/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("helloworld", {
	// Default module config.
	defaults: {
		text: "Hello World!"
	},

	// Define required scripts.
	getStyles: function () {
		return ["helloworld.css"];
	},

	getTemplate: function () {
		return "helloworld.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
