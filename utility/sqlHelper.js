exports.andCondition = function(params) {
    let sqlStr = '1 = 1'
    for(let item in params) {
        sqlStr += ` and ${item}='${params[item]}'`
    }
    return sqlStr
}