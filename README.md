AutoSnipe SDK

API Details: 
Base: https://api.autosnipe.ai/sniper-api/

After login 

1. Create API Key / Secret by using the API:
make a GET Request to /auth/getAPICredentials
Maximun 5 API Keys/Secrets can be generated for a user.

2. To Deactivate the API Key / Secret 
make a GET Request to /auth/deactivateAPIKey

3. To Retrive the API Key / Secret list
make a GET Request to /auth/getAPIKeyList

Once the user has the API KEY AND SECRET, it can be used to make the following requests using the autosnipe_sdk

1. listRaydiumPairs
2. listTopPairs
3. listPumpPairs
4. listMoonshotPairs
5. placeBuyOrder
6. placeSellOrder
7. orderStatus
8. listUserHoldings
9. placeBuyLimitOrder
10. placeSellLimitOrder
11. cancelLimitOrder
12. listLimitOrders

jito_tip - tip given for faster transaction 
token_id - passed in listPairs 
platform - (0-Raydium, 1-Pump, 2-Moonshot)

Example to call these functions are in examples/ 
market.js, pairs.js, limit.js 
