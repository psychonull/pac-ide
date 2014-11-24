
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
          size: { width: 800, height: 600 },
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

    },

    assets: {
      textures: { }
    },

    startScene: 'myscene',
/*
    gameobjects: [{
      type: 'prefabs.Kid',
      position: { x: 50, y: 60 },
      texture: 'kid_texture',
      layer: 'front',
      shape: true,
      actions: [ {
        type: 'pac.actions.Run',
        options: {
          velocity: 50
        }
      }],
      animations: kidAnimations,
      size: {
        width: 35,
        height: 60
      },
    }],
*/

    scenes: [{
      type: 'ExampleSceneA',
      options: {
        name: 'myscene',
        size: { width: 800, height: 600 },
        texture: 'school',
      },
      objects: [{

      }]
    }, {
      type: 'ExampleSceneB',
      options: {
        name: 'myscene2',
        size: { width: 800, height: 600 },
        texture: 'school',
      },
      objects: [{

      }]
    }, {
      type: 'ExampleSceneA',
      options: {
        name: 'myscene3',
        size: { width: 800, height: 600 },
        texture: 'school',
      },
      objects: [{

      }]
    }],

    package: {

      scenes: {
        'ExampleSceneA': {
          name: String,
          size: { type: pac.Size },
          texture: pac.Texture,
          myoptionA: Boolean
        },
        'ExampleSceneB': {
          name: String,
          size: { type: pac.Size },
          texture: pac.Texture,
          myoptionB: Boolean,
          testJ: String
        }
      },
/*
      prefabs: {
        'Kid': {
          type: 'pac.Sprite',
          texture: pac.Texture,
          layer: String,
          shape: pac.Shape,
          actions: [ pac.Actions ],
          animations: [ pac.Animation ],
          size: pac.Size
        }
      },
*/
      actions: { },
      animations: { },

      //remove this > it's just one file each event
      //gamestates: { },

    }

  };
};