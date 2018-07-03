const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db.js')
const sqlHelper = require('../utility/sqlHelper.js')

exports.get = async (req, res, next) => {
    try {
        // nickname可以查询，email也可以查询，登录也可以用到
        const sqlStr = `SELECT * FROM user where ` + sqlHelper.andCondition(req.query)
        let ret = await db.query(sqlStr)
        res.status(200).json(ret)
    } catch (err) {
        next(err)
    }
}

exports.new = async (req, res, next) => {
    const body = req.body;
    const sqlStr = 
        `INSERT INTO user(username, password, email, nickname, avatar, gender, create_time, update_time)
            VALUES('${body.email}', 
            '${md5(md5(body.password))}', 
            '${body.email}', 
            '${body.nickname}', 
            'avatar.png',
            0,
            '${moment().format('YYYY-MM-DD HH:mm:ss')}', 
            '${moment().format('YYYY-MM-DD HH:mm:ss')}'
        )`
    try {
        // const sqlStr = `SELECT 1 + 1 AS solution
        // console.log(ret[0].solution)
        let ret = await db.query(sqlStr) // 添加操作，返回的是results结果对象/fields 为undefined
        let user = await db.query(`SELECT * FROM user WHERE id='${ret.insertId}'`) // 返回的是results结果数组/fields 为 字段数组
        res.status(201).json(user)
    } catch(err) {
        next(err)
    }
}

exports.update = (req, res, next) => {

}

exports.delete = (req, res, next) => {

}
