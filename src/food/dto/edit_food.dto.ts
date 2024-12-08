import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AddFoodDto } from "./add_food.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditFoodDto extends PartialType(AddFoodDto) {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    day_discount: string;
}