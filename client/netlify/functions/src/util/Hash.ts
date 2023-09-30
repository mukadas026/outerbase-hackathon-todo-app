import bcrypt from 'bcrypt'

export const generateHash = async (password : string) => {
    let hashedPassword: null | string = null
    const hash = await bcrypt.hash(password, 10)
    hashedPassword = hash
    return hashedPassword
}

export const compare = async (password:string, hashedPassword:string) => {
    let outcome = await bcrypt.compare(password, hashedPassword)
    console.log(outcome)
    return outcome
}