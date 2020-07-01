/**
 *      Class Position
 *
 *  - GET /position - get your positions
 *  - POST /position/isolate - Enable isolated margin or cross margin per-position
 *  - POST /position/leverage - Choose leverage for a position 
 *  - POST /position/riskLimit - Update your risk limit
 *  - POST /position/transferMargin - Transfer equity in or out of a position
 *
 *  @param {str} symbol
 */

class Position {
    constructor(symbol) {
        this.symbol = symbol;
        this.path = "/api/v1/position";
    }

    /**
    * Set positions dict
    *   GET /positions
    *
    *   FIXME unimplemented - columns
    *
    * @param {dict} filter_dict - Grab by criteria 
    * @param {int} count - number of rows
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setPosition(filter_dict, count){
        var data = {filter: filter_dict,
                    count: count };

        return ['GET', this.path, data];
    }


    /**
    * Enable isolated margin or cross margin
    *   GET /positions/isolate
    *
    * @param {bool} enabled - True: isolated margin, False: cross margin
    *
    * @return {list} - 'POST', path, data to send in body
    */
    setIsolatePosition(enabled){
        var data = {symbol: this.symbol,
                    enabled: enabled};

        return ['POST', this.path + '/isolate', data];
    }


    /**
    * Choose leverage
    *   GET /positions/leverage
    *
    * @param {double} leverage - 0.1 to 100
    *
    * @return {list} - 'POST', path, data to send in body
    */
    setIsolatePosition(leverage){
        var data = {symbol: this.symbol,
                    leverage: leverage};

        return ['POST', this.path + '/leverage', data];
    }


    /**
    * Update risk limit 
    *   GET /positions/riskLimit
    *
    * @param {double} riskLimit - new risk limit
    *
    * @return
    *       {list} - 'POST', path, data to send in body
    */
    setIsolatePosition(riskLimit){
        var data = {symbol: this.symbol,
                    riskLimit: riskLimit};

        return ['POST', this.path + '/riskLimit', data];
    }

    /**
    * Transfer equity in and out of position 
    *   GET /positions/transferMargin
    *
    * @param {double} amount - new amount 
    *
    * @return {list} - 'POST', path, data to send in body
    */
    setIsolatePosition(transferMargin){
        var data = {symbol: this.symbol,
                    transferMargin: transferMargin};

        return ['POST', this.path + '/transferMargin', data];
    }
}

module.exports = Position;
