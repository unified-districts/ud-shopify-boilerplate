# UD Shopify Boilerplate

A bare-bones boilerplate built by webpack.

Includes the following packages:
 - [lazysizes](https://github.com/aFarkas/lazysizes)
 - [Swiper](https://github.com/nolimits4web/swiper)
 - [normalize.css](https://github.com/necolas/normalize.css/)
 - [Sass](https://github.com/sass/dart-sass)
 - @shopify/
   - [theme-addresses](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-addresses)
   - [theme-cart](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-cart)
   - [theme-products](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-product)
   - [theme-predictive-search](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-predictive-search)
   - [theme-predictive-search-component](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-predictive-search)

## Features

 - webpack only compiles necessary dependencies. If you never use a `$`, jQuery stays put.
 - All JavaScript and CSS are in one file. No more having to play musical chairs with the order of your JavaScript.
 - Packages provide most functionality, making it easy to update.
 - No preset styling and CSS is normalized by default, which may or may not be a feature depending on your perspective.
 - Includes handy Shopify API extension packages ready to go with a simple uncomment.
 - Focuses on accessibility. Core Liquid templates are reworked with accessibility in mind.
 - Passes web metrics tools with flying green colors. By default, this theme scores in the high nineties on Lighthouse in every category. It's now up to you to keep it that way :)

## Installation

  1. Clone this repo into the desired directory
  2. Delete `./.git` or otherwise reinitialize to point to the desired repo
  3. Navigate to the directory and run `npm install` to install dependencies
  4. Configure Shopify's `.yml` file by using `~/config-template.yml` as a guide. You need:
    1. [A private app password](https://help.shopify.com/en/manual/apps/private-apps#generate-credentials-from-the-shopify-admin). This private app's permissions must include the ability to read and write to "Themes.""
    2. The shop's Shopify URL which comes in the form `your-store-here.myshopify.com`
    3. At least one theme ID to upload to. The easiest way to determine a theme's ID is to:
      1. Navigate to `/admin/themes` on your store
      2. Click the "Actions" dropdown
      3. Select "Edit Code"
      4. Copy the number at the end of the resulting URL, an example being `123025162426`
    4. To add different environments, copy and paste the `environment` block in `config-sample.yml` with a hard return between each environment. An example of this setup is in the sample file.
    5. Rename `config-sample.yml` to `config.yml`.
    6. Install [Shopify's themekit](https://github.com/Shopify/themekit) if necessary.
    5. Test by running `theme deploy -e your-environment`.

## Configuration

Determine which packages you want to import

### JavaScript
  1. Open `./scripts/index.js`
  2. Take note of the packages below imported by default. Removing these _will break functionality_ on your site.
     - [lazysizes](https://github.com/aFarkas/lazysizes)
       - Existing images use a [snippet adapted from Shopify's Slate theme](https://github.com/Shopify/starter-theme/blob/master/src/snippets/responsive-image.liquid) that requires lazysizes. It's recommended to use this snippet because it outputs responsive images.
     - [@shopify/theme-addresses](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-addresses)
       - This package dynamically edits form fields on the `/customer/addresses` page depending on the which country and province the customer chooses. By default, it's set to the US.
       - If removed, then the developer must manually add `option` elements to the country and province fields.
  3. Address other import statements that require further configuration
     - Font Awesome
       1. Create and [navigate to](https://fontawesome.com/kits) the kit for this site.
       2. Open the kit's associated JavaScript file in the browser.
       3. Copy its code.
       4. Open `./scripts/core/font-awesome.js`
       5. Paste into this file and save
  4. Consider importing other packages by un-commenting their import statements
     - [Swiper](https://github.com/nolimits4web/swiper)
       - Provides slider functionality
     - [@shopify/theme-cart](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-cart)
       - Provides easier access to the cart object
     - [@shopify/theme-products](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-product)
       - Provides easier access to the product object
     - [@shopify/theme-predictive-search](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-predictive-search)
       - Provides easier access to Shopify's predictive search feature
     - [@shopify/theme-predictive-search-component](https://github.com/Shopify/theme-scripts/tree/master/packages/theme-predictive-search)
       - Integrates a UI component into `@shopify/theme-predictive-search`

### Sass
#### `./styles/index.scss`
  - Sass imports [normalize.css](https://github.com/necolas/normalize.css/) by default and can be removed if desired.
  - If using Swiper, uncomment the applicable line to import its styles.

## Usage

Both of the `watch` and `build` commands build the same two files:
 - `main.js.liquid`
 - `main.css.liquid`

This is the only JavaScript and CSS file called by `theme.liquid`.

`npm run watch` triggers a webpack compile upon any file save. It also runs webpack in [development mode](https://webpack.js.org/configuration/mode/). This outputs JavaScript with a mapping feature.
```
Uncaught ReferenceError: x is not defined
  --> at Object../scripts/templates/example.js (main.js?v=4494068163113015839:1388)
  at __webpack_require__ (main.js?v=4494068163113015839:1413)
  at main.js?v=4494068163113015839:1476
  at main.js?v=4494068163113015839:1514
  at main.js?v=4494068163113015839:1527
```
In the above example of a console error, the highlighted second line points to its source.

`npm run build` creates a production build of the above two files without a mapping feature.

`./scripts/index.js` and `./styles/theme.scss` are webpack's entry points. Call modules in one of the two above files or a linked descendent of one of the modules (e.g., if `a` calls `b` and `index.js` calls `a`, webpack will compile `b` as well) to be compiled with webpack. This means that a JavaScript or Sass file can be anywhere in the directory. But it would be best practice for the developer to keep their JavaScript in `./scripts` and Sass/CSS in `./styles`.

### JavaScript

Webpack uses [JavaScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) functionality. Functions and variables by default are only scoped to their file. Even though webpack imports everything to one file, this does not mean that every file receives dependencies by default.

For example, consider `./scripts/templates/customers/addresses.js`. Importing `AddressForm` in `index.js`—even before importing `addresses.js`—would have thrown an error in `addresses.js` about the undefined function `AddressForm`.

To avoid importing, write everything in `index.js`.

### Sass

This project uses [Dart Sass](https://github.com/sass/dart-sass) instead of [Node Sass](https://github.com/sass/node-sass) as the latter is [deprecated](https://sass-lang.com/blog/libsass-is-deprecated).

Dart Sass has some differences compared to its Node counterpart. Importing is done with [`@use`](https://sass-lang.com/documentation/at-rules/use) instead of `@import`. Like JavaScript, Dart Sass variables are only scoped to the current file by default. Thus, the `@use` command is necessary to import variables into the current scope.

Access variables by attaching a prefix (the filename of the variable's source, by default) followed by the name of the variable.

To import all variables, include `@use '../variables';` at the top of your Sass module. To access a variable, type `variables.$variable-name`.

You may also want to choose a specific variable file to import. This can be convenient in combination with Sass' [`as` rule](https://sass-lang.com/documentation/at-rules/use#choosing-a-namespace) to choose a custom, more semantic prefix by which to call variables.

For example, to access color variables in a module, one could write `@use '../variables/color' as color` and call variables by writing `color.$background`.

["Understanding Dart Sass modules and namespaced variables"](https://rimdev.io/understanding-dart-sass-modules-and-name-spaced-variables/) is a helpful resource for a deeper understanding of these differences and transitioning from Node to Dart Sass.
