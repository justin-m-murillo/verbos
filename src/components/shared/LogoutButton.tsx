import { Button } from '@/components/ui/button'
import { UseMutateFunction } from '@tanstack/react-query';
import { MdLogout } from 'react-icons/md'

type LogoutButtonProps = {
  size: number;
  children?: React.ReactNode;
  signOut: UseMutateFunction<{} | undefined, Error, void, unknown>
}

const LogoutButton = ({ size, children, signOut }: LogoutButtonProps) => {
  return (
    <Button 
      variant='ghost' 
      className='shad-button_ghost'
      onClick={() => signOut()}
    >
      <MdLogout size={size} className='text-indigo-500' />
      { children }
    </Button>
  )
}

export default LogoutButton