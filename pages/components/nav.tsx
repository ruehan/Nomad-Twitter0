import type { NextPage } from 'next';
import {AiOutlineHeart as HeartIcon, AiOutlineMessage as MessageIcon,
  AiOutlineHome as HomeIcon} from 'react-icons/ai'

import {MdOutlineAddCircleOutline as AddIcon} from 'react-icons/md' 
import {CgProfile as ProfileIcon} from 'react-icons/cg'
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LoginInfo {
  loggedIn: boolean;
  user?: any;
}
interface TweetInfo {
  tweets: any;
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

const Nav: NextPage = () => {

  return (
    <>
        <footer className='sticky bg-white bottom-0 left-0 flex justify-between items-center w-full h-12 text-2xl font-bold p-4 absolute left-0 bottom-0 border-t border-gray-200 z-10'>
          <Link href='/'><HomeIcon /></Link>
          <Link href='/create-tweet'><AddIcon /></Link>
          <Link href='/profile'><ProfileIcon /></Link>
        </footer>
    </>
  )
}

export default Nav;
