package com.ifs.back.category.service;

import com.ifs.back.category.dto.CategoryDto;
import com.ifs.back.category.entity.Category;
import com.ifs.back.category.exception.CategoryExceptionCode;
import com.ifs.back.category.mapper.CategoryMapper;
import com.ifs.back.category.repository.CategoryRepository;
import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.exception.MemberExceptionCode;
import com.ifs.back.todo.dto.CategoryTodoDto;
import com.ifs.back.todo.entity.Todo;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;
  private final CategoryMapper categoryMapper;

  @Transactional
  public Category createCategory(Category category) {
    return categoryRepository.save(category);
  }

  @Transactional
  public Category updateCategory(Category category, long memberId) {
    Category findCategory = findVerifiedCategory(category.getCategoryId(), memberId);
    Optional.ofNullable(category.getCategoryName())
        .ifPresent(findCategory::setCategoryName);
    Optional.ofNullable(category.getCategoryColor())
        .ifPresent(findCategory::setCategoryColor);
    Optional.ofNullable(category.getScope())
        .ifPresent(findCategory::setScope);
    Optional.ofNullable(category.isHide())
        .ifPresent(findCategory::setHide);
    Optional.ofNullable(category.getIdx())
        .ifPresent(newIdx -> {
          long currentIdx = findCategory.getIdx();
          if (currentIdx < newIdx) {
            categoryRepository.updateIndexDown(currentIdx, newIdx);
          } else if (currentIdx > newIdx) {
            categoryRepository.updateIndexUp(currentIdx, newIdx);
          }
          findCategory.setIdx(newIdx);
        });
    Category savedCategory = categoryRepository.save(findCategory);
    log.info("## updated category: {}", savedCategory);
    return savedCategory;
  }

  private void checkCategoryMember(long memberId, Category category) {
    if (category.getMember().getMemberId() != memberId) {
      throw new BusinessLogicException(CategoryExceptionCode.CATEGORY_NOT_ALLOWED);
    }
  }

  @Transactional
  public Category findVerifiedCategory(long categoryId, long memberId) {
    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
    Category category = optionalCategory.orElseThrow(
        () -> new BusinessLogicException(CategoryExceptionCode.CATEGORY_NOT_FOUND));
    checkCategoryMember(memberId, category);
    return category;
  }

  @Transactional
  public Page<CategoryDto.CategoryResponse> findAllCategories(long memberId, Pageable pageable) {
    Page<Category> categoryPage = categoryRepository.findAllByMemberId(memberId, pageable);
    Page<CategoryDto.CategoryResponse> responses = categoryPage.map(
        category -> categoryMapper.categoryToCategoryResponse(category));
    return responses;
  }

  @Transactional
  public Page<Category> findCategoriesByMemberId(long memberId, int scope, Pageable pageable) {
    return categoryRepository.findCategoriesByMemberId(memberId, scope, pageable);
  }

  @Transactional
  public void deleteCategory(long categoryId, Member member) {
    if(member.getCategories().size() > 1) {
      Category findCategory = findVerifiedCategory(categoryId, member.getMemberId());
      categoryRepository.updateAfterDeleteCategory(findCategory.getIdx());
      categoryRepository.deleteById(findCategory.getCategoryId());
    }
    else
      throw new BusinessLogicException(CategoryExceptionCode.AT_LEAST_ONE_CATEGORY);
  }

  @Transactional
  public void createBasicCategory(Member member) {
    Category basicCategory = Category.builder().member(member)
        .categoryColor("#000000").categoryName("기본").isHide(false).scope(0).build();

    createCategory(basicCategory);
  }

}
