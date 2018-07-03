const mysql = require('mysql');
const config = require('../config.js')
const {host, user, password, database} = config.db || {}
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : host,
  user            : user,
  password        : password,
  database        : database
});

/** 
 * 查询返回数组
 * 增加返回对象   
 */
exports.query = function(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) return reject(err)
            connection.query(sql, function (error, ...args) {
            // connection.query(sql, function (error, results, fields) {
                // 尽早释放连接
                connection.release();
                if (error) return reject(error);
                // 这种写法只能传入 results 结果
                // results(操作结果), fields(字段数组) 都是数组
                // resolve(args)
                resolve(...args)
            });
        })
    })
}