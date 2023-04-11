module.exports = {
    studentPresenter: (student) => {
        return {
            name: student.name,
            surname: student.surname,
            nickname: student.nickname
        }
    }
}