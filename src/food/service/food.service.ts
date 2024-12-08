import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { FoodEntity } from "../entity/food.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddFoodDto } from "../dto/add_food.dto";
import { EditFoodDto } from "../dto/edit_food.dto";
import { CategoryService } from "src/category/service/category.service";
import { NotFoundErrorEnum } from "src/constants/messages";
import { deleteImage, validateObject } from "src/utils/funcs";

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(FoodEntity) private readonly foodRepo: Repository<FoodEntity>,
        private readonly categoryService: CategoryService
    ){}

    // --------------------------------------------------

    async AddFood(data: AddFoodDto) {
        // get category
        const category = await this.categoryService.GetCategory(data.category)
        if (!category)
            throw new NotFoundException(NotFoundErrorEnum.CategoryNotFound)
        // new food
        const food = this.foodRepo.create({
            category: category,
            name: data.name,
            price: data.price,
            image: data.image,
        })
        const res = await this.foodRepo.save(food)
        return {
            status: HttpStatus.OK,
            food: res
        }
    }

    // --------------------------------------------------

    async EditFood(data: EditFoodDto) {
        // get data without category id
        const valid: editFoodData = validateObject(data, ["category", "id"])
        // find food
        const food = await this.GetFoodById(data.id)
        // check food exist
        if(!food)
            throw new NotFoundException(NotFoundErrorEnum.FoodNotFound)
        if(data.image) {
            // get old image to delete
            const oldImage = food.image
            food.image = data.image;
            deleteImage(oldImage)
        }
        if(!!Object.keys(valid).length) {
            Object.keys(valid).map(key => {
                food[key] = valid[key]
            })
        }
        if(data.category && data.category > 0) {
            // get category
            const category = await this.categoryService.GetCategory(data.category);
            if(!category)
                throw new NotFoundException(NotFoundErrorEnum.CategoryNotFound);
            food.category = category;
        }
        // update changes
        const res = await this.foodRepo.save(food);
        return {
            status: HttpStatus.OK,
            food: res
        }
    }

    // --------------------------------------------------

    async DeleteFood(id: number) {
        // check food exist 
        const food = await this.GetFoodById(id)
        // delete image
        deleteImage(food.image)
        // delete
        await this.foodRepo.delete({ id });
        return {
            status: HttpStatus.OK
        }
    }

    // --------------------------------------------------

    async GetFoods() {
        const foods = await this.foodRepo.find({
            relations: {
                category: true
            }
        })
        return {
            status: HttpStatus.OK,
            foods
        }
    }

    // --------------------------------------------------

    async GetFoodById(id: number) {
        const food = await this.foodRepo.findOne({
            where: {
                id
            },
            relations: {
                category: true
            }
        });
        if(!food)
            throw new NotFoundException(NotFoundErrorEnum.FoodNotFound);
        return food
    }
}