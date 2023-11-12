// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userSession = req.session.get("user")

  const like = await prisma.like.findMany({
      where: {
          tweetId : Number(req.body.tweetId),
          name : userSession.nickname
      }
  })


  if(req.method == "POST"){

    await prisma.like.update({
        where: {
            id : like[0].id
        },
        data: {
            isLiked : !like[0].isLiked
        }
    })
  }

  if(req.method == "GET"){
  }

  res.status(200).json({ message: "change heart", like });

}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long", 
  cookieName: 'MY_APP_COOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
