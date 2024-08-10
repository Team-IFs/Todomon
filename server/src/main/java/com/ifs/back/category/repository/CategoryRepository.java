package com.ifs.back.category.repository;

import com.ifs.back.category.entity.Category;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Query(value = "select * from category c where c.member_id = :memberId and c.scope <= :scope and c.is_hide=false order by c.idx", nativeQuery = true)
  Page<Category> findCategoriesByMemberId (@Param("memberId") long memberId, @Param("scope") int scope, Pageable pageable);

  @Query(value = "select * from category c where c.member_id = :memberId order by c.idx", nativeQuery = true)
  Page<Category> findAllByMemberId (@Param("memberId") long memberId, Pageable pageable);

  @Modifying(clearAutomatically = true)
  @Query(value = "update category c set c.idx = c.idx+1 where c.idx >= :newIdx and c.idx < :currentIdx and c.member_id = :memberId", nativeQuery = true)
  void updateIndexUp (@Param("currentIdx") long currentIdx, @Param("newIdx") long newIdx, @Param("memberId") long memberId);

  @Modifying(clearAutomatically = true)
  @Query(value = "update category c set c.idx = c.idx-1 where c.idx > :currentIdx and c.idx <= :newIdx and c.member_id = :memberId", nativeQuery = true)
  void updateIndexDown (@Param("currentIdx") long currentIdx, @Param("newIdx") long newIdx, @Param("memberId") long memberId);

  @Modifying(clearAutomatically = true)
  @Query(value = "update category c set c.idx = c.idx-1 where c.idx > :deletedIdx and c.member_id = :memberId", nativeQuery = true)
  void updateAfterDeleteCategory (@Param("deletedIdx") long deletedIdx, @Param("memberId") long memberId);


}
