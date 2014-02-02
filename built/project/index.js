//     Backbone.View.Model
//     (c) simonfan
//     Backbone.View.Model is licensed under the MIT terms.

define(["require","exports","module","backbone","lodash","./__backbone.view.model/html-to-model","./__backbone.view.model/model-to-html"],function(e,t,n){var r=e("backbone"),i=e("lodash"),s=n.exports=r.View.extend({initialize:function(e){if(!this.$el)throw new Error("No given $el on ModelView initialization.");this.model=i.isFunction(this.model)?new this.model:this.model,this._initModelToHtml(),this._initHtmlToModel()}}).extend(e("./__backbone.view.model/html-to-model")).extend(e("./__backbone.view.model/model-to-html"))});