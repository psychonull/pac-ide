
module.exports = {

  renderer: {
    enum: [ 'pac.NativeRenderer', 'pac.PixiRenderer' ],
    default: 'pac.PixiRenderer',
    options: {
      size: { type: pac.Size, default: { width: 800, height: 600 } },
      backgroundColor: pac.Color,
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