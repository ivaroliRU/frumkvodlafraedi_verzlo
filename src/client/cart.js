const vueApp = require('../logic/vue-cart-app');
const cookies = require('../logic/cookiecreator');

function validate(){
    if(vueApp.order.products.length == 0){
        return null;
    }

    let order_details = {
        FirstName: $('#firstName').val(),
        LastName: $('#lastName').val(),
        address: $('#address').val(),
        floor: $('#floor').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        city: $('#city').val(),
        zip: $('#zip').val(),
        order: vueApp.order.products
    };
    
    var valid = true;
    $('#invalid-feedback-fname').hide();
    $('#invalid-feedback-lname').hide();
    $('#invalid-feedback-address').hide();
    $('#invalid-feedback-phone').hide();
    $('#invalid-feedback-city').hide();
    $('#invalid-feedback-zip').hide();

    if(!order_details.FirstName.match(/^([a-zA-Z]+)$/)){
        $('#invalid-feedback-fname').show();
        valid = false;
    }

    if(!order_details.LastName.match(/^([a-zA-Z]+)$/)){
        $('#invalid-feedback-lname').show();
        valid = false;
    }

    if(!order_details.address.match(/^([a-zA-Z 0-9]+)$/)){
        $('#invalid-feedback-address').show();
        valid = false;
    }

    if(!order_details.phone.match(/^([0-9]{7})$/)){
        $('#invalid-feedback-phone').show();
        valid = false;
    }

    if(!order_details.city.match(/^([a-zA-Z]+)$/)){
        $('#invalid-feedback-city').show();
        valid = false;
    }

    if(!order_details.zip.match(/^([0-9]{3})$/)){
        $('#invalid-feedback-zip').show();
        valid = false;
    }

    if(valid){
        return order_details;
    }
    return null;
}

function checkout(obj){
    console.log(obj);
    
    $.post("/checkout", obj, function(data, status){
        if(status == "success"){
            $('#order-id').text(data);
            $('#alertModal').modal('show');
        }
    });
}

function getPromoCode(code){

}

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

$(document).ready(function(){
    $('.remove-item').on('click', function(e){
        var id = $(e.target).parent().parent().attr("data-id");
        removeCookie(id);
        $(e.target.id).remove();
        $('#order-price').text(vueApp.order.price);
    });

    $('#checkout-btn').on('click', function(){
        var checkoutObj = validate();

        if(checkoutObj != null){
            checkout(checkoutObj);
        }
    });

    $('#promocode-btn').on('click', function(){

    });

    $('#alertModal').on('hidden.bs.modal', function () {
        cookies.setCookie('products-cart', "", 1);
        window.location.replace("/");
    })
});