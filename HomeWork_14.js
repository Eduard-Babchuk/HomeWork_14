const prompt = require("prompt-sync")()
const bcrypt = require('bcrypt')

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
    console.clear()
    const hashedPass = await bcrypt.hash(password, 10)
    console.log("Your Password: " + password)
    console.log("Hash Password: " + hashedPass)
    compareWithHash(hashedPass, password)
}

async function compareWithHash(hash, password) {
    const match = await bcrypt.compare(password, hash)
    switch(match){
        case true: 
            console.log('\x1b[32m%s\x1b[0m',">> Password matches hash")
            break
        default: console.log('\x1b[31m%s\x1b[0m', "ERROR_2: Password doesn't matches hash")
    }
}

function enterPassword(){
    const password = prompt("Create your password: ")
    switch (checkPasswordRequirements(password)){
        case true: hashPassword(password); break
        default: 
            console.log('\x1b[31m%s\x1b[0m', "ERROR_1: The password doesn't meet the requirements")
            enterPassword()
    }
}

console.clear()
console.log('\x1b[33m%s\x1b[0m',"PASSWORD REQUIREMENTS:\n1. At least 8 characters\n2. There should be uppercase and lowercase letters\n3. There must be numbers\n4. There must be special characters")
enterPassword()