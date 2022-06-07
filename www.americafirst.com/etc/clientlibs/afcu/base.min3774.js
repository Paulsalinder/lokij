
	//For Tab order accessibility  using keyboard


	 var activateTabPanel = function(tabsParentClass,tablist){
	
	  var tabs;
	  var panels;
	  var delay = determineDelay();

	  generateArrays();

	  function generateArrays () {
	    tabs = $(tabsParentClass+'a[role="tab"]');
	    panels = $(tabsParentClass+'div[role="tabpanel"]');
	 
	  };

	  // For easy reference
	  var keys = {
	    end: 35,
	    home: 36,
	    left: 37,
	    up: 38,
	    right: 39,
	    down: 40
	  };

	  // Add or substract depenign on key pressed
	  var direction = {
	    37: -1,
	    38: -1,
	    39: 1,
	    40: 1
	  };

	  // Bind listeners
	  tabs.each(function(i){
		  $(this).on('click', clickEventListener);
		  $(this).on('keydown', keydownEventListener);
		  $(this).on('keyup', keyupEventListener);
		  $(this).data("index",i);
		  
	  });

	  // When a tab is clicked, activateTab is fired to activate it
	  function clickEventListener (event) {
	    var tab = $(this);
	    activateTab(tab, false);
	  };

	  // Handle keydown on tabs
	  function keydownEventListener (event) {
	    var key = event.which || event.key;

	    switch (key) {
	      case keys.end:
	        event.preventDefault();
	        // Activate last tab
	        activateTab(tabs.last());
	        break;
	      case keys.home:
	        event.preventDefault();
	        // Activate first tab
	        activateTab(tabs.first());
	        break;

	      // Up and down are in keydown
	      // because we need to prevent page scroll >:)
	      case keys.up:
	      case keys.down:
	        determineOrientation(event);
	        break;
	    };
	  };

	  // Handle keyup on tabs
	  function keyupEventListener (event) {
	    var key = event.which || event.keyCode;
	    switch (key) {
	      case keys.left:
	      case keys.right:

	        determineOrientation(event);
	        break;
	    };
	  };

	  // When a tablistâ€™s aria-orientation is set to vertical,
	  // only up and down arrow should function.
	  // In all other cases only left and right arrow function.
	  function determineOrientation (event) {
	    var key = event.which || event.keyCode;
	    var vertical = tablist.attr('aria-orientation') == 'vertical';
	    var proceed = false;
	    if (vertical) {
	      if (key === keys.up || key === keys.down) {
	        event.preventDefault();
	        proceed = true;
	      };
	    }
	    else {
	      if (key === keys.left || key === keys.right) {
	        proceed = true;
	      };
	    };
	    if (proceed) {
	      switchTabOnArrowPress(event);
	    };
	  };

	  // Either focus the next, previous, first, or last tab
	  // depening on key pressed
	  function switchTabOnArrowPress (event) {
	    var pressed = event.which || event.keyCode;

	    tabs.each(function(){
	      $(this).on('focus', focusEventHandler);
	    });

	    if (direction[pressed]) {
	   //   var target = $(this);
	      var target = $(':focus');

	      if (target.data('index') !== undefined) {
	    	  
	        if (tabs.eq(target.data('index') + direction[pressed]).length) {
		    	  var focusCurrentTab = tabs.eq(target.data('index') + direction[pressed]);

		    	  focusCurrentTab.focus();
	        }
	        else if (pressed === keys.left || pressed === keys.up) {

	          focusLastTab();
	        }
	        else if (pressed === keys.right || pressed == keys.down) {

	          focusFirstTab();
	        };
	      };
	    };
	  };

	  // Activates any given tab panel
	  function activateTab (tab, setFocus) {
	    setFocus = setFocus || true;
	    // Deactivate all other tabs
	    deactivateTabs();

	    // Remove tabindex attribute
	    tab.removeAttr('tabindex');

	    // Set the tab as selected
	    tab.attr('aria-selected', 'true');
	    tab.attr('class','active nav-link');
	    
	    // Get the value of aria-controls (which is an ID)
	    var controls = tab.attr('aria-controls');
	    // Remove hidden attribute from tab panel to make it visible
	   // document.getElementById(controls).removeAttribute('hidden');
	    $("#"+controls).attr('class','tab-pane fade active show');

	    // Set focus when required
	    if (setFocus) {
	      tab.focus();
	    };
	  };

	  // Deactivate all tabs and tab panels
	  function deactivateTabs () {
		  tabs.each(function(){
		  $(this).attr('tabindex', '-1');
		  $(this).attr('aria-selected', 'false');
		  $(this).attr('class','nav-link');
		  $(this).off('focus', focusEventHandler);
	    });
		  
		  panels.each(function(){
		    	$(this).attr('class','tab-pane fade');
		    });
	  }
	   

	  // Make a guess
	  function focusFirstTab () {
	    tabs.first().focus();
	  };

	  // Make a guess
	  function focusLastTab () {
	    tabs.last().focus();
	  };

	  // Determine whether there should be a delay
	  // when user navigates with the arrow keys
	  function determineDelay () {
	    var hasDelay = tablist.attr('data-delay');
	    var delay = 0;

	    if (typeof hasDelay !== typeof undefined && hasDelay !== false) {
	      var delayValue = tablist.attr('data-delay');
	      if (delayValue) {
	        delay = delayValue;
	      }
	      else {
	        // If no value is specified, default to 300ms
	        delay = 300;
	      };
	    };

	    return delay;
	  };

	  //
	  function focusEventHandler (event) {
	    var target = $(this);
	    setTimeout(checkTabFocus, delay, target);
	  };

	  // Only activate tab on focus if it still has focus after the delay
	  function checkTabFocus (target) {
	    focused = $(':focus');

	    if (target.is(focused)) {
	      activateTab(target, false);
	    };
	  };
	  
	  }
	
	  

$(document).ready(function(){
	$(".btn").keypress(function( event ) {
		if(event.keyCode == 32){
			$(this).click();
			event.preventDefault();
			window.location.href = $(this).attr("href");
		}
		});
	
	$(".showhide-btn").keypress(function( event ) {
		if(event.keyCode == 32){
			$(this).click();
			event.preventDefault();
		}
		});
	
	
	$(".afcu-accordion .panel-title").keypress(function( event ) {
		if(event.keyCode == 32){
			$(this).find('.accordion-toggle').click();
			event.preventDefault();
		}
		});

$('.modal-afcu').on('show.bs.modal', function (e) {
	  $('html').addClass('modal-open');
	})

$('.modal-afcu').on('hidden.bs.modal', function (e) {
	  $('html').removeClass('modal-open');
	})

});


$(document).ready(function(){
	if(typeof wcmModeCheck !== 'undefined')
	if(!wcmModeCheck.isWcmEdit){
	function init(){
		var slider = $('.rates-slider');
		
		 $(".rates-slick-slider").on('afterChange', function(event, slick, currentSlide, nextSlide){	      
			  $(this).find(".slick-active").last().find('a').focus();
			}); 
		
		slider.parent().addClass('rates-no-padding');
		slider.parent().parent().addClass('rates-no-padding');
		slider.parent().parent().parent().addClass('rates-no-padding');
		slider.parent().parent().parent().parent().addClass('rates-no-padding');
		
		 $('.rates-slick-slider').slick({
			 	autoplay: false,
		        slidesToShow: 3,
		        slidesToScroll: 1,
		        swipeToSlide: true,
		        dots: false,
		        variableWidth: false,
		        prevArrow: false,
		        nextArrow: $('.rate-slider-next'),
		        responsive: [{
		            breakpoint: 768,
		            settings: {
		                slidesToShow: 2,
		                slidesToScroll: 1,
		            }
	
		        }, {
		            breakpoint: 321,
		            settings: {
		                slidesToShow: 1,
		                slidesToScroll: 1
		            }
		         
		        }]
		    });
	}
	 
	$(document).ajaxComplete(function(){
		init();
	});
	init();
	}
});
$(document).ready(function () {
    if($('.visa-activation.parbase').length > 0){
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenType');
    }
  /* Begin get cards */ 
	
$('#cards-list').on('click','.checkmark',function(){
	if( !$(this).hasClass('checked') ){
		$(this).addClass('checked');
	   }else{
		$(this).removeClass('checked');
	}
	var checkBoxes = $(this).siblings("input[name=cards_selected]");
	 checkBoxes.attr("checked", !checkBoxes.attr("checked"));
	 
	});
	
  $('#card-activate-error-message').hide();
  
  var signInHandler = function (e) {
	  e.preventDefault();
	  
	  var userId = $('#user_id').val();
	  var userPassword = $('#user_password').val();
	  
	  if (userId == '') {
	    event.preventDefault();
 		$(".visa-card-user-id-empty-alert").show();
 		$('#card-activate-error-message').hide();
	  } else {
	    $(".visa-card-user-id-empty-alert").hide();
	    $('#card-activate-error-message').hide();
	  }
	  if (userPassword == '') {
	    event.preventDefault();
 		$(".visa-card-user-password-empty-alert").show();
	  }	else {
	    $(".visa-card-user-password-empty-alert").hide();
	    $('#card-activate-error-message').hide();
	  } 
	  if(userId !== 'null' && userId != "" &&
	     userPassword !== 'null' && userPassword != ""){		  
		  $("#visa-loader").show();
		  $(this).find('.btn').addClass('disable');	
		  $('#signin').off('click.signin',signInHandler );
		      $('#activate_card').attr('disabled', false);
			  $.ajax({
		    	  method: "POST",
		    	  url: "/bin/visa/getcards",
		    	  data: { username: userId, password : userPassword, t:new Date().getTime() }
		    	}).done(function( response ) {
		    		  $("#visa-loader").hide();
		    		  $("#signin").find('.btn').removeClass('disable');
		    		  $('#signin').on('click.signin',signInHandler );
		    		if(response != null && response !== ""){
		    	    	$('#card-select-page-text').show();
		    	    	$('#card-sign-in-text').hide();
			    	    $('#visa-card-forgot-password').hide();
		 				sessionStorage.setItem('accessToken', response.accessToken);
		 				sessionStorage.setItem('tokenType', response.tokenType);
		    	    	if ( response.cards.length > 0) {
		    	    	    var resultData = "<div class='offset-md-2'>";  
		    	    	    var cardNumber = "";
		    	    	    for(var i = 0; i < response.cards.length; i++) {

                               cardNumber = response.cards[i].last4number.toString();
                               resultData += "<label class='custom_checkbox_container'>";
                               
                               resultData +=  response.cards[i].cardType;
                               if (cardNumber != null && cardNumber.length > 4) {
                               
                                resultData += " ("+ cardNumber + ")";
                               }
                               resultData += "<input type='checkbox' name='cards_selected' value='" + response.cards[i].cardType + "-" + response.cards[i].number + "'>";
                               
                               resultData += "<span class='checkmark'></span>";
                               resultData += "</label>";
                               
   						    }
						    resultData += "</div>";
                        	resultData += "<div class='row mt-2'>";
                        	resultData += "<div class='offset-md-2 col-md-6 col-sm-4 no-padding'>";
                            resultData += "<p id='cards-error-message' class='text-left alert-text no-display'>Card activation requires atleast one card selected.</p>";
                            resultData += "</div><div class='col-md-4 col-sm-4 no-padding'>";
                            resultData += "<button type='button' id='activate_card' class='btn btn-primary card-activate card-activate-button float-right text-uppercase'>Activate</button>";
							resultData += "<button type='button' id='close_card' class='btn btn-afcu-second-blue float-right text-uppercase'>Close</button>";
                            resultData += "</div></div>";
                                                                                                                
                            $('#cards-list').html(resultData);
                            $('#account-sign-in').hide();
                            
                        } else {
                            
                            $('#cards-list').html("Currently there are no cards to activate.");
                        }

		    		} else {
						//Other Error
						$('#card-activate-error-message').show();
						$('.visa-card-user-id-empty-alert').hide();
						$('.visa-card-user-password-empty-alert').hide();	
						
		    		}
		    	  }).fail(function() {
		    		  $("#signin").find('.btn').removeClass('disable');
		    		  $('#signin').on('click.signin',signInHandler );
		    	      $('#card-activate-error-message').show();
		    	 	  $("#visa-loader").hide();
                  });
		  }

  };
  
  $('#signin').on('click.signin',signInHandler );
  
  $('body').on('click', '#close_card', function () {
		location.reload(true);
  });

  
  $('body').on('click', '.card-activate', function (e) {
	  e.preventDefault();
      var selectedCards = $('#cards-list input[checked=checked]').map(function(_, el) {
        return $(el).val();
      }).get();
      if (selectedCards != null && selectedCards != '') {
            $('#activate_card').attr('disabled', true);
            $('#cards-error-message').hide();
            $.ajax({
              method: "POST",
              url: "/bin/visa/activatecard",
              data: { cards_selected: selectedCards.join(),
            	      token_type: sessionStorage.getItem('tokenType'),
                      card_session_token: sessionStorage.getItem('accessToken'),
                      t:new Date().getTime()
              }
            }).done(function( response ) {
            	sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('tokenType');
		      $('#card-select-page-text').hide();
              $("#cards-list").hide();
              $("#cards-error-message").hide();
              if(response != null && response !== ""){
    		     $('#card-activation-text').show();
                 var activateErrorflag = "";
       		     if ( response.result.length > 0) {
    	    	    var resultData = "";
    	    	    for(var i = 0; i < response.result.length; i++) {

					   resultData += "<div class='row justify-content-md-left mt-2'>";
					   resultData += "<div class='col-lg-3 col-md-4 col-sm-4'><b>" + response.result[i].cardType + " ("+ response.result[i].cardNumber + ")</b></div>";
                       if(response.result[i].status == 'Activated') {
                         resultData += "<div class='col-md-3 col-sm-4 green-text'>";
                       } else {
                         resultData += "<div class='col-md-3 col-sm-4 alert-text'>";
                         activateErrorflag = "1";
                       }
                       resultData += response.result[i].status + "</div>";

                       resultData += "</div>";
                       
				    }
				    resultData +="</div>";
				    if (activateErrorflag == "1") {
                       	resultData += "<div class='col-md-auto col-sm-4 alert-text mt-2'>We are unable to activate your card online. Please call us at 1-800-999-3961.</div>";
                    }
                    
                    $('#card-activate-result-msg').html('');
                    if (activateErrorflag == "1") {
                       $('#card-activation-text').html("<div class='alert-text'><p>Cards are not activated as expected and status as below</p></div>");
                    }
                    $('#cards-response').html(resultData);
                    $('#account-sign-in').hide();
                    
                }
             }   
              setTimeout(function () {
      		    window.location.reload();
      		}, 30000);   
            }).fail(function() {
            	sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('tokenType');
            	setTimeout(function () {
        		    window.location.reload();
        		}, 30000);
               });
      } else {
      	$('#cards-error-message').show();
      }  
   
 });    

  $("#account-sign-in .orange-default").hover(function(){
		$("#account-sign-in .tooltiptext").css("visibility","visible");
  });

	if($('#account-sign-in').length > 0){//if the page contains visa component
	
		$(document).on("click touchstart", function(e){
			
			 if($(e.target).attr("class") == "tooltiptext"){
					$("#account-sign-in .tooltiptext").css("visibility","visible");
			          return;
			 }
			 
		     if($(e.target).closest('.orange-default').length){
					$("#account-sign-in .tooltiptext").css("visibility","visible");
			          return;
		     }
			$("#account-sign-in .tooltiptext").css("visibility","hidden");
		});
	}

});
$(document).ready(function(){
	var videoComponent = $('.video');

	if(videoComponent.length){
		var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
	}
	
});


var players = new Array();
/* eslint-disable-next-line */
function onYouTubeIframeAPIReady() {
    var temp = $("iframe.yt_players");
    for (var i = 0; i < temp.length; i++) {
        var t = new YT.Player($(temp[i]).attr('id'), {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(t);
    }
    
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        $.each(players, function() {
            if (this.getIframe().id != event.target.getIframe().id) {
                this.pauseVideo();
            }
        });
    }
}

$(document).ready(function(){
	var exception_array, 
		exception_link_classname="external-link",
		speedbumpHostname= window.location.hostname,
		exception_link = $("#speedbumpExceptionLink").val(),
		domainName = "americafirst.com",
		extExceptionDomain = ["http://cfs.americafirst.com", "https://cfs.americafirst.com"];
	
	
 	/*
    * Function to fetch the paramter values using the URL
    *
    */
    function getUrlParam(name, url) {
        var regExp = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)');
        var params = regExp.exec(url);
        var data = "";
        if (params && params.length > 0) {
            data = decodeURIComponent(params[1]);
        }
        return data;
    }
	
    if(exception_link != " ") {
		exception_array = exception_link.split(',');
    }

    function get_hostname(url) {
	    var host = url.match(/^http.?:\/\/[^/]+/);
	    return host ? host[0] : null;
	}
    
    function addCidToButtons(){
    	$('.btn').each(function() {
    		var link = $(this).attr("href")+"",
    			cid = getUrlParam("cid", window.location.search)+"";
    		
    		
    		if(cid.length > 0 && link != "undefined" && link.length > 0){
    			
	    		if(link.indexOf("?") > 0){
	    			cid = "&cid="+cid;
	    		}else{
	    			cid = "?cid="+cid;
	    		}
	    		
	    		if(getUrlParam("cid", link).length <= 0){
	    			link = link + cid;
	    			$(this).attr("href", link);
	    		}
    		}
    	});		
    }
    
    function init(){
		$('a[href]').each(function() {
			var link = $(this).attr("href");
			var hostname = get_hostname(link);
				if(hostname != null) {
					
					//check for the exception list
					if(jQuery.inArray(hostname, extExceptionDomain) >= 0) {			
						 $(this).addClass(exception_link_classname);
					}else{
					
						if(exception_array != null) {
		                    if(jQuery.inArray(link, exception_array) == -1) {
		                        if(hostname.indexOf(domainName) < 0 && hostname.indexOf(speedbumpHostname) < 0) {
		                            $(this).addClass(exception_link_classname);
		                        }
		                    }
		                    else{
		                        $(this).removeClass(exception_link_classname);
		                    }
		                }
		                else {
		                  if(hostname.indexOf(domainName) < 0 && hostname.indexOf(speedbumpHostname) < 0) {
		                        $(this).addClass(exception_link_classname);
		                    }
		                }
					}
	            }
	    });
		
		addCidToButtons();
    }
/* eslint-disable-next-line */
	function getPosition(string, subString, index) {
		return string.split(subString, index).join(subString).length;
	}
	
    $('.speedbump #modal-continue').click(function() {
        $('.modal').modal('hide');
    });
    
    $('a.external-link').off();

    $('body').on('click','a.external-link' ,function(event) {	
    
        event.preventDefault();
        event.stopPropagation();
        var targetUrl = $(this).attr("href");
        
        if($(".modal.show").length > 0){
        	
        	 $('.modal.show').modal('hide');
        	setTimeout(function(){ $('#external-link-modal').modal();  $('#modal-continue').attr('href', targetUrl);  }, 500);
        }
        else{
        	
        	 $('#external-link-modal').modal(); 
        	 $('#modal-continue').attr('href', targetUrl); 
        }
        
      
    });
    
   


    function centerModals(){
	  	$('.speedbump').each(function(){
	  		//what's this statement does, please explain
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
	  	});
	}
	$('.speedbump').on('show.bs.modal', centerModals);
	$(window).on('resize', centerModals);
	init();

	$(document).ajaxComplete(function(){
		init();
	});



    var focusElement = (function() {

/* eslint-disable-next-line */
    var currentFocus = null;

    function setCurrentFocus(){
 		focusElement.currentFocus = $(':focus');
    }

    function goToLastFocused(){
        var restoreFocus = focusElement.currentFocus;
 		//var restoreFocus = $focusElement[0];
        restoreFocus.focus();
    }

    return {
        setCurrentFocus: setCurrentFocus,
        goToLastFocused: goToLastFocused
    };
})(this);

$(document).on('hidden.bs.modal', function () {
    focusElement.goToLastFocused();
}).on('show.bs.modal', function () {
		focusElement.setCurrentFocus();
}).on('shown.bs.modal', function () {
	$(".speedbump .modal-title").focus();
});

});
$(document).ready(function (){
	$('#st-search-input').swiftype({
		engineKey: $("#searchFormId").data("enginekey"),
		onComplete: function(selectedItem) {
		  $('#st-search-input').val(selectedItem['title']); 
		  $("#searchFormId").submit();
		}
	  });
	$('#openSearch').click(function(e){
        e.preventDefault();
        $("#headerSearchButtonToggle").click();
        e.stopPropagation();
    });
    
	
  //to handle search button enable and disable
    	$(".gsc-search-button").prop('disabled', true);
    	   $( "input.gsc-input" ).keyup(function() {
    	     var searchText = $(this).val();
    	     searchText = searchText.trim();
    	     var isContainHtmlTag = /<(.*?)>|{(.*?)}/.test(searchText);
    	     var isMaxTwoCharacters = /[^]{2,}/.test(searchText);
    	     if(!isContainHtmlTag && isMaxTwoCharacters){
    	       $("button.gsc-search-button").prop('disabled', false);
    	       $("button.gsc-search-button").css('border-color','#369');
    	       $("button.gsc-search-button").css('background-color','#166296');
    	       $("button.gsc-search-button").closest('form').attr('onSubmit','return true;');
    	         }else{
    	   $("button.gsc-search-button").prop('disabled', true);
	       $("button.gsc-search-button").css('border-color','#aaa');
	       $("button.gsc-search-button").css('background-color','#aaa');
    	   $("button.gsc-search-button").closest('form').attr('onSubmit','return false;');
    	         }

       });
    
var searchQueryParam = $('#searchQueryParam[type=hidden]');
if (searchQueryParam.length != 0 && searchQueryParam.val().length != 0) {
   var spUrl =  $("#search-promote-container").data("form");
   if(spUrl != undefined && spUrl.length > 0){

	    $.ajax({
	  	  method: "GET",
	  	  url: spUrl,  	  
	  	}).done(function( response ) {
	  		try{
	  		if(response != null && response !== ""){
	  			var semiRegExp = new RegExp(';', 'g');
	  			
	  			//Search Results section

	  			if(response.results.length > 0){
	  				var items = ""
	  				$.each(response.results, function(index, result ) {
	  					items = items + '<div class ="st-result-item"><div class = "st-result-link"><a class="st-title" href="'+result.url+'">'+result.title+'</a><div><div class="st-result-text"><div>'+result.description+'</div></div></div></div></div>';
	  				});
	  				
	  				$('.search-results-body').html(items);
	  			}	  			

	  			//facets section(side panel)
	  			//Commenting out the facets section to hide category
//	  			if(response.facets.length > 0){
//	  				var facets = "";
//	  				
//	  				$.each(response.facets, function(index, item ) {
//	  					
//	  					if(item.label){
//	  						var label = "Category";
//		  				  
//	  						if(item.label === "contentType"){
//	  							label = "Content Type";
//	  						}
//	  							
//		  					if(item.undolink){
//		  						var facets_undolink = item.undolink.replace(semiRegExp, "&");
//		  						facets = facets + '<div class = "st-facet-item"><div class="st-facet-header"><span>'+label+'</span><span class="offscreen">search filters</span><a href="'+facets_undolink+'" class="clear-search">clear all</a></div>';
//			  					
//		  					}else{
//		  						facets = facets + '<div class = "st-facet-item"><div class="st-facet-header"><span>'+label+'</span><span class="offscreen">search filters</span></div>';
//		  					}
//		  					
//		  					
//		  					var items = "";
//		  					$.each(item.values,function(index, facets){
//		  						
//		  						
//		  						if(facets.value === "Forms" && label === "Category"){
//			  						//ignore
//		  						}else{
//		  							if(facets.selected === "true" ){
//			  							var undolink = facets.undolink.replace(semiRegExp, "&");
//			  							items = items+ '<div class ="st-facet-link"><a aria-label="Clear '+facets.value+' Filter" class="st-undo" href="'+undolink+'"><i class="fa fa-times"></i></a><a aria-selected="true" class="st-title selected" href="javascript:void();">'+facets.value+'</a></div>';
//			  							
//			  						}else{
//			  							var link = facets.link.replace(semiRegExp, "&");
//			  							
//			  							items = items+ '<div class ="st-facet-link"><a class="st-title" href="'+link+'">'+facets.value+'</a></div>';
//			  						}
//		  						}
//		  						
//		  						
//		  					});
//		  					if( items !== "" ){
//		  						facets = facets + items;
//		  						facets = facets +'</div>';
//		  					}else{
//		  						facets = "";
//		  					}
//	  					}
//	  				});
//	  				
//	  				$('.search-results-facets').html(facets);
//	  			}
	  			
				  //Search header
				  var header=" ";
	  			
	  			//Search header
	  			if(response.general){
	  				header = '<b> Showing '+response.general.page_lower+' - '+response.general.page_upper+'  of '+response.general.total+' results </b>';
	  				 $('.st-results-header').html(header); 
	  				 
	  			}else{
	  				header = '<b> Showing 0 - 0  of 0 results </b>';
	  				 $('.st-results-header').html(header);
	  			}
	  			


	  			if(response.info.page != null && response.results.length > 0 ){
					
					var pageInfoObj = response.info.page;
					var noOfPages = parseInt(pageInfoObj.num_pages);
					var currentPage = parseInt(pageInfoObj.current_page);
					var totalNoOfResults = parseInt(pageInfoObj.total_result_count);
					var perPage = parseInt(pageInfoObj.per_page);
					var noOfResultsInCurrentPage = response.results.length;
					var searchTerm = pageInfoObj.query;

					var header = '<b> Showing '+ ( ( ( currentPage - 1 ) * perPage ) + 1 ) +' - '+ ( ( perPage * ( currentPage - 1 ) ) + noOfResultsInCurrentPage ) +'  of '+ totalNoOfResults +' results </b>';
					   $('.st-results-header').html(header); 

					if( noOfPages > 1 ){

						var pageNums = "";

						if(currentPage !== 1){
							pageNums = pageNums + '<a aria-label="Go to Previous Page" class="pagination-prev" href="?page='+ ( currentPage - 1 ) +'&amp;q='+ searchTerm +'"><span class="page-text">Previous</span></a>';
						}

						for( let i = 1 ; i <= noOfPages ; i++ ){
							if( i === currentPage )
								pageNums = pageNums + '<a aria-label="Go to Page '+ i +'" id="st-pagination-'+ i +'" aria-selected="true" class="current active" href="?page='+ i +'&amp;q='+ searchTerm +'">'+ i +'</a>';
							else
								pageNums = pageNums + '<a aria-label="Go to Page '+ i +'" id="st-pagination-'+ i +'" aria-selected="false" class="inactive" href="?page='+ i +'&amp;q='+ searchTerm +'">'+ i +'</a>';
						}

						if( currentPage !== noOfPages ){
							pageNums = pageNums + '<a aria-label="Go to Next Page" class="pagination-next" href="?page='+ ( currentPage + 1 ) +'&amp;q='+ searchTerm +'"><span class="page-text">Next</span></a>'
						}

						$('#afcu-search-pagination').html(pageNums);

					}
					
	  			}
	  			
	  			//suggestions
	  			
	  			if(response.suggestions && response.suggestions.length > 0){
	  				$('#search-suggestions').html('Did you mean "<a href="#" >'+response.general.query+'</a>"?');
	  			}
	
	  		}	
	  		}catch(err){
	  			
	  			console.error(err);
	  			header = '<b> Showing 0 - 0  of 0 results </b>';
  				 $('.st-results-header').html(header);
	  		}
	  	    
	  	  });
   	}

}

});
/*eslint-disable*/
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function parseFloatNumber(num){

	return parseFloat(num.toString().replace(/,/g, ''));
}
/* eslint-disable */
function parseIntegerNumber(num){
/* eslint-enable */
	return parseInt(num.toString().replace(/,/g, ''));
}

