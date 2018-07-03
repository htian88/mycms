const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
const topicController = require('../controllers/topic')
const commentController = require('../controllers/comment')
const sessionController = require('../controllers/session')

const db = require('../models/db.js')

// 添加路由中间件，判断登录状态
function checkLogin(req, res, next) {
    const {user} = req.session;
    if(!user) return res.status(401).json({err: 'NoAuthorized'})
    next()
}

async function checkTopic(req, res, next) {
    try{
        const {id} = req.params;
        // 错误处理操作
        const [topic] = await db.query(`SELECT * FROM topic where id=${id}`)
        // 找不到话题
        if(!topic) return res.status(404).json({err: 'no topic'})
        // 登录用户不是本话题的作者
        if(topic.user_id != req.session.user.id) return res.status(400).json({err: 'action valid'})

        next()
    }catch(err) {
        next(err)
    }
}

router
    .get('/user', userController.get)
    .post('/user', userController.new)
    .patch('/user/:id', userController.update)
    .delete('/user/:id', userController.delete)


router
    .get('/topic', topicController.get)
    .post('/topic', checkLogin, topicController.new)
    .patch('/topic/:id', checkLogin, checkTopic, topicController.update)
    .delete('/topic/:id', checkLogin, checkTopic, topicController.delete)


router
    .get('/comment', commentController.get)
    .post('/comment', checkLogin, commentController.new)
    .patch('/comment/:id', checkLogin, commentController.update)
    .delete('/comment/:id', checkLogin, commentController.delete)


router
    .get('/session', sessionController.get)
    .post('/session', sessionController.new)
    .delete('/session', sessionController.delete)


module.exports = router