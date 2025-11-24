// var Plyr = require('./lib/plyr.polyfilled');

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
  // var player = new Plyr('#player', {
  //   keyboard: {
  //     global: true,
  //   },
  // });
  // player.once('play', function() {
  //   var videoWrapper = document.querySelector('.plyr__video-wrapper');
  //   videoWrapper.classList.add('hidden-poster');

  //   const poster = videoWrapper.querySelector('.plyr__poster');
  //   if (poster) {
  //     poster.remove();
  //   }
  // });

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
        'https://nbdggbnqnrevwg6xlex3st3vpe0nyhiq.lambda-url.us-east-2.on.aws/?token=db1f899025b5a59a76b6b34b2a013893';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        newsletterAddButton.classList.add('btn-success');
      };
      const data = JSON.stringify({ email: value });
      xhr.send(data);
    });
  }

  const body = this.document.querySelector('body');
  const mobileNavIcon = this.document.querySelector('.mobile-nav-icon');
  const mobileNav = this.document.querySelector('.mobile-nav');
  const mobileNavClose = this.document.querySelector('.mobile-nav-close');
  mobileNavIcon.addEventListener('click', function() {
    mobileNav.classList.add('open');
    body.classList.add('mobile-nav-open');
  });
  mobileNavClose.addEventListener('click', function() {
    mobileNav.classList.remove('open');
    body.classList.remove('mobile-nav-open');
  });

  // Sponsors
  const fetchBronzeSponsorsUrl = `https://opencollective.com/nest/tiers/bronze-sponsors/all.json`;
  fetch(fetchBronzeSponsorsUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        return;
      }
      
      const oneMonth = 1000 * 60 * 60 * 24 * 30;
      const now = new Date();
      const activeSponsors = data.filter((sponsor) => sponsor.isActive || (sponsor.lastTransactionAt && new Date(sponsor.lastTransactionAt).getTime() > now.getTime() - oneMonth));
      const bronzeSponsorsContainer = document.querySelector('.bronze-sponsors-container');
      if (!bronzeSponsorsContainer) {
        return;
      }

      activeSponsors.filter(item => item.image).forEach((sponsor) => {
        const sponsorElement = document.createElement('a');
        sponsorElement.href = sponsor.website;
        sponsorElement.target = '_blank';
        sponsorElement.rel = 'noopener noreferrer';
        sponsorElement.title = sponsor.name;
        sponsorElement.innerHTML = `<img src="${sponsor.image}" alt="${sponsor.name}" loading="lazy" />`;
        bronzeSponsorsContainer.appendChild(sponsorElement);
      });
    });

    // Footer year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Only load iframe when it's in view to improve performance
    const iframe = document.querySelector('#preview iframe');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          iframe.src = iframe.dataset.src;
          observer.disconnect();
        }
      });
    });

    observer.observe(iframe);

    // Disconnect observer on unload
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
    });
});
