
import {readFile,writeFile} from 'fs/promises';

//controller ejercicio 1:
//1) Responda en la ruta raíz un mensaje de acuerdo a la hora actual: si dicha hora se encuentra entre
//las 6 y las 12hs será 'Buenos dias!', entre las 13 y las 19hs 'Buenas tardes!' y de 20 a 5hs 'Buenas
//noches!'.

export const ejer1= (req,res)=>{
    let dato=new Date().getHours();
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
        let nro= Math.round(Math.random()*20);
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
        info['syze']=info.contenidoStr.length;
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