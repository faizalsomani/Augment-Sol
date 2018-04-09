// getting the stored data
chrome.storage.sync.get(function(data){
	//console.log(JSON.stringify(data.checkboxObj));
	//console.log('options.js called');

	//making a wrapper division to bind checkbox, span, and save Button
	var $wrapperDiv = $('<div>').attr('id', 'wrapper');
	$('body').append($wrapperDiv);	

	//making the checkbox,span with checked if true and unchecked if false in 'checkboxObj'
	for (var k in data.checkboxObj) {
		var $groupcheckbox =$('<input>')
		.attr({type :"checkbox",  name :  k})
		.attr('class','checkbox')
		.addClass('large')
		.prop('checked', data.checkboxObj[k].display);	

		var $group =$('<span>').attr('class', 'group')
		.attr('id', k)
		.html(k);

		$('#wrapper')
		.append( $groupcheckbox )
		.append($group)
		.append('<br>');

		for(var j in data.checkboxObj[k].elements) {
			var $elements = $('<span>')
			.attr('class', 'group')
			.attr('id', j)
			.html(j);

			var $elementdrop = $($('#hidden').html())
			.attr('class',k)
			.addClass(j)
			.val(data.checkboxObj[k].elements[j])
			.change(function(){
				data.checkboxObj[k].elements[j] = this.value;
			});

			$('#wrapper')
			.append("&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp;")
			.append($elementdrop)
			.append("&nbsp -> &nbsp;")
			.append($elements)
			.append('<br>');
		}
	}

	// create a save button
	var $saveButton = $('<button>').attr('id', 'saveButton').html('Save');
	$('#wrapper').append( $saveButton );


	// adding event of click to button, if clicked it changes the 'checkboxObj' in storage
	$('#saveButton').on('click', function(){
		 $('.checkbox').each(function(){
		 	//console.log(this);
		 	data.checkboxObj[this.name].display = this.checked;

		});
		// chrome.storage.sync.set({'checkboxObj' : data.checkboxObj});
		for (var k in data.checkboxObj) {
    		for(var j in data.checkboxObj[k].elements) {
      //console.log($('.'+k+'.'+j).val());
      			data.checkboxObj[k].elements[j] = $('.'+k+'.'+j).val();
     		 }
    	}
		console.log(data.checkboxObj);
		chrome.storage.sync.set({'checkboxObj' : data.checkboxObj});

		$('#wrapper').append('<h2 id = "saved"> Changes Saved </h2>');

	});

});



		

