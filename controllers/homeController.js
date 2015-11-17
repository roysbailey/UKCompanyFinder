(function (homeController) {

  homeController.init = function (app) {

    app.get("/", function (req, res) {
        res.render("index", { title: "UK Company Search", BasicAuthHeader : process.env.CH_BASIC_AUTH });
    });

  };

})(module.exports);