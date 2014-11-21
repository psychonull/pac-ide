
var template = require('./templates/controlList.hbs'),
  Control = require('./Control');

module.exports = Backbone.Marionette.CompositeView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  childView: Control,
  childViewContainer: '.controls-ctn',

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var values = [];

    this.children.each(function(view, i){
      var val = view.getValue();
      values.push(val.value);
    });

    return {
      name: this.model.get('name'),
      value: values
    };
  },

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});