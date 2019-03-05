const service = require('./productService');
const cookies = require('./cookiecreator');

var productTypes = service.productTypes();

function getOrder(){
    var productCookies = cookies.getCookie("products-cart").split("|")

    order = {
        products: [],
        price : 0,
        id: Math.random().toString(36).substr(2, 9)
    }

    for(var i = 0; i < productCookies.length; i++){
        for(var j = 0; j < productTypes.length; j++){
            if(productCookies[i] == productTypes[j].id){
                order.products.push(productTypes[j]);
                order.price += parseInt(productTypes[j].price);
            }
        }
    }

    return order;
}

module.exports.order = getOrder()

var app = new Vue({
    el: '#app',
    data: {
        order:order
    }
})