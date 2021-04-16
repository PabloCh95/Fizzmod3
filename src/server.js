import express from 'express';
import Router from './routes/index-routes'

const app= express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api',Router);
app.listen(PORT,()=>{
    console.log(`Servidor conectado en el puerto: ${PORT}`);
})