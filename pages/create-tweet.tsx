import type { NextPage } from 'next';
import {motion} from 'framer-motion'
import {IoChevronBackOutline as BackIcon} from 'react-icons/io5'
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { SetStateAction, useEffect, useRef, useState } from 'react';

interface LoginInfo {
  loggedIn: boolean;
  user?: any;
}

type FormData = {
    // title: string;
    content: string;
    images: FileList;
    // album: string;
};

const fetcher = async (url: string): Promise<LoginInfo> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const CreateTweet: NextPage = () => {

    const {data, error} = useSWR<LoginInfo>('/api/user-data', fetcher)
    const {register, handleSubmit, setValue, watch} = useForm<FormData>();
    const images = watch("images");
    const router = useRouter();
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    

  if (!data) return <div>Loading...</div>;

  if(data.loggedIn !== true){
    router.push('/log-in')
  }

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


//   const onSubmit = async (data: FormData) => {
//     const formData = new FormData();
//     formData.append('content', data.content);

//     // console.log(data.images)

//     Array.from(data.images).forEach((file) => {
//       formData.append('images', file);
//     })

    

//     const response = await fetch('/api/create-tweet', {
//       method: 'POST',
//       body: formData
//     })

//     const result = await response.json();
//     if(response.ok){
//       alert('Upload Success');
//       router.push('/')
//     }else{
//       alert('Upload Fail');
//     }
//   }

  const onSubmit = async (formData: FormData) => {
    const uploadFormData = new FormData();
    uploadFormData.append('content', formData.content);

    // 여기서 formData.images 대신 images를 사용합니다.
    if (images && images.length) {
      Array.from(images).forEach((file) => {
        uploadFormData.append('images', file);
      });
    }

    const response = await fetch('/api/create-tweet', {
      method: 'POST',
      body: uploadFormData,
      // 'Content-Type': 'multipart/form-data' 헤더는 설정하지 않습니다.
      // 브라우저가 자동으로 설정하도록 합니다.
    });
    const result = await response.json();
    if(response.ok){
      alert('Upload Success');
      router.push('/')
    }else{
      alert('Upload Fail');
    }
  };

//   const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//         const files = event.target.files;
//         const newImagePreviewUrls: SetStateAction<string[]> = [];
//         for (let i = 0; i < files.length; i++) {
//             const reader = new FileReader();
//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 // e.target.result에는 이미지의 base64 인코딩된 URL이 포함되어 있습니다.
//                 if (e.target?.result) {
//                     newImagePreviewUrls.push(e.target.result as string);
//                     // 모든 이미지가 로드되었는지 확인한 후 상태를 업데이트합니다.
//                     if (newImagePreviewUrls.length === files.length) {
//                         setImagePreviewUrls(newImagePreviewUrls);
//                     }
//                 }
//             };
//             reader.readAsDataURL(files[i]);
//         }
//     }
// };

const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = event.target.files;
      const fileArray = Array.from(fileList);
      const newImagePreviewUrls: string[] = [];

      fileArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            newImagePreviewUrls[index] = e.target.result as string;
            if (newImagePreviewUrls.length === fileArray.length) {
              // 모든 이미지가 로드되었을 때만 상태를 업데이트합니다.
              setImagePreviewUrls(newImagePreviewUrls);
              // react-hook-form에 이미지 파일을 설정합니다.
              setValue('images', fileList);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };



  return (
    <>
      <section className='flex justify-center'>
      <div className='h-screen max-w-md w-full relative pt-4 overflow-hidden border border-gray-100'>
        <motion.div
              initial="initial"
              animate="in"
              exit="out"
              transition={{duration: 0.5}}
              variants={pageEffect}>
        <header className='h-10 flex items-center justify-start p-4 border-b-2 border-gray-100'>
            <Link href={'/'}>
                <div className='flex w-full h-12 justify-center -mt-4 items-center '>
                    <BackIcon className="text-2xl"/>
                    <div className="">새 게시물</div>
                </div>
            </Link>
        </header>
        <main className='w-full '>
            <div className='w-full h-96 mt-8 flex justify-start overflow-scroll scrollbar-hide'>
                    {imagePreviewUrls.map((imageUrl, index) => (
                                <img key={index} src={imageUrl} alt="Preview" className="h-72 w-48 object-cover m-4" />
                            ))}
                
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <input {...register('images')} type="file" accept="image/*" multiple  className="w-4/6 border-2 rounded-xl border-gray-200 m-4" /> 
                <textarea {...register('content')} placeholder="문구를 입력하세요..." className="w-full h-48 p-4 text-sm resize-none"/>
            
                <button type="submit" className="w-5/6 border-2 rounded-xl border-gray-200 h-12 m-4">Upload</button>
            </form>
        </main>
        </motion.div>
      </div>
      </section>
    </>
  )
}

export default CreateTweet;
