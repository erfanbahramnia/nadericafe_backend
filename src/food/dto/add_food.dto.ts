import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class AddFoodDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    price: string;

    @ApiProperty()
    @IsNumberString()
    category: number;

    @ApiProperty({type: "string", format: "binary"})
    image: string;
}