import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {motion} from 'framer-motion'

import {IoChevronBackOutline as BackIcon} from 'react-icons/io5'

type FormData = {
    nickname: string;
    email: string;
    password: string;
}

const CreateAccount: NextPage = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);
    const [value, setValue] = useState('');

    const router = useRouter();

    const steps = ['nickname', 'email', 'password'];

    const onSubmit = async (data: FormData) => {
        
        if (step < 3) {
          setStep(step + 1);
        } else {
          const response = await fetch('/api/create-account', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          const result = await response.json()

          router.push('/log-in')
        }
      };

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
        <div className=' h-screen max-w-md w-full relative pt-4 overflow-hidden'>
           <motion.div
              initial="initial"
              animate="in"
              exit="out"
              transition={{duration: 0.5}}
              variants={pageEffect}>
           <header className='h-10 flex items-center justify-start p-4'>
                <Link href={'/log-in'}>
                  <BackIcon className="text-2xl"/>
                </Link>
           </header>
           <main>
            <div className='text-lg pl-4 pt-4 pb-2 font-bold'>{step === 1 ? '닉네임 입력' : step === 2 ? '이메일 입력' : '비밀번호 입력'}</div>
            <div className='text-xs pl-4'>{step === 1 ? '닉네임을 추가하세요.' : step === 2 ? '이메일을 추가하세요.' : '비밀번호는 다음 규칙을 따라야합니다.'}</div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center p-4'>
                <div className={`form-step-${step} w-full `}>
                    <Controller
                    name={steps[step - 1]}
                    control={control}
                    defaultValue=""
                    rules={{ required: '필수 입력 사항입니다' }}
                    render={({ field }) => (
                        <input
                        {...field}
                        type={step === 3 ? 'password' : step === 2 ? 'email' : 'text'}
                        placeholder={step === 1 ? '닉네임' : step === 2 ? '이메일' : '비밀번호'}
                        className='w-full h-10 rounded-xl border border-gray-200 pl-4'
                        />
                    )}
                    />
                    {errors[steps[step - 1]] && <p className='font-bold text-red-600 text-sm pt-2 mb-4'>{errors[steps[step - 1]].message}</p>}
                </div>
                <button type="submit" className=' h-10 w-full rounded-2xl text-white bg-blue-600 flex justify-center items-center mt-4'>{step < 3 ? '다음으로' : '회원가입'}</button>
            </form>
           </main>
           </motion.div>
        </div>
      </section>
    </>
  )
}

export default CreateAccount;
