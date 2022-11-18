import { Test } from '@nestjs/testing';
import { AlumnoController } from './alumnos.controller';
import { Alumno } from './entity/alumnos.entity';
import { AlumnoService } from './alumnos.service';
import { v4 as uuidv4 } from 'uuid'
import { response, Response } from 'express'

describe('AlumnoController', () => {
  let alumnosController: AlumnoController;
  let alumnosService: AlumnoService;
  let alumno: ['david', 30, 'Segundo', 'A']
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AlumnoController],
        providers: [AlumnoService],
      }).compile();

    alumnosService = moduleRef.get<AlumnoService>(AlumnoService);
    alumnosController = moduleRef.get<AlumnoController>(AlumnoController);
  });
  const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as unknown) as Response;
  let result: any
  const results = [];
  describe('Alumno Controller', () => {
    it('should return an array of alumnos', async () => {
      
      jest.spyOn(alumnosService, 'getAlumnos').mockImplementation(async() => results);

      expect(await alumnosController.getAlumnos()).toBe(results);
    });

    it('should return an Alumno', async () => {
      let res: any
      jest.spyOn(alumnosService, 'getAlumno').mockImplementation(async() => res);
      expect(await alumnosController.getAlumno(mRes,uuidv4())).toBe(res);
    });

    it('should create an Alumno', async () => {
      const obj = new Alumno(uuidv4(), 'reinaldo', 2, 'Segundo', 'A');
      jest.spyOn(alumnosService, 'insertAlumno').mockImplementation(async() => obj);

      expect(await alumnosController.insertAlumno(obj)).toBe(obj);
    });

    it('should update an Alumno', async () => {
      
      jest.spyOn(alumnosService, 'updateAlumno').mockImplementation(async() => result);
      expect(await alumnosController.updateAlumno(mRes,uuidv4(), {firstname:'david',age: 2, grado:'Segundo', seccion:'A'})).toBe(result);
    });

    it('should delete an Alumno', async () => {
       
      jest.spyOn(alumnosService, 'deleteAlumno').mockImplementation(async() => result);
      
      expect(await alumnosController.deleteAlumno(mRes,uuidv4())).toBe(result);
    });
  });
});