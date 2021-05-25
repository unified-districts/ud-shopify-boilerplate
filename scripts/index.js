// Write code at the bottom of this file or import other JavaScript files for more modularity

// LAZYSIZES
import 'lazysizes/plugins/rias/ls.rias.min.js';
import 'lazysizes/lazysizes.min.js';

// FONT AWESOME. You must copy the kit's JavaScript into this file
import './core/font-awesome.js';

// SWIPER
// import Swiper from 'swiper';

// AJAX CART FUNCTIONALITY
// import * as cart from '@shopify/theme-cart';

// ACCESSING PRODUCT OBJECTS
// import * as product from '@shopify/theme-product';

// PREDICITVE SEARCH
// import PredictiveSearch from "@shopify/theme-predictive-search";

import './templates/customers/addresses.js';
import { formDialog } from './core/utilities.js';

document.addEventListener('DOMContentLoaded', () => {
  formDialog(
    document.location.pathname.includes('/account/reset/'),
    "passwordReset",
    "Your password was successfully reset."
  );

  document.querySelector('dialog i').addEventListener('click', element => {
    element.target.parentElement.open = false;
  });
});
