
module.exports = {

  settings: {
    name: 'MyGame',
    package: 'mygame',
    fps: 60
  },

  components: {

    renderer: {
      value: 'pac.PixiRenderer',
      options: {
        size: new pac.Point(800, 600),
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