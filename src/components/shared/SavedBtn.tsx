import { IconSave, IconSaveFilled, twIconColor } from '@/constants'
import React from 'react'

type SavedBtnProps = {
  isSaved: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const SavedBtn = ({ isSaved, onClick }: SavedBtnProps) => {
  const Saved = isSaved ? IconSaveFilled : IconSave;

  return (
    <Saved 
      size={20} 
      className={`${twIconColor} cursor-pointer`} 
      onClick={onClick}
    />
  )
}

export default SavedBtn