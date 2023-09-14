import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import { getUserSearch } from '../../utils/axios/userInfo';
import NewCat from '../../assets/NewCat';
import { User, UserWithEmail } from '../../types/user';
import { useRecoilState } from 'recoil';
import { CurrentClickedUser } from '../../recoil/atoms/atoms';
import { useRouter } from '../../hooks/useRouter';

const SearchBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: '300px',
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

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: UserWithEmail | User| undefined;
  onClose: () => void;
  setOpen: any;
}


function Dialogue(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, setOpen } = props;
  const [input, setInput] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [currentClickedUser, setCurrentClickedUser] = useRecoilState(CurrentClickedUser);


  const userSearch = (input: string) => {
    getUserSearch(input).then((res) => {
      if (res) {
        console.log(res.content);
        setSearchedResults(res.content);
      }
    });
  }

  const handleClose = () => {
    // onClose(selectedValue);
    setOpen(false);
  };

  const { routeTo } = useRouter();

  const handleListItemClick = async(result: User) => {
    setCurrentClickedUser(result);
    await routeTo('/otheruserhome');
    onClose();
  };

  const onInputChange = (e: any) => {
    setInput(e.target.value);
  }

  useEffect(() => {
    if (input.length > 0 && input.trim() !== '') {
      userSearch(input);
    }

  }, [input]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}>
      <DialogTitle>친구 검색</DialogTitle>
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <InputBase
          autoFocus
          sx={{ ml: 1, width: 1 }}
          placeholder='이메일로 친구를 검색하세요'
          onChange={onInputChange}
        />
      </SearchBar>
      <List sx={{ pt: 0 }} >
        {searchedResults.length > 0
          && searchedResults.map((result: UserWithEmail) => (
          <ListItem disableGutters key={result.memberId}>
            <ListItemButton
              key={result.memberId}
              onClick={() => handleListItemClick(result)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
              <ListItemAvatar>
                <NewCat todomonColor={result.todomon}/>
              </ListItemAvatar>
              <ListItemText primary={result.nickname} secondary={result.email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Dialogue;