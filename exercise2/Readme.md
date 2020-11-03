excercise 2 HomeWork and end-points
--- Please review --- a couple of snippets that i created are in here let me know what you think of them
--- Note to instructor -- I left TODOs regarding the timer thing for token life and know to change for dev
--- Please note just completed homework number 3
--- Read ahead about the two api we will be working with and----
--- Do you by chance have a check list of what to do when connecting to external api's
--- I realize api's are all specific BUT -- basics are what i am hoping to see a list of
--- seems the hit list of basics would be very similar for most api's -- Thanks for your time
--- Your instructor is very good for an old man like me and i am gaining from your efforts
--- An old man like myself is very displined with things to do list
--- I would really be very thankful for a HIT list -- if you can see your way clear to type one up for me
--- Also could you review my work and let me know if i am on the right path?
--- Thanks in advance
----------------------------------------------------------------------------------------------------------------
	Things to DO: -- section exercise 2
----------------------------------------------------------------------------------------------------------------
	
	Using the project at its current state:
	
	Start -- Develop Plan: as follows: (with a good plan postman will be MUCH more effective tool for me)
	
		-- The plan is the most important part
		-- Programs involed:
			-- VSCode -- node.js files
			-- NotePad -- for notes
			-- command prompt 
			-- console.logs -- used for easy access to ERROR
			-- Postman -- used for client-side agent
			-- Browser -- google searches!
	
	Prepare code for debugging --
	
		-- set up z.bat file so (changing debug mode and env vars is quick) -- Shown Below In Helpers Section
		-- USE a standard pattern for console.log 
			< each method name for example as its own: >
			-- name,
			-- params (data, err, callback),
			-- Purpose Why was it called? -- like like method [get, put, post, delete] or OTHER reason
			-- Returns What does it return?
		
		example:
			console.log('--NAME: handlers._users.post--','--RECEIVES: (data,callback)--'\n, '--CREATE USER--', '--(status, payload)--');
				
		-- Build a snippet for this pattern --  -- Details Shown Below In Helpers Section
		-- Pattern for zx snippet: console.log('--METHOD NAME--','--PARAMS--', '--PURPOSE[s]--', '--RETURNS--');

		Work code from top to bottom while doing these task:
		
		-- Avoid Console.logs in sensitive files like Workers.js with logs turned on
		-- while debugging use them sparingly -- TODO clean-up at deployment 
		-- review as you go get familar with
		-- insert console.log at the top of each method using that snippet
		-- Fill in the console log [vars from snippett] to get familar
		-- Add section separtors [snippett see below]
		
		Work code from bottom to top while doing these task:
		
		-- Change error labels: 
		-- Missing required field(s) is to generic for logging while testing alot! 
		-- Understanding less is better for production at time of deployment trim the excess out
		-- Work UP (tree effect) putting -- required vars into the missing required fields errs
			NOTE: I have learned that while writing a procedure I work [Top Down]
				while errors on the other hand I work [Bottom Top]
				
		-- insert // End {Method Name} one line below last bracket of the method -- for when i scroll up
		
		
		
---------------------------------------------------------------------------------
	Testing: -- section 
---------------------------------------------------------------------------------

	Test ALL -- end points in Router -- till there are NO ERRORS
		(log ALL a LOT During this process -- include bug and how you resolved it)
		
		** See //Router below -- for list of routes!
		-- Record any priority-level errors (Log the error(s) [] and what fixed it/them)

---------------------------------------------------------------------------------
	DO the homework: -- section -- exercise 2
---------------------------------------------------------------------------------

		1. New users CRUD:
			-- can be created, 
			-- their information can be edited,
			-- and they can be deleted. 
			-- READ as well
			
			Properties: (We should store their)
			-- We should store their name, 
			-- email address, 
			-- and street address.
			-- online Flag in user -- used for signin signout

		2. Users can 
			-- log in 
			-- and log out
			(by creating or destroying a token.)

		3. When a user is logged in, 
			-- they should be able to GET all the possible menu items
				(these items can be hardcoded into the system).

		4. When a user is logged in,
			-- should be able to fill a shopping cart with menu items

		5. When a user is logged in,
			-- should be able to create an order. You should integrate,
			 with the Sandbox of Stripe.com to accept their payment. ,
			 Note: Use the stripe sandbox for your testing. Follow this,
			  link and click on the "tokens" tab to see the fake tokens ,
			  you can use server-side to confirm the integration ,
			  is working: https://stripe.com/docs/testing#cards

		6. When an order is placed, 
			-- you should email the user a receipt. You should integrate ,
			with the sandbox of Mailgun.com for this. Note: Every Mailgun ,
			account comes with a sandbox email account domain ,
			(whatever@sandbox123.mailgun.org) that you can send from ,
			by default. So, there's no need to setup any DNS for your domain,
			 for this task ,
		https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account
	
	
---------------------------------------------------------------------------------
	Router: -- section -- exercise 2 things to test over and over
---------------------------------------------------------------------------------

	/ping -- simply returns a response of 200 using a setTimeout

	//users -- access users collection
	/users -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /users TODO needs work -- get list of users -- returns nothing
		GET /users/:id	-- ?id=phone -- get a single user by id phone is unique
		PUT /users/:id	-- ?id=phone -- update a single user by id phone is unique
	   POST /users/		-- Add new User
	 DELETE /users/:id	-- ?:id=phone -- delete a single user by id phone is unique
	 
	 /tokens -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /tokens/:id	-- get a valid token back or 404
		PUT /tokens/:id	-- adds 1 hour to valid token if the given extend flag set to true
	   POST /tokens/		-- Add new Token
	 DELETE /tokens/verifyToken/:id=phone -- ?phone -- delete a single token by (id phone is unique)
	 
	 /checks -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /checks/:id	-- get a checks back or 404
		PUT /checks/:id	-- update a cart_item -- given id
	   POST /checks/:id	-- ?:id=ckId-- Add new Cart_Item {Required menuItem from and array},
	 DELETE /checks/:id	-- ?:id=ckId of check item -- delete check by (id is unique)
	 
	 /signin
		POST /signin -- 
			{Required email - str, name - str, address - str, password - str, tosAgreement - boolean, online - boolean }
	 
	 /signout
		POST /signout -- required a valid token!

---------------------------------------------------------------------------------
	Instructions: -- section -- exercise 2
---------------------------------------------------------------------------------

	These instructions are for using excercise2 with POSTMAN
	
	Start up the server: index.js

---------------------------------------------------------------------------------
	POSTMAN -- User Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

	USERS:
	
	/users -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /users TODO needs work -- get list of users -- returns nothing
			In Postman 
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = empty
				Returns list of users
				
		GET /users/:id	-- ?email=email@youremil.com -- get a single user by id email is unique
			In Postman 
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password
				Token = must be valid
				Returns user in payload
				
		PUT /users/:id	-- ?email=email@youremil.com -- update a single user by id email is unique
			In Postman 
				set on PUT
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password & address & tosAgreemant & online & name {Required: email & password} 
				EDIT SOMETHING = make changes to data
				Token = must be valid
				Returns user in userData -- Updates the data
				
	   POST /users/		-- Add new User
			In Postman 
				set on POST
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password & name & address & tosAgreement
				Token = must be valid
				Returns user in Body of Postman and payload
				
	 DELETE /users/:id	-- ?email=email@youremil.com -- delete a single user by id email is unique
			In Postman 
				set on DELETE
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = Nothing
				Token = must be valid
				Returns user in Body of Postman and payload

---------------------------------------------------------------------------------
	POSTMAN -- Token Routes: -- section -- exercise 2
---------------------------------------------------------------------------------
	
	TOKENS:

	/tokens -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /tokens/:id	-- get a valid token back or 404
			In Postman
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = Nothing
				Token = must be valid
				Returns user in Body of Postman and payload
				
		PUT /tokens/:id	-- adds 1 hour to valid token if the given extend flag set to true
			In Postman
				set on PUT
				url = ?id= in url for this one and localhost:3000/users or 3001/users for http or https (in that order)
				Body = "extend": true
				Token = must be valid
				Returns user in Body of Postman and payload
				
	   POST /tokens/		-- Add new Token
			In Postman
				set on POST
				url = /tokens
				Body = email, password
				Token = must be valid
				Returns token in Body of Postman
				
	 DELETE /tokens/verifyToken/:id	-- ?email=email@youremil.com -- delete a single token by (id email is unique)
			In Postman
				set on POST
				url = /tokens
				Body = email, password
				Token = must be valid
				Returns Deletes the token and sends to Body of Postman

---------------------------------------------------------------------------------
	POSTMAN -- Checks Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

	checks:
	
	 /checks -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /checks/:id	-- get a check back or 404
			In Postman -- need: checkId in the url and a body see.. below
			set on GET
			url = /checks
			body = {
					    "firstName": "Greg on PUT",
					    "lastName": "Mudge",
					    "phone": "1111111111",
					    "password": "password",
					    "tosAgreement" : true,
					    "onLine": true
					}
					userData -- in body!
					
			Token = must be valid and NOT expired!!!
					I inserted a TODO on that var so durig dev stage i have TIME now!
			Return = many errors but on success sends Postman userData -- see above
		
		PUT /checks/:id	-- update a check -- given id
			In Postman -- need check ID in the url
			set on PUT
			url = /checks
			body = checkData --below
					{
					    "id": "jfammrk9408xbek0g7up",
					    "userPhone": "1111111111",
					    "protocol": "https",
					    "url": "checks",
					    "method": "post",
					    "successCodes": [
					        200,
					        400,
					        401,
					        402,
					        403,
					        404,
					        500,
					        502
					    ],
					    "timeoutSeconds": 3600000
					}
			Token = must be valid and NOT expired!!!
					I inserted a TODO on that var so durig dev stage i have TIME now!
			Return = many errors but on success sends Postman checkData -- see above
			
	   POST /checks/:id=ckID	-- Add new Check {Required menuItem from and array}
			In Postman -- need: protocol && url && method && successCodes && timeoutSeconds)
				set on POST
				url = /checks
				Body = "menuItem": "Pencil" --- menuitem MUST BE ONE of these ["Pencil", "Pen", "Lunch", "Dinner"] -- limits 5 max during dev 150!
				Token = must be valid -- in header
				Returns Adds the check and sends to Body of Postman
				
	 DELETE /checks/:id	-- ?id of check item -- delete check by (id is unique)
			In Postman -- need: protocol && url && method && successCodes && timeoutSeconds)
				set on POST
				url = /checks
				Body = Nothing
				Token = must be valid -- in header
				Returns Deletes the check and sends 1 to Body of Postman	 		

---------------------------------------------------------------------------------
	POSTMAN -- Sign In Route: -- section -- exercise 2
---------------------------------------------------------------------------------

	SIGNIN:
	
	/signin
		POST /signin -- 
			{Required email - str, name - str, address - str, password - str, tosAgreement - boolean, online - boolean }

---------------------------------------------------------------------------------
	POSTMAN -- Sign Out Route: -- section -- exercise 2
---------------------------------------------------------------------------------

	SIGNOUT:
	
	/signout
		POST /signout -- required a valid token!				

---------------------------------------------------------------------------------
	POSTMAN -- End of Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------------------------------------
								-- 2nd Test Run Start --

NOTE:: at this point I have been testing from the top of this document down (keep that in mind) end 1st run
Therefore I will make a new Plan for 2nd run:
Based on my first efforts i have developed a better plan for tracking each function and method as follows:

--------------------------------------------------------------------------------------------------------------------------------------------------
	2nd Test run after adding user fields
---------------------------------------------------------------------------------

	2nd Test Run Plan:
		Develop Plan: as follows: (with a good plan postman will be MUCH more effective tool for me)
	
		-- The plan is the most important part
		-- Programs involed: Same as above
		-- Code the changes for new menu items
		-- Notes for menuItems below in Section named menuItems
	
	Prepare code for debugging --
	
		-- set up z.bat file so (changing debug mode and env vars is quick) -- Shown Below In Helpers Section
			-- no changes in this one
		-- USE a standard pattern for console.log 
			-- updated my snippets see below I have old and updated labeled
			
		examples: In the snippets section this is explained 

		Work code from top to bottom while doing these task:
		
		-- Avoid Console.logs in sensitive files like Workers.js with logs turned on
		-- while debugging use them sparingly -- TODO clean-up at deployment 
		-- review as you go get familar with
		-- insert console.log at the top of each (zx) method and (zxf) function using the snippets
		-- insert console log [ 1 var zxc snippet] adding a number from top down so in the cmd windows they are numbered
		-- Add section separtors [snippet see below]
		
		Work code from bottom to top while doing these task:
		
		-- Change error label as needed: 
		-- Missing required field(s) is to generic for logging while testing alot! 
		-- Understanding that less is better for production at time of deployment trim the excess out
		-- Work UP (tree effect) putting -- required vars into the missing required fields errs
			NOTE: I have learned that while writing a procedure I work [Top Down]
				while errors on the other hand I work [Bottom Top]
				
		-- insert // End {Method Name} one line below last bracket of the method -- for when i scroll up
			-- these did not change
		
		
