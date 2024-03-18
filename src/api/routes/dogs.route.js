import { Router } from 'express'
import { findAll, store } from '../controllers/dogs.controller.js'
import { upload } from '../../config/multer.config.js'

export const dogs = Router()

dogs.get('/', findAll)

dogs.post('/', upload.single('image'), store)
