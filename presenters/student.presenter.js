module.exports = {
    studentPresenter: (student) => {
        return {
            surname: student.surname,
            name: student.name,
            nickname: student.nickname,
        }
    }
}