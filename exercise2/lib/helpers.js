/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');
var util = require('util');
var debug = util.debuglog('helpers');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){

  //console.log(`Sunday -- [[01][12][48]] -- METHOD: helpers.parseJsonToObject ---------- PARAMS: (str: ${str}) ---------- PURPOSE: Parse Json to Obj---------- RETURNS: $<{(err, data)}> -->, err obj: ${obj}`);

  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    //console.log('------------------------------    JSON helper   ERROR------------',e);
    //console.log('------------------------------    JSON helper   ERROR-------the string sent-----',str);

    return {}; // may take out the e
  }
};

// Create a SHA256 hash
helpers.hash = function(str){

  //console.log(`Sunday -- [[01][12][48]] -- METHOD: helpers.hash ---------- PARAMS: (str: ${str}) ---------- PURPOSE: Create a SHA256 hash   --- RETURNS: $<{(err, data)}> -->, true/false -- hash: ${hash}`);

  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};
// End helpers.hash



// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){

//console.log(`Sunday -- [[01][18][28]] -- METHOD: helpers.createRandomString ---------- PARAMS: (strLength) ---------- PURPOSE: Create custom id ---------- RETURNS: $<{(true/false, Random str)}> -->, str: ${str}`);

  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++) {
        // Get a random charactert from the possibleCharacters string
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the string
        str+=randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};
// End helpers.createRandomString



helpers.sendTwilioSms = function(phone,msg,callback){

  //console.log(`Sunday -- [[01][21][35]] -- METHOD: helpers.sendTwilioSms ---------- PARAMS: (phone,msg,callback) ---------- PURPOSE: Send SMS Twillo ---------- RETURNS: $<{(err, data)}> -->, <data>`); 
  //console.log(`helpers.sendTwilioSms -- payload: ${stringPayload}, 'status', ${status}, 'requestDetails', ${requestDetails}, 'req payload', ${payload}, 'phone', ${phone} 'msg', ${msg}`);
  
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){

    // Configure the request payload
    var payload = {
      'From' : config.twilio.fromPhone,
      'To' : '+1'+phone,
      'Body' : msg
    };
    var stringPayload = querystring.stringify(payload);


    // Configure the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'method' : 'POST',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
        // Grab the status of the sent request
        var status =  res.statusCode;
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false);
        } else {
          callback('Status code returned was '+status);
        }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback(`Given parameters were missing or invalid ----->, payload: ${stringPayload}, 'status', ${status}, 'requestDetails', ${requestDetails}, 'req payload', ${payload}, 'phone', ${phone} 'msg', ${msg}`);
  }

};
// End sendTwilioSms

//format time
// Requirements -- none
helpers.getFormatedTimeStamp = function(err, callback) {
  //console.log(`------------------------****----------------------- HELPERS.formatTimeStamp: -------------------****----------------------`);

  const options = { weekday: 'long', year: 'long', month: 'long', day: 'long', hour: 'long', minute: 'long', seconds: 'long', milliseconds: 'long' };
  const event = new Date(Date(options.weekday, options.year, options.month, options.day, options.hour, options.minute, options.seconds, options.milliseconds));
  var today = new Date();
  var milliseconds = today.getUTCMilliseconds();
  var weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  var d_int = new Date().getUTCDay();
  var day = weekdays[d_int];
  var dateHalf = event.toLocaleDateString([], event);
  var timeHalf = event.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', millisecond: '2-digit' });

  return (`On [${day} ${dateHalf} at ${timeHalf} mS ${milliseconds}]`);
  //    \x1b[33m%s\x1b[0m -- \x1b[33m%s\x1b[0m
  
}



// Export the module
module.exports = helpers;
