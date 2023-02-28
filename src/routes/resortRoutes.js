//api/v1/resorts
const express = require('express')
const router = express.Router()

//get all resorts
router.get("/",getAllResorts)
//get resort by id
router.get("/:resortId",getResortById)
//get resorts from city id, per 10
router.get("/:cityId",getAllResortsInCity)//??
//get resort by id, per 10, sort by rating (reviews)
router.get("/:resortId/reviews",getReviewsFromResort)//??

//post om auth ->resort
router.post('/', isAuthenticated, createNewResort)
//put om auth om admin -> resort by id info
router.put('/:resortId', isAuthenticated, updateResortById)//lägga till om admin true, authorizeRoles?
//delete om auth om admin -> resort by id
router.delete('/:resortId', isAuthenticated, deleteResortById)//lägga till om admin true, authorizeRoles?

module.exports = router