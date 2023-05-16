import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import StarsIcon from '@mui/icons-material/Stars';
import { SidebarContent } from '../router';
import { useRouter } from '../hooks/useRouter'

const sidebarIcons = [<ListIcon/>, <AccountCircleIcon/>, <PeopleIcon/>, <StarsIcon/>]

const Sidebar = () => {
  const { routeTo } = useRouter()
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    index: number,
    path: string
  ) => {
    setSelectedIndex(index);
    routeTo(path)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="sidebar">
        {SidebarContent.map((item, idx) => (
            <ListItemButton
            key={item.id}
            selected={selectedIndex === idx}
            onClick={() => handleListItemClick(idx, item.path)}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {sidebarIcons[idx]}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
}

export default Sidebar