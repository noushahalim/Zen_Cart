const productModel = require("../model/productModel");

//Fields to Controll user home page

exports.homeGet = async (req, res) => {
  try {
    const productDatas = await productModel.find();

    if (req.session.admin) {
      res.redirect("/admin/home");
    } else if (req.session.userName) {
      res.render("client/userHome", { productDatas });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Error n homeGet", error.message);
  }
};
