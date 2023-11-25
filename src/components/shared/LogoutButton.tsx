import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

type LogoutButtonProps = {
  size: number;
  children?: React.ReactNode;
}

const LogoutButton = ({ size, children }: LogoutButtonProps) => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  
  }, [isSuccess]);

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