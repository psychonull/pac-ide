
var template = require('./templates/header.hbs'),
  SettingsModal = require('./Settings'),
  AssetsModal = require('./Assets');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {

  },

  ui: {
    'settings': '#settings',
    'scenes': '#scenes',
    'assets': '#assets',
    'tabOptions': '.tab-option'
  },

  events: {
    'click @ui.settings': 'showSettings',
    'click @ui.assets': 'showAssets',
    'click @ui.scenes': 'showScenes'
  },

  modelEvents: {
    'change:settings': 'render'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  initialize: function(){
    ide.app.router.on('route', this.setCurrentActive.bind(this));
  },

  onRender: function(){
    this.setCurrentActive(ide.app.getCurrentRoute());
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  setCurrentActive: function(route, params) {
    if (typeof this.ui[route] === 'object'){
      this.ui.tabOptions.removeClass('active');
      this.ui[route].parent('li').addClass('active');
    }
  },

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showSettings: function(){
    ide.app.modals.show(new SettingsModal({
      model: this.model
    }));
  },

  showScenes: function(){
    ide.app.router.navigate('scenes', { trigger: true });
  },

  showAssets: function(){
    ide.app.router.navigate('assets', { trigger: true });
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});