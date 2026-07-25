import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImg,title,author,deleteBlogs,id}) => {

    let date = new Date().toLocaleDateString('en-US');



    
  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-5 py-3 font-medium text-gray-900 whitespace-nowrap'>
            <Image src={authorImg?authorImg:assets.profile_icon} alt='' width={40} height={40}/>
            <p className='text-bold'>{author?author:"No author"}</p>
        </th>
        <td className='px-6 py-4'>
            {title?title:"No title"}
        </td>
        <td className='px-6 py-4'>
            {date}
        </td>
        <td onClick={()=>deleteBlogs(id)} className='px-10 py-4 cursor-pointer'>
            ❌
        </td>
    </tr>
  )
}

export default BlogTableItem