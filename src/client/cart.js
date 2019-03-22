const orderCreator = require('../logic/orderCreator');
const cookies = require('../logic/cookiecreator');
var baseOrder = orderCreator.getOrder();
const addPrice = 790;

function insertProducts(){
    for(var i = 0; i < baseOrder.products.length; i++){
        var element = `
        <li class="list-group-item d-flex justify-content-between lh-condensed" data-id="${baseOrder.products[i].id}">
            <div class="remove-item">
                <i class="fas fa-times"></i>
            </div>
            <div>
                <h6 class="my-0">${baseOrder.products[i].title}</h6>
            </div>
            <span class="text-muted">${baseOrder.products[i].price} ISK</span>
        </li>
        `;
        
        $('#order-price').text(baseOrder.price);
        $('#product-list').prepend(element);
    }
}

function validate(){
    if(baseOrder.products.length == 0){
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
        order: baseOrder.products,
        sOption: $('input[name = "send-option"]:checked').val()
    };
    
    var valid = true;
    $('#invalid-feedback-fname').hide();
    $('#invalid-feedback-lname').hide();
    $('#invalid-feedback-address').hide();
    $('#invalid-feedback-phone').hide();
    $('#invalid-feedback-city').hide();
    $('#invalid-feedback-zip').hide();

    if(!order_details.FirstName.match(/^(.+)$/)){
        $('#invalid-feedback-fname').show();
        valid = false;
    }

    if(!order_details.LastName.match(/^(.+)$/)){
        $('#invalid-feedback-lname').show();
        valid = false;
    }

    if(!order_details.address.match(/^(.+ *[0-9]*)$/)){
        $('#invalid-feedback-address').show();
        valid = false;
    }

    if(!order_details.phone.match(/^([0-9]{7})$/)){
        $('#invalid-feedback-phone').show();
        valid = false;
    }

    if(!order_details.city.match(/^(.+)$/)){
        $('#invalid-feedback-city').show();
        valid = false;
    }

    if(!order_details.zip.match(/^([0-9]{3})$/)){
        $('#invalid-feedback-zip').show();
        valid = false;
    }

    if(order_details.sOption == ""){
        $('#invalid-feedback-soption').show();
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
    
    for(var i = 0; i < baseOrder.products.length; i++){
        console.log(baseOrder.products[i]);
        
        if(baseOrder.products[i].id == product){
            console.log("Removing product: " + product);
            
            baseOrder.price -= baseOrder.products[i].price;
            baseOrder.products.splice(i, 1);
            break;
        }
    }

    console.log(baseOrder);
    
    var cookie_string = "";

    for(var i = 0; i < baseOrder.products.length; i++){
        if(i != 0){
            cookie_string += "|" + baseOrder.products[i];
        }
        else{
            cookie_string += baseOrder.products[i];
        }
    }

    cookies.setCookie('products-cart', cookie_string, 20);
}

$(document).ready(function(){
    insertProducts();
    $('.remove-item').on('click', function(e){
        console.log("ASDF");
        
        var id = $(e.target).parent().parent().attr("data-id");
        removeCookie(id);

        baseOrder = orderCreator.getOrder();

        $(e.target).parent().parent().remove();
        $('#order-price').text(baseOrder.price);
    });

    $('#checkout-btn').on('click', function(){
        var checkoutObj = validate();
        console.log(checkoutObj);

        if(checkoutObj != null){
            checkout(checkoutObj);
        }
    });

    $('#promocode-btn').on('click', function(){

    });

    $('input[name = "send-option"]').change(function() {
        var value = $('input[name = "send-option"]:checked').val();
        
        if(value == "send-option-4"){
            var newPrice = baseOrder.price + addPrice;
            $('#order-price').text(newPrice);
        }
        else{
            $('#order-price').text(baseOrder.price);
        }
    });

    $('#alertModal').on('hidden.bs.modal', function () {
        cookies.setCookie('products-cart', "", 1);
        window.location.replace("/");
    })
});