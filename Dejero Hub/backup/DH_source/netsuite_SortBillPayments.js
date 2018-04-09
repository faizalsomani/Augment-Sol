jQuery(function(){
  var today = new Date();
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return (monthIndex + 1) + '/' + day + '/' + year;
}//formatDate()
  var foundDates = 0;
  if (!/vendpymts.nl$/.test(window.location.pathname)) {
    if (confirm('you are not on bill payments screen. Would you like to go there?')) {
      window.location('https://system.na1.netsuite.com/app/accounting/transactions/vendpymts.nl?whence=');
    }
  }
  $('tr.uir-list-row-tr').each(
    function(r) {
      var $row = $(this);
      $row.children('td').last().each(function(r) {
        var $cell = $(this);
        if ((parseInt($cell.text()) + '') == $cell.text()) {
         // return false;
        }
        var trandateAttrName = 'BIS-trandate',
            daysOpenAttrName = 'BIS-daysopen',
            trandate = $cell.attr(trandateAttrName);
            daysOpen = $cell.attr(daysOpenAttrName);
            secondpass = (typeof trandate === 'undefined' ||typeof daysOpen=== 'undefined') ?  false : true,
            cellText = $cell.text();
            
        //console.log( $cell.attr(daysOpenAttrName));
        if( secondpass){
            trandate = $cell.attr(trandateAttrName);
            daysOpen = $cell.attr(daysOpenAttrName);
            
            if( /[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}.*/.test(cellText) ) {
                //toggle
                $cell.text( daysOpen);
            } else if( cellText === daysOpen ){
                //toggle
                $cell.text( trandate);
            } else {
                return; 
            }
            foundDates++;
        } else {
            trandate = new Date($cell.text());
            var timeinmilisec = today.getTime() - trandate.getTime();
            
            if (trandate < today) {
                //convert into another format for string storage
                trandate = formatDate(trandate);
                var daysOpen = Math.floor(timeinmilisec / (1000 * 60 * 60 * 24));
                $cell.attr(trandateAttrName, trandate)
                .attr(daysOpenAttrName, daysOpen).text( cellText + '('+ daysOpen + ')');
                foundDates++;
            }
        }
      })
    })
  alert('Converted ' + foundDates + ' dates');
});
