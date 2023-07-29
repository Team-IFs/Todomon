package com.ifs.back.category.dto;

import com.ifs.back.member.dto.MemberDto.MemberResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class CategoryDto {
  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class CategoryPost {
    @Schema(description = "카테고리 이름")
    @NotNull(message = "카테고리 이름을 비울 수 없습니다.")
    private String categoryName;
    @Schema(description = "카테고리 색상")
    @NotNull(message = "카테고리 색상을 비울 수 없습니다.")
    private String categoryColor;
    @Schema(description = "공개범위")
    @Max(2)
    @Min(0)
    private int scope;
    @Schema(description = "숨기기 여부")
    @NotNull(message = "숨기기 여부를 비울 수 없습니다.")
    private boolean isHide;
  }
  @Getter
  @AllArgsConstructor
  @Builder
  public static class CategoryPatch {
    private String categoryName;
    private String categoryColor;
    private boolean isHide;
    @Max(2)
    @Min(0)
    private int scope;
    @Min(0)
    private long idx;
  }
  @Getter
  @AllArgsConstructor
  @Builder
  public static class CategoryResponse {
    private long categoryId;
    private String categoryName;
    private String categoryColor;
    private boolean isHide;
    private int scope;
    private long idx;
  }

  public static class CategoryPage extends PageImpl<CategoryResponse> {
    public CategoryPage(List<CategoryResponse> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }
}
