package com.ifs.back.member.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.ifs.back.audit.Auditable;
import com.ifs.back.todomon.entity.Todomon;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
public class Member extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long memberId;
  @Column(nullable = false)
  @Setter
  private String nickname;
  @Column(nullable = false, updatable = false)
  private String email;
  @Setter
  @JsonProperty(access = Access.WRITE_ONLY)
  @Column(nullable = false)
  private String password;
  @Column
  @Lob
  @Setter
  private String bio;
  @Column
  @Setter
  @Default
  private Boolean premium = false;
  @Column
  @Setter
  private String photoUrl;
  @Default
  private Integer theme = 1;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  @Default
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToOne(cascade = CascadeType.ALL)
  @Setter
  @JoinColumn(name = "todomonId")
  private Todomon todomon;

  @RequiredArgsConstructor
  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;
  }

}


