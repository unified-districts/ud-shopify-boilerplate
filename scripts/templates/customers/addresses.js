// For rendering address forms based on locality
import { AddressForm } from '@shopify/theme-addresses';

if (document.location.pathname.includes('/account/addresses')) {
  AddressForm(document.querySelector(
    '#address_form_new .form-wrapper'),
    'en', {
      shippingCountriesOnly: true,
      inputSelectors: {}
    }
  );
}
