const crypto = require("crypto");
const request = require('request');

const api_headers = {
    'x-autosnipe-apikey':'',
    'x-autosnipe-signature': '',
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'content-type' : 'application/json',
};

class autosnipeApi{
    
    constructor(data){
        
        this.endPoint = "https://api.autosnipe.ai/sniper-api";
        this.apiKeys = {
            apiKey: '',
            apiSecret: ''
        };
        
        if (data){
            if(typeof(data.apiKey) !== 'string') throw Error('MISSING API_KEY');
            if(typeof(data.apiSecret) !== 'string') throw Error('MISSING API_SECRET');
            if(data.apiKey.length != 20) throw Error('INVALID API_KEY');
            if(data.apiSecret.length != 30) throw Error('INVALID API_SECRET');
            if(typeof data === 'object')
                {
                this.apiKeys = data;
            }
            else {
                throw Error('Data Format is incorrect.');
            }
        }
    }
    
    
    verifyKey(data){
        if(typeof(data.apiKey) === 'string' && data.apiKey.length == 20 && typeof(data.apiSecret) === 'string' && data.apiSecret.length == 30){
            return true;
        }else{
            return false;
        }
    }
    getPayload(body){
        const payloadData = {
            url : body.url,
            timeStamp_nonce : body.timeStamp_nonce,
            body: JSON.stringify(body)
        };
        return new Buffer(JSON.stringify(payloadData)).toString('base64');
    }
    getSignature(payload, apiSecret){
        return crypto.createHmac('sha512',apiSecret)
        .update(payload)
        .digest('hex');
    }
    
    callPostAPI(methodName, body, callback){
        const timeStamp_nonce = Date.now().toString();
        body.url = this.endPoint+'/'+methodName;
        body.timeStamp_nonce = timeStamp_nonce;
        const options = {
            url : body.url,
            method : 'POST',
            body : JSON.stringify(body)
        }
        let payload = this.getPayload(body);
        let signature = this.getSignature(payload, this.apiKeys.apiSecret);
        let headers = api_headers;
        headers['x-autosnipe-apikey'] = this.apiKeys.apiKey;
        headers['x-autosnipe-signature'] = signature;
        options.headers = headers;

        request(options, function(error, res, body){
            if(!error){
                try {
                    body = JSON.parse(body);
                    return callback("",body);
                } catch(err){
                    return callback("Invalid response " + methodName,"");
                }
            }else{
                return callback(error,"");
            }
        });
    }

    callGetAPI(methodName, callback){
        const timeStamp_nonce = Date.now().toString();
        let body = {};
        body.url = this.endPoint+'/'+methodName;
        body.timeStamp_nonce = timeStamp_nonce;
        const options = {
            url : body.url,
            method : 'GET',
            body : JSON.stringify(body)
        }
        let payload = this.getPayload(body);
        let signature = this.getSignature(payload, this.apiKeys.apiSecret);
        let headers = api_headers;
        headers['x-autosnipe-apikey'] = this.apiKeys.apiKey;
        headers['x-autosnipe-signature'] = signature;
        options.headers = headers;

        request(options, function(error, res, body){
            if(!error){
                try {
                    body = JSON.parse(body);
                    return callback("",body);
                } catch(err){
                    return callback("Invalid response " + methodName,"");
                }
            }else{
                return callback(error,"");
            }
        });
    }
    
    validateCallBacks(callback) {
        if(typeof(callback) !== 'function') throw Error('Callback not found.');
    }
    
    listRaydiumPairs(callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            this.callGetAPI("token/pairs?type=0", callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    listTopPairs(callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            this.callGetAPI("token/pairs?type=1", callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    listPumpPairs(callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            this.callGetAPI("token/pairs?type=2", callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    listMoonshotPairs(callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            this.callGetAPI("token/pairs?type=3", callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }
    
    
    listUserHoldings(page, callback){
        this.validateCallBacks(callback);
        
        if(this.verifyKey(this.apiKeys)){
            let body = {page};
            this.callPostAPI("user/holdings", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }
    
    placeBuyOrder({amount, jito_tip, token_id, platform}, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {amount, chain_id:0, chat_id:0, message_id:0, jito_tip, token_id, platform};
            this.callPostAPI("token/buy", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    placeSellOrder({amount, jito_tip, token_id, platform}, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {amount, chain_id:0, chat_id:0, message_id:0, jito_tip, token_id, platform};
            this.callPostAPI("token/sell", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    orderStatus(orderID, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {orderID};
            this.callPostAPI("token/checkOrderStatus", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    placeBuyLimitOrder({token_id, amount, jito_tip, rate, platform, expiry_date}, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {token_id, amount, chain_id:0, chat_id:0, message_id:0, jito_tip, rate, platform, expiry_date};
            this.callPostAPI("limit/buy", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    placeSellLimitOrder({token_id, amount, jito_tip, rate, platform, expiry_date}, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {token_id, amount, chain_id:0, chat_id:0, message_id:0, jito_tip, rate, platform, expiry_date};
            this.callPostAPI("limit/sell", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }
    
    cancelLimitOrder(limitOrderId, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {limitOrderId};
            this.callPostAPI("limit/cancel", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }

    listLimitOrders(page, callback){
        this.validateCallBacks(callback);
        if(this.verifyKey(this.apiKeys)){
            let body = {page};
            this.callPostAPI("limit/orders", body, callback);
        }else{
            return callback("Invalid API_KEY","");
        }
    }
    
}

module.exports = autosnipeApi;
