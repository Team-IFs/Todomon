package com.ifs.back.category.mapper;

import com.ifs.back.category.dto.CategoryDto;
import com.ifs.back.category.entity.Category;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
  Category categoryPostToCategory(CategoryDto.CategoryPost categoryPostDto);
  Category categoryPatchToCategory(CategoryDto.CategoryPatch categoryPatchDto);
  CategoryDto.CategoryResponse categoryToCategoryResponse(Category category);

}
