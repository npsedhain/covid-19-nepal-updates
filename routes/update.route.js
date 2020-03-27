const router = require("express").Router();

// Load controllers
const updateController = require('../controllers/update.controller');

router.route("/").get(updateController.getUpdates);

module.exports = router;
