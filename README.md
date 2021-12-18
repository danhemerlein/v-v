# V+V Code Challenge

## DEV OPS

The dev ops configuration for this repository will be ready to go when you clone the project. This includes the config.yml which is what links your local repository to the theme you are working on in your development store. All you should need to run is the following commands and then you are ready to code! (Note: if you have issues installing packages, try using node version 11.x.x)

* npm install
* npm run devdeploy
* npm run watch

If you decide to use your own Javascript framework, feel free to add them to using npm.

The password to access your store is `verbalplusvisual`.

## FILE STRUCTURE

The repository has all the templates and logic for a full Shopify build. However, you can ignore most of the templates. For this assignment, please reference the following files.

### /src/templates/collection.liquid
This is where the HTML and Liquid for this page can be updated.
If you are unfamiliar with liquid templating language, please see the documentation here: https://shopify.dev/docs/themes/liquid/reference.
While you don’t need to use liquid, it might come in handy.

### /src/assets/scripts/templates/collection.js
This is where all javascript for the assignment can live.

### /src/assets/styles/templates/collection.scss
This is where you can add styles for the collection page.

### /src/assets/scripts/graphql/collection-start-code.js
Here you can find a function we’ve provided you access product information using the Shopify store front api. You should not need to edit this file at all. If you are interested, more information about the Storefront API can be found here. 
https://shopify.dev/docs/storefront-api

## Color Hexes
For the color swatches, you can use the following color hexes for the corresponding color names.
* Blue: '#00BCD3'
* Red: '#EF5350'
* Gold: '#FEC109'
* Brown: '#AF806E'
* Medium Grey: '#CDCDCD'
* Navy: '#2F3676'
* Yellow: '#FEC109'
* Dark Wash: '#2F3676'
* Light Wash: '#00BCD3'
