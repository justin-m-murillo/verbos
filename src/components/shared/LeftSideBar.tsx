import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { getSidebarLinks, twIconColor } from '@/constants'
import LogoutButton from './LogoutButton'

const LeftSideBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const sidebarLinks = getSidebarLinks();

  useEffect(() => {
    if (isSuccess) navigate(0);
  
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img 
            src='/assets/icons/logo.svg'
            alt='logo'
            width={100}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img 
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-12 w-12 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map(link => { 
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <link.Icon 
                    size={28}
                    className={`${twIconColor} group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <LogoutButton size={24} signOut={signOut}>
        <p className='small-medium lg:base-medium'>Logout</p>
      </LogoutButton>
    </nav>
  )
}

export default LeftSideBar