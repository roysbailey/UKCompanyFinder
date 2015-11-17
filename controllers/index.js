(function (controllers) {

  var companySearchController = require("./api/companySearchController");

  controllers.init = function (app) {
    companySearchController.init(app);
  };

})(module.exports);