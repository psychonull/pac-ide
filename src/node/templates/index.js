
module.exports = function(game){

  require('./scenes')(game);
  require('./prefabs')(game);
  require('./actions')(game);
  require('./animations')(game);
  require('./events')(game);

};
