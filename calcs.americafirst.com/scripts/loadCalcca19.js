/*this script loads an embed calc into a target div using an AJAX call*/
/*author: kent */
/* load jQuery if not loaded*/
function addScript(src) {
	var s = document.createElement('script');
	s.setAttribute('src', src);
	document.getElementsByTagName('head')[0].appendChild(s);
}

var refreshAllScripts = false;
if (typeof jQuery == 'undefined') {
	refreshAllScripts = true;
	addScript("https://code.jquery.com/jquery-2.2.1.min.js");
}

if (typeof Tipped == 'undefined') {
	refreshAllScripts = true;
	addScript("https://www.calcxml.com/scripts/tipped/comboTipped.js");
}

function refreshScripts() {
    var scriptTag = document.getElementsByTagName('script');
    var src;

    for (var i = 0; i < scriptTag.length; i++) {
        src = scriptTag[i].src;
        scriptTag[i].parentNode.removeChild(scriptTag[i]);
        addScript(src);
    }
};

/*get url parameters from script url*/
var scripts = document.getElementsByTagName('script');
var scriptIndex = scripts.length - 1;
while(scriptIndex >= 0 && (scripts[scriptIndex].src == null || scripts[scriptIndex].src.indexOf("/loadCalc.js") < 0)) scriptIndex--;
var scriptURL = scripts[scriptIndex].src;

var lang = getURLParameter('lang');
var calcTarget = getURLParameter('calcTarget');
var secure = getURLParameter('secure');
var skn = getURLParameter('skn');
var targetDiv = getURLParameter('targetDiv');
var test = 'false';
var website = 'www';
var tabs = getURLParameter('tabs');

var passAlongParams = scriptURL.substring(scriptURL.indexOf('&secure=1') + 9);
console.log(passAlongParams);
if (passAlongParams.indexOf("loadCalc.js") > 1){
	passAlongParams = "";
}

if (scriptURL.indexOf("test1") > -1){
	test = 'true';
	website = 'test1';
}

if (scriptURL.indexOf("https://") > -1){
	secure = '1';
}

if (targetDiv != null && targetDiv != ""){
	targetDiv = targetDiv.substring(0,16);
} else {
	targetDiv = 'calc';
}

function getURLParameter(name) {
	/*retrieve url parameter*/
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(scriptURL)||[,""])[1].replace(/\+/g, '%20'))||null
}

if (skn == 570){
	//time inc specific code -- need to load here for pageview tracking to work on first try
	var s_account="devtimecom"; // change to "timecom" for prod.
	addScript("http://img.timeinc.net/tii/omniture/h/config/time_s_code_multivideo.js");
}

/*include scripts for specific calcs so they work the first time*/
var webproto = "http";
if (secure == '1') {
	webproto = "https";
}
if (calcTarget == 'hom04' || calcTarget == "hom08" || calcTarget == "hom10" || calcTarget == 'fixed-or-adjustable-rate-mortgage'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/responsive2Hom04.js");
}
if (calcTarget == 'bus07' || calcTarget == 'financial-ratio-analysis'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Bus07.js");
}
if (calcTarget == 'qua14'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/responsive2Qua14.js");
}
if (calcTarget == 'bus08' || calcTarget == 'total-compensation'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Bus08.js");
}
if (calcTarget == 'det10' || calcTarget == 'pay-off-debt-or-invest'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Det10.js");
}
if (calcTarget == 'hom03' || calcTarget == 'mortgage-calculator'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Hom03.js");
}
if (calcTarget == 'qua10' || calcTarget == 'impact-of-borrowing-from-my-retirement-plan'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Qua10.js");
}
if (calcTarget == 'qua11'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Qua11.js");
}
if (calcTarget == 'qua15' || calcTarget == '72t'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Qua15.js");
}
if (calcTarget == 'qua30'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Qua30.js");
}
if (calcTarget == 'ret02' || calcTarget == 'retirement-calculator'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Ret02.js");
}
if (calcTarget == 'ins01' || calcTarget == 'life-insurance-calculator'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Ins01.js");
}

if (calcTarget == 'ret03' || calcTarget == 'are-my-current-retirement-savings-sufficient'){
	addScript(webproto + "://" + website + ".calcxml.com/scripts/Ret02.js");
}

