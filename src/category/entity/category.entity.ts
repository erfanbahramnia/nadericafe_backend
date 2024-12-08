import { FoodEntity } from "src/food/entity/food.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @OneToMany(() => FoodEntity, (foodEntity) => foodEntity.category)
    foods: FoodEntity[];
}