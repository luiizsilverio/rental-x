import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid"
import dayjs from "dayjs";
import { resolve } from "path"

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IMailProvider } from "@shared/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exist")
    }

    const templatePath = resolve(__dirname, "..", "..", "views", "forgotPassword.hbs")

    const token = uuid()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: dayjs().add(3, "hours").toDate()
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email, 
      "Recuperação de senha", 
      variables,
      templatePath
    )
  }
}

export { SendForgotPasswordUseCase }