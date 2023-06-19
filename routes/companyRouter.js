const Router = require("express");
const router = new Router();
const companyController = require("../controllers/companyController");
const userController = require("../controllers/userController");
const sequelize = require("../db.js");

router.post(
  "/searchCompanies",
  companyController.searchCompanies,
  userController.check
);
router.post(
  "/getObjCards",
  companyController.getObjCards,
  userController.check
);

module.exports = router;
