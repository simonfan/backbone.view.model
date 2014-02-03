define(['backbone.view.model', 'should', 'backbone', 'text!/test/templates/fruit.html'],
function(ModelView, should, Backbone, fruitTemplate) {

	'use strict';

	describe('ModelView model-to-html data binding', function () {


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
					name: ['input[name="name"]', '.name'],
					colors: 'input[name="colors"]',
					price: ['div[bound-attribute="price"]', '.price']
				}
			});

		});

		afterEach(function () {
			this.$fixture.remove();
		});


		it('values on the html should be initialized to the ones on the model', function () {

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

			// check that the values are correct
			this.$fruit.find('input[name="name"]').val().should.eql('Banana');

			_.map(this.$fruit.find('input[name="colors"]:checked'), function (box) {
				return $(box).val();
			}).should.eql(['green', 'yellow']);

			// set some values..
			fruitModel.set({
				name: 'lalalalalalalala',
				colors: ['red', 'orange']
			});

			// verify that values have changed with

		});

		it('whenever values on the model change, html should follow', function () {
			var fruitModel = new Backbone.Model({
				name: 'Apple',
				colors: ['red', 'yellow', 'green']
			});

			var fruitView = new this.FruitView({
				model: fruitModel,
				el: this.$fruit
			});

			this.$fruit.find('.name').html().should.eql('Apple');

			// set some changes
			fruitModel.set({
				name: 'Melon',
				colors: ['yellow', 'green']
			});

			this.$fruit.find('.name').html().should.eql('Melon');
		});


		it('supports stringify modifications', function () {
			var fruitModel = new Backbone.Model({
				name: 'Pineapple',
				price: 40
			});


			var SaleFruitView = this.FruitView.extend({
				stringifiers: {
					price: function stringifyPrice(price) {
						return 'R$ ' + price + ',00';
					}
				}
			});

			var fruitView = new SaleFruitView({
				model: fruitModel,
				el: this.$fruit
			});

			var $price = this.$fruit.find('div[bound-attribute="price"]');
			$price.html().should.eql('R$ 40,00')
		})
	});
});
