package com.ifs.back.member.repository;

import com.ifs.back.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  @Query(value = "select * from member m where m.email = :email and m.member_status = \'MEMBER_ACTIVE\'", nativeQuery = true)
  Optional<Member> findByEmail(String email);

  @Query(value = "select * from member m where m.email like CONCAT('%', :email, '%') and m.member_status = \'MEMBER_ACTIVE\'", nativeQuery = true)
  Page<Member> getMembersByEmail(String email, Pageable pageable);

  @Query(value = "select m.member_id from member m where m.email = :email and m.member_status = \'MEMBER_ACTIVE\'", nativeQuery = true)
  Optional<Long> findMemberIdByEmail(@Param("email") String email);

}
