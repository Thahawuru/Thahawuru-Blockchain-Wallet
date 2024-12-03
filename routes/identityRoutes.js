// routes/identityRoutes.js
const express = require("express");
const {
  getIdentity,
  setIdentity,
  updateIdentity,
} = require("../controllers/identityController");
const {
  validateApiKeyMiddleware,
} = require("../middleware/validateApiKeyMiddleware");

const router = express.Router();

// Assuming 'identity' is the type for identity-related API requests
router.get("/walletuser/:identityNumber", getIdentity);
router.get("/:identityNumber", validateApiKeyMiddleware(1), getIdentity);

module.exports = router;
