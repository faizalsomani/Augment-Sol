  // Sending a message to show the Extension Icon
  //alert('before page action');
chrome.runtime.sendMessage({todo: "showPageAction"});

// Listener when any button is clicked, it calls the URL linked to that button
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.id == "buttonclicked"){
    	//alert(request.url);
    	console.log("message received");
 		var script = document.createElement('script');
		script.src="https://system.na2.netsuite.com" + request.url;
		$(document).ready(function(){
			//alert('hehe');
			document.body.appendChild(script);
		});
		
			
	}
});
//var url = window.location.href;
//alert(typeof(url));

chrome.runtime.sendMessage({'sending': "url", 'url': window.location.href}, function(){
	//alert('url sent');
});
