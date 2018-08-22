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
});
