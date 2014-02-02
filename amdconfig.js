require.config({
	urlArgs: 'bust=0.8533447305671871',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'backbone.view.model': 'index',
		jquery: '../bower_components/jquery/jquery',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
