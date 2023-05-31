import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { patchNestJsSwagger } from 'nestjs-zod';
import { SwaggerTheme } from 'swagger-themes';

const swaggerTheme = new SwaggerTheme('v3');
patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Budget API')
    .setDescription('Backend for Budget App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: swaggerTheme.getBuffer('dark'),
  });

  await app.listen(3000);
}
bootstrap();
