package com.ifs.back.category.repository;

import com.ifs.back.category.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Query(value = "select * from category c where c.member_id = :memberId and c.scope <= :scope and c.is_hide=false", nativeQuery = true)
  Page<Category> findCategoriesByMemberId (@Param("memberId") long memberId, @Param("scope") int scope, Pageable pageable);

  @Query(value = "select * from category c where c.member_id = :memberId", nativeQuery = true)
  Page<Category> findAllByMemberId (@Param("memberId") long memberId, Pageable pageable);

}
