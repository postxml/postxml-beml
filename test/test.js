var plugin = require('../');
var postxml = require('postxml');
var expect = require('chai').expect;

var test = function (input, output, opts) {

    var proccessed = postxml(input, [plugin(opts)]);

    expect(proccessed).to.eql(output);
};

describe('poxtxml-beml', function () {
    it('blocks', function () {
        test(
            '<div block="animals"><div block="unicorn"></div></div>',
            '<div class="animals"><div class="unicorn"></div></div>'
        );
    });
    it('elemets', function () {
        test(
            '<div block="animals"><div elem="item"><div elem="item-name"></div></div></div>',
            '<div class="animals"><div class="animals__item"><div class="animals__item-name"></div></div></div>'
        );
    });
    it('mixes', function () {
        test(
            '<div block="animals"><div elem="item" mix="block:unicorn, mod: [large, female]"><div block="unicorn" elem="photo"></div><div elem="item-name"></div></div></div>',
            '<div class="animals"><div class="animals__item unicorn unicorn_large unicorn_female"><div class="unicorn__photo"></div><div class="animals__item-name"></div></div></div>'
        );
    });
    it('mods', function () {
        test(
            '<div block="animals"><div block="unicorn" mod="size:large, female"></div></div>',
            '<div class="animals"><div class="unicorn unicorn_size_large unicorn_female"></div></div>'
        );
    });
    it('json syntax', function () {
        test(
            '<div block="unicorn" mix="block:animals, elem:item, mod:{size:large,gender:female}"></div>',
            '<div class="unicorn animals__item animals__item_size_large animals__item_gender_female"></div>'
        );
    });
});
