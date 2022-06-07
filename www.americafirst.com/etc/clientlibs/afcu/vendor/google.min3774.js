$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBMuI0efE6fRB70fp_U55lZnyteGTgOUYs&libraries=places").done(function (){
	
	
	/* FIND ATM section */
	var atmAddressInput = document.getElementById('atmAddress');
	if(atmAddressInput != null && typeof google === 'object' && typeof google.maps === 'object'){
		
		function autoCompleteLocation(input) {
			autocomplete = new google.maps.places.Autocomplete(input);
			return autocomplete;
		}
		function addPlaceChangedListener(autoCompleteObj, input) {
			google.maps.event.addListener(autoCompleteObj, 'place_changed', function() {
				var place = autoCompleteObj.getPlace();
				var latitude = place.geometry.location.lat();
				var longitude = place.geometry.location.lng();
				var thisForm = $(input).closest('form');
				$(thisForm).children("input[name='latitude']").val(latitude);
				$(thisForm).children("input[name='longitude']").val(longitude);		
				if ($(thisForm).children("div.address-input").hasClass("has-error")) {
					$(thisForm).children("div.address-input").removeClass("has-error");
					$(thisForm).children("div.address-input").addClass("has-success");
				}		
				if ($(thisForm).siblings("div.alertContainer").html != "") {
					$(thisForm).siblings("div.alertContainer").html("");
				}	
			});
		}	
		
		var autoCompleteAtm = autoCompleteLocation(atmAddressInput);
		addPlaceChangedListener(autoCompleteAtm, atmAddressInput);
	}
	
	/* FIND Branch section */
	
	 var branchAddressInput = document.getElementById('branchAddress');
	  if (branchAddressInput != null && typeof google === 'object' && typeof google.maps === 'object') {
	   
	
	    function autoCompleteLocation(input) {
			let options={
				componentRestrictions:{country:'us'}
			}
		  autocomplete = new google.maps.places.Autocomplete(input,options);
	      return autocomplete;
	    }
	    function addPlaceChangedListener(autoCompleteObj, input) {
	      google.maps.event.addListener(autoCompleteObj, 'place_changed', function () {
	        var place = autoCompleteObj.getPlace();
	        var latitude = place.geometry.location.lat();
	        var longitude = place.geometry.location.lng();
	        var thisForm = $(input).closest('form');
	        $(thisForm).children("input[name='latitude']").val(latitude);
	        $(thisForm).children("input[name='longitude']").val(longitude);
	        if ($(thisForm).children("div.address-input").hasClass("has-error")) {
	          $(thisForm).children("div.address-input").removeClass("has-error");
	          $(thisForm).children("div.address-input").addClass("has-success");
	        }
	        if ($(thisForm).siblings("div.alertContainer").html != "") {
	          $(thisForm).siblings("div.alertContainer").html("");
	        }
	      });
	    }
	    
	    var autoCompleteBranch = autoCompleteLocation(branchAddressInput);
	    addPlaceChangedListener(autoCompleteBranch, branchAddressInput);
	  }
	  
	  /* Find branch search results */
	  
	  var markers = new Array(); // array to store google map marker objects
	  var currentLat, currentLng;

	//  $(document).ready(function () {
	    $('.toggleLocationDetails').click(function (e) {
	      e.preventDefault();
	      var collapseID = $(this).attr("href"); // get the id of the corresponding collapse (collapse1, collapse2, etc)
	      var markerNumber = parseInt(collapseID.replace("#collapse", "")); // store the numeric part of the collapse id (1,2,3, etc)
	      if (typeof markers[markerNumber] !== 'undefined') { // if the element in the markers array is defined
	        google.maps.event.trigger(markers[markerNumber], 'click'); //generate the click event on the marker which shows the corresponding collapse and infowindow
	      }
	    });
	    currentLat = $("#currentBranch").attr("data-value-curLat");
	    currentLng = $("#currentBranch").attr("data-value-curLong");
	    var all_branches = false;

	    if (currentLat == 0 && currentLng == 0) {
	      all_branches = true;
	      currentLat = 39.444678;
	      currentLng = -111.555176;
	    }

	    var latlng = new google.maps.LatLng(currentLat, currentLng);
	    var geocoder = new google.maps.Geocoder();
	    geocoder.geocode({'latLng': latlng}, function (results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        if (results[1]) {
	          $("<p>Location: " + results[1].formatted_address + "</p>").insertAfter(".alert.alert-info");
	        }
	      }
	    });
	    function initializeSearch() {
	      
	      var latlng = new google.maps.LatLng(currentLat, currentLng);
	      var mapOptions = {
	        center: latlng, // center the map on the user-specified location
	        zoom: !all_branches ? 11 : 6
	      };
	      var map = new google.maps.Map(document.getElementById('branch-search-results-map-canvas'), mapOptions);
	      setMarkers(map);
	      infowindow = new google.maps.InfoWindow({
	        content: "loading..."
	      });
	      function setMarkers(map) {
	        var afcuMarkerImage = $('#afcu-marker-image-path').attr('path') || "";
	        var afcuMarker = new google.maps.MarkerImage(afcuMarkerImage, null, null, null, new google.maps.Size(42, 70));
	        var locationMarkerImage = $('#afcu-location-marker-image-path').attr('path') || "";
	        var locationMarker = new google.maps.MarkerImage(locationMarkerImage, null, null, null, new google.maps.Size(42, 56));

	        var locations = [
	          [currentLat, currentLng, "<strong>Your Location</strong>"] // first array element (0) is the user-specified location
	        ];
	        if (all_branches) {
	          locations[0] = "";
	        }
	        $(".branch ").each(function () {
	          locations.push([$(this).attr("data-value-lat"), $(this).attr("data-value-lng"), $(this).attr("value")]);
	        });
	        for (var i = 0; i < locations.length; i++) {
	          var sites = locations[i];
	          var siteLatLng = new google.maps.LatLng(sites[0], sites[1]);
	          var markerIcon = afcuMarker;
	          if (i != 0) { // if it's a branch location
	            markerIcon = afcuMarker; // set the marker icon to the afcuMarker
	          } else { // it's the user specified location
	            markerIcon = locationMarker; // set the marker icon to the locationMarker
	          }
	          var marker = new google.maps.Marker({
	            position: siteLatLng,
	            map: map,
	            icon: markerIcon,
	            animation: google.maps.Animation.DROP,
	            html: sites[2], // html content for the infowindow
	            number: i // current loop index number (used to match with the corresponding collapse id)
	          });
	          markers.push(marker); // add the marker to the markers array
	          google.maps.event.addListener(marker, "click", function () {	// marker click event handler
	            collapseID = "#collapse" + this.number; // get the corresponding collapse id of the marker that was clicked (collapse1, collapse2, etc)
	            if ($(collapseID).hasClass('in') == false) { // if the corresponding collapse id is not already shown (doesn't have the class "in")
	              $('.panel-collapse.collapse.in').collapse('hide'); // hide any currently visible collapse content
	              if (this.number != 0) { // if the clicked marker is not the user-specified location
	                $(collapseID).collapse('show'); // show the corresponding collapse content
	              }
	            }
	            infowindow.setContent(this.html); // set the contents of the infowindow
	            infowindow.open(map, this); // open the infowindow
	          });
	        }
	      } // end setMarkers
	    } // end initialize	s

	    if ($('#branch-search-results-map-canvas').length) {
	    	initializeSearch();
	    }
	 // });
	    
	    //Branch details section
	    
	    function initializeDetails() {
	    	
	    	var lat = $("#branch_details_latitude").val(),
	    		long = $("#branch_details_longitude").val(),
	    		name = $("#branch_details_name").val(),
	    		street = $("#branch_details_street").val(),
	    		city = $("#branch_details_city").val(),
	    		state = $("#branch_details_state").val(),
	    		zip = $("#branch_details_zip").val();
	    	
	        var latlng = new google.maps.LatLng(lat, long);
	        var mapOptions = {
	          center: latlng, // center the map on the user-specified location
	          zoom: 16
	        };
	      
	        var map = new google.maps.Map(document.getElementById('branch-details-map-canvas'), mapOptions);
	        var html = "<strong>"+name+" Branch</strong><br>"+street+"<br>"+city+", "+state+" "+ zip +"<br><a href=\"https://maps.google.com?daddr="+lat+","+long+"\" target=\"_blank\">Driving Directions</a>";
	        var infowindow = new google.maps.InfoWindow({
	          content: html
			});
	        var afcuMarkerImage = $('#branch_details_marker').val() || "";
	        var afcuMarker = new google.maps.MarkerImage(afcuMarkerImage, null, null, null, new google.maps.Size(42,70));
	        var marker = new google.maps.Marker({
	          position: latlng,
	          map: map,
	          icon: afcuMarker,
	          animation: google.maps.Animation.DROP
	        });
	        google.maps.event.addListener(marker, "click", function() {	// marker click event handler
	          infowindow.open(map, this); // open the infowindow
			});
		
			var nearbyLat=document.getElementsByClassName('nearbyLocation');
			
			for(var i=0;i<nearbyLat.length;i++){
			
				var marker = new google.maps.Marker({
					position: {lat:Number(nearbyLat[i].firstElementChild.innerText), lng:Number(nearbyLat[i].lastElementChild.innerText)},
					map: map,
					icon: afcuMarker,
					animation: google.maps.Animation.DROP
				  });
		
			}
		  } // end initialize
	
	   
	      	if ($('#branch-details-map-canvas').length) {
	      		initializeDetails();
	      	}
});