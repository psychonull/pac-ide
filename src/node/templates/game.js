
window.document.title = '/*{{game.settings.name}}*/';

window.onload = function(){

  /*{{game.debug}}*/

  var ctn = document.getElementById('content');

  var game = pac.create(/*{{game.settings}}*/);

  /*{{game.components.loader}}*/
  /*{{game.components.renderer}}*/
  /*{{game.components.input}}*/

  game.use('scenes', {
    /*{{game.scenes}}*/
  });

  game.loader.on('complete', function(){
    game.start('/*{{game.startScene}}*/');
  });

  /*{{game.events}}*/

  game.loader.load();

};