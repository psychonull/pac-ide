
var template = require('./templates/main.hbs'),
  CreateGame = require('./CreateGame');

module.exports = Backbone.Marionette.ItemView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  events: {
    'click #open': 'openGame',
    'click #create': 'createGame'
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

  openGame: function(){

    LZADialog.selectDir({ nwworkingdir: '/home/user' }, function(file){
      ide.app.setStorage('gamepath', { path: file.path });
      ide.app.router.navigate('game', { trigger: true });
    });

  },

  createGame: function(){
    ide.app.modals.show(new CreateGame());
  },

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});