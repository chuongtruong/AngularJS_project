var sticky = document.querySelector('.sticky-nav');
    var origOffsetY = sticky.offsetTop;

    function onScroll(e) {
      window.scrollY >= origOffsetY ? sticky.classList.add('navbar-fixed-top') :
        sticky.classList.remove('navbar-fixed-top');
    }

    document.addEventListener('scroll', onScroll);