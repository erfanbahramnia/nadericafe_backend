import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddFoodDto } from "../dto/add_food.dto";
import { EditFoodDto } from "../dto/edit_food.dto";
import { FoodService } from "../service/food.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { MulterImageDestination, MulterImageFileName } from "src/utils/multer";
import { MulterFileType } from "src/constants/types";
import { SwaggerConfig } from "src/config/swagger";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("/food")
@ApiTags("Food")
export class FoodController {
    constructor(
        private readonly foodService: FoodService
    ){};

    // --------------------------------------------------

    @Post("/add")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    // file
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            filename: MulterImageFileName,
            destination: MulterImageDestination("food")
        })
    }))
    // swagger
    @ApiOperation({description: "add new food"})
    @ApiBody({
        type: AddFoodDto
    })
    @ApiConsumes(SwaggerConfig.SwaggerConsumeMultipart)
    async AddFood(
        @Body() data: AddFoodDto,
        @UploadedFile() file: MulterFileType
    ) {
        data.image = file.path
        return await this.foodService.AddFood(data);
    }

    // --------------------------------------------------

    @Get("/all")
    // swagger
    @ApiOperation({description: "get all foods"})
    async GetFoods() {
        return await this.foodService.GetFoods();
    }

    // --------------------------------------------------

    @Get("/:id")
    // swagger
    @ApiOperation({description: "get all foods"})
    async GetFoodById(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.foodService.GetFoodById(id);
    }

    // --------------------------------------------------

    @Put("/edit")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    // file
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            filename: MulterImageFileName,
            destination: MulterImageDestination("food")
        })
    }))
    // swagger
    @ApiOperation({description: "edit food"})
    @ApiBody({
        type: EditFoodDto
    })
    @ApiConsumes(SwaggerConfig.SwaggerConsumeMultipart)
    async EditFood(
        @Body() data: EditFoodDto,
        @UploadedFile() file: MulterFileType
    ) {
        data.image = file?.path ? file.path : ""
        return await this.foodService.EditFood(data)
    }

    // --------------------------------------------------

    @Delete("/:id")
    // guard
    @ApiBearerAuth("JWT")
    @UseGuards(AuthGuard)
    // swagger
    @ApiOperation({description: "delete food"})
    async DeleteFood(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.foodService.DeleteFood(id)
    }
}