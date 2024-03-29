package com.ifs.back.member.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.ifs.back.audit.Auditable;
import com.ifs.back.category.entity.Category;
import com.ifs.back.follow.entity.Follow;
import com.ifs.back.friend.entity.Friend;
import com.ifs.back.todomon.entity.Todomon;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
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
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString(exclude = {"friends_received", "follows_request", "followings", "followers"})
public class Member extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long memberId;
  @Column(nullable = false)
  private String nickname;
  @Column(nullable = false, unique = true, updatable = false)
  private String email;
  @JsonProperty(access = Access.WRITE_ONLY)
  @Column(nullable = false)
  private String password;
  @Column
  @Lob
  private String bio;
  @Column
  @Default
  private Boolean premium = false;
  @Default
  private Integer theme = 1;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  @Default
  private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "todomonId")
  private Todomon todomon;

  @ElementCollection(fetch = FetchType.EAGER)
  @Default
  private List<String> roles = new ArrayList<>();

  @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Category> categories;

  @OneToMany(mappedBy = "received", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Friend> friends_received;

  @OneToMany(mappedBy = "request", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Friend> follows_request;

  @OneToMany(mappedBy = "following", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Follow> followings;

  @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Follow> followers;

  @RequiredArgsConstructor
  public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;
  }

}