function formatLeadingZeros(num) {
    return num.toString().replace(/^0+/, '');
}




$(document).ready(function() {

	$(".mortgage-loans").on("change","select",function(){
		$("option[value=" + this.value + "]", this).attr("selected", true).siblings().removeAttr("selected");
	});

	
	
		
		$(".send-email").on('click', function(){
			$('.capture-email').toggleClass("open");
		});
		
		
		$('#sendemail-confirm').on('click', function(){
			var email = $('#mortgageCalcSendEmail').val()+"";
			$(this).attr("disabled", true);
			
			
			if(email.length > 0 ){
				$('#send-email-success').addClass('d-none');
				
			
				var mp = $('#estimatedMonthlyPayment').html(),
					mi = $('#monthlyPrincipal').html(),
					ins = $('#mortgageInsurance').html(),
					rate = $('#apr').html(),
					hi = $('#homeownersInsurance').val(),
					tax = $('#propertyTax').val(),
					affees = $('#americaTotalFees').html(),
					ofees = $('#originalFee').html(),
					pfees = $('#processingFee').html(),
					tpfees = $('#thirdPartyTotalFees').html(),
					apfees = $('#appraisalFee').html(),
					txfees = $('#taxServiceFee').html(),
					tfees = $('#titleFee').html(),
					gfees = $('#governmentotalFees').html(),
					rfees = $('#recordingFee').html(),
					lafees = $('#loanAdjustmentTotalFees').html(),
					nvfees = $('#nevadaTransferTax').html(),
					total = $('#totalClosingFee').html();
					
				
				
					if($('#nav-purchase').hasClass('active')){
						var ipt = $("#propertyTypePurchase :selected").text(),
						ipu = $("#propertyUsedPurchase :selected").text(),
						ics = $("#nav-purchase #creditCardScorePurchase :selected").text(),
						ilt = encodeURIComponent($("#loanTermPurchase :selected").text()),
						izip = $("#zipcodePurchase").val(),
						istate = $("#statePurchase :selected").text(),
						ipp = $("#purchasePricePurchase").val(),
						idp = $("#downPayment").val(),
						ila = $("#loanAmountpurchase").val();
						
					}else{
						var ipt = $("#propertyTypeRefinement :selected").text(),
						ipu = $("#propertyUsedRefinement :selected").text(),
						ics = $("#nav-refinement #creditCardScoreRefinance :selected").text(),
						ilt = encodeURIComponent($("#loanTermRefinement :selected").text()),
						izip = $("#zipcodeRefinement").val(),
						istate = $("#stateRefinance :selected").text(),
						ipp = $("#purchasePriceRefinement").val(),
						ila = $("#loanAmountrefinance").val(),
						icor = $("#isCashOut:checked").length;
					}

					  $.ajax({
						url : $('#resourceType').val() + '.email.html?email='+ email
								+ '&mp='+ mp
								+ '&mi='+ mi
								+ '&ins='+ ins
								+ '&rate='+ rate
								+ '&hi='+ hi
								+ '&tax='+ tax
								+ '&affees='+ affees
								+ '&ofees='+ ofees
								+ '&pfees='+ pfees
								+ '&tpfees='+ tpfees
								+ '&apfees='+ apfees
								+ '&txfees='+ txfees
								+ '&tfees='+ tfees
								+ '&gfees='+ gfees
								+ '&rfees='+ rfees
								+ '&lafees='+ lafees
								+ '&total='+ total
								+ '&nvfees='+ nvfees
								+ '&ipt='+ipt
								+ '&ipu='+ipu
								+ '&ics='+ics
								+ '&ilt='+ilt
								+ '&izip='+izip
								+ '&istate='+istate
								+ '&ipp='+ipp
								+ '&idp='+idp
								+ '&ila='+ila
								+ '&icor='+icor
								+ "&t="+ new Date().getTime()
								+ "",
						type : 'GET',
						dataType : 'json'
					}).done(function(returnedData) {
			        	
			        	try{
							$('#sendemail-confirm').removeAttr('disabled');
							$('#send-email-success').removeClass('d-none');
							$('#send-email-success').show();
						}catch(e){
							    console.error(e);
						}
			        	
				        }).fail(function(data) {	
				        	try{
								$('#sendemail-confirm').removeAttr('disabled');
								
							}catch(e){
								    console.error(e);
							}
				        });
			}
			
		});
		

	
	// formating price amount 
	
	var options =  {
			reverse: true ,
			onKeyPress: function(cep, e, field, options) {	
				if(cep.indexOf(".") >= 0){
					
					field.mask("000,000,000.00", {
						reverse: true ,
						onKeyPress: function(cep, field) {
							var propertyTax="";
							var homeownersInsurance="";
							if(cep.length == 0){
								field.mask("000,000,000", options  );
							}
							field.val(formatLeadingZeros(cep));
							
							if( field.attr('id') == 'propertyTax' ){
								propertyTax = cep,
								  homeownersInsurance = $('#homeownersInsurance').val();
								 calculateTotalAfterInput(propertyTax,homeownersInsurance); 
							}else if( field.attr('id') == 'homeownersInsurance' ){
								propertyTax = $('#propertyTax').val(),
								  homeownersInsurance = cep;
								 calculateTotalAfterInput(propertyTax,homeownersInsurance); 
							}	  
							 
						},
						translation: {
							'0': {pattern: /[0-9*]/}
						}
				});
				}
				field.val(formatLeadingZeros(cep));
				var propertyTax ='';
				var homeownersInsurance="";
				if( field.attr('id') == 'propertyTax' ){
					propertyTax = cep,
					  homeownersInsurance = $('#homeownersInsurance').val();
					 calculateTotalAfterInput(propertyTax,homeownersInsurance); 
				}else if( field.attr('id') == 'homeownersInsurance' ){
					propertyTax = $('#propertyTax').val(),
					  homeownersInsurance = cep;
					 calculateTotalAfterInput(propertyTax,homeownersInsurance); 
				}	  
				
			},
			translation: {
				'0': {pattern: /[0-9.*]/}
			}
			};

	var customPaymentOptions =  {
			reverse: true ,
			onKeyPress: function(cep, e, field, downPaymentOptions) {	
				if(cep.indexOf(".") >= 0){
					field.mask("000,000,000.00", {
						reverse: true ,
						onKeyPress: function(cep, e, field) {
							if(cep.length == 0){
								field.mask("000,000,000", downPaymentOptions  );
							}
							field.val(formatLeadingZeros(cep));
							var downPayment=0;
							var purchasePrice=0;
							if( field.attr('id') == 'purchasePricePurchase' ){
								downPayment = parseFloatNumber($("#downPayment").val()),
								purchasePrice = parseFloatNumber(cep);
							}else if( field.attr('id') == 'downPayment' ){
								downPayment = parseFloatNumber(cep),
								purchasePrice = parseFloatNumber($("#purchasePricePurchase").val());
							}

							   if(isNaN(purchasePrice)){
					               purchasePrice = 0;
					           }
							   setLoanAmount(downPayment, purchasePrice);			  
							   checkPurchaseLoanAmountMaxVal();
							
						},
						translation: {
							'0': {pattern: /[0-9*]/}
						}
				});
				}
				 if(/^0+$/.test(cep)){
					 cep = 0;
			      }else{
			    	  cep = formatLeadingZeros(cep);
			      }
				field.val(cep);
				var downPayment =0;
				var purchasePrice=0;
				if( field.attr('id') == 'purchasePricePurchase' ){
					downPayment = parseFloatNumber($("#downPayment").val()),
					purchasePrice = parseFloatNumber(cep);
				}else if( field.attr('id') == 'downPayment' ){
					downPayment = parseFloatNumber(cep),
					purchasePrice = parseFloatNumber($("#purchasePricePurchase").val());
				}

				   if(isNaN(purchasePrice)){
		               purchasePrice = 0;
		           }
				   setLoanAmount(downPayment, purchasePrice);			  
				   checkPurchaseLoanAmountMaxVal();
				   
				   
			},
			translation: {
				'0': {pattern: /[0-9.*]/}
			}
			};

	$("#purchasePricePurchase").mask("000,000,000", customPaymentOptions);
	$("#downPayment").mask("000,000,000", customPaymentOptions  );
	$("#loanAmountpurchase").mask("000,000,000", options );
	$("#purchasePriceRefinement").mask("000,000,000", options);
	$("#loanAmountrefinance").mask("000,000,000", options);
	$("#homeownersInsurance").mask("000,000,000", options);
	$("#propertyTax").mask("000,000,000", options);
	$('#zipcodePurchase').mask("000000");
	$('#zipcodeRefinement').mask("000000");

	//For Tab order accessibility  using keyboard
	var tablistatm = $('.mortgage-loans [role="tablist"]');
	/* eslint-disable */
	  activateTabPanel('.mortgage-loans ',tablistatm);
	/* eslint-enable */

	  
	  function setAppraisalFee(titleFeeParams){

		  $.get('/bin/mortgage/appraisalfee', {
			  titleFeeParams:JSON.stringify(titleFeeParams)
					},
					function(returnedData){
						if(returnedData != null){
							try{
								var fee = returnedData.fee;
								$('#appraisalFee').text(formatNumber(fee.toFixed(2)));

								 var thirdPartyFeeTemp = 0.0;
								  if($("#thirdPartyTotalFees").text() != ""){
									  thirdPartyFeeTemp = parseFloatNumber($("#thirdPartyTotalFees").text());
								  }

								  $("#thirdPartyTotalFees").text(formatNumber((thirdPartyFeeTemp + fee).toFixed(2)));

								  var totalCostingFeesTemp = 0.0;
								  if($("#totalClosingFee").text() != "")
									  totalCostingFeesTemp = parseFloatNumber($("#totalClosingFee").text());

								  $("#totalClosingFee").text(formatNumber((fee + totalCostingFeesTemp).toFixed(2)));
								  setRecordingFee(titleFeeParams);
							}catch(e){
								    console.error(e);
								    $("#mortgage-request-alert").show();
								    $("#mortgage-loader-container").hide();
									$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
								  }
							  }
					});
	  }

	  function setRecordingFee(titleFeeParams){
		  $.get('/bin/mortgage/recordingfee', {
			  	state:titleFeeParams["state"]
					},
					function(returnedData){
						if(returnedData != null){
							try{
								var fee = returnedData.fee;
								  $('#recordingFee').text(fee.toFixed(2));

								  var thirdPartyFeeTemp = 0.0;
								  if($("#thirdPartyTotalFees").text() != "")
									  thirdPartyFeeTemp = parseFloatNumber($("#thirdPartyTotalFees").text());

								  $("#thirdPartyTotalFees").text(formatNumber((thirdPartyFeeTemp).toFixed(2)));

								  var totalCostingFeesTemp = 0.0;
								  if($("#totalClosingFee").text() != "")
									  totalCostingFeesTemp = parseFloatNumber($("#totalClosingFee").text());

								  $("#totalClosingFee").text(formatNumber((totalCostingFeesTemp).toFixed(2)));

								  setGovernemntFee(titleFeeParams);
							}catch(e){
								    console.error(e);
								    $("#mortgage-request-alert").show();
								    $("#mortgage-loader-container").hide();
									$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
								  }

						}
				});
	  }

	  function setGovernemntFee(titleFeeParams){


			try{
			//	var fee = parseFloat(returnedData.fee);
				var transferTax = 0.0;
				var fee =  parseFloatNumber($('#recordingFee').text());



				if(titleFeeParams["state"] == "NV" & titleFeeParams["type"] == "purchase" ){

					transferTax = (parseFloatNumber(titleFeeParams["purchasePrice"]) * 0.0051);

					$('#nevadaTransferTax').text(formatNumber(transferTax.toFixed(2)));

					$('#nevadaTransferTaxRow').removeClass("d-none");
				}else{
					$('#nevadaTransferTaxRow').addClass("d-none");
				}

				$("#governmentotalFees").text(formatNumber((fee + transferTax).toFixed(2)));


				//$("#governmentotalFees").text(formatNumber((fee + transferTax).toFixed(2)));

				var totalCostingFeesTemp = 0.0;

				if($("#totalClosingFee").text() != "")
					totalCostingFeesTemp = parseFloatNumber($("#totalClosingFee").text());

				  $("#totalClosingFee").text(formatNumber((fee + totalCostingFeesTemp + transferTax).toFixed(2)));

				  calculateMortgagePrincipalAndAPR(titleFeeParams);

					//populateMortgageMGICInsuranceFees(titleFeeParams);
			}catch(e){
				    console.error(e);
				    $("#mortgage-request-alert").show();
				    $("#mortgage-loader-container").hide();
					$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
			}


	  }

	  function populateFees(returnedData,titleFeeParams,isTitleFeeError){
	   try{
		   var totalBuyersAmount = 0.0;
		  if( !isTitleFeeError ){
		  try{
		  var fee = returnedData.getElementsByTagName('FEE');
			  for(let i=0;i<fee.length;i++)
			  {
				  if(fee.item(i).getAttribute("xlink:label").indexOf("FEE_POLICY") >= 0){
				   console.log("break linter");
					/* eslint-disable */
					  actualBuyersAmount = 0.0;
					  estimateBuyersAmount = 0.0;
				
					  var feePayment = fee.item(i).getElementsByTagName('FEE_PAYMENT');
					  for( var j=0;j<feePayment.length;j++)
					  {
						 var feeType = feePayment.item(j).getElementsByTagName('FeePaymentPaidByType')[0].textContent;
						  
						 if(feeType != null && feeType === "Buyer"){

							 if( feePayment.item(j).getElementsByTagName('FeeEstimatedPaymentAmount').length > 0 ){
							   var feeAmount = feePayment.item(j).getElementsByTagName('FeeEstimatedPaymentAmount')[0].textContent;
							   estimateBuyersAmount = estimateBuyersAmount + parseFloat(feeAmount);
							 }	
							 if( feePayment.item(j).getElementsByTagName('FeeActualPaymentAmount').length > 0 ){
							   var feeAmount = feePayment.item(j).getElementsByTagName('FeeActualPaymentAmount')[0].textContent;
							   actualBuyersAmount = actualBuyersAmount + parseFloat(feeAmount);
							 }
	
						  }
					  }
					  if( estimateBuyersAmount == 0.0  ){
						  totalBuyersAmount = totalBuyersAmount + parseFloat(actualBuyersAmount);
					  }else{
						  totalBuyersAmount = totalBuyersAmount + parseFloat(estimateBuyersAmount);
					  }
				  }else{
					  var feePayment = fee.item(i).getElementsByTagName('FEE_PAYMENT');
					  for(j=0;j<feePayment.length;j++)
					  {
						 var feeType = feePayment.item(j).getElementsByTagName('FeePaymentPaidByType')[0].textContent;
	
						  if(feeType != null && feeType === "Buyer"){
							  
							if( feePayment.item(j).getElementsByTagName('FeeActualPaymentAmount').length > 0 ){
							  var feeAmount = feePayment.item(j).getElementsByTagName('FeeActualPaymentAmount')[0].textContent;
							}
							totalBuyersAmount = totalBuyersAmount + parseFloat(feeAmount);
						 /* eslint-enable */	  
						  }
					  }
				  }
			  }


					// Addding CPL
					var titleFeeCPL = 25;
					// eslint-disable-next-line no-alert
					totalBuyersAmount  = totalBuyersAmount + titleFeeCPL;
					
					// Adding endorsments
					var titleEndorsmentFee = 0;
					if(titleFeeParams["state"] == "ID" || titleFeeParams["state"] == "UT"){
						titleEndorsmentFee = 100;
					}else if(titleFeeParams["state"] == "AZ" || titleFeeParams["state"] == "NV" || titleFeeParams["state"] == "NM"){
						titleEndorsmentFee = 200;
					}
					totalBuyersAmount  = totalBuyersAmount + titleEndorsmentFee;
					//eslint-disable-next-line
					totalBuyersAmount = totalBuyersAmount;
					 $('#titleFee').text(formatNumber(totalBuyersAmount.toFixed(2)));
				  }catch(e){
				    console.error(e);
					$("#titlefee-text").hide();
				    $("#mortgage-titlefee-alert").show();
				    $("#mortgage-titlefee-star").show();
					$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
					totalBuyersAmount = 0;
					$('#titleFee').text(formatNumber(totalBuyersAmount));
				}
				}else{
					$("#titlefee-text").hide();
				    $("#mortgage-titlefee-alert").show();
				    $("#mortgage-titlefee-star").show();
					$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
					totalBuyersAmount = 0;
					 $('#titleFee').text(formatNumber(totalBuyersAmount));
				}
					  // setting  third party fees

					  var texServiceFee = 66.00;

					  $("#taxServiceFee").text(texServiceFee.toFixed(2));

					  var titleFee = totalBuyersAmount;

					  var totalThirdPartyFees = texServiceFee + titleFee ;

					  var thirdPartyFeeTemp = 0.0;
					  if($("#thirdPartyTotalFees").text() != "")
						  thirdPartyFeeTemp = parseFloatNumber($("#thirdPartyTotalFees").text());

					  $("#thirdPartyTotalFees").text(formatNumber((thirdPartyFeeTemp + totalThirdPartyFees).toFixed(2)));

					  //setting america fees

					  var loanAmount = parseFloatNumber($("#loanAmount"+titleFeeParams["type"]).val());
					  var loan_amt_range = [{ low: 0, high: 100000.0 }];
					  for(let i=1; loan_amt_range[i-1].high < 3000000; i++)  {
						  loan_amt_range.push({low: loan_amt_range[i-1].high+0.01, high: loan_amt_range[i-1].high+25000});
						}

					   var originalFee=0;
                       for (let i = 0; i < loan_amt_range.length; i++) {
                         if ((loan_amt_range[i].low <= loanAmount) && (loan_amt_range[i].high >= loanAmount)) {
                           originalFee = parseFloat((0.75 / 100) * loan_amt_range[i].high);
                           break;
                         }
                       }
					  $("#originalFee").text(formatNumber(originalFee.toFixed(2)));

					  var processingFee = 595.00;

					  $("#processingFee").text(processingFee.toFixed(2));

					  var americaTotalFees = originalFee + processingFee;

					  $("#americaTotalFees").text(formatNumber(americaTotalFees.toFixed(2)));

					  // calculating totalClosingFee

					  var totalCostingFees = totalThirdPartyFees + americaTotalFees;

					  var totalCostingFeesTemp = 0.0;
					  if($("#totalClosingFee").text() != "")
						  totalCostingFeesTemp = parseFloatNumber($("#totalClosingFee").text());

					  $("#totalClosingFee").text(formatNumber((totalCostingFees + totalCostingFeesTemp).toFixed(2)));

					  setAppraisalFee(titleFeeParams);
					  setNewFee(titleFeeParams);

				}catch(e){
					    console.error(e);
					    $("#mortgage-request-alert").show();
					    $("#mortgage-loader-container").hide();
						$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
				}


	  }
	  
	  
	  function setNewFee(titleFeeParams){
		  $("#loanadjustment-text").slideDown('slow');
		  var t = new Date().getTime();
		  $.get($('#resourceType').val()+".mortgage.html", {titleFeeParams:JSON.stringify(titleFeeParams), t:t},
					function(returnedData){
						if(returnedData != null){
							try{
								var fee = returnedData.fee;
								var isProductAvailable = returnedData.isProductAvailable;
								if(!fee || !isProductAvailable){
									$('#mortgage-loanadjustmentfee-alert').show();
									$('#loanadjustmentfee').text(0);
									$('#loanAdjustmentTotalFees').text(0);
								}else{
									var loan = titleFeeParams.loannAmount;
									
									
									var loanAdj = (loan/100)* (-1) * (fee);
									$('#loanadjustmentfee').text(formatNumber(loanAdj.toFixed(2)));
									$('#loanAdjustmentTotalFees').text(formatNumber(loanAdj.toFixed(2)));
									var totalCostingFeesTemp = 0.0;
									if($("#totalClosingFee").text() != "")
										  totalCostingFeesTemp = parseFloatNumber($("#totalClosingFee").text());
	
									$("#totalClosingFee").text(formatNumber((loanAdj + totalCostingFeesTemp).toFixed(2)));
									if(isProductAvailable == false){
										$('#mortgage-loanadjustmentfee-alert').show();
									}
								}
								
							}catch(e){
								$("#loanadjustment-text").hide();
								console.error(e);
						    }
						}
					    $("#loanadjustment-text").hide();
						
				}).fail(function() {
					$('#mortgage-loanadjustmentfee-alert').show();
					$('#loanadjustmentfee').text(0);
					$('#loanAdjustmentTotalFees').text(0);
				  });
		  }
	  

	  function setAPRFees(loanAmount,otherFees,loanRate,loanYears,titleFeeParams){

		  var monthlyPayment = ( (loanAmount ) * ( loanRate / 12 ) * (Math.pow((1 + loanRate / 12), loanYears) ) ) / ( Math.pow((1 + loanRate / 12), loanYears) - 1);

		  var monthlyPaymentApr = ( (loanAmount + otherFees) * ( loanRate / 12 ) * (Math.pow((1 + loanRate / 12), loanYears) ) ) / ( Math.pow((1 + loanRate / 12), loanYears) - 1);

		  //monthlyPayment += parseFloat($("#mortgageInsurance").text());

		 var totalPayment = monthlyPaymentApr * loanYears;
		 var totalInterest = totalPayment - loanAmount;
		 // eslint-disable-next-line
		 var monthlyInterest = ( totalInterest / loanYears ) + monthlyPaymentApr;

			//$("#estimatedMonthlyPayment").text(formatNumber(monthlyPayment.toFixed(2)));

			$("#monthlyPrincipal").text(formatNumber(monthlyPayment.toFixed(2)));

			var apr = ( 12 * ( 95 * loanYears + 9) * totalInterest ) / (12 * loanYears * (loanYears+1) * (4 * loanAmount + totalInterest)) ;
			apr *= 100;

			$("#apr").text(apr.toFixed(2));

			titleFeeParams["monthlyInterest"]  = monthlyPayment+"";

			populateMortgageMGICInsuranceFees(titleFeeParams);


			/*
			 *  Homeowners insurance would be .0025 times the Purchase price for Purchases and Estimated Value for Refinances divided by 12
				(Est value or purchase price X.0025) / 12  = Monthly Homeowners Insurance amount

				Property tax would be .0075 time the Purchase price for Purchases and Estimated Value for Refinances divided by 12
				(Est value or purchase price X.0075) / 12  = Monthly Property Tax

			 */

			var purchasePrice = parseFloatNumber(titleFeeParams["purchasePrice"]);

			var homeownersInsurance =  ((purchasePrice * 0.0025)/12);
			var propertyTax =  ((purchasePrice * 0.0075)/12);

			$('#homeownersInsurance').val(formatNumber(homeownersInsurance.toFixed(2)));
			$('#propertyTax').val(formatNumber(propertyTax.toFixed(2)));
	  }

	  function calculateMortgagePrincipalAndAPR(titleFeeParams){


		    var loanAmount = parseFloatNumber(titleFeeParams["loannAmount"]);
			var loanTerm = titleFeeParams["loanTerm"];
			var arr = loanTerm.split(" - ");
			var loanYears = parseInt(arr[0].replace(" Year Fixed",""));
			var loanRate = parseFloat(arr[1].replace("$",""));
			loanYears *= 12;
			loanRate /= 100;
			var otherFees = ( parseFloatNumber($("#totalClosingFee").text()) - (parseFloatNumber($("#recordingFee").text()) + parseFloatNumber($("#nevadaTransferTax").text()) ) );


			setAPRFees(loanAmount,otherFees,loanRate,loanYears,titleFeeParams);

	  }

function handleMortgageInsurance(titleFeeParams){

	$("#mortgagePopup").slideDown('slow');

	if(titleFeeParams["type"] == "purchase"){
		$("#mortgage-calculate-purchase").prop('disabled', false);
		$("#mortgage-calculate-purchase").text("Recalculate");
	    $("#mortgage-loader-container").hide();
	}
	if(titleFeeParams["type"] == "refinance"){
	    $("#mortgage-loader-container").hide();
		$("#mortgage-calculate-refinance").prop('disabled', false);
		$("#mortgage-calculate-refinance").text("Recalculate");

	}
    $("#insurance-text").hide();
}

function mortgageInsuranceCommonFunction(titleFeeParams){
	
	var monthlyPayment = parseFloatNumber($("#monthlyPrincipal").text()) +parseFloatNumber($('#homeownersInsurance').val()) + parseFloatNumber($('#propertyTax').val());
    $("#estimatedMonthlyPayment").text(formatNumber(monthlyPayment.toFixed(2)));
	 $("#mortgageInsuranceDollar").text("");
	 $("#mortgageInsurance").text("N/A");
	 $("#mortgage-insurance-alert").show();
    handleMortgageInsurance(titleFeeParams);
    
}


	  function populateMortgageMGICInsuranceFees(titleFeeParams){
		  $("#insurance-text").slideDown('slow');
		  $.get('/bin/mortgage/mgic/insurance', {
				titleFeeParams : JSON.stringify(titleFeeParams)
			}).done(function(returnedData){
				if(returnedData != null){
					try{
					 var status = returnedData.getElementsByTagName('STATUS');
					 var condition = status[0].getAttribute('_Condition');
					 if(condition == 'Error'){
						 mortgageInsuranceCommonFunction(titleFeeParams);
					 }else{
						 var fee = returnedData.getElementsByTagName('MI_RESPONSE');
				         var mortgageInsurance = parseFloat(fee[0].getAttribute('MIInitialPremiumAmount'));
						 var loanAmount = parseFloatNumber(titleFeeParams["loannAmount"]);
						 var purchasePrice = parseFloatNumber(titleFeeParams["purchasePrice"]);
	
						 var ltv = ( loanAmount / purchasePrice ) * 100;
						 $("#mortgageInsuranceDollar").text("$");
	
				         if(mortgageInsurance && ltv >= 80 ){
				        	 $("#mortgageInsurance").text(mortgageInsurance.toFixed(2));
				         }else{
				        	 $("#mortgageInsurance").text("0.00");
				         }
				         
				    	 var monthlyPayment = parseFloatNumber($("#monthlyPrincipal").text())+ parseFloatNumber($("#mortgageInsurance").text()) +parseFloatNumber($('#homeownersInsurance').val()) + parseFloatNumber($('#propertyTax').val());
				         $("#estimatedMonthlyPayment").text(formatNumber(monthlyPayment.toFixed(2)));

				         handleMortgageInsurance(titleFeeParams);					 
					 }
					}catch(e){
						    console.error(e);
						    mortgageInsuranceCommonFunction(titleFeeParams);
						  }
				}else{
					mortgageInsuranceCommonFunction(titleFeeParams);
				}

		}).fail(function() {
			mortgageInsuranceCommonFunction(titleFeeParams);
		});

	  }



	  function purchaseFeeCall(states,counties,cities,possibleStates){

          if($("#nav-purchase").find("#statePurchase").prop('selectedIndex') != 0){
        	  var choosedState = $("#nav-purchase").find("#statePurchase").val();
          }
		if(states[0] != undefined && states.length > 0 ){

			if($("#nav-purchase").find("#statePurchase").prop('selectedIndex') == 0 && !(possibleStates.indexOf(states[0]) >= 0) ){

				$("#purchase-nomatching-zipcode-alert").show();
				$("#mortgage-calculate-purchase").prop('disabled', false);
			    $("#mortgage-loader-container").hide();

	        }else{

	        	if( possibleStates.indexOf(states[0]) >= 0 && ( $("#nav-purchase").find("#statePurchase").prop('selectedIndex') == 0 || choosedState == states[0] ) ){
	      		  var titleFeeParams = {};
	          	  titleFeeParams["state"] = states[0];
	  				titleFeeParams["county"] = counties[0];
	  				titleFeeParams["city"] = cities[0];
	  				titleFeeParams["propertyType"] = $("#nav-purchase").find("#propertyTypePurchase option:selected").text();
	  				titleFeeParams["propertyUsed"] = $("#nav-purchase").find("#propertyUsedPurchase option:selected").text();
	  				titleFeeParams["zip"] = $("#nav-purchase").find("#zipcodePurchase").val();
	  				titleFeeParams["purchasePrice"] = parseFloatNumber($("#nav-purchase").find("#purchasePricePurchase").val()).toString();
	  				titleFeeParams["creditCardScore"] = $("#nav-purchase").find("#creditCardScorePurchase").val();
	  				titleFeeParams["downPayment"] = parseFloatNumber($("#nav-purchase").find("#downPayment").val()).toString();
	  				titleFeeParams["loannAmount"] = parseFloatNumber($("#nav-purchase").find("#loanAmountpurchase").val()).toString();
	  				titleFeeParams["loanTerm"] = $("#nav-purchase").find("#loanTermPurchase option:selected").text();
	  				titleFeeParams["cashout"] = "";
	  				titleFeeParams["type"] = "purchase";
	  				titleFeeParams["t"]= new Date().getTime()+"";

	  				$.get('/bin/mortgage/titlefee', {
	  					titleFeeParams : JSON.stringify(titleFeeParams)
	  						},
	  						function(returnedData){
	  							if(returnedData != null){
	  								try{
	  								populateFees(returnedData,titleFeeParams,false);
	  							    $("#titlefee-text").hide();
	  								}catch(e){
	  									console.error(e);
	  							    }
	  							}else{
	  								populateFees(returnedData,titleFeeParams,true);	  							
	  							}
	  					});
	            }else{
	          	      $("#purchase-state-alert").show();
	    			  $("#mortgage-calculate-purchase").prop('disabled', false);
					  $("#mortgage-loader-container").hide();
	            }

	        }

		}

	  }

	  function refinementFeeCall(states,counties,cities,possibleStates){

          if($("#nav-refinement").find("#stateRefinance").prop('selectedIndex') != 0){
			   var choosedState = $("#nav-refinement").find("#stateRefinance").val();
          }

		if( states[0] != undefined && states.length > 0 ){

			if($("#nav-refinement").find("#stateRefinance").prop('selectedIndex') == 0 && !(possibleStates.indexOf(states[0]) >= 0 )){

				$("#refinance-nomatching-zipcode-alert").show();
				$("#mortgage-loader-refinance").hide();
			    $("#mortgage-loader-container").hide();
				$("#mortgage-calculate-refinance").prop('disabled', false);

	        }else{

	        	if( possibleStates.indexOf(states[0]) >= 0  && ( $("#nav-refinement").find("#stateRefinance").prop('selectedIndex') == 0 || choosedState == states[0] ) ){
	         		  var titleFeeParams = {};
	           	  titleFeeParams["state"] = states[0];
	       		  titleFeeParams["county"] = counties[0];
	       		  titleFeeParams["city"] = cities[0];
	       		  titleFeeParams["zip"] = $("#nav-refinement").find("#zipcodeRefinement").val();
	       		  titleFeeParams["propertyType"] = $("#nav-refinement").find("#propertyTypeRefinement option:selected").text();
	       		  titleFeeParams["propertyUsed"] = $("#nav-refinement").find("#propertyUsedRefinement option:selected").text();
	       		  titleFeeParams["creditCardScore"] = $("#nav-refinement").find("#creditCardScoreRefinance").val();
	       		  titleFeeParams["purchasePrice"] = parseFloatNumber($("#nav-refinement").find("#purchasePriceRefinement").val()).toString();
	       		  titleFeeParams["loannAmount"] = parseFloatNumber($("#nav-refinement").find("#loanAmountrefinance").val()).toString();
	       		  titleFeeParams["loanTerm"] = $("#nav-refinement").find("#loanTermRefinement option:selected").text();
	       		  titleFeeParams["cashout"] = $("#nav-refinement").find("#isCashOut")[0].checked+"";
	       		  titleFeeParams["type"] = "refinance";
	       		  titleFeeParams["t"]= new Date().getTime()+"";

	       		  $.get('/bin/mortgage/titlefee', {
	       			  titleFeeParams : JSON.stringify(titleFeeParams)
	       		  },
	       		  function(returnedData){
	       				if(returnedData != null){
	       					try{
	       					populateFees(returnedData,titleFeeParams,false);
							    $("#titlefee-text").hide();
	       					}catch(e){
									console.error(e);
									  }
							}else{
  								populateFees(returnedData,titleFeeParams,true);
							}
	       		  });
	       	       }else{
	       	        	$("#refinance-state-alert").show();
						    $("#mortgage-loader-container").hide();
	       					$("#mortgage-calculate-refinance").prop('disabled', false);
	       			   }

	        }

		}

	  }

	  function validatePurchaseFields(){
		  var ispropertyTypePurchasePresent = false;
		  if( $("#propertyTypePurchase").prop('selectedIndex') != 0  ){
			  ispropertyTypePurchasePresent = true;
		  }else{
			  $("#propertyTypePurchase-purchase-alert").show();
		  }
		  var iscreditCardScorePresent = false;
		  if( $("#nav-purchase #creditCardScorePurchases").prop('selectedIndex') != 0  ){
			  iscreditCardScorePresent = true;
		  }else{
			  $("#creditCardScore-purchase-alert").show();
		  }
		  var isdownPaymentPresent = false;
		  if( $("#downPayment").val() != "" ){
			  isdownPaymentPresent = true;
		  }else{
			  $("#down-payment-purchase-alert").show();
		  }
		  var ispropertyUsedPurchasePresent = false;
		  if( $("#propertyUsedPurchase").prop('selectedIndex') != 0  ){
			  ispropertyUsedPurchasePresent = true;
		  }else{
			  $("#propertyUsedPurchase-purchase-alert").show();
		  }
		  var isZipcodePresent = false;
		  if( $("#zipcodePurchase").val() != "" ){
			  isZipcodePresent = true;
		  }else{
			  $("#zipcode-purchase-alert").show();
		  }
		  var isEstimatedValuePresent = false;
		  if( $("#purchasePricePurchase").val() != "" ){
			  isEstimatedValuePresent = true;
		  }else{
			  $("#estimated-value-purchase-alert").show();
		  }
		  var isLoanAmountPresent = false;
		  if( $("#loanAmountpurchase").val() != "" ){
			  isLoanAmountPresent = true;
		  }else{
			  $("#loan-amount-purchase-alert").show();
		  }
		  var isLoanTermPresent = false;
		  if( $("#loanTermPurchase").prop('selectedIndex') != 0 ){
			  isLoanTermPresent = true;
		  }else{
			  $("#loan-term-purchase-alert").show();
		  }
		  var isStatePresent = false;
          var duplicateZipcodes = ["84536","86044"];
  	  	  var zipcode = $("#nav-purchase").find("#zipcodePurchase").val();
		  if( ( !(duplicateZipcodes.indexOf(zipcode) >= 0 )) || ( duplicateZipcodes.indexOf(zipcode) >= 0 && $("#nav-purchase").find("#statePurchase").prop('selectedIndex') != 0 )  ){
			  isStatePresent = true;
		  }else{
        	  $("#purchase-state-empty-alert").show();
			  $("#mortgage-loader-container").hide();
   			  $("#mortgage-calculate-purchase").prop('disabled', false);
          }
		  return (isdownPaymentPresent && iscreditCardScorePresent && ispropertyUsedPurchasePresent && isZipcodePresent
				  && isEstimatedValuePresent && isLoanAmountPresent && isLoanTermPresent && isStatePresent && ispropertyTypePurchasePresent && checkPurchaseLoanAmountMaxVal() && checkPurchaseEstimateAmountMaxVal());
	  }

	  function validateRefinanceFields(){
		  var ispropertyTypeRefinementPresent = false;
		  if( $("#propertyTypeRefinement").prop('selectedIndex') != 0 ){
			  ispropertyTypeRefinementPresent = true;
		  }else{
			  $("#propertyTypePurchase-refinance-alert").show();
		  }
		  var ispropertyUsedRefinementPresent = false;
		  if( $("#propertyUsedRefinement").prop('selectedIndex') != 0  ){
			  ispropertyUsedRefinementPresent = true;
		  }else{
			  $("#propertyUsedPurchase-refinance-alert").show();
		  }
		  var iscreditCardScorePresent = false;
		  if( $("#nav-refinement #creditCardScoreRefinance").prop('selectedIndex') != 0  ){
			  iscreditCardScorePresent = true;
		  }else{
			  $("#creditCardScore-refinance-alert").show();
		  }
		  var isZipcodePresent = false;
		  if( $("#zipcodeRefinement").val() != "" ){
			  isZipcodePresent = true;
		  }else{
			  $("#zipcode-refinance-alert").show();
		  }
		  var isEstimatedValuePresent = false;
		  if( $("#purchasePriceRefinement").val() != "" ){
			  isEstimatedValuePresent = true;
		  }else{
			  $("#estimated-value-refinance-alert").show();
		  }
		  var isLoanAmountPresent = false;
		  if( $("#loanAmountrefinance").val() != "" ){
			  isLoanAmountPresent = true;
		  }else{
			  $("#loan-amount-refinance-alert").show();
		  }
		  var isLoanTermPresent = false;
		  if( $("#loanTermRefinement").prop('selectedIndex') != 0 ){
			  isLoanTermPresent = true;
		  }else{
			  $("#loan-term-refinance-alert").show();
		  }
		  var isStatePresent = false;
          var duplicateZipcodes = ["84536","86044"];
  	  	  var zipcode = $("#nav-refinement").find("#zipcodeRefinement").val();
		  if( ( !(duplicateZipcodes.indexOf(zipcode) >= 0 )) || ( duplicateZipcodes.indexOf(zipcode) >= 0 && $("#nav-refinement").find("#stateRefinance").prop('selectedIndex') != 0 )  ){
			  isStatePresent = true;
		  }else{
        	  $("#refinance-state-empty-alert").show();
			  $("#mortgage-loader-container").hide();
   			  $("#mortgage-calculate-refinance").prop('disabled', false);
          }
		  return (ispropertyTypeRefinementPresent && ispropertyUsedRefinementPresent && iscreditCardScorePresent && isZipcodePresent &&
				  isEstimatedValuePresent && isLoanAmountPresent && isLoanTermPresent && isStatePresent && checkRefinancLoanAmountMaxVal() && checkRefinanceEstimateAmountMaxVal());
	  }


	  $(".mortgage-loans #mortgage-calculate-purchase").on('click',function(){
		  try{
				$('#mortgage-loader-container img').unbind('mouseenter mouseleave mouseout mouseover');
			    resetRates();
			    $("#titlefee-text").hide();
			    $("#insurance-text").hide();
			    $("#loanadjustment-text").hide();
			    $("#mortgage-titlefee-star").hide();
				$("#mortgage-titlefee-alert").hide();
				$("#mortgage-loanadjustmentfee-alert").hide();
				$("#mortgage-insurance-alert").hide();
			    $("#mortgage-request-alert").hide();
				$("#mortgage-request-timeout-alert").hide();
				$("#purchase-state-alert").hide();
				$("#purchase-state-empty-alert").hide();
				$("#loan-term-purchase-alert").hide();
			    $("#zipcode-purchase-alert").hide();
			    $("#loan-amount-purchase-alert").hide();
			    $("#estimated-value-purchase-alert").hide();
		    	$("#purchase-invalid-zipcode-alert").hide();
				$("#purchase-nomatching-zipcode-alert").hide();
				$("#propertyTypePurchase-purchase-alert").hide();
			    $("#creditCardScore-purchase-alert").hide();
			    $("#propertyUsedPurchase-purchase-alert").hide();
			    $("#down-payment-purchase-alert").hide();
			    $('#send-email-success').hide();
			    $("#mortgage-loader-container").slideDown('slow');
				$("#mortgage-calculate-purchase").prop('disabled', true);
				if( validatePurchaseFields() ){
		        var cities = [],counties = [],states = [];
		        var possibleStates = ["AZ","UT","ID","NV","NM"];
		        var duplicateZipcodes = ["84536","86044"];
		  	  	var zipcode = $("#nav-purchase").find("#zipcodePurchase").val();
				if(duplicateZipcodes.indexOf(zipcode) >= 0){
					 var choosedState = $("#nav-purchase").find("#statePurchase").val();
			          if($("#nav-purchase").find("#statePurchase").prop('selectedIndex') != 0){
			        	  states[0] = choosedState;
			        	  if( states[0] == "AZ" && zipcode == "84536" ){
			        		  counties[0] = "Maricopa";
			        		  cities[0] = "Tempe";
			        	  }else if( states[0] == "UT" && zipcode == "84536" ){
			        		  counties[0] = "San Juan";
			        		  cities[0] = "Monument Valley";
				          }else if( states[0] == "AZ" && zipcode == "86044" ){
			        		  counties[0] = "Maricopa";
			        		  cities[0] = "Tempe";
						  }else if( states[0] == "UT" && zipcode == "86044" ){
			        		  counties[0] = "Maricopa";
			        		  cities[0] = "Tempe";
						  }
			        	  purchaseFeeCall(states,counties,cities,possibleStates);
			          }else{
			        	  $("#purchase-state-empty-alert").show();
			  			  $("#mortgage-calculate-purchase").prop('disabled', false);
						  $("#mortgage-loader-container").hide();
			          }
				}else{
				 $("#titlefee-text").slideDown('slow');
	  			 commonFunctions();
				 $.get('/bin/mortgage/zipcode', {
					  zipcode:$("#nav-purchase").find("#zipcodePurchase").val(),
					  "t":new Date().getTime()+""
					},
					function(returnedData){
						try{
							if(returnedData != null  && returnedData.state != null && returnedData.state != undefined){
								
				                      states.push(returnedData.state);
				                      counties.push(returnedData.county);
				                  	  cities.push(returnedData.city);
								      purchaseFeeCall(states,counties,cities,possibleStates);
	
						
							  }else{
							    	$("#purchase-invalid-zipcode-alert").show();
								    $("#mortgage-loader-container").hide();
					 				$("#mortgage-calculate-purchase").prop('disabled', false);
					            }
						}catch(e){
						    console.error(e);
						    $("#mortgage-request-alert").show();
							$("#mortgage-loader-container").hide();
							// eslint-disable-next-line
							$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
						  }	
					});
			
				 	}
				}else{
				    $("#mortgage-loader-container").hide();
					$("#mortgage-calculate-purchase").prop('disabled', false);
				}
		  }catch(e){
			    console.error(e);
			    $("#mortgage-request-alert").show();
			    $("#mortgage-loader-container").hide();
				$("#mortgage-calculate-purchase").prop('disabled', false);

			  }
	  });

	  $(".mortgage-loans #mortgage-calculate-refinance").on('click',function(){
		  try{
			  $('#mortgage-loader-container img').unbind('mouseenter mouseleave mouseout mouseover');
			  resetRates();
			  $("#titlefee-text").hide();
			  $("#insurance-text").hide();
			  $("#loanadjustment-text").hide();
			  $("#mortgage-titlefee-star").hide();
			  $("#mortgage-titlefee-alert").hide();
			  $("#mortgage-loanadjustmentfee-alert").hide();
			  $("#mortgage-insurance-alert").hide();
			  $("#mortgage-request-alert").hide();
			  $("#mortgage-request-timeout-alert").hide();
			  $("#refinance-state-alert").hide();
			  $("#refinance-state-empty-alert").hide();
			  $("#estimated-value-refinance-alert").hide();
			  $("#loan-amount-refinance-alert").hide();
			  $("#loan-term-refinance-alert").hide();
			  $("#zipcode-refinance-alert").hide();
	    	  $("#refinance-invalid-zipcode-alert").hide();
			  $("#refinance-nomatching-zipcode-alert").hide();
			  $("#propertyTypePurchase-refinance-alert").hide();
			  $("#propertyUsedPurchase-refinance-alert").hide();
			  $("#creditCardScore-refinance-alert").hide();
			  $('#send-email-success').hide();
			  $("#mortgage-loader-container").slideDown('slow');
			  $("#mortgage-calculate-refinance").prop('disabled', true);
				if( validateRefinanceFields() ){
				 var cities = [],counties = [],states = [];
			        var possibleStates = ["AZ","UT","ID","NV"];
			        var duplicateZipcodes = ["84536","86044"];
			  	  	var zipcode = $("#nav-refinement").find("#zipcodeRefinement").val();
					if(duplicateZipcodes.indexOf(zipcode) >= 0){
						 var choosedState = $("#nav-refinement").find("#stateRefinance").val();
				          if($("#nav-refinement").find("#stateRefinance").prop('selectedIndex') != 0){
				        	  states[0] = choosedState;
				        	  if( states[0] == "AZ" && zipcode == "84536" ){
				        		  counties[0] = "Navajo";
				        		  cities[0] = "Salt Lake";
				        	  }else if( states[0] == "UT" && zipcode == "84536" ){
				        		  counties[0] = "San Juan";
				        		  cities[0] = "Salt Lake";
					          }else if( states[0] == "AZ" && zipcode == "86044" ){
				        		  counties[0] = "Coconino";
				        		  cities[0] = "Tonalea";
							  }else if( states[0] == "UT" && zipcode == "86044" ){
				        		  counties[0] = "San Juan";
				        		  cities[0] = "Tonalea";
	                      }
						  refinementFeeCall(states,counties,cities,possibleStates);
	                    }
					}else{
						$("#titlefee-text").slideDown('slow');
		  				commonFunctions();
						 $.get('/bin/mortgage/zipcode', {
							  zipcode:$("#nav-refinement").find("#zipcodeRefinement").val(),
							  "t":new Date().getTime()+""
							},
							function(returnedData){
								try{
									if(returnedData != null && returnedData.state != null && returnedData.state != undefined){
										
						                      states.push(returnedData.state);
						                      counties.push(returnedData.county);
						                  	  cities.push(returnedData.city);
											  refinementFeeCall(states,counties,cities,possibleStates);
			
								
									  }else{
									    	$("#purchase-invalid-zipcode-alert").show();
										    $("#mortgage-loader-container").hide();
							 				$("#mortgage-calculate-purchase").prop('disabled', false);
							            }
								}catch(e){
									console.error(e);
									// eslint-disable-next-line
								    $("#mortgage-loader-"+titleFeeParams["type"]).hide();
									$("#mortgage-loader-container").hide();
									// eslint-disable-next-line
									$("#mortgage-calculate-"+titleFeeParams["type"]).prop('disabled', false);
								  }	
							});				
					}
				}else{
				    $("#mortgage-loader-container").hide();
					$("#mortgage-calculate-refinance").prop('disabled', false);
				}
		  }catch(e){
			    console.error(e);
			    $("#mortgage-request-alert").show();
			    $("#mortgage-loader-container").hide();
				$("#mortgage-calculate-refinance").prop('disabled', false);
			  }
		  });


	 /* $("#printEstimate").on('click',function(){
		 // $.print("#mortgagePopup .modal-body");
		  
		  var combined = $('#mortgagePopup').clone(true);
		  combined.append($('.mortgage-loan').clone(true)).print();
		 
		 
	  });*/


	  function resetRates() {
		    $("#americaTotalFees").text("");
		    $("#originalFee").text("");
		    $("#thirdPartyTotalFees").text("");
		    $("#loanAdjustmentTotalFees").text("");
		    $("#loanadjustmentfee").text("");
		    $("#appraisalFee").text("");
		    $("#titleFee").text("");
		    $("#recordingFee").text("");
		    $("#governmentotalFees").text("");
		    $("#governmentFee").text("");
		    $("#totalClosingFee").text("");
		    $("#monthlyPrincipal").text("");
		    $("#mortgageInsurance").text("");
		    $("#apr").text("");
		    $("#estimatedMonthlyPayment").text("");
		    $('#nevadaTransferTax').text("0");
	  }
	  
	  function checkPurchaseLoanAmountMaxVal(){	
		  var loanAmount = parseFloatNumber($("#loanAmountpurchase").val());
		  if(loanAmount > 3000000){
			  $("#purchaseLoanAmountMaxAlert").show();
			  return false;
		  }else{
			  $("#purchaseLoanAmountMaxAlert").hide();
			  return true;
		  }
	  }
	  function checkPurchaseEstimateAmountMaxVal(){		  
		  var loanAmount = parseFloatNumber($("#purchasePricePurchase").val());
		  if(loanAmount > 4250000){
			  $("#purchaseEstimateAmountMaxAlert").show();
			  return false;
		  }else{
			  $("#purchaseEstimateAmountMaxAlert").hide();
			  return true;
		  }
	  }
	  function checkRefinancLoanAmountMaxVal(){		  
		  var loanAmount = parseFloatNumber($("#loanAmountrefinance").val());
		  if(loanAmount > 3000000){
			  $("#refinanceLoanAmountMaxAlert").show();
			  return false;
		  }else{
			  $("#refinanceLoanAmountMaxAlert").hide();
			  return true;
		  }
	  }
	  function checkRefinanceEstimateAmountMaxVal(){		  
		  var loanAmount = parseFloatNumber($("#purchasePriceRefinement").val());
		  if(loanAmount > 4250000){
			  $("#refinanceEstimateAmountMaxAlert").show();
			  return false;
		  }else{
			  $("#refinanceEstimateAmountMaxAlert").hide();
			  return true;
		  }
	  }

	  $("#loanAmountpurchase").keyup(function() {
		
		  checkPurchaseLoanAmountMaxVal();
		 
	  });
	  
	  $("#loanAmountrefinance").keyup(function() {
		  
		  checkRefinancLoanAmountMaxVal();
		  
	  });
	  
	  $("#purchasePriceRefinement").keyup(function() {
		  
		  checkRefinanceEstimateAmountMaxVal();
		  
	  });


		function calculateTotalAfterInput(propertyTax,homeownersInsurance){			 
			
		   	 var monthlyPrincipal =	$('#monthlyPrincipal').text(),
		   	  mortgageInsurance = $('#mortgageInsurance').text();



			  if(!homeownersInsurance){
				  homeownersInsurance = 0.00;
			  }

			  if(!propertyTax){
				  propertyTax = 0.00;
			  }


			  if(!monthlyPrincipal){
				  monthlyPrincipal = 0.00;
			  }
			  if( !mortgageInsurance || isNaN(mortgageInsurance) ){
				  mortgageInsurance = 0.00;
			  }

			  monthlyPrincipal =  parseFloatNumber(monthlyPrincipal);
			  mortgageInsurance = parseFloatNumber(mortgageInsurance);
			  homeownersInsurance = parseFloatNumber(homeownersInsurance);
			  propertyTax = parseFloatNumber(propertyTax);

			  $('#estimatedMonthlyPayment').text(formatNumber((mortgageInsurance+ homeownersInsurance + propertyTax + monthlyPrincipal).toFixed(2)));
		}

	  function setLoanAmount(downPayment, purchasePrice){

		  if(downPayment.length > 0){

			   downPayment = parseFloat(downPayment);
		   }

		   if(purchasePrice.length > 0){

			   purchasePrice = parseFloat(purchasePrice);
		   }

		   if(purchasePrice >= downPayment){
			   var loanPrice = (purchasePrice - downPayment).toFixed(2);
			   loanPrice = formatNumber(loanPrice.slice(0, -3)) + loanPrice.slice((loanPrice.length-3), loanPrice.length);
			   $("#loanAmountpurchase").val(loanPrice);
		   }
	  }

	  function commonFunctions(){

		  $('#mortgagePopup').hide();


	  }
	  
	  	$("#isCashOut").click(function(){
	  	    $("#nav-refinement .slider").toggleClass("in");
	  	    $("#nav-refinement .slider").text($("#nav-refinement .slider").text() == 'Yes' ? 'No' : 'Yes');
	  	  });

});
/*eslint-enable*/
$(document).ready(function(){
	
	$('#printEstimate').on('click', function() {
		
       	html2canvas($(".mortgage-loader").parent().parent()[0], {
           	useCORS: true,
            allowTaint: true,
            logging: true,
            onrendered: function(canvas) {
                saveAs(canvas, 'AmericaFirst-Mortgage-Quote.png');
            }
        });

	});


    function saveAs(canvas, filename) {
		var uri = canvas.toDataURL();
    	var link = document.createElement('a');

    	if (!canvas.msToBlob) {
     	 	link.href = uri;
      		link.download = filename;

     		 //Firefox requires the link to be in the body
     		 document.body.appendChild(link);

      		//simulate click
      		link.click();

      		//remove the link when done
      		document.body.removeChild(link);

    	} else {
      		var blob = canvas.msToBlob();
	    	window.navigator.msSaveBlob(blob, 'AmericaFirst-Mortgage-Quote.png');
   		}
  	}
});



