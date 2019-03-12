const pg = require('pg')
const connectionString = process.env.DATABASE_URL;//"postgres://postgres:postgres@localhost:5432/sylque";
console.log(connectionString);

module.exports.getProductTypes = async function (callback) {
    var client = new pg.Client(connectionString);
    await client.connect();
    var res = await client.query("SELECT * FROM products");
    await client.end();

    callback(res.rows);
}

module.exports.insertOrder = async function (data, callback) {
    var client = new pg.Client(connectionString);
    await client.connect();
    let query = "INSERT INTO orderdetails(orderId, FirstName, LastName, address, floor, email, phone, city, zip) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
    let values = [data.id, data.FirstName, data.LastName, data.address, data.floor, data.email, data.phone, data.city, data.zip];
    var res = await client.query(query, values);

    for(var i = 0; i < data.order.length; i++){
        let query2 = "INSERT INTO orders(detailID, productID, sent) values ($1, $2, FALSE);";
        let values2 =  [data.id, data.order[i].id];
        await client.query(query2, values2);
    }
    await client.end();

    callback(res.rows);
}

