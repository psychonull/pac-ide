
var template = require('./templates/createGame.hbs'),
  Form = require('./controls/Form'),
  Game = require('../models/Game');

var definition = {
  name: String,
  package: String
};

var defaults = {
  name: 'My Game',
  package: 'mygame'
};

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {
    'form': '#form'
  },

  ui: {
    'folder': '#folder',
    'createBtn': '#create'
  },

  events: {
    'click @ui.folder': 'showOpenFolder',
    'change @ui.folder': 'toggleBtnCreate',
    'click @ui.createBtn': 'createGame'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    this.form.show(Form.create(definition, defaults));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showOpenFolder: function(){
    LZADialog.selectDir(
      { nwworkingdir: '/home/user' },
      this.updateFolder.bind(this));
  },

  createGame: function(){
    var btn = this.ui.createBtn.button('loading');

    var game = this.form.currentView.getValue();
    var folder = this.ui.folder.val();

    var self = this;
    Game.create(folder, game, function(err){
      //TODO: check for errors on creating

      btn.button('reset');
      ide.app.router.navigate('game', { trigger: true });
      self.destroy();
    });
  },

  toggleBtnCreate: function(){
    if (this.ui.folder.val().trim().length > 0){
      this.ui.createBtn.removeAttr('disabled','disabled');
    }
    else {
      this.ui.createBtn.attr('disabled','disabled');
    }
  },

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

  updateFolder: function(file){
    if (file && file.path){
      this.ui.folder.val(file.path);
      this.toggleBtnCreate();
    }
  }

});