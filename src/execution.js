/**
 *     Class Execution
 *
 *  - GET /execution - Get all raw executions for your account
 *  - GET /execution/tradeHistory - Get all balance-affecting executions
 *                                   - includes trade, insurance charge, and settlement
 *  @param {str} symbol
 */

class Execution{
    constructor(symbol) {
        this.symbol = symbol;
        this.path = "/api/v1/execution";
    }

    /**
    * Set execution dict
    *   GET /execution
    *
    * @param {dict} filter_dict - Grab by critera
    * @param {int} count- num of results to fetch
    * @param {bool} reverse - True: sort newest first
    * @param {date-time} startime - starting point
    * @param {date-time} endtime - ending date
    *
    * @return {list) - 'GET', path, data to send in body
    */
    setExecution(filter_dict, count, reverse, starttime = null, endtime = null){
        if (starttime == null && endtime == null) {
            var data = {symbol: this.symbol,
                        filter: filter_dict,
                        count: count,
                        reverse: reverse
                        };
        } else {
            var data = {symbol: this.symbol,
                        filter: filter_dict,
                        count: count,
                        reverse: reverse,
                        startTime: starttime,
                        endTime: endtime
                        };
        }

        return ['GET', this.path, data];
    }


    /**
    * Set execution trade history dict
    *   GET /execution/tradeHistory
    *
    * @param {dict} filter_dict - Grab by critera
    * @param {int} count - num of results to fetch
    * @param {bool} reverse - True: sort newest first
    * @param {date-time} startime - starting point
    * @param {date-time} endtime - ending date
    *
    * @return {list} - 'GET', path, data to send in body
    */
    setExecutionTradeHistory(filter_dict, count, reverse, starttime = null, endtime = null){
        if (starttime == null && endtime == null) {
            var data = {symbol: this.symbol,
                        filter: filter_dict,
                        count: count,
                        reverse: reverse
                        };
        } else {
            var data = {symbol: this.symbol,
                        filter: filter_dict,
                        count: count,
                        reverse: reverse,
                        startTime: starttime,
                        endTime: endtime
                        };
        }

        return ['GET', this.path + '/tradeHistory', data];
    }
}

module.exports = Execution;
