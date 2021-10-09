import { verify, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import dayjs from "dayjs";

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import auth from '@config/auth'
import { AppError } from '@errors/AppError'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}
  
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserId(
      user_id, 
      token
    )

    if (!userToken) {
      throw new AppError("Refresh Token does not exist")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = dayjs().add(30, 'days').toDate()

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    const newToken = sign({}, auth.secret, {
      subject: user_id,
      expiresIn: auth.expiresIn //"1d"
    })

    return {
      refresh_token,
      token: newToken
    }
  }
}

export { RefreshTokenUseCase }