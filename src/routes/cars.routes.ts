import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

const carsRoutes = Router()

let createCarController = new CreateCarController()
let listCarsController = new ListCarsController()

carsRoutes.post("/", 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
)

carsRoutes.get("/available", listCarsController.handle)

export { carsRoutes }