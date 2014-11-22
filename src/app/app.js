/**
 * Application
 *
 */

/*jshint unused:false */

var ModalRegion = require('./views/ModalRegion'),
  ModalRegionFront = require('./views/ModalRegionFront'),
  Router = require('./Router');

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

  function initMain(){
    var gamepath = app.getStorage('gamepath');

    if (gamepath && gamepath.path){
      app.router.navigate('game', { trigger: true });
    }
  }

  function initRouter(){
    app.router = new Router();

    app.getCurrentRoute = function(){
      return Backbone.history.fragment;
    };

    Backbone.history.start();
  }

  function initStorage(){

    app.setStorage = function(key, value){
      window.localStorage.setItem(key, JSON.stringify(value));
    };

    app.getStorage = function(key){
      var value = window.localStorage.getItem(key);
      if (value){
        return JSON.parse(value);
      }
    };

    app.clearStorage = function(key){
      window.localStorage.removeItem(key);
    };
  }

  app.addInitializer(initStorage);
  app.addInitializer(initRegions);
  app.addInitializer(initRouter);
  app.addInitializer(initMain);

  window.ide.app = app;
};