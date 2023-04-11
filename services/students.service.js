const jwt = require("jsonwebtoken");

const {Student} = require("../dataBase");
const {CustomError} = require("../errors");
const {configs} = require("../config");

module.exports = {
    create: (data) => {
        return Student.create(data)
    },
        allStudents: async (presenter, query = {}) => {

        const {page = 1, perPage = 20, ...otherFilter} = query;

        const filterPage = _pageFilter(page, perPage);

        const filterQuery = _getFilterQuery(otherFilter);

        const skip = (filterPage.page - 1) * filterPage.perPage;

        const count = await Student.countDocuments(filterQuery);

        const students = await Student
            .find(filterQuery)
            .limit(filterPage.perPage)
            .skip(skip)
            .sort({["surname"]: 'asc'})
            .exec();

        const studentForRes = students.map((student) => presenter(student));

        if (count - skip < 1 || count === 0) {
            return {
                page: page,
                perPage: perPage,
                count: count,
                data: null
            }
        }

        return {
            page: page,
            perPage: perPage,
            count: count,
            data: studentForRes
        }
    },

    findByParams: (params) => {
        return Student.findOne(params);
    },

    generateToken: (payload = {}, expiresIn) => {
        const token = jwt.sign(payload, configs.TOKEN_SECRET, {expiresIn: expiresIn});

        return {
            token
        }
    },

    checkToken: (token = '') => {
        try {
            const secret = configs.TOKEN_SECRET;

            return jwt.verify(token, secret)
        } catch (e) {
            throw new CustomError("Token not valid", 401)
        }
    }
}

function _getFilterQuery(otherFilter) {

    const searchObject = {}

    if (otherFilter.search) {
        Object.assign(searchObject, {
            $or: [
                {name: {$regex: otherFilter.search, $options: 'i'}},
                {surname: {$regex: otherFilter.search, $options: 'i'}},
            ]
        })
    }

    return searchObject;
}

function _pageFilter(page, perPage) {
    if (page <= 0) {
        throw new CustomError('Page not found, page must be greater than 0', 404);
    }

    if (/^[a-zA-Z]+$/.test(page)) {
        throw new CustomError('Page should be a number', 404);
    }
    if (perPage <= 0) {
        throw new CustomError('PerPage must be greater than 0', 404);
    }

    if (/^[a-zA-Z]+$/.test(perPage)) {
        throw new CustomError('PerPage should be a number', 404);
    }

    return {
        page,
        perPage
    }
}