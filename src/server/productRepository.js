const pg = require('pg')
const utf8 = require('utf8');
const connectionString = process.env.DATABASE_URL;//"postgres://postgres:postgres@localhost:5432/sylque";
console.log(connectionString);

module.exports.getProductTypes = async function (callback) {
    var client = new pg.Client(connectionString);
    await client.connect();
    var res = await client.query("SELECT id, name::bytea, image, price, stock from products");
    res.rows[2].name = 'Rosé';//fix this later.... caracter encodin problem
    await client.end();

    callback(res.rows);
}

module.exports.insertOrder = async function (data, callback) {
    try{
        var client = new pg.Client(connectionString);
        await client.connect();
        let query = "INSERT INTO orderdetails(orderId, FirstName, LastName, address, floor, email, phone, city, zip, codeID, sent, paid, sOption) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL, FALSE, FALSE, $10);";
        let values = [data.id, data.FirstName, data.LastName, data.address, data.floor, data.email, data.phone, data.city, data.zip, data.sOption];
        var res = await client.query(query, values);

        for(var i = 0; i < data.order.length; i++){
            let query2 = "INSERT INTO orders(detailID, productID) values ($1, $2);";
            let values2 =  [data.id, data.order[i].id];
            await client.query(query2, values2);
        }

        await client.end();

        callback(res.rows);
    }
    catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
        callback(null);
    }
}

module.exports.getOrderInformation = async function (id,callback) {
    var client = new pg.Client(connectionString);
    let response = {
        new: [],
        recieved: [],
        old: []
    };

    await client.connect();
    //getting the order details
    var orderDetails = await client.query("select * from orderdetails where orderid like $1", ['%'+id+'%']);
    var totalPrice = 0;

    //getting the individual product order inside an order
    for(var i = 0; i < orderDetails.rows.length; i++){
        totalPrice = 0;
        let order = orderDetails.rows[i];
        var orders = await client.query("SELECT p.name, p.price from orders o join products p on p.id = o.productID where o.detailId = $1;", [order.orderid]);
        order.orders = orders.rows;

        for(var j = 0; j < orders.rows.length; j++){
            totalPrice += orders.rows[j].price;
        }

        if(order.soption == 'send-option-4'){
            totalPrice += 790;
        }

        order.totalPrice = totalPrice;

        //Diffirent stages of products
        if(!order.paid){
            response.new.push(orderDetails.rows[i]);
        }
        else if(!order.sent){
            response.recieved.push(orderDetails.rows[i]);
        }
        else{
            response.old.push(orderDetails.rows[i]);
        }
    }
    await client.end();

    callback(response);
}

module.exports.getDiscountInformation = async function (id,callback) {
    var client = new pg.Client(connectionString);
    await client.connect();
    var codes = await client.query("SELECT code, discount from codes where id = $1;", [id]);
    await client.end();

    callback(codes.rows);
}

module.exports.updateInfo = async function (info,callback) {
    var client = new pg.Client(connectionString);
    await client.connect();
    var codes = await client.query("UPDATE orderdetails SET sent = $1, paid = $2 WHERE orderId = $3;", [info.sent, info.payment, info.id]);
    await client.end();
    callback();
}
