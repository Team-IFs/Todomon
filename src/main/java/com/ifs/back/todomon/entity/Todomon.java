package com.ifs.back.todomon.entity;

import com.ifs.back.audit.Auditable;
import com.ifs.back.member.entity.Member;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Todomon extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long todomonId;
  @Column
  @Default
  private String faceColor = "#757575";
  @Column
  @Default
  private String leftEyeColor = "#EEEEEE";
  @Column
  @Default
  private String rightEyeColor = "#EEEEEE";
  @Column
  @Default
  private String backgroundColor = "#EEEEEE";
  @OneToOne(cascade = CascadeType.ALL, mappedBy = "todomon")
  private Member member;

}
