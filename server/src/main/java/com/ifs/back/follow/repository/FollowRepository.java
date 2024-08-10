package com.ifs.back.follow.repository;

import com.ifs.back.follow.entity.Follow;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

  @Query(value = "select * from follow where following_member_id = :targetId and follower_member_id = :memberId", nativeQuery = true)
  Optional<Follow> findFollowByUsers(@Param("memberId") long memberId,
      @Param("targetId") long targetId);

  @Query(value = "select * from follow where following_member_id = :memberId", nativeQuery = true)
  Page<Follow> findAllFollowersByMemberId(Long memberId, Pageable pageable);

  @Query(value = "select * from follow where follower_member_id = :memberId", nativeQuery = true)
  Page<Follow> findAllFollowingsByMemberId(Long memberId, Pageable pageable);

}
