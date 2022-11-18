import { Injectable } from '@nestjs/common';
import { Alumno } from './entity/alumnos.entity'
import { v4 as uuidv4 } from 'uuid'
import  AWS  from 'aws-sdk'

@Injectable()
export class AlumnoService{
    private alumnos: Alumno[] = [];

    async insertAlumno(
        firstname: string,
        age: number,
        grado: string,
        seccion: string
    ){
        AWS.config.update({region:'us-east-1'});
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const id = uuidv4();
        const newAlumno = new Alumno(id, firstname, age, grado,seccion);
        //this.alumnos.push(newAlumno);
        await dynamodb.put({
            TableName: 'alumnos',
            Item: newAlumno
        }).promise();

        return newAlumno;
    }

    async getAlumnos(){
        AWS.config.update({region:'us-east-1'});
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.scan({
            TableName: 'alumnos',
        }).promise()
        return [...result.Items];
    }

    async getAlumno(id: string){
        AWS.config.update({region:'us-east-1'});
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.get({
            TableName: 'alumnos',
            Key: {
                id
            }
        }).promise();
        return result.Item;
    }

    async updateAlumno(
        id: string,
        firstname: string,
        age: number,
        grado: string,
        seccion: string
    ){
        AWS.config.update({region:'us-east-1'});
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.update({
            TableName: 'alumnos',
            Key: {id},
            UpdateExpression: 'set firstname = :firstname, age = :age, grado = :grado, seccion = :seccion',
            ExpressionAttributeValues: {
                ":firstname": firstname,
                ":age": age,
                ":grado": grado,
                ":seccion": seccion,
            },
            ConditionExpression: 'attribute_exists(id)'
        }).promise()    
        return result;
    }

    async deleteAlumno(id: string){
        AWS.config.update({region:'us-east-1'});
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.delete({
            TableName: 'alumnos',
            Key: {id},
            ConditionExpression: 'attribute_exists(id)'
        }).promise()
        return result;
    }

    private getAlumnoById(id: string): [Alumno, number]{
        const index = this.alumnos.findIndex(a => a.id == id);
        return [this.alumnos[index], index];
    }
}