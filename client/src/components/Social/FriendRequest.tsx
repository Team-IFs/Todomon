import { useEffect, useState } from 'react';
import { getFriendRequestedList, getFriendReceivedList } from '../../utils/axios/social';
import { FriendInterface } from '../../types/user';
import UserCard from './UserCard';
import { List, ListItem } from '@mui/material';
import styled from '@emotion/styled';
import { useUserCardClick } from '../../hooks/usercardClick';

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px'
})
const RowContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px'
})

const FriendRequest = () => {
  const [receivedLists, setReceivedLists] = useState([]);
  const [requestedLists, setRequestedLists] = useState([]);
  const friendRequest = () => {
    // 내가 받은 친구 요청 리스트
    getFriendReceivedList().then((res) => {
      if (res) {
        setReceivedLists(res.content);
      }
    });
    // 내가 보낸 친구 요청 리스트
    getFriendRequestedList().then((res) => {
      if (res) {
        setRequestedLists(res.content);
      }
    });
  }
  
  useEffect(() => { 
    friendRequest();
  }, []);

  return <Row>
    <RowContent>
    <div>받은 친구 요청</div>
    <List>
      {receivedLists.map((rq: FriendInterface) => (
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
    </RowContent>
    <RowContent>
    <div>보낸 친구 요청</div>
    <List>
      {requestedLists.map((rq: FriendInterface) => (
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
      </RowContent>
    </Row>
}

export default FriendRequest;