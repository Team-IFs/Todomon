package com.ifs.back.member.mapper;

import com.ifs.back.member.dto.MemberDto;
import com.ifs.back.member.dto.MemberDto.Response;
import com.ifs.back.member.entity.Member;
import com.ifs.back.todomon.dto.TodomonDto;
import com.ifs.back.todomon.entity.Todomon;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

  Member memberPostToMember(MemberDto.Post memberPostDto);

  Member memberPatchToMember(MemberDto.Patch memberPatchDto);

  Todomon todomonPatchToTodomon(TodomonDto.Patch todomonPatchDto);

  default MemberDto.Response memberToMemberResponse(Member member) {
    MemberDto.Response.ResponseBuilder builder = MemberDto.Response.builder()
        .memberId(member.getMemberId())
        .memberStatus(member.getMemberStatus())
        .nickname(member.getNickname())
        .bio(member.getBio())
        .premium(member.getPremium())
        .todomon(todomonToTodomonResponse(member.getTodomon()));
    return builder.build();
  }

  default Page<MemberDto.Response> memberPageToMemberResponseDtoPage(Page<Member> memberPage){
    return memberPage.map(member -> {
      return Response.builder().memberId(member.getMemberId()).nickname(member.getNickname())
          .bio(member.getBio()).premium(member.getPremium()).memberStatus(member.getMemberStatus())
          .todomon(todomonToTodomonResponse(member.getTodomon())).build();
    });
  }

  default TodomonDto.Response todomonToTodomonResponse(Todomon todomon){
    TodomonDto.Response.ResponseBuilder builder = TodomonDto.Response.builder()
        .faceColor(todomon.getFaceColor())
        .leftEyeColor(todomon.getLeftEyeColor())
        .rightEyeColor(todomon.getRightEyeColor())
        .backgroundColor(todomon.getBackgroundColor());
    return builder.build();
  }

}
