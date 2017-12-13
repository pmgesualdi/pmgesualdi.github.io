var promosMP = new Array;
var infoBancos;

$( document ).ready(function() {

    $('.team-member img').toggleClass(getCss('thumbnail'));
    $('.fa-wrench').toggleClass(getCss('rotate'));
    $('.fa-laptop').toggleClass(getCss('shrink'));
    $('.fa-lock').toggleClass(getCss('shake'));
    
    sr.reveal($('#services'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#about'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#footer'), { mobile: true, duration: 799, delay: 1 });
        
    $.ajax({
        url: 'https://www.mercadopago.com/mla/credit_card_promos.json',
        type: 'GET',
        dataType: 'jsonp',
        success: function(response) {
            //Get MercadoPago promos
            response[2].forEach(function(obj) {
                promosMP.push([obj.issuer.id, obj.issuer.name, obj.expiration_date, obj.max_installments]);
            });

            $.getJSON('./resources/banks.json', function(data){
                infoBancos = data; //Get bank logos
                initCarousel(); //Render Carousel
            })
        }
     })
    
    function getCss (name) {
        return ('ontouchstart' in window) ? name + '-mobile' : name;
    }
    
    function initCarousel () {
        // for(var i = 1; i < promos.length - 1; i++) {
        //     var imgUrl;
        //     var currentPromo = promos[i];
        //     var promoDate = getDate(currentPromo.expiration_date);
            
        //     if (currentPromo.payment_methods[1]) {
        //         imgUrl = currentPromo.payment_methods[1].thumbnail;
        //     } else {
        //         imgUrl = currentPromo.payment_methods[0].thumbnail;
        //     }
            
        //     $('<div><div><img src="' + imgUrl + '">'
        //         + '<div>Hasta ' + currentPromo.max_installments + ' cuotas sin interés!</div>'
        //         + '<div>' + promoDate + '</div></div>'
        //     ).appendTo('.carousel');
        // }
        
        var slides = 'ontouchstart' in window ? 1 : 3;
        $('.carousel').slick({
            infinite: true,
            slidesToShow: slides,
            slidesToScroll: slides
        });
    }

    // function getDate (date) {
    //     // var formateDate = Date(date);
        
    //     // return formateDate.getDa
    // }
});
