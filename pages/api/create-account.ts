import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST'){
        const {nickname, email, password} = req.body;

        try{
            const user = await prisma.user.create({
                data: {
                    nickname: nickname,
                    email: email,
                    password: password,
                    profile: ''
                }
            })

            return res.status(200).json(user)
        } catch(error){
            return res.status(400).json({message: error})
        }
    } else {
        return res.status(405).end()
    }
}