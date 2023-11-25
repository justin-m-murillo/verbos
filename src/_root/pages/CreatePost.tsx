import PostForm from '@/components/forms/postform/PostForm';
import { MdOutlineAddBox } from 'react-icons/md';

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <MdOutlineAddBox size={40} />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost