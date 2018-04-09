var groupObj = {}; // local copy of groupObj

//chrome.storage.sync.get( function(data){
//	console.log(JSON.stringify(data));
//});
// console.log("popup.js called");


// Function to match RegEx
function matchRuleShort(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

// Function to create button element in the popup
function makeButton(groupObj, checkboxObj ){
	
	for(var k in groupObj){
		//making group
		var $newgroup = $('<h3>').attr('class', 'h3').attr('id', k).html(k);
		$('body').append( $newgroup );
		//making button
    	for(var i = 0; i < groupObj[k].length; i++){
    		if(groupObj[k][i].show === "true"){ // Live button
    			if(checkboxObj[k].elements[groupObj[k][i].name] == 2){
    				console.log("make button came here " + groupObj[k][i].name )
	    			var $newbut = $('<button>')
	    							.attr('class','button')
	    							.attr('id', groupObj[k][i].name)
	    							.html(groupObj[k][i].name)
	    							.on('mouseover',
	    								function(){
	    									//$(this).animate({'margin-top':0},200);
	    									$(this).addClass('hover');
	    							})
	    							.on('mouseout', 
	    								function(){
	    									//$(this).animate({'margin-top':20}, 200);
	    									$(this).removeClass('hover');
									})
	    							.on('click', clickhandler(groupObj[k][i].url));
		   			$('body').append( $newbut );
	   			} else if(checkboxObj[k].elements[groupObj[k][i].name] == 3){
	   				console.log("make button came here2 " + groupObj[k][i].name )
	   				
	   				console.log("wtf");
	    			var $newbut = $('<button>')
	    							.attr('class','button')
	    							.addClass('alwaysOnButton')
	    							.attr('id', groupObj[k][i].name)
	    							.html(groupObj[k][i].name)
	    							.on('mouseover',
	    								function(){
	    									//$(this).animate({'margin-top':0},200);
	    									$(this).addClass('hover');
	    							})
	    							.on('mouseout', 
	    								function(){
	    									//$(this).animate({'margin-top':20}, 200);
	    									$(this).removeClass('hover');
									}) 
	    							.on('click', clickhandler(groupObj[k][i].url))

	    							
		   			$('body').append( $newbut );

		   			//clickhandler(groupObj[k][i].url)();
		   			//$("window").ready(function(){
		   			//	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    				//	$('#'+(groupObj[k][i].name)+".button").click();
					//});
		   			
	   			} 
	   		} else if(groupObj[k][i].show === "false" && checkboxObj[k].elements[groupObj[k][i].name] != 1){ // dead button
    			var $newbut = $('<button>')
    							.attr('class','deadButton')
    							.attr('id', groupObj[k][i].name)
    							.html(groupObj[k][i].name)
    							.attr("disabled", true)
    							.on('click', clickhandler(groupObj[k][i].url));
	   			$('body').append( $newbut );
	   		}
    	}
    }
}


// Function to send message to content.js when the button is called
function clickhandler(url){
	console.log('click handler url : ' + url);
	return function(){
			//console.log("feedback called");
			//console.log(url);
           	chrome.tabs.query(
           		{active:true,currentWindow: true , status: "complete"}, 
           		function(tabs){
           			console.log("tab active");
            		chrome.tabs.sendMessage( //sending message when buttonis clicked
            			tabs[0].id, 
            			{'id': "buttonclicked",'url':url}, 
            			function(){
            				console.log("message sent");
            			}
            		)
        		}
        	)
       };
   };


// Automatic function which runs when popup.js is called
// It use chrome.tabs to get URl of the current tab
chrome.tabs.query({'active': true, 'currentWindow': true , 'status': "complete"}, function (tabs) {
	$(function(){
		
			//console.log("anonymous function called");
				// Getting the content from the suitelet
				$.get("https://forms.na2.netsuite.com/app/site/hosting/scriptlet.nl?script=7&deploy=1&compid=1783250&h=f166be9ee3a2b6e09ada", function(data){
					
					//data = '{"name":["confiluence_alert.js","google_alert.js","netsuite_alert.js","netsuite_feedback.js","youtube_alert.js"],"url":["/core/media/media.nl?id=374726&c=1216676&h=f2fcab4ecd4b45e42264&_xt=.js","/core/media/media.nl?id=374712&c=1216676&h=d77cb32b80f404a7b331&_xt=.js","/core/media/media.nl?id=374711&c=1216676&h=60a8f74ee29b75fe42be&_xt=.js","/core/media/media.nl?id=374710&c=1216676&h=4690ca4f4a0e9be4dd7f&_xt=.js","/core/media/media.nl?id=374713&c=1216676&h=bd84a44258369ca3329b&_xt=.js"],"description":["https://dejero.atlassian.net/*","https://www.google.*","https://system.na1.netsuite.com/*,https://system.sandbox.netsuite.com/*","https://system.sandbox.netsuite.com/*","https://www.youtube.com/*"]}';
					if (data.substring(0, 1)==="{") { // as data is a string containing the object, its first character should be '{'.
													// I am using this because if i parces and used typeof operator  and equate it to object then it will not work at the time of error (as error message is HTML page)
			    		var fileObj = JSON.parse(data);
			    		//$('body').append(alert('hiiii'));
			    		// fileObj example:
			    		/*
			    			{
								"name":["netsuite_feedback.js", "google_alert.js"],
								"url":["/core/media/media.nl?id=374710&c=1216676&h=4690ca4f4a0e9be4dd7f&_xt=.js","/core/media/media.nl?id=374712&c=1216676&h=d77cb32b80f404a7b331&_xt=.js"],
								"description":["https://system.sandbox.netsuite.com/*,"https://system.na1.netsuite.com/*","https://www.google.*"]
			    			}
			    		*/
			    		for(var i = 0; i < fileObj.name.length; i++){
			    			// console.log(i);
			    			// fileObj.name example: netsuite_feedback.js
			    			var group  = fileObj.name[i].split("_")[0]; 
			    			var name = fileObj.name[i].split("_")[1].slice(0,-3);
			    			var url = fileObj.url[i];
			    			var access = fileObj.description[i].split(",");
			    			var packet = {"name":name,
			    						  "url":url,
			    						  "access":access};
			    			//console.log("packet: "+ JSON.stringify(packet) + ", group: " + group);
			    			if(groupObj[group] === undefined){
			    				//console.log("group undefined");
			    				groupObj[group] = [packet];
			    			} else {
			    				//console.log("group defined");
			    				groupObj[group].push(packet);
			    			}
							
							var pageUrl = tabs[0].url; // getting current tab url
							
							//console.log("pageUrl : " + pageUrl);
							
							//console.log("groupObj1: "+ JSON.stringify(groupObj));
			    		}
			    		// comparing current tab URL and access 
			    		for(var k in groupObj){
			    			for(var i = 0; i < groupObj[k].length; i++){
			    				for(var j = 0; j < groupObj[k][i].access.length; j++){
			    					if(matchRuleShort(pageUrl, groupObj[k][i].access[j])){
			    						groupObj[k][i].show = "true";
			    						j = groupObj[k][i].access.length; // to break
			    					} else {
			    						groupObj[k][i].show = "false";
			    					}
			    				}  
			    			}
			    		}
			    		// groupObj example:
			    		/*
			    			{
								"netsuite":[{
												"name":"feedback",
												"url":"/core/media/media.nl?id=374710&c=1216676&h=4690ca4f4a0e9be4dd7f&_xt=.js",
												"access":["https://system.sandbox.netsuite.com/*","https://system.na1.netsuite.com/*"],
												"show":"true"
								}]
								"google":[{
												"name":"alert",
												"url":"/core/media/media.nl?id=374712&c=1216676&h=d77cb32b80f404a7b331&_xt=.js",
												"access":["https://www.google.*"],
												"show":"false"
								}]
			    			}
			    		*/

						console.log("groupObj1= "+ JSON.stringify(groupObj));
						// storing groupObj 
						chrome.storage.sync.set({"groupObj": groupObj});
						chrome.storage.sync.get( function(data){
							console.log('data1 = ' +JSON.stringify(data));
						});
						chrome.storage.sync.get( function(data){
							console.log('data2 = ' +JSON.stringify(data));
							
							for(var i in data.groupObj){
								console.log(i);
								for (var j = 0; j < data.groupObj[i].length ; j++ ){
									console.log(j);
									console.log(" checkboxObj is : "+ JSON.stringify(data.checkboxObj));
									if(data.checkboxObj == undefined){
										
										data.checkboxObj = {};
										data.checkboxObj[i] =  {"elements" : {[data.groupObj[i][j].name] : '2'}, "display": true};
										console.log(" checkboxObj now is : "+ JSON.stringify(data.checkboxObj));
										//data.checkboxObj[i] = {};
										//data.checkboxObj[i]["elements"][data.groupObj[i][j].name] = '2';
										//data.checkboxObj[i]["display"] = true;
									} else if(data.checkboxObj[i] == undefined){
										
										data.checkboxObj[i] = {"elements" : {[data.groupObj[i][j].name] : '2'}, "display": true};
										//data.checkboxObj[i]["elements"][data.groupObj[i][j].name] = '2';
										//data.checkboxObj[i]["display"] = true;
										console.log("checkboxObj now2 is : "+ JSON.stringify(data.checkboxObj));
									} else if(data.checkboxObj[i].elements[data.groupObj[i][j].name] == undefined){
										data.checkboxObj[i]["elements"][data.groupObj[i][j].name] = '2';
										console.log("checkboxObj now3 is : "+ JSON.stringify(data.checkboxObj));
									}
								}
							}
							console.log("checkboxObj now4 is : "+ JSON.stringify(data))
							console.log('hi');
							for(var i in data.checkboxObj){
								console.log(i);
								console.log(" checkboxObj is : "+ JSON.stringify(data.checkboxObj));
								
								if(data.groupObj[i] ===undefined){
									console.log('2');
									delete data.checkboxObj[i];
								} else {
								
								//console.log('3');
								for (var j in data.checkboxObj[i].elements){
									//console.log('4');
									var flag = 0;
									for(var k = 0 ; k < data.groupObj[i].length ; k++){
										//console.log('5');
										if(j == data.groupObj[i][k].name){
											//console.log('6');
											flag = 1;
										}

									}
									//console.log('7');
									if(flag == 0 ){
										delete data.checkboxObj[i].elements[j];
									}
								}
								}

							}

							console.log('data3 = ' +JSON.stringify(data));
							/*
							for (var key in data.groupObj) {
								//console.log(data.checkboxObj);
								if(data.checkboxObj===undefined ){	//if running this extension for first time then checkboxObj do not 
																		// exist then create it with default value for all group as true
									data.checkboxObj={};
									data.checkboxObj[key]=true;
								}
								else if(data.checkboxObj[key]===undefined){	//if a new group added then make it default true
									//console.log(data.checkboxObj);
									data.checkboxObj[key] = true;
								}
							 }
							 */
						
								 //console.log(JSON.stringify(data.checkboxObj));
							 //checkboxObj example
							 /*
							 	{
									"netsuite": true,
									"google":true
							 	}
							 */

							// storing checkboxObj
							chrome.storage.sync.set({"checkboxObj": data.checkboxObj});	
								 //console.log(JSON.stringify(data.checkboxObj));
								//console.log('variable checkbox local:'+ JSON.stringify(checkboxObj));
							chrome.storage.sync.get( function(data){
							console.log('data4 = ' +JSON.stringify(data));
							});

							
							for(var k in data.checkboxObj){
								if(data.checkboxObj[k].display == false){
									//console.log('deleting' + k);
									delete data.groupObj[k];
								}
							}
							//console.log("groupObj3: "+ JSON.stringify(groupObj));
							groupObj = data.groupObj; // changing the local copy
							makeButton(data.groupObj,data.checkboxObj);
						});
						//for(var k in groupObj){
					//		checkboxObj[k] = 'true';
					//	}
					//	chrome.storage.sync.set({"checkboxObj": checkboxObj});
						
				    	
			   		} else {
				    	// console.log('some error')
						var $error = $('<h2>').attr('id', "someError").html('Something went wrong. Try again by logging into NetSuite!!');
						$('body').append( $error );
			    	}
		    });		
	});
});	

