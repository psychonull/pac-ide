
var template = require('./templates/header.hbs'),
  SettingsModal = require('./Settings');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {

  },

  events: {
    'click #settings': 'showSettings'
  },

  modelEvents: {
    'change:settings': 'render'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showSettings: function(){
    ide.app.modals.show(new SettingsModal({
      model: this.model
    }));
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});