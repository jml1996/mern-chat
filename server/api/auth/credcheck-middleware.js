
function credCheck(user){
    return Boolean(user.username && user.password && typeof user.password === "string")
}

module.exports ={
    credCheck
}
