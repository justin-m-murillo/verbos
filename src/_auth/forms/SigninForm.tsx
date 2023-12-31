import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from '@/lib/validation';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import LoaderBtnDisplay from '@/components/shared/LoaderBtnDisplay';

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate('/');
    } else {
      return toast({ title: "Sign up failed. Please try again." });
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/icons/logo.svg' alt='logo' className='w-[240px] mb-4' />
        <h2 className='h3-bold sm:h2-bold'>Log in to your account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back! Please enter your login info.</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='shad-button_primary mt-2'>
            <LoaderBtnDisplay 
              loaderCondition={isSigningIn}
              loadingText='Loading...'
              notLoadingText='Sign in'
            />
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Forgot email or password?
            <Link to='' className='text-primary-500 text-small-semibold ml-1'>Click here</Link>
          </p>
          <p className='text-small-regular text-light-2 text-center'>
            Don't have an account?
            <Link to='/sign-up' className='text-primary-500 text-small-semibold ml-1'>Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm