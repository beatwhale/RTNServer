const express = require("express");
const router = express.Router();
const parserCategoryController = require("../controllers/parserCategoryController");
const parserVehicleController = require("../controllers/parserVehicleController");
const parserNotCategoryController = require("../controllers/parserNotCategoryController");
const parserElectricVehicleController = require("../controllers/parserElectricVehicleController");
const databaseController = require("../controllers/databaseController");

router.post("/runparserCategory", parserCategoryController.runParserCategory);
router.post("/runparserVehicle", parserVehicleController.runParserVehicle);
router.post("/runparserNotCategory", parserNotCategoryController.runParserNotCategory);
router.post("/runparserElectricVehicle", parserElectricVehicleController.runParserElectricVehicle);
router.get("/connection", databaseController.checkDatabaseConnection);

module.exports = router;
