/**
 * Application
 *
 */

/*jshint unused:false */

var ModalRegion = require('./views/ModalRegion'),
  Header = require('./views/Header'),
  Router = require('./Router');

module.exports = function(){

  var app = module.exports = new Backbone.Marionette.Application();

  function initRegions(){
    app.addRegions({
      header: '.header',
      main: '.content',
      modals: ModalRegion
    });
  }

  function initialize(){
    app.header.show(new Header());
  }

  function initRouter(){
    app.router = new Router();

    app.getCurrentRoute = function(){
      return Backbone.history.fragment;
    };

    Backbone.history.start();
  }

  app.addInitializer(initRegions);
  app.addInitializer(initRouter);
  app.addInitializer(initialize);

  window.ide.app = app;
};