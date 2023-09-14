import { List, ListItem } from '@mui/material';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { getFollowers, getFollowing } from '../../utils/axios/social';
import { FollowInterface } from '../../types/user';
import styled from '@emotion/styled';

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

const Subscribe = () => {
  const [followers, setFollowers] = useState([]); // 나를 구독하는 사람
  const [follows, setFollows] = useState([]); // 내가 구독하는 사람
  const subscriptionList = () => {
    getFollowing().then((res) => {
      if (res) {
        setFollows(res.content);
      }
    });

    getFollowers().then((res) => {
      if (res) {
        setFollowers(res.content);
      }
    });
  }
  
  useEffect(() => { 
    subscriptionList();
  }, []);
  return <Row>
    <RowContent>
      <div>내가 구독하는 사람</div>
      <List>
        {follows.map((member: FollowInterface) => (
          <ListItem key={member.follow.memberId}>
            <UserCard
              nickname={member.follow.nickname}
              bio={member.follow.bio}
              todomon={member.follow.todomon}
              friendId={member.follow.memberId}
              isFriendSetting={false}
              />
          </ListItem>
        ))}
        </List>
    </RowContent>
    <RowContent>
    <div>나를 구독하는 사람</div>
    <List>
      {followers.map((member: FollowInterface) => (
        <ListItem key={member.follow.memberId}>
          <UserCard
            nickname={member.follow.nickname}
            bio={member.follow.bio}
            todomon={member.follow.todomon}
            friendId={member.follow.memberId}
            isFriendSetting={false}
            />
        </ListItem>
      ))}
      </List>
      </RowContent>
  </Row>
}

export default Subscribe;