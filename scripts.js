var Plyr = require('./lib/plyr.polyfilled');

window.addEventListener('load', function() {
  var headerHeight = document.querySelector('.page-header').clientHeight;
  var stickyNavbarElement = document.querySelector('.navbar-sticky');
  var offset = 300;

  toggleStickyNavbar();

  window.addEventListener('scroll', function() {
    toggleStickyNavbar();
  });

  function toggleStickyNavbar() {
    if (window.scrollY > headerHeight - offset) {
      return stickyNavbarElement.classList.add('visible');
    }
    stickyNavbarElement.classList.remove('visible');
  }
  var player = new Plyr('#player');
  player.once('play', function() {
    var videoWrapper = document.querySelector('.plyr__video-wrapper');
    videoWrapper.classList.add('hidden-poster');
  });

  registerNavigation();

  function registerNavigation() {
    var elements = document.querySelectorAll('.nav-wrapper a');
    elements.forEach(function(el) {
      const href = el.getAttribute('href') || '';
      const isAnchor = href[0] === '#';
      if (!isAnchor) {
        return;
      }
      el.addEventListener('click', function(event) {
        if (!el.scrollIntoView) {
          return;
        }
        event.preventDefault();

        var targetElement = document.querySelector(el.getAttribute('href'));
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      });
    });
  }

  const newsletterAddButton = document.querySelector('.newsletter-form button');
  const newsletterEmailInput = document.querySelector('#newsletter-email');
  const formRef = document.querySelector('.newsletter-form form');
  if (newsletterAddButton && newsletterEmailInput) {
    formRef.addEventListener('submit', function(e) {
      e.preventDefault();

      newsletterAddButton.setAttribute('disabled', 'disabled');
      newsletterEmailInput.setAttribute('disabled', 'disabled');

      const value = newsletterEmailInput.value;
      const xhr = new XMLHttpRequest();
      const url =
        'https://khsw78qkle.execute-api.us-east-2.amazonaws.com/Stage/newsletter?token=db1f899025b5a59a76b6b34b2a013893';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        newsletterAddButton.classList.add('btn-success');
      };
      const data = JSON.stringify({ email: value });
      xhr.send(data);
    });
  }
});
