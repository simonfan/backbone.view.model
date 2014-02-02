/**
 * @module backbone.view.model
 * @submodule html-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

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
		 * @property $map
		 * @type Object
		 */
		this.$map = {};

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

			var $el = this.$el.find(selector);

			this.$map[selector] = $el;

			$el.data('bound-attribute', attribute)
				.data('backbone-view-model-selector', selector);
		}
	};

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property $readers
	 * @type Object
	 */
	exports.$readers = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {
			if ($el.prop('type') === 'checkbox') {
				return _.map($el.filter(':checked'), function (el) {
					return $(el).val();
				});

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method valueOf
	 * @param selector {String}
	 */
	exports.valueOf = function valueOf(selector) {

		// [1] retrieve $el
		var $el = this.$map[selector];

		if (!$el) {
			// if no el is in cache, find it.
			$el = this.$map[selector] = this.$el.find(selector);
		}

		// [2] retrieve reader function
		var tagName = $el.prop('tagName'),
			// retrieve the reader
			reader = this.$readers[tagName] || this.$readers['default'];

		// [3] read and return.
		return reader($el);
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
			attribute = $target.data('bound-attribute');

		console.log(attribute);

		if (attribute) {
			// only update if the element
			// has an attribute bound to it.

			var selector = $target.data('backbone-view-model-selector'),
				value = this.valueOf(selector);

			this.model.set(attribute, value);
		}
	};

});
