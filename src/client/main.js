const cookies = require('../logic/cookiecreator');

function addToCart(product, name){
    $('#alertModal').modal('show');
    $("#added-product").text(name);


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
        var stock = $(event.target).parent().attr("data-stock");

        if(stock > 0){
            stock--;

            if(stock <= 0){
                $(event.target).parent().append("<h4>Uppselt</h4>");
                $(event.target).remove();
            }

            $(event.target).parent().attr("data-stock", stock);
            var id = $(event.target).parent().attr("data-id");
            var name = $(event.target).parent().attr("data-title");
            addToCart(id, name);
        }
    })
})