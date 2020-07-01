/**
 *  Class Order
 *
 *  - GET /order - get your orders
 *  - PUT /order - Amend the quantity or price of an open order
 *  - POST /order - Create new order
 *  - DELETE /order - Cancel order(s)
 *  - DELTE /order/all - Cancel all orders
 *  - POST /order/bulk - Create multiple new order
 *  - PUT /order/bulk - Edit multiple new order
 *
 *  @param {str} symbol
 */
class Order {
    constructor(symbol) {
        this.symbol = symbol;
        this.path = "/api/v1/order";
    }

    /**
    * Sets details for grabbing orders
    *   GET /order
    *
    * FIXME unimplemented - start and end times?
    *
    * @param {dict} filter_dict - Grab by criteria (i.e. {"open":true} - will grab open orders only
    * @param {int} count - number of results to fetch
    *
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setOrderInfoDetails(filter_dict, count){
        var data = {symbol: this.symbol,
                    filter: filter_dict,
                    count: count };

        return ['GET', this.path, data];
    }
    
    /**
    * Sets the ordering details to request
    *   POST /order 
    *
    * @param {int} qty - quantity
    * @param {int} price - price
    * @param {str} type - "Limit"
    * @param {str} execInst OPTIONAL - used to close a position i.e. "close"
    *
    * @return {list} - 'POST', path, data to send in body
    */
    setBuyDetails(qty, price, type, execInst=null) {
        if (execInst != null) {
            var data = {symbol: this.symbol,
                        orderQty: qty,
                        price: price,
                        ordType: type,
                        execInst: execInst};
        } else {
            var data = {symbol: this.symbol,
                        orderQty: qty,
                        price: price,
                        ordType: type
                        };
        }

        return ['POST', this.path, data];
    }

    /**
    * TODO Un-tested
    * Create a bulk order 
    *   POST /order/bulk
    *
    * @param {int} num_of_orders - number of orders to generate
    * @param {list} qty (int) - quantity
    * @param {list} price (double) - price
    * @param {list} type (str) - "Limit"
    *
    * @return {list} - POST, path, data to send in body
    */
    setBuyBulkDetails(num_of_orders, qty, price, type){
        var data = []
        var new_data = {symbol: this.symbol,
                        orderQty: 0,
                        price: 0,
                        ordType: null};

        // Check if necessary lists are equal
        let sum = (qty.length + price.length + type.length) / 3;
        if (num_of_orders != sum) {
            throw "ERROR: Bulk order lists do not equal the number of orders: $(num_of_orders)"; 
            return;
        }

        var i;
        for (i = 0; i < num_of_orders; i++){
            new_data.orderQty = qty[i];
            new_data.price = price[i];
            new_data.ordType = type[i];
            data.push(new_data);
        }
        
        return ['POST', this.path + '/bulk', data];
    }

    /**
     * TODO Un-tested
    * Edit a particular order
    *   PUT /order
    *
    * @param num_of_orders: (int) - number of orders to generate
    * @param {list} qty (int) - quantity
    * @param {list} price (double) - price
    * @param {list} type (str) - "Limit"
    *
    * @return {list} - path, data to send in body
    */
    setEditBulkDetails(num_of_orders, qty, price, type){
        var data = []
        var new_data = {symbol: this.symbol,
                        orderQty: 0,
                        price: 0,
                        ordType: null};

        // Check if necessary lists are equal
        let sum = (qty.length + price.length + type.length) / 3;
        if (num_of_orders != sum) {
            throw "ERROR: Bulk order lists do not equal the number of orders: $(num_of_orders)"; 
            return;
        }

        var i;
        for (i = 0; i < num_of_orders; i++){
            new_data.orderQty = qty[i];
            new_data.price = price[i];
            new_data.ordType = type[i];
            data.push(new_data);
        }
        
        return ['PUT', this.path + '/bulk', data];
    }


    /**
     * TODO Un-tested
    * Cancel all orders after a specified timeout
    *   POST /order/cancelAllAfter
    * NOTE Request does not provide a return value when successful
    *
    * @param {int} timeout - Timeout in ms. Set to 0 to cancel this timer
    *
    * @return {list} - 'POST', path, data to send in body
    *
    */
    setCancelAllAfterDetails(timeout){
        var data = {timeout: timeout};
        return ['POST', this.path + '/cancelAllAfter', data];
    }


    /**
    * Edit a particular order
    *   PUT /order
    *
    *   FIXME - other than orderID, everything else is options.
    *         - check API to see if any other options are needed
    *
    * @param {str} orderID - ID of the order to edit
    * @param {int} price - price
    * @param {str} text - a comment for the edit
    *
    * @return {list} - 'PUT', path, data to send in body
    */
    setEditDetails(orderID, price, text){
        var data = {orderID: orderID,
                    price: price,
                    text: text};

        return ['PUT', this.path, data];
    }

    /**
    * Delete order(s) based on id
    *   DELETE /order 
    *
    * @param {dict} orderID - ID of the order to delete
    * @param {str} text - a comment for the deletion
    *
    * @return {list} - 'DELETE', path, data to send in body
    */
    setDeleteDetails(orderIds, text){
        var data = {orderID: orderID,
                    text: text};

        return ['DELETE', this.path, data];
    }

    /**
    * Delete all orders
    *   DELETE /order/all
    *
    * @param None
    *
    * @return {list} - 'DELETE', path, data to send in body
    */
    setDeleteAllDetails(orderIds, text){
        var data = {symbol: this.symbol};

        return ['DELETE', this.path + '/all', data];
    }
}

module.exports = Order;
