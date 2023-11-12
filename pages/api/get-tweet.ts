// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 로그인 처리

    try{
      const sessionUser = req.session.get('user');
      const email = sessionUser.email

      const tweets = (await prisma.tweet.findMany()).reverse();
    const userData = await prisma.user.findMany()
    const usernameData = []

    userData.map((user) => {
      usernameData.push(user.nickname)
    })

    tweets.map(async (tweet) => {
        const dt = await prisma.like.findMany({
          where: { 
            name : sessionUser.nickname,
            tweetId : tweet.id,         
          },
        })
  
        if(dt.length === 0){
          await prisma.like.create({
            data: {
                tweetId : tweet.id,
                authorNickname : tweet.nickname,
                name : sessionUser.nickname,
                isLiked : false
            },
          })
        }
    })

    const likes = (await prisma.like.findMany(
      {
        where: { name : sessionUser.nickname },
      }
    ))

    const likesData = (await prisma.like.findMany())

    let i = 0

    let likedUser = []

    likes.map((like) => {
      for(i = 0; i < tweets.length; i++){
        if(like.tweetId === tweets[i].id){
          tweets[i]['isLiked'] = like.isLiked
        }
      }
    }
    )

    const counts = await prisma.tweet.count({
          where: {
            email: email
          }
        })

    let object = {}

    let data: any[] = []

    tweets.map((tweet) => {
      for(i = 0; i < likesData.length; i++){
        if(tweet.id === likesData[i].tweetId){
          if(likesData[i].isLiked === true){
            data.push(likesData[i].name)
          }
        }
      }
      tweet['likedUser'] = data
      data = []
    }
    )

    const result = {
          tweets: tweets,
          count: counts
    };
    
    res.status(200).json({ message: "find tweets", result });

    }catch(error){
      return res.status(400).json({message: error})
    }

    

   

}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long", // 환경변수에서 비밀 키 가져오기
  cookieName: 'MY_APP_COOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
