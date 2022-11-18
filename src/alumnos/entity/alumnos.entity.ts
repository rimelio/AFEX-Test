import { ApiProperty } from "@nestjs/swagger";

export class Alumno{
    
    @ApiProperty({ description: "Id del Alumno", nullable: false })
    id: string;

    
    @ApiProperty({ description: "Nombre del Alumno", nullable: false })
    firstname: string;

    
    @ApiProperty({ description: "Edad del Alumno", nullable: true })
    age: number;

    
    @ApiProperty({ description: "Grado a Cursar", nullable: false })
    grado: string;

    
    @ApiProperty({ description: "Seccion", nullable: false })
    seccion: string;

    constructor(
        id: string,
        firstname: string,
        age: number,
        grado: string,
        seccion: string,
    ){
        this.id = id;
        this.firstname = firstname;
        this.age = age;
        this.grado = grado;
        this.seccion = seccion;
    };
}

