// Agency Theme JavaScript
$( document ).ready(function() {
    
    $('.team-member img').toggleClass(function() {
        return ('ontouchstart' in window) ? 'thumbnail-mobile' : 'thumbnail';
        }
    );
    $('.fa-wrench').toggleClass(function() {
        return ('ontouchstart' in window) ? 'rotate-mobile' : 'rotate';
      }
    );
    $('.fa-laptop').toggleClass(function() {
            return ('ontouchstart' in window) ? 'shrink-mobile' : 'shrink';
        }
    );
    $('.fa-lock').toggleClass(function() {
        return ('ontouchstart' in window) ? 'shake-mobile' : 'shake';
      }
    );

    sr.reveal($('#services'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#about'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#footer'), { mobile: true, duration: 799, delay: 1 });

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
