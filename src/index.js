//     Backbone.View.Model
//     (c) simonfan
//     Backbone.View.Model is licensed under the MIT terms.

/**
 * @module Backbone.View.Model
 */

define(function (require, exports, module) {
	'use strict';

	var Backbone = require('backbone'),
		_ = require('lodash');

	var ModelView = module.exports = Backbone.View.extend({

		/**
		 * Parses out options, checks for requirements and
		 * summons the initializers.
		 *
		 * @method initialize
		 * @param options {Object}
		 *     @param el*,
		 *     @param model
		 */
		initialize: function (options) {

			// el is a requirement
			if (!this.$el) { throw new Error('No given $el on ModelView initialization.'); }

			// make sure there is a model
			this.model = _.isFunction(this.model) ? new this.model() : this.model;

			// MODEL -> DOM
			this._initModelToHtml();

			// DOM INPUT -> MODEL
			this._initHtmlToModel();
		}
	})
	.extend(require('./__backbone.view.model/dom-to-model/index'))
	.extend(require('./__backbone.view.model/model-to-dom'));
});
