const express = require("express");
const router = express.Router();
const passport = require("passport");
const searchAPIController = require("../../../controllers/api/v1/search_api_controller");

//login user
router.get("/:searchText", searchAPIController.search);

//signup user

module.exports = router;
