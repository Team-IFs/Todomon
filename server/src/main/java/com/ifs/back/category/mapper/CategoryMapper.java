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
  default Category categoryPatchToCategory(CategoryDto.CategoryPatch categoryPatchDto) {
    if ( categoryPatchDto == null ) {
      return null;
    }

    Category.CategoryBuilder category = Category.builder();
    category.isHide( categoryPatchDto.isHide() );
    category.categoryName( categoryPatchDto.getCategoryName() );
    category.categoryColor( categoryPatchDto.getCategoryColor() );
    category.scope( categoryPatchDto.getScope() );
    category.idx( categoryPatchDto.getIdx() );

    return category.build();
  }
  default CategoryDto.CategoryResponse categoryToCategoryResponse(Category category) {
    if ( category == null ) {
      return null;
    }

    CategoryDto.CategoryResponse.CategoryResponseBuilder categoryResponse = CategoryDto.CategoryResponse.builder();
    categoryResponse.hide( category.isHide() );
    categoryResponse.categoryId( category.getCategoryId() );
    categoryResponse.categoryName( category.getCategoryName() );
    categoryResponse.categoryColor( category.getCategoryColor() );
    categoryResponse.scope( category.getScope() );
    categoryResponse.idx( category.getIdx() );

    return categoryResponse.build();
  }

}
