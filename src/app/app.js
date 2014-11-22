/**
 * Application
 *
 */

/*jshint unused:false */

var ModalRegion = require('./views/ModalRegion'),
  ModalRegionFront = require('./views/ModalRegionFront'),
  Header = require('./views/Header'),
  Router = require('./Router'),

  gameData = require('./data/game'),
  Game = require('./models/Game');

module.exports = function(){

  var app = module.exports = new Backbone.Marionette.Application();

  function initRegions(){
    app.addRegions({
      header: '#header',
      content: '#content',
      modals: ModalRegion,
      modalsFront: ModalRegionFront
    });
  }

  function initGame(){
    app.game = new Game(gameData, { parse: true });
  }

  function initHeader(){
    this.header.show(new Header({
      model: app.game
    }));
  }

  function initRouter(){
    app.router = new Router();

    app.getCurrentRoute = function(){
      return Backbone.history.fragment;
    };

    Backbone.history.start();
  }

  app.addInitializer(initRegions);
  app.addInitializer(initGame);
  app.addInitializer(initHeader);
  app.addInitializer(initRouter);

  window.ide.app = app;
};