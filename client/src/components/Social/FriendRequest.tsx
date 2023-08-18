import { useEffect, useState } from 'react';
import { getFriendRequest } from '../../utils/axios/social';
import { FriendInterface } from '../../types/user';
import UserCard from './UserCard';
import { List, ListItem } from '@mui/material';

const FriendRequest = () => {
  const [requestLists, setRequestLists] = useState([]);
  const friendRequest = () => {
    getFriendRequest().then((res) => {
      if (res) {
        setRequestLists(res.content);
      }
      
    });
  }
  
  useEffect(() => { 
    friendRequest();
  }, []);

  return <>
    <div>친구 요청</div>
    <List>
      {requestLists.map((rq: FriendInterface) => (
        <ListItem key={rq.friend.memberId}>
          <UserCard
            nickname={rq.friend.nickname}
            bio={rq.friend.bio}
            todomon={rq.friend.todomon}
            friendId={rq.friendId}
            isFriendSetting={true}
            />
        </ListItem>
      ))}
    </List>
    
  </>
}

export default FriendRequest;