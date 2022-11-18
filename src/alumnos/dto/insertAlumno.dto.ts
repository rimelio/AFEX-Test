import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, isString } from "class-validator";

export class InsertAlumnoDto{

    @IsNotEmpty({message: 'No se ha proporcionado el nombre'})
    @ApiProperty({ description: "Nombre del Alumno", nullable: false })
    firstname: string;

    @IsInt({message: 'La edad debe ser un numero entero'})
    @ApiProperty({ description: "Edad del Alumno", nullable: true })
    age: number;

    @IsNotEmpty({message: 'No se ha proporcionado el grado'})
    @ApiProperty({ description: "Grado de Estudio", nullable: false })
    grado: string

    @IsNotEmpty({message: 'No se ha proporcionado la seccion'})
    @ApiProperty({ description: "Seccion", nullable: false })
    seccion: string
}
