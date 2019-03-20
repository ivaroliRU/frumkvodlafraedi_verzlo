const service = require('./productService');
const cookies = require('./cookiecreator');

const productTypes = service.productTypes();

module.exports.getOrder = function(){
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