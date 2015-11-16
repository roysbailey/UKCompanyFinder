(function (homeController) {

  var data = require("../data");

  homeController.init = function (app) {

    app.get("/", function (req, res) {
      //res.send("<html><body><h1>Express</h1></body></html>");

      data.getNoteCategories(function (err, results) {

        res.render("index", { title: "UK Company Search", BasicAuthHeader : process.env.CH_BASIC_AUTH, error: err, categories: results });
      
      });
    });

  };

})(module.exports);