$(function() {
    //trigger the modal if the url contains the modal url
    /*eslint-disable*/
    var links = $('a');
    var url = window.location.href;
    links.each( function() {
        link = $(this);
        if (link.attr('data-toggle') == 'modal') {
            var id = link.attr('data-target');
            if (url.endsWith(id)) {
                link.trigger('click');
                  /*eslint-enable*/
            }
        }
    });
});





/*
    geoxml3.js

    Renders KML on the Google Maps JavaScript API Version 3
    http://code.google.com/p/geoxml3/

   Copyright 2010 Sterling Udell, Larry Ross

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/
/**
 * A MultiGeometry object that will allow multiple polylines in a MultiGeometry
 * containing LineStrings to be treated as a single object
 *
 * @param {MutiGeometryOptions} anonymous object.  Available properties:
 * map: The map on which to attach the MultiGeometry
 * paths: the individual polylines
 * polylineOptions: options to use when constructing all the polylines
 *
 * @constructor
 */
// only if Google Maps API included
if (!!window.google && !! google.maps) {
  /*eslint-disable-next-line*/
  function MultiGeometry(multiGeometryOptions) {
   function createPolyline(polylineOptions, mg) {
     var polyline = new google.maps.Polyline(polylineOptions);
     google.maps.event.addListener(polyline,'click', function(evt) { google.maps.event.trigger(mg,'click',evt);});
     google.maps.event.addListener(polyline,'dblclick', function(evt) { google.maps.event.trigger(mg, 'dblclick', evt);});
     google.maps.event.addListener(polyline,'mousedown', function(evt) { google.maps.event.trigger(mg, 'mousedown', evt);});
     google.maps.event.addListener(polyline,'mousemove', function(evt) { google.maps.event.trigger(mg, 'mousemove', evt);});
     google.maps.event.addListener(polyline,'mouseout', function(evt) { google.maps.event.trigger(mg, 'mouseout', evt);});
     google.maps.event.addListener(polyline,'mouseover', function(evt) { google.maps.event.trigger(mg, 'mouseover', evt);});
     google.maps.event.addListener(polyline,'mouseup', function(evt) { google.maps.event.trigger(mg, 'mouseup', evt);});
     google.maps.event.addListener(polyline,'rightclick', function(evt) { google.maps.event.trigger(mg, 'rightclick', evt);});
     return polyline;
   }
   this.setValues(multiGeometryOptions);
   this.polylines = [];

   for (i=0; i<this.paths.length;i++) {
     var polylineOptions = multiGeometryOptions;
     polylineOptions.path = this.paths[i];
     var polyline = createPolyline(polylineOptions,this);
     // Bind the polyline properties to the MultiGeometry properties
     this.polylines.push(polyline);
   }
}
MultiGeometry.prototype = new google.maps.MVCObject();
MultiGeometry.prototype.changed = function(key) {
    // alert(key+" changed");
    if (this.polylines) {
	for (var i=0; i<this.polylines.length; i++) {
	    this.polylines[i].set(key,this.get(key));
	}
    }
};
MultiGeometry.prototype.setMap = function(map) { this.set('map',map); };
MultiGeometry.prototype.getMap = function() { return this.get('map'); };
}

