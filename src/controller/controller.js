//controller ejercicio 1:
//1) Responda en la ruta raíz un mensaje de acuerdo a la hora actual: si dicha hora se encuentra entre
//las 6 y las 12hs será 'Buenos dias!', entre las 13 y las 19hs 'Buenas tardes!' y de 20 a 5hs 'Buenas
//noches!'.
const dato=new Date().getUTCHours();
export const ejer1= (req,res)=>{
    if (dato >= 6 && dato <= 12)
    res.send(`<h3 style="color:Tomato">Buenos dias!</h3>`);
    if (dato>=13 && dato <= 19)
    res.send(`<h3 style:"MediumSeaGreen">Buenas tardes!</h3>`)
    else
    res.send(`<h3 style:"SlateBlue">Buenas noches!</h3>`)
}