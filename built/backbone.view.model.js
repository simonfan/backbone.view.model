//     Backbone.View.Model
//     (c) simonfan
//     Backbone.View.Model is licensed under the MIT terms.

define("__backbone.view.model/html-to-model",["require","exports","module","lodash","jquery"],function(e,t){var i=e("lodash"),o=e("jquery");t._initHtmlToModel=function(){this.$map={},this._updateModel=i.bind(this._updateModel,this),i.each(this.map,function(e,t){this.bindInput(e,t)}.bind(this)),this.$el.on("change",this.inputSelector,this._updateModel)},t.inputSelector="input,textarea",t.bindInput=function(e,t){if(i.isArray(e))i.each(e,i.bind(function(e){this.bindInput(e,t)},this));else{var o=this.$el.find(e);this.$map[e]=o,o.data("bound-attribute",t).data("backbone-view-model-selector",e)}},t.$readers={"default":function(e){return e.val()},DIV:function(e){return e.html()},INPUT:function(e){return"checkbox"===e.prop("type")?i.map(e.filter(":checked"),function(e){return o(e).val()}):e.val()}},t.valueOf=function(e){var t=this.$map[e];t||(t=this.$map[e]=this.$el.find(e));var i=t.prop("tagName"),o=this.$readers[i]||this.$readers["default"];return o(t)},t._updateModel=function(e){var t=o(e.target),i=t.data("bound-attribute");if(console.log(i),i){var n=t.data("backbone-view-model-selector"),l=this.valueOf(n);this.model.set(i,l)}}}),define("__backbone.view.model/model-to-html",["require","exports","module","lodash","jquery.filler"],function(e,t){var i=e("lodash"),o=e("jquery.filler");t._initModelToHtml=function(){this.fill=o(this.$el,this.map),this._updateView=i.bind(this._updateView,this),this.listenTo(this.model,"change",this._updateView),this._updateView(this.model)},t.data=function(e){return e.attributes},t._updateView=function(e){if(1===this.data.length){var t=this.data(e);this.fill(t)}else this.data(e,i.bind(this.fill,this))}}),define("backbone.view.model",["require","exports","module","backbone","lodash","./__backbone.view.model/html-to-model","./__backbone.view.model/model-to-html"],function(e,t,i){{var o=e("backbone"),n=e("lodash");i.exports=o.View.extend({initialize:function(){if(!this.$el)throw new Error("No given $el on ModelView initialization.");this.model=n.isFunction(this.model)?new this.model:this.model,this._initModelToHtml(),this._initHtmlToModel()}}).extend(e("./__backbone.view.model/html-to-model")).extend(e("./__backbone.view.model/model-to-html"))}});