// Extend the global String object with a method to remove leading and trailing whitespace
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// Declare namespace
/*eslint-disable-next-line*/
geoXML3 = window.geoXML3 || {instances: []};

// Constructor for the root KML parser object
/*eslint-disable-next-line*/
geoXML3.parser = function (options) {
  // Inherit from Google MVC Object to include event handling
  google.maps.MVCObject.call(this);

  // Private variables
  /*eslint-disable-next-line*/
  var parserOptions = geoXML3.combineOptions(options, {
    singleInfoWindow: false,
    processStyles: true,
    zoom: true
  });
  var docs = []; // Individual KML documents
  /*eslint-disable-next-line*/
  var lastPlacemark;
  var parserName;
  if (typeof parserOptions.suppressInfoWindows == "undefined") parserOptions.suppressInfoWindows = false;
  if (!parserOptions.infoWindow && parserOptions.singleInfoWindow && !!window.google && !!google.maps)
    parserOptions.infoWindow = new google.maps.InfoWindow();
/*eslint-disable-next-line*/
  geoXML3.xhrTimeout = 60000;
  /*eslint-disable-next-line*/
  if (!!parserOptions.xhrTimeout) geoXML3.xhrTimeout = parserOptions.xhrTimeout;

  var parseKmlString = function (kmlString, docSet) {
    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: 1,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    /*eslint-disable*/
    thisDoc = new Object();
    thisDoc.internals = internals;
    internals.docSet.push(thisDoc);
    render(geoXML3.xmlParse(kmlString),thisDoc);
  };
/*eslint-enable*/
  var parse = function (urls, docSet) {
    // Process one or more KML documents
    if (!parserName) {
      /*eslint-disable-next-line*/
      parserName = 'geoXML3.instances[' + (geoXML3.instances.push(this) - 1) + ']';
    }

    if (typeof urls === 'string') {
      // Single KML document
      urls = [urls];
    }

    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: urls.length,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    var thisDoc, j;
    for (var i = 0; i < urls.length; i++) {
      var baseUrl = urls[i].split('?')[0];
      for (j = 0; j < docs.length; j++) {
        if (baseUrl === docs[j].baseUrl) {
          // Reloading an existing document
          thisDoc = docs[j];
          thisDoc.reload    = true;
          break;
        }
      }
      if (j >= docs.length) {
        thisDoc = new Object();
        thisDoc.baseUrl = baseUrl;
        internals.docSet.push(thisDoc);
      }
      thisDoc.url       = urls[i];
      thisDoc.internals = internals;
      var url = thisDoc.url;
      if (parserOptions.proxy) url = parserOptions.proxy+thisDoc.url;
      fetchDoc(url, thisDoc);
    }
  };

  function fetchDoc(url, doc) {
    /*eslint-disable-next-line*/
      geoXML3.fetchXML(url, function (responseXML) { render(responseXML, doc);});
  }

  var hideDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Hide the map objects associated with a document
    var i;
    /*eslint-disable*/
    if (!!window.google && !!google.maps) {
      if (!!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          if(!!doc.markers[i].infoWindow) doc.markers[i].infoWindow.close();
          doc.markers[i].setVisible(false);
        }
      }
      if (!!doc.ggroundoverlays) {
        for (i = 0; i < doc.ggroundoverlays.length; i++) {
          doc.ggroundoverlays[i].setOpacity(0);
        }
      }
      if (!!doc.gpolylines) {
        for (i=0;i<doc.gpolylines.length;i++) {
          if(!!doc.gpolylines[i].infoWindow) doc.gpolylines[i].infoWindow.close();
          doc.gpolylines[i].setMap(null);
        }
      }
      if (!!doc.gpolygons) {
        for (i=0;i<doc.gpolygons.length;i++) {
          if(!!doc.gpolygons[i].infoWindow) doc.gpolygons[i].infoWindow.close();
         doc.gpolygons[i].setMap(null);
        }
      }
    }
  };

  var showDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Show the map objects associated with a document
    var i;
    if (!!window.google && !!google.maps) {
      if (!!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          doc.markers[i].setVisible(true);
        }
      }
      if (!!doc.ggroundoverlays) {
        for (i = 0; i < doc.ggroundoverlays.length; i++) {
          doc.ggroundoverlays[i].setOpacity(doc.ggroundoverlays[i].percentOpacity_);
        }
      }
      if (!!doc.gpolylines) {
        for (i=0;i<doc.gpolylines.length;i++) {
          doc.gpolylines[i].setMap(parserOptions.map);
        }
      }
      if (!!doc.gpolygons) {
        for (i=0;i<doc.gpolygons.length;i++) {
          doc.gpolygons[i].setMap(parserOptions.map);
        }
      }
    }
  };
  /*eslint-enable*/
var defaultStyle = {
  color: "ff000000", // black
  colorMode: "normal",
  width: 1,
  fill: true,
  outline: true,
  fillcolor: "3fff0000" // blue
};

function processStyle(thisNode, styles, styleID) {
    /*eslint-disable-next-line*/
      var nodeValue  = geoXML3.nodeValue;
      styles[styleID] = styles[styleID] || clone(defaultStyle);
      var styleNodes = thisNode.getElementsByTagName('IconStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].scale = parseFloat(nodeValue(styleNodes[0].getElementsByTagName('scale')[0]));
      }
      if (isNaN(styles[styleID].scale)) styles[styleID].scale = 1.0;
      styleNodes = thisNode.getElementsByTagName('Icon');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].href = nodeValue(styleNodes[0].getElementsByTagName('href')[0]);
      }
      styleNodes = thisNode.getElementsByTagName('LineStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].color = nodeValue(styleNodes[0].getElementsByTagName('color')[0],defaultStyle.color);
        styles[styleID].colorMode = nodeValue(styleNodes[0].getElementsByTagName('colorMode')[0], defaultStyle.colorMode);
        styles[styleID].width = nodeValue(styleNodes[0].getElementsByTagName('width')[0],defaultStyle.width);
      }
      styleNodes = thisNode.getElementsByTagName('PolyStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].outline   = getBooleanValue(styleNodes[0].getElementsByTagName('outline')[0],defaultStyle.outline);
        styles[styleID].fill      = getBooleanValue(styleNodes[0].getElementsByTagName('fill')[0],defaultStyle.fill);
        styles[styleID].colorMode = nodeValue(styleNodes[0].getElementsByTagName('colorMode')[0], defaultStyle.colorMode);
        styles[styleID].fillcolor = nodeValue(styleNodes[0].getElementsByTagName('color')[0],defaultStyle.fillcolor);
      }
      return styles[styleID];
}

// from http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
  function clone(obj){
      if(obj == null || typeof(obj) != 'object') return obj;
      var temp = new obj.constructor();
      for(var key in obj) temp[key] = clone(obj[key]);
      return temp;
  }

function processStyleMap(thisNode, styles, styleID) {
    /*eslint-disable-next-line*/
  var nodeValue  = geoXML3.nodeValue;
  var pairs = thisNode.getElementsByTagName('Pair');
  var map = new Object();
  // add each key to the map
  for (var pr=0;pr<pairs.length;pr++) {
    var pairkey = nodeValue(pairs[pr].getElementsByTagName('key')[0]);
    var pairstyle = nodeValue(pairs[pr].getElementsByTagName('Style')[0]);
    var pairstyleurl = nodeValue(pairs[pr].getElementsByTagName('styleUrl')[0]);
     /*eslint-disable-next-line*/
    if (!!pairstyle) {
      processStyle(pairstyle, map[pairkey], styleID);
        /*eslint-disable-next-line*/
    } else if (!!pairstyleurl && !!styles[pairstyleurl]) {
      map[pairkey] = clone(styles[pairstyleurl]);
    }
  }
   /*eslint-disable-next-line*/
  if (!!map["normal"]) {
    styles[styleID] = clone(map["normal"]);
  } else {
    styles[styleID] =  clone(defaultStyle);
  }
    /*eslint-disable-next-line*/
  if (!!map["highlight"] && !!parserOptions.processStyles) {
    processStyleID(map["highlight"]);
  }
  styles[styleID].map = clone(map);
}

function getBooleanValue(node) {
    /*eslint-disable-next-line*/
  var nodeContents = geoXML3.nodeValue(node);
  if (!nodeContents) return true;
  if (nodeContents) nodeContents = parseInt(nodeContents);
  if (isNaN(nodeContents)) return true;
  if (nodeContents == 0) return false;
  else return true;
}

