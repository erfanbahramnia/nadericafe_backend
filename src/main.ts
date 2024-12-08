import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

   // config swagger
   const config = new DocumentBuilder()
   .setTitle("Naderi")
   .setDescription("Naderi cafe apis")
   .setVersion("1.0")
   .addBasicAuth(
     {
     type: "http",
     scheme: "Bearer",
     bearerFormat: "JWT",
     name: "JWT",
     description: "Enter jwt token",
     in: "headers"
     },
     "JWT"
   )
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup("api", app, document);

  // config static files
  const folder = join(__dirname, "..", "public")
  app.useStaticAssets(folder, {
    index: false,
    prefix: "/public"
  })

  await app.listen(4000, "0.0.0.0");
}
bootstrap();
