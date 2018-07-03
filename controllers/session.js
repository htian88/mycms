const db = require('../models/db.js')
const md5 = require('blueimp-md5')

exports.get = (req, res, next) => {
    const {user} = req.session;
    // 401 为 未授权
    if(!user) return res.status(401).json({err: 'no Autorized'})
    res.status(200).json(user)
}
/**
 * 登录，创建会话状态
 */      
exports.new = async (req, res, next) => {
    //1 获取 body 数据
    const body = req.body;
    //2 查询数据库是否存在记录
    try{
        const [user] = await db.query(`SELECT * FROM user WHERE email='${body.email}' AND password='${md5(md5(body.password))}' `)
        if(!user) return res.status(404).json({err: 'INVALID password or email'});
        //3 保存session
        req.session.user = user;
        //4 返回登录信息
        return res.status(201).json(user)
    } catch(err) {
        next(err)
    }
}

exports.delete = (req, res, next) => {
    delete req.session.user;
    res.status(201).json({})
}
