const {studentMiddleware} = require("../middleware");
const {studentController} = require("../controllers");
const router = require("express").Router();

// find all students with query
router.get(
    `/allStudents`,
    studentController.allStudents
);

// get token by nickname
router.post(
    `/getToken`,
    studentMiddleware.checkNickNameForToken,
    studentController.getToken
)

// add student
router.post(
    `/addStudent`,
    studentMiddleware.checkToken,
    studentMiddleware.checkNickNameForCreate,
    studentController.createStudent
)

module.exports = router;