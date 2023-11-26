import { IconHeartLiked, IconHeartPlus, twIconColor, twIconLikedColor } from '@/constants';
import { checkIsLiked } from '@/lib/utils';
import React from 'react'

type HeartBtnProps = {
  likes: any;
  userId: string;
  onClick: (e: React.MouseEvent) => void
}

const HeartBtn = ({ likes, userId, onClick }: HeartBtnProps) => {
  const liked = checkIsLiked(likes, userId);
  const Heart = liked ? IconHeartLiked : IconHeartPlus;

  return (
    <Heart 
      size={20} 
      className={`${liked ? twIconLikedColor : twIconColor} cursor-pointer`} 
      onClick={onClick}
    />
  )
}

export default HeartBtn