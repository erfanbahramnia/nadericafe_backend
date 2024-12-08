import { CategoryEntity } from "src/category/entity/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FoodEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    price: string;

    @Column("varchar", {default: 0})
    discount: string;

    @Column("varchar", {default: 0})
    day_discount: string;

    @Column("varchar")
    image: string;

    @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.foods, {
        onDelete: "SET NULL",
        cascade: true
    })
    category: CategoryEntity;
};