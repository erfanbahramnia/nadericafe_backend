import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../entity/category.entity";
import { Repository } from "typeorm";
import { AddCategoryDto } from "../dto/add_category.dto";
import { EditCategoryDto } from "../dto/edit_category.dto";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { NotFoundErrorEnum } from "src/constants/messages";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>
    ){}

    // --------------------------------------------------

    async AddCategory(category: AddCategoryDto) {
        const newCategory = this.categoryRepo.create(category);
        const res = await this.categoryRepo.save(newCategory);
        return {
            status: HttpStatus.CREATED,
            category: res
        }
    }

    // --------------------------------------------------

    async EditCategory(category: EditCategoryDto) {
        const exists = await this.findCategory(category.id)
        if (!exists) 
            throw new NotFoundException(NotFoundErrorEnum.CategoryNotFound)
        await this.categoryRepo.update({ id: category.id }, {
            name: category.name
        })
        return {
            status: HttpStatus.OK
        }
    }

    // --------------------------------------------------

    async DeleteCategory(id: number) {
        const exists = await this.findCategory(id);
        if(!exists)
            throw new NotFoundException(NotFoundErrorEnum.CategoryNotFound);
        await this.categoryRepo.delete({ id: id });
        return {
            status: HttpStatus.OK,
        }
    }

    // --------------------------------------------------

    async GetCategories() {
        const categories = await this.categoryRepo.find();
        return {
            status: HttpStatus.OK,
            categories
        }
    }

    // --------------------------------------------------

    async findCategory(id: number) {
        const category = await this.categoryRepo.findOneBy({ id })
        return !!category
    }

    // --------------------------------------------------

    async GetCategory(id: number) {
        return await this.categoryRepo.findOneBy({ id })
    }
}