import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    nickname: string;
    email: string;
    password: string;
}

const CreateAccount: NextPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);

    const router = useRouter();

    const steps = ['nickname', 'email', 'password'];

    // const onSubmit = async (data: FormData) => {
    //     const response = await fetch('/api/log-in', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     })

    //     const result = await response.json()
    //     console.log(result)

    //     router.push("/")
    // }

    const onSubmit = (data: any) => {
        if (step < 3) {
          setStep(step + 1);
        } else {
          // 여기에서 회원가입 처리를 수행할 수 있습니다.
          console.log(data);
        }
      };

  return (
    <>
      <section className='flex justify-center'>
        <div className='border-2 border-black h-screen max-w-md w-full relative'>
           <header className='h-10 bg-gray-200 flex items-center justify-start p-4'>
                back
           </header>
           <main>
            <div className='text-lg pl-4 pt-4 pb-2 font-bold'>{step === 1 ? '닉네임 입력' : step === 2 ? '이메일 입력' : '비밀번호 입력'}</div>
            <div className='text-xs pl-4'>{step === 1 ? '닉네임을 추가하세요.' : step === 2 ? '이메일을 추가하세요.' : '비밀번호는 다음 규칙을 따라야합니다.'}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`form-step-${step} w-full p-4`}>
                    <Controller
                    name={steps[step - 1]}
                    control={control}
                    defaultValue=""
                    rules={{ required: '필수 입력 사항입니다' }}
                    render={({ field }) => (
                        <input
                        {...field}
                        type={step === 3 ? 'password' : 'text'}
                        placeholder={step === 1 ? '닉네임' : step === 2 ? '이메일' : '비밀번호'}
                        className='w-full h-10 rounded-xl border border-gray-200 pl-4'
                        />
                    )}
                    />
                    {errors[steps[step - 1]] && <p className='font-bold text-red-600 text-sm pt-2'>{errors[steps[step - 1]].message}</p>}
                </div>
                <button type="submit" className='p-4 h-10 w-full rounded-2xl text-white bg-blue-600 flex justify-center items-center'>{step < 3 ? '다음으로' : '회원가입'}</button>
            </form>
           </main>
        </div>
      </section>
    </>
  )
}

export default CreateAccount;
