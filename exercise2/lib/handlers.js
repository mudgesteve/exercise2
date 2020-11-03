/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var util = require('util');
var url = require('url');
const querystring = require('querystring');
var StringDecoder = require("string_decoder").StringDecoder;
var debug = util.debuglog('handles');

// Define all the handlers
var handlers = {};

// Ping
handlers.ping = function(data,callback){

  setTimeout(function(){
    callback(200);
  },5000);

};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};



// Validate Methods coming in req
handlers.menuitems = function(data,callback) {
  console.log(`Saturday -- [[20][36][40]] -- METHOD: handlers.users --- PARAMS: $<{(data,callback)}> --- PURPOSE:  [VALIDDATES] the Method routes it to METHOD  ---------- RETURNS: (err) passes received data -->`, data);

  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._menuitems[data.method](data,callback);
  } else {
    // just show menu items
    callback(404);
  }

};

// Container for menu items
handlers.menuitems = {};

// Show Menu Items
handlers._menuitems.showmenu = function(data, callback) {
  console.log(`< -- begin --------------------------------x \n [< -- codeline 50] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [GET-> PARAMS:  [none]> -- PURPOSE: [Send back the menu of items] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);
// for now just send the menu Item object on a get from this route
    // Configure the request details
    var menuItem = {
      'id' : helpers.createRandomString(25),
      'title' : 'Taco with cheese',
      'price' : 2.95,
    };

    // Build items
    item1 = {id: helpers.createRandomString(25), title: 'Taco', price: 2.95}
    item2 = {id: helpers.createRandomString(25), title: 'burrito', price: 4.95}
    item3 = {id: helpers.createRandomString(25), title: 'fries', price: 3.95}

    // Put them in a bucket
    menuItems = {
      item1,
      item2,
      item3
    };

    // Send them back
    console.log(`\n [< ----------------- [menuItems] : -------------- >]\n\n`, menuItems);
    callback(200, menuItems);

}; // End showmenu

handlers._menuitems.post = function(data, callback) {
  // Post
  callback(200);
};

handlers._menuitems.get = function(data, callback) {
  // Get
  callback(200);
};

handlers._menuitems.put = function(data, callback) {
  // Put
  callback(200);
};

handlers._menuitems.delete = function(data, callback) {
  // Delete
  callback(200);
};

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Users
handlers.users = function(data,callback){

  //console.log(`Saturday -- [[20][36][40]] -- METHOD: handlers.users --- PARAMS: $<{(data,callback)}> --- PURPOSE:  [VALIDDATES] the Method routes it to METHOD  ---------- RETURNS: (err) passes received data -->`, data);

  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }

};

// Container for all the users methods
handlers._users  = {};


// Users - signin
handlers._users.signin = function(data, callback) {
  var now = helpers.getFormatedTimeStamp();
  console.log(now, " <-- TOP of method ----> ( handlers.users.signin ) [data] coming in   --------> \n\n ", data, "\n");  //, "<-------- end received data displayed -- handlers.users.signin receiveing data --- ***** ----->, \n",'\n');
  //console.log(' <---------BOTTOM users.signin---------------------   [END]   ---------------------------------------------------  [END]  ---------> \n ');
  var id = typeof(data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;


  // Check if th user exist online if not just post
  var isOnline = handlers._users.isSignedIn(data);
  console.log(" <-- 1st callback users.signin [received from isSignedIn] -- in ( handlers.users.signin ) receiveing  [data] --------> \n\n", data); //new Date(), " <----- Timestamp[UNIX] after -- handlers.users.signin receiveing data --- ***** -----> \n ",data,'\n');

  if (isOnline) {
    // User is on line
    console.log('ON-LINE');
    callback(401, { info: "User is online" });
  } else {
    //User is not online Must be a new user
    console.log('OFF-LINE');
    // handlers._users.post(data, callback, function(data, callback) {
    //   if (data) {
    //     // Set user onLine flag in the post method
    //     callback(200, data.payload);
    //   }
    // });
  } // END if online

}; 
// END iF .signin


// Required valid token id
// Users - signout -debug("Logging to file succeeded");
handlers._users.signout = function(data, callback) {
  var now = helpers.getFormatedTimeStamp();
  console.log(now, " <--------------- Timestamp -- at TOP ( handlers.users.signout ) receiveing  [data] --------> \n ", data, "\n", new Date(), " <------------ Timestamp[UNIX] after -- handlers.users.signout receiveing data --- ***** -----> \n ");
  //console.log(' <----------------------------------------   [END]   ---------------------------------------------------  [END]  ---------> \n ');

  var id = typeof(data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
  //console.log("SIGN-OUT  token ID --------------------------------> ", id);
  // TODO -- this will need attention 10/30/2020 4:29PM
  if (id) {
    // Lookup the token
    _data.read("tokens", id, function(err, tokenData) {
      if (!err && tokenData) {
        // Delete the token
        _data.delete("tokens", id, function(err) {
          if (!err) {
            callback(200, { Success: "Signed out deleted token" });
          } else {
            callback(500, { Error: "Could not delete the specified token" });
          }
        });
      } else {
        callback(400, { Error: "Could not find the specified token." });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }

}; 
// END OF .signout



// Check if user is logged in -- return true || false
// check onlne flag in userData using email as id to get userData
// 
handlers._users.isSignedIn = function(data) {
    var now = helpers.getFormatedTimeStamp();
    console.log(now, " <-- TOP of method ----> ( handlers.users.isSignedIn ) [data] coming in   --------> \n\n ", data, "\n");  //, "<-------- end received data displayed -- handlers.users.signin receiveing data --- ***** ----->, \n",'\n');
    //console.log(' <----------------------------------------   [END]   ---------------------------------------------------  [END]  ---------> \n ');

    var id = typeof(data.headers.token) == "string" && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    
    if(id) {
      return true;
    } else {
      return false;
    }

    //console.log("SIGN-OUT  token ID --------------------------------> ", id);
    // TODO -- this will need attention 10/30/2020 4:29PM
    // if (id) {
    //   // Lookup the token
    //   _data.read("tokens", id, function(err, tokenData) {
        
    //     if (!err && tokenData) {
    //       // Found the token
    //       console.log('TOKEN ----------- ',tokenData);

    //       //callback(400, { Error: "Could not find the specified token." });
    //       return false;
    //     } else {
    //       //callback(400, { Error: "Could not find the specified token." });
    //       return false;
    //     }
    //   });
    // } else {
    //   //callback(400, { Error: "Missing required field" });
    //   return false;
    // }

}; // END OF .isSignedIn

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

/*
  Method Name: -- _users.post 
  Purpose: -- post
  Required: -- data: firstName, lastName, phone, password, tosAgreement, online
  Optional data: none
  Returns: -- Success with sending data, Success without sending back data
*/
handlers._users.post = function(data,callback){
  
  console.log(`< -- begin --------------------------------x \n [< -- codeline 167] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [POST] --> PARAMS:  [<data -- callback]> -- PURPOSE: [<POST WHAT -- New User> ] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);

  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
  var onLine = typeof(data.payload.onLine) == 'boolean' && data.payload.onLine == true ? true : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var name = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;

  // IF no name given force it shape name
  if (!name && firstName && lastName) {
    name = firstName+' '+lastName;
  }

  if(firstName && lastName && phone && password && tosAgreement && onLine){
    console.log('< --- 1. --  fn:', firstName, 'ln:', lastName, 'phone:', phone, 'password:', password,
      '\n more .... ', 'tosApgreement:', tosAgreement, 'onLine:', onLine, 'email:', email, 'streetAddress:', streetAddress);

    // Make sure the user doesnt already exist
    _data.read('users',phone,function(err,data){console.log(`< -- begin --------------------------------x \n [< -- codeline 189] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [zGET] --> PARAMS:  [<data -- callback>]> -- PURPOSE: [<GET WHAT -- $0>] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);
      console.log(`\n [< --- 2. -------------- [phone: ${phone}] : -------------- >]\n\n`);
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password); 
        console.log(`\n [< --- 3. -------------- [hashedPassword: ${hashedPassword}] : -------------- >]\n\n`);
        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true,
            'onLine' : onLine,
            'streetAddress' : streetAddress,
            'email' : email,
            'name' : name
          };
          console.log(`\n [< --- 4. -------------- [userObject] : -------------- >]\n\n userObject: --- > ${userObject}\n\n`);
          // Store the user
          _data.create('users',phone,userObject,function(err){
            console.log(`\n [< --- 5. -------------- [phone: ${phone}] : --- NOTE: see obj above ----------- >]\n\n`);
            if(!err){
              callback(200, userObject);
            } else {
              callback(500,{'Error' : `Could not create the new user , 'fn:', ${firstName}, 'ln', ${lastName}, 'phone', ${phone}, 'password', ${password}, 'tosApgreement', ${tosAgreement} `});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });

  } else {
    console.log('< --- 6. --  fn:', firstName, 'ln:', lastName, 'phone:', phone, 'password:', password,
      '\n more .... ', 'tosApgreement:', tosAgreement, 'onLine:', onLine, 'email:', email, 'streetAddress:', streetAddress);
    
      callback(400,{'Error' : `Missing required fields', 'fn:', ${firstName}, 'ln', ${lastName}, 'phone', ${phone}, 'password', ${password}, 'tosAgreement', ${tosAgreement}` });
  }

};
// End Users Post

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Required data: phone
// Optional data: none
handlers._users.get = function(data,callback){

  console.log(`Saturday -- [[20][03][38]] -- METHOD: handlers._users.get ---------- PARAMS: (data,callback) ---------- PURPOSE: GET a user ---------- RETURNS: (err, data)-->`, data);

  // Check that phone number is valid
  var phone = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 10 ? data.queryStringObject.id.trim() : false;
  // var phone1 = typeof(data.payload.phone) == 'string' && data.payload.phone.length == 10 ? data.payload.phone : false;
  // if (!phone) {
  //   phone = phone1;
  // }

  if(phone){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    console.log('TOKEN -- in GET:', token);
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid && phone){
        // Lookup the user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }

        });

      } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required field -- '})
  }
};
// End Users Get

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = function(data,callback){

  console.log(`Saturday -- [[20][05][28]] -- METHOD: handlers._users.put ---------- PARAMS: (data,callback) ---------- PURPOSE: UPDATE user ---------- RETURNS: (err) -->, TODO it can <data>`);
  
  // Check for required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement ? data.payload.tosAgreement : false;
  var onLine = typeof(data.payload.onLine) == 'boolean' && data.payload.onLine ? data.payload.onLine : false;

  // Error if phone is invalid
  if(phone){
    // Error if nothing is sent to update
    if(firstName || lastName || password || tosAgreement || onLine){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the phone number
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){

          // Lookup the user
          _data.read('users',phone,function(err,userData){
            if(!err && userData){
              // Update the fields if necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              if(tosAgreement){
                userData.tosAgreement = tosAgreement;
              }
              if(onLine){
                userData.onLine = onLine;
              }
              // Store the new updates
              _data.update('users',phone,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update. -- Phone '});
    }
  } else {
    callback(400,{'Error' : 'Missing required field. -- Phone'});
  }

};
// Ene Users Put

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Required data: phone
// Cleanup old checks associated with the user
handlers._users.delete = function(data,callback){

  console.log(`Saturday -- [[20][15][27]] -- METHOD: handlers._users.delete ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: DELETE Users, checks ---------- RETURNS: (err) -->, ${data}`);
  
  // Check that phone number is valid
  var phone = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 10 ? data.queryStringObject.id.trim() : false;
  console.log('USERS DELETE ---------------------------------------->    phone = ', phone);
  if(phone){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete each of the checks associated with the user
                var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                var checksToDelete = userChecks.length;
                if(checksToDelete > 0){
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(function(checkId){
                    // Delete the check
                    _data.delete('checks',checkId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if(checksDeleted == checksToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's checks. All checks may not have been deleted from the system successfully."})
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};
// End  Users Delete 

// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------
// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------
// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------

// Tokens
handlers.tokens = function(data,callback){
  
  //console.log(`Saturday -- [[20][36][40]] -- METHOD: handlers.tokens --- PARAMS: $<{(data,callback)}> --- PURPOSE:  [VALIDDATES] the Method routes it to METHOD  ---------- RETURNS: (err) passes received data -->`, data);

  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};
// End Tokens Validator

// Container for all the tokens methods
handlers._tokens  = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  console.log(`Saturday -- [[20][42][27]] -- METHOD: handlers._tokens.post---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE:Create Token---------- RETURNS: (err,data) -->`, data);

  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup the user who matches that phone number
    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60 * 24;
          var tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s).'})
  }
};
// End Tokens Post

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){

  console.log(`Saturday -- [[20][58][04]] -- METHOD: handlers._tokens.get ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: Return a token ---------- RETURNS: $<{(err, data)}> --> tokenData`);

  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};
// End Tokens Get

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){

  console.log(`Saturday -- [[21][00][00]] -- METHOD: handlers._tokens.put ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: TO extend token expires by 1hr ---------- RETURNS: $<{(err)}> -->`);

  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() 
      : typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;

  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

  console.log(`TOKENS PUT:   id: ${id}, extend: ${extend}`);
  if(id && extend){
    // Lookup the existing token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60 * 24;
          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};
// End Tokens put

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){

  console.log(`Saturday -- [[21][04][09]] -- METHOD: handlers._tokens.delete ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: TO Delete token ---------- RETURNS: $<{(err)}> -->`);

  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};
// End Tokens Delete

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){

  console.log(`< -- begin fn: -----------------------------x \n [< -- codeline 591] <-- [ ${global.Date().slice(0,33)} ]-- fn: [handlers._tokens.verifyToken] --> PARAMS:  [ id: ${id} phone: ${phone}]> -- PURPOSE: [ verify a token ] \n ----xx---- RETURNS: [<err -- ${callback}>] -->\n\n`);

  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    console.log('ID in verify:', id);
    if(!err && tokenData){
      console.log('TOKEN in verify:', tokenData);
      // Check that the token is for the given user and has not expired
      if(tokenData.phone == phone && tokenData.expires > (Date.now() + (1000 * 60 & 60 * 124))){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
// End Verify A Token

// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------
// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------
// Section Change ---------------------         Section Change       ---------------------------------------- Section Change ################## -------------

// Checks
handlers.checks = function(data,callback){

  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405,{'Error':`${data}`});
  }
};
// End Checks

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Container for all the checks methods
handlers._checks  = {};

// Checks - post
// Required data: protocol,url,method,successCodes,timeoutSeconds
// Optional data: none
handlers._checks.post = function(data,callback){

  //console.log(`Saturday -- [[20][42][27]] -- METHOD: handlers._checks.post---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: Create Check & Update User Data---------- RETURNS: (err,data) -->\n Data Coming In:\n`, data );

  console.log(`< -- begin --------------------------------x \n [< -- codeline 637] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [POST] --> PARAMS:  [<data -- callback]> -- PURPOSE: [<POST WHAT -- create check> ] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);
  // Validate inputs
  // var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  // var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  // var method = typeof(data.method) == 'string' && ['post','get','put','delete'].indexOf(data.method) > -1 ? data.method : false;
  // var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  // var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
  
  var protocol = 'http';
  var url = data.trimmedPath;
  var method = typeof(data.method) == 'string' && ['post','get','put','delete'].indexOf(data.method) > -1 ? data.method : false;
  var successCodes =[200,400,401,402,403,404,500];
  var timeoutSeconds = 1000 * 60 * 60;

  console.log(`vars: \n', 'pro:' ${protocol} url: ${url} 'method:' ${method} successCodes: ${successCodes} timeOutSeconds: ${timeoutSeconds}`);

  if(protocol && url && method && successCodes && timeoutSeconds){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user phone by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if(!err && tokenData){
        var userPhone = tokenData.phone;

        // Lookup the user data
        _data.read('users',userPhone,function(err,userData){
          if(!err && userData){
            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that user has less than the number of max-checks per user
            if(userChecks.length < config.maxChecks){
              // Create random id for check
              var checkId = helpers.createRandomString(20);

              // Create check object including userPhone
              var checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              };

              // Save the object
              _data.create('checks',checkId,checkObject,function(err){
                if(!err){
                  // Add check id to the user's object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update('users',userPhone,userData,function(err){
                    if(!err){
                      // Return the data about the new check
                      callback(200,checkObject);
                    } else {
                      callback(500,{'Error' : 'Could not update the user with the new check.'});
                    }
                  });
                } else {
                  callback(500,{'Error' : 'Could not create the new check'});
                }
              });

            } else {
              callback(400,{'Error' : 'The user already has the maximum number of checks ('+config.maxChecks+').'})
            }

          } else {
            callback(403);
          }
        });


      } else {
        callback(403);
      }

    });

  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }

};
// End Checks Post

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = function(data,callback){
//fixed('ddd mm d hh:mm:ss')
  //console.log(`Monday -- [[14][22][42]] -- METHOD: <handlers._checks.get> -- PARAMS: <data,callback> -- PURPOSE: Return a checkData -- RETURNS: <err, data> -->\n\n`,`data --> `, data);
  //console.log(` -- ${global.Date().slice(0,33)} -- METHOD: '\x1b[36m%s -- <handlers._checks.get> -- \x1b[0m' -- PARAMS: <data,callback> -- PURPOSE: Return a checkData -- RETURNS: <err, data> -->\n\n`,`data --> `, data);
  
  //console.log(`From line 738 -- [ ${global.Date().slice(0,33)} ]-- METHOD:MethodName] - PARAMS: <data,callback> -- PURPOSE: PURPOSE -- RETURNS: <err, data> -->\n\n`, `data: -->`, data,`\n`);
  // {", "\x1b[36m%s", "} MethodName{", " \x1b]36m%s", "} - PARAMS: <data,callback> -- PURPOSE: PURPOSE -- RETURNS: <err, data> -->\n\n`, `data: -->`, data,`\n`);

console.log(`< -- begin --------------------------------x \n [< -- codeline 741] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [GET] --> PARAMS:  [<data -- callback]> -- PURPOSE: [<GET WHAT -- $0>] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);



  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
   
  console.log(`\n [< 1 ----------------- [id] : ----------------- >]`, id,`\n`);
  
  if(id){
    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      console.log('\n < 2 ----------------- [checkData]: ----------------- >\n\n',checkData);
      var ckData = checkData;
      if(!err && checkData){
        // Get the token that sent the request
        console.log(`\n [< 3 ----------------- [err t/f] : -------------- >]`,err, '\n');
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          console.log(`\n [< 4 ----------------- [token id] : -------------- >]`,token, '\n');
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            console.log(`\n [< 5 ----------------- [tokenIsValid t/f] : -------------- >]`,tokenIsValid, '\n');
          if(tokenIsValid){
            // Return check data
            callback(200,checkData);
          } else {
            callback(403,{'Error' : 'Missing required field, Invalid Token'});
          }
        });
      } else {
        callback(401,{'Error' : 'Missing required field, checkData -- Valid ID'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid -- Invalid ID'})
  }


};
// End Checks get

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Checks - put
// Required data: id
// Optional data: protocol,url,method,successCodes,timeoutSeconds (one must be sent)
handlers._checks.put = function(data,callback){

  console.log(`Saturday -- [[20][05][28]] -- METHOD: handlers._checks.put ---------- PARAMS: (data,callback) ---------- PURPOSE: UPDATE check ---------- RETURNS: (err) -->, TODO it can <data>`);
  console.log(`< -- begin --------------------------------x \n
     [< -- codeline 789] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: handlers._checks.put  [PUT] --> PARAMS:  [<data -- callback]> -- PURPOSE: [<PUT WHAT -- $0>] -- RETURNS: [<err -- data>] -->\n\n`, `data: -->\n`, data,`\n`);
  
  // Check for required field
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    console.log(`\n [< --- at top before logic -------------- [id: ${id}] : -------------- >]\n\n`);
  // Check for optional fields
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  // Error if id is invalid
  if(id){
    console.log(`\n [< 1. ----------------- [id:${id}] : -------------- >]\n\n`);
    // Error if nothing is sent to update
    if(protocol || url || method || successCodes || timeoutSeconds){
      console.log('\n', '2. --- vars for put: -->\n','protocol:', protocol, 'url:', url, 'method:', method, 'successCodes:', successCodes, 'timeoutSeconds:', timeoutSeconds);

      // Lookup the check
      _data.read('checks',id,function(err,checkData){
        console.log(`\n [< 3. ----------------- [err: ${err}] : -------------- >]\n\n, checkData: ---->\n ${checkData}`);

        if(!err && checkData){
          console.log(`\n [< 4. ----------------- [checkData: see obj above] : -------------- >]\n\n`);
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          console.log(`\n [< 5. ----------------- [token: ${token}] : -------------- >]\n\n`);
          // Verify that the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            console.log(`\n [< 6. ----------------- [token: ${token} checkData.userPhone: ${checkData.userPhone}] : -------------- >]\n\n`);
            if(tokenIsValid){
              // Update check data where necessary
              if(protocol){
                checkData.protocol = protocol;
              }
              if(url){
                checkData.url = url;
              }
              if(method){
                checkData.method = method;
              }
              if(successCodes){
                checkData.successCodes = successCodes;
              }
              if(timeoutSeconds){
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store the new updates
              _data.update('checks',id,checkData,function(err){
                console.log(`\n [< 7. ----------------- [id: ${id}] : -------------- >]\n\n, checkData: ---->\n ${checkData}`);
                if(!err){
                  callback(200,checkData);
                } else {
                  callback(500,{'Error' : `Could not update check., protocol: ${protocol} url: ${url} method: ${method} successCodes ${successCodes} timeout: ${timeoutSeconds}`});
                }
              });
            } else {
              callback(403,{'Error' : `Check ID did not exist., protocol: ${protocol} url: ${url} method: ${method} successCodes ${successCodes} timeout: ${timeoutSeconds}`});
            }
          });
        } else {
          callback(400,{'Error' : `Check ID did not exist., protocol: ${protocol} url: ${url} method: ${method} successCodes ${successCodes} timeout: ${timeoutSeconds}`});
        }
      });
    } else {
      callback(400,{'Error' : `Missing fields to update., protocol: ${protocol} url: ${url} method: ${method} successCodes ${successCodes} timeout: ${timeoutSeconds}`});
    }
  } else {
    callback(400,{'Error' : `Missing id., protocol: ${protocol} url: ${url} method: ${method} successCodes ${successCodes} timeout: ${timeoutSeconds}`});
  }
};
// End Checks Put

// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >

// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = function(data,callback){

  console.log(`Saturday -- [[21][04][09]] -- METHOD: handlers._checks.delete ---------- PARAMS: $<{(data,callback)}> ---------- PURPOSE: TO Delete check ---------- RETURNS: $<{(err)}> -->`,data);

  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    console.log(`\n [< ----------------- [id] : -------------- >]\n\n`);
  if(id){
    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        console.log(`\n [< ----------------- [token: token] : -------------- >]\n\n`);
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){
            console.log(`\n [< ----------------- [tokenValid?: ${tokenIsValid}] : -------------- >]\n\n`);
            // Delete the check data
            _data.delete('checks',id,function(err){
                console.log(`\n [< ----------------- [err: ${err}] : -------------- >]\n\n`);
              if(!err){
                // Lookup the user's object to get all their checks
                _data.read('users',checkData.userPhone,function(err,userData){
                    console.log(`\n [< ----------------- [userData: ${userData}] : -------------- >]\n\n`);
                  if(!err){
                    var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                      console.log(`\n [< ----------------- [userChecks: ${userChecks}] : -------------- >]\n\n`);
                    // Remove the deleted check from their list of checks
                    var checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      userChecks.splice(checkPosition,1);
                      // Re-save the user's data
                      userData.checks = userChecks;
                      _data.update('users',checkData.userPhone,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update the user.'});
                        }
                      });
                    } else {
                      callback(500,{"Error" : "Could not find the check on the user's object, so could not remove it."});
                    }
                  } else {
                    callback(500,{"Error" : "Could not find the user who created the check, so could not remove the check from the list of checks on their user object."});
                  }
                });
              } else {
                callback(500,{"Error" : "Could not delete the check data."})
              }
            });
          } else {
            callback(403);
          }
        });
      } else {
        callback(400,{"Error" : "The check ID specified could not be found"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing valid Token id"});
  }
};
// End Checks Delete

// Export the handlers
module.exports = handlers;
