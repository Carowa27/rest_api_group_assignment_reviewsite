const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const {
  getAllResorts,
  getResortById,
  getAllResortsInCity,
  createNewResort,
  updateResortById,
  deleteResortById,
} = require("../controllers/resortController");

router.get("/", getAllResorts);

router.get("/:resortId", getResortById);

router.get("/citys/:cityName", getAllResortsInCity);

router.post("/", isAuthenticated, createNewResort);

router.put("/:resortId", isAuthenticated, updateResortById);

router.delete("/:resortId", isAuthenticated, deleteResortById);

module.exports = router;