if (calcTarget == 'fist' || calcTarget == 'financial-stability-index'){
	function calcCashTotal() {
		var cashOnHand = parseFloat(document.getElementsByName('cashOnHand')[0].value.replace(/,/g,""));
		var cashChecking = parseFloat(document.getElementsByName('cashChecking')[0].value.replace(/,/g,""));
		var cashSavings = parseFloat(document.getElementsByName('cashSavings')[0].value.replace(/,/g,""));
		var total = cashOnHand + cashChecking + cashSavings;
		document.getElementsByName('cashTotal')[0].value = thousandSeparator(total.toString());
	}
	function calcRetireTotal() {
		var taxable = parseFloat(document.getElementsByName('taxable')[0].value.replace(/,/g,""));
		var taxAdvantaged = parseFloat(document.getElementsByName('taxAdvantaged')[0].value.replace(/,/g,""));
		var businessValue = parseFloat(document.getElementsByName('businessValue')[0].value.replace(/,/g,""));
		var homeEquity = parseFloat(document.getElementsByName('homeEquity')[0].value.replace(/,/g,""));
		var total = taxable + taxAdvantaged + businessValue + homeEquity;
		document.getElementsByName('retireTotal')[0].value = thousandSeparator(total.toString());
	}
	function calcDebtTotal() {
		var debtMortgage = parseFloat(document.getElementsByName('debtMortgage')[0].value.replace(/,/g,""));
		var debtCreditCard = parseFloat(document.getElementsByName('debtCreditCard')[0].value.replace(/,/g,""));
		var debtAuto = parseFloat(document.getElementsByName('debtAuto')[0].value.replace(/,/g,""));
		var debtStudent = parseFloat(document.getElementsByName('debtStudent')[0].value.replace(/,/g,""));
		var debtOther = parseFloat(document.getElementsByName('debtOther')[0].value.replace(/,/g,""));
		var total = debtCreditCard + debtAuto + debtStudent + debtOther;
		document.getElementsByName('debtTotal')[0].value = thousandSeparator(total.toString());
	}
		
	function formatDouble(num) {
		var newNum = "";
		  for (var i = 0; i < num.length; i++)
		  {
		    var lsCh = num.substring(i, i + 1)
		    
		    if (((lsCh >= "0") && (lsCh <= "9")) || (lsCh == ".") || (lsCh == "-"))
		    {
		    	newNum += lsCh;
		    }
		  }
		return newNum;
	}
	function updateDebtMortgage() {
		if (document.getElementById('ownHome').value == 'Y'){
			//jQuery("#debtMortgageDiv").slideDown("slow");
			//document.getElementById("debtMortgage").value = 0;
			jQuery("#debtMortgage").prop("readonly",false);
			slider = document.getElementById('debtMortgageSlide');
			slider.removeAttribute('disabled');
		} else {
			//jQuery("#debtMortgageDiv").slideUp("slow");
			document.getElementById("debtMortgage").value = 0;
			jQuery("#debtMortgage").prop("readonly",true);
			slider = document.getElementById('debtMortgageSlide');
			document.getElementById('debtMortgageSlide').setAttribute('disabled', true);
			slider.noUiSlider.set(0);
		}
	}

}

