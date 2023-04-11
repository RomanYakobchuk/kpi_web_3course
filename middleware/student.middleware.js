const {studentService} = require("../services");
const {CustomError} = require("../errors");
const {constants} = require("../config");
const {checkToken} = require("../services/students.service");

module.exports = {
    checkNickNameForCreate: async (req, res, next) => {
        try {
            const {nickname} = req.body;

            const student = await studentService.findByParams({nickname});

            if (student) {
                return next(new CustomError(`Student with nickname [${nickname}] exists`))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    checkNickNameForToken: async (req, res, next) => {
        try {
            const {nickname} = req.body;

            const student = await studentService.findByParams({nickname});

            if(!student) {
                return next(new CustomError(`Student with nickname [${nickname}] doesn't exist`))
            }
            req.student = student
            next()
        }  catch (e) {
            next(e)
        }
    },
    checkToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                return next(new CustomError("No token", 401));
            }

            checkToken(token);

            next()
        } catch (e) {
            next(e)
        }
    }
}