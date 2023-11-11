import type { NextPage } from 'next';
import {AiOutlineHeart as HeartIcon, AiOutlineMessage as MessageIcon,
  AiOutlineHome as HomeIcon} from 'react-icons/ai'

import {MdOutlineAddCircleOutline as AddIcon} from 'react-icons/md' 
import {CgProfile as ProfileIcon} from 'react-icons/cg'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from './components/nav';

interface LoginInfo {
  loggedIn: boolean;
  user?: any;
}
interface TweetInfo {
  tweets: any;
}

interface ProfileInfo {
  profile: any;
}

const fetcher = async (url: string): Promise<LoginInfo> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const tweet_fetcher = async (url: string): Promise<TweetInfo> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const profile_fetcher = async (url: string): Promise<ProfileInfo> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const Home: NextPage = () => {

  const {data, error} = useSWR<LoginInfo>('/api/user-data', fetcher)
  const { data :tweets, error : tweetsError } = useSWR<TweetInfo>('/api/get-tweet', tweet_fetcher);
  const {data: profiles, error: profilesError} = useSWR<ProfileInfo>('/api/profile-data', profile_fetcher)

  const [image, setImage] = useState<string[]>([])

// useEffect(() => {
//   if (tweets) {
//     const newImages = tweets.tweets.reduce((acc: any, tweet: any) => {
//       if (tweet.images !== undefined) {
//         return [...acc, ...tweet.images.split(',')];
//       }
//       return acc;
//     }, []);

//     setImage((prevImages) => [...prevImages, ...newImages]);
//   }
// }, [tweets]);

useEffect(() => {
  if (tweets) {
    const newImages = tweets.tweets.flatMap((tweet: any) => 
      tweet.images ? tweet.images.split(',') : []
    );

    // Set을 사용하여 중복을 제거하고 기존 이미지들과 새로운 이미지들을 합칩니다.
    setImage((prevImages) => [...new Set([...prevImages, ...newImages])]);
  }
}, [tweets]);

  console.log(image)

  const router = useRouter();

  const word = `
    123
    456
    789
    abc
    def
    ghi
  `

  if (!data) return <div>Loading...</div>;
  if (!tweets) return <div>Loading...</div>
  if (!profiles) return <div>Loading...</div>;

  console.log(profiles)

  if(data.loggedIn !== true){
    router.push('/log-in')
  }

  return (
    <>
      <section className='flex justify-center'>
      <div className='border border-gray-100 h-screen max-w-md relative overflow-scroll scrollbar-hide'>
        <header className='sticky bg-white top-0 left-0 flex justify-between items-center w-full h-12 text-2xl font-bold p-4'>
          <div className='font-dancing'>Hangram</div>
          <div> 
            <HeartIcon />
          </div>
        </header>
        
        <div className='sticky top-12 left-0 bg-white w-full h-24 border-b-2 border-gray-200 flex items-center pl-4 overflow-scroll scrollbar-hide'>
          
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
          <div className="w-16 h-full flex flex-col justify-center items-center m-2">
            <div className="border-2 border-gray-300 w-16 h-16 rounded-full"></div>
            <div className="text-xs">ruehan_98</div>
          </div>
        </div>

        <main>
          <div className='card'>
            {tweets.tweets.map((tweet: any, index: any) => (

              <div className='w-full overflow-hidden'>
              <div className="header h-12 border-b-2 border-gray-200 flex items-center p-4">
                <div className="img h-8 w-8 rounded-full border border-black">
                  {(index >= 0 && index < profiles.profile.length) && tweet.email === profiles.profile[index].email ? (
                    <img key={tweet.id} src={profiles.profile[index].profile.replace('public', '')} className="h-8 w-8 rounded-full" />
                  ) : null}
                </div>
                <div className="nickname text-sm ml-4 font-bold">{tweet.nickname}</div>
              </div>
              <div className='flex w-full overflow-scroll scrollbar-hide'>
                {image.map((img: string) => (
                   tweet.images.includes(img) ? (
                    <>
                    <img key={tweet.id} src={img.replace('public', '')} width="90%" className="rounded-xl m-4" />
                    </>
                   ) : null
                )
                )}
              </div>
              <div className="main w-full max-h-max pl-4">
                {tweet.content}
              </div>
              <div className="footer h-8 border-b-2 border-gray-200 text-xl flex p-2 items-center">
              <div className='m-2'>
                <HeartIcon />
              </div>
              <div className='m-2'>
                <MessageIcon />
              </div>
            </div>
              </div>
            ))}
            
            
          </div>
        </main>
        <Nav />
      </div>
      </section>
    </>
  )
}

export default Home;
