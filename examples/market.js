const autosnipeApi = require('../index');
const config = require('../config');

const autosnipe = new autosnipeApi({
      apiKey :  config.apiKey,
      apiSecret : config.apiSecret
}); 

autosnipe.placeBuyOrder({amount, chain_id, jito_tip, token_address, platform}, function(error, data) {
	console.log("placeBuyOrder: ",{error, data});
});

autosnipe.placeSellOrder({amount, chain_id, jito_tip, token_address, platform}, function(error, data) {
	console.log("placeSellOrder: ",{error, data});
});

autosnipe.orderStatus(orderID, function(error, data) {
	console.log("orderStatus: ",{error, data});
});

autosnipe.listUserHoldings(0, function(error, data) {
	console.log("listUserHoldings: ",{error, data});
});