const autosnipeApi = require('../index');
const config = require('../config');

const autosnipe = new autosnipeApi({
      apiKey :  config.apiKey,
      apiSecret : config.apiSecret
}); 

autosnipe.listRaydiumPairs(function(error, data) {
});

autosnipe.listTopPairs(function(error, data) {
});

autosnipe.listPumpPairs(function(error, data) {
});

autosnipe.listMoonshotPairs(function(error, data) {
});