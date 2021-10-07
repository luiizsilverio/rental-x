import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import { hash } from "bcrypt"

import { AppError } from "@errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError("Invalid Token")
    }

    if (dayjs(userToken.expires_date).isBefore(dayjs())) {
      throw new AppError("Expired token")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUseCase }
