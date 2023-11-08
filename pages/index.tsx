import type { NextPage } from 'next';
import {AiOutlineHeart as HeartIcon, AiOutlineMessage as MessageIcon,
  AiOutlineHome as HomeIcon} from 'react-icons/ai'

import {MdOutlineAddCircleOutline as AddIcon} from 'react-icons/md' 
import {CgProfile as ProfileIcon} from 'react-icons/cg'
import useSWR from 'swr';
import { useRouter } from 'next/router';

interface LoginInfo {
  loggedIn: boolean;
  user?: any;
}

const fetcher = async (url: string): Promise<LoginInfo> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const Home: NextPage = () => {

  const {data, error} = useSWR<LoginInfo>('/api/user-data', fetcher)

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

  if(data.loggedIn !== true){
    router.push('/log-in')
  }

  return (
    <>
      <section className='flex justify-center'>
      <div className='border border-black h-screen max-w-md relative'>
        <header className='flex justify-between items-center w-full h-12 text-2xl font-bold p-4'>
          <div className='font-dancing'>Hangram</div>
          <div> 
            <HeartIcon />
          </div>
        </header>
        <div className='w-full h-24 border-b-2 border-gray-200 flex items-center pl-4 overflow-scroll scrollbar-hide'>
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
            <div className="header h-12 border-b-2 border-gray-200 flex items-center p-4">
              <div className="img h-8 w-8 rounded-full border-2 border-black"></div>
              <div className="nickname text-sm ml-4 font-bold">nomad_coders</div>
            </div>
            <div className="main w-full max-h-max bg-blue-300">
              {word}
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
        </main>
        <footer className='flex justify-between items-center w-full h-12 text-2xl font-bold p-4 absolute left-0 bottom-0 border-t border-gray-200'>
          <HomeIcon />
          <AddIcon />
          <ProfileIcon />
        </footer>
      </div>
      </section>
    </>
  )
}

export default Home;