function processPlacemarkCoords(node, tag) {
   var parent = node.getElementsByTagName(tag);
var coordListA = [];
  for (var i=0; i<parent.length; i++) {
  var coordNodes = parent[i].getElementsByTagName('coordinates');
  if (!coordNodes) {
    if (coordListA.length > 0) {
      break;
    } else {
      return [{coordinates: []}];
    }
  }

  for (var j=0; j<coordNodes.length;j++) {
    /*eslint-disable-next-line*/
    var coords = geoXML3.nodeValue(coordNodes[j]).trim();
    coords = coords.replace(/,\s+/g, ',');
    var path = coords.split(/\s+/g);
    var pathLength = path.length;
    var coordList = [];
    for (var k = 0; k < pathLength; k++) {
      coords = path[k].split(',');
      if (!isNaN(coords[0]) && !isNaN(coords[1])) {
        coordList.push({
          lat: parseFloat(coords[1]),
          lng: parseFloat(coords[0]),
          alt: parseFloat(coords[2])
        });
      }
    }
    coordListA.push({coordinates: coordList});
  }
}
  return coordListA;
}

  var render = function (responseXML, doc) {
    // Callback for retrieving a KML document: parse the KML and display it on the map
    
    if (!responseXML || responseXML == "failed parse") {
      // Error retrieving the data
      /*eslint-disable-next-line*/
      geoXML3.log('Unable to retrieve ' + doc.url);
      if (parserOptions.failedParse) {
        parserOptions.failedParse(doc);
      }
    } else if (!doc) {
      throw 'geoXML3 internal error: render called with null document';
    } else { //no errors
      var i;
      var styles = {};
      doc.placemarks     = [];
      doc.groundoverlays = [];
      doc.ggroundoverlays = [];
      doc.networkLinks   = [];
      doc.gpolygons      = [];
      doc.gpolylines     = [];
      doc.markers        = [];

    // Declare some helper functions in local scope for better performance
    /*eslint-disable-next-line*/
    var nodeValue  = geoXML3.nodeValue;

    // Parse styles
    /*eslint-disable*/
    var styleID, styleNodes;
    nodes = responseXML.getElementsByTagName('Style');
    nodeCount = nodes.length;
    for (i = 0; i < nodeCount; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
        processStyle(thisNode, styles, styleID);
      }
    }
    // rudamentary support for StyleMap
    // use "normal" mapping only
    nodes = responseXML.getElementsByTagName('StyleMap');
    for (i = 0; i < nodes.length; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
	processStyleMap(thisNode, styles, styleID);
      }
    }
    doc.styles = styles;
      if (!!parserOptions.processStyles || !parserOptions.createMarker) {
        // Convert parsed styles into GMaps equivalents
        processStyles(doc);
      }

      // Parse placemarks
      if (!!doc.reload && !!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          doc.markers[i].active = false;
        }
      }
      var placemark, node, coords, path, marker, poly;
      var placemark, coords, path, pathLength, marker, polygonNodes, coordList;
      var placemarkNodes = responseXML.getElementsByTagName('Placemark');
      for (pm = 0; pm < placemarkNodes.length; pm++) {
        // Init the placemark object
        node = placemarkNodes[pm];
        placemark = {
          name:  geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          styleUrl: geoXML3.nodeValue(node.getElementsByTagName('styleUrl')[0]),
          id: node.getAttribute('id')
        };
        /*eslint-enable*/
        placemark.style = doc.styles[placemark.styleUrl] || clone(defaultStyle);
        // inline style overrides shared style
        var inlineStyles = node.getElementsByTagName('Style');
        if (inlineStyles && (inlineStyles.length > 0)) {
          var style = processStyle(node,doc.styles,"inline");
	  processStyleID(style);
	  if (style) placemark.style = style;
        }
        if (/^https?:\/\//.test(placemark.description)) {
          placemark.description = ['<a href="', placemark.description, '">', placemark.description, '</a>'].join('');
        }

        // process MultiGeometry
        var GeometryNodes = node.getElementsByTagName('coordinates');
        var Geometry = null;
	if (!!GeometryNodes && (GeometryNodes.length > 0)) {
          for (var gn=0;gn<GeometryNodes.length;gn++) {
             if (!GeometryNodes[gn].parentNode ||
                 !GeometryNodes[gn].parentNode.nodeName) {
                  console.log();
             } else { // parentNode.nodeName exists
               var GeometryPN = GeometryNodes[gn].parentNode;
               Geometry = GeometryPN.nodeName;

        // Extract the coordinates
        // What sort of placemark?
        switch(Geometry) {
          case "Point":
            placemark.Point = processPlacemarkCoords(node, "Point")[0];
             /*eslint-disable-next-line*/
            if (!!window.google && !!google.maps)
              placemark.latlng = new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng);
            pathLength = 1;
            break;
          case "LinearRing":
            // Polygon/line
            polygonNodes = node.getElementsByTagName('Polygon');
            // Polygon
            if (!placemark.Polygon)
              placemark.Polygon = [{
                outerBoundaryIs: {coordinates: []},
                innerBoundaryIs: [{coordinates: []}]
              }];
            for (var pg=0;pg<polygonNodes.length;pg++) {
               placemark.Polygon[pg] = {
                 outerBoundaryIs: {coordinates: []},
                 innerBoundaryIs: [{coordinates: []}]
               };
               placemark.Polygon[pg].outerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "outerBoundaryIs");
               placemark.Polygon[pg].innerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "innerBoundaryIs");
            }	/* eslint-disable-next-line */
            coordList = placemark.Polygon[0].outerBoundaryIs;
            break;

          case "LineString":
            	/* eslint-disable-next-line */
            pathLength = 0;
            placemark.LineString = processPlacemarkCoords(node,"LineString");
            break;

          default:
            break;
      }
      } // parentNode.nodeName exists
      } // GeometryNodes loop
      } // if GeometryNodes
      // call the custom placemark parse function if it is defined
       /*eslint-disable*/
      if (!!parserOptions.pmParseFn) parserOptions.pmParseFn(node, placemark);
      doc.placemarks.push(placemark);
      if (!!window.google && !!google.maps) {
       if (placemark.Point) {
          if (!!window.google && !!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.extend(placemark.latlng);
          }

          if (!!parserOptions.createMarker) {
            // User-defined marker handler
            parserOptions.createMarker(placemark, doc);
          } else { // !user defined createMarker
            // Check to see if this marker was created on a previous load of this document
            var found = false;
            if (!!doc) {
              doc.markers = doc.markers || [];
              if (doc.reload) {
                for (var j = 0; j < doc.markers.length; j++) {
                    if ((doc.markers[j].id == placemark.id) ||
			// if no id, check position
                        (!doc.markers[j].id &&
                         (doc.markers[j].getPosition().equals(placemark.latlng)))) {
                    found = doc.markers[j].active = true;
                    break;
                  }
                }
              }
            }

            if (!found) {
              // Call the built-in marker creator
              marker = createMarker(placemark, doc);
              if (marker) {
                marker.active = true;
                marker.id = placemark.id;
              }
            }
          }
         }
         if (placemark.Polygon) { // poly test 2
          if (!!doc) {
           doc.gpolygons = doc.gpolygons || [];
          }

          if (!!parserOptions.createPolygon) {
           // User-defined polygon handler
            poly = parserOptions.createPolygon(placemark, doc);
          } else {  // ! user defined createPolygon
           // Check to see if this marker was created on a previous load of this document
           poly = createPolygon(placemark,doc);
           poly.active = true;
          }
          if (!!window.google && !!google.maps) {
           doc.bounds = doc.bounds || new google.maps.LatLngBounds();
           doc.bounds.union(poly.bounds);
          }
         }
         if (placemark.LineString) { // polyline
          if (!!doc) {
           doc.gpolylines = doc.gpolylines || [];
          }
          if (!!parserOptions.createPolyline) {
           // User-defined polyline handler
           poly = parserOptions.createPolyline(placemark, doc);
          } else { // ! user defined createPolyline
           // Check to see if this marker was created on a previous load of this document
           poly = createPolyline(placemark,doc);
           poly.active = true;
          }
          if (!!window.google && !!google.maps) {
           doc.bounds = doc.bounds || new google.maps.LatLngBounds();
           doc.bounds.union(poly.bounds);
          }
         }
       }
      } // placemark loop

      if (!!doc.reload && !!doc.markers) {
        for (i = doc.markers.length - 1; i >= 0 ; i--) {
          if (!doc.markers[i].active) {
            if (!!doc.markers[i].infoWindow) {
              doc.markers[i].infoWindow.close();
            }
            doc.markers[i].setMap(null);
            doc.markers.splice(i, 1);
          }
        }
      }

      // Parse ground overlays
      if (!!doc.reload && !!doc.groundoverlays) {
        for (i = 0; i < doc.groundoverlays.length; i++) {
          doc.groundoverlays[i].active = false;
        }
      }

      if (!!doc) {
        doc.groundoverlays = doc.groundoverlays || [];
      }
      // doc.groundoverlays =[];
      var groundOverlay, color, transparency, overlay;
        /*eslint-enable*/
      var groundNodes = responseXML.getElementsByTagName('GroundOverlay');
      for (i = 0; i < groundNodes.length; i++) {
        node = groundNodes[i];

        // Init the ground overlay object
          /*eslint-disable*/
        groundOverlay = {
          name:        geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          icon: {href: geoXML3.nodeValue(node.getElementsByTagName('href')[0])},
          latLonBox: {
            north: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('north')[0])),
            east:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('east')[0])),
            south: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('south')[0])),
            west:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('west')[0]))
          }
        };
         
        if (!!window.google && !!google.maps) {
            /*eslint-enable*/
          doc.bounds = doc.bounds || new google.maps.LatLngBounds();
          doc.bounds.union(new google.maps.LatLngBounds(
            new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
            new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
          ));
        }

        // Opacity is encoded in the color node
        var colorNode = node.getElementsByTagName('color');
        if ( colorNode && colorNode.length && (colorNode.length > 0)) {
         groundOverlay.opacity = geoXML3.getOpacity(nodeValue(colorNode[0]));
        } else {
         groundOverlay.opacity = 0.45;
        }

        doc.groundoverlays.push(groundOverlay);
        if (!!window.google && !!google.maps) {
          /* eslint-disable*/
         if (!!parserOptions.createOverlay) {
          // User-defined overlay handler
          parserOptions.createOverlay(groundOverlay, doc);
         } else { // ! user defined createOverlay
          // Check to see if this overlay was created on a previous load of this document
         
          var found = false;
      
          if (!!doc) { 
            doc.groundoverlays = doc.groundoverlays || [];
            if (!!window.google && !!google.maps && doc.reload) {
                overlayBounds = new google.maps.LatLngBounds(
                  new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
                  new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east));
              var overlays = doc.groundoverlays;
              for (i = overlays.length; i--;) {
                if ((overlays[i].bounds().equals(overlayBounds)) &&
                    (overlays.url_ === groundOverlay.icon.href)) {
                  found = overlays[i].active = true;
                  break;
                }
              }
            }
          }

          if (!found) {
            // Call the built-in overlay creator
            overlay = createOverlay(groundOverlay, doc);
            overlay.active = true;
          }
	 }
         if (!!doc.reload && !!doc.groundoverlays && !!doc.groundoverlays.length) {
          var overlays = doc.groundoverlays;
          for (i = overlays.length; i--;) {
            /*eslint-enable*/
           if (!overlays[i].active) {
            overlays[i].remove();
            overlays.splice(i, 1);
           }
          }
          doc.groundoverlays = overlays;
	 }
	}
      }
      // Parse network links
      var networkLink;
      var docPath = document.location.pathname.split('/');
      docPath = docPath.splice(0, docPath.length - 1).join('/');
      var linkNodes = responseXML.getElementsByTagName('NetworkLink');
      for (i = 0; i < linkNodes.length; i++) {
        node = linkNodes[i];

        // Init the network link object
        networkLink = {
          name: geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          link: {
            href:        geoXML3.nodeValue(node.getElementsByTagName('href')[0]),
            refreshMode:     geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0])
          }
        };

        // Establish the specific refresh mode
        if (networkLink.link.refreshMode === '') {
          networkLink.link.refreshMode = 'onChange';
        }
        if (networkLink.link.refreshMode === 'onInterval') {
          networkLink.link.refreshInterval = parseFloat(geoXML3.nodeValue(node.getElementsByTagName('refreshInterval')[0]));
          if (isNaN(networkLink.link.refreshInterval)) {
            networkLink.link.refreshInterval = 0;
          }
        } else if (networkLink.link.refreshMode === 'onChange') {
          networkLink.link.viewRefreshMode = geoXML3.nodeValue(node.getElementsByTagName('viewRefreshMode')[0]);
          if (networkLink.link.viewRefreshMode === '') {
            networkLink.link.viewRefreshMode = 'never';
          }
          if (networkLink.link.viewRefreshMode === 'onStop') {
            networkLink.link.viewRefreshTime = geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            networkLink.link.viewFormat =      geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            if (networkLink.link.viewFormat === '') {
              networkLink.link.viewFormat = 'BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]';
            }
          }
        }
        /* eslint-disable-next-line */
        if (!/^[\/|http]/.test(networkLink.link.href)) {
          // Fully-qualify the HREF
          networkLink.link.href = docPath + '/' + networkLink.link.href;
        }

        // Apply the link
        if ((networkLink.link.refreshMode === 'onInterval') &&
            (networkLink.link.refreshInterval > 0)) {
          // Reload at regular intervals
          setInterval(parserName + '.parse("' + networkLink.link.href + '")',
                      1000 * networkLink.link.refreshInterval);
        } else if (networkLink.link.refreshMode === 'onChange') {
          if (networkLink.link.viewRefreshMode === 'never') {
            // Load the link just once
            doc.internals.parser.parse(networkLink.link.href, doc.internals.docSet);
          } else if (networkLink.link.viewRefreshMode === 'onStop') {
            // Reload when the map view changes

          }
        }
      }
}

      if (!!doc.bounds && !!window.google && !!google.maps) {
        doc.internals.bounds = doc.internals.bounds || new google.maps.LatLngBounds();
        doc.internals.bounds.union(doc.bounds);
      }
      if (!!doc.markers || !!doc.groundoverlays || !!doc.gpolylines || !!doc.gpolygons) {
        doc.internals.parseOnly = false;
      }

      doc.internals.remaining -= 1;
      if (doc.internals.remaining === 0) {
        // We're done processing this set of KML documents
        // Options that get invoked after parsing completes
	  if (parserOptions.zoom && !!doc.internals.bounds &&
	      !doc.internals.bounds.isEmpty() && !!parserOptions.map) {
          parserOptions.map.fitBounds(doc.internals.bounds);
        }
        if (parserOptions.afterParse) {
          parserOptions.afterParse(doc.internals.docSet);
        }

        if (!doc.internals.parseOnly) {
          // geoXML3 is not being used only as a real-time parser, so keep the processed documents around
          /* eslint-disable-next-line */
            for (var i=0;i<doc.internals.docSet.length;i++) {
              docs.push(doc.internals.docSet[i]);
            }
        }
        google.maps.event.trigger(doc.internals.parser, 'parsed');
      }
  };

  var kmlColor = function (kmlIn, colorMode) {
    var kmlColor = {};
    kmlIn = kmlIn || 'ffffffff';  // white (KML 2.2 default)

    var aa = kmlIn.substr(0,2);
    var bb = kmlIn.substr(2,2);
    var gg = kmlIn.substr(4,2);
    var rr = kmlIn.substr(6,2);

    kmlColor.opacity = parseInt(aa, 16) / 256;
    kmlColor.color   = (colorMode === 'random') ? randomColor(rr, gg, bb) : '#' + rr + gg + bb;
    return kmlColor;
  };

  // Implemented per KML 2.2 <ColorStyle> specs
  var randomColor = function(rr, gg, bb) {
    var col = { rr: rr, gg: gg, bb: bb };
    for (var k in col) {
      var v = col[k];
      if (v == null) v = 'ff';

      // RGB values are limiters for random numbers (ie: 7f would be a random value between 0 and 7f)
      v = Math.round(Math.random() * parseInt(rr, 16)).toString(16);
      if (v.length === 1) v = '0' + v;
      col[k] = v;
    }

    return '#' + col.rr + col.gg + col.bb;
  };

  var processStyleID = function (style) {
    if (!!window.google && !!google.maps) {
      var zeroPoint = new google.maps.Point(0,0);
      /* eslint-disable-next-line */
      if (!!style.href) {
        var markerRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange|pause|go|stop)(-dot)?\.png/;
        if (markerRegEx.test(style.href)) {
         //bottom middle
         /* eslint-disable-next-line */
	  var anchorPoint = new google.maps.Point(16*style.scale, 32*style.scale);
	} else {
      /* eslint-disable-next-line */
	  var anchorPoint = new google.maps.Point(16*style.scale, 16*style.scale);
	}
        // Init the style object with a standard KML icon
        style.icon =  new google.maps.MarkerImage(
          style.href,
          new google.maps.Size(32*style.scale, 32*style.scale),
          zeroPoint,
          // bottom middle
          anchorPoint,
          new google.maps.Size(32*style.scale, 32*style.scale)

        );

        // Look for a predictable shadow
        var stdRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange)(-dot)?\.png/;
        var shadowSize = new google.maps.Size(59, 32);
	var shadowPoint = new google.maps.Point(16,32);
        if (stdRegEx.test(style.href)) {
          // A standard GMap-style marker icon
          style.shadow = new google.maps.MarkerImage(
              'http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png',
              shadowSize,
              zeroPoint,
              shadowPoint,
              shadowSize);
        } else if (style.href.indexOf('-pushpin.png') > -1) {
          // Pushpin marker icon
          style.shadow = new google.maps.MarkerImage(
            'http://maps.google.com/mapfiles/ms/micons/pushpin_shadow.png',
            shadowSize,
            zeroPoint,
            shadowPoint,
            shadowSize);
        } else {
          // Other MyMaps KML standard icon
          style.shadow = new google.maps.MarkerImage(
            style.href.replace('.png', '.shadow.png'),
            shadowSize,
            zeroPoint,
            shadowPoint,
            shadowSize);
        }
      }
    }
  };

  var processStyles = function (doc) {
    for (var styleID in doc.styles) {
      processStyleID(doc.styles[styleID]);
    }
  };

  var createMarker = function (placemark, doc) {
    // create a Marker to the map from a placemark KML object

    // Load basic marker properties
    var markerOptions = geoXML3.combineOptions(parserOptions.markerOptions, {
      map:      parserOptions.map,
      position: new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng),
      title:    placemark.name,
      zIndex:   Math.round(placemark.Point.coordinates[0].lat * -100000)<<5,
      icon:     placemark.style.icon,
      shadow:   placemark.style.shadow
    });

    // Create the marker on the map
    var marker = new google.maps.Marker(markerOptions);
    /* eslint-disable-next-line */
    if (!!doc) {
      doc.markers.push(marker);
    }

    // Set up and create the infowindow if it is not suppressed
    if (!parserOptions.suppressInfoWindows) {
      var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
        content: '<div class="geoxml3_infowindow"><div class="h3">' + placemark.name +
                 '</div><div>' + placemark.description + '</div></div>',
        pixelOffset: new google.maps.Size(0, 2)
      });
      if (parserOptions.infoWindow) {
        marker.infoWindow = parserOptions.infoWindow;
      } else {
        marker.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
      }
      marker.infoWindowOptions = infoWindowOptions;

      // Infowindow-opening event handler
      google.maps.event.addListener(marker, 'click', function() {
        this.infoWindow.close();
        marker.infoWindow.setOptions(this.infoWindowOptions);
        this.infoWindow.open(this.map, this);
      });
    }
    placemark.marker = marker;
    return marker;
  };

  var createOverlay = function (groundOverlay, doc) {
    // Add a ProjectedOverlay to the map from a groundOverlay KML object

    if (!window.ProjectedOverlay) {
      throw 'geoXML3 error: ProjectedOverlay not found while rendering GroundOverlay from KML';
    }

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
        new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
    );
    var overlayOptions = geoXML3.combineOptions(parserOptions.overlayOptions, {percentOpacity: groundOverlay.opacity*100});
      /* eslint-disable-next-line */
    var overlay = new ProjectedOverlay(parserOptions.map, groundOverlay.icon.href, bounds, overlayOptions);
        /* eslint-disable-next-line */
    if (!!doc) {
      doc.ggroundoverlays = doc.ggroundoverlays || [];
      doc.ggroundoverlays.push(overlay);
    }

    return overlay;
  };

// Create Polyline
var createPolyline = function(placemark, doc) {
  var paths = [];
  var bounds = new google.maps.LatLngBounds();
  for (var j=0; j<placemark.LineString.length; j++) {
    var path = [];
    var coords = placemark.LineString[j].coordinates;
    for (var i=0;i<coords.length;i++) {
      var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
      path.push(pt);
      bounds.extend(pt);
    }
    paths.push(path);
  }

  // point to open the infowindow if triggered
  var point = paths[0][Math.floor(path.length/2)];
  // Load basic polyline properties
  var kmlStrokeColor = kmlColor(placemark.style.color,placemark.style.colorMode);
  var polyOptions = geoXML3.combineOptions(parserOptions.polylineOptions, {
    map:      parserOptions.map,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: placemark.style.width,
    strokeOpacity: kmlStrokeColor.opacity,
    title:    placemark.name
  });
  if (paths.length > 1) {
    polyOptions.paths = paths;
      /* eslint-disable-next-line */
    var p = new MultiGeometry(polyOptions);
  } else {
    polyOptions.path = paths[0];
      /* eslint-disable-next-line */
    var p = new google.maps.Polyline(polyOptions);
  }
  p.bounds = bounds;
  // setup and create the infoWindow if it is not suppressed
  if (!parserOptions.suppressInfoWindows) {
    var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
      content: '<div class="geoxml3_infowindow"><div class="h3">' + placemark.name +
               '</div><div>' + placemark.description + '</div></div>',
      pixelOffset: new google.maps.Size(0, 2)
    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(point);
      }
      p.infoWindow.open(p.map || p.polylines[0].map);
    });
  }
    /* eslint-disable-next-line */
  if (!!doc) doc.gpolylines.push(p);
  placemark.polyline = p;
  return p;
};

// Create Polygon
var createPolygon = function(placemark, doc) {
  var bounds = new google.maps.LatLngBounds();
    /* eslint-disable */
  var pathsLength = 0;
  var paths = [];
  for (var polygonPart=0;polygonPart<placemark.Polygon.length;polygonPart++) {
    for (var j=0; j<placemark.Polygon[polygonPart].outerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].outerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
    for (var j=0; j<placemark.Polygon[polygonPart].innerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].innerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
  }
    /* eslint-enable*/

  // Load basic polygon properties
  var kmlStrokeColor = kmlColor(placemark.style.color,placemark.style.colorMode);
  var kmlFillColor = kmlColor(placemark.style.fillcolor,placemark.style.colorMode);
  if (!placemark.style.fill) kmlFillColor.opacity = 0.0;
  var strokeWeight = placemark.style.width;
  if (!placemark.style.outline) {
    strokeWeight = 0;
    kmlStrokeColor.opacity = 0.0;
  }
  var polyOptions = geoXML3.combineOptions(parserOptions.polygonOptions, {
    map:      parserOptions.map,
    paths:    paths,
    title:    placemark.name,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: strokeWeight,
    strokeOpacity: kmlStrokeColor.opacity,
    fillColor: kmlFillColor.color,
    fillOpacity: kmlFillColor.opacity
  });
  var p = new google.maps.Polygon(polyOptions);
  p.bounds = bounds;
  if (!parserOptions.suppressInfoWindows) {
    var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
      content: '<div class="geoxml3_infowindow"><div class="h3">' + placemark.name +
               '</div><div>' + placemark.description + '</div></div>',
      pixelOffset: new google.maps.Size(0, 2)
    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(p.bounds.getCenter());
      }
      p.infoWindow.open(this.map);
    });
  }
    /* eslint-disable-next-line */
  if (!!doc) doc.gpolygons.push(p);
  placemark.polygon = p;
  return p;
};

  return {
    // Expose some properties and methods

    options: parserOptions,
    docs:    docs,

    parse:          parse,
    render:         render,
    parseKmlString: parseKmlString,
    hideDocument:   hideDocument,
    showDocument:   showDocument,
    processStyles:  processStyles,
    createMarker:   createMarker,
    createOverlay:  createOverlay,
    createPolyline: createPolyline,
    createPolygon:  createPolygon
  };
};
// End of KML Parser

// Helper objects and functions
geoXML3.getOpacity = function (kmlColor) {
  // Extract opacity encoded in a KML color value. Returns a number between 0 and 1.
  if (!!kmlColor &&
      (kmlColor !== '') &&
      (kmlColor.length == 8)) {
    var transparency = parseInt(kmlColor.substr(0, 2), 16);
    return transparency / 255;
  } else {
    return 1;
  }
};

// Log a message to the debugging console, if one exists
geoXML3.log = function(msg) {
    /* eslint-disable-next-line */
  if (!!window.console) {
    console.log(msg);
  } else { alert("log:"+msg); }
};

// Combine two options objects: a set of default values and a set of override values
geoXML3.combineOptions = function (overrides, defaults) {
  var result = {};
    /* eslint-disable-next-line */
  if (!!overrides) {
    for (var prop in overrides) {
          /* eslint-disable-next-line */
      if (overrides.hasOwnProperty(prop)) {
        result[prop] = overrides[prop];
      }
    }
  }
      /* eslint-disable-next-line */
  if (!!defaults) {
    for (prop in defaults) {
          /* eslint-disable-next-line */
      if (defaults.hasOwnProperty(prop) && (result[prop] === undefined)) {
        result[prop] = defaults[prop];
      }
    }
  }
  return result;
};

// Retrieve an XML document from url and pass it to callback as a DOM document
geoXML3.fetchers = [];

