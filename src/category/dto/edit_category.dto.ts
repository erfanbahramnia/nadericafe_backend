import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { AddCategoryDto } from "./add_category.dto";

export class EditCategoryDto extends AddCategoryDto{
    @ApiProperty()
    @IsNumber()
    id: number;
}