import { prisma } from "../../types/prisma";


export const checkNickname = async (userName: string) => {
    const user = await prisma.users.findFirst({
        where: {
            name: userName
        }
    });
    
    if(user) {
        return true
    } else {
        return false
    }
}


export const checkEmail = async (userEmail: string) => {
    const user = await prisma.users.findFirst({
        where: {
            email: userEmail
        }
    });
    
    if(user) {
        return true
    } else {
        return false
    }
}

export const checkPassword = async (userPassword: string) => {
    const user = await prisma.users.findFirst({
        where: {
            password: userPassword
        }
    });
    
    if(user) {
        return true
    } else {
        return false
    }
}