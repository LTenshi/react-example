import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('React Example Nest API')
    .setDescription('Swagger page for React Nest Example')
    .setVersion('1.0')
    .build();

  const swaggerCustomOptions: SwaggerCustomOptions = {
    raw: ['json'],
  };

  const documentFactory = () => {
    return SwaggerModule.createDocument(app, swaggerConfig);
  };
  SwaggerModule.setup('api-docs', app, documentFactory, swaggerCustomOptions);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
