// Agency Theme JavaScript
$( document ).ready(function() {
    $('.team-member img').toggleClass(function() {
        return ('ontouchstart' in window) ? 'thumbnail-mobile' : 'thumbnail';
      });

    sr.reveal(document.getElementById('services'), { mobile: true });
    sr.reveal(document.getElementById('about'), { mobile: true });
    sr.reveal(document.getElementById('footer'), { mobile: true });
});

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict
