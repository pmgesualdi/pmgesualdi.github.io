var promosMP = new Array;
var infoBancos;
var isMobile = 'ontouchstart' in window;

$( document ).ready(function() {

    $('.team-member img').toggleClass(getCss('thumbnail'));
    $('.fa-wrench').toggleClass(getCss('rotate'));
    $('.fa-laptop').toggleClass(getCss('shrink'));
    $('.fa-lock').toggleClass(getCss('shake'));
    $('.carousel-container').toggleClass(getCss('vertical-align'));
    
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

            getBankData();
        }
    })

    function getBankData () {
        $.getJSON('./resources/banks.json', function(data){
            infoBancos = data; //Get bank logos
            
            if (isMobile) { //Render Carousel
                renderCarouselMobile()
            } else {
                renderCarousel();
            }

            getFacebookData();
        })
    }

    function getFacebookData () {
        $.ajax({
            url: 'http://graph.facebook.com/Blueberrygroup.com.ar/?fields=country_page_likes&access_token=EAACYwpL9XTIBAA4Rqd6z0BFu2VmZAirQhHWZAXL0mL40hmmuxa20vURtPpKOSGIQ9mc5hQII4ZCWt5CXFxEkg0dUcRjrpdiFwJvPaZCZAhf2ju2PG0xruOawL2ZAK5ZBVkgxLOBKNaRmhTncmOUYRVYjXXSYQX5yKAZD',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                $('#facebook_likes').html(response.country_page_likes);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        })
    }
    
    function getCss (name) {
        return isMobile ? name + '-mobile' : name;
    }
    
    function renderCarousel () {
        for(var i = 1; i < promosMP.length; i++) {
            var promo = promosMP[i];
            
            if (infoBancos.hasOwnProperty(promo.id)) {
                $('<div class="carousel-el-spacing">' + promo.max_installments + ' cuotas'
                    + '<img src=' + infoBancos[promo.id].url + ' alt="' + promo.name + '" /></div>'
                    // + '<div>Válido hasta: ' + promo.expiration_date + '</div></div>'
                ).appendTo('.carousel');
            }
        }

        initCarousel();
    }

    function renderCarouselMobile () {
        for(var i = 1; i < promosMP.length; i++) {
            var promo = promosMP[i];
            
            if (infoBancos.hasOwnProperty(promo.id)) {
                $('<div class="carousel-el-spacing-mobile">'
                    + '<img src=' + infoBancos[promo.id].url + ' alt="' + promo.name + '" /></div>'
                    // + '<div>Válido hasta: ' + promo.expiration_date + '</div></div>'
                ).appendTo('.carousel');
            }
        }

        initCarousel();
    }
    
    function initCarousel () {
        var slides = isMobile ? 1 : 3;
        $('.carousel').slick({
            infinite: false,
            autoplay: true,
            slidesToShow: slides,
            slidesToScroll: 1
        });
    }
});
