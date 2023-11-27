import Loader from './Loader';
import GridPostList from './GridPostList';
import { ErrorDisplaySmall } from './ErrorDisplay';

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
      <ErrorDisplaySmall message='No results found.' />
    );
  }
}

export default SearchResults