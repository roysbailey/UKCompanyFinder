(function (controllers) {

  var homeController = require("./homeController");
  var companySearchController = require("./api/companySearchController");

  controllers.init = function (app) {
    homeController.init(app);
    companySearchController.init(app);
  };

})(module.exports);