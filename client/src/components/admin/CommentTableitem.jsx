import {assets} from "../../assets/assets"

import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableitem = ({comment, fetchComments}) => {
    const{blog, createdAt,_id} =comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const approveComments = async()=>{
        try {
           const {data} = await axios.post(`/api/admin/approve-comment/${_id}`) 
           if (data.success) {
            toast.success(data.message)
            fetchComments();
           } else {
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const deleteComments = async()=>{
        try {
            const confirm = window.confirm("Are You sure want to delete this comments?")
            if(!confirm) return;
           const {data} = await axios.delete(`/api/admin/delete-comment/${_id}`) 
           if (data.success) {
            toast.success(data.message)
            fetchComments();
           } else {
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <tr className='order-y border-gray-300'>
        <td className='px-6 py-2'>
            <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
            <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> :{comment.name}
            <br />
            <b className='font-medium text-gray-600'>Comment</b>{comment.content}
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleString()}
        </td>
        <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
            {!comment.isApproved ? <img onClick={approveComments} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer'/>:<p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
            <img onClick={deleteComments} src={assets.bin_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer' />
        </div>
        </td>
      
    </tr>
  )
}

export default CommentTableitem
