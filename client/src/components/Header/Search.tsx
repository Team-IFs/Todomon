import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import Dialogue from './Dialogue';
import { UserWithEmail } from '../../types/user';

const SearchBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid gray',
  borderRadius: '5px',
  justifyContent: 'center',
  padding: '5px',
})

const SearchIconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Search = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<UserWithEmail>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: UserWithEmail) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <SearchBar onClick={handleClickOpen}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
      />
      <Dialogue
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
      />
    </SearchBar>
  )
}
export default Search