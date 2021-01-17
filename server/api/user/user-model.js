const db = require('../../data/connection')

function getUser(){
    return db('users')
}
function getBy(filter){
    return db('users').where(filter)
}
async function addUser(user){
    const [id] = await db('users').insert(user, "id")
    return findById(id)
}
function findById(id){
    return db('users').where('id', id).first()
}
module.exports = {
    addUser,
    getUser,
    getBy,
    findById
}