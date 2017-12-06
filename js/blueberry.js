$( document ).ready(function() {
    $('.team-member img').toggleClass(getCss('thumbnail'));
    $('.fa-wrench').toggleClass(getCss('rotate'));
    $('.fa-laptop').toggleClass(getCss('shrink'));
    $('.fa-lock').toggleClass(getCss('shake'));

    
    sr.reveal($('#services'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#about'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#footer'), { mobile: true, duration: 799, delay: 1 });
    
    
    $.ajax({
        url: 'http://www.mercadopago.com/mla/credit_card_promos.json',
        type: 'GET',
        data: {},
        dataType:'jsonp',
        success: function(data) {
            addPromosToCarousel(data[2]);
        }
    });
    
    function getCss (name) {
        return ('ontouchstart' in window) ? name + '-mobile' : name;
    }
    
    function addPromosToCarousel (promos) {
        for(var i = 1; i < promos.length - 1; i++) {
            var imgUrl;
            
            if (promos[i].payment_methods[1]) {
                imgUrl = promos[i].payment_methods[1].thumbnail;
            } else {
                imgUrl = promos[i].payment_methods[0].thumbnail;
            }
            
            $('<div><img src="' + imgUrl + '"></div>').appendTo('.carousel');
        }
        
        $('.carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });
    }
    
});
