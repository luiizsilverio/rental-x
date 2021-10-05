import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid"
import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exist")
    }

    const token = uuid()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: dayjs().add(3, "hours").toDate()
    })

  }
}

export { SendForgotPasswordUseCase }