import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ECONNRESETExceptionFilter } from './filters/econnreset-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: true
  });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true
  }))

  app.useGlobalFilters(new ECONNRESETExceptionFilter());

  await app.listen(configService.get('NEST_PORT') ?? 3000, '0.0.0.0');
}
bootstrap();
