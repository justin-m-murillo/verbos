import Loader from './Loader';

type LoaderBtnDisplayProps = {
  loaderCondition: boolean;
  loadingText?: string;
  notLoadingText: string;
}

const LoaderBtnDisplay = ({ 
  loaderCondition, 
  loadingText, 
  notLoadingText
}: LoaderBtnDisplayProps) => {
  return (
    <>
      {loaderCondition ? (
        <div className='flex-center gap-2'>
          <Loader /> {loadingText}
        </div>
      ): `${notLoadingText}`}
    </>
  )
}

export default LoaderBtnDisplay