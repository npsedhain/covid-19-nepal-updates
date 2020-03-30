const router = require("express").Router();

// Load controllers
const stateController = require("../controllers/state.controller");

router.route("/").get(stateController.getStateCases);
router.route("/").post(stateController.updateStateCases);

module.exports = router;
