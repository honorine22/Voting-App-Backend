import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash)
}