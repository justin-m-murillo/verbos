import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { IconEdit, IconMapPin, IconPostDelete, twIconColor, twTrashColor, twTrashColorHover } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { formatDateString, multiFormatDateString } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {
  const { id } = useParams();
  const {  data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();

  const handleDeletePost = () => {
    console.log('delete post')
  }

  return (
    <div className='post_details-container'>
      {isPending ? <Loader /> : (
        <div className='post_details-card'>
          <img 
            src={post?.imageUrl}
            alt='post image'
            className='post_details-img'
          />
          <div className="post_details-info">
            <div className='flex-between w-full'>
              <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                <img 
                  src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt='creator'
                  className="rounded-full w-10 h-10 lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="sm:flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {post && formatDateString(post.$createdAt).slice(0, 12)}
                    </p>
                    <div className="flex flex-row items-center">
                      <IconMapPin size={14} />
                      <p className="subtle-semibold lg:small-regular">
                        {post && post.location}
                      </p>
                    </div>
                  </div>
                  {post && post.$updatedAt !== post.$createdAt 
                    ? <p className="pt-2 sm:pt-0 subtle-semibold lg:small-regular text-light-3">
                        Updated {multiFormatDateString(post.$updatedAt)} 
                      </p>
                    : null
                  }
                </div>
              </Link>
              <div className='flex-center flex-col gap-4 xs:flex-row'>
                <Link 
                  to={`/update-post/${post?.$id}`} 
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <IconEdit size={24} className={twIconColor} />
                </Link>
                <IconPostDelete 
                  size={24} 
                  className={`
                    ${twTrashColor} ${twTrashColorHover} 
                    cursor-pointer transition 300ms
                    ${user.id !== post?.creator.$id && 'hidden'}
                  `} 
                  onClick={handleDeletePost}
                />
              </div>
            </div>
            
            <hr className='border w-full border-dark-4/80' />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: number) => (
                  <li key={index} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails