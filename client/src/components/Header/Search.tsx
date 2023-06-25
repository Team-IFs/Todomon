
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '5px',
  justifyContent: 'center',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#eeeeee',
  },
})

const SearchIconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const SearchInput = styled.input({
  border: 'none',
  padding: '5px',
  outline: 'none',
  backgroundColor: 'transparent',
})
const Search = () => {
  return (
    <SearchBar>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput placeholder='search' />
            </SearchBar>
  )
}
export default Search