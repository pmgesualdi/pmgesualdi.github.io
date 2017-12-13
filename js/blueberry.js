$( document ).ready(function() {
    var mercadoPagoPromos;
    var infoBancos;

    $('.team-member img').toggleClass(getCss('thumbnail'));
    $('.fa-wrench').toggleClass(getCss('rotate'));
    $('.fa-laptop').toggleClass(getCss('shrink'));
    $('.fa-lock').toggleClass(getCss('shake'));
    
    sr.reveal($('#services'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#about'), { mobile: true, duration: 799, delay: 1 });
    sr.reveal($('#footer'), { mobile: true, duration: 799, delay: 1 });
    
    makeAjaxCall('https://www.mercadopago.com/mla/credit_card_promos.json', 'GET').then(function(jsonResponse){
        mercadoPagoPromos = jsonResponse[2];
        
        loadBanksJson(function(data) {
            infoBancos = JSON.parse(data);
        })
    })
        // .then(makeAjaxCall('../resources/banks.json', 'GET').then(function(jsonBancos){
        // })
        // .then(initCarousel())
    // )
    
    function makeAjaxCall(url, methodType, callback){
        return $.ajax({
           url : url,
           type : methodType,
           dataType : "jsonp"
        })
    }

    // $.ajax({
    //     url: 'https://www.mercadopago.com/mla/credit_card_promos.json',
    //     type: 'GET',
    //     data: {},
    //     dataType:'json',
    //     success: function(data) {
    //         addPromosToCarousel(data[2]);
    //     }
    // });
    
    function loadBanksJson(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './resources/banks.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);
            }
        }
        xobj.send(null);
    }

    function getCss (name) {
        return ('ontouchstart' in window) ? name + '-mobile' : name;
    }
    
    function initCarousel () {
        for(var i = 1; i < promos.length - 1; i++) {
            var imgUrl;
            var currentPromo = promos[i];
            var promoDate = getDate(currentPromo.expiration_date);
            
            if (currentPromo.payment_methods[1]) {
                imgUrl = currentPromo.payment_methods[1].thumbnail;
            } else {
                imgUrl = currentPromo.payment_methods[0].thumbnail;
            }
            
            $('<div><div><img src="' + imgUrl + '">'
                + '<div>Hasta ' + currentPromo.max_installments + ' cuotas sin interés!</div>'
                + '<div>' + promoDate + '</div></div>'
            ).appendTo('.carousel');
        }
        
        $('.carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        });
    }

    // function getDate (date) {
    //     // var formateDate = Date(date);
        
    //     // return formateDate.getDa
    // }
});
