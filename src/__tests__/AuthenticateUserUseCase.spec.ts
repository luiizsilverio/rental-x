import 'reflect-metadata'
import { AppError } from '@errors/AppError'
import { ICreateUser } from "@modules/accounts/dtos/ICreateUserDTO"
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase"
import { UsersRepositoryInMemory } from "./repositories/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from './repositories/UsersTokensRepositoryInMemory'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory

describe("Authenticate user", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate the user', async () => {
    const user: ICreateUser = {
      cnh: "000000",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    } 

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it('should not be able to authenticate a non-existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: '1234'
      })
    }).rejects.toBeInstanceOf(AppError)      
  })

  it('should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUser = {
        cnh: "000000",
        email: "user@test.com",
        password: "1234",
        name: "User Test"
      } 
  
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })

    }).rejects.toBeInstanceOf(AppError)      
  })

})
