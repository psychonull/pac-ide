
var template = require('./templates/sizeCtrl.hbs'),
  Control = require('./Control');

module.exports = Control.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  ui: {
    'width': '#width',
    'height': '#height'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var width = parseFloat(this.ui.width.val());
    var height = parseFloat(this.ui.height.val());

    if (!isNaN(width) && !isNaN(height)){
      var size = this.model.get('value');

      if (!size){
        size = { width: 0, height: 0 };
      }

      size.width = width;
      size.height = height;

      this.model.set('value', size);
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