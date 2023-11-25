import { Link, useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import LogoutButton from './LogoutButton'

const TopBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext(); 

  useEffect(() => {
    if (isSuccess) navigate(0);
  
  }, [isSuccess]);

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <img 
            src='/assets/icons/logo.svg'
            alt='logo'
            width={130}
            height={325}
          />
        </Link>

        <div className='flex gap-4'>
          <LogoutButton size={32} />
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img 
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar