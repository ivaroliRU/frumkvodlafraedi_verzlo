const service = require('./productService');

var products = service.productTypes();

var app = new Vue({
    el: '#app',
    data: {
        products
    }
})