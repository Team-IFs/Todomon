package com.ifs.back.category.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.ifs.back.audit.Auditable;
import com.ifs.back.member.entity.Member;
import com.ifs.back.todo.entity.Todo;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(
    uniqueConstraints={
        @UniqueConstraint(name = "UniqueColorAndMember", columnNames = {"member_id", "categoryColor"}),
        @UniqueConstraint(name = "UniqueCategoryNameAndMember", columnNames = {"member_id", "categoryName"})
    }
)
public class Category extends Auditable {
  @Id
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long categoryId;
  @Column(nullable = false)
  @Setter
  private String categoryName;
  @Column(nullable = false)
  @Setter
  private String categoryColor;
  @Column(nullable = false)
  @Setter
  private int scope;
  @Setter
  @Column(nullable = false)
  private boolean isHide;
  @ToString.Exclude
  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "member_id")
  private Member member;

  @OneToMany(mappedBy = "category",fetch = FetchType.EAGER, orphanRemoval = true, cascade = CascadeType.ALL)
  @OrderBy("idx asc")
  @Default
  @Exclude
  private List<Todo> todos = new ArrayList<>();
  @Column(nullable = false)
  @Setter
  private long idx;

}
