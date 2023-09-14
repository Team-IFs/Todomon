package com.ifs.back.friend.repository;

import com.ifs.back.friend.entity.Friend;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRepository extends JpaRepository<Friend, Long> {

  @Query(value =
      "select f.accepted from friend as f where (f.request_member_id = :targetId and f.received_member_id = :memberId) "
          + "or (f.received_member_id = :targetId and f.request_member_id = :memberId)", nativeQuery = true)
  Optional<Boolean> findAcceptedByUsers(@Param("memberId") long memberId,
      @Param("targetId") long targetId);

  @Query(value = "select * from friend as f where f.received_member_id = :memberId or f.request_member_id = :memberId and f.accepted = true", nativeQuery = true)
  Page<Friend> findAllFriend(@Param("memberId") long memberId, Pageable pageable);

  @Query(value = "select * from friend as f where f.request_member_id = :memberId and f.accepted = false", nativeQuery = true)
  Page<Friend> findAllRequest(@Param("memberId") long memberId, Pageable pageable);

  @Query(value = "select * from friend as f where f.received_member_id = :memberId and f.accepted = false", nativeQuery = true)
  Page<Friend> findAllReceived(@Param("memberId") long memberId, Pageable pageable);

  @Query(value =
      "select * from friend as f where (f.request_member_id = :targetId and f.received_member_id = :memberId) "
          + "or (f.received_member_id = :targetId and f.request_member_id = :memberId) and f.accepted = true", nativeQuery = true)
  Optional<Friend> findByUsers(@Param("memberId") long memberId,
      @Param("targetId") long targetId);

  @Query(value =
      "select * from friend f where f.request_member_id = :memberId and f.friend_id = :friendId", nativeQuery = true)
  Optional<Friend> findVerifiedFriendforDelete(@Param("memberId") long memberId,
      @Param("friendId") long friendId);

  @Query(value =
      "select * from friend f where f.received_member_id = :memberId and f.friend_id = :friendId", nativeQuery = true)
  Optional<Friend> findVerifiedFriendforDeny(@Param("memberId") long memberId,
      @Param("friendId") long friendId);
}
