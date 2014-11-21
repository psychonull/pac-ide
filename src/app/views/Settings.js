
var template = require('./templates/settings.hbs'),
  Form = require('./controls/Form');

var define = {
  settings: require('../define/settings'),
  components: require('../define/components')
};

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {
    'gameOptions': '#game-options',
    'components': '#components'
  },

  events: {
    'click #save': 'saveChanges'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    var game = this.model.toJSON();

    this.gameOptions.show(Form.create(define.settings, game.settings));
    this.components.show(Form.create(define.components, game.components));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  saveChanges: function(){
    var settings = this.gameOptions.currentView.getValue();
    var components = this.components.currentView.getValue();

    this.model.set('settings', settings);
    this.model.set('components', components);

    this.destroy();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});