import { AlumnoService } from "./alumnos.service";
import { AlumnoController } from "./alumnos.controller";
import { Module } from '@nestjs/common';

@Module({
    controllers: [AlumnoController],
    providers: [AlumnoService],
})

export class AlumnoModule{}