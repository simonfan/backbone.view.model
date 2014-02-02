//     Backbone.View.Model
//     (c) simonfan
//     Backbone.View.Model is licensed under the MIT terms.

/**
 * @module Backbone.View.Model
 */

define(function (require, exports, module) {
	'use strict';

	var Backbone = require('backbone'),
		_ = require('underscore'),
		filler = require('jquery.filler');

	var ModelView = module.exports = Backbone.Model.extend({

		/**
		 *
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

			/**
			 * The function that will fill in html for us.
			 * Uses jquery.filler to build a cache of the
			 * jquery DOM selections.
			 *
			 * @method fill
			 * @param data {Object}
			 */
			this.fill = filler(this.$el, this.map);


			// Listen to changes on attributes
			// defined at the map.
			// Any changes there should reflect
			// changes on the view.
			this.listenTo(this.model, 'change', _.bind(function(model) {

				if (this.data.arguments.length === 1) {
					// sync
					var data = this.data(model);
					this.fill(data);

				} else {

					// asynchronous!
					this.data(model, _.bind(this.fill, this))
				}

			}, this));

		},

		/**
		 * Holds the data mapping as
		 * { propName: selector(s) }.
		 *
		 * MUST! be overriden.
		 *
		 * @property map
		 * @type Object
		 */
		map: void(0),

		/**
		 * Immediately before updating the view,
		 * this method is called, so that we may return a
		 * data object.
		 *
		 * If the function names the second argument,
		 * the function is then ran asynchronously.
		 *
		 * @method data
		 * @param model {Backbone.Model}
		 * @param [done] {Function}
		 */
		data: function data(model /* done */) {
			return model.changedAttributes();
		},

	});
});