// parse text to XML doc
/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
geoXML3.xmlParse = function (str) {
      /* eslint-disable-next-line */
  if ((typeof ActiveXObject != 'undefined') || ("ActiveXObject" in window)) {
        /* eslint-disable-next-line */
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }

  return document.createElement('div', null);
};

// from http://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
geoXML3.isParseError = function(parsedDocument) {
    if ((typeof ActiveXObject != 'undefined') || ("ActiveXObject" in window))
	return false;
    // parser and parsererrorNS could be cached on startup for efficiency
    var p = new DOMParser(),
        errorneousParse = p.parseFromString('<', 'text/xml'),
        parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName("parsererror").length > 0;
    }

    return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
};

geoXML3.fetchXML = function (url, callback) {
  function timeoutHandler() {
    geoXML3.log('XHR timeout');
    callback();
  }

  var xhrFetcher = new Object();
      /* eslint-disable-next-line */
  if (!!geoXML3.fetchers.length) {
    xhrFetcher = geoXML3.fetchers.pop();
  } else {
        /* eslint-disable-next-line */
    if (!!window.XMLHttpRequest) {
      xhrFetcher.fetcher = new window.XMLHttpRequest(); // Most browsers
          /* eslint-disable-next-line */
    } else if (!!window.ActiveXObject) {
      xhrFetcher.fetcher = new window.ActiveXObject('Microsoft.XMLHTTP'); // Some IE
    }
  }

  if (!xhrFetcher.fetcher) {
    geoXML3.log('Unable to create XHR object');
    callback(null);
  } else {
      xhrFetcher.fetcher.open('GET', url, true);
      if (xhrFetcher.fetcher.overrideMimeType) {
        xhrFetcher.fetcher.overrideMimeType('text/xml');
      }
      xhrFetcher.fetcher.onreadystatechange = function () {
      if (xhrFetcher.fetcher.readyState === 4) {
        // Retrieval complete
            /* eslint-disable-next-line */
        if (!!xhrFetcher.xhrtimeout)
          clearTimeout(xhrFetcher.xhrtimeout);
        if (xhrFetcher.fetcher.status >= 400) {
          geoXML3.log('HTTP error ' + xhrFetcher.fetcher.status + ' retrieving ' + url);
          callback();
        } else {
          // Returned successfully
          var xml = geoXML3.xmlParse(xhrFetcher.fetcher.responseText);
          if (xml.parseError && (xml.parseError.errorCode != 0)) {
           geoXML3.log("XML parse error "+xml.parseError.errorCode+", "+xml.parseError.reason+"\nLine:"+xml.parseError.line+", Position:"+xml.parseError.linepos+", srcText:"+xml.parseError.srcText);
           xml = "failed parse";
          } else if (geoXML3.isParseError(xml)) {
           geoXML3.log("XML parse error");
           xml = "failed parse";
          }
          callback(xml);
        }
        // We're done with this fetcher object
        geoXML3.fetchers.push(xhrFetcher);
      }
    };
    xhrFetcher.xhrtimeout = setTimeout(timeoutHandler, geoXML3.xhrTimeout);
    xhrFetcher.fetcher.send(null);
  }
};

//nodeValue: Extract the text value of a DOM node, with leading and trailing whitespace trimmed
geoXML3.nodeValue = function(node, defVal) {
  var retStr="";
  if (!node) {
    return (typeof defVal === 'undefined' || defVal === null) ? '' : defVal;
  }
   if(node.nodeType==3||node.nodeType==4||node.nodeType==2){
      retStr+=node.nodeValue;
   }else if(node.nodeType==1||node.nodeType==9||node.nodeType==11){
      for(var i=0;i<node.childNodes.length;++i){
         retStr+=arguments.callee(node.childNodes[i]);
      }
   }
   return retStr;
};
$(function(){
    //Convert KML data to polygon
    var kml_url = $('.afcu-map').attr('data-kml-url')+"";
    //hack for map bug
    kml_url = kml_url.replace("http:","https:");
    //   var rel_kml_path = $('.afcu-map').attr('data-kml-path');
    //  var geoXml = null;
    var map = null;
   //    var geocoder = null;
/* eslint-disable*/
    var toggleState = 1;

    function createPoly(points, colour, width, opacity, fillcolour, fillopacity, bounds, name, description) {
        GLog.write("createPoly("+colour+","+width+"<"+opacity+","+fillcolour+","+fillopacity+","+name+","+description+")");
        var poly = new GPolygon(points, colour, width, opacity, fillcolour, fillopacity);
        poly.Name = name;
        poly.Description = description;
        map.addOverlay(poly);
        exml.gpolygons.push(poly);
        return poly;
    }

    //placesAutocomplete variable needs to be public. Declare it here for use in other functions
    var placesAutocomplete;
/*eslint-enable*/
    //Initialize google maps
   /* function initialize() {
        geocoder = new google.maps.Geocoder();
        geoXml = new geoXML3.parser({map: map, singleInfoWindow: true, infoWindow: ""});
        if (rel_kml_path != null){
            geoXml.parse(rel_kml_path);
        }
    }*/

    function initializeMap() {
        var markers = [];
        var afcu = new google.maps.LatLng(41.175813, -112.013764);
        var mapOptions = {
            zoom: 5,
            center: afcu,
            scrollwheel: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_TOP
            },
        };

        // Create the search box and link it to the UI element.
        var input = /** @type {HTMLInputElement} */(document.getElementById('address'));

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var ctaLayer = new google.maps.KmlLayer({
            url: kml_url
        });
        ctaLayer.setMap(map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    
        var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
   
        //-------------------------
        try{
        // import the file --- se related function below
        if(kml_url != null){
        var content = getSelectedFileContent(kml_url);

        // build an xmlObj for parsing
        /*eslint-disable-next-line*/
        xmlDocObj = $($.parseXML(content));

   /*eslint-disable-next-line*/
    function getSelectedFileContent(filename) { 
        // var importFilename = importAreaBaseURL + filename;
        var request = new XMLHttpRequest();
            request.open("GET", filename, false);
           request.send(null);
            return request.responseText;
    }
    var infowindow = new google.maps.InfoWindow();
   /*eslint-disable-next-line*/
    var placemarks = xmlDocObj.find("Placemark");
    placemarks.each(function (index) {

            if ($(this).find("Polygon").length > 0) {
                   /*eslint-disable*/
                tipoGeom = "Polygon";
                coordinates = $(this).find("Polygon").find("outerBoundaryIs").find("coordinates").text();
                //console.log("tmpHtml:"+tmpHtml);
                var long = coordinates.substr(0, coordinates.indexOf(',')); 
                coordinates=coordinates.replace(long+',','');
                var lat = coordinates.substr(0,coordinates.indexOf(','));
                var name = $(this).find("name").text();
                var description = $(this).find("description").text();
                /*eslint-enable*/
                // Append a link to the markers DIV for each marker
                $('#markers').prepend('<li class=" col-md-4" role="listitem"><a class="marker-link" aria-label="' + description + '" data-markerid="' + index + '" href="#">' +name + '</a></li>');

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, long),
                    map: map,
                    title: name,
                });
                marker.setVisible(false);
                // Register a click event listener on the marker to display the corresponding infowindow content
                google.maps.event.addListener(marker, 'click', (function (marker) {

                    return function () {

                        infowindow.setContent(description);
                        infowindow.open(map, marker);
                    };

                })(marker, index));

                // Add marker to markers array
                markers.push(marker);
            
            }
        });
    
    // Trigger a click event on each marker when the corresponding marker link is clicked
    $('.marker-link').on('click', function () {
    	//console.log("marker:",markers[$(this).data('markerid')]);
        google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
    });
        }
        }catch(e){
        	console.error(e);
        }
   // ------------
    


        // [START region_getplaces]
        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
               /*eslint-disable-next-line*/
            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
               /*eslint-disable-next-line*/
            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                   /*eslint-disable-next-line*/
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location
                });
                markers.push(marker);
                bounds.extend(place.geometry.location);
            }
               /*eslint-disable-next-line*/
            zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function() {
                if (this.getZoom() > 14 && this.initialZoom == true) {
                    // Change max/min zoom here
                    this.setZoom(14);
                    this.initialZoom = false;
                }   /*eslint-disable-next-line*/
                google.maps.event.removeListener(zoomChangeBoundsListener);
            });
            map.initialZoom = true;
            map.fitBounds(bounds);
            });
            // [END region_getplaces]

            // Bias the SearchBox results towards places that are within the bounds of the
            // current map's viewport.
            google.maps.event.addListener(map, 'bounds_changed', function() {
                var bounds = map.getBounds();
                searchBox.setBounds(bounds);
            });
            }

    if ($('#map-canvas').length) {
	   // google.maps.event.addDomListener(window, 'load', initialize);
	    initializeMap();	    
	    setTimeout(function(){$('.afcu-map iframe').attr('tabindex','-1');},500);

    }
});
$(function() {
    //toggle image src with data-image-toggle src on hover
    /* eslint-disable-next-line */
    var image = $('img');
    $('img').mouseenter(function() {
        if ($(this).attr('data-image-toggle')) {
            var toggleSrc = $(this).attr('data-image-toggle');
            $(this).attr('src', toggleSrc);
        }
    })
    .mouseleave(function() {
        if ($(this).attr('data-image-src')) {
            var toggleSrc = $(this).attr('data-image-src');
            $(this).attr('src', toggleSrc);
        }
    });
});
$(document).ready(function(){
	
	//affix top and bottom implementation	
	
	
	$(window).resize(function() {
		setFrameWidth();
	});
	
	function setFrameWidth(){
		var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		var iframes = $(".iframe iframe[data-spy='affix']");	
		
		iframes.each(function (){
			
			var $this = $(this);
			var width = $this.parent().width();
        
	         if(windowWidth < 992){
					//$this.css('width','');
				}else{
					$this.css('width',width+'px');
			 }
			
		});		
	}
	
	setFrameWidth();
	
	  // AFFIX CLASS DEFINITION
		  // ======================

		  var Affix = function (element, options) {
		    this.options = $.extend({}, Affix.DEFAULTS, options);

		    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target);

		    this.$target = target
		      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
		      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this));

		    this.$element     = $(element);
		    this.affixed      = null;
		    this.unpin        = null;
		    this.pinnedOffset = null;

		    this.checkPosition();
		  };

		  Affix.VERSION  = '3.4.0';

		  Affix.RESET    = 'affix affix-top affix-bottom';

		  Affix.DEFAULTS = {
		    offset: 0,
		    target: window
		  };

		  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
		    var scrollTop    = this.$target.scrollTop();
		    var position     = this.$element.offset();
		    var targetHeight = this.$target.height();

		    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

		    if (this.affixed == 'bottom') {
		      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom';
		      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom';
		    }

		    var initializing   = this.affixed == null;
		    var colliderTop    = initializing ? scrollTop : position.top;
		    var colliderHeight = initializing ? targetHeight : height;

		    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
		    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom';

		    return false;
		  };

		  Affix.prototype.getPinnedOffset = function () {
		    if (this.pinnedOffset) return this.pinnedOffset;
		    this.$element.removeClass(Affix.RESET).addClass('affix');
		    var scrollTop = this.$target.scrollTop();
		    var position  = this.$element.offset();
		    return (this.pinnedOffset = position.top - scrollTop);
		  };

		  Affix.prototype.checkPositionWithEventLoop = function () {
		    setTimeout($.proxy(this.checkPosition, this), 1);
		  };

		  Affix.prototype.checkPosition = function () {
		    if (!this.$element.is(':visible')) return;

		    var height       = this.$element.height();
		    var offset       = this.options.offset;
		    var offsetTop    = offset.top;
		    var offsetBottom = offset.bottom;
		    var scrollHeight = Math.max($(document).height(), $(document.body).height());

		    if (typeof offset != 'object')         offsetBottom = offsetTop = offset;
		    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element);
		    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

		    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

		    if (this.affixed != affix) {
		      if (this.unpin != null) this.$element.css('top', '');

		      var affixType = 'affix' + (affix ? '-' + affix : '');
		      var e         = $.Event(affixType + '.bs.affix');

		      this.$element.trigger(e);

		      if (e.isDefaultPrevented()) return;

		      this.affixed = affix;
		      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

		      this.$element
		        .removeClass(Affix.RESET)
		        .addClass(affixType)
		        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
		    }

		    if (affix == 'bottom') {
		      this.$element.offset({
		        top: scrollHeight - height - offsetBottom
		      }); 
		    }
		  };


		  // AFFIX PLUGIN DEFINITION
		  // =======================

		  function Plugin(option) {
		    return this.each(function () {
		      var $this   = $(this);
		      var data    = $this.data('bs.affix');
		      var options = typeof option == 'object' && option;

		      if (!data) $this.data('bs.affix', (data = new Affix(this, options)));
		      if (typeof option == 'string') data[option]();
		    });
		  }

		  var old = $.fn.affix;

		  $.fn.affix             = Plugin;
		  $.fn.affix.Constructor = Affix;


		  // AFFIX NO CONFLICT
		  // =================

		  $.fn.affix.noConflict = function () {
		    $.fn.affix = old;
		    return this;
		  };

		  // AFFIX DATA-API
		  // ==============

		  $(window).on('load', function () {
		    $('[data-spy="affix"]').each(function () {
		      var $spy = $(this);
		      var data = $spy.data();

		      data.offset = data.offset || {};

		      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
		      if (data.offsetTop    != null) data.offset.top    = data.offsetTop;

		      Plugin.call($spy, data);
		    });
		  });
	
});


$(document).ready(function(){
	var startTime = 8;
	var endTime = 17;
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
	usaTime = new Date(usaTime);
    if(!(usaTime.getHours() >= startTime && usaTime.getHours() <= endTime)){
    	 $('.genesis-callback-button').hide();
    	 $('.callback-form-action').hide();
  		 $('.callback-prefix-text').hide();
    }
});

/* eslint-disable-next-line */
function verifyCaptcha(response) {
	$( ".signup-captcha-alert" ).hide();
	$( ".signup-captcha-alert-timeout" ).hide();
	}
	/* eslint-disable-next-line */
function recaptchaExpired(){
		console.log("expired");
		$(".signup-captcha-alert-timeout").show();
		/* eslint-disable-next-line */
		grecaptcha.reset();
		document.getElementsByClassName('rc-anchor-error-msg-container')[0].style.display = 'none';
}

