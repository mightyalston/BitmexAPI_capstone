/**
 *     Class User 
 *
 *  - GET /user - Get user model
 *  - GET /user/margin - Get account's margin status
 *  - GET /user/wallet - Get current wallet info
 *  - GET /user/walletHistory - Get history of all wallet transactions
 *  - GET /user/walleySummary - Get summary of wallet transactions
 *
 *  @param {str} symbol
 */

class User{
    constructor(symbol) {
        this.symbol = symbol;
        this.path = "/api/v1/user";
    }

    /**
    * Set user model
    *   GET /user
    *
    * @param None
    *
    * @return {list} - 'GET', path
    */
    setUser(){
        return ['GET', this.path];
    }


    /**
    * Set account's margin status
    *   GET /user/margin
    *
    * @param {str} currency - currency to grab
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setUserMargin(currency){
        var data = {currency: currency};

        return ['GET', this.path + '/margin', data];
    }


    /**
    * Set current wallet info
    *   GET /user/wallet
    *
    * @param {str} currency - currency to grab
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setUserWallet(currency){
        var data = {currency: currency}

        return ['GET', this.path + '/wallet', data];
    }


    /**
    * Set wallet history
    *   GET /user/walletHistory
    *
    * @param {str} currency - currenty to grab
    * @param {double} count - num of results to fetch
    * @param {double} start - starting point
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setUserWalletHistory(currency, count, start){
        var data = {currency: currency,
                    count: count,
                    start: start};

        return ['GET', this.path + '/walletHistory', data];
    }

    /**
    * Sets wallet summary dict
    *   GET /user/walletSummary
    *
    * @param {str} currency - currency to grab
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setUserWalletSummary(currency){
        var data = {currency: currency};

        return ['GET', this.path + '/walletSummary', data];
    }
}

module.exports = User;
