import express from 'express'
import {ejer1,randomNros,info,operaciones} from '../controller/controller.js'

const Router = express.Router();

Router.get('/',ejer1);
Router.get('/random',randomNros);
Router.get('/info',info);
Router.get('/operaciones',operaciones);

export default {Router}
/*
4) Por último, declarar una ruta get ‘/operaciones’, que reciba por query-params dos números y la
operación a realizar entre ellos. Ejemplo: …./operaciones?num1=5&num2=6&operacion=suma
Las operaciones válidas serán: suma, resta, multiplicación y división.
Si no se ingresa alguno de estos parámetros, si los tipos de datos no corresponden ó si operación no
es válida, se devolverá un error mediante un objeto con la siguiente estructura:
{
error: {
num1: { valor: x, tipo: y },
num2: { valor: x, tipo: y },
operacion: { valor: x, tipo: y }
}
}
Si todo está correcto, devolver un objeto que contenga los dos números ingresados, la operación y el
resultado.
- Utilizar import (ES Modules) para todos los procesos y separar en módulos el desarrollo.
- Considerar lo necesario para que este proyecto puede funcionar de forma local o hosteado en
glitch.com.
- Subir el ejercicio a github (ignorar la subida de node_modules) y hacer el deploy en glitch desde
dicho repo. Fijar la versión mínima de Node.js para que glitch instale la versión correcta de node y
funcionen los import de ES Modules.
*/

