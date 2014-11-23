
window.pac = require('../../pac/src/');

// add custom types for building controls
// TODO: this will be added to PAC later

window.pac.Size = window.pac.Size || 'pac.type.Size';
window.pac.Color = window.pac.Color || 'pac.type.Color';

require('./shim.js');

require('./app')();
