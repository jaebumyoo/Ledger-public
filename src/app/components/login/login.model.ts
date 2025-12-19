export interface LoginModel {
    username: string,
    encryptedPassword: string,
}

export const key = {
    username: 'public_user',
    password: 'public_pass'
}