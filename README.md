# poxtxml-beml
[![npm version][npm-image]][npm-url]

> [PostXML] plugin for processing [BEML][beml] templates

## Installation
`npm i poxtxml-beml --save-dev`

## How to use

## Usage
```js
var fs = require('fs'),
   postxml = require('postxml'),
   plugin = require('poxtxml-beml');

var html = fs.readFileSync('input.html', 'utf8');

var opts = {
  elemPrefix: '__',
  modPrefix: '_',
  modDlmtr: '_'
};

var output = postxml(
      html,
      [
         plugin(opts)
      ]
   );
```

## Sample

```html
<div block="b-animals">
  <div elem="cat" mod="size:big, color:red"></div>
</div>
```

translated to

```html
<div class="b-animals">
  <div class="b-animals__cat b-animals__cat_size_big b-animals__cat_color_red"></div>
</div>
```

## Syntax reference

### Blocks

```html
<div block="animals">
  <div block="unicorn"></div>
</div>
```

```html
<div class="animals">
  <div class="unicorn"></div>
</div>
```

### Elements

```html
<div block="animals">
  <div elem="item">
    <div elem="item-name"></div>
  </div>
</div>
```

```html
<div class="animals">
  <div class="animals__item">
    <div class="animals__item-name"></div>
  </div>
</div>
```

### Modifiers

```html
<div block="animals">
  <div block="unicorn" mod="size:large, female"></div>
</div>
```

```html
<div class="animals">
  <div class="unicorn inicorn_size_large unicorn_female"></div>
</div>
```

### Mixes

```html
<div block="animals">
  <div elem="item" mix="block:unicorn, mod: [large, female]">
    <div block="unicorn" elem="photo"></div>
    <div elem="item-name"></div>
  </div>
</div>
```

```html
<div class="animals">
  <div class="animals__item unicorn unicorn_large unicorn_female">
    <div class="unicorn__photo"></div>
    <div class="animals__item-name"></div>
  </div>
</div>
```

For complex values you can use pseudo JSON syntax:

```html
<div block="unicorn" mix="block:animals, elem:item, mod:{size:large,gender:female}"></div>
<div block="unicorn" mix="{block:b-mix-1}, {block:b-mix-2, mod:[mod1, mod2]}"></div>
```

```html
<div class="unicorn animals__item animals__item_size_large animals__item_gender_female"></div>
<div class="unicorn b-mix-1 b-mix-2 b-mix-2_mod1 b-mix-2_mod_2"></div>
```

## Licence
MIT

[PostXML]: https://github.com/postxml/postxml
[beml]: https://github.com/zenwalker/node-beml

[npm-url]: https://www.npmjs.org/package/poxtxml-beml
[npm-image]: http://img.shields.io/npm/v/poxtxml-beml.svg?style=flat-square
