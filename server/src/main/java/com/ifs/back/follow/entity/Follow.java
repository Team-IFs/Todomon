package com.ifs.back.follow.entity;

import com.ifs.back.audit.Auditable;
import com.ifs.back.member.entity.Member;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
public class Follow extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long followId;

  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "follower_member_id")
  private Member follower;

  @ManyToOne(fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "following_member_id")
  private Member following;
}
