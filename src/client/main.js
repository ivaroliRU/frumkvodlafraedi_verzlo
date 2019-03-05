const vueApp = require('../logic/vue-index-app');
const cookies = require('../logic/cookiecreator');

function addToCart(product){
    $('#alertModal').modal('show');
    $("#added-product").text($("#product-title").text());


    var current_cookies = cookies.getCookie('products-cart').split("|");
    var cookie_string = "";
    current_cookies.push(product);

    for(var i = 0; i < current_cookies.length; i++){
        console.log(current_cookies[i]);
        
        if(i != 0){
            cookie_string += "|" + current_cookies[i];
        }
        else{
            cookie_string += current_cookies[i];
        }
    }

    cookies.setCookie('products-cart', cookie_string, 20);
}

$(document).ready(function(){
    $('.product-karfa-btn').on('click', function(e){
        var id = $(event.target).parent().attr("data-id");
        addToCart(id);
    })
})