---------------------------------------------------------------------------------
Section menuItems -- begin
---------------------------------------------------------------------------------

	Here is my result for menuItems -- Things i discovered
	
	1. Added route to server.js // --menuitems: handlers.menuitems.showmenu
	2. must validate before building the container for this route
	3. url in Postman http://localhost:3000/menuitems -- will direct a user with valid token here
	4. After three or four tries at the showmenu method -- fixed syntex errors and now it works fine

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
	handlers.menuitems.showmenu = function(data, callback) {
	  console.log(`< -- begin --------------------------------x \n [< -- codeline 50] <-- [ ${global.Date().slice(0,33)} ]-- METHOD: [GET-> PARAMS:  [none]> -- PURPOSE: [Send back the menu of items] -- RETURNS: [<err -- object>] -->\n\n`, `data: -->\n`, data,`\n`);
	// for now just send the menu Item object on a get from this route
	    // Below is the structure of a menuItem
	    var menuItem = {
	      'id' : helpers.createRandomString(25), //string
	      'title' : 'Taco with cheese',			 // string
	      'price' : 2.95,						 // number
	    };
		
		// Configure the request details
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



---------------------------------------------------------------------------------
Section menuItems -- end 
---------------------------------------------------------------------------------




---------------------------------------------------------------------------------
	Testing: -- 2nd run section 
---------------------------------------------------------------------------------

	Test ALL -- end points in Router -- till there are NO ERRORS
		(log ALL a LOT During this process -- include bug and how you resolved it)
		
		** See //Router below -- for list of routes!
		-- Record any priority-level errors (Log the error(s) [] and what fixed it/them)

---------------------------------------------------------------------------------
	Router: -- section 2nd test run guide-- as seen above exercise 2 things to test over and over
---------------------------------------------------------------------------------

	/ping -- simply returns a response of 200 using a setTimeout

	//users -- access users collection
	/users -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /users TODO needs work -- get list of users -- returns nothing
		GET /users/:id	-- ?email=email@youremil.com -- get a single user by id email is unique
		PUT /users/:id	-- ?email=email@youremil.com -- update a single user by id email is unique
	   POST /users/		-- Add new User
	 DELETE /users/:id	-- ?email=email@youremil.com -- delete a single user by id email is unique
	 
	 /tokens -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /tokens/:id	-- get a valid token back or 404
		PUT /tokens/:id	-- adds 1 hour to valid token if the given extend flag set to true
	   POST /tokens/		-- Add new Token
	 DELETE /tokens/verifyToken/:id	-- ?email=email@youremil.com -- delete a single token by (id email is unique)
	 
	 /checks -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /checks/:id	-- get a checks back or 404
		PUT /checks/:id	-- update a cart_item -- given id
	   POST /checks/:id	-- ?email=email@youremil.com-- Add new Cart_Item {Required menuItem from and array},
	 DELETE /checks/:id	-- ?id of cart item -- delete cart_item by (id is unique)
	 
	 /signin
		POST /signin -- 
			{Required email - str, name - str, address - str, password - str, tosAgreement - boolean, online - boolean }
	 
	 /signout
		POST /signout -- required a valid token!

---------------------------------------------------------------------------------
	Router: -- section 2nd test run -- exercise 2 things to test over and over
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
	Instructions: 2nd run -- section -- exercise 2
---------------------------------------------------------------------------------

	These instructions are for using excercise2 with POSTMAN
	
	Start up the server: index.js

---------------------------------------------------------------------------------
	POSTMAN -- User Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

	USERS:
	
	/users -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /users TODO needs work -- get list of users -- returns nothing
			In Postman 
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = empty
				Returns list of users
				
		GET /users/:id	-- ?email=email@youremil.com -- get a single user by id email is unique
			In Postman 
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password
				Token = must be valid
				Returns user in payload
				
		PUT /users/:id	-- ?email=email@youremil.com -- update a single user by id email is unique
			In Postman 
				set on PUT
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password & address & tosAgreemant & online & name {Required: email & password} 
				EDIT SOMETHING = make changes to data
				Token = must be valid
				Returns user in userData -- Updates the data
				
	   POST /users/		-- Add new User
			In Postman 
				set on POST
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = email & password & name & address & tosAgreement
				Token = must be valid
				Returns user in Body of Postman and payload
				
	 DELETE /users/:id	-- ?email=email@youremil.com -- delete a single user by id email is unique
			In Postman 
				set on DELETE
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = Nothing
				Token = must be valid
				Returns user in Body of Postman and payload

---------------------------------------------------------------------------------
	POSTMAN -- Token Routes: -- section -- exercise 2
---------------------------------------------------------------------------------
	
	TOKENS:

	/tokens -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /tokens/:id	-- get a valid token back or 404
			In Postman
				set on GET
				url = localhost:3000/users or 3001/users for http or https (in that order)
				Body = Nothing
				Token = must be valid
				Returns user in Body of Postman and payload
				
		PUT /tokens/:id	-- adds 1 hour to valid token if the given extend flag set to true
			In Postman
				set on PUT
				url = ?id= in url for this one and localhost:3000/users or 3001/users for http or https (in that order)
				Body = "extend": true
				Token = must be valid
				Returns user in Body of Postman and payload
				
	   POST /tokens/		-- Add new Token
			In Postman
				set on POST
				url = /tokens
				Body = email, password
				Token = must be valid
				Returns token in Body of Postman
				
	 DELETE /tokens/verifyToken/:id	-- ?email=email@youremil.com -- delete a single token by (id email is unique)
			In Postman
				set on POST
				url = /tokens
				Body = email, password
				Token = must be valid
				Returns Deletes the token and sends to Body of Postman

---------------------------------------------------------------------------------
	POSTMAN -- Checks Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

	checks:
	
	 /checks -- acceptableMethods = ["post", "get", "put", "delete"];
		GET /checks/:id	-- get a check back or 404
			In Postman -- need: checkId in the url and a body see.. below
			set on GET
			url = /checks
			body = {
					    "firstName": "Greg on PUT",
					    "lastName": "Mudge",
					    "phone": "1111111111",
					    "password": "password",
					    "tosAgreement" : true,
					    "onLine": true
					}
					userData -- in body!
					
			Token = must be valid and NOT expired!!!
					I inserted a TODO on that var so durig dev stage i have TIME now!
			Return = many errors but on success sends Postman userData -- see above
		
		PUT /checks/:id	-- update a check -- given id
			In Postman -- need check ID in the url
			set on PUT
			url = /checks
			body = checkData --below
					{
					    "id": "jfammrk9408xbek0g7up",
					    "userPhone": "1111111111",
					    "protocol": "https",
					    "url": "checks",
					    "method": "post",
					    "successCodes": [
					        200,
					        400,
					        401,
					        402,
					        403,
					        404,
					        500,
					        502
					    ],
					    "timeoutSeconds": 3600000
					}
			Token = must be valid and NOT expired!!!
					I inserted a TODO on that var so durig dev stage i have TIME now!
			Return = many errors but on success sends Postman checkData -- see above
			
	   POST /checks/:id=ckID	-- Add new Check {Required menuItem from and array}
			In Postman -- need: protocol && url && method && successCodes && timeoutSeconds)
				set on POST
				url = /checks
				Body = "menuItem": "Pencil" --- menuitem MUST BE ONE of these ["Pencil", "Pen", "Lunch", "Dinner"] -- limits 5 max during dev 150!
				Token = must be valid -- in header
				Returns Adds the check and sends to Body of Postman
				
	 DELETE /checks/:id	-- ?id of check item -- delete check by (id is unique)
			In Postman -- need: protocol && url && method && successCodes && timeoutSeconds)
				set on POST
				url = /checks
				Body = Nothing
				Token = must be valid -- in header
				Returns Deletes the check and sends 1 to Body of Postman	 		

