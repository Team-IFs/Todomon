package com.ifs.back.category.mapper;

import com.ifs.back.category.dto.CategoryDto;
import com.ifs.back.category.entity.Category;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

  default Category categoryPostToCategory(CategoryDto.CategoryPost categoryPostDto) {
    if ( categoryPostDto == null ) {
      return null;
    }

    Category.CategoryBuilder category = Category.builder();
    category.isHide( categoryPostDto.isHide() );
    category.categoryName( categoryPostDto.getCategoryName() );
    category.categoryColor( categoryPostDto.getCategoryColor() );
    category.scope( categoryPostDto.getScope() );

    return category.build();
  }
  Category categoryPatchToCategory(CategoryDto.CategoryPatch categoryPatchDto);
  CategoryDto.CategoryResponse categoryToCategoryResponse(Category category);

}
