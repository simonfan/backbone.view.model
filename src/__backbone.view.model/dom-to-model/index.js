/**
 * @module backbone.view.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	// reads the value from DOM elements.
	var readDomValue = require('./read-dom-value');



	/**
	 * Hash for the parsers. Every parser function is called
	 * within the view's context and takes the value read
	 * from the DOM as arugment.
	 *
	 * @property parsers
	 * @type Object
	 */
	exports.parsers = {};

	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method _initHtmlToModel
	 */
	exports._initHtmlToModel = function _initHtmlToModel() {

		/**
		 * Hash where elements are referenced
		 * by their selector strings.
		 *
		 * @property $els
		 * @type Object
		 */
		this.$els = {};

		// Bind the _updateModel method to this object.
		this._updateModel = _.bind(this._updateModel, this);

		// bind inputs.
		_.each(this.map, function (selector, attribute) {

			this.bindInput(selector, attribute);
		}.bind(this));

		// Listen to changes on input elements
		// within the view and call an update
		// whenever changes occur.
		this.$el.on('change', this.inputSelector, this._updateModel);
	};


	/**
	 * String of tagnames that identify input.
	 *
	 * @property inputSelector
	 * @type String
	 */
	exports.inputSelector = 'input,textarea';


	/**
	 * Binds the value of the element selected to the attribute.
	 *
	 * @method bindInput
	 * @param selector {String|Array}
	 * @param attribute {String}
	 */
	exports.bindInput = function bindInput(selector, attribute) {

		if (_.isArray(selector)) {

			_.each(selector, _.bind(function (sel) {

				this.bindInput(sel, attribute);

			}, this));

		} else {

			// retrieve $el and store it.
			var $el = this.$els[selector] = this.$el.find(selector);

			if ($el.length > 0) {
				$el.data('backbone-view-model-bound-attribute', attribute)
					.data('backbone-view-model-selector', selector);
			}
		}
	};

	/**
	 * Method used to hanlde changes on input elements within
	 * the view.
	 *
	 * Very close-bound to the way bindInput works.
	 *
	 * @method _updateModel
	 * @private
	 * @param e {Event}
	 */
	exports._updateModel = function _updateModel(e) {
			// wrap the target into a jquery object
		var $target = $(e.target),
			// retrieve the attribute that the target is bound to
			attribute = $target.data('backbone-view-model-bound-attribute');

		if (attribute) {
			// only update if the element
			// has an attribute bound to it.

			// [1] retrieve the $el
			var selector = $target.data('backbone-view-model-selector'),
				$el = this.$els[selector];

			// [2] read the value and parse it
			var value = readDomValue($el),
				parse = this.parsers[attribute];

			value = parse ? parse.call(this, value) : value;

			// [3] set.
			this.model.set(attribute, value);
		}
	};

});
