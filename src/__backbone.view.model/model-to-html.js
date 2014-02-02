/**
 * @module Backbone.View.Model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		filler = require('jquery.filler');

	/**
	 * Initialization logic for binding model
	 * attributes to html elements.
	 *
	 * @method _initModelToHtml
	 */
	exports._initModelToHtml = function _initModelToHtml() {

		/**
		 * The function that will fill in html for us.
		 * Uses jquery.filler to build a cache of the
		 * jquery DOM selections.
		 *
		 * @method fill
		 * @param data {Object}
		 */
		this.fill = filler(this.$el, this.map);


		// bind the update view method
		this._updateView = _.bind(this._updateView, this);

		// Listen to changes on attributes
		// defined at the map.
		// Any changes there should reflect
		// changes on the view.
		this.listenTo(this.model, 'change', this._updateView);

		// Set initial values
		this._updateView(this.model);
	};

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
	exports.data = function data(model /* done */) {

		// we may return the model's attributes by default,
		// because jquery.filler has cached the attributes that
		// need DOM change and those that do not need.
		//
		// otherwise, we would return model.changedAttributes()
		// for better performance.
		return model.attributes;
	};

	/**
	 * Method used internally to update the html.
	 *
	 * @method _updateView
	 * @private
	 * @param model
	 */
	exports._updateView = function _updateView(model) {

		if (this.data.length === 1) {
			// sync
			var data = this.data(model);
			this.fill(data);

		} else {

			// asynchronous!
			this.data(model, _.bind(this.fill, this));
		}
	};
});
