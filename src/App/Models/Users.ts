import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

interface User {
    name:       string
    email:      string
    password:   string
}

export const userModel = async (data: User) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            } satisfies User
        });

        console.log("Novo usuário criado: ", user);

        return user;

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
}