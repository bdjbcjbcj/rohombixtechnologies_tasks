 import { Trash2 } from 'lucide-react';
import React from 'react'
 
 const SubsTableItem = ({email,id,deleteEmail}) => {
    
    let date = new Date().toLocaleDateString('en-US');
   return (
    <tr className='bg-white border-b text-left'>
        <th className='px-5 py-3 text-gray-900 font-medium whitespace-nowrap'>
            {email?email:"No Emails"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>{date}</td>
       <td className="text-center">
  <button
    onClick={() => deleteEmail(id)}
    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
  >
    <Trash2 size={18} />
  </button>
</td>
    </tr>
   )
 }
 
 export default SubsTableItem