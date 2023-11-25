import { Button } from '@/components/ui/button'
import { IconLogout, twIconColor } from '@/constants';
import { UseMutateFunction } from '@tanstack/react-query';

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
      <IconLogout size={size} className={`${twIconColor}`} />
      { children }
    </Button>
  )
}

export default LogoutButton