import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? 
        ( 
          <Navigate to='/' /> 
        ) : 
        (
          <>
            <section className='flex flex-1 justify-center items-center flex-col py-10'>
              <Outlet />
            </section>
            
            {/** 
             * Image provided by Jonny Gios
             * https://unsplash.com/photos/a-person-standing-in-a-tunnel-with-a-light-painting-k5-SBfIvSZs?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
             * */}
            <img 
              src='/assets/images/sign-up-splash.jpg'
              alt='logo'
              className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            />
          </>
        )
      }
    </>
  )
}

export default AuthLayout