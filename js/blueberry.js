var promosMP = new Array;
var infoBancos;

$( document ).ready(function() {

    $('.team-member img').toggleClass(getCss('thumbnail'));
    $('.fa-wrench').toggleClass(getCss('rotate'));
    $('.fa-laptop').toggleClass(getCss('shrink'));
    $('.fa-lock').toggleClass(getCss('shake'));
    $('.carousel').toggleClass(getCss('bank-logo'));
    
    sr.reveal($('#services'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#about'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#footer'), { mobile: true, duration: 799, delay: 1 });
        
    $.ajax({
        url: 'https://www.mercadopago.com/mla/credit_card_promos.json',
        type: 'GET',
        dataType: 'jsonp',
        success: function(response) {
            //Get MercadoPago promos
            response[2].forEach(function(record) {
                var obj = {};
                
                obj["id"] = record.issuer.id;
                obj["name"] = record.issuer.name,
                // obj["expiration_date"] = formatDate(record.expiration_date),
                obj["max_installments"] = record.max_installments;

                promosMP.push(obj);
            });

            promosMP.sort(function(a, b) {
                return b.max_installments > a.max_installments;
            });

            $.getJSON('./resources/banks.json', function(data){
                infoBancos = data; //Get bank logos
                renderCarousel(); //Render Carousel
            })
        }
    })
    
    function getCss (name) {
        return ('ontouchstart' in window) ? name + '-mobile' : name;
    }
    
    function renderCarousel () {
        for(var i = 1; i < promosMP.length; i++) {
            var promo = promosMP[i];
            
            if (infoBancos.hasOwnProperty(promo.id)) {
                $('<div>' + promo.max_installments + ' cuotas con'
                    + '<img src=' + infoBancos[promo.id].url + ' alt="' + promo.name + '" /></div>'
                    // + '<div>Válido hasta: ' + promo.expiration_date + '</div></div>'
                ).appendTo('.carousel');
            }
        }

        initCarousel();
    }
    
    function initCarousel () {
        var slides = 'ontouchstart' in window ? 1 : 3;
        $('.carousel').slick({
            infinite: false,
            autoplay: true,
            slidesToShow: slides,
            slidesToScroll: slides,
            // responsive: [
            //     {
            //         breakpoint: 480,
            //         settings: "unslick"
            //     }
            // ]
        });
    }
});
