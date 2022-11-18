import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
let server: Handler;

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
    .setTitle('Alumnos')
    .setDescription('Api Crud Alumnos')
    .setVersion('1.0')
    //.addTag('alumnos')
    .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(3000);
}
bootstrap();*/


async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Alumnos')
    .setDescription('Api Crud Alumnos')
    .setVersion('1.0')
    .addApiKey({type: 'apiKey', in: 'header', name: 'x-api-key', description: 'API Key For External calls'})
    //.addSecurity('x-api-key')
    .addServer('https://ix4kgg7308.execute-api.us-east-1.amazonaws.com/dev/')
    .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};