
module.exports = function(game){

  game.register('event', 'ready', function(){});

  game.register('event', 'start', function(){});
  game.register('event', 'pause', function(){});
  game.register('event', 'resume', function(){});
  game.register('event', 'stop', function(){});

  game.register('event', 'update', function(){});
  game.register('event', 'draw', function(){});

};
