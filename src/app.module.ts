import { Module } from '@nestjs/common';
import { AlumnoModule } from './alumnos/alumnos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AlumnoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
