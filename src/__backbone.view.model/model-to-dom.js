/**
 * @module Backbone.View.Model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		filler = require('jquery.filler');


	/**
	 * Holds the attribute stringifiers.
	 * Every attribute stringifier is called within the view's
	 * context and receives the model's attribute value.
	 *
	 * @property stringifiers
	 */
	exports.stringifiers = {};


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
	 * Method used internally to update the html.
	 *
	 * @method _updateView
	 * @private
	 * @param model
	 */
	exports._updateView = function _updateView(model) {

		var stringifiers = this.stringifiers,
			data = _.mapValues(model.attributes, function (value, attribute) {
				var stringify = stringifiers[attribute];

				// if no stringify is defined, return the value
				return stringify ? stringify.call(this, value) : value;
			});


		console.log(data);

		this.fill(data);
	};
});
