package com.ifs.back.category.controller;

import com.ifs.back.category.dto.CategoryDto;
import com.ifs.back.category.entity.Category;
import com.ifs.back.category.mapper.CategoryMapper;
import com.ifs.back.category.service.CategoryService;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import java.net.URI;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/me/categories")
@RequiredArgsConstructor
@Validated
@Slf4j
public class CategoryController {

  private final CategoryService categoryService;
  private final CategoryMapper mapper;
  private final MemberService memberService;

  @PostMapping
  public ResponseEntity postCategory(@Valid @RequestBody CategoryDto.Post requestBody,
      Principal principal) {
    log.info("## 카테고리 생성");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Category category = mapper.categoryPostToCategory(requestBody);
    category.setMember(memberService.findMember(currentId));
    Category createdCategory = categoryService.createCategory(category);
    URI uri = UriCreator.createUri("/users/me/categories", createdCategory.getCategoryId());
    return ResponseEntity.created(uri).build();
  }

  @PatchMapping("/{category_id}")
  public ResponseEntity patchCategory(@PathVariable("category_id") @Positive long categoryId,
      @Valid @RequestBody CategoryDto.Patch requestBody, Principal principal) {
    log.info("## 카테고리 설정");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Category category = mapper.categoryPatchToCategory(requestBody);
    category.setCategoryId(categoryId);
    Category updatedCategory = categoryService.updateCategory(category, currentId);
    return ResponseEntity.ok().body(mapper.categoryToCategoryResponse(updatedCategory));
  }

  @DeleteMapping("/{category_id}")
  public ResponseEntity deleteCategory(@PathVariable("category_id") @Positive long categoryId,
      Principal principal) {
    log.info("## 카테고리 삭제");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    categoryService.deleteCategory(categoryId, currentId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
//  @GetMapping
//  public ResponseEntity getCategories() {
//    log.info("## 내 정보 조회");
//    //Todo: 토큰 적용 전까진 내 member_id = 1
//    String myEmail = "test123@test.com";
//    Member findMember = memberService.findMemberByEmail(myEmail);
//
//    return ResponseEntity.ok().body(mapper.memberToMemberResponse(findMember));
//  }
}
