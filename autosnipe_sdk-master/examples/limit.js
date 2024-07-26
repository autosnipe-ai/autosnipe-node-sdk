const autosnipeApi = require('../index');
const config = require('../config');

const autosnipe = new autosnipeApi({
      apiKey :  config.apiKey,
      apiSecret : config.apiSecret
}); 

autosnipe.placeBuyLimitOrder({token_id, amount, chain_id, jito_tip, rate, platform, expiry_date}, function(error, data) {
	console.log("placeBuyLimitOrder: ",{error, data});
});

autosnipe.placeSellLimitOrder({token_id, amount, chain_id, jito_tip, rate, platform, expiry_date}, function(error, data) {
	console.log("placeSellLimitOrder: ",{error, data});
});

autosnipe.cancelLimitOrder(limitOrderId, function(error, data) {
	console.log("cancelLimitOrder: ",{error, data});
});

autosnipe.listLimitOrders(page, function(error, data) {
	console.log("listLimitOrders: ",{error, data});
});