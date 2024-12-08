import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "../service/category.service";
import { AddCategoryDto } from "../dto/add_category.dto";
import { EditCategoryDto } from "../dto/edit_category.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("/category")
@ApiTags("Category")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){};

    // --------------------------------------------------

    @Post("/add")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    // swagger
    @ApiOperation({description: "add new category"})
    async AddCategory(
        @Body() data: AddCategoryDto
    ) {
        return await this.categoryService.AddCategory(data);
    }

    // --------------------------------------------------

    @Get("/all")
    // swagger
    @ApiOperation({description: "get all categories"})
    async GetCategories() {
        return await this.categoryService.GetCategories();
    }

    // --------------------------------------------------

    @Put("/edit")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    async EditCategory(
        @Body() data: EditCategoryDto
    ) {
        return await this.categoryService.EditCategory(data)
    }

    // --------------------------------------------------

    @Delete("/:id")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    async DeleteCategory(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.categoryService.DeleteCategory(id)
    }
}