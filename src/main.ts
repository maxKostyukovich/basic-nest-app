import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Initializer } from './init/initializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT') || 3000;
  const initializer = new Initializer(app);

  initializer.run();

  await app.listen(port);
}
bootstrap();

process.on('uncaughtException', (error) => {
  console.error(`An unhandled error has occurred: ${error.message}`);
});
