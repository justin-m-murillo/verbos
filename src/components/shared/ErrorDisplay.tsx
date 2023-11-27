import { IconWarning } from '@/constants';

export type ErrorDisplaySmallProps = {
  message: string;
}

export type ErrorDisplayLargeProps = {
  message?: string[];
}

export const ErrorDisplaySmall = ({ message }: ErrorDisplaySmallProps) => {
  return (
    <div className='flex-center items-center text-light-4 mt-10 w-full'>
      <IconWarning size={24} className={`mr-1`} /> {message}
    </div>
  )
}

export const ErrorDisplayLarge = ({ 
  message=[
    'Error loading page.',
    'Please refresh the page or try again later.',
  ] 
}: ErrorDisplayLargeProps) => {
  return (
    <div className='flex flex-col flex-wrap w-full h-full items-center mt-40 text-light-4'>
      <IconWarning size={48} />
      {message.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  )
}