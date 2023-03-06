//api/v1/resorts
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
//get all resorts
router.get("/", getAllResorts);
//get resort by id
router.get("/:resortId", getResortById);
//get resorts from city id, per 10
router.get("/citys/:cityName", getAllResortsInCity); //??

//post om auth ->resort
router.post("/", isAuthenticated, createNewResort);
//put om auth om admin -> resort by id info
router.put("/:resortId", isAuthenticated, updateResortById); //lägga till om admin true, authorizeRoles?
//delete om auth om admin -> resort by id
router.delete("/:resortId", isAuthenticated, deleteResortById); //lägga till om admin true, authorizeRoles?

module.exports = router;
