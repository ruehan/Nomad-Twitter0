
import { withIronSession } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.get("user");


  try{
    const profile = await prisma.user.findUnique({
      where: { 
        email: user.email
       }
    });
  
    if (profile) {
      res.status(200).json({ loggedIn: true, profile });
    } else {
      res.status(200).json({ loggedIn: false });
    }
  }catch(error){
    return res.status(400).json({message: error})
  }
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'MY_APP_COOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
