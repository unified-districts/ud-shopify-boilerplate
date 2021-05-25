export function formDialog(originalPage, storageName, dialogMessage) {
  // Selects form input button that will trigger the local storage edit
  const button = document.querySelector('input[type="submit"]');

  // If the current page is the one passed into the function and the submit button exists, then set this form's local storage value to true.
  if (originalPage && button) {
    button.addEventListener("click", event => {
      event.preventDefault();
      localStorage.setItem(storageName, true);
      button.closest('form').submit();
    });
  }

  // Reads the value of the local storage key created in the previous conditional to determine if the dialog element with the passed in dialog message should be displayed on this page load
  if (
    localStorage[storageName] == "true" &&
    !originalPage &&

    // We don't want it to display on '/challenge' or '/account/reset' because the user's busy
    !document.location.pathname.includes('/challenge') &&
    !document.location.pathname.includes('/account/reset')) {
      const dialog = document.querySelector('dialog');
      dialog.innerHTML += dialogMessage;
      dialog.open = true;

      // After displaying once, the message shouldn't appear on any subsequent page loads. Therefore, this value is set to false until the next time the form is submitted.
      localStorage.setItem(storageName, false);
  }
}
