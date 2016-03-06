var sticky = document.querySelector('.sticky-nav');
    var origOffsetY = sticky.offsetTop;

    function onScroll(e) {
      window.scrollY >= origOffsetY ? sticky.classList.add('navbar-fixed-top') :
        sticky.classList.remove('navbar-fixed-top');
    }
   document.addEventListener('scroll', onScroll);


$('input[type="range"]').on('mouseup', function() {
    alert("here");
  this.blur();
}).on('mousedown input', function() {
  styl.inject('input[type=range]:focus::-webkit-slider-thumb:after, input[type=range]:focus::-ms-thumb:after, input[type=range]:focus::-moz-range-thumb:after', {content: "'"+this.value+"'"}).apply();
});