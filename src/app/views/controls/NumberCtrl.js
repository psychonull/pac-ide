
var template = require('./templates/numberCtrl.hbs'),
  Control = require('./Control');

module.exports = Control.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  ui: {
    'value': '#value'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var val = parseFloat(this.ui.value.val());

    if (!isNaN(val)){
      this.model.set('value', val);
    }
    else if (!this.model.get('default')){
      this.model.unset('value');
    }

    return this.model.toJSON();
  },

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});