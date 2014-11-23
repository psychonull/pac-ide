var chai = require('chai');
var expect = chai.expect;

window.pac = require('../../../../pac/src/');

window.pac.Size = window.pac.Size || 'pac.type.Size';
window.pac.Color = window.pac.Color || 'pac.type.Color';

require('../../../src/shim.js');

describe('PAC IDE', function(){

  require('./Controls');

});
