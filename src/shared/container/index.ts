import { container } from 'tsyringe'

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository' 
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository' 

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/repositories/implementations/CarsRepository'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { CarsImagesRepository } from '@modules/cars/repositories/implementations/CarsImagesRepository'

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/repositories/RentalsRepository'

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '@modules/accounts/repositories/implementations/UsersTokensRepository'

container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
   "SpecificationsRepository",
   SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UsersRepository
)

container.registerSingleton<ICarsRepository>(
   "CarsRepository",
   CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
   "CarsImagesRepository",
   CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
   "RentalsRepository",
   RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
   "UsersTokensRepository",
   UsersTokensRepository
)