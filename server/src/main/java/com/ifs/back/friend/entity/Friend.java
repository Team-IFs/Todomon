package com.ifs.back.friend.entity;

import com.ifs.back.audit.Auditable;
import com.ifs.back.member.entity.Member;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class Friend extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long friendId;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "request_member_id")
  private Member request;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "received_member_id")
  private Member received;

  @Column
  @Setter
  @Default
  private boolean accepted = false;

}
