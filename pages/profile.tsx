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
import { useForm } from 'react-hook-form';

interface ProfileInfo {
  profile: any;
}
interface TweetInfo {
  tweets: any;
}

type FormData = {
    images: FileList;
};

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
  const {register, handleSubmit, setValue, watch} = useForm<FormData>();
  const [image, setImage] = useState<string[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const images = watch("images");
  const router = useRouter();


  useEffect(() => {
    if (tweets) {
        const newImages = tweets.tweets.tweets.flatMap((tweet: any) => {
          if (tweet.images) {
            const parts = tweet.images.split(','); // 이미지 URL 문자열을 쉼표로 분리
            if (parts.length > 0) {
              return [parts[0]]; // 첫 번째 이미지 URL만 사용
            }
          }
          return [];
        });
      
        setImage((prevImages) => [...new Set([...prevImages, ...newImages])]);
      }
  }, [tweets]);

  if (!data) return <div>Loading...</div>;
  if (!tweets) return <div>Loading...</div>

  console.log(tweets)

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

  const openModal = () => {
    setModal((prev) => !prev)
  }

  const onSubmit = async (formData: FormData) => {
    const uploadFormData = new FormData();

    // 여기서 formData.images 대신 images를 사용합니다.
    if (images && images.length) {
      Array.from(images).forEach((file) => {
        uploadFormData.append('images', file);
      });
    }

    const response = await fetch('/api/change-profile', {
      method: 'POST',
      body: uploadFormData,
      // 'Content-Type': 'multipart/form-data' 헤더는 설정하지 않습니다.
      // 브라우저가 자동으로 설정하도록 합니다.
    });
    const result = await response.json();
    if(response.ok){
      alert('Upload Success');
    }else{
      alert('Upload Fail');
    }
  };


  return (
    <>
        <section className='flex justify-center'>
            <div className='h-screen max-w-md w-full overflow-scroll border border-gray-100 relative'>
                {modal && (
                    <div className="modal w-full h-96 bg-gray-100 absolute top-48 z-20 ">
                        <header className='h-10 w-full flex justify-start'>
                            <div className="" onClick={openModal}>취소</div>
                        </header>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                            <input {...register('images')} type="file" accept="image/*" className="w-4/6 border-2 rounded-xl border-gray-200 m-4" /> 
                        
                            <button type="submit" className="w-5/6 border-2 rounded-xl border-gray-200 h-12 m-4">Upload</button>
                        </form>
                    </div>
                )}
                <motion.div
                initial="initial"
                animate="in"
                exit="out"
                transition={{duration: 0.5}}
                variants={pageEffect}>
                <header className='h-12 flex border-b border-gray-200 items-center text-xl font-bold pl-4 pt-4 sticky top-0 bg-white'>
                    {data.profile[0].nickname}
                </header>
                <div className="profile w-full h-24 flex justify-around items-center mt-8">
                    {data.profile[0].profile == "" ? (
                        <img key={data.profile[0].id} src='/profile/notfound.jpg' className='w-24 h-24 rounded-full border border-black' />

                    ) : (
                        <img key={data.profile[0].id} src={data.profile[0].profile.replace('public', '')} className='w-24 h-24 rounded-full border border-black' />

                    )}
                    <div className='w-12 h-12  flex flex-col justify-center items-center'>
                        <div className='text-sm font-bold'>{tweets.tweets.count}</div>
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
                <div className="menu w-full h-12 flex mt-8 items-center justify-around text-sm">
                    <button className='bg-gray-200 rounded-xl w-48 h-8' onClick={openModal}>프로필 편집</button>
                    <button className='bg-gray-200 rounded-xl w-48 h-8'>프로필 공유</button>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-12">
                    {tweets.tweets.tweets.map((tweet: any) => (
                        image.map((img: string) => (
                            tweet.images.includes(img) && tweet.nickname === data.profile[0].nickname? (
                                <div className="border border-gray-100 h-48">
                                    <img key={tweet.id} src={img.replace('public', '')} className="w-full h-48" />
                                </div>
                            ) : null
                            )
                            )            
                    ))}
                </div>
                
                </motion.div>
                <Nav />
            </div>
            
        </section>
    </>
  )
}

export default Profile;
