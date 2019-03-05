const vueApp = require('../logic/vue-cart-app');
const cookies = require('../logic/cookiecreator');

function removeCookie(product){
    console.log("removing product: " + product);
    
    for(var i = 0; i < vueApp.order.products.length; i++){
        console.log(vueApp.order.products[i]);
        
        if(vueApp.order.products[i].id == product){
            console.log("Removing product: " + product);
            
            vueApp.order.price -= vueApp.order.products[i].price;
            vueApp.order.products.splice(i, 1);
            break;
        }
    }

    console.log(vueApp.order);
    
    var cookie_string = "";

    for(var i = 0; i < vueApp.order.products.length; i++){
        if(i != 0){
            cookie_string += "|" + vueApp.order.products[i];
        }
        else{
            cookie_string += vueApp.order.products[i];
        }
    }

    cookies.setCookie('products-cart', cookie_string, 20);
}

$('.remove-item').on('click', function(e){
    var id = $(e.target).parent().parent().attr("data-id");
    removeCookie(id);
    $(e.target.id).remove();
    $('#order-price').text(vueApp.order.price);
})
    