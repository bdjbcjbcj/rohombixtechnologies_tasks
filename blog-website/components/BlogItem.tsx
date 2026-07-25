import { blog_data,assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface BlogItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

const BlogItem = ({title,description,category,image,id}:BlogItemProps) => {
  return (
    <div className='max-w-80 sm:max-w-72 border border-black bg-white my-8 hover:shadow-[-7px_7px_0_black]'>
      <Link href={`/blogs/${id}`}>
        <Image src={image} alt='' width={400} height={400} className='border-b border-black'/>
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
        <div className='p-5'>
            <h5 className='mb-2 text-lg font-medium tracking-tighter text-gray-900'>{title}</h5>
            <p className='mb-3 text-sm tracking-tighter text-gray-700'>{description}</p>
            <Link href={`/blogs/${id}`} className='inline-flex py-1 font-semibold items-center text-center gap-2'>
                Read More <Image src={assets.arrow} alt='' width={12}/>
            </Link>
        </div>
    </div>
  )
}

export default BlogItem