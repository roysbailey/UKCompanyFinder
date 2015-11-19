

// Self executing anonymous function which is used to return the client view model for the search page (this is the stuff that knockout uses in the html page).  See the "return" statement at the end for details of what actually gets returned.
 var cvm = function () {

	// Used in the view model to bind json company search result to the UI 
	var companiesObservable = ko.observableArray([]);
	
	// Used in the VM to show the status (if working off line with sample seed data)
	var statusVal = ko.observable('');
		
	// Handler for the on-click event of the search button.  Calls the back end service and updates the model
	var onClickBind = function () {
		
		var searchText = $('#comp-name').val();
		var ajaxRequest = {
			type: "GET",
			url: "/api/compsearch?q=" + searchText,
			crossDomain: false,
			dataType: 'json',
			async: true,
			error: function (data) {
				// Push the new data into the model so the bindings update.
				bindResults(seedData());
				statusVal('Working with seed data');
			},
			success: function (data) {
				// Push the new data into the model so the bindings update.
				bindResults(data);
				statusVal('');
			}
		};
		
		$.ajax(ajaxRequest);
	};

	// Called with the new company data following a search to ensure that the UI is updated. 
	var bindResults = function (data) {
		// Given the raw resutls from the REST API, create a view companiesObservable for each company so we can bind to the UI.
		var companyVMs = [];
		$.each(data.items, function(idx, item) {
			var companyVM = new CompanyViewModel(item);
			companyVMs.push(companyVM);
		});
		companiesObservable(companyVMs);
	};

	var seedData = function () {
		var data = {
		"items": [
			{
			"company_status": "active",
			"title": "SILVERTOUCH LIMITED",
			"date_of_creation": "2000-01-20",
			"company_type": "ltd",
			"links": {
				"self": "/company/03910707"
			},
			"snippet": "33 Hazel Way, Fetcham, Leatherhead, Surrey, KT22 9QF",
			"description": "03910707 - Incorporated on 20 January 2000",
			"kind": "searchresults#company",
			"description_identifier": [
				"incorporated-on"
			],
			"matches": {
				"title": [
				1,
				11
				]
			},
			"company_number": "03910707",
			"address": {
				"postal_code": "KT22 9QF",
				"locality": "Leatherhead",
				"address_line_1": "33 Hazel Way",
				"address_line_2": "Fetcham",
				"region": "Surrey"
			}
			},
			{
			"company_type": "ltd",
			"snippet": "71 Tamworth Road, Lichfield, Staffordshire, WS14 9HG",
			"links": {
				"self": "/company/03463232"
			},
			"date_of_creation": "1997-11-11",
			"company_status": "active",
			"title": "SILVERTOUCH TECHNOLOGY LIMITED",
			"matches": {
				"title": [
				1,
				11
				]
			},
			"company_number": "03463232",
			"address": {
				"postal_code": "WS14 9HG",
				"locality": "Lichfield",
				"address_line_1": "71 Tamworth Road",
				"region": "Staffordshire"
			},
			"kind": "searchresults#company",
			"description_identifier": [
				"incorporated-on"
			],
			"description": "03463232 - Incorporated on 11 November 1997"
			},
			{
			"title": "SILVERTOUCH HOME CARE LTD",
			"company_status": "active",
			"date_of_creation": "2010-02-22",
			"snippet": "5, North Street, Hailsham, East Sussex, BN27 1DQ",
			"links": {
				"self": "/company/07165046"
			},
			"company_type": "ltd",
			"description": "07165046 - Incorporated on 22 February 2010",
			"description_identifier": [
				"incorporated-on"
			],
			"kind": "searchresults#company",
			"address": {
				"region": "EAST SUSSEX",
				"address_line_2": "NORTH STREET",
				"address_line_1": "5",
				"locality": "HAILSHAM",
				"postal_code": "BN27 1DQ"
			},
			"company_number": "07165046",
			"matches": {
				"title": [
				1,
				11
				]
			}
			},
			{
			"description_identifier": [
				"incorporated-on"
			],
			"kind": "searchresults#company",
			"description": "08019574 - Incorporated on  4 April 2012",
			"address": {
				"locality": "Harrow",
				"postal_code": "HA3 0AN",
				"address_line_1": "99 Kenton Road",
				"region": "Middlesex"
			},
			"company_number": "08019574",
			"matches": {
				"title": [
				1,
				11
				]
			},
			"date_of_creation": "2012-04-04",
			"title": "SILVERTOUCH PROFESSIONAL SERVICES LIMITED",
			"company_status": "active",
			"links": {
				"self": "/company/08019574"
			},
			"snippet": "99 Kenton Road, Harrow, Middlesex, HA3 0AN",
			"company_type": "ltd"
			},
			{
			"kind": "searchresults#company",
			"description_identifier": [
				"incorporated-on"
			],
			"description": "06431016 - Incorporated on 19 November 2007",
			"company_number": "06431016",
			"address": {
				"locality": "Ongar",
				"postal_code": "CM5 0GA",
				"address_line_1": "Unit 7, Essex Technology & Innovation Centre",
				"region": "Essex",
				"address_line_2": "The Gables Off Fyfield Road"
			},
			"date_of_creation": "2007-11-19",
			"company_status": "active",
			"title": "SILVER TOUCH TECHNOLOGIES (UK) LIMITED",
			"company_type": "ltd",
			"snippet": "Unit 7, Essex Technology & Innovation Centre, The Gables Off Fyfield Road, Ongar, Essex, CM5 0GA",
			"links": {
				"self": "/company/06431016"
			}
			}
		],
		"total_results": 5,
		"page_number": 1,
		"start_index": 0,
		"items_per_page": 20,
		"kind": "search#companies"
		};

		return data;
	};


	// Revealing module pattern, used to return the public interface of this module back to the "includer".  Allows us to hide "private" methods.
	return {
			index: {
				companies: companiesObservable,
				onClickBind: onClickBind,
				status: statusVal,
				hasStatus: ko.computed(function(){
					return statusVal().length;
				}),
				hasResults: ko.computed(function(){
					return companiesObservable().length;
				})
			}
		};
	
} ();	// self executing anonymous function (revealing module pattern)


// Function creating a knockout viewmodel to represent a single company returned from the companies house API.
function CompanyViewModel(company) {
    this.title = ko.observable(company.title);
	this.status = ko.observable(company.company_status);
    this.company = company;

	this.inactive = ko.computed(function() {
		var inactive = (this.company.company_status !== 'active');
		return inactive; 
    }, this);

	this.displaySummary = ko.computed(function() {
        return "Incorportated: " + this.company.date_of_creation + " - Office: " + this.company.address.locality + ", " + this.company.address.postal_code;
    }, this);
}

// Called when jquery has loaded to wireup the click handler to our search button.
$(function() {
	$( "#search" ).click(function(e) {
		e.preventDefault();
		cvm.index.onClickBind();
	});
});
