package com.ifs.back.member.mapper;

import com.ifs.back.member.dto.MemberDto;
import com.ifs.back.member.dto.MemberDto.MemberResponse;
import com.ifs.back.member.entity.Member;
import com.ifs.back.todomon.dto.TodomonDto;
import com.ifs.back.todomon.entity.Todomon;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

  Member memberPostToMember(MemberDto.MemberPost memberPostDto);

  Member memberPatchToMember(MemberDto.MemberPatch memberPatchDto);

  Todomon todomonPatchToTodomon(TodomonDto.TodomonPatch todomonPatchDto);

  default MemberDto.MemberResponse memberToMemberResponse(Member member) {
    MemberDto.MemberResponse.MemberResponseBuilder builder = MemberDto.MemberResponse.builder()
        .memberId(member.getMemberId())
        .email(member.getEmail())
        .memberStatus(member.getMemberStatus())
        .nickname(member.getNickname())
        .bio(member.getBio())
        .premium(member.getPremium())
        .todomon(todomonToTodomonResponse(member.getTodomon()));
    return builder.build();
  }

  default Page<MemberDto.MemberResponse> memberPageToMemberResponseDtoPage(Page<Member> memberPage){
    return memberPage.map(member -> {
      return MemberResponse.builder().memberId(member.getMemberId()).nickname(member.getNickname())
          .bio(member.getBio()).premium(member.getPremium()).memberStatus(member.getMemberStatus())
          .todomon(todomonToTodomonResponse(member.getTodomon())).build();
    });
  }

  default TodomonDto.TodomonResponse todomonToTodomonResponse(Todomon todomon){
    TodomonDto.TodomonResponse.TodomonResponseBuilder builder = TodomonDto.TodomonResponse.builder()
        .faceColor(todomon.getFaceColor())
        .leftEyeColor(todomon.getLeftEyeColor())
        .rightEyeColor(todomon.getRightEyeColor())
        .backgroundColor(todomon.getBackgroundColor());
    return builder.build();
  }

}