$(document).ready(function(){
	$( "#signup-callback-day" ).datepicker();
	$( ".signup-pre-loader" ).hide();
	$( ".schedule-time-alert" ).hide();
	$( ".signup-time-alert" ).hide();
	$( ".signup-captcha-alert" ).hide();
	$( ".signup-captcha-alert-timeout" ).hide();
	$( ".schedule-captcha-alert" ).hide();

		function checkSignupCaptcha(){
			/* eslint-disable-next-line */
			var response = grecaptcha.getResponse();
			if( response.length == 0 ){
				$( ".signup-captcha-alert" ).show();
				return false;
			} 
			return true;
		}

 	function hideFormAlert(){
 	 	$( ".genesis-callback-container .alert-text" ).each(function() {
 			  $(this).hide();
 			});
 	 	}
 	 	hideFormAlert();
	
	$('#signup-callback-phone').keyup( function () { 
		
		getPhoneNumberInFormat($(this));
       
    });
	
	$("#callback-shedule-phonenumber").keyup( function () { 
		
		getPhoneNumberInFormat($(this));
		
	});
	
	function getPhoneNumberInFormat( $this ){
		
		var numbers = $this.val().replace(/\D/g,'');
		
		var part1 = ( numbers.length >= 1 ? '(' : "" ) + numbers.slice(0,3);
		var part2 = ( numbers.length >= 4 ? ")-" : "" ) + numbers.slice(3,6);
		var part3 = ( numbers.length >= 7 ? '-' : "" ) + numbers.slice(6,10);
		
		numbers =  part1 + part2  + part3 ;
		
		$this.val(numbers);
	}
	

	function validateScheduleDate(currentTime , currentDate){
		var selectedDate = new Date(currentDate);
		var todaysDate = new Date();
		
		if(currentTime == null || currentTime == undefined || currentTime == ""){
	                return false;
	            }
	            currentDate = new Date();
	            currentDate.setHours(currentTime.substring(0,2));
	            if(currentTime.substring(6,9) == "AM" && currentTime.substring(0,2) == "12"){
	                return false;
	           }
	            if(currentTime.substring(6,9) == "PM" && !(currentTime.substring(0,2) == "12")){
	                var currentHours = ( parseInt(currentTime.substring(0,2)) + 12 ) + "";
	                currentDate.setHours(currentHours);
	            }
	                currentDate.setMinutes(currentTime.substring(3,5));
/* eslint-disable*/
				startDate = new Date(currentDate.getTime());

				startDate.setHours("08");

	            startDate = new Date(currentDate.getTime());
	            startDate.setHours("09");
	            startDate.setMinutes("00");

	            endDate = new Date(currentDate.getTime());
	            endDate.setHours("17");
	            endDate.setMinutes("00");
				var valid = (startDate <= currentDate && endDate >= currentDate);
/*eslint-enable*/				
	            var presentDate = new Date();

                if(selectedDate > todaysDate){
                   return true;
                }
                else if(selectedDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
        			if(presentDate < currentDate){
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
				}
				/* eslint-disable-next-line */
	            return valid;
	}
	
	$( "#shedule-loader" ).hide();
	$( "#login-loader" ).hide();
	$( "#signup-loader" ).hide();
			
	$(".callback-form-action").click (function(){

			 	var $this = $(this);
			    var target = $this.data('showmodal');
			    if(target == ".signup-form" ){
                    $("#signup-callback-account-number").prop('disabled', false);
                    $("#signup-callback-phone").prop('disabled', false);
                    $('#signup-callback-day').prop('disabled', false);
                    $('#signup-callback-time').prop('disabled', false);
                    $("button.genesis-signup-button").prop('disabled', false);
                    var signupDay = $('#signup-callback-day');
                    signupDay[0].selectedIndex = "0";
                    var signupTime = $('#signup-callback-time');
                    signupTime[0].selectedIndex = "0";
                    $("#signup-callback-phone").val('');
					$("#signup-callback-account-number").val('');
					/*eslint-disable-next-line*/
            		grecaptcha.reset();
                    $(".signup-shedule-result").text("");
                    $( ".signup-time-alert" ).hide();

				    	if($(this).attr('id') == "member-no"){
				    		$("#member-no").addClass('button-disable');
                            $("#member-no").attr('disabled', true);
				    	}
					$( ".signup-pre-loader" ).show();
                    $( ".signup-form-continue").show();
                    getAvailableTimeSlots("signup-callback-day","signup-callback-time",".signup-form");
			    	
                }else{
			    $('.callback-form-action').not($this).each(function(){
				       var $other = $(this);
				       var otherTarget = $other.data('showmodal');
				       $(otherTarget).hide();
	                   $(".shedule-form").hide(); 
				    });
			    $(target).show();
                }


	});

	$('#genesis-callback-modal').on('hidden.bs.modal', function () {
         $('#are-you-a-member').on('click.member',memberHandler );
          $('#are-you-a-member').removeClass('disable');
		sessionStorage.removeItem('firstName');
    	sessionStorage.removeItem('id');
 	 	hideFormAlert();
		$('.genesis-callback-container input[type=radio]').prop('checked', false);  
	    $("button.genesis-shedule-button").prop('disabled', false);
		$("button.genesis-signup-button").prop('disabled', false);
		$("#callback-shedule-day").prop('disabled', false);
		$("#callback-shedule-time").prop('disabled', false);
		$("#callback-shedule-phonenumber").prop('disabled', false);
		$("#signup-callback-account-number").prop('disabled', false);
       	$("#signup-callback-phone").prop('disabled', false);
        $('#signup-callback-day').prop('disabled', false);
        $('#signup-callback-time').prop('disabled', false);
        $("#member-no").attr('disabled', false);
		$(".signup-shedule-result").text("");
		$(".login-alert-text").text("");
		$(".shedule-result").text("");
		$( ".schedule-time-alert" ).hide();
		$( ".signup-time-alert" ).hide();
		$( ".signup-captcha-alert" ).hide();
		$( ".signup-captcha-alert-timeout" ).hide();
		/*eslint-disable-next-line*/
		grecaptcha.reset();
        $(".callback-form input").val("");
        var callbackDay = $('#callback-shedule-day');
        callbackDay[0].selectedIndex = "0";
        var callbackTime = $('#callback-shedule-time');
        callbackTime[0].selectedIndex = "0";      
        var signupDay = $('#signup-callback-day');
        signupDay[0].selectedIndex = "0";
        var signupTime = $('#signup-callback-time');
        signupTime[0].selectedIndex = "0"; 
        $("#member-no").removeClass('button-disable');
		$("#continue-signup-button").css('background-color','#00548e');    
		$("#continue-signup-button").css('border-color','#00548e'); 
		/*eslint-disable-next-line*/
        isContinueClicked = 0;
	});
	
	function getAvailableTimeSlots(daySelector,timeSelector,target){
		//getting available time slots on success of login
		$( "#"+daySelector+" option" ).slice(1).remove();
		$( "#"+timeSelector+" option" ).slice(1).remove();
		var t = new Date().getTime();
		 $.post('/bin/genesys/getAvailableTimeSlots' , { t : t},
        function(returnedData){

		   if(returnedData !== undefined && returnedData !== null){
		   var days = returnedData.days;
		   var times = returnedData.times;
		   
		   days.forEach(iterateDays);
/*eslint-disable-next-line*/
		   function iterateDays(item) 
		   { 
		     var option = $("<option>", {value: item});
		     option.text(item);
		     $( "#"+daySelector ).append( option ); 					     
		   }
		   
		   times.forEach(iterateTimes); 
		   /*eslint-disable-next-line*/
		   function iterateTimes(item) 
		   { 
			  var option = $("<option>", {value: item});
			  option.text(item);
			  $( "#"+timeSelector ).append( option );						   
		   }
		   
		   if(target == ".signup-form"){
			    $(target).show(); 
				$( ".signup-pre-loader" ).hide();
				$( ".signup-form-continue" ).hide();
				$( ".callback-form-dialog" ).hide();			    
				$( ".login-form" ).hide();			    
		   }else{
			
			$this = $(this);
		    $('.callback-form-action').not($this).each(function(){
		       var $other = $(this);
		       var otherTarget = $other.data('showmodal');
		       $(otherTarget).hide();        
		    });    
            $(".shedule-result").text("");
            $(".callback-form input").val("");
			    $(".shedule-form").show(); 
				$(".login-alert-text").text("");
				
		   }
	   }
	})
	.fail(function() {
		if(target == ".signup-form"){
		    $(target).show(); 
			$( ".signup-pre-loader" ).hide();
			$( ".signup-form-continue" ).hide();
			$( ".callback-form-dialog" ).hide();			    
			$( ".login-form" ).hide();			    
	   }else{
		  $this = $(this);
	    $('.callback-form-action').not($this).each(function(){
	       var $other = $(this);
	       var otherTarget = $other.data('showmodal');
	       $(otherTarget).hide();        
	    });    
        $(".shedule-result").text("");
        $(".callback-form input").val("");
		    $(".shedule-form").show(); 
			$(".login-alert-text").text("");
			
	   }
		
		$(".signup-daytime-slot-empty-alert").show();		
		$(".callback-daytime-slot-empty-alert").show();
	  });
		 
	}
	

	$('#signup-callback-day,#callback-shedule-day').on('change',function(){
		
		var times = ["Please Select","09:00 AM","09:15 AM","09:30 AM","09:45 AM","10:00 AM","10:15 AM","10:30 AM","10:45 AM","11:00 AM","11:15 AM","11:30 AM","11:45 AM","12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30PM","02:45 PM","03:00 PM","03:15 PM","03:30 PM","03:45 PM","04:00 PM","04:15 PM","04:30 PM","04:45 PM","05:00 PM"];
		
		var selectDay = $(this).val();
	    var selectDate = new Date(Date.parse(selectDay));
	    var date = new Date();
        var currentDate = date.getDate();
        var year = date.getFullYear();
        
        var months = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];
       var month = months[date.getMonth()];
       
       $("#callback-shedule-time").empty();
	   $("#signup-callback-time").empty();
       var firstItem = 0;
      
       times.forEach(function(item, index){
    	   
    	if(selectDate.getDate() > currentDate){
   	    	//tomorrow
   	    	 var currentTime = new Date().getTime();
   	    	 
   	    	 if(index == 0){
   	    		 var option1 = $("<option>", { value: item });
   	   	         option1.text(item);
   	   	         
   	   	         var option2 = $("<option>", { value: item });
	   	         option2.text(item);
   	   	         
   	    	 }else{
				/*eslint-disable*/
   	    		 var option1 = $("<option>", { value: item });
   	   	         option1.text(item);
   	   	         var option2 = $("<option>", { value: item });
   	   	         option2.text(item);
   	    		 
   	    	 }
   	    	 
   	         $("#callback-shedule-time").append( option1);
 	         $("#signup-callback-time").append( option2 );	
   	    }else{
   	    	//today
   	    	var itemHr = parseInt(item.substring(0, 2));
   	        var itemMin = item.substring(3, 5);
   	        var itemAmpm = item.substring(6, 8).toUpperCase();
   	         if (itemAmpm == "PM" && itemHr != 12) {
   	           itemHr = itemHr + 12;
   	         }
   	                     
   	 	    var time = Date.parse(
   	 	      currentDate +
   	 	        " " +
   	 	        month +
   	 	        " " +
   	 	        year +
   	 	        " " +
   	 	        itemHr +
   	 	        ":" +
   	 	        itemMin
				);
				
   	    	 var currentTime = new Date(new Date().getTime() + 30*60000).getTime();
   	    	 
   	    	 if (time > currentTime) {
   	    		 firstItem++; 
   	    		 
   	    		 if(firstItem == 1){
					
   	    			 var option1 = $("<option>", { value: "Please Select" });
   	   	             option1.text("Please Select");
   	   	             $("#callback-shedule-time").append(option1);
   	   	            
   	   	             
   	    			 var option1 = $("<option>", { value: item });
   	   	             option1.text(item);
   	   	             $("#callback-shedule-time").append(option1);
   	   	           
   	   	             
   	   	             var option2 = $("<option>", { value: "Please Select" });
	   	             option2.text("Please Select");
	   	            
	   	             $("#signup-callback-time").append( option2 );	
	   	             
	    			 var option2 = $("<option>", { value: item });
	   	             option2.text(item);
	   	            
	   	             $("#signup-callback-time").append( option2 );
   	   	             
   	    		 }else{
   	    			 var option1 = $("<option>", { value: item });
   	   	             option1.text(item);
   	   	             
   	   	             var option2 = $("<option>", { value: item });
	   	             option2.text(item);
   	    		 }
				}
				/*eslint-enable*/
   	    	$("#callback-shedule-time").append(option1);
   	        $("#signup-callback-time").append( option2 );	
   
   	    }
       });
  
       $("#callback-shedule-time")[0].selectedIndex = 0;
	   $("#signup-callback-time")[0].selectedIndex = 0; 
	});
	
	$(".login-form").submit (function(event){

		$(".login-alert-text").text("");
		$( "#login-loader" ).show();
	 	hideFormAlert();
	    $("button.genesis-login-button").prop('disabled', true);
	    
	    var item =	{
	    	"username" : $("#login-callback-account-number").val(),
	    	"password" : $("#login-callback-password").val(),
	    	"t":new Date().getTime()
		};
	  
	    $.ajax({
            url: '/bin/fiserv/login',
            type: 'POST',
            data: item,
            dataType: 'json'
        }).done(function(returnedData) {
        	
 			   if(returnedData.access_token !== null && returnedData.access_token !== undefined){
 				sessionStorage.setItem('firstName',returnedData.firstName );
 				sessionStorage.setItem('id',returnedData.id );
 				getAvailableTimeSlots("callback-shedule-day","callback-shedule-time","");
 					
 			   }else{
 				   $(".login-alert-text").text("We are unable to validate the information. Please try again, or for assistance contact us at 1-800-999-3961.");
 			   }
 			   
 			   $( "#login-loader" ).hide();
 			   $("button.genesis-login-button").prop('disabled', false);
        }).fail(function() {	
			   $(".login-alert-text").text("We are unable to validate the information. Please try again, or for assistance contact us at 1-800-999-3961.");
        		$( "#login-loader" ).hide();
			   $("button.genesis-login-button").prop('disabled', false);
        }   		
        );
	    event.preventDefault();
	});


 	$(".shedule-form").submit (function(event){
        $( ".schedule-time-alert" ).hide();
        event.preventDefault(); 
 		$(".shedule-result").text("");
 		if(!validateScheduleDate($("#callback-shedule-time").val(), $("#callback-shedule-day").val())){
 			$( ".schedule-time-alert" ).show(50);
 		}else{
 		$( "#shedule-loader" ).show();
 	 	hideFormAlert();
 	 	$("button.genesis-shedule-button").prop('disabled', true);
 	 	$("#callback-shedule-day").prop('disabled', true);
 	    $("#callback-shedule-time").prop('disabled', true);
 	    $("#callback-shedule-phonenumber").prop('disabled', true);
        
      $.post('/bin/genesis/callback/schedule', {
            	day : $("#callback-shedule-day").val(),
            	time : $("#callback-shedule-time").val(),
            	phonenumber : $("#callback-shedule-phonenumber").val().replace(/\D/g,''),
            	firstName : sessionStorage.getItem('firstName'),
            	id : sessionStorage.getItem('id'),
            	t: new Date().getTime()
            }, 
            function(returnedData){          
			   if(returnedData.status !== undefined && returnedData.status !== null && returnedData.status == 'success'){
				   $(".shedule-result").text("Congratulations! Your appointment has been scheduled.").css("color","green");
			   }else{
				   $(".shedule-result").text(returnedData.result).css("color","red");
			       $("button.genesis-shedule-button").prop('disabled', false);
			       $("#callback-shedule-day").prop('disabled', false);
			 	   $("#callback-shedule-time").prop('disabled', false);
			 	   $("#callback-shedule-phonenumber").prop('disabled', false);
			   }
			   $( "#shedule-loader" ).hide();
		});
 	}
	});
   
 	

 	$(".signup-form").submit (function(event){
        event.preventDefault();
		$(".signup-shedule-result").text("");
 		if(checkSignupCaptcha()){
 	 		if(!validateScheduleDate($("#signup-callback-time").val() , $("#signup-callback-day").val()) ){
 	 			$( ".signup-time-alert" ).show();
 	 		}
 	 		else{
 		$( "#signup-loader" ).show();
 	 	hideFormAlert();
	    $("button.genesis-signup-button").prop('disabled', true);
	    $("#signup-callback-account-number").prop('disabled', true);
        $("#signup-callback-phone").prop('disabled', true);
        $('#signup-callback-day').prop('disabled', true);
        $('#signup-callback-time').prop('disabled', true);
        
 	      $.post('/bin/genesis/callback/schedule', {
 	            	name : ($("#signup-callback-account-number").val().replace(/\s+/g, " ")).replace(/^\s+|\s+$/g, ""),
 	            	day : $("#signup-callback-day").val(),
 	            	time : $("#signup-callback-time").val(),
 	            	phonenumber : $("#signup-callback-phone").val().replace(/\D/g,''),
 	            	t: new Date().getTime()
 	            }, 
 	            function(returnedData){
	 	           if(returnedData.status !== undefined && returnedData.status !== null && returnedData.status == 'success'){
	 	               $('#are-you-a-member').off('click.member',memberHandler );
	 	              $('#are-you-a-member').addClass('disable');
	 				   $(".signup-shedule-result").text("Congratulations! Your appointment has been scheduled.").css("color","green");
	 			   }else{
	 				   $(".signup-shedule-result").text(returnedData.result).css("color","red");
	 				    $("button.genesis-signup-button").prop('disabled', false);
	 				    $("#signup-callback-account-number").prop('disabled', false);
	 			        $("#signup-callback-phone").prop('disabled', false);
	 			        $('#signup-callback-day').prop('disabled', false);
	 			        $('#signup-callback-time').prop('disabled', false);
	 			   }
	 	           $( "#signup-loader").hide();
 			});
 			}
 			}
 		});
 	
 	//validation
 	
		$(".signup-form .form-group input").on("invalid", function() {
			checkSignupCaptcha();
			$(".signup-shedule-result").text("");
	 	});
		$(".signup-form .form-group select").on("invalid", function() {
			checkSignupCaptcha();
			$(".signup-shedule-result").text("");
	 	});
		$(".shedule-form .form-group input").on("invalid", function() {
	 		$(".shedule-result").text("");
		});
		$(".shedule-form .form-group select").on("invalid", function() {
	 		$(".shedule-result").text("");
		});

 	$(".genesis-callback-container button").on("click", function() {
 	 	hideFormAlert();
 	});
 	
 	$("#signup-callback-account-number").on("invalid", function(event) {
 		event.preventDefault();
 	    if( $(this).val() === "" ){
 	    	$(".signup-callback-account-number-empty-alert").show();
 	    }else{
 	    	$(".signup-callback-account-number-rule-alert").show();
 	    }
 	});
 	$("#signup-callback-day").on("invalid", function(event) {
 		event.preventDefault();
 		$(".signup-callback-day-empty-alert").show();
 	});
 	$("#signup-callback-time").on("invalid", function(event) {
 		event.preventDefault();
	    $(".signup-callback-time-empty-alert").show();
 	});
 	$("#signup-callback-phone").on("invalid", function(event) {
 		event.preventDefault();
 		if( $(this).val() === "" ){
 		    $(".signup-callback-phone-empty-alert").show();
 		}else{
 		    $(".signup-callback-phone-rule").show();
 		}
 	});
 	$("#callback-shedule-day").on("invalid", function(event) {
 		event.preventDefault();
    	$(".callback-shedule-day-empty-alert").show();
 	});
 	$("#callback-shedule-time").on("invalid", function(event) {
 		event.preventDefault();
    	$(".callback-shedule-time-empty-alert").show();
 	});
 	$("#callback-shedule-phonenumber").on("invalid", function(event) {
 		event.preventDefault();
 	    if( $(this).val() === "" ){
 	    	$(".callback-shedule-phone-empty-alert").show();
 	    }else{
 	    	$(".callback-shedule-phone-rule").show();
 	    }
 	});
 	$("#login-callback-account-number").on("invalid", function(event) {
 		event.preventDefault();
		$(".login-alert-text").text("");
   	$(".login-callback-account-number-empty-alert").show();
 	});
 	$("#login-callback-password").on("invalid", function(event) {
 		event.preventDefault();
		$(".login-alert-text").text("");
    	$(".login-callback-password-empty-alert").show();
 	});
 	
	$(".forgot-link a").click (function(){
		$('.genesis-callback-container input[type=radio]').prop('checked', false);  
	});
    if($('#genesis-callback-modal').length > 0){//if the page contains genesys component
    	sessionStorage.removeItem('firstName');
    	sessionStorage.removeItem('id');
        $('#genesis-callback-modal').on('shown.bs.modal', function () {
        	sessionStorage.removeItem('firstName');
        	sessionStorage.removeItem('id');
        });
 		
		$(document).on("click touchstart", function(e){
			
			 if($(e.target).attr("class") == "tooltiptext"){
					$("#genesis-callback-modal .tooltiptext").css("visibility","visible");
			          return;
			 }
			 
		     if($(e.target).closest('.orange-default').length){
					$("#genesis-callback-modal .tooltiptext").css("visibility","visible");
			          return;
		     }
			$("#genesis-callback-modal .tooltiptext").css("visibility","hidden");
		});
	}
    
    $("#genesis-callback-modal .orange-default").hover(function(){
		$("#genesis-callback-modal .tooltiptext").css("visibility","visible");
    });
    
    
    var memberHandler = function () {
    	$(".signup-form").hide();
    	$(".login-form").show();
    };
    
    $('#are-you-a-member').on('click.member',memberHandler );
    
});

$(document).ready(function() {
   
  /* eslint-disable-next-line */
  $('.exchange-rates').on('keyup','#exchange-rate-table-search', function (event) { 
      /* eslint-disable-next-line */
     var input, filter, table, tr, td, i, txtValue, col2, col2Text;
	  
	  var value = $(this).val().toUpperCase(),
	  	 rows = $("#exchange-rate-table-body").find("tr");
	  
	  
	  rows.each(function(index, item){
		  
		  var tds = $(item).find("td"),
		  	  col1 = $(tds[0]).text(),
		  	  col2 = $(tds[1]).text();
		  
		  if(tds.length){
			  
			  if(col1.toUpperCase().indexOf(value) > -1 || col2.toUpperCase().indexOf(value) > -1){
				  $(item).show();
				  
			  }else{
				  $(item).hide();
			  }
		  }
	  });
	 
  });

  
	/* eslint-disable-next-line */
	$('.exchange-rates').on('keyup','#buy-calc-input', function (event) { 
      $(this).val(updatedAmount($(this).val()));  
  });
	/* eslint-disable-next-line */
	$('.exchange-rates').on('keyup','#sell-calc-input', function (event) { 
      $(this).val(updatedAmount($(this).val()));
  });
	
  function updatedAmount(num) { 
	  /* eslint-disable */
	num = num.replace(/[^\d\.]/g,'');
    if (num !=null && num.toString().indexOf(".") != -1) {
        var num_part = num.toString().split(".")[0]; 
        var decimal_part = num.toString().split(".")[1];
        return retAlloweDigits(num_part, 5) +"."+ retAlloweDigits(decimal_part, 5);
      } else {
         if (!num.isNAN) { 
		   return retAlloweDigits(num, 5);
		 } else {
		   return 0;
		 } 
      }
  }
  /*eslint-enable*/
  function retAlloweDigits(num, len) {
	  var digits_length = num.length >= len ? len : num.length;
    return  num.substring(0, digits_length)  ;
  }	
  
  $( ".exchange-rates" ).on('change','#buy-calc-select', buySelect);
	
 function buySelect() {

	  
	  var rateObj = {};
	  	  
    var currencySelector = $('#buy-calc-select').find(':selected');
    
    if(currencySelector.length){
    
	      rateObj.country = currencySelector.data('country');
	      rateObj.currency = currencySelector.data('currency');
	      rateObj.buy = currencySelector.data('buy');
	      rateObj.sell = currencySelector.data('sell');
	      
	      $("#buy-rate-label").text("1 "+ rateObj.country + " (" + rateObj.currency + ") = " + rateObj.buy + " U.S. dollar (USD)");
	      $('#buy-calc-input-label').text(rateObj.currency);
	      $('#buy-calc-input').val('');
	      $('#buy-calc-usd-result').val('');	    
    }
  }


 $( ".exchange-rates" ).on('click','#buy-calc-button', buyCalcConvert);


 function buyCalcConvert(){
	  
	  var rateObj = {};
	  var currencySelector = $('#buy-calc-select').find(':selected');

	  if(currencySelector.length){
	      rateObj.country = currencySelector.data('country');
	      rateObj.currency = currencySelector.data('currency');
	      rateObj.buy = currencySelector.data('buy');
	      rateObj.sell = currencySelector.data('sell');
	
		  var amount = $('#buy-calc-input').val();
		
		  var val = 0;
		  val = amount * rateObj.buy;
		  
		  val = val.toFixed(7);
		  $('#buy-calc-usd-result').val(val);
		 
	  }
	  
 } 

 $( ".exchange-rates" ).on('change','#sell-calc-select', sellSelect);
 
function sellSelect() {
	  
	  var rateObj = {};
	  
    var currencySelector = $('#sell-calc-select').find(':selected');
    
    if(currencySelector.length){
    
	      rateObj.country = currencySelector.data('country');
	      rateObj.currency = currencySelector.data('currency');
	      rateObj.sell = currencySelector.data('sell');
	      
	      $("#sell-rate-label").text("1 "+ rateObj.country + " (" + rateObj.currency + ") = " + rateObj.sell + " U.S. dollar (USD)");
	      $('#sell-calc-input-label').text(rateObj.currency);
	      $('#sell-calc-usd-result').val('');
	      $('#sell-calc-input').val('');
    }
 }

 $( ".exchange-rates" ).on('click','#sell-calc-button',sellCalcConvert);
  
 function sellCalcConvert(){	  
	  var rateObj = {};
	  
	  var currencySelector = $('#sell-calc-select').find(':selected');

	  if(currencySelector.length){
		  
	      rateObj.country = currencySelector.data('country');
	      rateObj.currency = currencySelector.data('currency');
	      rateObj.buy = currencySelector.data('buy');
	      rateObj.sell = currencySelector.data('sell');
	
		  var amount = $('#sell-calc-input').val();
		
		  var val = 0;
		  val = amount * rateObj.sell;
		  
		  val = val.toFixed(7);
		  $('#sell-calc-usd-result').val(val);
				  
	  }
	  
 }

});

    
function roundDecimals(num, dec) {
	return (Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);
}
function calculateGeneralLoanPayment() {
	var loanAmounts = $('.loan-amount').map(function(){
	       return this.value;
	   }).get(),
	 rates = $('.rate').map(function(){
	       return this.value;
	   }).get(),
	 terms = $('.term').map(function(){
	       return this.value;
	   }).get(),
	 totalAmountFields = $('.general-monthly-payment');
	 calculateLoan(loanAmounts,rates,terms,[],[], totalAmountFields);
}
function calculateMortgageLoanPayment() {
	var loanAmounts = $('.mortgage-loan-amount').map(function(){
	       return this.value;
	   }).get(),
	 rates = $('.mortgage-rate').map(function(){
	       return this.value;
	   }).get(),
	 terms = $('.mortgage-term').map(function(){
	       return this.value;
	   }).get(),
	 propertyTaxs = $('.property-tax').map(function(){
	       return this.value;
	   }).get(),
	 insurances = $('.insurance').map(function(){
	       return this.value;
	   }).get(),
	 totalAmountFields = $('.mortgage-monthly-payment');
	 calculateLoan(loanAmounts,rates,terms,propertyTaxs,insurances, totalAmountFields);
}
function calculateLoan(loanAmounts,rates,terms,propertyTaxs,insurances,totalAmountFields){
	 $.each(loanAmounts, function(i) {
		var paymentAmount = 0;
			if ($.isNumeric(loanAmounts[i]) && 
					loanAmounts[i] > 0 &&
				$.isNumeric(rates[i]) && 
				rates[i] > 0 && 				
				$.isNumeric(terms[i]) && 
				terms[i] > 0) {
				/*
				Loan Payment Amount Formula.
				P = ( r * A ) / ( 1 - (1+r)-N) Where, 
				P = Payment Amount 
				A = Loan Amount 
				r = Rate of Interest (compounded) 
				N = Number of Payments
				Rate of Interest Compounded is,  
				If Monthly,  r = i / 1200 and N = n * 12 
				If Quarterly,  r = i / 400 and N = n * 4 
				If Half yearly,  r = i / 200 and N = n * 2 
				If Yearly,  r = i / 100 and N = n				
				*/				
				var loanAmountVal = loanAmounts[i]; /* loan amount */
				var rateVal = rates[i] / 1200; /* monthly compounded rate */
				var numPayments = terms[i] * 12; /* number of payments */
				if (propertyTaxs[i] && $.isNumeric(propertyTaxs[i])) {
					var propertyTaxVal = propertyTaxs[i] / 12; /* monthly property tax */	
				} else {
					// eslint-disable-next-line
					var propertyTaxVal = 0;	
				}		
				if (insurances[i] && $.isNumeric(insurances[i])) {
					var insuranceVal = insurances[i] / 12; /* monthly insurance */
				} else {
					/* eslint-disable-next-line */
					var insuranceVal = 0;	
				}
				paymentAmount = (rateVal * loanAmountVal) / (1 - (Math.pow(1 + rateVal, numPayments * -1)));
				paymentAmount = paymentAmount + propertyTaxVal + insuranceVal;
			}
			$(totalAmountFields[i]).html("$" + roundDecimals(paymentAmount, 2));
	 });
}
/* eslint-disable */
function configureLoanCalculator() {
	calculateGeneralLoanPayment();
	calculateMortgageLoanPayment();
	$(".form-calc input").on("change keyup input", calculateGeneralLoanPayment);
	$(".form-calc input").on("change keyup input", calculateMortgageLoanPayment);
	$(".loan-amount").mask("000099.99");
	$('.mortgage-loan-amount').mask("000099.99");
	$(".term").mask("09");
	$('.mortgage-term').mask("09");
	$(".rate").mask("09.999");
	$('.mortgage-rate').mask("09.999");
	$('.property-tax').mask("00099");
	$('.insurance').mask("00099");
}

function roundDecimals(num, dec) {
	var result = (Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);
	return result;
}
function calcEarnings(){
	
	var initialDeposits = $('.initial-deposit').map(function(){
	       return this.value;
	   }).get(),
	 dividentRates = $('.dividend-rate').map(function(){
	       return this.value;
	   }).get(),
	 terms = $('.savings-term').map(function(){
	       return this.value;
	   }).get(),
	 monthlyDiposits = $('.monthly-deposit').map(function(){
	       return this.value;
	   }).get(),
	 finalBalence = $('.final-balance'),
	 amountEarned = $('.amount-earned');
	
    $.each(initialDeposits, function(i) {
    	var earnings = 0;
    	var addInt = 0;
		if ($.isNumeric(initialDeposits[i]) && 
				initialDeposits[i] >= 0 &&
			$.isNumeric(dividentRates[i]) && 
			dividentRates[i] > 0 && 				
			$.isNumeric(terms[i]) && 
			terms[i] > 0 &&
			$.isNumeric(monthlyDiposits[i]) &&
			monthlyDiposits[i] >= 0) {				
				var initialDepositVal = parseFloat(initialDeposits[i]);
				var intRate = parseFloat(dividentRates[i]/1200);
				var monthlyDepositVal = parseFloat(monthlyDiposits[i]);
				var months = parseInt(terms[i]);
				earnings = initialDepositVal;
				addInt = 0;			
				for (var x = 1; x <= months; x++) {
					earnings += monthlyDepositVal;
					addInt += (earnings * intRate);
					earnings += (earnings * intRate);
				}
		}
		$(finalBalence[i]).html("$" + roundDecimals(earnings, 2));
		$(amountEarned[i]).html("$" + roundDecimals(addInt, 2));		
 
    });
}
/* eslint-disable-next-line */
function configureSavingsCalculator() {
	calcEarnings();
	$(".form-calc input").on("change keyup input", calcEarnings);
	$(".initial-deposit").mask("000999.99");
	$(".dividend-rate").mask("99.99");
	$(".monthly-deposit").mask("09999.99");
	$(".savings-term").mask("09");	
}

