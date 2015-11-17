var https = require("https");

(function (companySearchController) {

  companySearchController.init = function (app) {
    app.get("/api/compsearch", function (req, resp) {
    
      var RestClient = require('node-rest-client').Client;
      var client = new RestClient();
      var args = {
        headers:{"Authorization": process.env.CH_BASIC_AUTH} 
      };
    
      // Call companies house  
      client.get("https://api.companieshouse.gov.uk/search/companies?q=" + req.query.q, args, function(data, response){
        
        // Return the data from companies house back to our client UI
        resp.set("Content-Type", "application/json");
        resp.send(data);
      });
    });

  };
})(module.exports);