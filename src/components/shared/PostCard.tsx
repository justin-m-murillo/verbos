import { IconEdit, IconMapPin, twIconColor } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { formatDateString, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import Loader from "./Loader";

type PostCardProps = {
  post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img 
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='creator'
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="sm:flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.$createdAt).slice(0, 12)}
              </p>
              <div className="flex flex-row items-center">
                <IconMapPin size={14} />
                <p className="subtle-semibold lg:small-regular">
                  {post.location}
                </p>
              </div>
            </div>
            {post.$updatedAt && post.$updatedAt !== post.$createdAt 
              ? <p className="pt-2 sm:pt-0 subtle-semibold lg:small-regular text-light-3">
                  Updated {multiFormatDateString(post.$updatedAt)} 
                </p>
              : null
            }
          </div>
        </div>

        <Link 
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <IconEdit size={24} className={twIconColor} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: number) => (
              <li key={index} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {post.imageUrl 
          ? <img 
              src={post.imageUrl}
              className="post-card_img"
              alt={`image: ${post.caption}`}
            />
          : <Loader />
      }
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard