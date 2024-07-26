let data = {
    "key": 'IHEPKDRb86EMRMcwZz48',
    "Secret": '1JS1F3Su2BHumzFZYd2iejHaH8A1E7',
}
const fs = require('fs');
const crypto = require('crypto');
const request = require('request');
const base_url = "https://api.autosnipe.ai/sniper-api";
async function callAuthAPI(end_point, body = {}, method) {
    const timeStamp_nonce = Date.now().toString();
    body.url = base_url + end_point;
    body.timeStamp_nonce = timeStamp_nonce;
    
    let payload = getPayload(body);
    let signature = getSignature(payload, data.Secret);
    
    let headers = {
        'x-autosnipe-apikey': data.key,
        'x-autosnipe-signature': signature,
        'Content-Type': 'application/json'
    };
    
    
    let options = {
        url: body.url,
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }
    
    request(options, function(error, res, body) {
        if (!error) {
            try {
                console.log({ body });
                fs.writeFileSync("./hold5297.json", body);
                // return body;
            } catch (err) {
                console.log("Error ", err);
            }
        } else {
            console.log("Error2 ", error);
        }
    });
}

function getPayload(body) {
    const content = {
        url: body.url,
        timeStamp_nonce: body.timeStamp_nonce,
        body: JSON.stringify(body)
    };
    return Buffer.from(JSON.stringify(content)).toString('base64');
}

function getSignature(payload, apiSecretKey) {
    return crypto.createHmac('sha512', apiSecretKey)
    .update(payload)
    .digest('hex');
}

// newPairs

async function newPairs(){
    try {
        let body = {}
        let resp = await callAuthAPI("/token/pairs?type=0", body, "GET")
        console.log("newPairs Resp: ", resp);
    } catch (error) {
        console.log("Error calling newPairs ", error);
    }
}
//  newPairs();
// topPairs

async function topPairs(){
    try {
        let body = {}
        let resp = await callAuthAPI("/token/pairs?type=1", body, "GET")
        console.log("topPairs Resp: ", resp);
    } catch (error) {
        console.log("Error calling topPairs ", error);
    }
}
// topPairs();

// pumpfunPairs

async function pumpfunPairs(){
    try {
        let body = {}
        let resp = await callAuthAPI("/token/pairs?type=2", body, "GET")
        console.log("pumpfunPairs Resp: ", resp);
    } catch (error) {
        console.log("Error calling pumpfunPairs ", error);
    }
}
// pumpfunPairs();
// moonshotPairs
async function moonshotPairs(){
    try {
        let body = {}
        let resp = await callAuthAPI("/token/pairs?type=3", body, "GET")
        console.log("moonshotPairs Resp: ", resp);
    } catch (error) {
        console.log("Error calling moonshotPairs ", error);
    }
}
// moonshotPairs();


// Buy Token 
async function buy(){
    try {
        let body = {amount:0.001, jito_tip:0, token_address:"DP9QKhoKbCVdBcNt4FdwvEac22ZJvhgbB3Bygh8Xcfd4", platform:0, chain_id:0};
        let resp = await callAuthAPI("/token/buy", body, "POST")
        console.log("buy Resp: ", resp);
    } catch (error) {
        console.log("Error calling buy ", error);
    }
}

// buy();

async function sell(){
    try {
        let body = {amount:40.29997671, jito_tip:0, token_address:"DP9QKhoKbCVdBcNt4FdwvEac22ZJvhgbB3Bygh8Xcfd4", platform:0, chain_id:0};
        let resp = await callAuthAPI("/token/sell", body, "POST")
        console.log("sell Resp: ", resp);
    } catch (error) {
        console.log("Error calling sell ", error);
    }
}

// sell();


async function orderStatus(){
    try {
        let body = {orderID:41165};
        let resp = await callAuthAPI("/token/checkOrderStatus", body, "POST")
        console.log("sell Resp: ", resp);
    } catch (error) {
        console.log("Error calling sell ", error);
    }
}
// orderStatus();
async function holdings(){
    try {
        let body = {page:0};
        let resp = await callAuthAPI("/user/holdings", body, "POST")
        console.log("holdings: ", resp);
    } catch (error) {
        console.log("Error calling holdings ", error);
    }
}
holdings();

// Limit 
// Buy Token 
async function limitBuy(){
    try {
        let body = {amount:0.001, jito_tip:0, rate, token_address:"DP9QKhoKbCVdBcNt4FdwvEac22ZJvhgbB3Bygh8Xcfd4", platform:0, chain_id:0};
        let resp = await callAuthAPI("/limit/buy", body, "POST")
        console.log("limitBuy Resp: ", resp);
    } catch (error) {
        console.log("Error calling limitBuy ", error);
    }
}

// limitBuy();

async function limitSell(){
    try {
        let body = {amount:40.29997671, jito_tip:0, rate, token_address:"DP9QKhoKbCVdBcNt4FdwvEac22ZJvhgbB3Bygh8Xcfd4", platform:0, chain_id:0};
        let resp = await callAuthAPI("/limit/sell", body, "POST")
        console.log("limitSell Resp: ", resp);
    } catch (error) {
        console.log("Error calling limitSell ", error);
    }
}

// limitSell();

// limitOrders();

async function limitOrders(){
    try {
        let body = {};
        let resp = await callAuthAPI("/limit/orders?page=0&token_id=393690", body, "GET")
        console.log("limitOrders Resp: ", resp);
    } catch (error) {
        console.log("Error calling limitOrders ", error);
    }
}
//limitOrders();
