// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 로그인 처리

    try{
      const email = req.session.get("user").email;

      const tweets = await prisma.tweet.findMany({
        orderBy: {
          createdAt: 'desc'
        },
      });

      const counts = await prisma.tweet.count({
        where: {
          email: email
        }
      })

      const result = {
        tweets: tweets,
        count: counts
      };

      return res.status(200).json({ tweets: result });
    } catch(e){
      const tweets = await prisma.tweet.findMany({
        orderBy: {
          createdAt: 'desc'
        },
      });

      return res.status(200).json({ tweets: tweets });
    }

}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long", // 환경변수에서 비밀 키 가져오기
  cookieName: 'MY_APP_COOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
