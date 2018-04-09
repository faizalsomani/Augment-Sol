// this is the background code...

// listen for our browerAction to be clicked

// Function listen to the message from content.js to show the Extension Icon
//alert('hi');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "showPageAction")
    {	//alert('lol');
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }
});
/*
chrome.tabs.query({'active': true, 'currentWindow': true }, function (tabs) {
	alert(tabs[0].url);
});
*/	
function matchRuleShort(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	if(request.sending == "url"){
        var pageUrl=request.url;
        //alert('1');
 				
		chrome.storage.sync.get(function(data){
				//alert('2');
				var groupObj = data.groupObj;
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
				chrome.storage.sync.set({"groupObj": groupObj},function(){
					//alert('set');
					chrome.storage.sync.get(function(data){
			    		//alert('7');
			    		//alert(JSON.stringify(data));
			    		for(var k in data.groupObj){
			    			//alert(data.groupObj[k].length);
							for(var i = 0; i < data.groupObj[k].length; i++){
								
								//alert(data.groupObj[k][i].show);
								//alert(data.checkboxObj[k].elements[data.groupObj[k][i].name]);
								//alert(data.groupObj[k][i].show == 'true' && data.checkboxObj[k].elements[data.groupObj[k][i].name] == '3');
								if(data.groupObj[k][i].show == 'true' && data.checkboxObj[k].elements[data.groupObj[k][i].name] == '3'){
									
				           			//alert('inside if');
				            		chrome.tabs.sendMessage( //sending message when buttonis clicked
				            			sender.tab.id,
				            			{'id': "buttonclicked",'url': data.groupObj[k][i].url}, 
				            			function(){
				            				//alert("message sent from background");
				            			}
				            		)
						        		
								}
							}
						}     
					});
				});
	    		//alert(JSON.stringify(groupObj));
	    	});
	}
		
});
		