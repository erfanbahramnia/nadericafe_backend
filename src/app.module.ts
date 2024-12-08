import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/entity/category.entity';
import { FoodEntity } from './food/entity/food.entity';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // database
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "erfan.81",
      database: "cafe_naderi",
      entities: [
        CategoryEntity,
        FoodEntity,
      ],
      synchronize: true
    }),
    
    // app modules
    CategoryModule,
    FoodModule,
    AuthModule,

    // env config
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // jwt config
    JwtModule.register({
      global: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