/* update calc target to seo name for older iphones to work -- redirect prevents the calc from loading*/
if (calcTarget == "col01") {
	calcTarget = "saving-for-college";
} else if (calcTarget == "col02") {
	calcTarget = "student-loan-repayment";
} else if (calcTarget == "col03") {
	calcTarget = "coverdell-esa";
} else if (calcTarget == "col04") {
	calcTarget = "529-college-savings-plan";
} else if (calcTarget == "col05") {
	calcTarget = "value-of-college-education";
} else if (calcTarget == "col06") {
	calcTarget = "parent-plus-loan";
} else if (calcTarget == "col07") {
	calcTarget = "living-on-or-off-campus";
} else if (calcTarget == "col08") {
	calcTarget = "when-to-start-saving-for-college";
} else if (calcTarget == "det01") {
	calcTarget = "how-long-will-it-take-to-pay-off-my-credit-card";
} else if (calcTarget == "det02") {
	calcTarget = "pay-off-loan";
} else if (calcTarget == "det03") {
	calcTarget = "loan-payment-calculator";
} else if (calcTarget == "det04") {
	calcTarget = "too-much-debt";
} else if (calcTarget == "det05") {
	calcTarget = "loan-balance";
} else if (calcTarget == "det06") {
	calcTarget = "debt-consolidation-calculator";
} else if (calcTarget == "det07") {
	calcTarget = "restructuring-debt";
} else if (calcTarget == "det08") {
	calcTarget = "lump-sum-or-payments";
} else if (calcTarget == "det09") {
	calcTarget = "extra-payment-calculator";
} else if (calcTarget == "det10") {
	calcTarget = "pay-off-debt-or-invest";
} else if (calcTarget == "det12") {
	calcTarget = "credit-score-calculator";
} else if (calcTarget == "hom01") {
	calcTarget = "home-affordability";
} else if (calcTarget == "hom02") {
	calcTarget = "refinance-calculator";
} else if (calcTarget == "should-i-refinance-my-mortgage") {
	calcTarget = "refinance-calculator";
} else if (calcTarget == "hom03") {
	calcTarget = "mortgage-calculator";
} else if (calcTarget == "hom11") {
	calcTarget = "adjustable-rate-mortgage-calculator";
} else if (calcTarget == "inv05") {
	calcTarget = "interest-calculator";
} else if (calcTarget == "sav01") {
	calcTarget = "be-a-millionaire";
} else if (calcTarget == "sav02") {
	calcTarget = "savings-calculator";
} else if (calcTarget == "sav03") {
	calcTarget = "double-savings";
} else if (calcTarget == "sav04") {
	calcTarget = "savings-goal-calculator";
} else if (calcTarget == "sav05") {
	calcTarget = "savings-calculator-now";
} else if (calcTarget == "sav06") {
	calcTarget = "savings-goal-calculator-how-much";
} else if (calcTarget == "sav07") {
	calcTarget = "savings-calculator-growth";
} else if (calcTarget == "sav08") {
	calcTarget = "rate-of-return-calculator";
} else if (calcTarget == "sav09") {
	calcTarget = "investment-return";
} else if (calcTarget == "sav10") {
	calcTarget = "annual-yield";
} else if (calcTarget == "gar01") {
	calcTarget = "seed-calculator-by-serving";
} else if (calcTarget == "gar02") {
	calcTarget = "seed-calculator-by-lineal-feet";
} else if (calcTarget == "aut07") {
	calcTarget = "auto-refinance-calculator";
} else if (calcTarget == "aut08") {
	calcTarget = "auto-refinance-calculator-new-term";
} else if (calcTarget == "adv01") {
	calcTarget = "retirement-planning";
} else if (calcTarget == "adv02") {
	calcTarget = "college-planning";
} else if (calcTarget == "adv03") {
	calcTarget = "survivor-life-insurance";
} else if (calcTarget == "inc02") {
	calcTarget = "federal-income-tax-calculator";
} else if (calcTarget == "federal-income-tax-estimator") {
	calcTarget = "federal-income-tax-calculator";
} else if (calcTarget == "inc12") {
	calcTarget = "tax-refund-estimator";
} else if (calcTarget == "bus03") {
	calcTarget = "modal-premium-apr-calculator";
} else if (calcTarget == "bus04") {
	calcTarget = "business-valuation";
} else if (calcTarget == "bus05") {
	calcTarget = "breakeven-analysis";
} else if (calcTarget == "bus06") {
	calcTarget = "lease-vs-buy-equipment";
} else if (calcTarget == "bus07") {
	calcTarget = "financial-ratio-analysis";
} else if (calcTarget == "bus08") {
	calcTarget = "total-compensation";
} else if (calcTarget == "bud04") {
	calcTarget = "pay-down-debt-or-invest";
} else if (calcTarget == "bud05") {
	calcTarget = "how-long-will-my-money-last";
} else if (calcTarget == "gar03") {
	calcTarget = "zone-by-zip";
} else if (calcTarget == "inv14") {
	calcTarget = "share-certificate-analyzer";
} else if (calcTarget == "inv15") {
	calcTarget = "share-certificate-laddering";
} else if (calcTarget == "det11") {
	calcTarget = "balance-transfer";
} else if (calcTarget == "cus40") {
	calcTarget = "chip-home-income";
} else if (calcTarget == "bus09") {
	calcTarget = "section-179-deduction";
} else if (calcTarget == "qua03") {
	calcTarget = "how-much-retirement-income-may-an-ira-provide";
} else if (calcTarget == "ret02") {
	calcTarget = "retirement-calculator";
} else if (calcTarget == "how-much-will-i-need-to-save-for-retirement") {
	calcTarget = "retirement-calculator";
} else if (calcTarget == "ret03") {
	calcTarget = "are-my-current-retirement-savings-sufficient";
} else if (calcTarget == "ret04") {
	calcTarget = "social-security-retirement-income-estimator";
} else if (calcTarget == "ret06") {
	calcTarget = "i-am-retired-how-long-will-my-savings-last";
} else if (calcTarget == "ins01") {
	calcTarget = "life-insurance-calculator";
} else if (calcTarget == "how-much-life-insurance-need") {
	calcTarget = "life-insurance-calculator";
} else if (calcTarget == "qua15") {
	calcTarget = "72t";
} else if (calcTarget == "aut01") {
	calcTarget = "should-i-lease-or-purchase-an-auto";
} else if (calcTarget == "aut03") {
	calcTarget = "car-calculator";
} else if (calcTarget == "aut04") {
	calcTarget = "should-i-upgrade-to-a-more-fuel-efficient-vehicle";
} else if (calcTarget == "inc05") {
	calcTarget = "self-employment-tax-calculator";
} else if (calcTarget == "how-much-self-employment-tax-will-i-pay") {
	calcTarget = "self-employment-tax-calculator";
} else if (calcTarget == "qua02") {
	calcTarget = "ira-calculator";
} else if (calcTarget == "qua04") {
	calcTarget = "roth-ira-conversion-calculator";
} else if (calcTarget == "should-i-convert-to-a-roth-ira") {
	calcTarget = "roth-ira-conversion-calculator";
} else if (calcTarget == "qua08") {
	calcTarget = "ira-rollover-calculator";
} else if (calcTarget == "ins12") {
	calcTarget = "annuity-calculator";
} else if (calcTarget == "cus53") {
	calcTarget = "financial-preparedness-index";
} else if (calcTarget == "pay09") {
	calcTarget = "what-may-my-457-plan-be-worth";
} else if (calcTarget == "inv13") {
	calcTarget = "certificate-of-deposit-cd-laddering-strategy";
} else if (calcTarget == "inc08") {
	calcTarget = "how-much-of-my-social-security-benefit-may-be-taxed";
} else if (calcTarget == "ins33") {
	calcTarget = "annuity-calculator";
} else if (calcTarget == "bud13") {
	calcTarget = "checkbook-balancer-calculator";
} else if (calcTarget == "hom15") {
	calcTarget = "loan-comparison-calculator";
} else if (calcTarget == "adv04") {
	calcTarget = "long-term-care";
} else if (calcTarget == "inv16") {
	calcTarget = "investment-certificate-analyzer";
} else if (calcTarget == "inv17") {
	calcTarget = "investment-certificate-laddering";
} else if (calcTarget == "adv05") {
	calcTarget = "disability-income";
} else if (calcTarget == "cus61") {
	calcTarget = "chip-planned-advance";
} else if (calcTarget == "hom06") {
	calcTarget = "rent-vs-buy-home";
} else if (calcTarget == "hom10") {
	calcTarget = "fixed-or-adjustable-rate-mortgage";
} else if (calcTarget == "inv11") {
	calcTarget = "what-is-the-dividend-yield-on-a-stock";
} else if (calcTarget == "ins06") {
	calcTarget = "what-are-my-long-term-care-ltc-needs";
} else if (calcTarget == "ins04") {
	calcTarget = "how-much-disability-income-do-i-need";
} else if (calcTarget == "ins08") {
	calcTarget = "what-are-the-tax-advantages-of-an-annuity";
} else if (calcTarget == "inc03") {
	calcTarget = "should-i-adjust-my-payroll-withholdings";
} else if (calcTarget == "pay01") {
	calcTarget = "how-much-will-my-company-bonus-net-after-taxes";
} else if (calcTarget == "pay03") {
	calcTarget = "convert-salary-to-hourly";
} else if (calcTarget == "pay04") {
	calcTarget = "convert-hourly-to-salary";
} else if (calcTarget == "qua10") {
	calcTarget = "impact-of-borrowing-from-my-retirement-plan";
} else if (calcTarget == "cus62") {
	calcTarget = "advance-premium-tax-credit";
} else if (calcTarget == "hom07") {
	calcTarget = "should-i-convert-to-a-bi-weekly-payment-schedule";
} else if (calcTarget == "hom14") {
	calcTarget = "how-much-can-i-borrow-from-my-home-equity-heloc";
} else if (calcTarget == "inc01") {
	calcTarget = "what-is-my-potential-estate-tax-liability";
} else if (calcTarget == "inc13") {
	calcTarget = "tax-freedom-day";
} else if (calcTarget == "det14") {
	calcTarget = "credit-score-calculator-new";
} else if (calcTarget == "cus63") {
	calcTarget = "chip-prepayment-calculator";
} else if (calcTarget == "cus64") {
	calcTarget = "chip-income-advantage";
} else if (calcTarget == "adv06") {
	calcTarget = "debt-elimination";
} else if (calcTarget == "fist") {
	calcTarget = "financial-stability-index";
} else if (calcTarget == "cus66") {
	calcTarget = "concierge-risk-alternatives";
} else if (calcTarget == "cus68") {
	calcTarget = "how-much-equity-can-i-borrow";
} else if (calcTarget == "cus69") {
	calcTarget = "pib-illustrations";
} else if (calcTarget == "cus70") {
	calcTarget = "chip-prepayment-calculator-contract32";
} else if (calcTarget == "cus71") {
	calcTarget = "chip-income-advantage-contract32";
} else if (calcTarget == "cus72") {
	calcTarget = "youthbuild-compensation";
} else if (calcTarget == "cus73") {
	calcTarget = "raising-a-child";
}

