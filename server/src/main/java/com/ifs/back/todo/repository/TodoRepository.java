package com.ifs.back.todo.repository;

import com.ifs.back.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
  @Modifying(clearAutomatically = true)
  @Query(value = "update todo t set t.idx = t.idx+1 where t.idx >= :newIdx and t.idx < :currentIdx ", nativeQuery = true)
  void updateIndexUp (@Param("currentIdx") long currentIdx, @Param("newIdx") long newIdx);

  @Modifying(clearAutomatically = true)
  @Query(value = "update todo t set t.idx = t.idx-1 where t.idx > :currentIdx and t.idx <= :newIdx ", nativeQuery = true)
  void updateIndexDown (@Param("currentIdx") long currentIdx, @Param("newIdx") long newIdx);


}
