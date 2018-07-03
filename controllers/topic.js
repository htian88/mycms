const moment = require('moment')
const db = require('../models/db.js')

/**
 * 获取评论
 */
exports.get = async (req, res, next) => {
    try{
        // 0 获取 分页 参数
        let { _page=1, _limit=20 } = req.query
        // 1 整理查询语句
        _page < 1 ? _page = 1 : ''
        _limit > 20 ? _limit = 20 : (_limit < 1 ? _limit = 1 : '')
        const num = (_page - 1) * _limit
        // 2 查询数据库
        const sqlStr = `
            SELECT * FROM topic LIMIT ${num}, ${_limit}
        `
        let ret = await db.query(sqlStr)
        // 3 返回结果
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}
/**
 * 添加评论
 */
exports.new = async (req, res, next) => {
    // 1 获取 body 数据
    const body = req.body;
    // 2 插入数据库
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    const sqlStr = `
        INSERT INTO topic(title, content, user_id, create_time, update_time) 
        VALUES('${body.title}', '${body.content}', '${req.session.user.id}', '${time}', '${time}')
    `
    try{
        const ret = await db.query(sqlStr)
        // 3 返回插入的对象数据
        const [topic] = await db.query(`SELECT * FROM  topic where id='${ret.insertId}'`)
        res.status(201).json(topic)
    } catch(err) {
        console.log(err)
        next(err)
    }

}

exports.update = async (req, res, next) => {
    try{
        const {id} = req.params
        const body = req.body
        const sqlStr = `UPDATE topic SET title='${body.title}', content='${body.content}' where id=${id}`
        await db.query(sqlStr)
        const [ret] = await db.query(`SELECT * FROM topic WHERE id=${id}`)
        res.status(201).json(ret)
    }catch(err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try{
        const {id} = req.params;

        await db.query(`DELETE FROM topic where id=${id}`)
        res.status(201).json({})
    }catch(err) {
        next(err)
    }
}
