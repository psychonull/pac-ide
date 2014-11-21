
module.exports = {

  renderer: {
    enum: [ 'pac.NativeRenderer', 'pac.PixiRenderer' ],
    default: 'pac.PixiRenderer',
    options: {
      size: { type: pac.Point, default: new pac.Point(800, 600) },
      backgroundColor: String,
      layers: [ String ]
    },
  },

  input: {
    enum: [ 'pac.MouseInput' ],
    //enum: [ 'pac.MouseInput', 'pac.KeyboardInput' ],
    options: {
      enabled: Boolean
    },
  },

  loader: {
    enum: [ 'pac.Loader' ],
    options: false,
  }

};