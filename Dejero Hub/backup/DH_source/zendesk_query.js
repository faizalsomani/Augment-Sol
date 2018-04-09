(function($){
$("<style type='text/css'> .hover {-moz-box-shadow: 0px 0px 4px 1px grey;-webkit-box-shadow: 0px 0px 4px 1px grey; box-shadow: 0px 0px 4px 1px  grey;cursor: pointer;} </style>").appendTo("head");


//wrapper
  var $wrapperDiv = $('<div>').attr('id', 'wrapper').attr('style','color:white !important;background-color:#808080 !important;z-index : 10000000000 !important;position: fixed !important;top:10px !important;right : 10px !important;border-style: solid !important;border-color: #008CBA !important;width: 550px !important;');
$('body').append($wrapperDiv);
// search text
var $search = $('<input>')
							.val('Type here...')
							.attr({type :"text"})
							.attr('id', "input")
							.focus(function() {
                $(this).select();
              })
              .keypress(function(event) {
                  if (event.which === 13) {
                      $("#searchButton").click();
                  }
});
$('#wrapper').append($search); 
//radios
var $querySp = $('<span>')
							.attr('id', 'querySp')
              .html('  Query');
var $queryRd = $('<input>')
							.attr({type :"radio",  name :  "a"})
							.attr('id','queryR')
              .prop("checked", true)
              .val('query');
var $categorySp = $('<span>')
							.attr('id', 'categorySp')
              .html('  Category');
var $categoryRd = $('<input>')
							.attr({type :"radio",  name :  "a"})
							.attr('id','categoryR')
              .val('category');
var $sectionSp = $('<span>')
							.attr('id', 'sectionSp')
              .html('  Section');
var $sectionRd = $('<input>')
							.attr({type :"radio",  name :  "a"})
							.attr('id','sectionR')
              .val('section');
var $labelNamesSp = $('<span>')
							.attr('id', 'labelNamesSp')
              .html('  Label Names');
var $labelNamesRd = $('<input>')
							.attr({type :"radio",  name :  "a"})
							.attr('id','labelNamesR')
              .val('labelNames');
$('#wrapper').append($queryRd).append($querySp)
							.append($categoryRd).append($categorySp)
              .append($sectionRd).append($sectionSp)
              .append($labelNamesRd).append($labelNamesSp)
              .append('<br>');
//search button
var $searchBtn = $('<button>')
								.attr('id', 'searchButton')
                .html('Search');
$('#wrapper').append($searchBtn);

var $cancel = $('<button>').attr('id', 'cancel').html('Cancel').on('click', function(){
  $('#wrapper').remove();
});
$('#wrapper').append($cancel);

var $copied = $('<span>').html('Link Copied').attr('id', 'linkCopied').css({'color': 'yellow', 'display': 'none'});
$('#wrapper').append($copied).append('<br>');

var $copied2 = $('<span>').html('Title and Link Copied').attr('id', 'linkCopied2').css({'color': 'yellow', 'display': 'none'});
$('#wrapper').append($copied).append('<br>');

var radioVal = 'query';
$("input[name='a']").change(function(){
    radioVal = $(this).val();
   // alert(radioVal);
});
var obj;
$('#searchButton').on('click', function(){
	obj = $.ajax({
     headers: {
          'Authorization': 'Basic emVuZGVza2FkbWluQGRlamVyby5jb206TVhybVZ6VzFDWndv'
      },
      url: "https://dejero.zendesk.com/api/v2/help_center/articles/search.json?"+radioVal+"="+$('#input').val(),
      contentType : 'application/json',
      async : false
  });
  $('#listDiv').remove();
  //alert(1);
  $('#hidden').remove();
  //alert(2);
  console.log(obj);
  //alert(3);
	display(obj);
  //alert(4);
  //console.log($('#url').text());
});


function display(obj){

  var $listDiv = $('<div>').css({'top':'20px', 'max-height' : '200px', 'overflow-y' : 'scroll'}).attr('id', 'listDiv');
  $('#wrapper').append($listDiv);
  var $list = $('<ul>').attr('id', 'list_d').attr('style','display: inline !important');
  $('#listDiv').append($list);
  
  var $hidden = $('<div>').attr('id', 'hidden').css({'display': 'none'});
   $('#wrapper').append($hidden);
  var $url = $('<ul>').attr('id', 'url');
  $('#hidden').append($url);
  
  if(obj.responseJSON.count === 0){
  	var $noResult = $('<span>').html('Opps! No Result Found!').attr('id', 'noResult').css({'color': 'red'});
		$('#wrapper').append($noResult);
    setTimeout(function() { $("#noResult").remove(); }, 1000);

  } else {
	var numPages = obj.responseJSON.page_count;
  	
    console.log('1');
    
	for(var i = 1; i <= numPages; i++ ){
       console.log('2');
  	if(obj.responseJSON.page === 1){
       console.log('3');
    	makeList(obj.responseJSON.results);
    } else {
       console.log('4');
    	obj = $.ajax({
                     headers: {
                          'Authorization': 'Basic emVuZGVza2FkbWluQGRlamVyby5jb206TVhybVZ6VzFDWndv'
                      },
                      url: "https://dejero.zendesk.com/api/v2/help_center/articles/search.json?page="+i+'&'+radioVal+"="+$('#input').val(),
                      contentType : 'application/json',
                      async : false
                  });
       makeList(obj.responseJSON.results);
    }
  }
  }
}

function makeList (results){
	 console.log('5');
	for(var j = 0; j < results.length ; j++){
  
  	$('#url').append(
     		$('<li>').html(results[j].html_url)
		);
      var elem = $('<li>').html(results[j].title)
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
      .on('click', function(){
         console.log('6');
     // alert($(this).val());
     	console.log(j);
     	console.log($(this).index());
       	console.log($('#url li:eq(' + $(this).index() + ')')['0'].innerText);
      		copyToClipboard('li:eq(' + $(this).index() + ')');
      })
      .on('dblclick', function(){
        DcopyToClipboard('li:eq(' + $(this).index() + ')');
      });
  	$('#list_d').append( elem
      /*
			$('<li>').html(results[j].title)
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
      .on('click', function(){
         console.log('6');
     // alert($(this).val());
     console.log(j);
     	console.log($(this).index());
       console.log($('#url li:eq(' + $(this).index() + ')')['0'].innerText);
      		copyToClipboard('#url li:eq(' + $(this).index() + ')');
      }) */
      );
     
  }
}

function copyToClipboard(element) {
   console.log('7');
  var $temp = $("<textarea>").attr('id', 'temp');
  $("#wrapper").append($temp);
  console.log(typeof($('#url '+element)['0'].innerText));
  $('#temp').val( $('#url '+element)['0'].innerText).select();
  //alert
  //alert($('#temp').val());
  document.execCommand("copy");
  $('#temp').remove();
  
  $("#linkCopied").show();
setTimeout(function() { $("#linkCopied").hide(); }, 1000);
}

function DcopyToClipboard(element) {
   console.log('7');
  var $temp = $("<textarea>").attr('id', 'temp');
  $("#wrapper").append($temp);
  console.log(typeof($('#url '+element)['0'].innerText));
  $('#temp').val($('#list_d '+element)['0'].innerText + '.\nLink - ' + $('#url '+element)['0'].innerText).select();
  //alert
  //alert($('#temp').val());
  document.execCommand("copy");
  $('#temp').remove();
  
  $("#linkCopied2").show();
setTimeout(function() { $("#linkCopied2").hide(); }, 1000);
}
})(jQuery);