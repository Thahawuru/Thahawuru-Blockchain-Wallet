const express = require("express");
const router = express.Router();

const {
  addInitialLicensesAndIdentities,
} = require("../controllers/setupController");

router.get("/addInitialLicensesAndIdentities", addInitialLicensesAndIdentities);

module.exports = router;