---------------------------------------------------------------------------------
	POSTMAN -- Sign In Route: -- section -- exercise 2
---------------------------------------------------------------------------------

	SIGNIN:
	
	/signin
		POST /signin -- 
			{Required email - str, name - str, address - str, password - str, tosAgreement - boolean, online - boolean }

---------------------------------------------------------------------------------
	POSTMAN -- Sign Out Route: -- section -- exercise 2
---------------------------------------------------------------------------------

	SIGNOUT:
	
	/signout
		POST /signout -- required a valid token!				

---------------------------------------------------------------------------------
	POSTMAN -- End of Routes: -- section -- exercise 2
---------------------------------------------------------------------------------

NOTE:: at this point I have been testing from the top of this document down (keep that in mind) end 1st run
Therefore I will make a new Plan for 2nd run:
Based on my first efforts i have developed a better plan for tracking each function and method as follows:


------------------------------- end 2nd test run	


---------------------------------------------------------------------------------
	HELPERS: -- section -- exercise 2
---------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------
	Snippets: -- less turn-around time for cmd to postman to vscode the better -- 1st run snippets
------------------------------------------------------------------------------------------------------

	----------------------------------
		Console.log snippet[begin]:
	----------------------------------
		Pattern for zx snippet: console.log('--METHOD NAME--','--PARAMS--', '--PURPOSE[s]--', '--RETURNS--');
		"zx": {
			// Leaving scope off will make it a global snippet
			"prefix": "zx",
			"body": [
					"$1console.log(`$CURRENT_DAY_NAME -- [[$CURRENT_HOUR][$CURRENT_MINUTE][$CURRENT_SECOND]]",
					" -- METHOD: $<{METHOD}> ---------- PARAMS: $<{PARAMS}> ---------- PURPOSE: $<{PURPOSE}>",
					" ---------- RETURNS: $<{RETURNS}> -->, <data>`);"
			]
		}
		Result of snippet: 
			console.log(`Saturday -- [[20][36][40]] -- METHOD: handlers.users ,
				    PARAMS: $<{(data,callback)}> --- PURPOSE:  [VALIDDATES] the Method,
				    routes it to METHOD  ---------- RETURNS: (err) passes received data -->`, data);
			NOTE: -- basically fill in the blanks 

	----------------------------------
		Required Vars snippet:
	----------------------------------	
		"xrv": {
			// Leaving scope off will make it a global snippet
			// Required variables -- for error returns
			"prefix": "zx",
			"body": [
				"$1'fn:', ${firstName}, 'ln', ${lastName}, 'phnoe', ${phone}, 'password', ${password}, 'tosApgreement', ${tosAgreement}"
			]
		},

	------------------------------------------------------------------------------------------------------
		Braces {} snippet: -- double click a word hit crtl + m -- get -- ${word}
	------------------------------------------------------------------------------------------------------

		{ // surronds selection with {}
		  "key": "ctrl+m",
		  "command": "editor.action.insertSnippet",
		  "when": "editorTextFocus",
		  "args": {
		      "snippet": "${${2}${TM_SELECTED_TEXT}${2}}"
		  }
		}

	----------------------------------
		Section Change snippet:
	----------------------------------

		"zxsc": {
			"prefix": "zxsc",
			"body": [
				"$1// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >"
			]
		},


