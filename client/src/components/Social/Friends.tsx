import { List, ListItem } from '@mui/material';
import Card from './UserCard'
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { getFriends } from '../../utils/axios/social';
import { FriendInterface } from '../../types/user';

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const friendRequest = () => {
    getFriends().then((res) => {
      if (res) {
        console.log(res.content);
        setFriendsList(res.content.filter((friend:any) => friend.accepted === true));
      }
      
    });
  }
  
  useEffect(() => { 
    friendRequest();
  }, []);
  return <>
    <div>내 친구 목록</div>
    <List>
      {friendsList.map((rq: FriendInterface) => (
        <ListItem key={rq.friend.memberId}>
          <UserCard
            nickname={rq.friend.nickname}
            bio={rq.friend.bio}
            todomon={rq.friend.todomon}
            friendId={rq.friend.memberId}
            isFriendSetting={false}
            />
        </ListItem>
      ))}
    </List>
  </>
}

export default Friends;