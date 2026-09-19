document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var navWrap = document.querySelector('.nav-wrap');

  if (toggle && navWrap) {
    toggle.addEventListener('click', function () {
      var isOpen = navWrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navWrap.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Submit the contact form via fetch so visitors get an inline
  // confirmation instead of being bounced to their email client or
  // to Formspree's own confirmation page.
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var successMsg = document.getElementById('form-success');
    var errorMsg = document.getElementById('form-error');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorMsg) errorMsg.hidden = true;
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          contactForm.hidden = true;
          if (successMsg) successMsg.hidden = false;
        } else {
          if (errorMsg) errorMsg.hidden = false;
          if (submitBtn) submitBtn.disabled = false;
        }
      }).catch(function () {
        if (errorMsg) errorMsg.hidden = false;
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
});
