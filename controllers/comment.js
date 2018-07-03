const db = require('../models/db.js')

exports.get = (req, res, next) => {

}

exports.new = async (req, res, next) => {
    try {
        // 获取 Body 请求数据
        const {
            content = '',
            article_id,
        } = req.body
        // 添加到数据库
        const sqlStr = `
            INSERT INTO comment(content, create_time, update_time, article_id, user_id ) 
            VALUES('${content}', '${Date.now()}', '${Date.now()}', '${article_id}', '${req.session.user.id}')
        `
        const ret = await db.query(sqlStr)
        const [comment] = await db.query(`SELECT * FROM comment where id='${ret.insertId}'`)
        // 返回新增的信息
        res.status(201).json(comment)
    } catch(err) {
        next(err)
    }
    
}

exports.update = (req, res, next) => {

}

exports.delete = (req, res, next) => {

}
