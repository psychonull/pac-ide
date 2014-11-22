
var template = require('./templates/create.hbs'),
  Form = require('../controls/Form'),
  Scene = require('../../models/Scene');

var sceneDef = require('../../define/scene');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {
    'form': '#form'
  },

  events: {
    'click #save': 'saveChanges'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    var components = this.model.get('components'),
      gameSize = components.get('renderer').options.size;

    sceneDef.size.default = gameSize;
    this.form.show(Form.create(sceneDef));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  saveChanges: function(){
    var newScene = this.form.currentView.getValue();

    //TODO: check if the scene name exists

    this.model.get('scenes').add(new Scene(newScene));
    this.destroy();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});