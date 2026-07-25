import { assets } from '@/Assets/assets'
import Sidebar from '@/components/AdminComponents/Sidebar'
import Image from 'next/image'
 import { ToastContainer, toast } from 'react-toastify';


const layout = ( {children}) => {
  return (
    <>
   <div className='flex '>
    <ToastContainer theme='dark'/>
    <Sidebar/>
    <div className='flex flex-col w-full  '>
      <div className='flex items-center justify-between border-b px-12 border-black py-2 w-full max-h-14 '>
        <h3 className='font-semibold'>Admin Panel</h3>
        <Image src={assets.profile_icon} alt='' width={40}/>
      </div>
      {children}
      
    </div>
   
   </div>
   </>
  )
}

export default layout