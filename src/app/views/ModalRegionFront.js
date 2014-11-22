/**
 * REGION: ModalRegionFront
 * Used to manage Twitter Bootstrap Modals with Backbone Marionette Views
 * From other Modals, so this region is always at front of other modal
 */

var ModalRegion = require('./ModalRegion');

module.exports = ModalRegion.extend({
  el: '#modals-container-front',
});
