export interface loginData {
    name: string,
    password: string
}

export interface chatData {
    room: string
    user: string
} 

export interface messageData {
    user: string
    message: string
    room: string
}