define(['backbone','jquery','jquery.fill','underscore'], function(Backbone, $, undef, undef) {

	var ModelView = Backbone.ModelView = Backbone.View.extend({
		initialize: function(options) {
			/**
			 * Options:
			 *	- el
			 *	- model
			 * 	- map: hash mapping from data keys to html selectors
			 * 	- data: function(model) { return model.attributes; }
			 */

			_.bindAll(this,'fill');


			if (!this.el) {
				throw new Error('NO EL in ModelView!');
			}

			var _this = this;

			// maps the data from the model to the elements.
			this.map = options.map || this.map || {};

			// the real map
			this._map = _.invert(this.map);

			/** 
			 * If there is a data parameter in the options, 
			 * we'll try to use it to fill in the display.
			 */
			this.data = options.data || this.data;

			/**
			 * Listen to change events on the model.
			 * Whenever the model changes, the view should update itself.
			 */
			this.listenTo(this.model, 'change', function(model) {
				var data = _this._data();
				_this.fill(data);
			});

			/**
			 * Initialize by filling in the model's data
			 */
			this.fill(this._data());
		},

		/**
		 * Abstracts the process of checking whether there is a data function.
		 */
		_data: function() {
			return typeof this.data === 'function' ? this.data(this.model) : this.model.attributes;
		},

		/**
		 * fill receives an object keyed by attribute name
		 */
		fill: function(data) {
			var _this = this,
				// the data is different from the fillData, as
				// the 'fillData' is keyed by css selector
				// and 'data' is keyed by model attribute
				fillData = {};


			// map the data to the fillData
			_.each(data, function(value, key) {
					// get the selector
				var selector = _this._map[ key ] || key;

				// set the value on the fillData object
				// keyed by selector
				fillData[ selector ] = value;
			});

			/**
			 * use jquery fill to fill in the values on the display
			 */
			this.$el.fill(fillData);
		},
	});

	return ModelView;
});