import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import StarsIcon from '@mui/icons-material/Stars';
import Settings from '@mui/icons-material/Settings';
import { SidebarContent } from '../router';
import { useRouter } from '../hooks/useRouter'
import { Divider } from '@mui/material';

const sidebarIcons = [<Settings/>, <ListIcon/>,<PeopleIcon/>, <StarsIcon/>]

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
    <>
      <Box sx={{ width: '100%', maxWidth: 210 }}>
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
      <Divider orientation="vertical" />
    </>
  );
}

export default Sidebar