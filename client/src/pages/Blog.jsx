import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from "moment";
import Footer from "../components/Footer"
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Blog = () => {
  const {id} = useParams();
  const {axios,token} = useAppContext();
  const [data,setData] = useState(null);
  const [comments,setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  
  const fetchBlogData = async () =>{
  try {
    const response = await axios.get(`/api/blog/${id}`)
    console.log('Blog fetch response:', response);
    const {data} = response;
    data.success ? setData(data.blog) : toast.error(data.message)
  } catch (error) {
    toast.error(error.message)
  }
  };

  const fetchComments= async() =>{
    try {
      const {data} = await axios.get(`/api/comment/all/${id}`)
      console.log('Blog data:', data);
      if (data.success) {
        setComments(data.comments)
      } else {
        setComments([])
        toast.error(data.message)
      }
    } catch (error) {
      setComments([])
      toast.error(error.message)
    }
  };

  const addComment =async(e) =>{
    e.preventDefault()
    try {
      if (!name.trim() || !content.trim()) {
            toast.error('Name and comment are required');
            return;
        }
      console.log('Sending comment:', { blog: id, name, content });
      const {data} = await axios.post(`/api/comment/add`, {blog:id, name, content});
       console.log('Comment response:', data); 
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
        await fetchComments();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }
  useEffect(() => {
    if (!token) return;
  // Only fetch if token is already attached to axios
  const hasAuthHeader = axios.defaults.headers.common['Authorization'];
  if (!hasAuthHeader && token ) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.warn('No token yet. Waiting...');
    return;
  }
if (axios.defaults.headers.common['Authorization']) {
  
    fetchBlogData();
    fetchComments();
}
}, [token]);

  
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="background" className='absolute -top-50 -z-1 opacity-50' />
      <Navbar/>

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published On {Moment(data.createdAt).format('MMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg trucate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>John Doe</p>
      </div>

      <div className='max-5 max-w-5xl md:mx-auto my-10 m-4 '>
        <img src={data.image} alt="photu" className='rounded-3xl mb-5'/>
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>


          {/*comment */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({Array.isArray(comments) ? comments.length : 0})</p>

          <div className='flex flex-col gap-4'>
            {Array.isArray(comments) && comments.map((item, index) =>(
              <div key={index} className="relative bg-primary/2 border border-primary/5  max-w-xl p-4 rounded text-gray-600">
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6 ' />
                  <p className='font-medium '>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
        {/* ADD comment */}
<div className='max-w-3xl mx-auto'>
  <p className='font-semibold mb-4'>Add your comment</p>
  <form onSubmit={addComment} className='flex flex-col item-start gap-4 max-w-lg'>
    <input onChange={(e) =>setName(e.target.value)}
     value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' />
    <textarea  required onChange={(e) =>setContent(e.target.value)} value={content} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48'></textarea>
    <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all  cursor-pointer'>Submit</button>
  </form>
</div>
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4'>Share this article on Social Media</p>
        <div className='flex'>
          <img src={assets.facebook_icon} width={50} alt="facebook"/>
          <img src={assets.twitter_icon} width={50} alt="twitter" />
          <img src={assets.googleplus_icon} width={50} alt="google_plus" />

        </div>
      </div>
      </div>
<Footer/>


    </div>
  ) : <div className="div"><Loader/></div>
}

export default Blog
