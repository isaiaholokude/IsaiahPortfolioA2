// Client-side scripts for the portfolio site
(function () {
  'use strict';

  // 1. Bootstrap form validation for the Contact form
  document.querySelectorAll('.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });

  // 2. Highlight the current year anywhere a .js-year element exists
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