$(document).ready(function() {	
	try{
		// eslint-disable-next-line
		configureSavingsCalculator();
	}catch(e){
		console.log("Error in loan calculation:"+e.messgae);
	}
	try{
		// eslint-disable-next-line
		configureLoanCalculator();
	}catch(e){
		console.log("Error in savings calculation:"+e.messgae);
	}

});
(function ($) {
    // VERTICALLY ALIGN FUNCTION
    $.fn.vAlign = function(position) {
    	/*eslint-disable*/ 
        return this.each(function(i){
			/*eslint-enable*/
        	var $this = $(this);
        	if(! $this.hasClass("feature-tile-button")){
				/*eslint-disable*/
				var ah = $this.parents(".col").height();
				/*eslint-enable*/
	            var siblings = $this.parents(".col").siblings().length;
	            var ph = $this.parents(".row").height();
	            
	            var mh = 0;
	           
	            if(siblings >= 1){
	            
		            if (position == 'middle') {
		            
		            	mh = ((ph - 95) / 2); //subtracting the 35px margin-top 
		            	if(mh > 2){
		            		$this.css('margin-top', mh);
		            	}
		            	
		            } else if (position == 'bottom') {
		            
		            	mh = (ph) - 95;
		            	
		            	if(mh > 2){
		            		$this.css('margin-top', mh);
		            		$this.css('margin-bottom', 0);
		            	}
		
		            } else if (position == 'top') {
	
		            	$this.css('margin-top', 0);
		            }
        		}
        	}
        });
    };
    
    /*function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });*/
})(jQuery);

function alignButtons(width) {
	
	 var screen_width = $(window).width();
	 
	 if(screen_width > 768){
		var middleWidth = $('.btn-afcu-middle').closest('.col').width();
		if (middleWidth && (width - middleWidth > 100)) {
			$('.btn-afcu-middle').parent().vAlign('middle');
		}
		
		$('.btn-afcu-top').parent().vAlign('top');
		$('.btn-afcu-bottom').parent().vAlign('bottom');
	 }
}

$(document).ready(function () {
	alignButtons($(window).width());
	$(".inline-button").parent().addClass('inline-button-parent');
});


$(document).ready(function() {	
/*eslint-disable*/ 
$('.panel-group .panel-default').on('click', function(){
		
		$accordianAriaExpandedAttr = $(this).find('.accordion-toggle').attr('aria-expanded');
		 
		 if ($accordianAriaExpandedAttr == "true") {
			 $accordianAriaExpandedAttr = "false";
		  } else {
			  $accordianAriaExpandedAttr = "true";
				  }

		 $(this).find('.accordion-toggle').attr('aria-expanded',$accordianAriaExpandedAttr);

});

$('.panel-group').on('shown.bs.collapse', function() {
	 $(this).find(".panel-body").focus();
	});
 /*eslint-enable*/
});
$(document).ready(function(){
	
	var iconLeft = 'chevron-left',
		iconRight = 'chevron-right',
		quickBarOpen = 'cbp-spmenu-open',
		quickButtonOpen = 'quick-links-open';
		
	$('.cbp-spmenu').find("a").attr('tabindex',"-1");
	
	$('#quick-links-button').on('click', function(){
		 var $quickButton = $('.quick-links-container'),
		 	$icon = $quickButton.find('.chevron-afcu'),
		 	$quickContainer = $('.cbp-spmenu'),
		 	$quickButtonAriaExpandedAttr = $quickButton.attr('aria-expanded');
		 
		 if ($quickButtonAriaExpandedAttr == "true") {
			 $quickButtonAriaExpandedAttr = "false"
			 $quickContainer.attr('tabindex',"-1");
			 $quickContainer.find("a").attr('tabindex',"-1");
			 $quickContainer.attr('aria-hidden',"true");
			 
			 
		  } else {
			  $quickButtonAriaExpandedAttr = "true"
			  $quickContainer.attr('tabindex',"0");
			  $quickContainer.find("a").attr('tabindex',"0");
			  $quickContainer.attr('aria-hidden',"false");
		  }
		 
		 $quickButton.attr('aria-expanded',$quickButtonAriaExpandedAttr);
		 $quickButton.toggleClass(quickButtonOpen);
		 $icon.toggleClass(iconLeft);
		 $icon.toggleClass(iconRight);
		 $quickContainer.toggleClass(quickBarOpen);
	});
});
$(document).ready(function(){

	if($('#login-widget').length > 0){//if the page contains login component
	
		$(document).on("click touchstart", function(e){
			
			 if($(e.target).attr("class") == "tooltiptext"){
					$("#login-widget .tooltiptext").css("visibility","visible");
			          return;
			 }
			 
		     if($(e.target).closest('.orange-default').length){
					$("#login-widget .tooltiptext").css("visibility","visible");
			          return;
		     }
			$("#login-widget .tooltiptext").css("visibility","hidden");
		});
	}
	
	$("#login-widget .orange-default").hover(function(){
		$("#login-widget .tooltiptext").css("visibility","visible");
    });

	$( "#login-widget .login-widget-form" ).submit(function( event ) {
	    var accountID = $(this).find("#txtUserID").val();
	    if(accountID == "" || accountID == null || accountID == undefined){
	    	$(this).attr('action', $(this).data("banking")).submit();
	    }else{
	    	$(this).attr('action', $(this).data("login")).submit();
	    }
	});
});
$(document).ready(function () {
	
	if(typeof wcmModeCheck !== 'undefined')
	 if(!wcmModeCheck.isWcmEdit){
		var heroSliderDesktopId = "#hero-slider-desktop";
		var heroSliderMobileId = "#hero-slider-mobile";
	
		$(heroSliderDesktopId).slick({ 
			autoplay: true,
	    	autoplaySpeed: 5000,
	    	fade: true,
	    	speed: 1000,
			dots: true,
			prevArrow: '<a href="javascript:void(0);" aria-label="previous arrow"><i class="icon-arrow-hero-left d-none d-lg-block slick-arrow slick-prev"></i></a>',
	        nextArrow: '<a href="javascript:void(0);" class="slick-next-arrow" aria-label="next arrow"><i class="icon-arrow-hero-right d-none d-lg-block slick-arrow slick-next"></i></a>',
	        //slick dots button adding aria-label
	        customPaging: function(slider, i) {
	        	var sliderTitle = (slider.$slides[i].attributes.title ? slider.$slides[i].attributes.title.value : 'slide '+(i+1));
	        	var buttonTag;  	
	            buttonTag = $('<button type="button" data-role="none" role="button" aria-label="'+sliderTitle+'" tabindex="0" />').text(i + 1);
	            return buttonTag;
	        },
	        slide: 'div.hero-carousel-slide'
		});
		
		$(heroSliderMobileId).slick({ 
			autoplay: true,
			autoplaySpeed: 5000,
			fade: true,
			speed: 1000,
			dots: true,
			prevArrow: '<a href="javascript:void(0);" aria-label="previous arrow"><i class="icon-arrow-hero-left d-none d-lg-block slick-arrow slick-prev"></i></a>',
			nextArrow: '<a href="javascript:void(0);" class="slick-next-arrow" aria-label="next arrow"><i class="icon-arrow-hero-right d-none d-lg-block slick-arrow slick-next"></i></a>',
			//slick dots button adding aria-label
			customPaging: function(slider, i) {
				var sliderTitle = (slider.$slides[i].attributes.title ? slider.$slides[i].attributes.title.value : 'slide '+(i+1));
				var buttonTag;  	
				buttonTag = $('<button type="button" data-role="none" role="button" aria-label="'+sliderTitle+'" tabindex="0" />').text(i + 1);
				return buttonTag;
			},
			slide: 'div.hero-carousel-slide'
		});
	
		$('#hero-slider-desktop').on('afterChange', function(event, slick, currentSlide){
		  
			//Adds offscreen text for active slide button
			var dotClassName = $(this).find(".slick-dots li");
			$(dotClassName).each(function(index) {
				if($(this).hasClass("slick-active")){
					var spanCurrentText = $("<span />", {
					    "class": "offscreen"
					});
					spanCurrentText.text("(Current Slide)"); 
					$(this).find("button").append(spanCurrentText);
				}else{
					$(this).find("button .offscreen").remove();
				}
			});
	
		});
		$('#hero-slider-mobile').on('afterChange', function(event, slick, currentSlide){
			
			//Adds offscreen text for active slide button
			var dotClassName = $(this).find(".slick-dots li");
			$(dotClassName).each(function(index) {
				if($(this).hasClass("slick-active")){
					var spanCurrentText = $("<span />", {
						"class": "offscreen"
					});
					spanCurrentText.text("(Current Slide)"); 
					$(this).find("button").append(spanCurrentText);
				}else{
					$(this).find("button .offscreen").remove();
				}
			});
			
		});
	}
});
/* Start hero.js */
$(document).ready(function () {
  var banner = $('.page-banner'),
  	  imgSrc = banner.attr("data-img-src"),
  	  altText = banner.attr("data-img-alt");
  
  if (imgSrc) {
    $('.page-banner').backstretch(imgSrc);
    $('.page-banner .backstretch img').attr("alt", altText);
  }
});
$(document).ready(function(){
    /********************************************
	Megamenu (yamm) settings
	********************************************/
	/* This code will prevent unexpected menu close when using some components (like accordion, forms, etc) */
	$(document).on('click', '.yamm .dropdown-menu', function(e) {
		e.stopPropagation();
	});

    /*******************************************
    Shrinking Navbar and Change Logo on Scroll
    *******************************************/
    var tallLogoSrc = $('#change-logo').attr('src');
    var shortLogoSrc = $('#short-logo').attr('src');
    var scrollBreakpoint = 300;
    function getCurrentScroll() {
        return window.pageYOffset;
    }
    function handleScroll() {
        var scroll = getCurrentScroll();
        if ( scroll >= scrollBreakpoint ) {
            $('.navbar-scroll').addClass('shrink');
            $('#nav-login-desktop').addClass('shrink');
            $('#nav-login-tablet').addClass('shrink');
            $('.navbar-brand').addClass('shrink');
            $('.dropdown-menu').addClass('shrink');
            $('.img-scroll').addClass('shrink');
            $('#change-logo').attr("src", shortLogoSrc);
        } else {
            $('.navbar-scroll').removeClass('shrink');
            $('#nav-login-desktop').removeClass('shrink');
            $('#nav-login-tablet').removeClass('shrink');
            $('.navbar-brand').removeClass('shrink');
            $('.dropdown-menu').removeClass('shrink');
            $('.img-scroll').removeClass('shrink');
            $('#change-logo').attr("src", tallLogoSrc);
        }
    }

    $(window).scroll(handleScroll);
    handleScroll();
    /*******************************************
    Smart App Banner Settings
    *******************************************/
    /*var bannerSelector = $('#mobileAppBanner');*/
    $.smartbanner({
        title: 'AFCU Mobile Banking',
        author: 'America First Credit Union',
        price: 'FREE', // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: 'On the App Store', // Text of price for iOS
        inGooglePlay: 'In Google Play', // Text of price for Android
        inAmazonAppStore: 'In the Amazon Appstore',
        inWindowsStore: 'In the Windows Store', // Text of price for Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        iconGloss: false, // Force gloss effect for iOS even for precomposed
        url: null,
        button: 'VIEW', // Text for the install button
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 365, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 180,
        force: null,
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true ,
        appendToSelector: 'body' //Append the banner to a specific selector
    });
});
/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
!function ($) {
    var SmartBanner = function (options) {
        this.origHtmlMargin = parseFloat($('html').css('margin-top')) // Get the original margin-top of the HTML element so we can take that into account
        this.options = $.extend({}, $.smartbanner.defaults, options)

        var standalone = navigator.standalone // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
          , UA = navigator.userAgent

        // Detect banner type (iOS or Android)
        if (this.options.force) {
            this.type = this.options.force
        } else if (UA.match(/Windows Phone 8/i) != null && UA.match(/Touch/i) !== null) {
            this.type = 'windows'
        } else if (UA.match(/iPhone|iPod/i) != null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
            if (UA.match(/Safari/i) != null &&
               (UA.match(/CriOS/i) != null ||
               window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) > 6)) this.type = 'ios' // Check webview and native smart banner support (iOS 6+)
        } else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
            this.type = 'kindle'
        } else if (UA.match(/Android/i) != null) {
            this.type = 'android'
        }

        // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner
        if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
            return
        }

        // Calculate scale
        this.scale = this.options.scale == 'auto' ? $(window).width() / window.screen.width : this.options.scale
        if (this.scale < 1) this.scale = 1

        // Get info from meta data
        var meta = $(this.type == 'android' ? 'meta[name="google-play-app"]' :
            this.type == 'ios' ? 'meta[name="apple-itunes-app"]' :
            this.type == 'kindle' ? 'meta[name="kindle-fire-app"]' : 'meta[name="msApplication-ID"]');
        if (meta.length == 0) return

        // For Windows Store apps, get the PackageFamilyName for protocol launch
        if (this.type == 'windows') {
            this.appId = $('meta[name="msApplication-PackageFamilyName"]').attr('content');
        } else {
            // Try to pull the appId out of the meta tag and store the result
            var parsedMetaContent = /app-id=([^\s,]+)/.exec(meta.attr('content'));

            if(parsedMetaContent) {
              this.appId = parsedMetaContent[1];
            } else {
              return;
            }
        }

        this.title = this.options.title ? this.options.title : meta.data('title') || $('title').text().replace(/\s*[|\-·].*$/, '')
        this.author = this.options.author ? this.options.author : meta.data('author') || ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') : window.location.hostname)
        this.iconUrl = meta.data('icon-url');
        this.price = meta.data('price');

        // Create banner
        this.create()
        this.show()
        this.listen()
    }

    SmartBanner.prototype = {

        constructor: SmartBanner

      , create: function() {
            var iconURL
              , link=(this.options.url ? this.options.url : (this.type == 'windows' ? 'ms-windows-store:navigate?appid=' : (this.type == 'android' ? 'market://details?id=' : (this.type == 'kindle' ? 'amzn://apps/android?asin=' : 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id'))) + this.appId)
              , price = this.price || this.options.price
              , inStore=price ? price + ' - ' + (this.type == 'android' ? this.options.inGooglePlay : this.type == 'kindle' ? this.options.inAmazonAppStore : this.type == 'ios' ? this.options.inAppStore : this.options.inWindowsStore) : ''
              , gloss=this.options.iconGloss === null ? (this.type=='ios') : this.options.iconGloss

            if (this.type == 'android' && this.options.GooglePlayParams) {
              link = link + '&referrer=' + this.options.GooglePlayParams;
            }

          
          var hideMobilePrompt = $("#hideMobilePrompt").val();
          if(hideMobilePrompt == 'false'){
              var banner = '<div id="smartbanner" class="hideMobilePrompt '+this.type+'"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>'+this.title+'</strong><span>'+this.author+'</span><span>'+inStore+'</span></div><a href="'+link+'" class="sb-button"><span>'+this.options.button+'</span></a></div></div>';
          }
          else{
            var banner = '<div id="smartbanner" class="'+this.type+'"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>'+this.title+'</strong><span>'+this.author+'</span><span>'+inStore+'</span></div><a href="'+link+'" class="sb-button"><span>'+this.options.button+'</span></a></div></div>';
          }
            (this.options.layer) ? $(this.options.appendToSelector).append(banner) : $(this.options.appendToSelector).prepend(banner);

            if (this.options.icon) {
                iconURL = this.options.icon
            } else if(this.iconUrl) {
                iconURL = this.iconUrl;
            } else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href')
                if (this.options.iconGloss === null) gloss = false
            } else if ($('link[rel="apple-touch-icon"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon"]').attr('href')
            } else if ($('meta[name="msApplication-TileImage"]').length > 0) {
              iconURL = $('meta[name="msApplication-TileImage"]').attr('content')
            } else if ($('meta[name="msapplication-TileImage"]').length > 0) { /* redundant because ms docs show two case usages */
              iconURL = $('meta[name="msapplication-TileImage"]').attr('content')
            }

            if (iconURL) {
                $('#smartbanner .sb-icon').css('background-image','url('+iconURL+')')
                if (gloss) $('#smartbanner .sb-icon').addClass('gloss')
            } else{
                $('#smartbanner').addClass('no-icon')
            }

            this.bannerHeight = $('#smartbanner').outerHeight() + 2

            if (this.scale > 1) {
                $('#smartbanner')
                    .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
                    .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
                    .hide()
                $('#smartbanner .sb-container')
                    .css('-webkit-transform', 'scale('+this.scale+')')
                    .css('-msie-transform', 'scale('+this.scale+')')
                    .css('-moz-transform', 'scale('+this.scale+')')
                    .css('width', $(window).width() / this.scale)
            }
            $('#smartbanner').css('position', (this.options.layer) ? 'absolute' : 'static')
        }

      , listen: function () {
            $('#smartbanner .sb-close').on('click',$.proxy(this.close, this))
            $('#smartbanner .sb-button').on('click',$.proxy(this.install, this))
        }

      , show: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({top: 0, display: 'block'}, this.options.speedIn).addClass('shown').show();
                $(this.pushSelector).animate({paddingTop: this.origHtmlMargin + (this.bannerHeight * this.scale)}, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    banner.animate({top:0},this.options.speedIn).addClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $(this.pushSelector).addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedIn).css('margin-top', this.origHtmlMargin+(this.bannerHeight*this.scale));
                } else {
                    banner.slideDown(this.options.speedIn).addClass('shown');
                }
            }
        }

      , hide: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({top: -1 * this.bannerHeight * this.scale, display: 'block'}, this.options.speedIn).removeClass('shown');
                $(this.pushSelector).animate({paddingTop: this.origHtmlMargin}, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    if ( this.type !== 'android' )
                      banner.css('top', -1*this.bannerHeight*this.scale).removeClass('shown');
                    else
                      banner.css({display:'none'}).removeClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $(this.pushSelector).addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedOut).css('margin-top', this.origHtmlMargin);
                } else {
                    banner.slideUp(this.options.speedOut).removeClass('shown');
                }
            }
        }

      , close: function(e) {
            e.preventDefault()
            this.hide()
            this.setCookie('sb-closed','true',this.options.daysHidden);
        }

      , install: function(e) {
			if (this.options.hideOnInstall) {
				this.hide()
			}
            this.setCookie('sb-installed','true',this.options.daysReminder)
        }

      , setCookie: function(name, value, exdays) {
            var exdate = new Date()
            exdate.setDate(exdate.getDate()+exdays)
            value=encodeURI(value)+((exdays==null)?'':'; expires='+exdate.toUTCString())
            document.cookie=name+'='+value+'; path=/;'
        }

      , getCookie: function(name) {
            var i,x,y,ARRcookies = document.cookie.split(";")
            for(i=0;i<ARRcookies.length;i++) {
                x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="))
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1)
                x = x.replace(/^\s+|\s+$/g,"")
                if (x==name) {
                    return decodeURI(y)
                }
            }
            return null
        }

      // Demo only
      , switchType: function() {
          var that = this

          this.hide(function () {
              that.type = that.type == 'android' ? 'ios' : 'android'
              var meta = $(that.type == 'android' ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr('content')
              that.appId = /app-id=([^\s,]+)/.exec(meta)[1]

              $('#smartbanner').detach()
              that.create()
              that.show()
          })
      }
    }

    $.smartbanner = function (option) {
        var $window = $(window)
        , data = $window.data('smartbanner')
        , options = typeof option == 'object' && option
        if (!data) $window.data('smartbanner', (data = new SmartBanner(options)))
        if (typeof option == 'string') data[option]()
    }

    // override these globally if you like (they are all optional)
    $.smartbanner.defaults = {
        title: null, // What the title of the app should be in the banner (defaults to <title>)
        author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
        price: 'FREE', // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: 'On the App Store', // Text of price for iOS
        inGooglePlay: 'In Google Play', // Text of price for Android
        inAmazonAppStore: 'In the Amazon Appstore',
        inWindowsStore: 'In the Windows Store', //Text of price for Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        iconGloss: null, // Force gloss effect for iOS even for precomposed
        button: 'VIEW', // Text for the install button
        url: null, // The URL for the button. Keep null if you want the button to link to the app store.
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
        force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
        appendToSelector: 'body', //Append the banner to a specific selector
		pushSelector: 'html' // What element is going to push the site content down; this is where the banner append animation will start.
    }

    $.smartbanner.Constructor = SmartBanner;


    // ============================================================
    // Bootstrap transition
    // Copyright 2011-2014 Twitter, Inc.
    // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

    function transitionEnd() {
        var el = document.createElement('smartbanner')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {end: transEndEventNames[name]}
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    if ($.support.transition !== undefined)
        return  // Prevent conflict with Twitter Bootstrap

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false, $el = this
        $(this).one($.support.transition.end, function() {
            called = true
        })
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function() {
        $.support.transition = transitionEnd()
    })
    // ============================================================

}(window.jQuery);
$(document).ready(function(){

	if($('.search-results').length > 0){//if it's search page
	
		$(".full-width").on("click", function(e){
			
			 if($(e.target).attr("class") == "dropdown-menu show")
		          return;
			 
		     if($(e.target).closest('.dropdown-menu.show').length)
		          return; 		
			
			var searchButton = $('#headerSearchButton'),
					dropdown = searchButton.children(".show");
					
					if(searchButton.length){
						
						if(searchButton.hasClass("show")){
								
							dropdown.removeClass("show");
							searchButton.removeClass("show");
						}
						
					}

		});
	}
});
$(document).ready(function() {

	    $(".notification-alert").on('shown.bs.collapse','#notification-details', function () {
		  $.cookie("isNotificationBarExpanded", "true",{ path: '/' });
	    });

	    $(".notification-alert").on('hidden.bs.collapse','#notification-details', function () {
	       $.cookie("isNotificationBarExpanded", "false",{ path: '/' });
	    });

});


$(document).ready(function() {
	
	var hash = window.location.hash;
	//window.location.hash = "";
	
    function slowScroll(selector) {
        var $selector = $(selector);
        
        
        if ($selector.length) {
            if(selector === '#notification-details'){
                return;
            }
        	var top = $(selector).offset().top;
        	if( top <= 0){
        		//it could be accordion collapsed 
        		if($('.afcu-accordion '+ selector ).length > 0)
        			top = $('.afcu-accordion '+ selector ).parents('.afcu-accordion').offset().top;
        	}
        	
        	if(top > 0){
	            $('html, body').animate({
	                scrollTop: (top - 50)
	            }, 1000, function() {
	                console.log(window.scrollY);
	            });
        	}
        }
    }
    /* For anchor links within the same page */
    $("a[href^='#']").click(function(e) {
        e.preventDefault();
        slowScroll(this.hash);
    });
    
    
    /* For anchor links from an external page or loading a url with an anchor directly */
    if (hash) {
        if ($(hash).length) {
            slowScroll(location.hash);
        } else {
            hash = hash.replace('#', '');
            slowScroll('a[name="'+hash+'"]');
        }
    }
    
    /*
     * Function to create the cookie for target
     *
     */
    function createTargetCampaignCookie(){
    	
    	var cid = getUrlParam("cid");
   	
    	if(cid != null && cid.length > 0)
    		$.cookie('campaign-cookie', cid, { expires: 7, path: '/'});
    	
    }
    
    /*
     * Function to fetch the paramter values using the URL
     *
     */
     function getUrlParam(name) {
         var regExp = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)');
         var params = regExp.exec(window.location.search);
         var data = "";
         if (params && params.length > 0) {
             data = decodeURIComponent(params[1]);
         }
         return data;
     }
     
     
     createTargetCampaignCookie();
     
     
     window.onhashchange = function(){
    	 $modal = $(window.location.hash);
    	 
    	 if($modal.length && $modal.hasClass("modal")){
    		 $modal.modal("show");
    	 }
     } 
     
     
     $(".nav-item a").click(function(e){
    	 var $this = $(this);
    	 
    	var href =  $this.attr("href") + "";
    	var hashValue = window.location.hash; 
    	if(href.indexOf(hashValue) > 0){
    		
    		if($(hashValue).length)
    			$(hashValue).modal("show");
    	}
    	 
     });
});
