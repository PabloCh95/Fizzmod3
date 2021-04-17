import express from 'express'
import {ejer1,randomNros,info} from '../controller/controller.js'

const Router = express.Router();

Router.get('/',ejer1);
Router.get('/random',randomNros);
Router.get('/info',info);

export default {Router}