var embed = getURLParameter('embed');

if (embed == 2){
	/*Include touch-punch for embed2 sliders*/
	if (skn != 641) {
		/*don't load these for skn 641 - requireJS */
		addScript(webproto + "://" + website + ".calcxml.com/scripts/jquery.ui.touch-punch.min.js");
		addScript(webproto + "://" + website + ".calcxml.com/scripts/nouislider.min.js");
		addScript(webproto + "://" + website + ".calcxml.com/scripts/wNumb.js");
	}
	/*load tabs for new look*/
	addScript(webproto + "://" + website + ".calcxml.com/scripts/guidedBox.js");
	if (skn != 807){
		addScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js");
	}
	if (skn == 708){
		/*add in ads for moneyhelpcenter*/
		addScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
		var loadResultsTopAd = setInterval(function() {
			 if (jQuery("#results").length) {
			    clearInterval(loadResultsTopAd);
			    jQuery("#results").prepend('<center><div id="TopResultsGA"><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-5882148606561545" data-ad-slot="7350887780"></ins></div></center>');
				(adsbygoogle = window.adsbygoogle || []).push({});
			 }
		}, 500);
	}
}

(function defer() {
    if (window.jQuery) {
    	jQuery(document).ready(function() {
    		if(refreshAllScripts){
    			refreshScripts();
    		}
    		if (calcTarget != '' && calcTarget != null && skn != 62) {
    			/* add in styles*/
    			var headerBackgroundColor = getURLParameter('headerBackgroundColor');
    			var headerFontColor = getURLParameter('headerFontColor');
    			var submitButtonColor = getURLParameter('submitButtonColor');
    			var submitButtonFontColor = getURLParameter('submitButtonFontColor');
    			var editButtonColor = getURLParameter('editButtonColor');
    			var editButtonFontColor = getURLParameter('editButtonFontColor');
    			
    			
    		
    			jQuery("#calc").html("<style>.pure-skin-cx h3 { color: " + headerFontColor + " !important; background: none repeat scroll 0% 0% " + headerBackgroundColor + " !important;} " +
    					".pure-skin-cx .pure-form legend { background-color: "+ headerBackgroundColor +" !important; color: " + headerFontColor + " !important;} " +
    					"button.pure-button.pure-button-primary { color: " + submitButtonFontColor + " !important; background: none repeat scroll 0% 0% " + submitButtonColor + " !important;}" + 
    					"button.pure-button { color: " + editButtonFontColor + " !important; background: none repeat scroll 0% 0% " + editButtonColor + " !important;}" +
    					".stdImage {display: none}"
    					+ "</style>");
    			
    		/*add in div for loading spinner*/
    			var spinnerDiv = document.createElement('div');
    			spinnerDiv.id = 'loadingSpinner';
    			document.getElementById(targetDiv).appendChild(spinnerDiv);
    		
    			if (secure == '1') {
    				if (skn == 609) {
    					jQuery("#loadingSpinner").html("<center><img style='padding-top: 10px;' src='https://www.debt.org/wp-content/themes/debt/img/embedSpinner.gif'/><center>");
    				} else {
    					jQuery("#loadingSpinner").html("<center><img alt='time spinner' style='padding-top: 10px;' src='https://www.calcxml.com/images/embedSpinner.gif'/><center>");
    				}
    			} else {
    				jQuery("#loadingSpinner").html("<center><img alt='time spinner' style='padding-top: 10px;' src='http://" + website + ".calcxml.com/images/embedSpinner.gif'/><center>");
    			}
    			
    			
    			if (skn == '305'){
    				if (document.all && !document.addEventListener){
    					/* image fallback for IE <= 8 */
    					chartLibary = "image";
    				}
    			}
    			
    			/*only allow skn62 and calc sav01 - no ads for develper.htm webpage*/
    			var developerPage = "";
    			if (skn == '62'){
    				calcName = 'sav01';
    				developerPage = '&developerPage=true';
    			}
    			
    			if (lang != null && lang.length > 0){
    				lang = "&lang=" + lang;
    			} else {
    				lang = "";
    			}

    			/*add in div for calculator*/
    			var calcDiv = document.createElement('div');
    			calcDiv.id = 'embed-calc-content';
    			document.getElementById(targetDiv).appendChild(calcDiv);
    			var url = "";
    			if (skn > 0){
    				if (secure == '1' && test != 'true') {
    					url = "https://www.calcxml.com/calculators/" + calcTarget + "?embed=" + embed + "&secure=" + secure + "&skn=" + skn + developerPage + "&tabs=" + tabs + lang + passAlongParams;
    				} else {
    					if (test == 'true'){
    						url = "https://test1.calcxml.com/calculators/" + calcTarget + "?embed=" + embed + "&test=true&skn=" + skn + developerPage + "&tabs=" + tabs + lang + passAlongParams;
    					}
    					else {
    						url = "http://www.calcxml.com/calculators/" + calcTarget + "?embed=" + embed + "&skn=" + skn + developerPage + "&tabs=" + tabs + lang + passAlongParams;
    					}
    				}
    			} else {
    				if (test == 'true'){
    					url = "http://test1.calcxml.com/calculators/" + calcTarget + "?embed=" + embed + "&test=true" + "&tabs=" + tabs + lang;
    				}
    				else {
    					url = "http://www.calcxml.com/calculators/" + calcTarget + "?embed=" + embed + "" + "&tabs=" + tabs + lang;
    				}
    			}
    			jQuery.ajax({
    				url: url,
    			}).done(function (data) {
    				setTimeout(
    						function() 
    						{
    							/*clear spinner*/
    							jQuery("#loadingSpinner").empty();
    							jQuery("#embed-calc-content").html(data);
    							
    							/*update history after AJAX finishes*/
    							/*history.replaceState({}, '', jQuery(this).attr("href"));*/

    						}, 100);
    			});
    		}
    		
    		if (skn == null){
    			/* remove padding for default skn*/
    			jQuery("#" + targetDiv).append("<style>.pure-skin-cx .content {margin: 0;}</style>");
    		} else {
    			/*remove body padding for responsive stylesheets*/
    			var se = document.createElement('script');
    			var scr = 'document.body.style.margin = "0px 0px 0px 0px";';
    			se.text = scr;
    			document.getElementById(targetDiv).appendChild(se);
    		}
    	});
    } else {
         setTimeout(function() { defer() }, 50);
    }
})();

