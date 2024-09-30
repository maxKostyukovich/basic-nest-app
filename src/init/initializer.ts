import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Initializer {
  public constructor(private readonly app: INestApplication) {}

  public run(): void {
    this.initBaseConfig();
    this.initSwagger();
  }

  private initBaseConfig(): void {
    this.app.setGlobalPrefix('api/v1');
    this.app.enableCors();
  }

  private initSwagger(): void {
    const options = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(this.app, options);

    SwaggerModule.setup('api/v1', this.app, document);
  }
}
