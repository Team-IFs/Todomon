package com.ifs.back.security.userdetails;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.exception.MemberExceptionCode;
import com.ifs.back.member.repository.MemberRepository;
import com.ifs.back.security.utils.AuthorityUtils;
import java.util.Collection;
import java.util.Optional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MemberDetailsService implements UserDetailsService {

  private final MemberRepository memberRepository;
  private final AuthorityUtils authorityUtils;

  public MemberDetailsService(
      MemberRepository memberRepository, AuthorityUtils authorityUtils) {
    this.memberRepository = memberRepository;
    this.authorityUtils = authorityUtils;
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Member> optionalMember = memberRepository.findByEmail(username);
    Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(
        MemberExceptionCode.MEMBER_NOT_FOUND));

    return new MyUserDetails(findMember);
  }

  public final class MyUserDetails extends Member implements UserDetails {

    MyUserDetails(Member member) {
      setMemberId(member.getMemberId());
      setNickname(member.getNickname());
      setEmail(member.getEmail());
      setPassword(member.getPassword());
      setBio(member.getBio());
      setPremium(member.getPremium());
      setTheme(member.getTheme());
      setTodomon(member.getTodomon());
      setRoles(member.getRoles());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return authorityUtils.createAuthorities(getRoles());
    }

    @Override
    public String getUsername() {
      return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
      return true;
    }

    @Override
    public boolean isAccountNonLocked() {
      return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }

    @Override
    public boolean isEnabled() {
      return true;
    }
  }
}
