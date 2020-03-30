const router = require("express").Router();

// Load controllers
const districtController = require('../controllers/district.controller');

router.route("/").get(districtController.getDistrictCases);
router.route("/").post(districtController.addDistrictCases);

module.exports = router;
