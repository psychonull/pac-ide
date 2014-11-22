
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
    var data = this.model.toJSON();

    this.gameOptions.show(Form.create(define.settings, data.settings));
    this.components.show(Form.create(define.components, data.components));
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

    this.model.save();

    this.destroy();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});