package com.ifs.back.todo.entity;

import com.ifs.back.audit.Auditable;
import com.ifs.back.category.entity.Category;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
@Table(
    uniqueConstraints={
        @UniqueConstraint(name = "UniqueTodoNameAndCategory", columnNames = {"todoName", "category_id"})
    }
)
public class Todo extends Auditable {
  @Id
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long todoId;
  @Column(nullable = false)
  @Setter
  private String todoName;
  @Setter
  private LocalDate startAt;
  @Setter
  private LocalDate endAt;
  @Column
  @Setter
  @Default
  private boolean isDone = false;
  @Column
  @Setter
  private String repeated;
  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "category_id")
  private Category category;
  @Column(nullable = false)
  @Setter
  private long idx;
}
