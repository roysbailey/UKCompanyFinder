
 var cvm = function () {

	 self = this,
        
	model = ko.observableArray([]),
	
	statusVal = ko.observable(''),
		
	onClickBind = function () {
		
		var searchText = $('#')
		
		$.ajax
		({
			type: "GET",
			url: "https://api.companieshouse.gov.uk/search/companies?q=silvertouch%20technology",
			crossDomain: true,
			dataType: 'jsonp',
			async: true,
			headers: {
			"Authorization": "@model.BasicAuthHeader"
			},
			error: function (data) {
				// Push the new data into the model so the bindings update.
				bindResults(seedData().items);
				statusVal('Working with seed data');
			},
			success: function (data) {
				// Push the new data into the model so the bindings update.
				bindResults(data);
				statusVal('');
			}
		});
	},

	seedData = function () {
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
	},
	
	bindResults = function (data) {
		model(data);
	};

	return {
			index: {
				CH_BASIC_AUTH: '',
				companies: model,
				onClickBind: onClickBind,
				status: statusVal,
				hasStatus: ko.computed(function(){
					return statusVal().length;
				})
			}
		};
	
} ();


$(function() {
	$( "#search" ).click(function() {
		cvm.index.onClickBind();
	});
});
