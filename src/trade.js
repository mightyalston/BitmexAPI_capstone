/**
 *     Class Trade 
 *
 *  - GET /trade - Get Trades
 *  - GET /trade/bucketed - Get previous trades in time buckets
 *
 *  @param {str} symbol
 */

class Trade {
    constructor(symbol) {
        this.symbol = symbol;
        this.path = "/api/v1/trade";
    }

    /**
    * Set trades dict
    *   GET /trade
    *
    * FIXME unimplemented - columns
    *
    * @param {dict} filter_dict - Grab by criteria 
    * @param {int} count - number of rows
    * @param {date-time} starttime - starting point
    * @param {date-time} endtime - ending date
    *
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setTrade(filter_dict, count, starttime = null, endtime = null){
        if (starttime == null && endtime == null){
            var data = {symbol: this.symbol,
                        filter: filter_dict,
                        count: count
                        };
        } else {
            var data = {symbol: this.symbol, 
                        filter: filter_dict,
                        count: count,
                        startTime: starttime,
                        endTime: endtime
                        };
        }

        return ['GET', this.path, data];
    }


    /**
    * Sets dict for getting previous trades
    *   GET /trade/bucketed
    *   FIXME unimplemented - columns
    *
    * @param {str} binsize - Time interval to bucket by. Options - 1m, 5m, 1h, 1d
    * @param {bool} partial - True: send in-progress bins for current time period
    * @param {dict} filter_dict - Grab by criteria
    * @param {int} count - number of results to fetch
    * @param {date-time} starttime - starting point
    * @param {date-time} endtime - ending date
    *
    * @return {list} - 'POST', path, data to send in body
    */
    setTradeBucketed(binsize, partial, filter_dict, count, starttime = null, endtime = null){
        if (starttime == null && endtime == null){
            var data = {binSize: binsize,
                        partial: partial,
                        symbol: this.symbol,
                        filter: filter_dict,
                        count: count};
        } else {
            var data = {binSize: binsize,
                        partial: partial,
                        symbol: this.symbol,
                        filter: filter_dict,
                        count: count,
                        startTime: starttime,
                        endTime: endtime};
        }

        return ['GET', this.path + '/bucketed', data];
    }
}

module.exports = Trade;
