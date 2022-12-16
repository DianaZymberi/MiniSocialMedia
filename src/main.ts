import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
  .setTitle('app example')
  .setDescription('The app API description')
  .setVersion('1.0')
  .addTag('app')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter Jwt Token',
      in: 'header'
    },
    'JWT-auth'
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads', 'profileimages'), { prefix:'/public/' });
  await app.listen(3000);
}
bootstrap();
