define(['backbone.view.model', 'should', 'backbone', 'text!/test/templates/fruit.html'],
function(ModelView, should, Backbone, fruitTemplate) {

	'use strict';

	describe('ModelView html-to-model', function () {

		beforeEach(function () {

			// jquery elements
			var $fixture =
				$('<div id="fixture"></div>')
					.appendTo($('html'))
					.append(fruitTemplate);

			this.$fixture = $fixture;
			this.$fruit = $fixture.find('#fruit');

			// Backbone cosntructors
			this.FruitView = ModelView.extend({
				map: {
					'name': ['input[name="name"]', '.name', '.name -> attr:href'],
					'colors': 'input[name="colors"]'
				}
			});

		});

		afterEach(function () {
			this.$fixture.remove();
		});

		it('values on the model are modified if the html is changed', function () {

			// instantiate the model for the fruit.
			var fruitModel = new Backbone.Model({
				name: 'Banana',
				colors: ['yellow', 'green']
			});

			// instantiate the fruit view
			var fruitView = new this.FruitView({
				el: this.$fruit,
				model: fruitModel
			});


			// emulate input modifications
			var $fruit = this.$fruit,
				$fname = $fruit.find('input[name="name"]');

			$fname
				.val('Not Banana Anymore!')
				.trigger('change');

			fruitModel.get('name').should.eql('Not Banana Anymore!');

		});
	});
});
