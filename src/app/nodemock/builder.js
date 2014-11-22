
var gameData;

module.exports = {

  initGame: function(game, gamePath, done){
    //done && done(new Error()); // to test error path
    done && done();
  },

  getGameData: function(gamePath, done){
    // Fake it and return a pre defined game
    //done && done(new Error()); // to test error path
    done && done(null, gameData());
  },

  saveGameData: function(data, gamePath, replace, done){
    // Fake it
    //done && done(new Error()); // to test error path
    done && done();
  }

};

gameData = function() {

  return {
    settings: {
      name: 'MyGame',
      package: 'mygame',
      fps: 60
    },

    components: {

      renderer: {
        value: 'pac.PixiRenderer',
        options: {
          size: { x: 800, y: 600 },
          backgroundColor: '#000000',
          layers: [ 'background', 'front', '', '', '' ]
        }
      },

      input: {
        value: 'pac.MouseInput',
        options: {
          enabled: true,
        }
      },

      loader: {
        value: 'pac.Loader',
      }

    }
  };
};