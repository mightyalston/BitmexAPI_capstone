function main(){

    // -> setting the request options
    //
    var requestOptions = configureRequest('POST', '/api/v1/order', orderDetails)
    console.log(requestOptions);
    
    // -> Edit order info
    //
    // grab this ID after placing the order
    var order_id = "070341e9-2ae0-bc9f-f489-b0c7d1114b41"
    var details = myorder.setEditDetails(order_id, 1000, "Increasing the price");
    var requestOptions = configureRequest(details[0], details[1], details[2]);
    var info = sendRequest(function(err, info){
        console.log(err, info);    
    }, requestOptions);
    
    // -> set pricing details
    //
    var orderDetails = setOrderDetails(1, 590, "Limit");
    console.log(orderDetails);
    
    // -> placing an order
    //
    var details = myorder.setBuyDetails(1, 600, "Limit");
    var requestOptions = configureRequest(details[0], details[1], details[2]);
    var info = sendRequest(function(err, info){
        console.log(err, info);    
    }, requestOptions);
    
    // -> grabbing open orders info
    //
    var details = myorder.setOrderInfoDetails({"open":true}, 2);
    var requestOptions = configureRequest(details[0], details[1], details[2]);
    var info = sendRequest(function(err, info){
        console.log(err, info);    
    }, requestOptions);
    
    // -> get order history
    //
    var orderHistory = getOrderHistory(function(err, historyinfo){
        console.log(err, historyinfo);
    }, "XBTUSD");
    
    // -> get orderbook details
    //
    var r_details = getOrderBook(function(err, bookinfo){
        console.log(err, bookinfo); 
    }, "XBTUSD", 1);

}
