import { Module } from "@nestjs/common";
import { FoodController } from "./controller/food.controller";
import { FoodService } from "./service/food.service";
import { FoodEntity } from "./entity/food.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "src/category/category.module";

@Module({
    controllers: [
        FoodController
    ],
    providers: [
        FoodService
    ],
    imports: [
        TypeOrmModule.forFeature([
            FoodEntity
        ]),
        CategoryModule
    ],
})
export class FoodModule {}