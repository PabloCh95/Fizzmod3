
import {readFile,writeFile} from 'fs/promises';

//controller ejercicio 1:
//1) Responda en la ruta raíz un mensaje de acuerdo a la hora actual: si dicha hora se encuentra entre
//las 6 y las 12hs será 'Buenos dias!', entre las 13 y las 19hs 'Buenas tardes!' y de 20 a 5hs 'Buenas
//noches!'.

export const ejer1= (req,res)=>{
    let dato=new Date().getHours();//corroborar la hora en glitch
    if (dato >= 6 && dato <= 12){
    res.send(`<h1>Buenos dias!</h1>`);
    }
    if (dato>=13 && dato <= 19){
    res.send(`<h1>Buenas tardes!</h1>`);
    }else{
    res.send(`<h1>Buenas noches!</h1>`);
    }
}

/* 2) Así mismo, dispondrá de otra ruta get ‘/random’ la cuál iniciará un cálculo de 10000 números
aleatorios en el rango del 1 al 20. Luego de dicho proceso, el servidor retornará un objeto cuyas
claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió
dicho número.
*/

export const randomNros=(req,res)=>{
    let value={};
    for(let i=0;i<1000;i++){
        let nro= Math.round(Math.random()*20);//cambiar funcion a una que vaya de 1 a 20 , esta va de 0 a 20
        if(nro!=0){
            if(value[nro]>0){
                value[nro]++;
            }else{
                value[nro]=1;
            }
        }
    }
    res.send(value);
}
/*
3) Definir otra ruta get llamada ‘/info’ que sea capaz de leer el archivo package.json y devuelva un
objeto con el siguiente formato y datos:
let info = {
contenidoStr: (contenido del archivo leído en formato string),
contenidoObj: (contenido del archivo leído en formato objeto),
size: (tamaño en bytes del archivo)
}
Esta ruta será capaz de:
• Mostrar por consola el objeto info luego de leer el archivo.
• Guardar el objeto info en un archivo llamado info.txt dentro de la misma carpeta de
package.json, preservando el formato de representación del objeto en el archivo
(tabuladores, saltos de línea, etc)
• Utilizar la lectura y escritura de archivos en modo asincrónico con async await.
*/

export const info= async ()=>{
    try{
        let info={}
        info['contenidoStr']= await readFile('package.json','utf-8')
        info['contenidoObj']= JSON.parse(info.contenidoStr);
        info['size']=info.contenidoStr.length;
        console.log(info)
        /*writeFile(path: PathLike | FileHandle, data: string | Uint8Array, options?: (BaseEncodingOptions & {
            mode?: Mode;
            flag?: OpenMode;
        }) | BufferEncoding): Promise<...> */
        let textInfo= JSON.stringify(info,null,2)
        await writeFile('info.txt', textInfo )  
    }catch(error){
        console.log('error:',error);
    }
}
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
export const operaciones=(req,res)=>{
    try{//falta generar el error para que lo capture el catch
        const {num1,num2,operacion}=req.query;
        const x=parseInt(num1);
        const y=parseInt(num2);
        let err = {
            error:{
                num1: { valor: x || null, tipo: typeof x},
                num2: { valor: y || null , tipo: typeof y },
                operacion: { valor: operacion || null, tipo: typeof operacion }
        }
        }
        console.log(isNaN(x));
        let resultado={};
        if(!isNaN(x)&&!isNaN(y)){
            switch(operacion){
                case "suma": resultado['resultado']=x+y; break;
                case "resta": resultado['resultado']= x-y; break;
                case "multiplicación": resultado['resultado']=x*y; break;
                case "división": resultado['resultado']=x/y; break;
                default: resultado['resultado']=null;
            }
            if(resultado['resultado']===null){
                throw new Error(JSON.stringify(err));
            }else{
                resultado['num1']=x;
                resultado['num2']=y;
                resultado['operacion']=operacion;
                
                console.log('objeto con los datos y resultados correctos:',resultado)
                res.send(resultado)
            }
        }else{
            throw new Error(JSON.stringify(err));
        }
        
    }catch(err){
        console.log(JSON.parse(err.message));
        res.send(JSON.parse(err.message));
    }
}