------------------------------------------------------------------------------------------------------------------
	Updated -- Snippets: -- less turn-around time for cmd to postman to vscode the better -- 2nd run snippets
------------------------------------------------------------------------------------------------------------------

	----------------------------------
		console.log snippet[begin]:
	----------------------------------
		Pattern for zx snippet: console.log('--METHOD NAME--','--PARAMS--', '--PURPOSE[s]--', '--RETURNS--');
			-- four key things to note about
			
		"zx": {
			// Leaving scope off will make it a global snippet
			"prefix": "zx",
			"body": [
					"console.log(`< -- begin --------------------------------x \\n [< -- codeline $TM_LINE_NUMBER] 
						<-- [ ${global.Date().slice(0,33)} ]-- METHOD: [${1|GET,POST,PUT,DELETE,FUNCTION|}] --> 
						PARAMS:  [${2|<data -- callback,<err -- callback>,<data -- err>|}]> -- 
						PURPOSE: [${3|<GET WHAT -- $0>,<POST WHAT -- $0> ,<PUT WHAT -- $0>,<DELETE WHAT -- $0>|}] -- 
						RETURNS: [${4|<err -- object>,<err -- data>,<err -- value>|}] -->\\n\\n`, `data: -->\\n`, data,`\\n`);"
			]
		} 
		
		// Note if you cut and paste this snippet into vscode editor fix white space
			-- I had to paste into notepad so i could display it here
		
		----------------------------------------------------------------------------------------------------------------------------
		Result OUTPUT of snippet zx notice the data object looks are helpful: it also uses zxc (1 var snippet the numbers help), 
			also uses zxf (for function header) -- see below for step by step usage
		----------------------------------------------------------------------------------------------------------------------------
		
		< -- begin --------------------------------x
 			[< -- codeline 741] <-- [ Mon Nov 02 2020 23:58:06 GMT-0800 ]-- METHOD: [GET] --> PARAMS:  [<data -- callback]> -- PURPOSE: [<GET WHAT -- $0>] -- RETURNS: [<err -- object>] -->
			
			 data: -->
			 {
			  trimmedPath: 'checks',
			  queryStringObject: [Object: null prototype] { id: 'q1oj2bulzukiaclmkz23' },
			  method: 'get',
			  headers: {
			    token: '7sei4qp6alhy99fhcc4o',
			    'content-type': 'application/json',
			    'user-agent': 'PostmanRuntime/7.26.5',
			    accept: '*/*',
			    'cache-control': 'no-cache',
			    'postman-token': '43b46b53-93f0-4794-a9c0-eb3f8980d787',
			    host: 'localhost:3000',
			    'accept-encoding': 'gzip, deflate, br',
			    connection: 'keep-alive',
			    'content-length': '6'
			  },
			  payload: {}
			}
			
			[< 1 ----------------- [id] : ----------------- >] q1oj2bulzukiaclmkz23		

			 < 2 ----------------- [checkData]: ----------------- >
			
			 {
			  id: 'q1oj2bulzukiaclmkz23',
			  userPhone: '1111111111',
			  protocol: 'http',
			  url: 'checks',
			  method: 'post',
			  successCodes: [
			    200, 400, 401,
			    402, 403, 404,
			    500
			  ],
			  timeoutSeconds: 3600000
			}
			
			[< 3 ----------------- [err t/f] : -------------- >] false
			
			[< 4 ----------------- [token id] : -------------- >] 7sei4qp6alhy99fhcc4o
			
			< -- begin fn: -----------------------------x
 			[< -- codeline 591] <-- [ Mon Nov 02 2020 23:58:06 GMT-0800 ]-- fn: [handlers._tokens.verifyToken] --> PARAMS:  [ id: 7sei4qp6alhy99fhcc4o phone: 1111111111]> -- PURPOSE: [ verify a token ]
			----xx---- RETURNS: [<err -- function(tokenIsValid){
				            		console.log(`\n [< 5 ----------------- [tokenIsValid t/f] : -------------- >]`,tokenIsValid, '\n');
							          if(tokenIsValid){
							            // Return check data
							            callback(200,checkData);
							          } else {
							            callback(403,{'Error' : 'Missing required field, Invalid Token'});
							          }
							        }>] -->
			
			ID in verify: 7sei4qp6alhy99fhcc4o
			TOKEN in verify: {
				phone: '1111111111',
				id: '7sei4qp6alhy99fhcc4o',
				expires: 1605322388252
			}
			
			[< 5 ----------------- [tokenIsValid t/f] : -------------- >] true
			
		End example output starting with the zx snippett and using zxf for functions in place of zx for methods
			it also uses the zxc the ones with numbers for single vars
			
		----------------------------------------------------------------------------------------------------------------------------
		note: it may look long but i have a very wide screen for server no spillage and you should tweak
		----------------------------------------------------------------------------------------------------------------------------
		
		THIS IS DESIGNED TO BE PLACED JUST UNDER THE TOP MOST LINE OF THE METHOD
		
			IT contains 4 tab stops that are equipped with dropDowns to click for speed
			
			METHOD:  -- dropDown --> [ GET, POST, PUT, DELETE, FUNCTION ]
			PARAMS:  -- dropDown --> [ <data -- callback>, <err -- callback>, <err -- data> ]
			PURPOSE: -- dropDown --> [ <GET WHAT -- $0>,<POST WHAT -- $0> ,<PUT WHAT -- $0>,<DELETE WHAT -- $0> ]
			RETURNS: -- dropDown --> [ <err -- object>,<err -- data>,<err -- value> ]
		
			NOTE: -- basically using the [ tab stops ] click from the 4 drop downs before fine tuning
			
			Step by Step example usage: in code window -->
			
				How to use: 
				
					-- Position cursor where you want it
					-- Type zx Hit Tab -- This puts it into code window ( note: when i type zx i see in a drop down all my z-snippets )
					-- 1st tab stop should be highlighted METHOD -- Click it and select -- HIT tab
					-- 2nd tab stop should be highlighted PARAMS -- Click it and select -- HIT tab
					-- 3rd tab stop should be highlighted PURPOSE -- Click it and select -- HIT tab
					-- 4th tab stop should be highlighted RETURNS -- Click it and select -- HIT tab
					-- NOW CLEAN IT UP fine tune it
					-- Done
			
			note: at this point you should see the idea objects should look like JSON objects for learning
				-- Numbers on the vars help as well
				
		<------------------------------------------------------end------zx------------------------------------------------------------->

	----------------------------------
		5 vars snippet[begin]:
	----------------------------------
		Pattern for zxv snippet: "('fn:', ${1:firstName}, 'ln:', ${2:lastName}, 'phone:', ${3:phone}, 'password:', ${4:password}, 'tosApgreement:', ${5:tosAgreement});"
			-- four key things to note about
			
		"zxv": {
			// Leaving scope off will make it a global snippet
			// Required variables
			"prefix": "zxv",
			"body": [
				"console.log('fn:', ${1:firstName}, 'ln:', ${2:lastName}, 'phone:', ${3:phone}, 'password:', ${4:password}, 'tosApgreement:', ${5:tosAgreement});"
			]
		},
		
		// Note if you cut and paste this snippet into vscode editor fix white space
		
		----------------------------------------------------------------------------------------------------------------------------
		Result of snippet zxv notice the vars are visable 
		----------------------------------------------------------------------------------------------------------------------------
		
		< --- 6. --  fn: false ln: Watson phone: 2222222222 password: password
		 		more ....  tosApgreement: true onLine: true email: me@gmail.com streetAddress: My Street Address
			
		----------------------------------------------------------------------------------------------------------------------------
		note: it may look long but i have a very wide screen for server no spillage
		----------------------------------------------------------------------------------------------------------------------------
		
		THIS IS DESIGNED TO BE PLACED JUST WHERE YOU NEED IT -- its all editable
		
			IT contains 5 tab stops that are NOT equipped with dropDowns
		
			NOTE: -- basically using the [ tab stops ] tab thru all 5 before fine tuning
			
			example usage: in code window -->
			
				How to use: 
					-- Position cursor where you want it
					-- Type zxv Hit Tab -- This puts it into code window ( note: when i type zxv i see in a drop down all my z-snippets )
					-- 1st tab stop should be highlighted type your var1 name -- HIT tab
					-- 2nd tab stop should be highlighted type your var2 name -- HIT tab
					-- 3rd tab stop should be highlighted type your var3 name -- HIT tab
					-- 4th tab stop should be highlighted type your var4 name -- HIT tab
					-- 4th tab stop should be highlighted type your var4 name -- HIT tab
					-- NOW CLEAN IT UP fine tune it
					-- Done
			
			note: at this point you should see the idea again see the vars in-order you set
				
		<------------------------------------------------------end------zxv------------------------------------------------------------->
		
	-----------------------------------------------------
		1 var snippet:
	-----------------------------------------------------

	{ // surronds selection with {}
	  "key": "ctrl+m",
	  "command": "editor.action.insertSnippet",
	  "when": "editorTextFocus",
	  "args": {
	      "snippet": "${${2}${TM_SELECTED_TEXT}${2}}"
	  }
	}
		
	-----------------------------------------------------
		Braces {} snippet:
	-----------------------------------------------------

	{ // surronds selection with {}
	  "key": "ctrl+m",
	  "command": "editor.action.insertSnippet",
	  "when": "editorTextFocus",
	  "args": {
	      "snippet": "${${2}${TM_SELECTED_TEXT}${2}}"
	  }
	}

	-----------------------------------------------------
		Section Change snippet: zxsc
	-----------------------------------------------------

	"zxsc": {
		"prefix": "zxsc",
		"body": [
			"$1// < -------   [Section Change]      ---------   |   ---------   [Section Change]       ----------  |  ----------          [Section Change]  ------------- >"
		]
	}



---------------------------------------------------------------------------------
	Batch File[begin]: -- less turn-around time for cmd to postman to vscode the better
---------------------------------------------------------------------------------

	ECHO OFF
	
	cls
	:: Skip over with this
	GOTO PROMPT_ME
	
	
	:: This batch file details
	TITLE My System info
	ECHO Plesae Wait....
	:: Sec 1
	ECHO ========================
	ECHO Windows info
	ECHO ========================
	systeminfo | findstr /c:"OS Name"
	systeminfo | findstr /c:"Version"
	systeminfo | findstr /c:"System Type"
	
	:: Sec 2
	ECHO ========================
	ECHO Hardware info
	ECHO ========================
	systeminfo | findstr /c:"Total Physical Memory"
	wmic cpu get name
	wmic path win32_videocontroller get name
	wmic path win34_videocontroller get name
	
	:: Sec 2
	ECHO ========================
	ECHO Network info
	ECHO ========================
	ipconfig | findstr IPv4
	ipconfig | findstr IPv6
	
	:PROMPT_ME
	
	:MENU
	ECHO ...............................................
	ECHO Enter the mode for this run
	ECHO ...............................................
	ECHO 1. config
	ECHO 2. data
	ECHO 3. handlers
	ECHO 4. helpers
	ECHO 5. server
	ECHO 6. workers
	ECHO 7. http
	echo.
	
	set /p web=Type option:
	if "%web%"=="1" goto CONFIG
	if "%web%"=="2" goto DATA
	if "%web%"=="3" goto HANDLERS
	if "%web%"=="4" goto HELPERS
	if "%web%"=="5" goto SERVER
	if "%web%"=="6" goto WORKERS
	if "%web%"=="7" goto HTTP
	
	GOTO END
	
	:CONFIG 
	SET NODE_DEBUG=config
	echo config
	
	GOTO END
	
	:DATA 
	SET NODE_DEBUG=data
	GOTO END
	
	:HANDLERS 
	SET NODE_DEBUG=handlers
	GOTO END
	
	:HELPERS 
	SET NODE_DEBUG=helpers
	GOTO END
	
	:SERVER 
	SET NODE_DEBUG=server
	GOTO END
	
	:WORKERS 
	SET NODE_DEBUG=workers
	GOTO END
	
	:HTTP 
	SET NODE_DEBUG=http
	GOTO END
	
	::note use : end at bottom at times
	:END 
	
	
	SET NODE_ENV=staging
	SET HTTP_PORT=3000
	SET HTTPS_PORT=3001
	SET HTTP_PORT_PROD=5000
	SET HTTPS_PORT_PORT=5001
	
	ECHO All Done....
	node index.js

-----------------------------------------------------------------------------------------
	Batch File[end]: -- less turn-around time for cmd to postman to vscode the better
-----------------------------------------------------------------------------------------
