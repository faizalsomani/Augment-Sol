
/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/search'],
    function(search) {
      var resultObj = [];
        function onRequest(context) {
            if (context.request.method === 'GET') {
                
                var mySearch = search.load({
                    id: 'customsearch_my_doc_search' // id of the saved search
                });
                mySearch.run().each(function(result) {
                  result = result.toJSON();
                  //for( var keys in result){
                    //log.debug('value of ' + keys, result[keys]);
                  //}
                  try{
                  //log.debug('result filename', result['values']['file.name']);
                  //log.debug('type of ' , typeof(result['values']['file.name']));
                  resultObj.push(result['values']['file.name']);
                  //log.debug('name',resultObj);
                    
                  } catch(e){
                    log.debug('error');
                  }
                  return true;
                });
                
                
                
                context.response.write(resultObj.join(','));

                // example of resultObj:
                /*
                {
                "name":["confiluence_alert.js",
                        "google_alert.js",
                        "netsuite_alert.js",
                        "netsuite_feedback.js",
                        "youtube_alert.js"],
                "url":["/core/media/media.nl?id=374726&c=1216676&h=f2fcab4ecd4b45e42264&_xt=.js",
                      "/core/media/media.nl?id=374712&c=1216676&h=d77cb32b80f404a7b331&_xt=.js",
                      "/core/media/media.nl?id=374711&c=1216676&h=60a8f74ee29b75fe42be&_xt=.js",
                      "/core/media/media.nl?id=374710&c=1216676&h=4690ca4f4a0e9be4dd7f&_xt=.js",
                      "/core/media/media.nl?id=374713&c=1216676&h=bd84a44258369ca3329b&_xt=.js"],
                "description":["https://dejero.atlassian.net/*",
                              "https://www.google.*",
                              "https://system.na1.netsuite.com/*,https://system.sandbox.netsuite.com/*",
                              "https://system.sandbox.netsuite.com/*",
                              "https://www.youtube.com/*"]
                }
                */
            } else {
                //do nothing
            }
        }
        return {
            onRequest: onRequest
        };
    });
