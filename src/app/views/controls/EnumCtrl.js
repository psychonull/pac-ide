
var template = require('./templates/enumCtrl.hbs');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'control',
  template: template,

  regions: {
    'roptions': '#options'
  },

  ui: {
    'enum': '#enum'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  withOptions: false,

  onRender: function(){
    var val = this.model.get('value'),
      options = this.model.get('options');

    if (options){
      val = val.value;
      this.roptions.show(this.optionsForm);
      this.withOptions = true;
    }

    if (!val){
      val = this.model.get('default');
    }

    if (val){
      this.ui.enum.val(val);
    }
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var val = this.model.get('value'),
      selected = this.ui.enum.val();

    if (this.withOptions){
      val.value = selected;
      val.options = this.roptions.currentView.getValue();
    }
    else {
      val = selected;
    }

    this.model.set('value', val);
    return this.model.toJSON();
  },

  setOptionsForm: function(form){
    this.optionsForm = form;
  },

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});