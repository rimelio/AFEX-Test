import { Controller, Get, Post, Body, Param, Put, Delete, Header, ValidationPipe, UsePipes, Req, Res } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AlumnoService } from './alumnos.service';
import { InsertAlumnoDto } from './dto/insertAlumno.dto';
import { IdAlumnoDto} from './dto/idAlumno.dto';
import { Request, Response } from 'express';

@ApiTags('Alumnos')
@Controller('alumnos')
export class AlumnoController{
    constructor(private readonly _alumnoService: AlumnoService){};

    @Get()
    @ApiSecurity('api_key', ['x-api-key'])
    @ApiOperation({ summary: "Obtien todos los alumnos de la base de datos" })
    @Header('Access-Control-Allow-Origin', 'about:blank')
    getAlumnos() {
        return this._alumnoService.getAlumnos();
    };

    @Post()
    @ApiSecurity('api_key', ['x-api-key'])
    @ApiOperation({ summary: "Inserta un alumno a la base de datos" })
    @ApiBody({
        type: InsertAlumnoDto,
        description: "Datos del estudiante",
        required: true,
        isArray: false
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Header('Access-Control-Allow-Origin', 'about:blank')
    insertAlumno(
        @Body() insertAlumnoDto: InsertAlumnoDto
    ){  
        const {firstname, age, grado, seccion} = insertAlumnoDto
        const alumnoId = this._alumnoService.insertAlumno(firstname, age, grado, seccion);
        return alumnoId;
    };

    @Get(':id')
    @ApiSecurity('api_key', ['x-api-key'])
    //@ApiHeader({name:'x-api-key'})
    @ApiOperation({ summary: "Obtien un alumno de la base de datos segun su id" })
    @ApiParam({ name: "id", required: true, description: "Id del alumno" })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Header('Access-Control-Allow-Origin', 'about:blank')
    async getAlumno(
        @Res() res: Response,
        @Param() id: IdAlumnoDto
    ){
        const result = await this._alumnoService.getAlumno(id.id)
        if(!result){
            res.send('No se encontro el alumno en la base de datos')
        }else{
            res.json(result)
        }
    }

    @Put(':id')
    @ApiSecurity('api_key', ['x-api-key'])
    @ApiOperation({ summary: "Modifica un alumno en la base de datos segun su id" })
    @ApiParam({ name: "id", required: true, description: "Id del alumno" })
    @ApiBody({
        type: InsertAlumnoDto,
        description: "Datos del estudiante",
        required: true,
        isArray: false
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Header('Access-Control-Allow-Origin', 'about:blank')
    async updateAlumno(
        @Res() res: Response,
        @Param() id: IdAlumnoDto,
        @Body() insertAlumnoDto: InsertAlumnoDto,
        
    ){
        try {
            const {firstname,age,grado,seccion} = insertAlumnoDto 
            const result = await this._alumnoService.updateAlumno(id.id,firstname,age,grado,seccion);
            res.status(200).send('Registro modificado con exito')
        } catch (error) {
            res.status(400).send('No se encontro el alumno en la base de datos')
        }
    }

    @Delete(':id')
    @ApiSecurity('api_key', ['x-api-key'])
    @ApiOperation({ summary: "Elimina un alumno en la base de datos" })
    @ApiParam({ name: "id", required: true, description: "Id del alumno" })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Header('Access-Control-Allow-Origin', 'about:blank')
    async deleteAlumno(
        @Res() res: Response,
        @Param() id: IdAlumnoDto
    ){  
        try {
            const result = await this._alumnoService.deleteAlumno(id.id);
            res.status(200).send('Registro eliminado con exito')
        } catch (error) {
            res.status(400).send('No se encontro el alumno en la base de datos')
        }
    }
}