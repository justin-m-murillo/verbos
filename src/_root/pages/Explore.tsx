import { ErrorDisplayLarge } from '@/components/shared/ErrorDisplay';
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input'
import { IconErase, IconSearch, IconSearchFilter, twSearchColor } from '@/constants'
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isError: isErrorExplore } = useGetPosts();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue); 

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();

  }, [inView, searchValue])

  if (isErrorExplore) return <ErrorDisplayLarge />
  
  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length === 0);
  
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <IconSearch size={20} className={twSearchColor} />
          <Input 
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconErase 
            size={20} 
            className={`${twSearchColor} cursor-pointer`} 
            onClick={() => setSearchValue('')}
          />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>

        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <IconSearchFilter size={20} className={twSearchColor} />
        </div>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults 
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ): shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>
            posts
          </p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`pages-${index}`} posts={item?.documents} />
        ))}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore