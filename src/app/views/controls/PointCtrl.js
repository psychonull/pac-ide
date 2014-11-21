
var template = require('./templates/pointCtrl.hbs'),
  Control = require('./Control');

module.exports = Control.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  ui: {
    'valueX': '#value-x',
    'valueY': '#value-y'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var x = parseFloat(this.ui.valueX.val());
    var y = parseFloat(this.ui.valueY.val());

    if (!isNaN(x) && !isNaN(y)){
      var point = this.model.get('value');

      if (!point){
        point = new pac.Point();
      }

      point.x = x;
      point.y = y;

      this.model.set('value', point);
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