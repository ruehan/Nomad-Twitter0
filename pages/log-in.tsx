import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {motion} from 'framer-motion'

type FormData = {
    nickname: string;
    email: string;
    password: string;
}

const Login: NextPage = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>();

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        const response = await fetch('/api/log-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        router.push("/")
    }

    const pageEffect = {
        initial: {
          x:-500
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
        <div className=' h-screen max-w-md w-full relative overflow-hidden'>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                transition={{duration: 0.5}}
                variants={pageEffect}
                className="relative h-screen w-full">
                
                <header className='w-full h-1/2 flex justify-center items-center'>
                    <div className='font-dancing text-6xl'>Hangram</div>
                </header>
                <main className='w-full h-1/4 '>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col justify-center items-center'>
                    {errors.email && <span className='text-red-500 font-bold text-sm'>{errors.email.message}</span>}
                    <input
                        {...register('email', {
                            required: '이메일을 입력해주세요.',
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: '올바르지 않은 이메일 형식 입니다.'
                            }
                        })}
                        placeholder='이메일'
                        className="mt-4 pl-4 border border-gray-200 h-10 w-5/6 rounded-xl" />

                    {errors.password && <span className='mt-4 text-red-500 font-bold text-sm'>비밀번호를 입력해주세요.</span>}
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder='비밀번호'
                        className="mt-4 pl-4 border border-gray-200 h-10 w-5/6 rounded-xl" />

                    <button type="submit" className="mt-4 rounded-3xl w-5/6 h-10 rounded-2xl text-white bg-blue-600">로그인</button>
                    <Link href={'/'} className='text-sm mt-2 '>비밀번호를 잊으셨나요?</Link>
                    </form>
                </main>
                <footer className='w-full h-1/5 flex justify-center items-end'>
                    <div className='mt-4 rounded-3xl w-5/6 h-10 rounded-2xl text-blue-600 border border-blue-600 flex justify-center items-center'>
                    <Link href={'/create-account'} className="w-full h-full">
                        새 계정 만들기
                    </Link>
                    </div>
                </footer>
            </motion.div>
        </div>
      </section>
    </>
  )
}

export default Login;
