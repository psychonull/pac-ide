
module.exports = function(){

  window.ide = window.ide || {};

  ide.settings = require('./settings');

  if (ide.settings.browser){
    window.idenode = require('./nodemock');
  }

  require('./app')();

  ide.app.start();
};
