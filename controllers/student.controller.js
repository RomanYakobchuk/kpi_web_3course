const {studentService} = require("../services");
const {studentPresenter} = require("../presenters/student.presenter");

module.exports = {
    createStudent: async (req, res, next) => {
        try {
            const {name, surname, nickname} = req.body;

            const student = await studentService.create({
                name,
                surname,
                nickname
            })
            const studentForResponse = studentPresenter(student);

            res.status(201).json({
                student: studentForResponse
            })
        } catch (e) {
            next(e)
        }
    },
    allStudents: async (req, res, next) => {
        try {
            const students = await studentService.allStudents(studentPresenter, req.query);

            res.json(students)
        } catch (e) {
            next(e)
        }
    },

    getToken: async (req, res, next) => {
        try {
            const student = req.student;

            const token = studentService.generateToken({data: student.nickname}, '3m');

            const studentForResponse = studentPresenter(student);
            res.json({
                student: studentForResponse,
                ...token
            })
        } catch (e) {
            next(e)
        }
    }
}