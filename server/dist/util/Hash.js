import bcrypt from 'bcrypt';
export const generateHash = async (password) => {
    let hashedPassword = null;
    const hash = await bcrypt.hash(password, 10);
    hashedPassword = hash;
    return hashedPassword;
};
export const compare = async (password, hashedPassword) => {
    let outcome = await bcrypt.compare(password, hashedPassword);
    console.log(outcome);
    return outcome;
};
//# sourceMappingURL=Hash.js.map