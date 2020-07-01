var request = require('request');
var crypto = require('crypto');

var lib = require('./library.js');
const Order = require('./order.js');
const Position = require('./position.js');

let apiKey, apiSecret; 
exports.api_primer = function (key, secret){
    apiKey = key;
    apiSecret = secret;
}

/**
 * Packages all request info intodictionary 
 *    
 * @param {str} type - request type 
 * @param {str} path - HTTP path
 * @param {dict} orderDetails - output from func setOrderDetails
 *   
 * @return {dict} Dict of required elements for request
*/

exports.configureRequest = function (type, path, details){
    var request_type = type; 
    var path = path; 

    // 1 min in the future
    var expires = Math.round(new Date().getTime() / 1000) + 60;
    
    //data = {symbol:"XBTUSD",orderQty:1,price:590,ordType:"Limit"};
    var data = details;

    // Pre-compute the postBody so we can be sure that we're using *exactly* the same body in the request
    // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
    var postBody = JSON.stringify(data);
    var signature = crypto.createHmac('sha256', apiSecret).update(request_type + path + expires + postBody).digest('hex');
        
    var headers = {
      'content-type' : 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
      // https://www.bitmex.com/app/apiKeysUsage for more details.
      'api-expires': expires,
      'api-key': apiKey,
      'api-signature': signature
    };
    
    const requestOptions = {
      headers: headers,
      url:'https://testnet.bitmex.com'+path,
      method: request_type,
      body: postBody
    };

    return requestOptions;
}


/**
 * Gets the order book details
 *    
 * @param {var} callback - to hold response
 * @param {str} symbol - Trade currency
 * @param {int} depth - Order book depth per side (0 for full depth)
 *   
 * @return {dict} - body of request response
*/
exports.getOrderBook = function(callback, symbol, depth){
    var details = {symbol: symbol, depth: depth};
    var requestOptions = configureRequest('GET', '/api/v1/orderBook/L2', details);

    request(requestOptions, function(error, response, body){
        if (error){
            return callback(error);
        }
        callback(JSON.parse(body));
    });
}


/**
 * Sends the packaged request
 * 
 * @param {func} callback - function to grab response
 * @param {dict} requestOptions - the packaged Request Options
 *
 * @return None
 *
 */
exports.sendRequest = function(callback, requestOptions) {
        request(requestOptions, function(error, response, body) {
            if (error) {
                return callback(error);
            }
            callback(JSON.parse(body));
        });
    }



function main(){
    console.log("API usage");
};

main();
