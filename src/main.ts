import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
    transform: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Tigon Backend')
    .setDescription('Api Tigon ')
    .setVersion('1.0')
    .addTag('Tigon')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);



  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
