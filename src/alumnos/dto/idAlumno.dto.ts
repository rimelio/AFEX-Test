import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class IdAlumnoDto{

    @IsNotEmpty({message: 'No se ha proporcionado el id'})
    @ApiProperty({ description: "ID del Alumno", nullable: false })
    id: string;
}
