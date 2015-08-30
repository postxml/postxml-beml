var BEML = require('./beml.js');

module.exports = function (opts) {
    return function ($) {

        var beml = new BEML(opts)

        $('*').each(function () {
            var $this = $(this);
            beml.run($this);
        });
    };
};
