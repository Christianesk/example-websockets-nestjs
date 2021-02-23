import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('bootstrop');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..','static'));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  if (configService.get('NODE_ENV') === 'development') {
    logger.debug('Running on development.');
    app.enableCors();
  } else {
    //PRODUCTION
    //app.enableCors();
  }

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
