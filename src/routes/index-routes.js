import express from 'express'
import {ejer1} from '../controller/controller'
const Router= express.Router()

Router.get('/',ejer1);

export default Router;
