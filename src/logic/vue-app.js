var products = [
    {title:"Sylque White", price:"6000", id:"1", img:"images/pillow2.png"},
    {title:"Sylque Black", price:"6000",id:"2", img:"images/pillow1.png"},
    {title:"Sylque Pink", price:"6000",id:"3", img:"images/pillow3.png"}
];

var app = new Vue({
    el: '#app',
    data: {
        products
    }
  })