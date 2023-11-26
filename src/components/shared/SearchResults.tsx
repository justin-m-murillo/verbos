import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GridPostList from './GridPostList';
import { IconWarning } from '@/constants';

export type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
  if (isSearchFetching) 
    return <Loader />
  else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />
  } else { 
    return (
      <div className='flex-center items-center text-light-4 mt-10 w-full'>
        <IconWarning size={24} className={`mr-1`} /> No results found
      </div>
    );
  }
}

export default SearchResults