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
import {motion} from 'framer-motion'

interface ProfileInfo {
  profile: any;
}
interface TweetInfo {
  tweets: any;
}

const fetcher = async (url: string): Promise<ProfileInfo> => {
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

const Profile: NextPage = () => {

  const {data, error} = useSWR<ProfileInfo>('/api/profile-data', fetcher)
  const { data :tweets, error : tweetsError } = useSWR<TweetInfo>('/api/get-tweet', tweet_fetcher);
  const [image, setImage] = useState<string[]>([])

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

  if (!data) return <div>Loading...</div>;
  if (!tweets) return <div>Loading...</div>

  console.log(data.profile)

  const pageEffect = {
    initial: {
      x:500
    },
    in: {
      x: 0
    },
    out: {
      opacity: 0
    }
  }

  return (
    <>
        <section className='flex justify-center'>
            <div className='h-screen max-w-md w-full overflow-scroll border border-gray-100 relative'>
                <motion.div
                initial="initial"
                animate="in"
                exit="out"
                transition={{duration: 0.5}}
                variants={pageEffect}>
                <header className='h-12 flex border-b border-gray-200 items-center text-xl font-bold pl-4 pt-4 sticky top-0 bg-white'>
                    {data.profile[0].nickname}
                </header>
                <div className="profile w-full h-24 flex justify-around items-center">
                    {data.profile[0].profile == "" ? (
                        <img key={data.profile[0].id} src='/profile/notfound.jpg' className='w-24 h-24 rounded-full border border-black' />

                    ) : (
                        <img key={data.profile[0].id} src={data.profile[0].profile.replace('public', '')} className='w-24 h-24 rounded-full border border-black' />

                    )}
                    <div className='w-12 h-12  flex flex-col justify-center items-center'>
                        <div className='text-sm font-bold'>1</div>
                        <div className='text-xs'>게시물</div>
                    </div>
                    <div className='w-12 h-12  flex flex-col justify-center items-center'>
                        <div className='text-sm font-bold'>1</div>
                        <div className='text-xs'>팔로워</div>
                    </div>
                    <div className='w-12 h-12  flex flex-col justify-center items-center'>
                        <div className='text-sm font-bold'>1</div>
                        <div className='text-xs'>팔로잉</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-12">
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                        <div className="border border-gray-100 h-36"></div>
                </div>
                
                </motion.div>
                <Nav />
            </div>
            
        </section>
    </>
  )
}

export default Profile;
