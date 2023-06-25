import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Cat from '../../assets/Cat';
import { removeCookie } from '../../utils/cookies/cookies';
import { useRecoilState } from 'recoil';
import { useRouter } from '../../hooks/useRouter';
import { IsLogin } from '../../recoil/atoms/atoms';
import styled from '@emotion/styled';

const UserCat = styled.div({
  width: '40px',
  height: '40px',
  display: 'flex',
})
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { routeTo } = useRouter()
  const [, setIsLogin] = useRecoilState(IsLogin);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    removeCookie('accessJwtToken')
    removeCookie('refreshJwtToken')
    setIsLogin(false)
    alert('로그아웃되었습니다!')
    routeTo('/')
  }
  const handleSettingClick = () => {
    routeTo('/settings')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            size={'medium'}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <UserCat>
              <Cat />
            </UserCat>
            
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSettingClick}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          설정
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}