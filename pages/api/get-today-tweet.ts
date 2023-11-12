// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 로그인 처리
    try {
        const currentDate = new Date();
        const twentyFourHoursAgo = new Date(currentDate);
        twentyFourHoursAgo.setHours(currentDate.getHours() - 24);
    
        const tweets = await prisma.tweet.findMany({
          where: {
            createdAt: {
              gte: twentyFourHoursAgo.toISOString(), // 현재 시간으로부터 24시간 이전
              lt: currentDate.toISOString(), // 현재 시간
            },
          },
          select: {
            nickname: true,
          },
        });

        const uniqueNicknames = Array.from(new Set(tweets.map((tweet) => tweet.nickname)));
    
        console.log('현재 시간으로부터 이전 24시간 동안 작성된 트윗:', tweets);
        res.status(200).json({ nicknames: uniqueNicknames });
      } catch (error) {
        console.error('트윗 가져오기 중 오류 발생:', error);
      } 
    }

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long", // 환경변수에서 비밀 키 가져오기
  cookieName: 'MY_APP_COOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
