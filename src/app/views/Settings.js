
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
    var settings = this.model.get('settings');
    var components = this.model.get('components');

    this.gameOptions.show(Form.create(define.settings, settings.toJSON()));
    this.components.show(Form.create(define.components, components.toJSON()));
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

    this.model.set('settings', new Backbone.Model(settings));
    this.model.set('components', new Backbone.Model(components));

    this.destroy();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});