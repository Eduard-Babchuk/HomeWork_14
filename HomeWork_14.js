const bcrypt = require('bcrypt')
const password = "!12345678Aa"

function checkPasswordRequirements(password) {
    if (password.length < 8) {
        return false
    }
    
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return false
    }
    
    if (!/\d/.test(password)) {
        return false
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return false
    }
    return true
}

async function hashPassword(password){
    const hashedPass = await bcrypt.hash(password, 10)
    console.log("Your Password:" + password)
    console.log("Hash Password:" + hashedPass)
    compareWithHash(hashedPass, password)
}

async function compareWithHash(hash, password) {
    const match = await bcrypt.compare(password, hash)
    switch(match){
        case true: console.log("Password matches hash!"); break
        default: console.log("Password doesn't matches hash")
    }
}

if (checkPasswordRequirements(password)) {
    console.log("The password meets the requirements!")
    hashPassword(password)
    return;
}
else console.log("The password doesn't meet the requirements!!!")